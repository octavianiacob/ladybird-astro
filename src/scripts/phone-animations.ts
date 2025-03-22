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
	pauseDotAnimations,
	pauseDotAnimationsSeamlessly,
	resetPhoneAnims,
	resumeDotAnimations,
	threeDotsToCheckmark,
	threeDotsToSpinner,
} from "./phone-loader-animation";

// -------------------------- Dot Loader Animation ---------------------------
let animations: gsap.core.Tween[] = [];

const regularDotMovement = () => {
	const dots = document.querySelectorAll(".PhoneDotLoader__dot");
	[...dots].reverse().forEach((dot, i) => {
		const animation = gsap.to(dot, {
			yPercent: -80, // Move up
			duration: 0.6, // Total duration
			ease: "linear", // Easing function
			yoyo: true, // Reverse back to original
			repeat: -1, // Infinite loop
			delay: i * 0.22, // Stagger based on index
		});

		animations.push(animation);
	});
};

export const resetDotsCompletely = () => {
	animations = [];
	regularDotMovement();
};

regularDotMovement();

// -------------------------- Conversation Animation ---------------------------
// Function to play the conversation animation
let timelines: gsap.core.Timeline[] = [];
export const onLeave = () => {
	resetPhoneAnims(animations);
	timelines.forEach((timeline) => timeline.kill());
	timelines = [];

	// resetDotsCompletely();
};

export const playConversation = async () => {
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
						height: "5rem",
					})
					.to(
						".PhoneSection__fakeConvoPart",
						{
							duration: 0.01,
							height: 0,
						},
						"<"
					);
			}

			const splitElements = convoParts[convoIndex]
				.querySelectorAll(".PhoneSection__convo__text")
				[index].querySelectorAll(".word");
			const reversedSplitElements = [...splitElements].reverse();

			timeline
				.to(
					splitElContainer,
					{
						opacity: 1,
						height: "auto",
						duration: 0.1,
						onComplete: () => {
							if (convoIndex === 0 && index === 0) {
								[...animations].reverse().forEach((animation, i) => {
									animation.play(i * 0.22);
								});
							} else if (!isAI) {
								const dots = document.querySelectorAll(".PhoneDotLoader__dot");
								pauseDotAnimationsSeamlessly(animations, dots);
							} else if (animations[0].paused()) {
								resetDotsCompletely();
							}
						},
					},
					"<"
				)

				.fromTo(
					// show the first 5 words
					splitElements,
					{ opacity: 0 },
					{ opacity: 1, duration: 0.8, stagger: 0.6 },
					"<+=0.3"
				)
				.to(
					// hide the first 5 words
					splitElements,
					{ opacity: 0, width: 0, duration: 0.001, delay: 0.5 }
					// "<+=1.8"
				)

				.to(splitElContainer, {
					opacity: 0,
					duration: 0.01,
					height: 0,

					onComplete: () => {
						if (index === convoPart.children.length - 1 && isAI) {
							const dots = document.querySelectorAll(".PhoneDotLoader__dot");
							pauseDotAnimationsSeamlessly(animations, dots);
						}
					},
				});

			if (index === convoPart.children.length - 1) {
				timeline
					.to(convoPart, {
						opacity: 0,
						duration: 0.3,
						height: 0,
					})
					.to(
						".PhoneSection__fakeConvoPart",
						{
							duration: 0.3,
							height: "5rem",
						},
						"<"
					);
			}
		});

		return timeline;
	};

	timelines = Array.from(convoParts).map(createTimeline);

	// Play each timeline sequentially
	for (const [index, timeline] of timelines.entries()) {
		try {
			await timeline.play();
			// Optionally run loader animation between each timeline
			if (index < timelines.length - 1) {
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
			animations,
			() => {
				const spinTl = threeDotsToSpinner(animations, resolve, index);
				timelines.push(spinTl);
			},
			index
		);
		timelines.push(checkTl);
	});
};

// Select the element to observe
const targetElement = document.querySelector(".PhoneSection");

if (targetElement) {
	autoplayObserverUsingGSAP(targetElement, playConversation, onLeave);
} else {
	console.error("Element .DeviceSectionWrapper not found.");
}

// -----------------------------------------------------------------------------------------
