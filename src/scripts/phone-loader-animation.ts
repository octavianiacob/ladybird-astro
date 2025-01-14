import gsap, { Power4 } from "gsap";
import Snap from "snapsvg-cjs-ts";
// import MorphSVGPlugin from "../../gsap/MorphSVGPlugin";

export const spinFunc = () => {
	// do not autoplay
	const spinnerTl = gsap.timeline({
		// paused: true,
		// repeat: -1,
		// repeatDelay: 0.2,
		// yoyo: true,
		// ease: "power2.inOut",
	});

	// Hide the middle dot
	spinnerTl
		.to(
			".PhoneDotLoader__dot:nth-child(2), .PhoneDotLoader__dot:nth-child(1)",
			{
				duration: 0.8,
				opacity: 0,
				stagger: 0.5,
				// ease: "power2.inOut",
			}
		)
		.to(".PhoneDotLoader__spinner", {
			animation: "spinner_svv2 0.75s infinite linear",
			duration: 0.1,

			// repeat: -1,
		})
		.to(".PhoneDotLoader__spinnerHider", {
			backgroundColor: "white",
			duration: 0.1,
			delay: 0.4,
			// repeat: -1,
		})
		.to(
			".spinner_P7sC",
			{
				duration: 0.1,
				fill: "red",
				// ease: "power2.inOut",
			},
			"+=0.3"
		)
		.to(
			".PhoneDotLoader__dot:nth-child(3)",
			{
				duration: 0.1,
				opacity: 0,
				// ease: "power2.inOut",
			},
			"+=0.2"
		)
		.to(
			".PhoneDotLoader__spinnerHider",
			{
				backgroundColor: "transparent",
				duration: 0.1,
				delay: 0.4,
				// repeat: -1,
			},
			"-=0.5"
		);
	// .to(".PhoneDotLoader__dot:nth-child(3)", {
	// 	transform: "scale(4)",
	// 	duration: 0.5,
	// 	ease: "linear",
	// })

	// .to(".PhoneDotLoader__dot:nth-child(2)", {
	// 	animation: "spin 1s ease-in infinite",
	// 	// ease: Power4.easeOut,
	// 	// position: "absolute",
	// 	// transform: "scale(4)",
	// 	duration: 0.1,
	// 	// repeat: -1,
	// });

	// // Morph the right dot into an arc
	// spinnerTl.to("#PhoneDotLoader__dot__circle--2", {
	// 	duration: 1,
	// 	morphSVG: "#PhoneDotLoader__dot__arc--2",
	// 	repeat: 1,
	// 	yoyo: true,
	// 	repeatDelay: 0.2,
	// });

	// console.log("circlePath", "circlePath");
	// circlePath.animate({ d: arcPath }, 1000);
};
