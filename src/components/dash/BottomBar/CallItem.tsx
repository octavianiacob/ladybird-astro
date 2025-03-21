import type { Dispatch, SetStateAction } from "react";
import "../../../styles/BottomBar.scss";

interface CallItemProps {
	item: {
		name: string;
		type: string;
	};
	setActiveModal: Dispatch<SetStateAction<string>>;
}

const CallItem = ({ item, setActiveModal }: CallItemProps) => {
	return (
		<div
			className="CallItem"
			onClick={() => {
				setActiveModal(
					item.type === "Query" ? "recorded_query_log" : "recorded_action_log"
				);
			}}
		>
			<div className="CallItem__content">
				<p className="name">{item.name}</p>
				<p className="">Aug 16, 2024, 2:12 pm</p>
			</div>
			<div className="CallItem__right">
				<p className={`CallItem__right--${item.type}`}>{item.type}</p>
			</div>
		</div>
	);
};

export default CallItem;
