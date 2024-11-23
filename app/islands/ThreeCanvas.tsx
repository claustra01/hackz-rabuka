import { type RefObject, useEffect, useRef } from "hono/jsx";
import * as THREE from "three";
import { useFireCreate } from "../hooks/useFireCreate";
import { useInitThree } from "../hooks/useInitThree";

interface ThreeCanvasProp {
	honoPoint: RefObject<number>;
}

export default function ThreeCanvas({ honoPoint }: ThreeCanvasProp) {
	const mountRef = useRef<HTMLDivElement>(null);
	const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
	const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
	const sceneRef = useRef<THREE.Scene | null>(null);
	const lightRef = useRef<THREE.DirectionalLight | null>(null);
	const fireRef = useRef<THREE.Mesh<
		THREE.BoxGeometry,
		THREE.ShaderMaterial,
		THREE.Object3DEventMap
	> | null>(null);

	useEffect(() => {
		//mountRefのサイズを設定
		if (!mountRef.current) return;
		console.log("done");
		const width = window.innerWidth;
		const height = window.innerHeight;
		mountRef.current.style.width = `${width}px`;
		mountRef.current.style.height = `${height}px`;
		useInitThree(mountRef, rendererRef, cameraRef, sceneRef, lightRef);
	});

	useEffect(() => {
		//cubeを追加
		if (sceneRef.current) {
			fireRef.current = useFireCreate(sceneRef);

			const animate = () => {
				if (fireRef.current && honoPoint.current) {
					fireRef.current.material.uniforms.scale.value = new THREE.Vector3(
						0.5 + honoPoint.current,
						1 + honoPoint.current * 2,
						0.5 + honoPoint.current,
					);
					fireRef.current.scale.set(
						0.5 + honoPoint.current,
						1 + honoPoint.current * 2,
						0.5 + honoPoint.current,
					);
				}
				requestAnimationFrame(animate);
			};
			animate();
		}
	}, [sceneRef.current]);

	return <div ref={mountRef} />;
}