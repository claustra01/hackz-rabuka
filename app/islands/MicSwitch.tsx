import { type RefObject, useEffect, useState } from "hono/jsx";

interface MicSwitchProp {
	stream: RefObject<MediaStream | null>;
	isPlaying: boolean;
	setIsPlaying: (bool: boolean) => void;
}

export default function MicSwitch({
	stream,
	isPlaying,
	setIsPlaying,
}: MicSwitchProp) {
	const handleMic = async () => {
		const constraints = { audio: true };
		if (!isPlaying) {
			try {
				stream.current = await navigator.mediaDevices.getUserMedia(constraints);
				setIsPlaying(true);
			} catch (err) {
				console.log(`The following error occured: ${err}`);
				alert("getUserMedia not supported on your browser");
			}
		} else {
			for (const track of stream.current?.getTracks() || []) {
				track.stop();
			}
			setIsPlaying(false);
		}
	};

	return (
		<>
			{!isPlaying ? (
				<button
					type="button"
					onClick={handleMic}
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
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						zIndex: "100",
					}}
				>
					{isPlaying ? "stop" : "Honoを育てる!!"}
				</button>
			) : null}
		</>
	);
}
