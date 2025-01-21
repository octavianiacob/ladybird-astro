import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { Power2, Power4 } from "gsap";
import Lenis from "@studio-freight/lenis";
import { fadeInBox, fadeOutBox } from "./reusable-animations";
// import { animatePhoneText } from "./phone-animations";

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
		markers: true, // Enable for debugging
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
);

if (plainTextInnerElements.length > 0) {
	const plainTextTl = gsap.timeline({
		scrollTrigger: {
			trigger: ".PlainTextSectionWrapper", // Wrapper for all boxes
			pin: true,
			start: "top top",
			end: `+=${plainTextInnerElements.length * window.innerHeight}`, // Each box gets a full viewport height
			scrub: true, // Smooth linking with scroll
			// markers: true, // Enable for debugging
		},
	});

	plainTextInnerElements.forEach((box, index) => {
		plainTextTl.add(fadeInBox(box), index * 1);
		plainTextTl.add(fadeOutBox(box), index * 1 + 0.5);
	});
}

const bottomTl = gsap.timeline({
	scrollTrigger: {
		trigger: ".BottomSectionWrapper", // Wrapper for all boxes
		// pin: true,
		start: "top 50%",
		end: `+=${innerHeight}`, // Each box gets a full viewport height
		scrub: true, // Smooth linking with scroll
		markers: true, // Enable for debugging
	},
});

bottomTl.fromTo(
	".BottomSection > h1, .BottomSection__form, .BottomSection__brands",
	{ yPercent: 50, opacity: 0 },
	{
		yPercent: 0,
		opacity: 1,
		duration: 1.5,
		stagger: 0.2,
		ease: Power4.easeOut,
	}
);
