import gsap, { Power1, Power4 } from "gsap";
import Snap from "snapsvg-cjs-ts";
import {
	splitConvoTextIntoChars,
	splitConvoTextIntoWords,
} from "../utils/helpers";
import { resetDotsCompletely } from "./phone-animations";
// import MorphSVGPlugin from "../../gsap/MorphSVGPlugin";

export const pauseDotAnimations = (dotAnimations: gsap.core.Tween[]) => {
	dotAnimations.forEach((animation) => {
		animation.pause();
	});
};

export const pauseDotAnimationsSeamlessly = (
	dotAnimations: gsap.core.Tween[],
	dots: NodeListOf<Element>
) => {
	[...dotAnimations.reverse()].forEach((animation, i) => {
		const dot = dots[dots.length - 1 - i]; // Start from the last dot

		// Calculate time until the dot naturally reaches yPercent: 0
		const timeRemaining = (1 - animation.progress()) * animation.duration();

		// Wait for the dot to reach yPercent: 0, then pause it
		setTimeout(() => {
			gsap.to(dot, {
				yPercent: 0,
				duration: 0.8, // Smooth transition
				ease: "power2.out",
				onComplete: () => {
					animation.pause();

					gsap.to(dot, {
						yPercent: 0,
						duration: 0.8, // Smooth transition
						ease: "power2.out",
					});
				}, // Pause once it reaches 0
			});
		}, timeRemaining * 1000 + i * 220); // Small delay for smooth reverse pause
	});
};

export const resumeDotAnimations = (dotAnimations: gsap.core.Tween[]) => {
	// dotAnimations.forEach((animation) => {
	// restart animation
	// animation.play();

	// });

	[...dotAnimations].forEach((animation, i) => {
		animation.restart();
		animation.pause();
		animation.play(i * 0.2);
	});
};

export const restartDotAnimations = (dotAnimations: gsap.core.Tween[]) => {
	// restart animation with 0.22 second delay

	dotAnimations.forEach((animation, i) => {
		animation.restart();
		animation.pause();
		animation.play(i * 0.22);
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

	pauseDotAnimationsSeamlessly(
		dotAnimations,
		document.querySelectorAll(".PhoneDotLoader__dot")
	);
	const spinnerTl = gsap.timeline({});

	console.log("textElements", textElements);

	spinnerTl
		// .to(".PhoneDotLoader__dot", {
		// 	// reset the dots
		// 	yPercent: 0,
		// 	duration: 0.45,
		// 	stagger: 0.1,
		// 	// ease: "power2.inOut",
		// })
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
			opacity: 0,
			duration: 0.3,
			// ease: "power2.inOut",
		})
		.to(
			".PhoneDotLoader__dot:nth-child(3)",
			{
				// scale down the right dot
				scale: 0.75,
				duration: 0.15,
				// ease: "power2.inOut",
			},
			"<"
		)
		// .to(
		// 	".circle",
		// 	{
		// 		// animate (draw) the circle
		// 		// strokeDashoffset: 423.9,
		// 		strokeDashoffset: 847.8,
		// 		duration: 3,
		// 		ease: "power4.inOut",
		// 	},
		// 	">-=1"
		// )
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
				// strokeDashoffset: 423.9,
				rotate: -540,
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
				opacity: 0,
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
				opacity: 0,
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
						pauseDotAnimationsSeamlessly(
							dotAnimations,
							document.querySelectorAll(".PhoneDotLoader__dot")
						);
						afterFunc();
					}
				},
			},
			"<-=0.04"
		)
		// .to(
		// 	".PhoneDotLoader__dot:nth-child(3)",
		// 	{
		// 		// hide the last dot
		// 		scale: 0,
		// 		opacity: 0,
		// 		xPercent: -100,
		// 		duration: 0.45,
		// 		// ease: "power2.inOut",
		// 	},
		// 	">+=1.8"
		// )

		// text bit part 1
		.to(splitElementsTwo, { opacity: 0, duration: 0.001 }, "<-=1.2")
		.to(splitElementsOne, { opacity: 0, duration: 0.001 }, "<")
		.to(
			loadingParts[index],
			{
				opacity: 1,
				duration: 0.001,
				height: "4.5rem",
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
									height: "4.5rem",
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
				opacity: 0,
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
				duration: 0.8,
				ease: "power1.out",
			},
			">-=0.2"
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
				height: "4.5rem",
			},
			"<"
		)
		// continue the rest of the animation

		.to(
			".checkmarkPath",
			{
				// animate (hiding) the checkmark
				strokeDashoffset: 100,
				delay: 0.5,
				duration: 0.5,
				ease: "power4.out",
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
		.to(".PhoneDotLoader__dot:nth-child(3)", {
			// reset last dot xPercent
			xPercent: 0,
			duration: 0.0001,
			// ease: "power2.inOut",
		})
		.to(
			".PhoneDotLoader__dot",
			{
				// show the dots again
				// yPercent: 0,
				opacity: 1,
				scale: 1,
				duration: 0.2,
				ease: "power4.out",
			},
			"<-=1.1"
			// "<-=0.28"
		)
		.to(
			".PhoneDotLoader__dot:nth-child(2), .PhoneDotLoader__dot:nth-child(3)",
			{
				// show the dots again
				// yPercent: 0,
				opacity: 1,
				scale: 1,
				duration: 0.2,
				stagger: 0.06,
				ease: "power4.out",
			}
			// ">-0.06"
			// "<+=0.06"
			// "<-=0.28"
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
	dotAnimations: gsap.core.Tween[],
	afterFunc: () => void,
	index: number
) => {
	// pauseDotAnimations(dotAnimations);

	// do not autoplay
	const spinnerTl = gsap.timeline({});

	// if (index === 1) {
	// 	spinnerTl

	// 		.to(".PhoneDotLoader__dot", {
	// 			// scale up the dots
	// 			scale: 1,
	// 			duration: 0.2,
	// 			stagger: 0.1,
	// 			// ease: "power2.inOut",
	// 		})
	// 		.to(".PhoneDotLoader__dot", {
	// 			// up
	// 			yPercent: -80,
	// 			duration: 0.8,
	// 			stagger: 0.2,
	// 			// ease: "power2.inOut",
	// 		})

	// 		.to(
	// 			".PhoneDotLoader__dot",
	// 			{
	// 				// down
	// 				yPercent: 0,
	// 				duration: 0.8,
	// 				stagger: 0.2,
	// 				// ease: "power2.inOut",
	// 			},
	// 			"<=0.6"
	// 		)

	// 		.to(
	// 			".PhoneDotLoader__dot",
	// 			{
	// 				// up
	// 				yPercent: -80,
	// 				duration: 0.8,
	// 				stagger: 0.2,
	// 				// ease: "power2.inOut",
	// 				onComplete: () => {
	// 					// restart the dot animations

	// 					resumeDotAnimations(dotAnimations);

	// 					// afterFunc();
	// 				},
	// 			},
	// 			"<=0.6"
	// 		)
	// 		.to(
	// 			".PhoneDotLoader__dot",
	// 			{
	// 				// down
	// 				yPercent: 0,
	// 				duration: 0.8,
	// 				stagger: 0.2,
	// 				// ease: "power2.inOut",

	// 				// onComplete: () => {
	// 				// 	// restart the dot animations
	// 				// 	dotAnimations.forEach((animation) => {
	// 				// 		animation.play();
	// 				// 	});

	// 				// 	afterFunc();
	// 				// },
	// 			},
	// 			"<=0.6"
	// 		)
	// 		.to(
	// 			".PhoneDotLoader__dot:nth-child(1)",
	// 			{
	// 				// show left dot for smoother sync
	// 				yPercent: 0,
	// 				duration: 0.0001,
	// 				// ease: "power2.inOut",
	// 			},
	// 			"0.98"
	// 		)
	// 		.to(
	// 			".PhoneDotLoader__dot:nth-child(1)",
	// 			{
	// 				// show left and right dots
	// 				yPercent: 0,
	// 				opacity: 1,
	// 				scale: 1,
	// 				duration: 0.3,
	// 				// ease: "power2.inOut",
	// 			},
	// 			">"
	// 			// "1.24"
	// 		)
	// 		.to(
	// 			".PhoneDotLoader__dot:nth-child(1), .PhoneDotLoader__dot:nth-child(3), .PhoneDotLoader__dot:nth-child(2)",
	// 			{
	// 				// show left and right dots
	// 				opacity: 1,
	// 				scale: 1,
	// 				duration: 0.3,
	// 				stagger: 0.1,
	// 				// ease: "power2.inOut",
	// 			},
	// 			"1.28"
	// 			// "1.24"
	// 		)
	// 		.to(
	// 			{},
	// 			{
	// 				duration: 0.001,
	// 				onComplete: () => {
	// 					afterFunc();
	// 				},
	// 			},
	// 			"1.1"
	// 		);
	// }

	if (index === 1) {
		spinnerTl
			.to(
				{},
				{
					duration: 0.83,
					// ease: "power2.inOut",
				}
			)
			.to(".PhoneDotLoader__dot", {
				// down
				opacity: 1,
				scale: 1,
				duration: 0.8,
				stagger: 0.2,
				// ease: "power2.inOut",
			})
			.to(
				{},
				{
					duration: 0.0001,
					// ease: "power2.inOut",
					onComplete: () => {
						// restart the dot animations
						// resumeDotAnimations(dotAnimations);
						// resetDotsCompletely();

						afterFunc();
					},
				}
			);
	} else
		spinnerTl.to(".PhoneDotLoader__dot", {
			// scale up the dots
			scale: 1,
			opacity: 1,
			duration: 0.2,
			stagger: 0.1,
			// ease: "power2.inOut",

			onComplete: () => {
				// restart the dot animations

				// resumeDotAnimations(dotAnimations);
				// resetDotsCompletely();

				afterFunc();
			},
		});

	return spinnerTl;
};

// export const threeDotsToSpinnerOld = (
// 	dotAnimations: gsap.core.Tween[],
// 	afterFunc: () => void,
// 	index: number
// ) => {
// 	pauseDotAnimations(dotAnimations);

// 	// do not autoplay
// 	const spinnerTl = gsap.timeline({});

// 	spinnerTl
// 		.to(".PhoneDotLoader__dot", {
// 			// reset the dots
// 			yPercent: 0,
// 			duration: 0.45,
// 			stagger: 0.1,
// 			// ease: "power2.inOut",
// 		})
// 		.to(
// 			".PhoneDotLoader__dot:nth-child(2), .PhoneDotLoader__dot:nth-child(1)",
// 			{
// 				// hide the first two dots
// 				duration: 0.3,
// 				opacity: 0,
// 				stagger: 0.15,
// 				// ease: "power2.inOut",
// 			}
// 		)
// 		.to(
// 			".PhoneDotLoader__dot",
// 			{
// 				// scale down the dots
// 				scale: 0.75,
// 				duration: 0.45,
// 				stagger: 0.1,
// 				// ease: "power2.inOut",
// 			},
// 			"<"
// 		)
// 		.to(".circle", {
// 			// animate (draw) the circle
// 			strokeDashoffset: 847.8,
// 			duration: 2,
// 			ease: "power4.inOut",
// 		})
// 		.to(
// 			".PhoneDotLoader__dot:nth-child(3)",
// 			{
// 				// slap the last dot up
// 				yPercent: -1000,
// 				duration: 0.5,
// 				ease: "power4.out",
// 			},
// 			"<+=1"
// 		)
// 		.to(
// 			".PhoneDotLoader__dot",
// 			{
// 				// scale up the dots
// 				scale: 1,
// 				duration: 0.2,
// 				stagger: 0.1,
// 				// ease: "power2.inOut",
// 			},
// 			"<"
// 		)
// 		.to(
// 			".PhoneDotLoader__dot:nth-child(3)",
// 			{
// 				// bounce the last dot down
// 				yPercent: 0,
// 				duration: 0.5,
// 				ease: "bounce.out",
// 			},
// 			"<+=0.75"
// 		)
// 		.to(".circle", {
// 			// hide the circle
// 			opacity: 0,
// 			duration: 0.01,
// 			ease: "power4.inOut",
// 		})
// 		.to(
// 			".circle",
// 			{
// 				// reset the circle
// 				strokeDashoffset: 282.6,
// 				duration: 0.01,
// 				ease: "power4.inOut",
// 			},
// 			"<"
// 		)
// 		.to(
// 			".circle",
// 			{
// 				// show the circle again (invisible)
// 				opacity: 1,
// 				duration: 0.01,
// 				ease: "power4.inOut",
// 			},
// 			"<"
// 		)
// 		.to(".PhoneDotLoader__dot", {
// 			// show the dots again
// 			opacity: 1,
// 			duration: 0.5,
// 			stagger: 0.2,
// 			ease: "power4.out",

// 			onComplete: () => {
// 				// restart the dot animations
// 				dotAnimations.forEach((animation) => {
// 					animation.play();
// 				});

// 				afterFunc();
// 			},
// 		});

// 	return spinnerTl;
// };

export const resetLoaderAnimation = () => {
	const loadingParts = document.querySelectorAll(".PhoneSection__loadingPart");
	loadingParts.forEach((loadingPart) => {
		loadingPart.style.opacity = "0";
		loadingPart.style.height = "0";
	});
};

export const resetPhoneAnims = (dotAnimations: gsap.core.Tween[]) => {
	// pauseDotAnimations(dotAnimations);

	const loadingParts = document.querySelectorAll(".PhoneSection__loadingPart");
	const convoParts = document.querySelectorAll(".PhoneSection__convoPart");
	loadingParts.forEach((loadingPart) => {
		loadingPart.style.opacity = "0";
		loadingPart.style.height = "0";
	});
	convoParts.forEach((convoPart) => {
		convoPart.style.opacity = "0";
		convoPart.style.height = "0";
	});

	const spinnerTl = gsap.timeline({});
	spinnerTl
		.to(".PhoneDotLoader__dot", {
			// reset the dots
			yPercent: 0,
			opacity: 1,
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
				ease: "power4.out",
			},
			"<"
		);
};
