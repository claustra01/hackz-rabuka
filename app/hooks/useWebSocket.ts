import { useEffect, useState } from "hono/jsx";
import { serverDomain } from "../utils/const";

const useWebSocket = () => {
	const [socket, setSocket] = useState<WebSocket | null>(null);
	const [message, setMessage] = useState<string>("");

	const url = `ws://${serverDomain}/ws`;

	useEffect(() => {
		const ws = new WebSocket(url);

		ws.onmessage = (event) => {
			setMessage(event.data);
		};
		ws.onopen = () => {
			console.log("WebSocket connection established");
		};
		ws.onclose = () => {
			console.log("WebSocket connection closed");
		};
		setSocket(ws);

		// クリーンアップ関数（コンポーネントのアンマウント時にWebSocketを閉じる）
		return () => {
			ws.close();
		};
	}, [url]);

	return { socket, message };
};

export default useWebSocket;
