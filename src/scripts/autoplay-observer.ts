import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const autoplayObserver = (
	targetElement: Element | null,
	onEnter: () => void,
	onLeave: () => void
) => {
	// IntersectionObserver logic
	const observerOptions = {
		root: null, // Observes within the viewport
		rootMargin: "0px 0px -60% 0px", // Trigger when 70% of the section is in view
		threshold: 0.1, // Percentage of the element visible to trigger
	};

	const observerCallback = (
		entries: IntersectionObserverEntry[],
		observer: IntersectionObserver
	) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				console.log("Animation starts as section enters the viewport");
				onEnter(); // Play the animation
				// observer.unobserve(entry.target); // Stop observing after triggering
			} else {
				console.log("Section is out of view");
				onLeave(); // Run the function for leaving the section
			}
		});
	};

	// Create the observer
	const observer = new IntersectionObserver(observerCallback, observerOptions);

	if (targetElement) {
		observer.observe(targetElement);
	}
};

export const autoplayObserverUsingGSAP = (
	targetElement: Element | null,
	onEnter: () => void,
	onLeave: () => void
) => {
	// GSAP ScrollTrigger logic
	ScrollTrigger.create({
		trigger: targetElement,
		start: "top 70%", // Trigger when 70% of the section is in view
		end: "bottom 30%", // Trigger when 30% of the section is out of view
		onEnter: () => {
			console.log("Animation starts as section enters the viewport");
			onEnter(); // Play the animation
		},
		onLeaveBack: () => {
			console.log("Section is out of view");
			onLeave(); // Run the function for leaving the section
		},
	});
};
