import gsap from "gsap";
import { Power2, Power4 } from "gsap";
import SplitType from "split-type";
import {
	autoplayObserver,
	autoplayObserverUsingGSAP,
} from "./autoplay-observer";
import { patientConvo_pt1 } from "../utils/constants";
import {
	displayTimeFrom928,
	findWhiteSpaceNodes,
	splitConvoTextIntoChars,
	splitConvoTextIntoWords,
} from "../utils/helpers";
import {
	pauseDotAnimationsSeamlessly,
	resetPhoneAnims,
	threeDotsToCheckmark,
	threeDotsToSpinner,
} from "./phone-loader-animation";
import { playConvo } from "./timeline-animations--scroll";

// -------------------------- Dot Loader Animation ---------------------------
let animations: gsap.core.Tween[] = [];
export let dotsTl: gsap.core.Timeline = gsap.timeline({});

const regularDotMovement = () => {
	console.log("regularDotMovement");
	const dots = document.querySelectorAll(".PhoneDotLoader__dot");

	dotsTl.pause();
	dotsTl.kill();

	gsap.to(dots, {
		scale: 1,
		duration: 0.01,
	});

	dotsTl = gsap
		.timeline({
			// ease: "power4.inOut",
		})
		.to(dots[0], {
			scale: 0.2, // shrink
			duration: 0.6, // Total duration
			yoyo: true,
			repeat: -1,
			ease: "power1.inOut",
		})
		.to(
			dots[1],
			{
				scale: 0.2, // shrink
				duration: 0.6, // Total duration
				yoyo: true,
				repeat: -1,
				ease: "power1.inOut",
			},
			"<+0.2"
		)
		.to(
			dots[2],
			{
				scale: 0.2, // shrink
				duration: 0.6, // Total duration
				yoyo: true,
				repeat: -1,
				ease: "power1.inOut",
			},
			"<+0.2"
		);

	return dotsTl;
};

export const resetDotsCompletely = () => {
	regularDotMovement();
};

// -------------------------- Conversation Animation ---------------------------
// Function to play the conversation animation
export let isPlayingConvo = false;
export let convoTimelines: gsap.core.Timeline[] = [];
export const onLeave = () => {
	regularDotMovement();

	resetPhoneAnims();
	convoTimelines.forEach((timeline) => timeline.kill());
	convoTimelines = [];
};

export const playConversation = async () => {
	isPlayingConvo = true;

	console.log("Playing conversation animation");
	onLeave();
	// Split all conversation text into words/characters
	const textElements = document.querySelectorAll(".PhoneSection__convo__text");
	splitConvoTextIntoWords(textElements);

	const convoParts = document.querySelectorAll(".PhoneSection__convoPart");

	const timeEl = document.querySelector(".PhoneSection__wrap__time");
	if (timeEl) {
		displayTimeFrom928(timeEl);
	}

	const audioEls = document.querySelectorAll(
		".PhoneSection__audio"
	) as NodeListOf<HTMLAudioElement>;
	// Pause all audio elements
	// and reset their current time
	audioEls.forEach((audioEl) => {
		audioEl.pause();
		audioEl.currentTime = 0;
	});

	const createTimeline = (convoPart: Element, convoIndex: number) => {
		const timeline = gsap.timeline({
			defaults: { ease: Power4.easeOut },
			paused: true,
		});

		[...convoPart.children].forEach((response, index) => {
			const splitElContainer = convoParts[convoIndex].querySelectorAll(
				".PhoneSection__convo__text"
			)[index];
			let isAI = splitElContainer.className.includes("--AI");

			if (index === 0) {
				if (!isAI) {
					resetDotsCompletely();
				}

				timeline
					.to(convoPart, {
						opacity: 1,
						duration: 0.01,
						// height: "6rem",
						...(convoIndex === 0 ? {} : { height: "6rem" }),
					})
					.to(
						".PhoneSection__fakeConvoPart",
						{
							duration: 0.01,
							// height: 0,
							...(convoIndex === 0 ? {} : { height: 0 }),
						},
						"<"
					);
			}

			const splitElements = convoParts[convoIndex]
				.querySelectorAll(".PhoneSection__convo__text")
				[index].querySelectorAll(".word");
			const reversedSplitElements = [...splitElements].reverse();

			const generateDuration = (i: number) => {
				switch (i) {
					case 0:
						return 0.4;
						break;
					case 1:
						return 0.42;
						break;

					default:
						return 0.45;
						break;
				}
			};
			const generateStagger = (i: number) => {
				switch (i) {
					case 0:
						return 0.21;
						break;
					case 1:
						return 0.21;
						break;

					default:
						return 0.22;
						break;
				}
			};

			timeline
				.to(".PhoneDotLoader__dot, .PhoneSection__convoWrap", {
					opacity: 1,
					duration: 0.001,
				})
				.to(
					splitElContainer,
					{
						opacity: 1,
						height: "auto",
						duration: 0.1,
						onComplete: () => {
							if (convoIndex === 0 && index === 0) {
								// [...animations].reverse().forEach((animation, i) => {
								// 	animation.play(i * 0.22);
								// });
							} else if (!isAI) {
								const dots = document.querySelectorAll(".PhoneDotLoader__dot");
								pauseDotAnimationsSeamlessly(dotsTl, dots);
							} else if (dotsTl.paused()) {
								resetDotsCompletely();
							}

							console.log("animations", animations);

							const audioEls = document.querySelectorAll(
								".PhoneSection__audio"
							) as NodeListOf<HTMLAudioElement>;

							if (index === 0) {
								audioEls.forEach((audioEl) => {
									audioEl.pause();
									audioEl.currentTime = 0;
								});

								audioEls?.[convoIndex].play();
								console.log("playOne");
							}
						},
					},
					"<"
				)

				.fromTo(
					// show the first 5 words
					splitElements,
					{ opacity: 0 },
					{
						opacity: 1,
						duration: generateDuration(convoIndex),
						stagger: generateStagger(convoIndex),
					},
					"<+=0.4"
					// "<+=0.3"
				)
				.to(
					// hide the first 5 words
					splitElements,
					{ opacity: 0, width: 0, duration: 0.001, delay: 0.2 }
					// { opacity: 0, width: 0, duration: 0.001, delay: 0.5 }
				)

				.to(splitElContainer, {
					opacity: 0,
					duration: 0.01,
					height: 0,

					onComplete: () => {
						if (index === convoPart.children.length - 1 && isAI) {
							const dots = document.querySelectorAll(".PhoneDotLoader__dot");
							// pauseDotAnimationsSeamlessly(dotsTl, dots);
						}

						const audioEls = document.querySelectorAll(
							".PhoneSection__audio"
						) as NodeListOf<HTMLAudioElement>;
						if (
							audioEls?.[convoIndex] &&
							index === convoPart.children.length - 1
						) {
							// audioEls?.[convoIndex].pause();
							// audioEls?.[convoIndex].currentTime = 0;
						}
					},
				});

			if (index === convoPart.children.length - 1) {
				timeline
					.to(convoPart, {
						opacity: 0,
						duration: 0.01,
						height: 0,
					})
					.to(
						".PhoneSection__fakeConvoPart",
						{
							duration: 0.01,
							height: "6rem",
						},
						"<"
					);
			}

			if (
				convoIndex === convoParts.length - 1 &&
				index === convoPart.children.length - 1
			) {
				timeline
					.to(".PhoneDotLoader__dot", {
						opacity: 0,
						duration: 0.4,
					})
					.to(".PhoneSection__fakeConvoPart", {
						duration: 0.4,
						height: 0,

						onComplete: () => {
							isPlayingConvo = false;
						},
					});
			}
		});

		return timeline;
	};

	convoTimelines = Array.from(convoParts).map(createTimeline);

	// Play each timeline sequentially
	for (const [index, timeline] of convoTimelines.entries()) {
		try {
			await timeline.play();
			// Optionally run loader animation between each timeline
			if (index < convoTimelines.length - 1) {
				await runLoaderWithSpinner(index);
			}
		} catch (error) {
			console.error(`Error in timeline ${index}:`, error);
			break;
		}
	}
};

// Helper function for loader animation
const runLoaderWithSpinner = async (index: number) => {
	await new Promise<void>((resolve) => {
		const checkTl = threeDotsToCheckmark(
			dotsTl,
			() => {
				const spinTl = threeDotsToSpinner(dotsTl, resolve, index);
				convoTimelines.push(spinTl);
			},
			index
		);
		convoTimelines.push(checkTl);
	});
};

// Select the element to observe
const targetElement = document.querySelector(".PhoneSection");

// if (targetElement) {
// 	autoplayObserverUsingGSAP(
// 		targetElement,
// 		() => {
// 			playConvo();
// 		},
// 		onLeave
// 	);
// } else {
// 	console.error("Element .DeviceSectionWrapper not found.");
// }

// -----------------------------------------------------------------------------------------
