import { RefObject } from "hono/jsx";
import * as THREE from "three";

export const useInitThree = (
  mountRef: RefObject<HTMLDivElement>,
  rendererRef: RefObject<THREE.WebGLRenderer | null>,
  cameraRef: RefObject<THREE.PerspectiveCamera | null>,
  sceneRef: RefObject<THREE.Scene | null>,
  lightRef: RefObject<THREE.DirectionalLight | null>
) => {
  if (!mountRef.current) return;
  console.log("init");
  //スクリーンサイズに合わせてレンダラーを作成
  const width = mountRef.current.clientWidth;
  const height = mountRef.current.clientHeight;
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  mountRef.current.appendChild(renderer.domElement);
  rendererRef.current = renderer;
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5;
  cameraRef.current = camera;
  const scene = new THREE.Scene();
  sceneRef.current = scene;
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 0, 1);
  scene.add(light);
  lightRef.current = light;
  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    console.log("animate");
  };
  animate();
};
