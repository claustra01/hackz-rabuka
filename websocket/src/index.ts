import type { ServerWebSocket } from "bun";
import { Hono } from "hono";
import { createBunWebSocket } from "hono/bun";
import type { WSContext } from "hono/ws";
import {
	ErrorMessage,
	SystemMessage,
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
	updatedAt: Date;
};

const RoomMap: Map<string, RoomInfo> = new Map();

const server = Bun.serve({
	port: 33000,
	fetch: app.fetch,
	websocket: {
		open: (ws: ServerWebSocket) => {
			ws.subscribe("robby");
			console.log("WebSocket is connected.");
		},
		message: (ws: ServerWebSocket, message: string) => {
			const data = JSON.parse(message);

			if (isConnectRoomMessage(data)) {
				switch (data.message) {
					case "create": {
						const { roomHash } = data;
						RoomMap.set(roomHash, {
							status: "waiting",
							updatedAt: new Date(),
						} as RoomInfo);
						break;
					}
					case "join": {
						const { roomHash } = data;
						if (RoomMap.has(roomHash)) {
							RoomMap.set(roomHash, {
								status: "playing",
								updatedAt: new Date(),
							} as RoomInfo);
							ws.send(
								JSON.stringify({
									type: "system",
									roomHash: roomHash,
									message: "start",
								} as SystemMessage),
							);
						} else {
							ws.send(
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
				ws.send(JSON.stringify(data));
			}

			Array.from(RoomMap.entries()).forEach(([roomHash, roomInfo]) => {
				// 5分以上更新されていない部屋は削除
				if (roomInfo.updatedAt.getTime() + 1000 * 60 * 5 < Date.now()) {
					RoomMap.delete(roomHash);
				}
			});
		},

		close: (ws: ServerWebSocket) => {
			ws.unsubscribe("robby");
			console.log("WebSocket is closed.");
		},
	},
});
