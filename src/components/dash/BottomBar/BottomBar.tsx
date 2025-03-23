import { FaHeadset } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import "../../../styles/BottomBar.scss";
import { useEffect, useState } from "react";
import CallList from "./CallList";
import {
	actionCallTranscript,
	actionCallTranscript2,
	actionTrafficLights,
	actionTrafficLights2,
	callerList,
	queryCallTranscript,
	queryTrafficLights,
} from "../../../utils/constants";
import CallTranscript from "./CallTranscript";
import LiveCallTranscript from "./LiveCallTranscript";
import PhonePlayerBar from "./PhonePlayerBar";
import gsap from "gsap";
import {
	BiMicrophone,
	BiSolidMicrophone,
	BiSolidMicrophoneAlt,
} from "react-icons/bi";
import { RiMic2Line } from "react-icons/ri";
import { Power4 } from "gsap";

const BottomBar = () => {
	const [openModal, setOpenModal] = useState(false);
	const [activeModal, setActiveModal] = useState("call_list");
	const [callList, setCallList] = useState([...callerList]);
	const [isIncomingCall, setIsIncomingCall] = useState(false);
	const [isPlaying, setIsPlaying] = useState(true);
	const [trafficColor, setTrafficColor] = useState("");
	const [timeline, setTimeline] = useState<gsap.core.Timeline>(
		gsap.timeline({
			defaults: { ease: Power4.easeOut },
		})
	);

	const chooseModal = () => {
		switch (activeModal) {
			case "call_list":
				return (
					<CallList callerList={callList} setActiveModal={setActiveModal} />
				);
				break;

			case "recorded_query_log":
				return (
					<CallTranscript
						transcript={queryCallTranscript}
						actions={queryTrafficLights}
					/>
				);
				break;

			case "recorded_action_log":
				return (
					<CallTranscript
						transcript={actionCallTranscript}
						actions={actionTrafficLights}
					/>
				);
				break;

			case "live_call":
				return (
					<LiveCallTranscript
						transcript={actionCallTranscript2}
						actions={actionTrafficLights2}
						isPlaying={isPlaying}
						trafficColor={trafficColor}
						timeline={timeline}
						setTimeline={setTimeline}
					/>
				);
				break;

			default:
				return <></>;
				break;
		}
	};

	let timeout;

	useEffect(() => {
		// every 10 seconds, set the incoming call state to true for 5 seconds

		const interval = setInterval(() => {
			setIsIncomingCall(true);
			setTimeout(() => {
				setIsIncomingCall(false);
			}, 5000);
		}, 10000);
		return () => clearInterval(interval);
	}, []);

	const resumeConvo = (color: string, timeline: gsap.core.Timeline) => {
		setTrafficColor(color);
		const convoInd = Number(localStorage.getItem("convoInd")) ?? 0;

		const splitElements = document
			.querySelectorAll(".LiveCallTranscript__CallTranscript__item__text")
			[convoInd].querySelectorAll(".word");
		const lineElement = document.querySelectorAll(".timelineLine")[convoInd];

		console.log("splitElements", convoInd, splitElements);

		const tl = gsap.timeline({
			onComplete: () => {
				timeline.resume();
			},
		});

		tl.to(".PhonePlayerBar__buttons", {
			width: 0,
		})
			.to(
				".PhonePlayerBar",
				{
					width: "auto",
					// height: "auto",
				},
				"<"
			)
			.fromTo(
				// show the first 5 words
				splitElements,
				{
					// opacity: 0,
					color: "#8080808C",
				},
				{
					// opacity: 1,
					width: "auto",
					color: color,
					duration: 0.8,
					stagger: 0.6,
				},
				"<+=0.3"
			)
			.to(
				lineElement,
				{
					backgroundColor: color,
					duration: 0.8,
				},
				"<"
			);
	};

	return (
		<div className="BottomBar">
			<div className="BottomBar__bar">
				<div
					className={`BottomBar__bar__modal BottomBar__bar__modal--${
						openModal ? "open" : ""
					}`}
				>
					{chooseModal()}
				</div>

				<div className="BottomBar__bar__flexWrapOverflow">
					<div className="BottomBar__bar__flexWrapOverflow__inner">
						<div className="BottomBar__bar__flexWrap">
							<div className="BottomBar__bar__icon">
								<svg
									stroke="currentColor"
									fill="none"
									stroke-width="2"
									viewBox="0 0 24 24"
									stroke-linecap="round"
									stroke-linejoin="round"
									height="1em"
									width="1em"
									xmlns="http://www.w3.org/2000/svg"
								>
									<line x1="4" x2="20" y1="12" y2="12"></line>
									<line x1="4" x2="20" y1="6" y2="6"></line>
									<line x1="4" x2="20" y1="18" y2="18"></line>
								</svg>
							</div>
							<div
								className="BottomBar__bar__icon"
								onClick={() => {
									setOpenModal((val) => !val);
									setActiveModal("call_list");
								}}
							>
								<RiMic2Line />
								{/* <span className="BottomBar__bar__icon__count">
									{callList.length}
								</span> */}
							</div>
							<PhonePlayerBar
								isPlaying={isPlaying}
								setIsPlaying={setIsPlaying}
							/>
							<div className="PhonePlayerBar__buttons">
								<button
									className="auto"
									onClick={() => {
										resumeConvo("#04db00", timeline);
									}}
								>
									Auto
								</button>
								<button
									className="assist"
									onClick={() => {
										resumeConvo("#ff0000", timeline);
									}}
								>
									Assist
								</button>
							</div>

							{
								<div
									className={`BottomBar__bar__incomingCall BottomBar__bar__incomingCall--${
										isIncomingCall ? "show" : ""
									}`}
								>
									<div
										className="BottomBar__bar__icon accept"
										onClick={() => {
											setOpenModal(true);
											setActiveModal("live_call");

											const tl = gsap.timeline({
												// onComplete: () => {
												// 	setIsIncomingCall(false);
												// 	clearTimeout(timeout);
												// },
											});

											tl.to(".BottomBar__bar__incomingCall", {
												width: 0,
												margin: 0,
												duration: 0.05,
												ease: "power4.inOut",
											}).to(".PhonePlayerBar", {
												width: "18vw",
												duration: 0.25,
												delay: 0.25,
												ease: "power4.inOut",
											});
										}}
									>
										<FaPhone color="#04db00" className="" />
									</div>
									<div
										className="BottomBar__bar__icon decline"
										onClick={() => {
											setIsIncomingCall(false);
										}}
									>
										<FaPhone color="#ff0000" className="" />
									</div>
								</div>
							}

							{/* <span>Active</span> */}
							<div className="BottomBar__bar__person">
								<div className="BottomBar__bar__person__img">
									<img src="https://picsum.photos/200" alt="" />
									<div className="BottomBar__bar__person__img__active"></div>
								</div>
								<div>
									<p className="name">Evano</p>
									<p className="role">Customer Service Staff</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BottomBar;
