import { hc } from "hono/client";
import { useEffect, useState } from "hono/jsx";
import type { AppType } from "../../websocket/src";

type resultData = {
	clientid: string;
	value: number;
};

export default function Result() {
	const [result, setResult] = useState<resultData[]>();
	const [winner, setWinner] = useState<string>("");

	const toTop = () => {
		window.location.href = "/";
	};

	useEffect(() => {
		const fetchResult = async () => {
			const roomId = localStorage.getItem("roomId");
			if (!roomId) {
				window.location.href = "/";
				return;
			}
			try {
				const client = hc<AppType>("http://localhost:33000/");
				const res = await client.result.$get({
					query: { roomId },
				});

				if (res.ok) {
					const data = await res.json();
					setResult(data);

					const winnerClient = data.reduce((prev, curr) =>
						curr.value > prev.value ? curr : prev,
					);
					setWinner(winnerClient.clientid);
				}
			} catch (err) {
				console.error("Failed to fetch result:", err);
			} finally {
				localStorage.removeItem("roomId");
			}
		};

		fetchResult();
	}, []);

	return result && result.length > 0 ? (
		<div
			style={{
				height: "100vh",
				width: "100%",
				overflow: "hidden",
				background: "linear-gradient(to bottom, #ffff00, #ffaa00, #ff5500)",
				backgroundAttachment: "fixed",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
				勝者: {localStorage.getItem("clientId") === winner ? "あなた" : "相手"}{" "}
				🎉
			</h1>
			<div
				style={{
					backgroundColor: "rgba(255, 255, 255, 0.8)",
					padding: "1.5rem",
					borderRadius: "1rem",
					boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
					maxWidth: "600px",
					width: "90%",
					textAlign: "center",
				}}
			>
				<h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
					{localStorage.getItem("clientId") === winner
						? "あなたの勝ち！🎉"
						: "残念、あなたの負け🔥"}
				</h2>
				<ul style={{ listStyle: "none", padding: 0 }}>
					{result.map((item) => {
						const isMe = item.clientid === localStorage.getItem("clientId");
						return (
							<li
								key={item.clientid}
								style={{
									fontSize: "1.2rem",
									margin: "0.5rem 0",
									fontWeight: item.clientid === winner ? "bold" : "normal",
									color: item.clientid === winner ? "#ff5500" : "#333",
								}}
							>
								{isMe ? "あなた" : "相手"}: {item.value} 点
							</li>
						);
					})}
				</ul>
			</div>
			<button
				type="button"
				onClick={toTop}
				style={{
					marginTop: "2rem",
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
					cursor: "pointer",
				}}
			>
				トップへ
			</button>
		</div>
	) : (
		<div
			style={{
				height: "100vh",
				width: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				background: "linear-gradient(to bottom, #ffff00, #ffaa00, #ff5500)",
			}}
		>
			<h1>Loading...</h1>
		</div>
	);
}
