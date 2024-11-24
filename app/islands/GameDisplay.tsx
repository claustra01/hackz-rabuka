import { use, useEffect, useRef, useState } from "hono/jsx";
import { UpdateFireMessage } from "../../websocket/src/schemas";
import { useBloadcast } from "../hooks/useBloadcast";
import AudioClass from "./AudioClass";
import ThreeCanvas from "./ThreeCanvas";

export default function GameDisplay() {
	const ownHonoPoint = useRef<number>(1);
	const [clientId, setClientId] = useState<string>("");
	const [roomId, setRoomId] = useState<string>("");
	const { isReady, isFinished, fireStatus, sendMessage, init } = useBloadcast();

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

	useEffect(() => {
		if (isFinished) {
			console.log("finished");
			window.location.href = "/result";
		}
	}, [isFinished]);

	ownHonoPoint.current = fireStatus.get(clientId) || 1;
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
				}}
			>
				{Array.from(fireStatus.entries()).map(([cId, value]) => {
					//fireStatusのサイズを取得
					const size = fireStatus.size + 1;
					const canvasWidth = window.innerWidth / size;
					const canvasHeight = window.innerHeight;
					return (
						<div
							key={cId}
							style={{
								position: "relative",
							}}
						>
							<ThreeCanvas
								honoPoint={value}
								key={cId}
								canvasWidth={canvasWidth}
								canvasHeight={canvasHeight}
							/>
							<h2
								style={{
									height: "0px",
									//行の高さを0にして、文字を上にずらす
									lineHeight: "0px",
									position: "absolute",
									top: "20px",
									left: "20px",
									fontSize: "50px",
									color: "white",
								}}
							>
								{cId === clientId ? "あなた" : "相手"}
							</h2>
						</div>
					);
				})}
			</div>
		</div>
	);
}
