import gsap from "gsap";
import { Power2, Power4 } from "gsap";
import SplitType from "split-type";
import {
	autoplayObserver,
	autoplayObserverUsingGSAP,
} from "./autoplay-observer";
import { patientConvo_pt1 } from "../utils/constants";
import {
	splitConvoTextIntoChars,
	splitConvoTextIntoWords,
} from "../utils/helpers";
import {
	pauseDotAnimations,
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

regularDotMovement();

// -------------------------- Conversation Animation ---------------------------
// Function to play the conversation animation
let timelines: gsap.core.Timeline[] = [];
const onLeave = () => {
	resetPhoneAnims(animations);
	timelines.forEach((timeline) => timeline.kill());
};

const playConversation = async () => {
	onLeave();
	// Split all conversation text into words/characters
	const textElements = document.querySelectorAll(".PhoneSection__convo__text");
	splitConvoTextIntoChars(textElements);

	const convoParts = document.querySelectorAll(".PhoneSection__convoPart");

	const createTimeline = (convoPart: Element, convoIndex: number) => {
		const timeline = gsap.timeline({
			defaults: { ease: Power4.easeOut },
			paused: true,
		});

		[...convoPart.children].forEach((response, index) => {
			if (index === 0) {
				timeline
					.to(convoPart, {
						opacity: 1,
						duration: 0.05,
						height: "4.5rem",
					})
					.to(
						".PhoneSection__fakeConvoPart",
						{
							duration: 0.05,
							height: 0,
						},
						"<"
					);
			}

			const splitElContainer = convoParts[convoIndex].querySelectorAll(
				".PhoneSection__convo__text"
			)[index];
			console.log("splitElContainer", splitElContainer);
			let isAI = splitElContainer.className.includes("--AI");

			const splitElements = convoParts[convoIndex]
				.querySelectorAll(".PhoneSection__convo__text")
				[index].querySelectorAll(".char");
			const reversedSplitElements = [...splitElements].reverse();

			timeline
				.to(splitElContainer, {
					opacity: 1,
					height: "auto",
					duration: 0.1,
					onComplete: () => {
						if (!isAI) {
							pauseDotAnimations(animations);

							gsap.to(".PhoneDotLoader__dot", {
								// reset the dots
								yPercent: 0,
								duration: 0.6,
								stagger: 0.25,
								// ease: "power2.inOut",
							});
						} else {
							resumeDotAnimations(animations);
						}
					},
				})
				.fromTo(
					splitElements,
					{ opacity: 0, width: 0 },
					{ opacity: 1, duration: 0.1, stagger: 0.06, width: "auto" }
				)
				.to(reversedSplitElements, {
					opacity: 0,
					width: 0,
					duration: 0.05,
					stagger: 0.05,
					delay: 3, // Pause between responses
				})
				.to(splitElContainer, {
					opacity: 0,
					duration: 0.1,
					height: 0,
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
							height: "4.5rem",
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
