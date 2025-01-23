import gsap from "gsap";
import { Power2, Power4 } from "gsap";

export function fadeInBox(box: Element) {
	return gsap.fromTo(
		box,
		{ top: "100%", opacity: 0 },
		{ top: "0%", opacity: 1, duration: 0.5, ease: Power2.easeOut }
	);
}

export function fadeOutBox(box: Element) {
	return gsap.to(box, {
		top: "-100%",
		opacity: 0,
		duration: 0.5,
		ease: Power2.easeIn,
	});
}
