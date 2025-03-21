import {
	BarChart,
	Bar,
	ResponsiveContainer,
	Tooltip,
	Rectangle,
	XAxis,
	YAxis,
} from "recharts";
import "../../styles/ReBarChart.scss";

const ReBarChart = () => {
	const data = [
		{
			name: "Mon",
			uv: 60,
			pv: 2400,
			amt: 2400,
		},
		{
			name: "Tue",
			uv: 60,
			pv: 1398,
			amt: 2210,
		},
		{
			name: "Wed",
			uv: 100,
			pv: 9800,
			amt: 2290,
		},
		{
			name: "Thur",
			uv: 50,
			pv: 3908,
			amt: 2000,
		},
		{
			name: "Fri",
			uv: 80,
			pv: 4800,
			amt: 2181,
		},
	];

	return (
		<div className="ReBarChart">
			<ResponsiveContainer width="100%">
				<BarChart
					data={data}
					margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
					// width={"100%"}
				>
					<XAxis
						dataKey="name"
						tick={{ fill: "#8080808C" }}
						tickLine={{ stroke: "transparent" }}
						axisLine={{ stroke: "transparent" }}
					/>
					<YAxis
						tick={{ fill: "#8080808C" }}
						tickLine={{ stroke: "transparent" }}
						axisLine={{ stroke: "transparent" }}
					/>
					{/* <Tooltip /> */}
					{/* Make only middle bar red */}
					{/* Make sure bar is in the center of the label */}

					<Bar
						dataKey="uv"
						dx={-45}
						shape={(props: any) => {
							const { x, y, width, height, fill } = props;
							const rad = document.documentElement.clientWidth * 1.389;
							return (
								<Rectangle
									x={x + 5}
									y={y}
									// width 0.83% of viewport width
									width={document.documentElement.clientWidth * 0.0083}
									height={height}
									fill={props.index === 2 ? "red" : "#EEEEEE"}
									radius={[rad, rad, rad, rad]}
								/>
							);
						}}
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};
export default ReBarChart;
