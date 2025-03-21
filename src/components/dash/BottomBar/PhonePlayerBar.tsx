import { FaPause, FaPlay } from "react-icons/fa6";
import "../../../styles/PhonePlayerBar.scss";
import { int } from "three/tsl";
import type { Dispatch, SetStateAction } from "react";

interface PhonePlayerBarProps {
	isPlaying: boolean;
	setIsPlaying: Dispatch<SetStateAction<boolean>>;
}

const PhonePlayerBar = ({ isPlaying, setIsPlaying }: PhonePlayerBarProps) => {
	const handlePause = () => {
		setIsPlaying(false);
	};
	const handlePlay = () => {
		setIsPlaying(true);
	};

	return (
		<div className="PhonePlayerBar">
			<div className="PhonePlayerBar__playPause">
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

			<div className="PhonePlayerBar__bars">
				{Array(25)
					.fill(0)
					.map((_, index) => (
						<div
							key={index}
							className={`PhonePlayerBar__bar PhonePlayerBar__bar--${
								isPlaying ? "isPlaying" : "isPaused"
							}`}
							style={{
								// random height between 10 and 30%
								height: `${Math.floor(Math.random() * 20) + 10}%`,
								// height increase and shrink animation
							}}
						></div>
					))}
			</div>
		</div>
	);
};

export default PhonePlayerBar;
