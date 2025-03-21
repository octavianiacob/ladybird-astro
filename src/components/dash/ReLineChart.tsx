import {
	BarChart,
	Bar,
	ResponsiveContainer,
	Tooltip,
	Rectangle,
	XAxis,
	YAxis,
	LineChart,
	Line,
} from "recharts";
import "../../styles/ReBarChart.scss";

const ReLineChart = () => {
	const data = [
		{
			name: "Jan",
			uv: 60,
			pv: 240,
			amt: 2400,
		},
		{
			name: "Feb",
			uv: 60,
			pv: 139,
			amt: 2210,
		},
		{
			name: "Mar",
			uv: 100,
			pv: 980,
			amt: 2290,
		},
		{
			name: "Apr",
			uv: 50,
			pv: 390,
			amt: 2000,
		},
		{
			name: "May",
			uv: 80,
			pv: 480,
			amt: 2181,
		},
	];

	return (
		<div className="ReBarChart">
			<ResponsiveContainer width="100%">
				<LineChart
					// width={300} height={100}
					data={data}
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

					<Line
						type="monotone"
						dataKey="pv"
						stroke="#ff0000"
						strokeWidth={Math.min(0.001389 * window.innerWidth, 2)}
						// strokeWidth={2}
						dot={{
							fill: "transparent",
							stroke: "transparent",
							strokeWidth: 0.1389 * window.innerWidth,
						}}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};
export default ReLineChart;
