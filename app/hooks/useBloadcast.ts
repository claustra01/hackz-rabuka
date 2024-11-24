import { useEffect, useState } from "hono/jsx";
import {
	type UpdateFireMessage,
	isSystemMessage,
	isUpdateFireMessage,
} from "../../websocket/src/schemas";
import useWebSocket from "./useWebSocket";

// { clientId: value }
export type FireStatus = Map<string, number>;

export const useBloadcast = () => {
	const [roomHash, setRoomHash] = useState("");
	const [isReady, setIsReady] = useState(false);
	const [isFinished, setIsFinished] = useState(false);
	const [fireStatus, setFireStatus] = useState<FireStatus>(new Map());
	const { socket, message } = useWebSocket();

	const sendMessage = (obj: UpdateFireMessage) => {
		if (socket && isReady) {
			socket.send(JSON.stringify(obj));
		}
	};

	const init = (roomHash: string) => {
		setRoomHash(roomHash);
		setFireStatus(new Map(fireStatus).set("1", 1).set("2", 1));
		console.log(fireStatus);
	};

	useEffect(() => {
		if (socket) {
			setIsReady(true);
		} else {
			setIsReady(false);
		}
	}, [socket]);

	useEffect(() => {
		const data = JSON.parse(message);
		if (isUpdateFireMessage(data)) {
			if (data.roomHash !== roomHash) {
				return;
			}
			setFireStatus((prev) => {
				const newFireStatus = new Map(prev);
				newFireStatus.set(data.clientId, data.value);
				return newFireStatus;
			});
		}
		if (isSystemMessage(data)) {
			if (data.message === "finish" && data.roomHash === roomHash) {
				setIsFinished(true);
			}
		}
	}, [message]);

	return { isReady, isFinished, fireStatus, sendMessage, init };
};
