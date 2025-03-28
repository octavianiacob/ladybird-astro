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
	PieChart,
	Pie,
} from "recharts";
import "../../styles/ReBarChart.scss";
import { useEffect } from "react";

const RePieChart = () => {
	const data = [
		{
			name: "query-based",
			uv: 60,
			pv: 240,
			amt: 2400,
			fill: "#EEEEEE",
		},
		{
			name: "action-based",
			uv: 40,
			pv: 139,
			amt: 2210,
			fill: "#ff0000",
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
						window.innerWidth / 1900
					}) translate(-3rem, 0)`;
				} else if (window.innerWidth > 1240 && window.innerWidth < 1415) {
					chart.style.transform = `scale(${
						window.innerWidth / 1800
					}) translate(-4rem, 0)`;
				} else if (window.innerWidth < 1024) {
					chart.style.transform = `scale(${
						window.innerWidth / 1800
					}) translate(-2rem, 0)`;
				} else {
					// chart.style.transform = `scale(0.3) translate(-1rem, 0)`;
					chart.style.transform = `scale(${
						window.innerWidth / 1800
					}) translate(-4rem, 0)`;
				}
			}
		};

		const pieChart = document.querySelector(
			".recharts-wrapper--piechart"
		) as HTMLElement;

		resizeChart(pieChart);

		window.addEventListener("resize", () => {
			resizeChart(pieChart);
		});
	}, []);

	return (
		<div className="ReBarChart">
			{/* <ResponsiveContainer width="100%"> */}
			<PieChart width={300} height={200} className="recharts-wrapper--piechart">
				{/* Make the pie chart sectors different colors */}
				<Pie
					data={data}
					dataKey="uv"
					nameKey="name"
					cx="50%"
					cy="50%"
					innerRadius={75}
					outerRadius={80}
					label
				/>

				<Tooltip />
			</PieChart>
			{/* </ResponsiveContainer> */}
		</div>
	);
};
export default RePieChart;
