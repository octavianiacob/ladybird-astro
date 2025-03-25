import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Observer } from "gsap/Observer";
import SplitType from "split-type";
import { Power2, Power4 } from "gsap";
import Lenis from "@studio-freight/lenis";
import { fadeInBox, fadeOutBox } from "./reusable-animations";
import { autoplayObserver } from "./autoplay-observer";
// import { animatePhoneText } from "./phone-animations";
import { onMount } from "solid-js";
import {
	detectAutoScrollComplete,
	runIfFromScratch,
} from "./detect-auto-scroll-complete";
import { smoothScrollTo, switchTab } from "../utils/helpers";
import { playConversation } from "./phone-animations";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollToPlugin);
ScrollTrigger.config({
	ignoreMobileResize: true,
});
ScrollTrigger.normalizeScroll(true);

const video = document.querySelector(".LaptopSection__vid") as HTMLVideoElement;
const screen = document.querySelector(".LaptopSection__screen") as HTMLElement;

let isAnimating = false;
let currTab = 0;
let isLaptopPlaying = false;
let currSection = 1;
let direction: boolean | null = null;

const resetIsAnimating = () => {
	setTimeout(() => {
		isAnimating = false;
	}, 400);
};

let plainTl = gsap.timeline({
	// paused: true,
});

const resetVideo = () => {
	if (video) {
		video.pause();
		video.currentTime = 0;
		screen.style.opacity = "0";

		isLaptopPlaying = false;
	}
};

const resetDeviceSection = () => {
	currTab = 0;

	gsap.to(".DeviceSection__main", {
		yPercent: 0,
		ease: "power4.inOut",
		delay: 0,
		duration: 1,

		onComplete: () => {
			switchTab(0);
			resetVideo();
		},
	});
};
const resetPlainSection = () => {
	plainTl.kill();
	gsap.to(".PlainTextSection", {
		opacity: 0,
	});
};

const laptopEnterFunc = () => {
	// set the active tab

	switchTab(1);

	// Play the video and hide the screen
	if (video && !isLaptopPlaying) {
		isLaptopPlaying = true;
		// lenis.stop(); // Pause the smooth scroll
		if (screen) screen.style.opacity = "0"; // Hide screen during video playback
		video.currentTime = 0; // Ensure it starts from the beginning
		video.play();

		video.onended = () => {
			// lenis.start();
			isLaptopPlaying = false;
		};
	}
};

const playPlain = () => {
	const plainTextInnerElements = document.querySelectorAll(
		".PlainTextSection__inner"
	) as NodeListOf<HTMLElement>;

	plainTl = gsap.timeline({
		// paused: true,

		onComplete: () => {
			gsap.to(".MainWrap__inner", {
				yPercent: -(2 / 4) * 100,
				ease: "power4.inOut",
				duration: 1,
				onStart: () => {
					isAnimating = true;
				},
				onComplete: () => {
					resetIsAnimating();
					switchTab(0);
					resetPlainSection();

					currSection = 3;
					playConversation();
				},
			});
		},
	});

	if (plainTextInnerElements.length > 0) {
		plainTextInnerElements.forEach((_, index) => {
			if (index < plainTextInnerElements.length - 1)
				plainTl
					.to(
						{},
						{
							// duration: 4.5,
							duration: 1.5,
						}
					) // Pause before moving to the next section
					.to(
						".PlainTextSection",
						{
							opacity: 1,
							duration: 0.5,
						},
						"<"
					)
					.to(".PlainTextSection", {
						yPercent: -(100 / plainTextInnerElements.length) * (index + 1),
						duration: 1,
						ease: "power2.inOut",
					});
			else if (index === plainTextInnerElements.length - 1) {
				plainTl.to(".PlainTextSection", { opacity: 0, duration: 1.5 }); // Pause before moving to the next section
			}
		});
	}
};

const scrollUpFunc = () => {
	switch (currSection) {
		case 1:
			return () => {};
			break;
		case 2:
			return () => {
				gsap.to(".MainWrap__inner", {
					yPercent: 0,
					ease: "power4.inOut",
					duration: 1,
					onStart: () => {
						isAnimating = true;
					},
					onComplete: () => {
						resetPlainSection();
						currSection = 1;

						resetIsAnimating();
					},
				});
			};
			break;
		case 3:
			return () => {
				if (currTab === 0) {
					resetPlainSection();
					gsap.to(".MainWrap__inner", {
						yPercent: -(1 / 4) * 100,
						ease: "power4.inOut",
						duration: 1,

						onStart: () => {
							isAnimating = true;
						},
						onComplete: () => {
							currTab = 0;
							resetDeviceSection();
							playPlain();

							currSection = 2;
							resetIsAnimating();
						},
					});
				} else {
					gsap.to(".DeviceSection__main", {
						yPercent: 0,
						ease: "power4.inOut",
						delay: 0,
						duration: 1,
						onStart: () => {
							isAnimating = true;
						},
						onComplete: () => {
							currTab = 0;
							// laptopEnterFunc();
							switchTab(0);
							resetDeviceSection();
							// resetVideo();

							resetIsAnimating();
						},
					});
				}
			};
			break;
		case 4:
			return () => {
				gsap.to(".MainWrap__inner", {
					yPercent: -(2 / 4) * 100,
					ease: "power4.inOut",
					duration: 1,

					onStart: () => {
						isAnimating = true;
					},
					onComplete: () => {
						currSection = 3;
						resetIsAnimating();
						playConversation();
					},
				});
			};
			break;

		default:
			return () => {};
			break;
	}
};

const scrollDownFunc = () => {
	switch (currSection) {
		case 1:
			return () => {
				gsap.to(".MainWrap__inner", {
					yPercent: -(1 / 4) * 100,
					ease: "power4.inOut",
					duration: 1,

					onStart: () => {
						isAnimating = true;
					},
					onComplete: () => {
						resetIsAnimating();
						playPlain();

						currSection = 2;
					},
				});
			};
			break;
		case 2:
			return () => {};
			break;
		case 3:
			return () => {
				if (currTab === 0) {
					gsap.to(".DeviceSection__main", {
						yPercent: -50,
						ease: "power4.inOut",
						duration: 1,
						onStart: () => {
							isAnimating = true;
						},
						onComplete: () => {
							switchTab(1);
							currTab = 1;

							console.log("Laptop section entered");
							laptopEnterFunc();

							resetIsAnimating();
						},
					});
				} else {
					gsap.to(".MainWrap__inner", {
						yPercent: -(3 / 4) * 100,
						ease: "power4.inOut",
						duration: 1,
						onStart: () => {
							isAnimating = true;
						},
						onComplete: () => {
							currTab = 0;
							resetDeviceSection();
							currSection = 4;

							resetIsAnimating();
						},
					});
				}
			};

		case 4:
			return () => {};

		default:
			return () => {};
			break;
	}
};

Observer.create({
	target: ".MainWrap__inner",
	type: "touch",

	onUp: () => {
		if (!isAnimating) {
			scrollDownFunc()();
		}
	},

	onDown: () => {
		if (!isAnimating) {
			scrollUpFunc()();
		}
	},
});
Observer.create({
	target: ".MainWrap__inner",
	type: "wheel,scroll",
	wheelSpeed: -1,
	tolerance: 10,
	preventDefault: true,

	onUp: () => {
		if (!isAnimating) {
			if (direction === true) scrollDownFunc()();
			else scrollUpFunc()();
		}
	},

	onDown: () => {
		if (!isAnimating) {
			if (direction === true) scrollUpFunc()();
			else scrollDownFunc()();
		}
	},
	onWheel: (self) => {
		if (direction === null) {
			direction = self.deltaY < 0;
		}
	},
});
// Observer.create({
// 	target: ".MainWrap__inner",
// 	type: "touch,scroll",
// 	// wheelSpeed: -1,

// 	onUp: () => {
// 		if (!isAnimating) {
// 			scrollDownFunc()();
// 		}
// 	},

// 	onDown: () => {
// 		if (!isAnimating) {
// 			scrollUpFunc()();
// 		}
// 	},
// });

console.log("isAnimating", isAnimating);

// -------------------------------------------
// Handle skip button click
const skipBtn = document.querySelector(".skipBtn");

if (skipBtn)
	skipBtn.addEventListener("click", () => {
		gsap.to(".MainWrap__inner", {
			yPercent: -(2 / 4) * 100,
			ease: "power4.inOut",
			duration: 1,
			onStart: () => {
				isAnimating = true;
			},
			onComplete: () => {
				resetIsAnimating();
				switchTab(0);
				resetPlainSection();

				currSection = 3;
				playConversation();
			},
		});
	});

// -------------------------------------------
// Handle video end event
if (video && screen) {
	video.addEventListener("ended", () => {
		screen.style.opacity = "1"; // Show the screen when video ends

		const dashTl = gsap.timeline();
	});
}

document.addEventListener("visibilitychange", function () {
	if (document.hidden) {
		console.log("gone away");
		screen.style.opacity = "0";
	} else {
		console.log("back again");
		if (currSection === 3 && currTab === 1) {
			// screen.style.opacity = "1";
			laptopEnterFunc();
		}
	}
});

document.addEventListener("blur", function () {
	console.log("gone away blurryyy");
	screen.style.opacity = "0";
});
