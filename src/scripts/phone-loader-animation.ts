import gsap, { Power1, Power4 } from "gsap";
import Snap from "snapsvg-cjs-ts";
import {
	splitConvoTextIntoChars,
	splitConvoTextIntoWords,
} from "../utils/helpers";
import { resetDotsCompletely } from "./phone-animations";
// import MorphSVGPlugin from "../../gsap/MorphSVGPlugin";

export const pauseDotAnimationsSeamlessly = (
	dotsTl: gsap.core.Timeline,
	dots: NodeListOf<Element>
) => {
	dotsTl.pause();
	dotsTl.kill();

	gsap.to(dots, {
		scale: 1,
		duration: 0.6, // Smooth transition
		stagger: 0.2,
		ease: "power2.out",
	});
};

export const threeDotsToCheckmark = (
	dotsTl: gsap.core.Timeline,
	afterFunc: () => void,
	index: number
) => {
	const loadingParts = document.querySelectorAll(".PhoneSection__loadingPart");
	// Split all conversation text into words/characters
	const textElements = loadingParts[index].querySelectorAll(
		".PhoneSection__loading__text"
	);
	splitConvoTextIntoWords(textElements);

	const splitElContainer = loadingParts[index].querySelectorAll(
		".PhoneSection__loading__text"
	);

	const splitElementsOne = loadingParts[index]
		.querySelectorAll(".PhoneSection__loading__text")[0]
		.querySelectorAll(".word");
	const reversedSplitElementsOne = [...splitElementsOne].reverse();

	const splitElementsTwo = loadingParts[index]
		.querySelectorAll(".PhoneSection__loading__text")[1]
		.querySelectorAll(".word");
	const reversedSplitElementsTwo = [...splitElementsTwo].reverse();

	dotsTl.pause();
	dotsTl.kill();
	const spinnerTl = gsap.timeline({});

	console.log("textElements", textElements);

	spinnerTl
		.to(".PhoneDotLoader__dot", {
			scale: 1,
			duration: 0.6, // Smooth transition
			stagger: 0.2,
			ease: "power2.out",
		})
		.to(
			".circle",
			{
				opacity: 1,
				duration: 0.001,
				ease: "power4.inOut",
			},
			"<"
		)
		.to(".PhoneDotLoader__dot:nth-child(2)", {
			// hide the middle dot
			scale: 0,
			// opacity: 0,
			duration: 0.3,
			// ease: "power2.inOut",
		})
		.to(
			".PhoneDotLoader__dot:nth-child(3)",
			{
				// scale up the right dot
				scale: 1,
				duration: 0.15,
				// ease: "power2.inOut",
			},
			"<"
		)
		.to(
			".circle",
			{
				// animate (draw) the circle
				// strokeDashoffset: 423.9,
				strokeDashoffset: 500,
				duration: 3,
				ease: "power4.inOut",
			},
			">-=1.2"
		)
		.to(
			".PhoneDotLoader__spinner",
			{
				// rotate (draw) the circle
				// rotate: -540,
				rotate:
					index === 1
						? -560
						: document.documentElement.clientWidth < 768
						? -555
						: -545,
				duration: 3,
				ease: "power4.inOut",
			},
			">-=2.08"
		)
		.to(
			".circle",
			{
				// animate (draw) the circle
				// strokeDashoffset: 423.9,
				strokeDashoffset: 847.8,
				duration: 2.5,
				ease: "power4.inOut",
			},
			"<+=0.2"
		)

		.to(
			".PhoneDotLoader__dot:nth-child(1)",
			{
				// hide the first dot
				scale: 0,
				// opacity: 0,
				duration: 0.45,
				// ease: "power2.inOut",
			},
			">-=2"
		)
		.to(
			".PhoneDotLoader__dot:nth-child(3)",
			{
				// hide the last dot
				scale: 0,
				// opacity: 0,
				duration: 0.45,
				// ease: "power2.inOut",

				onComplete: () => {
					if (index === 1) {
						gsap.to(".circle", {
							// reset the circle
							strokeDashoffset: 282.6,
							duration: 0.001,
							ease: "power4.inOut",
						});

						afterFunc();
					}
				},
			},
			"<-=0.25"
			// "<-=0.04"
		)
		// text bit part 1
		.to(splitElementsTwo, { opacity: 0, duration: 0.001 }, "<-=1.2")
		.to(splitElementsOne, { opacity: 0, duration: 0.001 }, "<")
		.to(
			loadingParts[index],
			{
				opacity: 1,
				duration: 0.001,
				height: "6rem",
			},
			"<"
		)
		.to(
			".PhoneSection__fakeConvoPart",
			{
				duration: 0.001,
				height: 0,
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
			{ opacity: 0 },
			{ opacity: 1, duration: 0.6, stagger: 0.2 },
			">"
		)
		.to(".circle", {
			// hide the circle
			opacity: 0,
			duration: 0.001,
			ease: "power4.inOut",
		})
		.to(
			reversedSplitElementsOne,
			{
				opacity: 0,
				// width: 0,
				duration: 0.001,
				// stagger: 0.3,
				// delay: 0.2, // Pause between responses
			},
			"<-=0.8"
		)
		.to(
			splitElContainer[0],
			{
				opacity: 0,
				duration: 0.1,
				height: 0,
				// width: 0,

				onComplete: () => {
					if (index === 1) {
						const convoParts = document.querySelectorAll(
							".PhoneSection__convoPart"
						);
						const miniTl = gsap.timeline({});
						miniTl
							.to(".PhoneDotLoader__dot:nth-child(3)", {
								// reset last dot xPercent
								xPercent: 0,
								duration: 0.0001,
								// ease: "power2.inOut",
							})
							.to(".circle", {
								// hide the circle
								opacity: 0,
								duration: 0.001,
								ease: "power4.inOut",
							})
							.to(splitElContainer[1], {
								opacity: 0,
								height: 0,
								duration: 0.001,
							})
							.to(loadingParts[index], {
								opacity: 0,
								duration: 0.001,
								height: 0,
							})
							.to(
								convoParts[2],
								{
									height: "6rem",
									duration: 0.001,
								},
								"<"
							)
							.to(".PhoneDotLoader__spinner", {
								// reset rotate (draw) the circle
								// strokeDashoffset: 423.9,
								rotate: 0,
								duration: 0.0001,
								ease: "power4.inOut",
							})
							.to(".circle", {
								// reset the circle
								strokeDashoffset: 282.6,
								duration: 0.001,
								ease: "power4.inOut",

								onComplete: () => {
									spinnerTl.kill();
								},
							});
					}
				},
			},
			">-=0.2"
		)
		// continue the rest of the animation
		.to(
			".PhoneDotLoader__dot:nth-child(1), .PhoneDotLoader__dot:nth-child(3)",
			{
				// hide the first and last dot
				scale: 0,
				// opacity: 0,
				duration: 0.3,
				stagger: 0.1,
				// ease: "power2.inOut",
			},
			"3.1"
		)
		.to(
			".checkmarkPath",
			{
				// animate (drawing) the checkmark
				strokeDashoffset: index === 1 ? 100 : 80,
				duration: 0.2,
				// duration: 0.8,
				ease: "linear",
			},
			">-=0.3"
			// ">-=0.2"
			// ">+=0.3"
		)
		// text bit part 2
		.to(
			splitElContainer[1],
			{
				opacity: 1,
				height: "auto",
				duration: 0.1,
			},
			"<"
		)
		.fromTo(
			splitElementsTwo,
			{ opacity: 0 },
			{
				opacity: 1,
				duration: 0.6,
				stagger: 0.3,
			},
			"<"
		)
		.to(reversedSplitElementsTwo, {
			opacity: 0,
			// width: 0,
			duration: 0.001,
			// stagger: 0.3,
			delay: 0.1,
		})
		// .to(".PhoneDotLoader__dot", {
		// 	// move dots up slightly for fancy effect
		// 	yPercent: -80,
		// 	duration: 0.0001,
		// 	ease: "power4.out",
		// })
		.to(
			reversedSplitElementsTwo,
			{
				opacity: 0,
				// width: 0,
				duration: 0.001,
				// stagger: 0.3,
				delay: 1, // Pause between responses
			}
			// "<-=0.1"
		)
		.to(splitElContainer[1], {
			opacity: 0,
			duration: 0.1,
			height: 0,
		})
		.to(
			loadingParts[index],
			{
				opacity: 0,
				duration: 0.3,
				height: 0,
			},
			"<-=0.7"
		)
		.to(
			".PhoneSection__fakeConvoPart",
			{
				duration: 0.3,
				height: "6rem",
			},
			"<"
		)
		// continue the rest of the animation

		.to(
			".checkmarkPath",
			{
				// animate (hiding) the checkmark
				strokeDashoffset: 100,
				duration: 0.35,
				// duration: 0.2,
				delay: 0.9,
				ease: "linear",
			},
			"<-=1"
		)

		.to(".circle", {
			// hide the circle
			opacity: 0,
			duration: 0.0001,
			ease: "power4.inOut",
		})
		.to(".circle", {
			// reset the circle
			strokeDashoffset: 282.6,
			duration: 0.0001,
			ease: "power4.inOut",
		})
		.to(
			".PhoneDotLoader__spinner",
			{
				// reset rotate (draw) the circle
				// strokeDashoffset: 423.9,
				rotate: 0,
				duration: 0.0001,
				ease: "power4.inOut",
			},
			"<"
		)
		.to(
			".circle",
			{
				// show the circle again (invisible)
				opacity: 1,
				duration: 0.0001,
				ease: "power4.inOut",
			},
			"<"
		)
		.to(".PhoneDotLoader__dot", {
			// make first dot bigger
			// opacity: 1,
			duration: 0.0001,
			ease: "power4.out",
		})
		.to(".PhoneDotLoader__dot:nth-child(1)", {
			// make first dot bigger
			scale: 1,
			duration: 0.0001,
			ease: "power4.out",
		})
		.to(".PhoneDotLoader__dot:nth-child(3)", {
			// reset last dot xPercent
			xPercent: 0,
			duration: 0.0001,
			// ease: "power2.inOut",
		})
		.to(
			".PhoneDotLoader__dot:nth-child(1)",
			{
				// show the dots again
				// yPercent: 0,
				// opacity: 1,
				scale: 1,
				duration: 0.2,
				ease: "power4.out",
			},
			// "<-=0.6"
			"<-=0.6"
			// "<-=1.1"
		)
		.to(
			".PhoneDotLoader__dot:nth-child(2), .PhoneDotLoader__dot:nth-child(3)",
			{
				// show the dots again
				// yPercent: 0,
				// opacity: 1,
				scale: 1,
				duration: 0.2,
				stagger: 0.06,
				ease: "power4.out",
			},
			">-0.06"
		)
		.to(
			{},
			{
				// handle afterFunc
				duration: 0.001,
				ease: "power4.out",

				onComplete: () => {
					afterFunc();
				},
			},
			"<-=0.22"
			// "<-=0.22"
			// "<-=0.2"
		);

	return spinnerTl;
};

export const threeDotsToSpinner = (
	dotsTl: gsap.core.Timeline,
	afterFunc: () => void,
	index: number
) => {
	dotsTl.pause();
	dotsTl.kill();
	// do not autoplay
	const spinnerTl = gsap.timeline({});

	if (index === 1) {
		spinnerTl
			.to(
				{},
				{
					duration: 1.15,
					// duration: 0.83,
					// ease: "power2.inOut",
				}
			)
			.to(".PhoneDotLoader__dot:nth-child(1)", {
				// down
				scale: 1,
				duration: 0.3,
				// ease: "power2.inOut",
			})
			.to(
				".PhoneDotLoader__dot:nth-child(2), .PhoneDotLoader__dot:nth-child(3)",
				{
					// show dots
					scale: 1,
					duration: 0.8,
					stagger: 0.2,
					// ease: "power2.inOut",
				}
			)
			.to(
				{},
				{
					duration: 0.0001,
					// ease: "power2.inOut",
					onComplete: () => {
						// restart the dot animations
						// resetDotsCompletely();

						afterFunc();
					},
				}
			);
	} else
		spinnerTl.to(".PhoneDotLoader__dot", {
			// scale up the dots
			scale: 1,
			// opacity: 1,
			duration: 0.2,
			stagger: 0.1,
			// ease: "power2.inOut",

			onComplete: () => {
				// restart the dot animations
				// resetDotsCompletely();

				afterFunc();
			},
		});

	return spinnerTl;
};

export const resetPhoneAnims = () => {
	const loadingParts = document.querySelectorAll(
		".PhoneSection__loadingPart"
	) as NodeListOf<HTMLElement>;
	const convoParts = document.querySelectorAll(
		".PhoneSection__convoPart"
	) as NodeListOf<HTMLElement>;

	loadingParts.forEach((loadingPart) => {
		loadingPart.style.opacity = "0";
		loadingPart.style.height = "0";
	});
	convoParts.forEach((convoPart, ind) => {
		convoPart.style.opacity = "0";
		if (ind === 0) {
			convoPart.style.height = "6rem";
		} else convoPart.style.height = "0";
	});

	const spinnerTl = gsap.timeline({});
	spinnerTl
		.to(".PhoneDotLoader__dot", {
			// reset the dots
			yPercent: 0,
			// opacity: 1,
			scale: 1,
			duration: 0.001,
			stagger: 0.01,
			// ease: "power2.inOut",
		})
		.to(
			".circle",
			{
				// hide the circle
				opacity: 0,
				duration: 0.001,
				ease: "power4.inOut",
			},
			"<"
		)
		.to(".circle", {
			// reset the circle
			strokeDashoffset: 282.6,
			duration: 0.001,
			ease: "power4.inOut",
		})
		.to(
			".checkmarkPath",
			{
				// animate (hiding) the checkmark
				strokeDashoffset: 100,
				duration: 0.001,
				ease: "linear",
			},
			"<"
		);
};
