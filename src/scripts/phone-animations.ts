import gsap from "gsap";
import { Power2, Power4 } from "gsap";
import SplitType from "split-type";
import { autoplayObserver } from "./autoplay-observer";
import { patientConvo_pt1 } from "../utils/constants";
import {
	splitConvoTextIntoChars,
	splitConvoTextIntoWords,
} from "../utils/helpers";
import {
	spinFunc,
	threeDotsToCheckmark,
	threeDotsToSpinner,
} from "./phone-loader-animation";

// -------------------------- Dot Loader Animation ---------------------------
let animations: gsap.core.Tween[] = [];
const regularDotMovement = () => {
	const dots = document.querySelectorAll(".PhoneDotLoader__dot");
	[...dots].reverse().forEach((dot, i) => {
		const animation = gsap.to(dot, {
			yPercent: -70, // Move up
			duration: 0.6, // Total duration
			ease: "linear", // Easing function
			yoyo: true, // Reverse back to original
			repeat: -1, // Infinite loop
			delay: i * 0.15, // Stagger based on index
		});

		animations.push(animation);
	});
};

regularDotMovement();

// -------------------------- Conversation Animation ---------------------------
// Function to play the conversation animation
let timelines: gsap.core.Timeline[] = [];
const playConversation = async () => {
	console.log("playConversation");
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
						duration: 0.3,
						height: "4rem",
					})
					.to(
						".PhoneSection__fakeConvoPart",
						{
							duration: 0.3,
							height: 0,
						},
						"<"
					);
			}

			const splitElContainer = convoParts[convoIndex].querySelectorAll(
				".PhoneSection__convo__text"
			)[index];
			const splitElements = convoParts[convoIndex]
				.querySelectorAll(".PhoneSection__convo__text")
				[index].querySelectorAll(".word");
			const reversedSplitElements = [...splitElements].reverse();

			timeline
				.to(splitElContainer, {
					opacity: 1,
					height: "auto",
					duration: 0.1,
				})
				.fromTo(
					splitElements,
					{ opacity: 0, width: 0 },
					{ opacity: 1, duration: 0.5, stagger: 0.5, width: "auto" }
				)
				.to(reversedSplitElements, {
					opacity: 0,
					width: 0,
					duration: 0.25,
					stagger: 0.2,
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
							height: "4rem",
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
		threeDotsToCheckmark(
			animations,
			() => threeDotsToSpinner(animations, resolve, index),
			index
		);
	});
};

// Select the element to observe
const targetElement = document.querySelector(".PhoneSection");
const onLeave = () => {
	timelines.forEach((timeline) => timeline.kill());
};

if (targetElement) {
	autoplayObserver(targetElement, playConversation, onLeave);
} else {
	console.error("Element .DeviceSectionWrapper not found.");
}

// -----------------------------------------------------------------------------------------
