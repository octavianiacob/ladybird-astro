import gsap from "gsap";
import { Power2, Power4 } from "gsap";

export function fadeInBox(box: Element) {
	return gsap
		.timeline()
		.fromTo(
			box,
			{ top: "100%", opacity: 0 },
			{ top: "50%", duration: 0.5, ease: Power2.easeOut }
		)
		.fromTo(
			box,
			{ opacity: 0 },
			{ opacity: 1, duration: 0.5, ease: Power2.easeOut },
			"-=50%"
		);
}

export function fadeOutBox(box: Element) {
	return gsap.timeline().to(box, {
		top: "-100%",
		opacity: 0,
		duration: 0.5,
		ease: Power2.easeIn,
	});
}
