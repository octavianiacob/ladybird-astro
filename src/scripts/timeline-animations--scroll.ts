import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import SplitType from "split-type";
import { switchTab } from "../utils/helpers";
import {
	convoTimelines,
	dotsTl,
	isPlayingConvo,
	playConversation,
} from "./phone-animations";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
ScrollTrigger.config({
	ignoreMobileResize: true,
});
ScrollTrigger.normalizeScroll(true);

// Configuration variables
let currSection = 1;
let currTab = 0;
let isAnimating = false;
let isScrolling = false;
let isLaptopPlaying = false;

let hasScrolled = false;

// DOM element references
const mainWrap = document.querySelector(".MainWrap__inner") as HTMLElement;
const video = document.querySelector(".LaptopSection__vid") as HTMLVideoElement;
const screen = document.querySelector(".LaptopSection__screen") as HTMLElement;

const skipBtn = document.querySelector(".skipBtn") as HTMLElement;
const PhoneSection__convoParts = document.querySelectorAll(
	".PhoneSection__convoPart"
) as NodeListOf<HTMLElement>;

PhoneSection__convoParts[0].style.height = "6rem";
PhoneSection__convoParts[0].style.opacity = "0";

// Utility functions
const resetIsAnimating = () => {
	setTimeout(() => {
		isAnimating = false;
	}, 400);
};

let isPlainTlPlaying = false;
let plainTl: gsap.core.Timeline = gsap.timeline({});

export const playConvo = () => {
	console.log("started");

	gsap
		.timeline({})
		.to(".PhoneDotLoader__dot, .PhoneSection__convoWrap", {
			opacity: 0,
			duration: 0.001,
		})
		.to(
			{},
			{
				duration: 1,
			}
		)
		.to(".PhoneDotLoader__dot", {
			opacity: 1,
			duration: 0.5,
		})
		.to(
			{},
			{
				duration: 1,
				onComplete: () => {
					playConversation();
				},
			}
		);
};
// };

console.log("plainTl", plainTl);

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

		onStart: () => {
			switchTab(0);
		},
		onComplete: () => {
			// switchTab(0);
			resetVideo();
		},
	});
};

const resetPlainSection = (afterFunc = () => {}) => {
	console.log("isPlainTlPlaying", isPlainTlPlaying);
	if (isPlainTlPlaying) {
		gsap.to(".PlainTextSection", {
			// opacity: 0,
			duration: 0.1,
			onComplete: () => {
				plainTl.pause();

				afterFunc();
			},
		});
	} else {
		gsap.to(".PlainTextSection", {
			opacity: 0,
			yPercent: 0,
			duration: 0.1,
			onComplete: () => {
				plainTl.kill();
				console.log("plainTl", plainTl);

				setTimeout(() => {
					plainTl.kill();

					plainTl = gsap.timeline({});
				}, 1000);

				console.log("plainTl killed");
				afterFunc();
			},
		});
	}
};

const resetDotsTl = () => {
	gsap.to(".PhoneDotLoader__dot", {
		scale: 1,
		duration: 0.01,
	});

	dotsTl.pause();
	dotsTl.kill();
	console.log("dotsTl killed");
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

const playPlainCore = () => {
	isPlainTlPlaying = true;
	gsap.to(".PlainTextSection", {
		opacity: 0,
	});

	const plainTextInnerElements = document.querySelectorAll(
		".PlainTextSection__inner"
	) as NodeListOf<HTMLElement>;

	console.log("plainTl initialized");
	plainTl = gsap.timeline({
		// paused: true,
		onComplete: () => {
			isPlainTlPlaying = false;
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

					resetDotsTl();
					playConvo();
				},
			});
		},
	});

	if (plainTextInnerElements.length > 0) {
		plainTextInnerElements.forEach((_, index) => {
			if (index < plainTextInnerElements.length - 1 && plainTl) {
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
			} else if (index === plainTextInnerElements.length - 1 && plainTl) {
				plainTl.to(".PlainTextSection", { opacity: 0, duration: 1.5 });
			}
		});
	}
};

const playPlain = () => {
	console.log("playPlain", playPlain);
	console.log("isPlainTlPlaying", isPlainTlPlaying);
	if (isPlainTlPlaying) {
		plainTl.resume();
	} else playPlainCore();

	console.log("plainTl", plainTl);
};

console.log("hasScrolled", hasScrolled);
console.log("window.scrollY", window.scrollY);

// ScrollTrigger Setup
const setupScrollTrigger = () => {
	ScrollTrigger.create({
		trigger: mainWrap,
		start: "top top",
		end: "bottom bottom",
		markers: true,
		// preventOverscroll: true, // Prevent overscrolling
		onUpdate: (self) => {
			console.log(self.direction);
			// console.log("currTab", currTab);
			// console.log("currSection", currSection);
			// console.log("isAnimating", isAnimating);

			// log current scroll position
			console.log("self.scroll()", self.scroll());

			if (isAnimating) {
				if (self.direction === 1) {
					// console.log("scrolling down");
					if (currSection === 1 && self.scroll() > 200) {
						self.scroll(100);
					} else if (currSection === 2 && self.scroll() > 400) {
						self.scroll(300);
					} else if (currSection === 3 && self.scroll() > 600) {
						self.scroll(500);
					} else if (currSection === 4 && self.scroll() > 800) {
						self.scroll(700);
					}
				} else if (self.direction === -1) {
					// console.log("scrolling up");
					if (currSection === 1 && self.scroll() < 0) {
						self.scroll(0);
					} else if (currSection === 2 && self.scroll() < 200) {
						self.scroll(200);
					} else if (currSection === 3 && self.scroll() < 400) {
						self.scroll(400);
					} else if (currSection === 4 && self.scroll() < 600) {
						self.scroll(600);
					}
				}
				return;
			}

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

								console.log("case 1");
								self.scroll(100);
							},
						});
					} else {
						// Cannot scroll up from section
						console.log("case 1");
					}
					break;

				case 2:
					console.log("case 2");
					if (direction === -1) {
						// Scroll up to section 1
						resetPlainSection(() => {
							gsap.to(mainWrap, {
								yPercent: 0,
								ease: "power4.inOut",
								duration: 1,
								onStart: () => {
									isAnimating = true;
								},
								onComplete: () => {
									currSection = 1;
									resetIsAnimating();
								},
							});
						});
					} else if (direction === 1) {
						// Cannot scroll down from section 2
						const muteBtn = document.querySelector(
							".PhoneSection__muteBtn"
						) as HTMLElement;
						muteBtn.style.visibility = "visible";
						gsap.to(mainWrap, {
							yPercent: -(1 / 4) * 100,
							ease: "power4.inOut",
							duration: 1,
							onStart: () => {
								isAnimating = true;
							},
							onComplete: () => {
								resetIsAnimating();
								currSection = 2;
							},
						});
					}
					break;

				case 3:
					// // if mobile
					// if () {}
					if (direction === -1) {
						// Scroll up from section 3
						// if (currTab === 0) {
						const audioEls = document.querySelectorAll(
							".PhoneSection__audio"
						) as NodeListOf<HTMLAudioElement>;
						// Pause all audio elements
						// and reset their current time
						audioEls.forEach((audioEl) => {
							audioEl.pause();
							audioEl.currentTime = 0;
						});

						// // Pause all convo timelines

						gsap.to(mainWrap, {
							yPercent: -(1 / 4) * 100,
							ease: "power4.inOut",
							duration: 1,
							onStart: () => {
								isAnimating = true;
							},
							onComplete: () => {
								resetPlainSection(() => {
									currTab = 0;
									resetDeviceSection();
									playPlain();

									currSection = 2;
									resetIsAnimating();
								});
							},
						});

						gsap.to(".PhoneDotLoader__dot, .PhoneSection__convoWrap", {
							opacity: 0,
							duration: 0.001,
						});
						// }
						// else {
						// const muteBtn = document.querySelector(
						// 	".PhoneSection__muteBtn"
						// ) as HTMLElement;
						// muteBtn.style.visibility = "visible";

						// // Reset device section when scrolling up from laptop tab
						// gsap.to(".DeviceSection__main", {
						// 	yPercent: 0,
						// 	ease: "power4.inOut",
						// 	duration: 1,
						// 	onStart: () => {
						// 		isAnimating = true;

						// 		setTimeout(() => {
						// 			switchTab(0);
						// 		}, 300);
						// 	},
						// 	onComplete: () => {
						// 		currTab = 0;
						// 		resetDeviceSection();
						// 		resetIsAnimating();
						// 	},
						// });
						// }
					} else if (direction === 1) {
						// Scroll down from section 3
						// if (currTab === 0 && document.body.clientWidth > 768) {
						// 	const muteBtn = document.querySelector(
						// 		".PhoneSection__muteBtn"
						// 	) as HTMLElement;
						// 	muteBtn.style.visibility = "hidden";

						// 	gsap.to(".DeviceSection__main", {
						// 		yPercent: -50,
						// 		ease: "power4.inOut",
						// 		duration: 1,
						// 		onStart: () => {
						// 			isAnimating = true;

						// 			setTimeout(() => {
						// 				switchTab(1);
						// 			}, 300);
						// 		},
						// 		onComplete: () => {
						// 			currTab = 1;
						// 			laptopEnterFunc();
						// 			resetIsAnimating();
						// 		},
						// 	});

						// 	gsap.to(".PhoneDotLoader__dot, .PhoneSection__convoWrap", {
						// 		opacity: 0,
						// 		duration: 0.001,
						// 	});
						// }
						// else {
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
						// }
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

								resetDotsTl();
								playConvo();
							},
						});
					} else {
						// Cannot scroll down from section
						//scroll to bottom
					}
					break;
			}
		},
	});
};

// Skip button event listener
if (skipBtn) {
	skipBtn.addEventListener("click", () => {
		gsap.to(
			{},
			{
				scrollTo: {
					y: 500,
					autoKill: false,
				},
			}
		);
		resetPlainSection(() => {
			gsap.to(mainWrap, {
				yPercent: -(2 / 4) * 100,
				ease: "power4.inOut",
				duration: 1,
				onStart: () => {
					isAnimating = true;
				},
				onComplete: () => {
					// resetPlainSection();

					resetIsAnimating();
					switchTab(0);

					currSection = 3;

					resetDotsTl();
					playConvo();
				},
			});
		});
	});
}

// Video end event listener
if (video && screen) {
	video.addEventListener("ended", () => {
		screen.style.opacity = "1";
		const FakeDashboard__popup = document.querySelector(
			".FakeDashboard__popup"
		) as HTMLElement;

		setTimeout(() => {
			FakeDashboard__popup.style.visibility = "visible";
		}, 1000);
	});
}

// Visibility and blur event listeners
document.addEventListener("visibilitychange", () => {
	const audioEls = document.querySelectorAll(
		".PhoneSection__audio"
	) as NodeListOf<HTMLAudioElement>;

	if (document.hidden) {
		screen.style.opacity = "0";

		// Pause any currently playing audio elements
		audioEls.forEach((audioEl, ind) => {
			if (!audioEl.paused) {
				audioEl.pause();

				sessionStorage.setItem("audioPaused", `${ind ?? -1}`);
			}
		});
	} else {
		if (currSection === 3 && currTab === 1) {
			laptopEnterFunc();
		}

		// Resume any paused audio elements
		if (sessionStorage.getItem("audioPaused") !== "-1") {
			const audioPaused = sessionStorage.getItem("audioPaused");
			if (audioPaused) {
				audioEls[Number(audioPaused)].play();
				sessionStorage.removeItem("audioPaused");
			}
		}
	}
});

document.addEventListener("blur", () => {
	screen.style.opacity = "0";
});

// Initialize ScrollTrigger on full load
window.addEventListener("load", () => {
	console.log("loaded");
	setTimeout(() => {
		setupScrollTrigger();
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

				console.log("case 1");
				// self.scroll(100);
				gsap.to(
					{},
					{
						scrollTo: {
							y: 150,
							autoKill: false,
						},
					}
				);
			},
		});
	}, 3000);

	setTimeout(() => {}, 1000);
});

window.onbeforeunload = function () {
	window.scrollTo(0, 0);
};
