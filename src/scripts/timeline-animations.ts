import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Power2 } from "gsap";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

/* ---- Lenis Smooth Scroll ----- */
const lenis = new Lenis({
	lerp: 0.1, // Smoothness
});

function raf(time: number) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const plainText__box = gsap.utils.toArray(".PlainTextSection__inner");

if (plainText__box.length > 0) {
	const plainTextTl = gsap.timeline({
		scrollTrigger: {
			trigger: ".PlainTextSectionWrapper", // Wrapper for all boxes
			pin: true,
			start: "top top",
			end: `+=${plainText__box.length * innerHeight}`, // Each box gets a full viewport height
			scrub: true, // Smooth linking with scroll
			// markers: true, // Enable for debugging
		},
	});

	plainText__box.forEach((box, index) => {
		const boxIn = gsap.timeline();
		const boxOut = gsap.timeline();

		// Animation to bring the current box into view
		boxIn.fromTo(
			box,
			{ top: "100%", opacity: 0 },
			{
				top: "0%",
				opacity: 1,
				duration: 0.5,
				ease: Power2.easeOut,
			}
		);

		// Animation to move the current box out of view
		boxOut.to(box, {
			top: "-100%",
			opacity: 0,
			duration: 0.5,
			ease: Power2.easeIn,
		});

		// Add animations sequentially
		plainTextTl.add(boxIn, index * 1); // Add a delay for each box based on index
		plainTextTl.add(boxOut, index * 1 + 0.5); // Out animation follows the in animation
	});
}
