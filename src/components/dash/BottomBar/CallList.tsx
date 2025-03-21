import type { Dispatch, SetStateAction } from "react";
import "../../../styles/BottomBar.scss";
import { callerList } from "../../../utils/constants";
import CallItem from "./CallItem";

const CallList = ({
	callerList,
	setActiveModal,
}: {
	callerList: { name: string; type: string }[];
	setActiveModal: Dispatch<SetStateAction<string>>;
}) => {
	return (
		<div className="CallList">
			{callerList.map((item: { name: string; type: string }, ind: number) => (
				<CallItem key={ind} item={item} setActiveModal={setActiveModal} />
			))}
		</div>
	);
};

export default CallList;
