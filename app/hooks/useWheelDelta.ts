import { useEffect, useState } from "hono/jsx";

interface WheelEventState {
	deltaX: number;
	deltaY: number;
}

export const useMouseWheel = () => {
	const [wheelState, setWheelState] = useState<WheelEventState>({
		deltaX: 0,
		deltaY: 0,
	});

	const resetDelta = () => {
		setWheelState({
			deltaX: 0,
			deltaY: 0,
		});
	};

	useEffect(() => {
		const handleWheel = (event: WheelEvent) => {
			setWheelState((prevState) => ({
				deltaX: prevState.deltaX + Math.abs(event.deltaX),
				deltaY: prevState.deltaY + Math.abs(event.deltaY),
			}));
		};

		window.addEventListener("wheel", handleWheel);

		return () => {
			window.removeEventListener("wheel", handleWheel);
		};
	}, []);

	return { wheelState, resetDelta };
};
