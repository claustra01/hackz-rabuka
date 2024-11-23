import type { RefObject } from "hono/jsx";
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
  camera.position.z = 4;
  camera.position.y = 1;
  //カメラの向きを変更
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  //skyboxを作成
  const skybox = new THREE.Mesh(
    new THREE.BoxGeometry(100, 100, 100),
    new THREE.MeshBasicMaterial({
      color: 0x87ceeb,
      side: THREE.BackSide,
    })
  );
  //地面を作成
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x449944 });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(0, -1, 0);
  cube.scale.set(30, 1, 10);
  cameraRef.current = camera;
  const scene = new THREE.Scene();
  sceneRef.current = scene;
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 4, 0);
  scene.add(light);
  scene.add(skybox);
  scene.add(cube);
  lightRef.current = light;
  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };
  animate();
};
