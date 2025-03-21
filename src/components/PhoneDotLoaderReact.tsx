import { useEffect } from "react";
import "../styles/PhoneDotLoaderReact.scss";
import gsap from "gsap";

const PhoneDotLoaderReact = ({ id }: { id: number }) => {
	// useEffect(() => {}, []);

	return (
		<div>
			<div className="PhoneDotLoader">
				{Array.from({ length: 3 }).map((_, ind) => (
					<div
						className={`PhoneDotLoader__dot PhoneDotLoader__dot--${id}`}
						//  style={{ "--i": ind }}
					/>
				))}

				<div className="PhoneDotLoader__spinnerWrap">
					<svg
						width="50"
						height="50"
						viewBox="0 0 100 100"
						xmlns="http://www.w3.org/2000/svg"
						className="PhoneDotLoader__spinner"
					>
						<circle
							cx="50"
							cy="50"
							r="40"
							stroke="#ff0000"
							fill="none"
							stroke-width="1.2rem"
							stroke-dasharray="282.6"
							stroke-dashoffset="282.6"
							stroke-linecap="round"
							className="circle"
						></circle>
					</svg>
					<svg
						stroke="#ff0000"
						fill="none"
						viewBox="0 0 24 24"
						height="200px"
						width="200px"
						xmlns="http://www.w3.org/2000/svg"
						className="PhoneDotLoader__checkmark"
					>
						<path
							d="M5 12l5 5l10 -10"
							stroke-width="4"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-dasharray="100"
							className="checkmarkPath"
						></path>
					</svg>
				</div>
			</div>
		</div>
	);
};

export default PhoneDotLoaderReact;
