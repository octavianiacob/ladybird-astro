import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { gsap } from "gsap";

// TypeScript-specific interface for GLTFLoader
interface GLTF {
	scene: THREE.Group;
}

let macbook: THREE.Group | undefined;

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75, // Field of view
	window.innerWidth / window.innerHeight,
	1,
	1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff); // Set background color to white
document.body.appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Load the MacBook model
const loader = new GLTFLoader();
loader.load("/3d/macbook_air_animada.glb", (gltf: GLTF) => {
	macbook = gltf.scene;
	scene.add(macbook);

	// Position the MacBook (closed state)
	macbook.rotation.x = Math.PI / 2; // Lid closed
	macbook.position.set(0, -1, 0);

	// Animate the MacBook opening
	// const tl = gsap.timeline({ paused: true });
	// tl.to(macbook.rotation, { x: Math.PI / 4, duration: 2 }); // Open the lid
	// tl.to(macbook.position, { y: 0, duration: 1 }, "<"); // Lift the MacBook

	// Enable scrubbing via a slider
	const scrubber = document.createElement("input");
	scrubber.type = "range";
	scrubber.min = "0";
	scrubber.max = "100"; // Set max to 100 for full range
	scrubber.step = "0.1"; // Optional: finer control
	scrubber.style.position = "absolute";
	scrubber.style.bottom = "20px";
	scrubber.style.left = "50%";
	scrubber.style.transform = "translateX(-50%)";
	document.body.appendChild(scrubber);

	// Play the animation automatically for demonstration (optional)
	// tl.play();
});

// Add OrbitControls for better view manipulation
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 20, 40); // Much closer to the MacBook
controls.target.set(0, 0, 0); // Focus on the center of the MacBook
controls.enableZoom = false;
controls.update();

// Animate the scene
const animate = () => {
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, camera);
};
animate();

// const result = await new GLTFLoader().loadAsync("/3d/macbook_air_animada.glb");
// scene.add(result.scene);
