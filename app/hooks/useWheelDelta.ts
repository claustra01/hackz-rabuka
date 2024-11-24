import { useEffect, useRef, useState } from "hono/jsx";

interface WheelEventState {
	deltaX: number;
	deltaY: number;
}

export const useMouseWheel = () => {
	const wheelState = useRef<WheelEventState>({
		deltaX: 0,
		deltaY: 0,
	});

	const resetDelta = () => {
		wheelState.current = {
			deltaX: 0,
			deltaY: 0,
		};
	};

	useEffect(() => {
		const handleWheel = (event: WheelEvent) => {
			console.log("useMouseWheel effect");
			if (wheelState.current !== null) {
				wheelState.current = {
					deltaX: Math.abs(event.deltaX) + wheelState.current.deltaX,
					deltaY: Math.abs(event.deltaY + wheelState.current.deltaY),
				};
			}
		};

		window.addEventListener("wheel", handleWheel);

		return () => {
			window.removeEventListener("wheel", handleWheel);
		};
	}, []);

	return { wheelState, resetDelta };
};
