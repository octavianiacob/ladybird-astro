import { FaCirclePlay } from "react-icons/fa6";
import "../../../styles/AudioPlayer.scss";
import { FaPause, FaPlay } from "react-icons/fa";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { padNumber } from "../../../utils/helpers";

interface AudioPlayerProps {
	isPlaying: boolean;
	setIsPlaying: Dispatch<SetStateAction<boolean>>;
	currTime: number;
	setCurrTime: Dispatch<SetStateAction<number>>;
	endTime: number;
}

const AudioPlayer = ({
	isPlaying,
	setIsPlaying,
	currTime,
	setCurrTime,
	endTime,
}: AudioPlayerProps) => {
	const [ourInterval, setOurInterval] = useState(0);

	const handlePlay = () => {
		if (currTime === endTime) {
			const AudioPlayer__bar__track = document.querySelector(
				".AudioPlayer__bar__track"
			) as HTMLElement;
			const innerEl = document.querySelector(
				".LiveCallTranscript__CallTranscript__convo__items__inner"
			) as HTMLElement;
			AudioPlayer__bar__track.style.transition = "none";
			innerEl.style.transition = "none";

			setCurrTime(0);

			setTimeout(() => {
				AudioPlayer__bar__track.style.transition = "width 1s linear";
				innerEl.style.transition = "all 1s linear";
			}, 500);
		}

		setIsPlaying(true);
		setOurInterval(
			setInterval(() => {
				setCurrTime((prev) => Math.min(prev + 1, endTime));
			}, 1000)
		);
	};

	const handlePause = () => {
		setIsPlaying(false);
		clearInterval(ourInterval);
	};

	useEffect(() => {
		if (currTime === endTime) {
			clearInterval(ourInterval);
			setIsPlaying(false);
		}

		console.log("currTime", currTime);
	}, [currTime]);

	return (
		<div className="AudioPlayer">
			<div
				className={`AudioPlayer__controls AudioPlayer__controls--${
					isPlaying ? "playing" : ""
				}`}
			>
				{isPlaying ? (
					<FaPause
						onClick={() => {
							handlePause();
						}}
					/>
				) : (
					<FaPlay
						onClick={() => {
							handlePlay();
						}}
					/>
				)}
			</div>
			<div
				className="AudioPlayer__bar"
				onClick={(e) => {
					const AudioPlayer__bar__track = document.querySelector(
						".AudioPlayer__bar__track"
					) as HTMLElement;
					const innerEl = document.querySelector(
						".LiveCallTranscript__CallTranscript__convo__items__inner"
					) as HTMLElement;
					AudioPlayer__bar__track.style.transition = "none";
					innerEl.style.transition = "none";

					const bar = e.currentTarget;
					const rect = bar.getBoundingClientRect();
					const x = e.clientX - rect.left;
					const width = rect.width;
					const percent = x / width;
					setCurrTime(Math.floor(endTime * percent));

					setTimeout(() => {
						AudioPlayer__bar__track.style.transition = "width 1s linear";
						innerEl.style.transition = "all 1s linear";
					}, 500);
				}}
			>
				<div
					className="AudioPlayer__bar__track"
					style={{ width: `${(currTime / endTime) * 100}%` }}
				></div>
			</div>
			<p>00:{padNumber(currTime, 2)}</p>
		</div>
	);
};

export default AudioPlayer;
