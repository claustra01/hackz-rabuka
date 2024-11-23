import { useRef, useEffect, use } from "hono/jsx";
import { useInitThree } from "./hooks/useInitThree";
import * as THREE from "three";

type ThreeCanvasProp = {};

export default function ThreeCanvas({}: ThreeCanvasProp) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const lightRef = useRef<THREE.DirectionalLight | null>(null);
  const objectRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    //mountRefのサイズを設定
    if (!mountRef.current) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    mountRef.current.style.width = `${width}px`;
    mountRef.current.style.height = `${height}px`;
    useInitThree(mountRef, rendererRef, cameraRef, sceneRef, lightRef);
  });

  useEffect(() => {
    //cubeを作成
    if (!sceneRef.current) return;
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    sceneRef.current.add(cube);
    objectRef.current = cube;
  }, [sceneRef.current]);

  useEffect(() => {
    //cubeを回転
    if (!objectRef.current) return;
    const animate = () => {
      if (!objectRef.current || !sceneRef.current || !cameraRef.current) return;
      objectRef.current.rotation.x += 0.01;
      objectRef.current.rotation.y += 0.01;
      rendererRef.current?.render(sceneRef.current, cameraRef.current);
      requestAnimationFrame(animate);
    };
    animate();
  }, [objectRef.current]);

  return <div ref={mountRef} />;
}
