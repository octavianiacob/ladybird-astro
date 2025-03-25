import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import SplitType from "split-type";
import { switchTab } from "../utils/helpers";
import { playConversation } from "./phone-animations";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Configuration variables
let currSection = 1;
let currTab = 0;
let isAnimating = false;
let isLaptopPlaying = false;

// DOM element references
const mainWrap = document.querySelector(".MainWrap__inner") as HTMLElement;
const video = document.querySelector(".LaptopSection__vid") as HTMLVideoElement;
const screen = document.querySelector(".LaptopSection__screen") as HTMLElement;
const skipBtn = document.querySelector(".skipBtn") as HTMLElement;

// Utility functions
const resetIsAnimating = () => {
	setTimeout(() => {
		isAnimating = false;
	}, 400);
};

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
		duration: 1,
		onComplete: () => {
			switchTab(0);
			resetVideo();
		},
	});
};

const resetPlainSection = () => {
	gsap.to(".PlainTextSection", {
		opacity: 0,
	});
};

const laptopEnterFunc = () => {
	switchTab(1);

	if (video && !isLaptopPlaying) {
		isLaptopPlaying = true;
		screen.style.opacity = "0";
		video.currentTime = 0;
		video.play();

		video.onended = () => {
			isLaptopPlaying = false;
		};
	}
};

const playPlain = () => {
	const plainTextInnerElements = document.querySelectorAll(
		".PlainTextSection__inner"
	) as NodeListOf<HTMLElement>;

	const plainTl = gsap.timeline({
		onComplete: () => {
			gsap.to(mainWrap, {
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
			if (index < plainTextInnerElements.length - 1) {
				plainTl
					.to({}, { duration: 1.5 })
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
			} else if (index === plainTextInnerElements.length - 1) {
				plainTl.to(".PlainTextSection", { opacity: 0, duration: 1.5 });
			}
		});
	}
};

// ScrollTrigger Setup
const setupScrollTrigger = () => {
	ScrollTrigger.create({
		trigger: mainWrap,
		start: "top top",
		end: "bottom bottom",
		markers: true,
		onUpdate: (self) => {
			if (isAnimating) return;

			const direction = self.direction;

			switch (currSection) {
				case 1:
					if (direction === 1) {
						// Scroll down from section 1
						gsap.to(mainWrap, {
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
					}
					break;

				case 2:
					if (direction === -1) {
						// Scroll up to section 1
						gsap.to(mainWrap, {
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
					} else if (direction === 1) {
						// Cannot scroll down from section 2
					}
					break;

				case 3:
					if (direction === -1) {
						// Scroll up from section 3
						if (currTab === 0) {
							resetPlainSection();
							gsap.to(mainWrap, {
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
							// Reset device section when scrolling up from laptop tab
							gsap.to(".DeviceSection__main", {
								yPercent: 0,
								ease: "power4.inOut",
								duration: 1,
								onStart: () => {
									isAnimating = true;
								},
								onComplete: () => {
									currTab = 0;
									switchTab(0);
									resetDeviceSection();
									resetIsAnimating();
								},
							});
						}
					} else if (direction === 1) {
						// Scroll down from section 3
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
									laptopEnterFunc();
									resetIsAnimating();
								},
							});
						} else {
							gsap.to(mainWrap, {
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
					}
					break;

				case 4:
					if (direction === -1) {
						// Scroll up to section 3
						gsap.to(mainWrap, {
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
					}
					break;
			}
		},
	});
};

// Skip button event listener
if (skipBtn) {
	skipBtn.addEventListener("click", () => {
		gsap.to(mainWrap, {
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
}

// Video end event listener
if (video && screen) {
	video.addEventListener("ended", () => {
		screen.style.opacity = "1";
	});
}

// Visibility and blur event listeners
document.addEventListener("visibilitychange", () => {
	if (document.hidden) {
		screen.style.opacity = "0";
	} else {
		if (currSection === 3 && currTab === 1) {
			laptopEnterFunc();
		}
	}
});

document.addEventListener("blur", () => {
	screen.style.opacity = "0";
});

// Initialize ScrollTrigger
setupScrollTrigger();
