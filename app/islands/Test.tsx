import { useState } from "hono/jsx";
import { useBloadcast } from "../hooks/useBloadcast";

export default function WebSocketComponent() {
	const [inputMessage, setInputMessage] = useState("");
	const { isReady, fireStatus, sendMessage } = useBloadcast();

	const handleSendMessage = () => {
		if (isReady) {
			sendMessage({
				type: "updateFire",
				roomHash: "room1",
				clientId: "client1",
				value: Number.parseFloat(inputMessage),
			});
		}
	};

	return (
		<div>
			<h1>WebSocket Demo</h1>
			<div>
				<input
					type="text"
					value={inputMessage}
					onChange={(e) =>
						setInputMessage((e.target as HTMLInputElement).value)
					}
					placeholder="Send a message"
				/>
				<button type="button" onClick={handleSendMessage}>
					Send
				</button>
			</div>
			<div>
				<h2>Received Fire Status</h2>
				<ul>
					{Array.from(fireStatus.entries()).map(([roomHash, clientMap]) => (
						<li key={roomHash}>
							<strong>Room: {roomHash}</strong>
							<ul>
								{Array.from(clientMap.entries()).map(([clientId, value]) => (
									<li key={clientId}>
										Client: {clientId}, Value: {value}
									</li>
								))}
							</ul>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
