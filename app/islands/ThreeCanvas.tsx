import { type RefObject, useEffect, useRef } from "hono/jsx";
import * as THREE from "three";
import { useFireCreate } from "../hooks/useFireCreate";
import { useInitThree } from "../hooks/useInitThree";

interface ThreeCanvasProp {
	honoPoint: number;
	canvasWidth: number;
	canvasHeight: number;
}

export default function ThreeCanvas({
	honoPoint,
	canvasWidth,
	canvasHeight,
}: ThreeCanvasProp) {
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
		//画面の幅と高さを取得
		const width = canvasWidth;
		const height = canvasHeight;
		mountRef.current.style.width = `${width}px`;
		mountRef.current.style.height = `${height}px`;
		useInitThree(mountRef, rendererRef, cameraRef, sceneRef, lightRef);
		//クリーンアップ
		return () => {
			if (mountRef.current && rendererRef.current) {
				mountRef.current.removeChild(rendererRef.current.domElement);
			}
		};
	});

	useEffect(() => {
		//cubeを追加
		if (sceneRef.current) {
			fireRef.current = useFireCreate(sceneRef);

			const animate = () => {
				if (fireRef.current && honoPoint) {
					fireRef.current.material.uniforms.scale.value = new THREE.Vector3(
						0.5 + honoPoint,
						1 + honoPoint * 2,
						0.5 + honoPoint,
					);
					fireRef.current.scale.set(
						0.5 + honoPoint,
						1 + honoPoint * 2,
						0.5 + honoPoint,
					);
				}
				requestAnimationFrame(animate);
			};
			animate();
		}
	}, [sceneRef.current]);

	return <div ref={mountRef} />;
}
