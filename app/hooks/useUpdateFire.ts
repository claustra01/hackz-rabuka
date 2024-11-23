import {
	type UpdateFireMessage,
	connectRoomMessage,
} from "../../websocket/src/schemas";
import useWebSocket from "./useWebSocket";

const useUpdateFire = () => {
	const { socket } = useWebSocket();

	const updateFire = (roomHash: string, clientId: string, value: number) => {
		if (socket && socket.readyState === WebSocket.OPEN) {
			socket.send(
				JSON.stringify({
					type: "updateFire",
					roomHash,
					clientId,
					value,
				} as UpdateFireMessage),
			);
		} else {
			console.error("WebSocket is not open");
		}
	};

	return { updateFire };
};

export default useUpdateFire;
