import { useEffect, useRef, useState } from "react";
import { Pie } from "react-chartjs-2";
import axiosClient from "../../../axios-client"; // Adjust the import path as needed

const GenderDistributionChart = () => {
  const chartRef = useRef(null); // Create a ref to hold the chart instance
  const [chartData, setChartData] = useState(null); // State to hold the chart data

  useEffect(() => {
    // Fetch patient data from the API
    const fetchPatients = async () => {
      try {
        const response = await axiosClient.get("/admin/patients/bulk");
        const patients = response.data;

        // Calculate the number of male and female patients
        let maleCount = 0;
        let femaleCount = 0;

        patients.forEach((patient) => {
          if (patient.gender.toLowerCase() === "male") {
            maleCount++;
          } else if (patient.gender.toLowerCase() === "female") {
            femaleCount++;
          }
        });

        // Set the chart data
        setChartData({
          labels: ["Male", "Female"],
          datasets: [
            {
              label: "Gender Distribution",
              backgroundColor: ["#42A5F5", "#FF6384"],
              data: [maleCount, femaleCount],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatients();

    // Cleanup the chart instance when the component unmounts
    return () => {
      if (chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }
    };
  }, []);

  return chartData ? (
    <Pie ref={chartRef} data={chartData} />
  ) : (
    <p>Loading...</p>
  );
};

export default GenderDistributionChart;
