import type { ServerWebSocket } from "bun";
import { Hono } from "hono";
import { createBunWebSocket } from "hono/bun";
import type { WSContext } from "hono/ws";

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

const server = Bun.serve({
	fetch: app.fetch,
	websocket: {
		open: (ws: ServerWebSocket) => {
			ws.subscribe("robby");
			console.log("WebSocket is connected.");
		},
		message: (ws: ServerWebSocket, message: string) => {
			server.publish(
				"robby",
				JSON.stringify({
					id: "server",
					content: message,
					user: { id: "server" },
				}),
			);
		},
		close: (ws: ServerWebSocket) => {
			ws.unsubscribe("robby");
			console.log("WebSocket is closed.");
		},
	},
});
