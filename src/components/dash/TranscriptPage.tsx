const TranscriptPage = () => {
	const transcriptLog = [
		{
			speaker: "AI",
			text: "Hello, you’ve reached the GP Centre. Could you confirm your full name, please?",
			img: "/images/memoji.png",
		},
		{
			speaker: "(669) 389-0000",
			text: "Sarah Johnson",
			img: "/images/memoji.png",
		},
		{
			speaker: "AI",
			text: "And your date of birth, please?",
			img: "/images/memoji.png",
		},
		{
			speaker: "(669) 389-0000",
			text: "15th of March, 1985",
			img: "/images/memoji.png",
		},
	];

	return (
		<div className="TranscriptPage">
			<div className="TranscriptPage__items">
				<div className="TranscriptPage__items__top">
					<h3>Transcript</h3>
					<button className="TranscriptPage__items__top__back">
						<svg
							stroke="currentColor"
							fill="currentColor"
							stroke-width="0"
							viewBox="0 0 24 24"
							height="1em"
							width="1em"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path fill="none" d="M0 0h24v24H0z"></path>
							<path d="M11.67 3.87 9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"></path>
						</svg>
						<span>Back</span>
					</button>
				</div>

				<div className="TranscriptPage__player">
					<svg
						stroke="currentColor"
						fill="currentColor"
						stroke-width="0"
						viewBox="0 0 20 20"
						aria-hidden="true"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
							clip-rule="evenodd"
						></path>
					</svg>
					<div className="TranscriptPage__player__progress">
						<div className="TranscriptPage__player__thumb"></div>
					</div>
					<p>0:31 / 6:40</p>
				</div>
				{transcriptLog.map((log, index) => (
					<div className="TranscriptPage__item">
						<img src="/images/memoji.png" />
						<div className="TranscriptPage__item__main">
							<p className="speaker">{log.speaker}</p>
							<p>{log.text}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default TranscriptPage;
