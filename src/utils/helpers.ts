import SplitType from "split-type";

// Function to split all instances of the class into words
export const splitConvoTextIntoWords = (selector: string) => {
	// Query all elements with the specified class
	const textElements = document.querySelectorAll(selector);

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
			new SplitType(element, { types: "chars,words" });
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
