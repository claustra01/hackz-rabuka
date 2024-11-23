import type { ServerWebSocket } from "bun";
import { Hono } from "hono";
import { createBunWebSocket } from "hono/bun";
import type { WSContext } from "hono/ws";
import {
	type ErrorMessage,
	type ResultMessage,
	type SystemMessage,
	isConnectRoomMessage,
	isUpdateFireMessage,
} from "./schemas";

const app = new Hono();

const { upgradeWebSocket, websocket } = createBunWebSocket();

app.get(
	"/ws",
	upgradeWebSocket((c) => {
		const connections: WSContext[] = [];
		return {
			onOpen(event: unknown, ws: WSContext<unknown>) {
				connections.push(ws);
				console.log("onOpen: connections:", connections.length);
				console.log("connected");
			},
			onMessage(event, ws) {
				console.log("onMessage: connections:", connections.length);
				for (const conn of connections) {
					if (conn !== ws) {
						conn.send(
							JSON.stringify({
								id: crypto.randomUUID(),
								content: event.data,
							}),
						);
					}
				}
			},
			onClose() {
				console.log("disconnected");
			},
		};
	}),
);

export default app;

type RoomInfo = {
	status: string;
	scores: Map<string, number>[]; // [{clientId: value}]
	updatedAt: Date;
};

const roomMap: Map<string, RoomInfo> = new Map();

const server = Bun.serve({
	port: 33000,
	fetch: app.fetch,
	websocket: {
		open: (ws: ServerWebSocket) => {
			ws.subscribe("robby");
			console.log("WebSocket is connected.");
		},
		message: (ws: ServerWebSocket, message: string) => {
			console.log("recieved message:", message);
			const data = JSON.parse(message);

			if (isConnectRoomMessage(data)) {
				switch (data.message) {
					case "create": {
						const { roomHash } = data;
						const score = new Map<string, number>([[data.clientId, 0]]);
						roomMap.set(roomHash, {
							status: "waiting",
							scores: [score],
							updatedAt: new Date(),
						} as RoomInfo);
						break;
					}
					case "join": {
						const { roomHash } = data;
						if (roomMap.has(roomHash)) {
							const roomInfo = roomMap.get(roomHash);
							if (roomInfo) {
								roomMap.set(roomHash, {
									status: "playing",
									scores: roomInfo.scores.concat([
										new Map<string, number>([[data.clientId, 0]]),
									]),
									updatedAt: new Date(),
								} as RoomInfo);
							}
							server.publish(
								"robby",
								JSON.stringify({
									type: "system",
									roomHash: roomHash,
									message: "start",
								} as SystemMessage),
							);
						} else {
							server.publish(
								"robby",
								JSON.stringify({
									type: "error",
									roomHash: roomHash,
									message: "room is not exist",
								} as ErrorMessage),
							);
						}
						break;
					}
				}
			}

			if (isUpdateFireMessage(data)) {
				if (roomMap.get(data.roomHash)?.status === "playing") {
					// スコア更新・共有
					for (const score of roomMap.get(data.roomHash)?.scores || []) {
						if (score.has(data.clientId)) {
							score.set(data.clientId, data.value);
						}
					}
					server.publish("robby", JSON.stringify(data));
					// 3.0に達したらゲーム終了
					if (data.value > 3.0) {
						// 最終結果
						const result = roomMap.get(data.roomHash)?.scores.map((score) => {
							const [[clientId, value]] = Array.from(score.entries());
							return { clientId, value };
						});
						server.publish(
							"robby",
							JSON.stringify({
								type: "result",
								roomHash: data.roomHash,
								result: result || [],
							} as unknown as ResultMessage),
						);
						// 終了通知
						server.publish(
							"robby",
							JSON.stringify({
								type: "system",
								roomHash: data.roomHash,
								message: "finish",
							} as SystemMessage),
						);
						// 部屋削除
						roomMap.delete(data.roomHash);
					}
				} else {
					server.publish(
						"robby",
						JSON.stringify({
							type: "error",
							roomHash: data.roomHash,
							message: "room is not playing",
						} as ErrorMessage),
					);
				}
			}

			for (const [roomHash, roomInfo] of Array.from(roomMap.entries())) {
				// 5分以上更新されていない部屋は削除
				if (roomInfo.updatedAt.getTime() + 1000 * 60 * 5 < Date.now()) {
					roomMap.delete(roomHash);
				}
			}
		},

		close: (ws: ServerWebSocket) => {
			ws.unsubscribe("robby");
			console.log("WebSocket is closed.");
		},
	},
});
