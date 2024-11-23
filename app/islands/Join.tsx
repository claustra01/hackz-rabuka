import { useEffect, useState } from "hono/jsx";
import useConnectRoom from "../hooks/useConnectRoom";
import useWebSocket from "../hooks/useWebSocket";
import { hashing } from "../utils/hashing";
import Loading from "./Loading";

export default function Join() {
	const [waiting, setWaiting] = useState<boolean>(false);
	const [keyword, setKeyword] = useState<string>("");

	const { joinRoom, ready } = useConnectRoom();

	const toTop = () => {
		window.location.href = "/";
	};

	useEffect(() => {
		localStorage.clear();
	}, []);

	const handleJoinRoom = async () => {
		if (keyword === "") {
			alert("合言葉を入力してください");
			return;
		}
		try {
			const roomId = (await hashing(keyword)) as string;
			const clientId = "2";
			joinRoom(roomId, clientId);
			setWaiting(true);
			localStorage.setItem("clientId", clientId);
			localStorage.setItem("roomId", roomId);
		} catch (e) {
			console.error(e);
			setWaiting(false);
			alert("部屋が存在しません");
			localStorage.clear();
		}
	};

	useEffect(() => {
		if (ready) {
			window.location.href = "/play";
		}
	}, [ready]);

	return !waiting ? (
		<div
			style={{
				height: "100vh",
				width: "100%",
				overflow: "hidden",
				background: "linear-gradient(to bottom, #ffff00, #ffaa00, #ff5500)",
				backgroundAttachment: "fixed",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<div>
				<input
					value={keyword}
					onInput={(e: InputEvent) => {
						const target = e.target as HTMLInputElement;
						if (target) {
							setKeyword(target.value);
						}
					}}
					type="text"
					placeholder="合言葉を入力"
					style={{
						padding: "1rem",
						borderRadius: "0.5rem",
						border: "1px solid #ccc",
						fontSize: "1.5rem",
						width: "100%",
						boxSizing: "border-box",
						marginBottom: "1rem",
					}}
				/>
				<div
					style={{ display: "flex", justifyContent: "space-between", gap: 24 }}
				>
					<button
						type="button"
						onClick={toTop}
						style={{
							padding: "1rem 2rem",
							backgroundColor: "#6b7280",
							color: "white",
							borderRadius: "1rem",
							fontSize: "1.5rem",
							fontWeight: "600",
							transition: "background-color 0.3s, transform 0.3s",
							border: "none",
							boxShadow:
								"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
							":hover": {
								transform: "scale(1.05)",
							},
						}}
					>
						戻る
					</button>
					<button
						onClick={handleJoinRoom}
						type="button"
						style={{
							padding: "1rem 2rem",
							backgroundColor: "#dc2626",
							color: "white",
							borderRadius: "1rem",
							fontSize: "1.5rem",
							fontWeight: "600",
							transition: "background-color 0.3s, transform 0.3s",
							border: "none",
							boxShadow:
								"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
							":hover": {
								transform: "scale(1.05)",
							},
						}}
					>
						部屋に入る
					</button>
				</div>
			</div>
		</div>
	) : (
		<Loading />
	);
}
