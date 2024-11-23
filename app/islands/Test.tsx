import { useState } from "hono/jsx";
import useWebSocket from "../hooks/useWebSocket";

export default function WebSocketComponent() {
	const [inputMessage, setInputMessage] = useState("");
	const { socket, message } = useWebSocket("ws://localhost:33000/ws"); // WebSocketサーバーのURL

	const handleSendMessage = () => {
		if (socket && inputMessage) {
			socket.send(inputMessage);
			setInputMessage("");
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
				<h2>Received Message</h2>
				<p>{message}</p>
			</div>
		</div>
	);
}
