import gsap from "gsap";
import { Power2, Power4 } from "gsap";
import SplitType from "split-type";
import { autoplayObserver } from "./autoplay-observer";
import { patientConvo_pt1 } from "../utils/constants";
import {
	splitConvoTextIntoChars,
	splitConvoTextIntoWords,
} from "../utils/helpers";
import { spinFunc } from "./phone-loader-animation";

// -------------------------- Conversation Animation ---------------------------
// Function to play the conversation animation
const playConversation = () => {
	// Split all conversation text into words
	splitConvoTextIntoChars(".DeviceSection__main__convo__text");

	const convoParts = document.querySelectorAll(
		".DeviceSection__main__convoPart"
	);

	// Create a master timeline for the conversation
	const conversationTl = gsap.timeline({ defaults: { ease: Power4.easeOut } });
	// conversationTl.add(spinnerTl.play());

	// Loop through each response in the conversation
	convoParts.forEach((convoPart, convoIndex) => {
		// Add an animation for each response to the timeline
		console.log("convoPart", convoPart);
		[...convoPart.children].forEach((response, index) => {
			if (index === 0) {
				conversationTl.to(convoPart, {
					opacity: 1,
					duration: 0.3,
					height: "4rem",
				});
			}

			const splitElContainer = convoParts[convoIndex].querySelectorAll(
				".DeviceSection__main__convo__text"
			)[index];
			const splitElements = convoParts[convoIndex]
				.querySelectorAll(".DeviceSection__main__convo__text")
				[index].querySelectorAll(".char");
			const reversedSplitElements = [...splitElements].reverse();

			console.log("splitElements", splitElements, convoIndex, index);

			conversationTl
				.to(splitElContainer, {
					opacity: 1,
					height: "auto",
					duration: 0.1,
				})
				.fromTo(
					splitElements, // Target split words
					{ opacity: 0, width: 0 },
					{
						opacity: 1,
						duration: 0.08,
						stagger: 0.03,
						width: "auto",
					}
				)
				.to(reversedSplitElements, {
					opacity: 0,
					width: 0,
					duration: 0.08,
					stagger: 0.03,
					delay: 3, // Pause between responses
				})
				.to(splitElContainer, {
					opacity: 0,
					duration: 0.1,
					height: 0,
					// delay: 4, // Pause between responses
				});

			if (index === convoPart.children.length - 1) {
				conversationTl.to(convoPart, {
					opacity: 0,
					duration: 0.3,
					height: 0,
					onComplete: () => {
						spinFunc();
					},
				});
			}
		});

		// conversationTl.add(spinnerTl);
	});

	// Start the timeline
	conversationTl.play();
};

// Select the element to observe
const targetElement = document.querySelector(".DeviceSectionWrapper");

if (targetElement) {
	autoplayObserver(targetElement, playConversation);
} else {
	console.error("Element .DeviceSectionWrapper not found.");
}

// -----------------------------------------------------------------------------------------


