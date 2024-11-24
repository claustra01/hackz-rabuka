import { useEffect } from "hono/jsx";
import { scaleUpButton } from "../utils/style";

export default function Top() {
	const toCreate = () => {
		window.location.href = "/create";
	};
	const toJoin = () => {
		window.location.href = "/join";
	};

	useEffect(() => {
		localStorage.clear();
	}, []);

	return (
		<div
			style={{
				height: "100vh",
				width: "100%",
				overflow: "hidden",
				background: "linear-gradient(to bottom, #ffff00, #ffaa00, #ff5500)", // 修正箇所
				backgroundAttachment: "fixed",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<div
				style={{
					maxHeight: "500px",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<h1
					initial={{ scale: 0.5, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					🔥くそデカほのおくん🔥
				</h1>
				<div
					style={{ display: "flex", justifyContent: "space-between", gap: 24 }}
				>
					<button
						type="button"
						onClick={toCreate}
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
						}}
						class={scaleUpButton}
					>
						部屋を作成
					</button>
					<button
						type="button"
						onClick={toJoin}
						style={{
							padding: "1rem 2rem",
							backgroundColor: "#f59e0b",
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
						部屋に入る
					</button>
				</div>
			</div>
		</div>
	);
}
