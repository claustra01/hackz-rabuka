import { useEffect, useState } from "hono/jsx";
import {
	type UpdateFireMessage,
	isUpdateFireMessage,
} from "../../websocket/src/schemas";
import useWebSocket from "./useWebSocket";

// { roomHash: { clientId: value } }
export type FireStatus = Map<string, Map<string, number>>;

export const useBloadcast = () => {
	const [fireStatus, setFireStatus] = useState<FireStatus>(new Map());
	const { socket, message } = useWebSocket();

	const sendMessage = (obj: UpdateFireMessage) => {
		if (socket) {
			socket.send(JSON.stringify(obj));
		}
	};

	useEffect(() => {
		const data = JSON.parse(message);
		if (isUpdateFireMessage(data)) {
			const room = fireStatus.get(data.roomHash) || new Map();
			room.set(data.clientId, data.value);
			setFireStatus(new Map(fireStatus).set(data.roomHash, room));
		}
	}, [message]);

	return { fireStatus, sendMessage };
};
