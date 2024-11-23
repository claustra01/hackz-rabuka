import { useRef } from "hono/jsx";
import { useBloadcast } from "../hooks/useBloadcast";
import AudioClass from "./AudioClass";
import ThreeCanvas from "./ThreeCanvas";

export default function GameDisplay() {
	const ownHonoPoint = useRef<number>(0);
	const { isReady, fireStatus, sendMessage } = useBloadcast();
	const room = "room1";
	const client = "client1";

	fireStatus.forEach((value, key) => {
		if (key === room) {
			value.forEach((value, key) => {
				if (key === client) {
					ownHonoPoint.current = value;
					console.log(ownHonoPoint.current);
				}
			});
		}
	});

	return (
		<>
			<AudioClass
				honoPoint={ownHonoPoint}
				client={client}
				room={room}
				isReady={isReady}
				sendMessage={sendMessage}
			/>
			{Array.from(fireStatus.entries()).map(([roomKey, roomValue]) => {
				if (roomKey === room) {
					return Array.from(roomValue.entries()).map(
						([clientKey, clientValue]) => {
							return <ThreeCanvas honoPoint={clientValue} key={clientKey} />;
						},
					);
				}
				return null;
			})}
		</>
	);
}
