export const autoplayObserver = (
	targetElement: Element | null,
	playAnimation: () => void
) => {
	// IntersectionObserver logic
	const observerOptions = {
		root: null, // Observes within the viewport
		rootMargin: "0px 0px -80% 0px", // Trigger when 80% of the section is in view
		threshold: 0.1, // Percentage of the element visible to trigger
	};

	const observerCallback = (
		entries: IntersectionObserverEntry[],
		observer: IntersectionObserver
	) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				console.log("Animation starts as section enters the viewport");
				playAnimation(); // Play the animation
				// observer.unobserve(entry.target); // Stop observing after triggering
			}
		});
	};

	// Create the observer
	const observer = new IntersectionObserver(observerCallback, observerOptions);

	if (targetElement) {
		observer.observe(targetElement);
	}
};
