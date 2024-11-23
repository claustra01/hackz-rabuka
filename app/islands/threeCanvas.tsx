import { useEffect, useRef } from "hono/jsx";
import type * as THREE from "three";
import { useFireCreate } from "../hooks/useFireCreate";
import { useInitThree } from "../hooks/useInitThree";

export default function ThreeCanvas() {
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
    //cubeを追加
    if (sceneRef.current) {
      useFireCreate(sceneRef);
    }
  }, [sceneRef.current]);

  return <div ref={mountRef} />;
}
