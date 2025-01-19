// import gsap, { Power1, Power4 } from "gsap";
// import { autoplayObserver } from "./autoplay-observer";

// // Select the element to observe
// const targetElement = document.querySelector(".BottomSection");

// const plainTextTl = gsap.timeline({
// 	scrollTrigger: {
// 		trigger: ".BottomSection", // Wrapper for all boxes
// 		pin: true,
// 		start: "top top",
// 		end: `+=${innerHeight}`, // Each box gets a full viewport height
// 		scrub: true, // Smooth linking with scroll
// 		markers: true, // Enable for debugging
// 	},
// });

// plainTextTl.fromTo(
// 	".BottomSection h1",
// 	{ yPercent: 100 },
// 	{
// 		yPercent: 0,
// 		opacity: 1,
// 		duration: 1,
// 		ease: Power4.easeOut,
// 	}
// );

// // if (targetElement) {
// // 	autoplayObserver(targetElement, animateElements);
// // } else {
// // 	console.error("Element .BottomSection not found.");
// // }
