import SplitType from "split-type";

// Function to split all instances of the class into words
export const splitConvoTextIntoWords = (textElements: NodeListOf<Element>) => {
	// Query all elements with the specified class
	// const textElements = document.querySelectorAll(selector);

	if (textElements.length === 0) {
		console.warn(
			"No elements with the class .PhoneSection__convo__text found."
		);
		return;
	}

	// Iterate over each element and apply SplitType
	textElements.forEach((element) => {
		// Ensure the element is valid
		if (element instanceof HTMLElement) {
			new SplitType(element, { types: "words" });
		} else {
			console.error("Invalid element detected:", element);
		}
	});

	console.log(
		"Text split into words for all .PhoneSection__convo__text elements."
	);
};

// Function to split all instances of the class into words
export const splitConvoTextIntoChars = (textElements: NodeListOf<Element>) => {
	// Query all elements with the specified class

	if (textElements.length === 0) {
		console.warn(
			"No elements with the class .PhoneSection__convo__text found."
		);
		return;
	}

	// Iterate over each element and apply SplitType
	textElements.forEach((element) => {
		// Ensure the element is valid
		if (element instanceof HTMLElement) {
			new SplitType(element, { types: "words, chars" });
		} else {
			console.error("Invalid element detected:", element);
		}
	});

	console.log(
		"Text split into characters for all .PhoneSection__convo__text elements."
	);
};

// Function to scale any element based on the viewport size
export function scaleElementToViewport(
	element: Element,
	elementWidth: number,
	elementHeight: number
) {
	// Ensure the element has the correct dimensions
	// element.style.width = `${elementWidth}px`;
	// element.style.height = `${elementHeight}px`;
	element.setAttribute(
		"style",
		`width: ${elementWidth}px; height: ${elementHeight}px`
	);

	function scale() {
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		// Calculate scale factors for width and height
		const scaleX = viewportWidth / elementWidth;
		const scaleY = viewportHeight / elementHeight;

		// Choose the smaller scale factor to maintain aspect ratio
		const scale = Math.min(scaleX, scaleY);

		// Apply the scaling transformation
		// element.style.transform = `scale(${scale})`;
		// element.style.transformOrigin = "top left"; // Ensure scaling starts from the top-left corner

		element.setAttribute(
			"style",
			`transform: scale(${scaleX}); transform-origin: top left`
		);

		// Adjust the element's container size to prevent overflow
		// element.style.width = `${elementWidth}px`;
		// element.style.height = `${elementHeight}px`;
		// element.setAttribute(
		// 	"style",
		// 	`width: ${elementWidth}px; height: ${elementHeight}px`
		// );
	}

	// Initial scale
	scale();

	// Reapply scaling on window resize
	window.addEventListener("resize", scale);
}

// Utility function to calculate the largest 16:10 size within the viewport
export function getLargest16By10Size(): { width: number; height: number } {
	const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;

	// Calculate the maximum width and height that fit the 16:10 aspect ratio
	const maxWidth = viewportWidth * 0.5;
	const maxHeight = viewportWidth * 0.5 * (10 / 16);

	if (maxHeight <= viewportHeight) {
		return { width: maxWidth, height: maxHeight };
	} else {
		return { width: viewportHeight * (16 / 10), height: viewportHeight };
	}
}

// Function to set the div size
export function setDivToLargest16By10Size(div: HTMLElement) {
	const { width, height } = getLargest16By10Size();

	// Set the size of the div
	div.style.width = `${width}px`;
	div.style.height = `${height}px`;
	// Ensure block-level display
}

// helpers.ts

// We'll store the current scroll position so that when we re-enable scroll
// we can restore the page’s position.
let scrollPosition = 0;

/**
 * Disables user scrolling.
 * It fixes the document body at the current scroll position.
 */
export function disableScroll() {
	// Save the current scroll position
	scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

	// Set the body styles to "lock" the scroll.
	// Using position: fixed prevents further scroll while preserving the current view.
	document.body.style.overflow = "hidden";
	document.body.style.position = "fixed";
	document.body.style.top = `-${scrollPosition}px`;

	// Optionally, if you're using Lenis you might want to pause it:
	// lenis.stop();

	console.log(window.pageYOffset, document.documentElement.scrollTop);
}

/**
 * Enables user scrolling.
 * It removes the styles added in disableScroll() and resets the scroll position.
 */
export function enableScroll() {
	// Restore the body's scrollability
	document.body.style.overflow = "";
	document.body.style.position = "";
	document.body.style.top = "";

	// Restore the scroll position (if needed)
	window.scrollTo(0, scrollPosition);

	// Optionally, if you're using Lenis you might want to resume it:
	// lenis.start();
}

export function isIOS() {
	return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

export function smoothScrollTo(
	targetPosition: number,
	duration: number = 2000
): void {
	const start = window.scrollY;
	const distance = targetPosition - start;
	const startTime = performance.now();

	function scrollStep(currentTime: number) {
		const elapsedTime = currentTime - startTime;
		const progress = Math.min(elapsedTime / duration, 1);

		// Ease-in-out quadratic function for smoother scrolling
		const easeInOutQuad =
			progress < 0.5
				? 2 * progress * progress
				: 1 - Math.pow(-2 * progress + 2, 2) / 2;

		window.scrollTo(0, start + distance * easeInOutQuad);

		if (elapsedTime < duration) {
			requestAnimationFrame(scrollStep);
		}
	}

	requestAnimationFrame(scrollStep);
}

export const switchTab = (ind: number) => {
	const tabItems = document.querySelectorAll(".TabToggle__button");
	if (tabItems.length === 0) {
		console.warn("No tab items found.");
		return;
	}
	tabItems.forEach((tabItem, ind) => {
		if (tabItem.classList.contains("TabToggle__button--active")) {
			tabItem.classList.remove("TabToggle__button--active");
		}
	});

	tabItems[ind].classList.add("TabToggle__button--active");
};

export const findWhiteSpaceNodes = (parent: Element) => {
	parent.childNodes.forEach((node) => {
		if (node.nodeType === 3 && !node.nodeValue?.trim()) {
			console.log("Whitespace node found:", node);
		}
	});
};

export const formatDateToDisplay = (date: Date) => {
	return new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "short",
		day: "2-digit",
	}).format(date);
};

export const pickRandomName = (fullNames: string[]) => {
	const randomIndex = Math.floor(Math.random() * fullNames.length);
	return fullNames[randomIndex];
};

export const pickRandomAction = (actions: string[]) => {
	const randomIndex = Math.floor(Math.random() * actions.length);
	return actions[randomIndex];
};

export const padNumber = (num: number, digits: number) => {
	return num.toString().padStart(digits, "0");
};

export const displayTimeFrom928 = (element: Element) => {
	// the moment this is called, it is 9:28
	// from this moment, we will display the updated time every minute

	// Set the initial time to 9:28
	let hours = 9;
	let minutes = 28;

	// Helper function to format the time as HH:MM
	const formatTime = (h: number, m: number): string => {
		return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
	};

	// Update the element with the initial time
	element.textContent = formatTime(hours, minutes);

	// Update the time every minute (60,000 milliseconds)
	const intervalId = setInterval(() => {
		// Increment minutes
		minutes++;

		// Handle hour change
		if (minutes >= 60) {
			minutes = 0;
			hours++;

			// Handle day change (reset to 0 after 23)
			if (hours >= 24) {
				hours = 0;
			}
		}

		// Update the element with the new time
		element.textContent = formatTime(hours, minutes);
	}, 60000);

	// Return the interval ID in case you need to stop the timer later
	return intervalId;
};
