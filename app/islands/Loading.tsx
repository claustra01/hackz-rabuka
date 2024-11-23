export default function Loading() {
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
				<div className="spinner-container">
					<div className="spinner" />
					<style jsx>{`
            .spinner-container {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;
            }
            .spinner {
              width: 50px;
              height: 50px;
              border: 5px solid #f3f3f3;
              border-top: 5px solid #ff0000;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}</style>
				</div>
			</div>
		</div>
	);
}
