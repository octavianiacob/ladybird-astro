import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Observer } from "gsap/Observer";
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
import { smoothScrollTo, switchTab } from "../utils/helpers";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollToPlugin);
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
let isAutomatedScrolling = false;
let isAnimating = false;

Observer.create({
	target: ".IntroSection",
	type: "wheel,touch",

	onDown: () => {},
});

const introTl = gsap.timeline({
	scrollTrigger: {
		trigger: ".IntroSection", // Section to trigger the animation
		start: "top 20%",
		// start: "top top",
		end: "bottom bottom",
		scrub: false, // Link animation to scroll progress
		// markers: true, // Enable for debugging
	},
});

introTl.to(".IntroSection", {
	opacity: 1,
	duration: 0.25,
});

let scrollDirection = 0;

const introTl2 = gsap.timeline({
	scrollTrigger: {
		trigger: ".IntroSection", // Section to trigger the animation
		start: "top top",
		// start: "top top",
		end: "bottom bottom",
		scrub: false, // Link animation to scroll progress
		// markers: true, // Enable for debugging

		onEnterBack: () => {
			// console.log("intro2 onEnterBack");
			if (scrollDirection === -1 && !isAutomatedScrolling) {
				shouldScrollThroughPlainText = true;
			}
		},

		onUpdate: (self) => {
			if (self.direction !== scrollDirection) {
				scrollDirection = self.direction;
			}

			// console.log(
			// 	"scrollDirection",
			// 	scrollDirection,
			// 	shouldScrollThroughPlainText
			// );
		},
	},
});

ScrollTrigger.create({
	trigger: ".PlainTextSectionFixed",
	start: "top 40%",
	end: "bottom bottom",
	// markers: true,
	onEnter: () => {
		console.log("onEnter", shouldScrollThroughPlainText);

		if (shouldScrollThroughPlainText && !isAutomatedScrolling)
			gsap.to(window, {
				scrollTo: { y: ".PlainTextSectionWrapper" },
				duration: 0.05,
				ease: "power2.out",

				onComplete: () => {
					// Enable scroll when animation completes

					disableScroll();
					shouldScrollThroughPlainText = false;
				},
			});
	},
	onEnterBack: () => {
		gsap.to(".IntroSection", {
			opacity: 1,
			duration: 0.25,
		});
	},
});

export const scrollToDevice = () => {
	const tl = gsap.timeline({
		ease: "power4.inOut",
	});
	tl.to(".IntroSection", {
		duration: 0.05,
		opacity: 0,
		onComplete: () => {
			switchTab(0);
			isAutomatedScrolling = true;
		},
	})
		.to(
			".PlainTextSection",
			{
				duration: 0.05,
				opacity: 0,
			},
			"<"
		)
		.to(window, {
			duration: 0.5,
			scrollTo: ".DeviceSection",
		});
};

export function disableScroll() {
	// if (typeof window === "undefined") return; // Prevent SSR errors
	// // Save current scroll position
	// const scrollY = window.scrollY;
	// // Detect if on iOS Safari
	// const isIOS =
	// 	/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
	// // Use visualViewport.height for better accuracy on iOS
	// const viewportHeight = window.visualViewport?.height || window.innerHeight;
	// // Apply styles to lock scrolling without triggering layout shifts
	// document.body.style.overflow = "hidden";
	// document.body.style.position = "fixed";
	// document.body.style.width = "100%";
	// document.body.style.top = `-${
	// 	isIOS ? viewportHeight + 100 : viewportHeight
	// }px`;
	// // Prevent iOS keyboard from breaking the layout
	// document.documentElement.style.overflow = "hidden";
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
				.to(
					{},
					{
						// duration: 4.5,
						duration: 1.5,
					}
				) // Pause before moving to the next section
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
		start: "top 20%",
		// start: "top top",
		end: "+=" + window.innerHeight, // Pin for the entire viewport height
		onEnter: () => {
			console.log("onEnter plain", shouldScrollThroughPlainText);
			gsap.set(".PlainTextSection", { yPercent: 0 }); // Instantly reset position
			if (shouldScrollThroughPlainText && !isAutomatedScrolling)
				plainTl.restart(true, false); // Play from start when entering
		},
		// onLeaveBack: () => {
		// 	gsap.set(".PlainTextSection", { yPercent: 0 }); // Instantly reset position
		// 	if (shouldScrollThroughPlainText) plainTl.restart(true, false); // Restart when scrolling back up
		// },
		pin: true, // Keeps the section fixed while animation plays
		// markers: true, // Uncomment for debugging
	});
}

const skipBtn = document.querySelector(".skipBtn");

if (skipBtn)
	skipBtn.addEventListener("click", () => {
		shouldScrollThroughPlainText = false;
		enableScroll();
		scrollToDevice();

		plainTl.kill();
	});

// -------------------------- Device Section Animation ---------------------------

let isLaptopPlaying = false;

const laptopEnterFunc = () => {
	// set the active tab

	switchTab(1);

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

Observer.create({
	target: ".DeviceSection",
	type: "wheel,touch",
	tolerance: 20,

	onUp: () => {
		if (!isAnimating) {
			gsap.to(".DeviceSection__main", {
				yPercent: 0,
				ease: "power4.inOut",
				delay: 0,
				duration: 1,

				onStart: () => {
					isAnimating = true;
				},
				onComplete: () => {
					isAnimating = false;
					laptopEnterFunc();
					switchTab(0);
				},
			});
		}
	},

	onDown: () => {
		if (!isAnimating) {
			gsap.to(".DeviceSection__main", {
				yPercent: -50,
				ease: "power4.inOut",
				duration: 1,

				onStart: () => {
					isAnimating = true;
				},
				onComplete: () => {
					switchTab(1);
					isAnimating = false;
				},
			});
		}
	},
});

onMount(() => {
	// // Pin the TabToggle
	// gsap.to(".DeviceSection__top", {
	// 	scrollTrigger: {
	// 		trigger: ".DeviceSection",
	// 		start: "top top",
	// 		end: "+=200%",
	// 		pin: true,

	// 		onEnter: () => {
	// 			// Reset the active tab

	// 			switchTab(0);
	// 		},
	// 	},
	// });

	// // Animate the main content upwards
	// gsap.to(".DeviceSection__main", {
	// 	scrollTrigger: {
	// 		trigger: ".PhoneSection",
	// 		start: "top top",
	// 		end: "+=150%",
	// 		scrub: true, // Sync animation with scroll

	// 		onEnter: () => {
	// 			// Reset the active tab

	// 			console.log("onEnter phone", shouldScrollThroughPlainText);
	// 		},
	// 	},
	// 	yPercent: -50,
	// 	ease: "power4.inOut",
	// });

	// // Fade in and play LaptopSection video
	// gsap.to(".LaptopSection", {
	// 	scrollTrigger: {
	// 		trigger: ".LaptopSection",
	// 		start: "center center", // Adjust the timing as needed
	// 		end: "+=50%",
	// 		scrub: true,
	// 		snap: {
	// 			snapTo: 1,
	// 			duration: 0.25,
	// 			ease: "power1.inOut",
	// 		},

	// 		// markers: true,
	// 		onEnter: () => laptopEnterFunc(),
	// 		onEnterBack: () => laptopEnterFunc(),
	// 		onLeaveBack: () => {
	// 			// set the active tab
	// 			switchTab(0);

	// 			const video = document.querySelector(
	// 				".LaptopSection__vid"
	// 			) as HTMLVideoElement;
	// 			const screen = document.querySelector(
	// 				".LaptopSection__screen"
	// 			) as HTMLElement;
	// 			if (video) {
	// 				if (screen) screen.style.opacity = "0"; // Keep screen hidden
	// 				video.pause();
	// 				video.currentTime = 0; // Reset when scrolled out of view
	// 				isLaptopPlaying = false;
	// 			}
	// 		},
	// 	},
	// 	opacity: 1,
	// 	duration: 1,
	// });

	// -------------------------------------------
	// Pin the TabToggle
	// gsap.to(".DeviceSection__top", {
	// 	scrollTrigger: {
	// 		trigger: ".DeviceSection",
	// 		start: "top top",
	// 		end: "bottom bottom", // Pin for the entire section
	// 		pin: true,
	// 		markers: true,
	// 	},
	// });

	gsap.timeline({
		scrollTrigger: {
			trigger: ".DeviceSection",
			start: "top top",
			end: "bottom bottom", // Pin for the entire section
			markers: true,
			pin: true,
			scrub: true,
		},
	});
	// .to(".DeviceSection__main", {
	// 	yPercent: -50,
	// 	ease: "power4.inOut",

	// 	onComplete: () => {
	// 		// Set up a temporary scroll block to prevent accidental scrolling past
	// 	},
	// });

	// Create a scroll sequence for PhoneSection -> LaptopSection transition
	// const deviceScrollTrigger = ScrollTrigger.create({
	// 	trigger: ".DeviceSection",
	// 	start: "top top",
	// 	end: "+=100%", // Adjust this value as needed for your scroll distance
	// 	// pin: ".PhoneSection", // Pin the wrapper containing both sections
	// 	scrub: true,
	// 	markers: true, // Enable for debugging
	// 	onEnter: () => {
	// 		switchTab(0); // Switch to Patients tab
	// 	},
	// });

	// Animate the transition between sections
	// gsap
	// 	.timeline({
	// 		scrollTrigger: deviceScrollTrigger,
	// 	})
	// 	.to(".DeviceSection__main", {
	// 		// yPercent: -20, // Move PhoneSection up and out of view
	// 		duration: 0.5,
	// 		ease: "power2.inOut",
	// 	});
	// .to(
	// 	".LaptopSection",
	// 	{
	// 		yPercent: -100, // Move LaptopSection into view
	// 		duration: 0.5,
	// 		ease: "power2.inOut",
	// 	},
	// 	0
	// )
	// .add(() => {
	// 	// When timeline completes, set up a "pause" in scrolling
	// 	ScrollTrigger.create({
	// 		trigger: ".LaptopSection",
	// 		start: "center center",
	// 		end: "bottom+=300% bottom", // Extended end to create a scroll "buffer"
	// 		onEnter: function () {
	// 			// Switch to Practices tab
	// 			switchTab(1);

	// 			// Set up a temporary scroll block to prevent accidental scrolling past
	// 			const tempScrollBlock = ScrollTrigger.create({
	// 				trigger: ".LaptopSection",
	// 				start: "top top",
	// 				end: "bottom bottom",
	// 				onLeave: function (self) {
	// 					// If user deliberately continues scrolling (with enough force)
	// 					// Allow them to proceed, but first clean up
	// 					self.kill();
	// 					window.scrollTo({
	// 						top: window.scrollY + 1, // Force a small scroll to trigger next section
	// 						behavior: "auto",
	// 					});
	// 				},
	// 			});

	// 			// Allow user to break free after a deliberate scroll attempt
	// 			let scrollAttempts = 0;
	// 			const scrollListener = () => {
	// 				scrollAttempts++;
	// 				if (scrollAttempts > 3) {
	// 					// User really wants to scroll - let them proceed
	// 					window.removeEventListener("wheel", scrollListener);
	// 					window.removeEventListener("touchmove", scrollListener);
	// 					tempScrollBlock.kill();
	// 				}
	// 			};

	// 			window.addEventListener("wheel", scrollListener);
	// 			window.addEventListener("touchmove", scrollListener);
	// 		},
	// 	});
	// });
	// -------------------------------------------

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
					onComplete: () => {},
				}
			);
		});
	}
});
// -------------------------------------------------------------------------------

// const bottomTl = gsap.timeline({
// 	scrollTrigger: {
// 		trigger: ".BottomSectionWrapper", // Wrapper for all boxes
// 		// pin: true,
// 		start: "top 10%",
// 		end: `+=20%`, // Scroll to the end of the page
// 		scrub: true, // Smooth linking with scroll
// 		// markers: true, // Enable for debugging
// 	},
// });

// bottomTl.fromTo(
// 	".BottomSection > h1, .BottomSection__form, .BottomSection__brands",
// 	{ yPercent: 50, opacity: 0 },
// 	{
// 		yPercent: 0,
// 		opacity: 1,
// 		duration: 1.5,
// 		stagger: 0.3,
// 		ease: Power4.easeOut,
// 	}
// );
