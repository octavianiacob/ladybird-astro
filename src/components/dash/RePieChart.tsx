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

	return (
		<div className="ReBarChart">
			<ResponsiveContainer width="100%">
				<PieChart width={730} height={250}>
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
			</ResponsiveContainer>
		</div>
	);
};
export default RePieChart;
