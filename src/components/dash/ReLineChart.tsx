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
import { useEffect } from "react";

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

	useEffect(() => {
		const resizeChart = (chart: HTMLElement) => {
			console.log("chart", chart);
			if (chart) {
				// use transform to scale the chart

				chart.style.transformOrigin = "top left";

				if (window.innerWidth > 1024 && window.innerWidth < 1240) {
					chart.style.transform = `scale(${
						window.innerWidth / 1300
					}) translate(-1rem, 0)`;
				} else if (window.innerWidth > 1240 && window.innerWidth < 1415) {
					chart.style.transform = `scale(${
						window.innerWidth / 1600
					}) translate(-1rem, 0)`;
				} else if (window.innerWidth < 1024) {
					chart.style.transform = `scale(${
						window.innerWidth / 1200
					}) translate(-1rem, 0)`;
				} else {
					// chart.style.transform = `scale(0.3) translate(-1rem, 0)`;
				}
			}
		};

		const lineChart = document.querySelector(
			".recharts-wrapper--linechart"
		) as HTMLElement;

		resizeChart(lineChart);

		window.addEventListener("resize", () => {
			resizeChart(lineChart);
		});
	}, []);

	return (
		<div className="ReBarChart">
			{/*<ResponsiveContainer width="100%"> */}
			<LineChart
				width={300}
				height={200}
				data={data}
				className="recharts-wrapper--linechart"
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
			{/*</ResponsiveContainer>*/}
		</div>
	);
};
export default ReLineChart;
