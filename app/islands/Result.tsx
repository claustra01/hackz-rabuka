export default function Result() {
	const toTop = () => {
		window.location.href = "/";
	};

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
					>
						トップへ
					</button>
				</div>
			</div>
		</div>
	);
}
