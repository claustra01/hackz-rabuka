import { useEffect, useRef, useState } from "hono/jsx";
import { UpdateFireMessage } from "../../websocket/src/schemas";
import { useBloadcast } from "../hooks/useBloadcast";
import AudioClass from "./AudioClass";
import ThreeCanvas from "./ThreeCanvas";

export default function GameDisplay() {
	const ownHonoPoint = useRef<number>(1);
	const [clientId, setClientId] = useState<string>("");
	const [roomId, setRoomId] = useState<string>("");
	const { isReady, fireStatus, sendMessage, init } = useBloadcast();

	useEffect(() => {
		// get roomId and clientId from localStorage
		const rId = localStorage.getItem("roomId");
		const cId = localStorage.getItem("clientId");
		if (!rId || !cId) {
			window.location.href = "/";
		}
		setRoomId(rId || "");
		setClientId(cId || "");
		console.log("roomId: ", roomId);
		// init fire score
		if (isReady) {
			init(roomId);
		}
	}, [roomId, clientId, isReady]);

	ownHonoPoint.current = fireStatus.get(roomId)?.get(clientId) || 1;
	console.log(ownHonoPoint.current);

	return (
		<>
			<AudioClass
				honoPoint={ownHonoPoint}
				client={clientId}
				room={roomId}
				isReady={isReady}
				sendMessage={sendMessage}
			/>
			{Array.from(fireStatus.entries()).map(([k, v]) => {
				if (k === roomId) {
					return Array.from(v.entries()).map(([cliendId, value]) => {
						return <ThreeCanvas honoPoint={value} key={cliendId} />;
					});
				}
				return null;
			})}
		</>
	);
}
