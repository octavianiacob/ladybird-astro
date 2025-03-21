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

const BottomBar = () => {
	const [openModal, setOpenModal] = useState(false);
	const [activeModal, setActiveModal] = useState("call_list");
	const [callList, setCallList] = useState([...callerList]);
	const [isIncomingCall, setIsIncomingCall] = useState(false);
	const [isPlaying, setIsPlaying] = useState(true);

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
							{/* <div className="BottomBar__bar__searchBar">
					<svg
						width="24"
						height="25"
						viewBox="0 0 24 25"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M21.5308 21.1932L16.8368 16.5001C18.1973 14.8667 18.8757 12.7716 18.7309 10.6508C18.5861 8.52992 17.6293 6.54652 16.0593 5.11319C14.4894 3.67987 12.4274 2.90696 10.3021 2.95526C8.17687 3.00356 6.15205 3.86935 4.64888 5.37252C3.14571 6.87569 2.27993 8.9005 2.23163 11.0258C2.18333 13.151 2.95623 15.2131 4.38956 16.783C5.82289 18.3529 7.80629 19.3098 9.92715 19.4546C12.048 19.5994 14.1431 18.9209 15.7765 17.5604L20.4696 22.2545C20.5393 22.3242 20.622 22.3794 20.713 22.4171C20.8041 22.4549 20.9017 22.4743 21.0002 22.4743C21.0988 22.4743 21.1963 22.4549 21.2874 22.4171C21.3784 22.3794 21.4612 22.3242 21.5308 22.2545C21.6005 22.1848 21.6558 22.1021 21.6935 22.011C21.7312 21.92 21.7506 21.8224 21.7506 21.7238C21.7506 21.6253 21.7312 21.5277 21.6935 21.4367C21.6558 21.3456 21.6005 21.2629 21.5308 21.1932ZM3.75021 11.2238C3.75021 9.88882 4.14609 8.58378 4.88779 7.47375C5.62949 6.36372 6.6837 5.49855 7.9171 4.98766C9.1505 4.47677 10.5077 4.3431 11.8171 4.60355C13.1264 4.864 14.3292 5.50687 15.2732 6.45088C16.2172 7.39488 16.8601 8.59761 17.1205 9.90699C17.381 11.2164 17.2473 12.5736 16.7364 13.807C16.2255 15.0404 15.3603 16.0946 14.2503 16.8363C13.1403 17.578 11.8352 17.9738 10.5002 17.9738C8.71061 17.9719 6.99488 17.2601 5.72944 15.9946C4.46399 14.7292 3.7522 13.0134 3.75021 11.2238Z"
							fill="black"
							fill-opacity="0.54"
							style="fill:black;fill-opacity:0.54;"
						></path>
					</svg>
					<input type="search" name="" id="" />
				</div> */}
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

							{
								<div
									className={`BottomBar__bar__incomingCall BottomBar__bar__incomingCall--${
										isIncomingCall ? "show" : "show"
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
												duration: 0.05,
												ease: "power4.inOut",
											}).to(".PhonePlayerBar", {
												width: "30vw",
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
						<div className="PhonePlayerBar__buttons">
							<button className="auto">Auto</button>
							<button className="assist">Assist</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BottomBar;
