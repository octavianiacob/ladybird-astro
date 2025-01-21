import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Create a Three.js Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	30,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const LaptopSection = document.querySelector(".LaptopSection");
if (LaptopSection) LaptopSection.appendChild(renderer.domElement);

// camera.position.y = 500;
camera.position.set(0, 0, 50);
// camera.position.z = 50;

// Add Lights
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(500, 500, 500);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x333333, 1);
scene.add(ambientLight);

// OrbitControls for the Camera
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false; // Disable zooming
controls.update();

// Variables for the GLTF Model
let object;
let mixer: THREE.AnimationMixer; // Animation mixer
let clipDuration = 0; // Duration of the animation clip

// Load the GLTF Model
const loader = new GLTFLoader();
loader.load(
	`/3d/macbook_pro_13_inch_2020.glb`,
	function (gltf) {
		object = gltf.scene;
		object.scale.set(80, 80, 80); // Scale up the object
		object.position.set(0, -10, 0);
		object.rotation.x = THREE.MathUtils.degToRad(-13); // Tilt backward by 10 degrees
		scene.add(object);

		camera.position.set(0, 0, 40); // Bring the camera closer
		camera.lookAt(0, -10, 0);

		// Set up animation mixer
		if (gltf.animations.length > 0) {
			mixer = new THREE.AnimationMixer(object);
			const clip = gltf.animations[0]; // Assuming single animation
			clipDuration = clip.duration;

			// Play all animations on load
			gltf.animations.forEach((clip) => {
				const action = mixer.clipAction(clip);

				// Disable looping and stop at the last frame
				action.loop = THREE.LoopOnce;
				action.clampWhenFinished = true;

				action.timeScale = 0.18; // Adjust speed if needed
				action.play();
			});

			// Use GSAP ScrollTrigger directly on the mixer
			const objectTl = gsap
				.timeline({
					scrollTrigger: {
						trigger: ".LaptopSection", // Section to trigger the animation
						start: "top 20%",
						end: "bottom bottom",
						scrub: true, // Link animation to scroll progress
						markers: true, // Enable for debugging
					},
				})
				.to(
					{ time: 0 }, // Dummy property to control time
					{
						time: clipDuration, // Animate from 0 to the clip's duration
						onUpdate: function () {
							mixer.setTime(this.targets()[0].time);
						},
					}
				)
				.to(".LaptopSection__screen", {
					opacity: 1,
					duration: 1,
					delay: 1,
				});
		}
	},
	function (xhr) {
		console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
	},
	function (error) {
		console.error("Error loading the model:", error);
	}
);

// Handle Window Resizing
window.addEventListener("resize", function () {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});

// Render the Scene and Update Animations
function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	controls.update();
}

animate();
