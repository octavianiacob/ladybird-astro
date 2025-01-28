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

const canvasEl: Element = document.querySelector(
	".LaptopSection__inner canvas"
)!;

const renderer = new THREE.WebGLRenderer({
	alpha: true,
	canvas: canvasEl,
});
renderer.setSize(window.innerWidth, window.innerHeight, true);
renderer.setPixelRatio(window.devicePixelRatio);

const LaptopSection = document.querySelector(".LaptopSection__inner");
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
controls.enablePan = false; // Disable panning
controls.enableRotate = false; // Disable rotation
controls.update();

// Variables for the GLTF Model
let object: THREE.Group<THREE.Object3DEventMap>;
let mixer: THREE.AnimationMixer; // Animation mixer
let clipDuration = 0; // Duration of the animation clip
let isPlaying = false; // Animation state

// Load the GLTF Model
const loader = new GLTFLoader();
loader.load(
	`/3d/macbook_pro_13_inch_2020.glb`,
	function (gltf) {
		object = gltf.scene;
		// object.scale.set(80, 80, 80); // Scale up the object

		// ----------------- Manage object scale -----------------
		function updateObjectScale() {
			const aspectRatio = window.innerWidth / window.innerHeight;

			// Adjust the scale dynamically based on the aspect ratio
			if (aspectRatio > 1) {
				// Landscape: Scale uniformly based on width
				object.scale.set(80, 80 / aspectRatio, 80);
			} else {
				// Portrait: Scale uniformly based on height
				object.scale.set(80 * aspectRatio, 80, 80);
			}
		}

		// Call this function once after adding the object
		updateObjectScale();

		// Add a listener to handle resizing
		window.addEventListener("resize", updateObjectScale);

		// ----------------- Custom adjustments -----------------
		object.position.set(0, -5, 0);
		object.rotation.x = THREE.MathUtils.degToRad(-8); // Tilt backward by 8 degrees
		scene.add(object);

		camera.position.set(0, 0, 40); // Bring the camera closer
		camera.lookAt(0, -10, 0);

		// // Set up animation mixer
		// if (gltf.animations.length > 0) {
		// 	// mixer = new THREE.AnimationMixer(object);
		// 	// const clip = gltf.animations[0]; // Assuming single animation
		// 	// clipDuration = clip.duration;

		// 	// Play all animations on load
		// 	// gltf.animations.forEach((clip) => {
		// 	// 	const action = mixer.clipAction(clip);

		// 	// 	// Disable looping and stop at the last frame
		// 	// 	action.loop = THREE.LoopOnce;
		// 	// 	action.clampWhenFinished = true;

		// 	// 	action.timeScale = 0.01; // Adjust speed if needed
		// 	// 	action.play();
		// 	// });

		// 	// Use GSAP ScrollTrigger directly on the mixer
		// 	// const objectTl = gsap
		// 	// 	.timeline({
		// 	// 		scrollTrigger: {
		// 	// 			trigger: ".LaptopSection", // Section to trigger the animation
		// 	// 			start: "top 20%",
		// 	// 			end: "bottom 100%",
		// 	// 			scrub: true, // Link animation to scroll progress
		// 	// 			markers: true, // Enable for debugging
		// 	// 		},
		// 	// 	})
		// 	// 	.to(
		// 	// 		{ time: 0 }, // Dummy property to control time
		// 	// 		{
		// 	// 			time: clipDuration, // Animate from 0 to the clip's duration
		// 	// 			onUpdate: function () {
		// 	// 				mixer.setTime(this.targets()[0].time * 19.5);
		// 	// 			},
		// 	// 		}
		// 	// 	)
		// 	// 	.to(".LaptopSection__screen", {
		// 	// 		opacity: 1,
		// 	// 		duration: 1,
		// 	// 		delay: 1,
		// 	// 	});

		// 	mixer = new THREE.AnimationMixer(object);
		// 	gltf.animations.forEach((clip) => {
		// 		const action = mixer.clipAction(clip);

		// 		// Disable looping and stop at the last frame
		// 		// action.loop = THREE.LoopOnce;
		// 		// action.clampWhenFinished = true;

		// 		// action.timeScale = 1; // Adjust speed if needed
		// 		action.play();
		// 	});

		// 	// gsap.to(
		// 	// 	{ time: 0 }, // Dummy property to control time
		// 	// 	{
		// 	// 		scrollTrigger: {
		// 	// 			trigger: ".LaptopSection", // Section to trigger the animation
		// 	// 			start: "top 20%",
		// 	// 			end: "bottom 100%",
		// 	// 			// scrub: true, // Link animation to scroll progress
		// 	// 			markers: true, // Enable for debugging
		// 	// 		},
		// 	// 		// time: clipDuration, // Animate from 0 to the clip's duration
		// 	// 		// onUpdate: function () {
		// 	// 		// 	mixer.setTime(this.targets()[0].time * 19.5);
		// 	// 		// },
		// 	// 		onComplete: () => {
		// 	// 			// gsap.to(".LaptopSection__screen", {
		// 	// 			// 	opacity: 1,
		// 	// 			// 	duration: 1,
		// 	// 			// 	delay: 1,
		// 	// 			// });
		// 	// 		},
		// 	// 	}
		// 	// );
		// }

		if (gltf.animations.length > 0) {
			// Assuming the GLTF model contains a single animation
			const clip = gltf.animations[0];
			mixer = new THREE.AnimationMixer(object);
			const action = mixer.clipAction(clip);

			action.loop = THREE.LoopOnce; // Play the animation once
			action.clampWhenFinished = true; // Stop at the last frame

			// Set up a half-duration range
			const halfDuration = clip.duration * 0.18;
			action.timeScale = 1; // Normal playback speed

			// Create ScrollTrigger to trigger the animation
			ScrollTrigger.create({
				trigger: ".LaptopSection", // Section to trigger the animation
				start: "top top", // Trigger when the section reaches the top of the viewport
				onEnter: () => {
					if (isPlaying) return; // Prevent overlapping animations
					gsap.to(".LaptopSection__screen", {
						opacity: 0,
						duration: 0.0001,
						// delay: 1,
					});
					isPlaying = true; // Set the animation state
					action.reset().play(); // Reset and play the animation

					// Pause the animation when it reaches the halfway point
					setTimeout(() => {
						action.paused = true; // Pause the action at 50%

						gsap.to(".LaptopSection__screen", {
							opacity: 1,
							duration: 1,
							// delay: 1,
							onComplete: () => {
								isPlaying = false; // Reset the animation state
							},
						});
					}, (halfDuration / action.timeScale) * 1000); // Convert to milliseconds
				},
				// markers: true, // Debug markers (optional)
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

const clock = new THREE.Clock();
// Render the Scene and Update Animations
function animate() {
	requestAnimationFrame(animate);

	const deltaTime = clock.getDelta(); // Get time elapsed since the last frame
	if (mixer) mixer.update(deltaTime); // Update the animation mixer

	renderer.render(scene, camera);
	controls.update();
}

animate();
