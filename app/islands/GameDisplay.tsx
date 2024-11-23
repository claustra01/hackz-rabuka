import { useRef } from "hono/jsx";
import ThreeCanvas from "./ThreeCanvas";
import AudioClass from "./AudioClass";

export default function GameDisplay() {
  const honoPointRef = useRef<number>(0);
  return (
    <div>
      <ThreeCanvas honoPoint={honoPointRef} />
      <AudioClass honoPoint={honoPointRef} />
    </div>
  );
}
