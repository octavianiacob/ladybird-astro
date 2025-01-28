import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { Power2, Power4 } from "gsap";
import Lenis from "@studio-freight/lenis";
import { fadeInBox, fadeOutBox } from "./reusable-animations";
import { autoplayObserver } from "./autoplay-observer";
// import { animatePhoneText } from "./phone-animations";
import { onMount } from "solid-js";

gsap.registerPlugin(ScrollTrigger);

/* ---- Lenis Smooth Scroll ----- */
const lenis = new Lenis({
	lerp: 0.1, // Smoothness
});

lenis.on("scroll", ScrollTrigger.update);

function raf(time: number) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const introTl = gsap.timeline({
	scrollTrigger: {
		trigger: ".IntroSection", // Section to trigger the animation
		start: "top 20%",
		end: "bottom bottom",
		scrub: false, // Link animation to scroll progress
		// markers: true, // Enable for debugging
	},
});

introTl.to(".IntroSection__path", {
	// animate (draw) the circle
	// strokeDashoffset: 423.9,
	strokeDashoffset: 0,
	duration: 3.5,
	ease: "power4.inOut",
});

const plainTextInnerElements = document.querySelectorAll(
	".PlainTextSection__inner"
) as NodeListOf<HTMLElement>;

if (plainTextInnerElements.length > 0) {
	plainTextInnerElements.forEach((box, index) => {
		// Set initial opacity for all sections
		if (index === 0) {
			box.style.opacity = "1"; // First section visible by default
		} else {
			box.style.opacity = "0"; // All other sections hidden initially
		}

		gsap.to(box, {
			scrollTrigger: {
				trigger: box,
				start: "top top", // Start when this section hits the top
				end: "bottom top", // End when this section leaves the viewport
				pin: true, // Pin this section during the scroll
				snap: {
					snapTo: 1, // Snap to the next section (1 section per scroll)
					duration: 0.25, // Smooth snap animation duration
					ease: "power1.inOut", // Smooth easing for snap
				},
				onEnter: () => {
					gsap.to(box, { opacity: 1, duration: 0.5 }); // Fade in incoming section
				},
				onLeave: () => {
					gsap.to(box, { opacity: 0, duration: 0.5 }); // Fade out section being scrolled away
				},
				onEnterBack: () => {
					gsap.to(box, { opacity: 1, duration: 0.5 }); // Fade in section when scrolling back
				},
				onLeaveBack: () => {
					gsap.to(box, { opacity: 0, duration: 0.5 }); // Fade out section when scrolling back
				},
				// Optional: Add markers for debugging
				// markers: false,
			},
		});
	});
}

// -------------------------- Device Section Animation ---------------------------
let isLaptopPlaying = false;

const laptopEnterFunc = () => {
	// set the active tab
	const tabItems = document.querySelectorAll(".TabToggle__button");
	tabItems.forEach((tabItem, ind) => {
		if (tabItem.classList.contains("TabToggle__button--active")) {
			tabItem.classList.remove("TabToggle__button--active");
		}
	});

	tabItems[1].classList.add("TabToggle__button--active");

	// Play the video and hide the screen
	const video = document.querySelector(
		".LaptopSection__vid"
	) as HTMLVideoElement;
	const screen = document.querySelector(
		".LaptopSection__screen"
	) as HTMLElement;
	if (video && !isLaptopPlaying) {
		isLaptopPlaying = true;
		// lenis.stop(); // Pause the smooth scroll
		if (screen) screen.style.opacity = "0"; // Hide screen during video playback
		video.currentTime = 0; // Ensure it starts from the beginning
		video.play();

		video.onended = () => {
			// lenis.start();
			isLaptopPlaying = false;
		};
	}
};

onMount(() => {
	gsap.registerPlugin(ScrollTrigger);

	// Pin the TabToggle
	gsap.to(".DeviceSection__top", {
		scrollTrigger: {
			trigger: ".DeviceSectionWrapper",
			start: "top top",
			end: "bottom bottom",
			pin: true,
			pinSpacing: false,

			onEnter: () => {
				// Reset the active tab
				const tabItems = document.querySelectorAll(".TabToggle__button");
				tabItems.forEach((tabItem, ind) => {
					if (tabItem.classList.contains("TabToggle__button--active")) {
						tabItem.classList.remove("TabToggle__button--active");
					}
				});

				tabItems[0].classList.add("TabToggle__button--active");
			},
		},
	});

	// Animate the main content upwards
	gsap.to(".DeviceSection__main", {
		scrollTrigger: {
			trigger: ".PhoneSection",
			start: "top top",
			end: "bottom top",
			scrub: true, // Sync animation with scroll
		},
		yPercent: -50,
	});

	// Fade in and play LaptopSection video
	gsap.to(".LaptopSection", {
		scrollTrigger: {
			trigger: ".LaptopSection",
			start: "center center", // Adjust the timing as needed
			end: "center top",
			scrub: true,
			snap: {
				snapTo: 1,
				duration: 0.25,
				ease: "power1.inOut",
			},
			// markers: true,
			onEnter: () => laptopEnterFunc(),
			onEnterBack: () => laptopEnterFunc(),
			onLeaveBack: () => {
				// set the active tab
				const tabItems = document.querySelectorAll(".TabToggle__button");
				tabItems.forEach((tabItem, ind) => {
					if (tabItem.classList.contains("TabToggle__button--active")) {
						tabItem.classList.remove("TabToggle__button--active");
					}
				});

				tabItems[0].classList.add("TabToggle__button--active");

				const video = document.querySelector(
					".LaptopSection__vid"
				) as HTMLVideoElement;
				const screen = document.querySelector(
					".LaptopSection__screen"
				) as HTMLElement;
				if (video) {
					if (screen) screen.style.opacity = "0"; // Keep screen hidden
					video.pause();
					video.currentTime = 0; // Reset when scrolled out of view
					isLaptopPlaying = false;
				}
			},
		},
		opacity: 1,
		duration: 1,
	});

	// // Fade out LaptopSection and reset video
	// gsap.to(".LaptopSection", {
	// 	scrollTrigger: {
	// 		trigger: ".LaptopSection",
	// 		start: "bottom center",
	// 		end: "bottom top",
	// 		scrub: true,
	// 		onLeave: () => {
	// 			const video = document.querySelector(
	// 				".LaptopSection__vid"
	// 			) as HTMLVideoElement;
	// 			if (video) {
	// 				if (screen) screen.style.opacity = "0"; // Hide screen during video playback
	// 				video.pause();
	// 				video.currentTime = 0; // Reset when fully scrolled out
	// 				isLaptopPlaying = false;
	// 			}
	// 		},
	// 	},
	// 	// opacity: 0,
	// 	// delay: 4
	// 	markers: true,
	// });

	// Handle video end event
	const video = document.querySelector(
		".LaptopSection__vid"
	) as HTMLVideoElement;
	const screen = document.querySelector(
		".LaptopSection__screen"
	) as HTMLElement;
	if (video && screen) {
		video.addEventListener("ended", () => {
			screen.style.opacity = "1"; // Show the screen when video ends
		});
	}
});
// -------------------------------------------------------------------------------

const bottomTl = gsap.timeline({
	scrollTrigger: {
		trigger: ".BottomSectionWrapper", // Wrapper for all boxes
		// pin: true,
		start: "top 50%",
		end: `+=${innerHeight}`, // Each box gets a full viewport height
		scrub: true, // Smooth linking with scroll
		// markers: true, // Enable for debugging
	},
});

bottomTl.fromTo(
	".BottomSection > h1, .BottomSection__form, .BottomSection__brands",
	{ yPercent: 50, opacity: 0 },
	{
		yPercent: 0,
		opacity: 1,
		duration: 1.5,
		stagger: 0.3,
		ease: Power4.easeOut,
	}
);
