import { useEffect, useState } from "hono/jsx";
import { scaleUpButton } from "../utils/style";

export default function Result() {
	const [result, setResult] = useState<string>("");

	const toTop = () => {
		window.location.href = "/";
	};

	useEffect(() => {
		const roomId = localStorage.getItem("roomId");
		if (!roomId) {
			window.location.href = "/";
		}
		//roomIdからresultを取得
		setResult(result);
		localStorage.clear();
	}, []);

	return (
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
				<h1>君の負けだよ！🔥</h1>
				<div style={{ display: "flex", justifyContent: "center" }}>
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
						class={scaleUpButton}
					>
						トップへ
					</button>
				</div>
			</div>
		</div>
	);
}
