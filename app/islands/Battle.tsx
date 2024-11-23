import { useEffect } from "hono/jsx";

export default function Battle() {
	useEffect(() => {
		const roomId = localStorage.getItem("roomId");
		if (!roomId) {
			window.location.href = "/";
		}
	}, []);

	return <>battle</>;
}
