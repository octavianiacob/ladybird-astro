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
import { useEffect } from "react";

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

	useEffect(() => {
		const resizeChart = (chart: HTMLElement) => {
			console.log("chart", chart);
			if (chart) {
				// use transform to scale the chart

				chart.style.transformOrigin = "top left";

				if (window.innerWidth > 1024 && window.innerWidth < 1240) {
					chart.style.transform = `scale(${
						window.innerWidth / 1400
					}) translate(-1rem, 0)`;
				} else if (window.innerWidth > 1240 && window.innerWidth < 1415) {
					chart.style.transform = `scale(${
						window.innerWidth / 1400
					}) translate(-2rem, 0)`;
				} else if (window.innerWidth < 1024) {
					chart.style.transform = `scale(${
						window.innerWidth / 1200
					}) translate(-2rem, 0)`;
				} else {
					// chart.style.transform = `scale(0.3) translate(-1rem, 0)`;
				}
			}
		};

		const barChart = document.querySelector(
			".recharts-wrapper--barchart"
		) as HTMLElement;

		resizeChart(barChart);

		window.addEventListener("resize", () => {
			resizeChart(barChart);
		});
	}, []);

	return (
		<div className="ReBarChart">
			{/* <ResponsiveContainer width="100%"> */}
			<BarChart
				data={data}
				margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
				width={220}
				height={200}
				className="recharts-wrapper--barchart"
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
								width={12}
								// width={document.documentElement.clientWidth * 0.0083}
								height={height}
								fill={props.index === 2 ? "red" : "#EEEEEE"}
								radius={[rad, rad, rad, rad]}
							/>
						);
					}}
				/>
			</BarChart>
			{/* </ResponsiveContainer> */}
		</div>
	);
};
export default ReBarChart;
