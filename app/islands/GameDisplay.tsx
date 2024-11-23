import { useRef } from "hono/jsx";
import AudioClass from "./AudioClass";
import ThreeCanvas from "./ThreeCanvas";

export default function GameDisplay() {
	const honoPointRef = useRef<number>(0);
	return (
		<div>
			<ThreeCanvas honoPoint={honoPointRef} />
			<AudioClass honoPoint={honoPointRef} />
		</div>
	);
}
