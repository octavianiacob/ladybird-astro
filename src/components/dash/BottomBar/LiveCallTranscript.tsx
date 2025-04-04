import { useEffect, useState } from "react";
import "../../../styles/LiveCallTranscript.scss";
import AudioPlayer from "./AudioPlayer";
import gsap, { Power1, Power2, Power3, Power4 } from "gsap";
import { splitConvoTextIntoWords } from "../../../utils/helpers";
import PhoneDotLoaderReact from "../../PhoneDotLoaderReact";
import { pauseDotAnimationsSeamlessly } from "../../../scripts/phone-loader-animation";


interface CallTranscriptProps {
	transcript: {
		speaker: string;
		text: string;
		time: string;
		color?: string;
		type?: string;
	}[];
	actions: {
		action: string;
		time: string;
		color: string;
	}[];
	isPlaying: boolean;
	trafficColor: string;
	timeline: gsap.core.Timeline;
	setTimeline: React.Dispatch<React.SetStateAction<gsap.core.Timeline>>;
	currIndex: number;
	setCurrIndex: React.Dispatch<React.SetStateAction<number>>;
	setIsIncomingCall: React.Dispatch<React.SetStateAction<boolean>>;
	closeModal: () => void;
}

const LiveCallTranscript = ({
	transcript,
	actions,
	isPlaying,
	trafficColor,
	timeline,
	setTimeline,
	currIndex,
	setCurrIndex,
	setIsIncomingCall,
	closeModal,
}: CallTranscriptProps) => {
	const [currTime, setCurrTime] = useState(0);
	const [ourInterval, setOurInterval] = useState(0);
	const [currSpeaking, setCurrSpeaking] = useState("green");

	const endTime = 20;

	useEffect(() => {
		if (isPlaying) {
			setOurInterval(
				setInterval(() => {
					setCurrTime((prev) => Math.min(prev + 1, endTime));
				}, 1000)
			);
		}
	}, [isPlaying]);

	const playConvo = () => {
		console.log("playConvo", playConvo);

		const textElements = document.querySelectorAll(
			".LiveCallTranscript__CallTranscript__item__text"
		);
		splitConvoTextIntoWords(textElements);

		const convoPart = document.querySelector(
			".LiveCallTranscript__CallTranscript__convo__items__inner"
		) as HTMLElement;

		const convoItems = document.querySelectorAll(
			".LiveCallTranscript__CallTranscript__item"
		);

		timeline
			.to(".LiveCallTranscript__CallTranscript__convo__items", {
				opacity: 1,
				duration: 0.01,
				height: "100%",
				// height: "10rem",
			})
			.to(
				".LiveCallTranscript__CallTranscript__convo__items__inner",
				{
					opacity: 1,
					duration: 0.01,
					height: "auto",
				},
				"<"
			);

		convoItems.forEach((response, index) => {
			const splitElContainer = response.querySelector(
				".LiveCallTranscript__CallTranscript__item__text"
			);
			let isAI = splitElContainer?.className.includes("--AI");
			let isAction = splitElContainer?.className.includes("--action");
			let isAfterAction =
				splitElContainer?.className.includes("--after-action");

			const splitElements = document
				.querySelectorAll(".LiveCallTranscript__CallTranscript__item__text")
				[index].querySelectorAll(".word");
			const reversedSplitElements = [...splitElements].reverse();

			const par = splitElContainer?.getAttribute("tscr-col");

			const col =
				par === "red"
					? "#ff0000"
					: par === "amber"
					? "#ff8c00"
					: par === "green"
					? "#04db00"
					: "#000";

			timeline
				.to(
					response,
					{
						opacity: 1,
						height: "auto",
						duration: 0.1,

						onComplete: () => {
							console.log("onComplete");

							if (isAction) {
								setCurrIndex((val) => val + 1);
								const tl = gsap.timeline({});

								tl.to(".PhonePlayerBar__buttons", {
									width: "auto",
								}).to(
									".PhonePlayerBar",
									{
										// opacity: 0.3,
										width: 0,

										onComplete: () => {
											gsap.to(splitElements, {
												color: "#ff8c00",

												onComplete: () => {
													localStorage.setItem("convoInd", index.toString());
												},
											});
										},
									},
									"<"
								);
							}
							if (isAfterAction) {
								timeline.pause();
							}
						},
					},
					"<"
				)
				.to(
					splitElContainer,
					{
						opacity: 1,
						height: "auto",
						paddingTop: "clamp(0px, 0.2222vw, 0.2rem)",
						paddingBottom: "clamp(0px, 0.2222vw, 0.2rem)",
						duration: 0.1,
						onComplete: () => {},
					},
					"<"
				)

				.fromTo(
					// show the first 5 words
					// splitElements,
					isAction ? {} : splitElements,
					{
						// opacity: 0,
						color: "#8080808C",
					},
					{
						// opacity: 1,
						width: "auto",
						color: "#000",
						duration: 0.8,
						stagger: 0.6,
					},
					"<+=0.3"
				)
				.to(
					// hide the first 5 words
					document.querySelectorAll(
						".LiveCallTranscript__CallTranscript__item__inner"
					)[index],
					{
						marginBottom: "clamp(0px, 1.1111vw, 1rem)",
						duration: 0.5,
						// duration: 0.001,
						delay: 0.5,

						onComplete: () => {
							if (index === transcript.length - 1) {
								setIsIncomingCall(false);
								closeModal();
							}
						},
					}
					// "<+=1.8"
				);
		});
	};

	useEffect(() => {
		playConvo();
	}, []);

	useEffect(() => {
		const elements = document.querySelectorAll(".PhonePlayerBar__bar");
		let index = 0;

		const interval = setInterval(() => {
			if (index < elements.length) {
				gsap.to(elements[index], {
					backgroundColor: "#8080808C",
					// backgroundColor: currSpeaking,
					duration: 1,
				});
				index++;
			} else {
				clearInterval(interval); // Stop when all items are logged
			}
		}, (timeline.duration() / 25) * 1000);
	}, []);

	console.log("trafficColor", trafficColor);

	return (
		<>
			<div className="LiveCallTranscript">
				<div className="LiveCallTranscript__CallTranscript">
					<div className="LiveCallTranscript__CallTranscript__convo">
						<h3>Transcript</h3>
						<div className="LiveCallTranscript__CallTranscript__convo__items">
							<div className="LiveCallTranscript__CallTranscript__convo__items__inner">
								{transcript.map((log, index) => (
									<div
										className="LiveCallTranscript__CallTranscript__item"
										key={index}
									>
										<div className="LiveCallTranscript__CallTranscript__item__inner">
											<p
												className={`timelineTime timelineTime--${
													log.speaker === "action" ? log.color : ""
												}`}
												onClick={() => {
													timeline.pause();
												}}
											>
												{log.time}
											</p>
											<div
												className={`timelineLine timelineLine--${
													log.speaker === "action" ? "action" : ""
												}`}
											></div>
											{/* {log.speaker === "action" ? (
											<div
												className={`timelineCircle timelineCircle--${log.color} `}
											></div>
										) : (
											<></>
										)} */}
											<p
												className={`LiveCallTranscript__CallTranscript__item__text LiveCallTranscript__CallTranscript__item__text--${
													log.speaker
												} LiveCallTranscript__CallTranscript__item__text--${
													log?.type === "after-action" ? "after-action" : ""
												}`}
												tscr-col={log.color}
											>
												{/* {log.speaker === "action" ? "" : `${log.speaker}: `} */}
												{log.text}
											</p>

											{log.speaker === "action" ? (
												<div className="loadWrapper">
													{/* <PhoneDotLoaderReact id={index} /> */}
												</div>
											) : (
												<></>
											)}
										</div>
									</div>
								))}
								{/* <div className="timelineLine"></div> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LiveCallTranscript;
