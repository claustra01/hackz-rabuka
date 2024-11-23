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
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				width: "100%",
				height: "100%",
			}}
		>
			<AudioClass
				honoPoint={ownHonoPoint}
				client={clientId}
				room={roomId}
				isReady={isReady}
				sendMessage={sendMessage}
			/>
			<div
				style={{
					margin: "auto",
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
					textAlign: "center",
					width: "100%",
					height: "100%",
					gap: "10%",
				}}
			>
				{Array.from(fireStatus.entries()).map(([k, v]) => {
					if (k === roomId) {
						return Array.from(v.entries()).map(([cId, value]) => {
							return (
								<div>
									<ThreeCanvas honoPoint={value} key={cId} />
									<h2>{cId === clientId ? "自分" : "相手"}</h2>
								</div>
							);
						});
					}
					return null;
				})}
			</div>
		</div>
	);
}
