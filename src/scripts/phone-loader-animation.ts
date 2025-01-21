import gsap, { Power1, Power4 } from "gsap";
import Snap from "snapsvg-cjs-ts";
import { splitConvoTextIntoChars } from "../utils/helpers";
// import MorphSVGPlugin from "../../gsap/MorphSVGPlugin";

export const pauseDotAnimations = (dotAnimations: gsap.core.Tween[]) => {
	dotAnimations.forEach((animation) => {
		animation.pause();
	});
};

export const threeDotsToCheckmark = (
	dotAnimations: gsap.core.Tween[],
	afterFunc: () => void,
	index: number
) => {
	const loadingParts = document.querySelectorAll(".PhoneSection__loadingPart");
	// Split all conversation text into words/characters
	const textElements = loadingParts[index].querySelectorAll(
		".PhoneSection__loading__text"
	);
	splitConvoTextIntoChars(textElements);

	const splitElContainer = loadingParts[index].querySelectorAll(
		".PhoneSection__loading__text"
	);

	const splitElementsOne = loadingParts[index]
		.querySelectorAll(".PhoneSection__loading__text")[0]
		.querySelectorAll(".char");
	const reversedSplitElementsOne = [...splitElementsOne].reverse();

	const splitElementsTwo = loadingParts[index]
		.querySelectorAll(".PhoneSection__loading__text")[1]
		.querySelectorAll(".char");
	const reversedSplitElementsTwo = [...splitElementsTwo].reverse();

	pauseDotAnimations(dotAnimations);
	const spinnerTl = gsap.timeline({});

	console.log("textElements", textElements);

	spinnerTl
		.to(".PhoneDotLoader__dot", {
			// reset the dots
			yPercent: 0,
			duration: 0.2,
			stagger: 0.05,
			// ease: "power2.inOut",
		})
		.to(".PhoneDotLoader__dot:nth-child(2)", {
			// hide the middle dot
			opacity: 0,
			duration: 0.5,
			stagger: 0.1,
			// ease: "power2.inOut",
		})
		.to(".circle", {
			// animate (draw) the circle
			// strokeDashoffset: 423.9,
			strokeDashoffset: 847.8,
			duration: 2.5,
			ease: "power4.inOut",
		})
		// text bit part 1
		.to(splitElementsTwo, { opacity: 0, width: 0, duration: 0.01 }, "2")
		.to(splitElementsOne, { opacity: 0, width: 0, duration: 0.01 }, "<")
		.to(
			loadingParts[index],
			{
				opacity: 1,
				duration: 0.01,
				height: "4rem",
			},
			"<"
		)
		.to(
			splitElContainer[0],
			{
				opacity: 1,
				height: "auto",
				duration: 0.01,
			},
			"<"
		)
		.fromTo(
			splitElementsOne,
			{ opacity: 0, width: 0 },
			{ opacity: 1, duration: 0.08, stagger: 0.03, width: "auto" },
			">"
		)
		.to(reversedSplitElementsOne, {
			opacity: 0,
			width: 0,
			duration: 0.08,
			stagger: 0.03,
			delay: 2, // Pause between responses
		})
		.to(splitElContainer[0], {
			opacity: 0,
			duration: 0.1,
			height: 0,
		})
		// .to(loadingParts[index], {
		// 	opacity: 0,
		// 	duration: 0.3,
		// 	height: 0,
		// })
		// continue the rest of the animation
		.to(
			".PhoneDotLoader__dot:nth-child(1)",
			{
				// hide the first dot
				opacity: 0,
				duration: 0.3,
				stagger: 0.1,
				// ease: "power2.inOut",
			},
			"3"
		)
		.to(
			".checkmarkPath",
			{
				// animate (drawing) the checkmark
				strokeDashoffset: 80,
				duration: 0.5,
				ease: "power4.out",
			},
			">+=3.5"
		)
		.to(
			".PhoneDotLoader__dot:nth-child(3)",
			{
				// hide the last dot
				opacity: 0,
				duration: 0.5,
				stagger: 0.1,
				// ease: "power2.inOut",
			},
			"<"
		)
		// text bit part 2
		.to(splitElContainer[1], {
			opacity: 1,
			height: "auto",
			duration: 0.1,
		})
		.fromTo(
			splitElementsTwo,
			{ opacity: 0, width: 0 },
			{ opacity: 1, duration: 0.08, stagger: 0.03, width: "auto" }
		)
		.to(reversedSplitElementsTwo, {
			opacity: 0,
			width: 0,
			duration: 0.08,
			stagger: 0.03,
			delay: 3, // Pause between responses
		})
		.to(splitElContainer[1], {
			opacity: 0,
			duration: 0.1,
			height: 0,
		})
		.to(loadingParts[index], {
			opacity: 0,
			duration: 0.3,
			height: 0,
		})
		// continue the rest of the animation
		.to(".checkmarkPath", {
			// animate (hiding) the checkmark
			strokeDashoffset: 100,
			delay: 1,
			duration: 0.5,
			ease: "power4.out",
		})
		.to(".circle", {
			// hide the circle
			opacity: 0,
			duration: 0.01,
			ease: "power4.inOut",
		})
		.to(".circle", {
			// reset the circle
			strokeDashoffset: 282.6,
			duration: 0.01,
			ease: "power4.inOut",
		})
		.to(
			".circle",
			{
				// show the circle again (invisible)
				opacity: 1,
				duration: 0.01,
				ease: "power4.inOut",
			},
			"<"
		)
		.to(".PhoneDotLoader__dot", {
			// show the dots again
			opacity: 1,
			duration: 0.5,
			stagger: 0.2,
			ease: "power4.out",

			onComplete: () => {
				afterFunc();
			},
		});

	return spinnerTl;
};

export const threeDotsToSpinner = (
	dotAnimations: gsap.core.Tween[],
	afterFunc: () => void,
	index: number
) => {
	pauseDotAnimations(dotAnimations);

	// do not autoplay
	const spinnerTl = gsap.timeline({});

	spinnerTl
		.to(".PhoneDotLoader__dot", {
			// reset the dots
			yPercent: 0,
			duration: 0.5,
			stagger: 0.1,
			// ease: "power2.inOut",
		})
		.to(
			".PhoneDotLoader__dot:nth-child(2), .PhoneDotLoader__dot:nth-child(1)",
			{
				// hide the first two dots
				duration: 0.8,
				opacity: 0,
				stagger: 0.5,
				// ease: "power2.inOut",
			}
		)
		.to(".circle", {
			// animate (draw) the circle
			strokeDashoffset: 847.8,
			duration: 2.5,
			ease: "power4.inOut",
		})
		.to(
			".PhoneDotLoader__dot:nth-child(3)",
			{
				// slap the last dot up
				yPercent: -1000,
				duration: 0.5,
				ease: "power4.out",
			},
			"<+=1.28"
		)
		.to(
			".PhoneDotLoader__dot:nth-child(3)",
			{
				// bounce the last dot down
				yPercent: 0,
				duration: 0.5,
				ease: "bounce.out",
			},
			"<+=0.75"
		)
		.to(".circle", {
			// hide the circle
			opacity: 0,
			duration: 0.01,
			ease: "power4.inOut",
		})
		.to(
			".circle",
			{
				// reset the circle
				strokeDashoffset: 282.6,
				duration: 0.01,
				ease: "power4.inOut",
			},
			"<"
		)
		.to(
			".circle",
			{
				// show the circle again (invisible)
				opacity: 1,
				duration: 0.01,
				ease: "power4.inOut",
			},
			"<"
		)
		.to(".PhoneDotLoader__dot", {
			// show the dots again
			opacity: 1,
			duration: 0.5,
			stagger: 0.2,
			ease: "power4.out",

			onComplete: () => {
				// restart the dot animations
				dotAnimations.forEach((animation) => {
					animation.play();
				});

				afterFunc();
			},
		});
};

export const spinFunc = (dotAnimations: gsap.core.Tween[]) => {
	pauseDotAnimations(dotAnimations);

	// do not autoplay
	const spinnerTl = gsap.timeline({});

	spinnerTl;
	// .to(".circle", {
	// 	opacity: 0, // Animate from full dash-offset to 0
	// 	duration: 0.1, // Duration of the animation in seconds
	// 	ease: "power1.inOut", // Easing function
	// })
	// .to(".circle", {
	// 	strokeDashoffset: 282.6, // Animate from full dash-offset to 0
	// 	duration: 0.1, // Duration of the animation in seconds
	// 	ease: "power1.inOut", // Easing function
	// })
	// .to(".circle", {
	// 	strokeDashoffset: 282.6, // Animate from full dash-offset to 0
	// 	duration: 0.1, // Duration of the animation in seconds
	// 	ease: "power1.inOut", // Easing function
	// })
	// .to(".circle", {
	// 	opacity: 1, //
	// 	duration: 0.01, // Duration of the animation in seconds
	// 	ease: "power1.inOut", // Easing function
	// });
	// .to(".circle", {
	// 	strokeDashoffset: 423.9, // Animate from full dash-offset to 0
	// 	duration: 1, // Duration of the animation in seconds
	// 	ease: "power1.inOut", // Easing function
	// })

	// 	.to(".PhoneDotLoader__spinner", {
	// 		animation: "spinner_svv2 1.5s infinite cubic-bezier(0.2, 0.8, 0.3, 1)",
	// 		duration: 0.1,

	// 		// repeat: -1,
	// 	})
	// 	.to(
	// 		".spinner_P7sC",
	// 		{
	// 			duration: 0.1,
	// 			fill: "red",
	// 			// ease: "power2.inOut",
	// 		},
	// 		"+=0.3"
	// 	);
};

export const resetLoaderAnimation = () => {
	const loadingParts = document.querySelectorAll(".PhoneSection__loadingPart");
	loadingParts.forEach((loadingPart) => {
		loadingPart.style.opacity = "0";
		loadingPart.style.height = "0";
	});
};
