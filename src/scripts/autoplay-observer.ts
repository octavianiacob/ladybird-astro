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
