import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { Power2, Power4 } from "gsap";
import Lenis from "@studio-freight/lenis";
import { fadeInBox, fadeOutBox } from "./reusable-animations";
import { autoplayObserver } from "./autoplay-observer";
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
