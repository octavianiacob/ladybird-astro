import { useEffect, useState } from "react";
import "../../styles/DashCards.scss";
import Howl from "react-howler";
import pingSound from "../../assets/ping-82822.mp3";

const DashCards = ({ callCount }: { callCount: number }) => {
	const dashCards = [
		{
			title: "Today's Calls",
			value: 71,
			percent: 24.91,
			icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M20 15.51c-1.24 0-2.45-.2-3.57-.57a.84.84 0 0 0-.31-.05c-.26 0-.51.1-.71.29l-2.2 2.2a15.149 15.149 0 0 1-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1zM5.03 5h1.5a13 13 0 0 0 .46 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79zM19 18.97c-1.32-.09-2.59-.35-3.8-.75l1.19-1.19c.85.24 1.72.39 2.6.45v1.49zM18 9h-2.59l5.02-5.02-1.41-1.41L14 7.59V5h-2v6h6z"></path></svg>`,
		},
		{
			title: "Cost Savings",
			value: "£238.23",
			percent: 79.41,
			icon: `<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M15 11v.01"></path><path d="M5.173 8.378a3 3 0 1 1 4.656 -1.377"></path><path d="M16 4v3.803a6.019 6.019 0 0 1 2.658 3.197h1.341a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-1.342c-.336 .95 -.907 1.8 -1.658 2.473v2.027a1.5 1.5 0 0 1 -3 0v-.583a6.04 6.04 0 0 1 -1 .083h-4a6.04 6.04 0 0 1 -1 -.083v.583a1.5 1.5 0 0 1 -3 0v-2l0 -.027a6 6 0 0 1 4 -10.473h2.5l4.5 -3h0z"></path></svg>`,
		},
		{
			title: "Time Savings",
			value: "11h 50m",
			percent: 28.91,
			icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M128,42a94,94,0,1,0,94,94A94.11,94.11,0,0,0,128,42Zm0,176a82,82,0,1,1,82-82A82.1,82.1,0,0,1,128,218ZM172.24,91.76a6,6,0,0,1,0,8.48l-40,40a6,6,0,1,1-8.48-8.48l40-40A6,6,0,0,1,172.24,91.76ZM98,16a6,6,0,0,1,6-6h48a6,6,0,0,1,0,12H104A6,6,0,0,1,98,16Z"></path></svg>`,
		},
	];

	return (
		<>
			<div className="DashCards">
				{dashCards.map((card, ind) => (
					<div className="DashCard" key={ind}>
						{/* <span
							className="DashCard__icon"
							dangerouslySetInnerHTML={{ __html: card.icon }}
						/> */}
						<p className="DashCard__title">{card.title}</p>
						<div className="DashCard__bottom">
							<p className="DashCard__bottom__value">
								{ind === 0 ? callCount : card.value}
							</p>
							<div className="DashCard__bottom__percent">
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<circle
										cx="11.8522"
										cy="11.8514"
										r="9.57603"
										fill="transparent"
									/>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M16.0927 7.63507C16.2315 7.64422 16.361 7.70808 16.4527 7.81263C16.5445 7.91718 16.591 8.05388 16.582 8.19268L16.1952 14.1185C16.1931 14.189 16.1768 14.2583 16.1473 14.3223C16.1179 14.3863 16.0758 14.4438 16.0237 14.4912C15.9715 14.5386 15.9103 14.575 15.8438 14.5983C15.7772 14.6216 15.7067 14.6312 15.6364 14.6266C15.566 14.622 15.4973 14.6033 15.4344 14.5716C15.3714 14.5399 15.3155 14.4958 15.27 14.442C15.2244 14.3882 15.1902 14.3258 15.1693 14.2585C15.1484 14.1911 15.1412 14.1203 15.1483 14.0502L15.4526 9.38853L7.98793 15.9385C7.88329 16.0303 7.74646 16.0768 7.60755 16.0677C7.46863 16.0586 7.33901 15.9947 7.2472 15.8901C7.15538 15.7855 7.10889 15.6486 7.11796 15.5097C7.12703 15.3708 7.19091 15.2412 7.29554 15.1494L14.7602 8.59945L10.0985 8.29519C10.0281 8.29309 9.95877 8.27681 9.89474 8.24733C9.83071 8.21786 9.77328 8.17579 9.72586 8.12364C9.67844 8.07148 9.64201 8.01031 9.61875 7.94377C9.59549 7.87723 9.58586 7.80669 9.59046 7.73635C9.59505 7.66601 9.61376 7.59732 9.64547 7.53437C9.67719 7.47142 9.72126 7.4155 9.77505 7.36996C9.82885 7.32441 9.89126 7.29016 9.95858 7.26926C10.0259 7.24836 10.0967 7.24123 10.1669 7.2483L16.0927 7.63507Z"
										fill="currentColor"
									/>
								</svg>
								<p>+ 24.91%</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default DashCards;
