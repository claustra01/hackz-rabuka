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
		<button type="button" onClick={handleMic}>
			{isPlaying ? "stop" : "Honoを育てる!!"}
		</button>
	);
}
