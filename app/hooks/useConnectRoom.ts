import { useEffect, useState } from "hono/jsx";
import {
	type SystemMessage,
	type connectRoomMessage,
	isSystemMessage,
} from "../../websocket/src/schemas";
import useWebSocket from "./useWebSocket";

const useConnectRoom = () => {
	const [ready, setReady] = useState<boolean>(false);
	const { socket, message } = useWebSocket();

	const createRoom = (roomHash: string, clientId: string) => {
		if (socket && socket.readyState === WebSocket.OPEN) {
			socket.send(
				JSON.stringify({
					type: "connect",
					roomHash,
					clientId,
					message: "create",
				} as connectRoomMessage),
			);
		} else {
			console.error("WebSocket is not open");
		}
	};

	useEffect(() => {
		if (isSystemMessage(message)) {
			const systemMessage = message as SystemMessage;
			if (systemMessage.message === "start") {
				setReady(true);
			}
		}
	}, [message]);

	const joinRoom = (roomHash: string, clientId: string) => {
		if (socket && socket.readyState === WebSocket.OPEN) {
			socket.send(
				JSON.stringify({
					type: "connect",
					roomHash,
					clientId,
					message: "join",
				} as connectRoomMessage),
			);
		} else {
			console.error("WebSocket is not open");
		}
	};

	return { createRoom, joinRoom, ready };
};

export default useConnectRoom;