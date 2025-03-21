import DatePicker, { Calendar } from "react-multi-date-picker";

const RMDPDatePicker = () => {
	return (
		<div>
			<Calendar
				range
				className="teal"
				// placeholder="departure  -  return"
				// value={[
				// 	bigFlightData.departure_date,
				// 	bigFlightData.return_date,
				// 	// ...(bigFlightData.return_date
				// 	// 	? [bigFlightData.return_date]
				// 	// 	: []),
				// ]}
				// onChange={(dateObjects: DateObject[]) => {
				// 	const dateList = getAllDatesInRange(dateObjects, true);
				// 	console.log(
				// 		new Date(dateList[0].toString()).toLocaleDateString("sv-SE"),
				// 		new Date(
				// 			dateList[dateList.length - 1].toString()
				// 		).toLocaleDateString("sv-SE")
				// 	);
				// 	console.log("dateList", dateList);

				// 	updateBigFlightData({
				// 		departure_date: new Date(dateList[0].toString()).toLocaleDateString(
				// 			"sv-SE"
				// 		),
				// 		return_date: new Date(
				// 			dateList[dateList.length - 1].toString()
				// 		).toLocaleDateString("sv-SE"),
				// 	});

				// 	if (dateList.length > 1 && !completed) setActive(5);
				// }}
				numberOfMonths={1}
				mapDays={(object: any) => {
					if (object.isToday) {
						object.style = {
							border: "1px solid #FF0000",
							borderRadius: "50%",
						};
					}
					return object;
				}}
				// animations={[opacity(), transition({ from: 35, duration: 400 })]}
			/>
		</div>
	);
};

export default RMDPDatePicker;
