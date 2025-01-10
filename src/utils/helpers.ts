import SplitType from "split-type";

// Function to split all instances of the class into words
export const splitConvoTextIntoWords = (selector: string) => {
	// Query all elements with the specified class
	const textElements = document.querySelectorAll(selector);

	if (textElements.length === 0) {
		console.warn(
			"No elements with the class .DeviceSection__main__convo__text found."
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
		"Text split into words for all .DeviceSection__main__convo__text elements."
	);
};
