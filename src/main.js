import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(5, 32, 32);
const material = new THREE.MeshBasicMaterial();
const mesh = new THREE.Mesh(geometry, material);
mesh.material.side = THREE.DoubleSide;
// cube.scale.set(-1, 1, 1);
scene.add(mesh);

camera.position.z = 5;

// Texture
const loader = new THREE.TextureLoader();
// const imageUrl = browser.extension.getURL("images/bg.jpg");
const texture = loader.load("/bg.jpg");
material.map = texture;

// Adding OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;

controls.update();

// Animating the scene
function animate() {
  requestAnimationFrame(animate);

  controls.update();
  //   Rotate
  mesh.rotation.y += 0.002;

  renderer.render(scene, camera);
}

animate();
