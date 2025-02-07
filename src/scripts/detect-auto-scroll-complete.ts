export const detectAutoScrollComplete = (
	target: HTMLElement,
	afterFunc: () => void
) => {
	const observer = new IntersectionObserver(
		(entries, observer) => {
			if (entries[0].isIntersecting) {
				console.log("Scroll finished!");
				// Your callback function here
				afterFunc();
				observer.disconnect(); // Stop observing
			}
		},
		{ threshold: 0.9 } // Adjust threshold for accuracy
	);

	observer.observe(target);
};

export const runIfFromScratch = (afterFunc: () => void) => {
	const target = document.querySelector(".IntroSection");
	if (!target) return;

	const rect = target.getBoundingClientRect();
	const inView = rect.top >= 0 && rect.bottom <= window.innerHeight;

	if (inView) {
		console.log("Target is in view!");
		// Your callback function here
		afterFunc();
	}
};
