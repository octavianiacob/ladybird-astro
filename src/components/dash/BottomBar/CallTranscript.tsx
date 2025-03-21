import "../../../styles/BottomBar.scss";

interface CallTranscriptProps {
	transcript: {
		speaker: string;
		text: string;
	}[];
	actions: {
		action: string;
		time: string;
		color: string;
	}[];
}

const CallTranscript = ({ transcript, actions }: CallTranscriptProps) => {
	return (
		<div className="CallTranscript">
			<div className="CallTranscript__convo">
				<h3>Transcript</h3>
				{transcript.map((log, index) => (
					<div className="CallTranscript__item" key={index}>
						<img src="/images/memoji.png" />
						<div className="CallTranscript__item__main">
							<p className="speaker">{log.speaker}</p>
							<p>{log.text}</p>
						</div>
					</div>
				))}
			</div>

			<div className="CallTranscript__actions">
				<h3>Actions</h3>
				{actions.map((action, index) => (
					<div className="CallTranscript__action">
						<div className="CallTranscript__action__main">
							<p className="speaker">{action.action}</p>
							<p>{action.time}</p>
						</div>
						<div
							className={`CallTranscript__action__light CallTranscript__action__light--${action.color}`}
						></div>
					</div>
				))}
			</div>
		</div>
	);
};

export default CallTranscript;
