import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { Power2, Power4 } from "gsap";
import Lenis from "@studio-freight/lenis";
import { fadeInBox, fadeOutBox } from "./reusable-animations";
import { autoplayObserver } from "./autoplay-observer";
// import { animatePhoneText } from "./phone-animations";
import { onMount } from "solid-js";
import {
	detectAutoScrollComplete,
	runIfFromScratch,
} from "./detect-auto-scroll-complete";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({
	ignoreMobileResize: true,
});
ScrollTrigger.normalizeScroll(true);

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

let shouldScrollThroughPlainText = true;

const introTl = gsap.timeline({
	scrollTrigger: {
		trigger: ".IntroSection", // Section to trigger the animation
		start: "top 20%",
		end: "bottom bottom",
		scrub: false, // Link animation to scroll progress
		// markers: true, // Enable for debugging
		// onEnter: () => {
		// 	shouldScrollThroughPlainText = true;
		// },
	},
});

introTl.to(".IntroSection", {
	opacity: 1,
	duration: 0.25,
});

let lastScrollTop = 0;
let scrollTop = 0;
window.addEventListener("scroll", (e) => {
	scrollTop = window.scrollY || document.documentElement.scrollTop;

	// if scrollPosition is equal to viewport height, then enable scroll
	// console.log(window.scrollY, window.innerHeight);
	if (window.scrollY < 10) {
		// isMoving = false;
	}
	if (
		window.scrollY > window.innerHeight &&
		window.scrollY < window.innerHeight + 200 &&
		// window.scrollY < window.innerHeight * 2 &&
		// !isMoving &&
		shouldScrollThroughPlainText &&
		scrollTop > lastScrollTop
	) {
		scrollToPlainText();
		disableScroll();
	}

	if (scrollTop > lastScrollTop) {
		gsap.to(".IntroSection", {
			opacity: 1,
			duration: 0.5,
		});
	}

	lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative values

	runIfFromScratch(() => {
		shouldScrollThroughPlainText = true;
	});
});

export const scrollToDevice = () => {
	// window.scrollTo({ top: window.innerHeight * 2, behavior: "smooth" });
	// document
	// 	.getElementById("DeviceSection")
	// 	?.scrollIntoView({ behavior: "smooth" });
	shouldScrollThroughPlainText = false;

	const target = document.getElementById("DeviceSection");
	if (target) {
		const topOffset = target.getBoundingClientRect().top + window.scrollY;
		window.scrollTo({ top: topOffset, behavior: "smooth" });
	}
};

export const scrollToPlainText = () => {
	// window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
	// document
	// 	.getElementById("PlainTextSectionFixed")
	// 	?.scrollIntoView({ behavior: "smooth" });
	const target = document.getElementById("PlainTextSectionFixed");
	if (target) {
		const topOffset = target.getBoundingClientRect().top + window.scrollY;
		window.scrollTo({ top: topOffset, behavior: "smooth" });
	}
};

export function disableScroll() {
	// Save the current scroll position

	// Set the body styles to "lock" the scroll.
	// Using position: fixed prevents further scroll while preserving the current view.
	document.body.style.overflow = "hidden";
	document.body.style.position = "fixed";
	document.body.style.top = `-${window.innerHeight}px`;

	// Optionally, if you're using Lenis you might want to pause it:
	// lenis.stop();
}
export function enableScroll() {
	// Restore the body's scrollability
	document.body.style.overflow = "";
	document.body.style.position = "";
	document.body.style.top = "";

	// Optionally, if you're using Lenis you might want to resume it:
}

const plainTextInnerElements = document.querySelectorAll(
	".PlainTextSection__inner"
) as NodeListOf<HTMLElement>;
const plainTextSection = document.querySelector(
	".PlainTextSection"
) as HTMLElement;

const plainTl = gsap.timeline({
	paused: true,
	onComplete: () => {
		// Enable scroll when animation completes

		enableScroll();
		scrollToDevice();
	},
});
plainTl.to(".IntroSection", {
	opacity: 0,
	duration: 0.5,
});

if (plainTextInnerElements.length > 0) {
	plainTextInnerElements.forEach((_, index) => {
		if (index < plainTextInnerElements.length - 1)
			plainTl
				.to({}, { duration: 1.5 }) // Pause before moving to the next section
				.to(
					".PlainTextSection",
					{
						opacity: 1,
						duration: 0.5,
					},
					"<"
				)
				.to(".PlainTextSection", {
					yPercent: -(100 / plainTextInnerElements.length) * (index + 1),
					duration: 1,
					ease: "power2.inOut",
				});
		else if (index === plainTextInnerElements.length - 1)
			plainTl.to(".PlainTextSection", { opacity: 0, duration: 1.5 }); // Pause before moving to the next section
	});

	// ScrollTrigger to detect scroll direction and pin the section
	ScrollTrigger.create({
		trigger: ".PlainTextSection",
		start: "top top",
		end: "+=" + window.innerHeight, // Pin for the entire viewport height
		onEnter: () => {
			gsap.set(".PlainTextSection", { yPercent: 0 }); // Instantly reset position
			if (shouldScrollThroughPlainText) plainTl.restart(true, false); // Play from start when entering
		},
		onLeaveBack: () => {
			gsap.set(".PlainTextSection", { yPercent: 0 }); // Instantly reset position
			if (shouldScrollThroughPlainText) plainTl.restart(true, false); // Restart when scrolling back up
		},
		pin: true, // Keeps the section fixed while animation plays
		// markers: true, // Uncomment for debugging
	});
}

// plainTl.play();

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
	// Pin the TabToggle
	gsap.to(".DeviceSection__top", {
		scrollTrigger: {
			trigger: ".DeviceSectionWrapper",
			start: "top top",
			end: "bottom bottom",
			pin: true,

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

			const dashTl = gsap.timeline();
			dashTl.fromTo(
				".FakeDashboard__cards__item, .FakeDashboard__convo, .FakeDashboard__callLogs",
				{ opacity: 0 },
				{
					opacity: 1,
					duration: 0.3,
					ease: "power4.inOut",
					stagger: 0.15,
					onComplete: () => {
						const audio = document.querySelector(
							".FakeDashboard__audio"
						) as HTMLAudioElement;
						if (audio) {
							audio.play();
						}
					},
				}
			);
		});
	}
});
// -------------------------------------------------------------------------------

const bottomTl = gsap.timeline({
	scrollTrigger: {
		trigger: ".BottomSectionWrapper", // Wrapper for all boxes
		// pin: true,
		start: "top 50%",
		end: `+=100%`, // Scroll to the end of the page
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
