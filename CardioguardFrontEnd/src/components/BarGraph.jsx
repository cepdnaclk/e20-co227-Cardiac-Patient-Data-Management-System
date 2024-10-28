import { BarPlot, LineHighlightPlot, LinePlot, ResponsiveChartContainer, ChartsXAxis, ChartsYAxis, ChartsTooltip, axisClasses } from "@mui/x-charts";
import userData from "./data_sets/Data.json"; // Dummy data file

// Define the series for doctors and patients
const series = [
  {
    type: "line",
    yAxisId: "percentage",
    color: "green",
    label: "Doctors",
    data: userData.map((entry) => entry.doctors),
    highlightScope: { highlight: "item" },
  },
  {
    type: "line",
    yAxisId: "percentage",
    color: "red",
    label: "Patients",
    data: userData.map((entry) => entry.patients),
  },
];

export default function BarGraph() {
  return (
    <div className="w-full">
      <h1 className="text-center text-5xl font-bold text-black py-20 text-orange-500">
        User Growth Over Time
      </h1>
      <div>
        <ResponsiveChartContainer
          series={series}
          height={400}
          margin={{ top: 10 }}
          xAxis={[
            {
              id: "time",
              data: userData.map((entry) => new Date(entry.date)),
              scaleType: "band",
              valueFormatter: (value) => value.toLocaleDateString(),
            },
          ]}
          yAxis={[
            {
              id: "percentage",
              scaleType: "linear",
              label: "Percentage of Users",
              valueFormatter: (value) => `${value}%`,
            },
          ]}
        >
          <LinePlot />
          <LineHighlightPlot />
          <ChartsXAxis
            label="Time"
            position="bottom"
            axisId="time"
            tickLabelStyle={{
              fontSize: 10,
            }}
          />
          <ChartsYAxis
            label="Percentage of Users"
            position="left"
            axisId="percentage"
            tickLabelStyle={{ fontSize: 10 }}
            sx={{
              [`& .${axisClasses.label}`]: {
                transform: "translateX(-5px)",
              },
            }}
          />
          <ChartsTooltip />
        </ResponsiveChartContainer>
      </div>
    </div>
  );
}
