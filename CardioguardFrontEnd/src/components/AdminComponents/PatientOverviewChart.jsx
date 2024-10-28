import { useRef, useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axiosClient from "../../../axios-client"; // Adjust the import path as needed

const PatientOverviewChart = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch patient data from the API
    const fetchPatients = async () => {
      try {
        const response = await axiosClient.get("/admin/patients/bulk");
        const patients = response.data;

        // Calculate age and classify patients
        const currentDate = new Date();
        let childCount = 0;
        let adultCount = 0;
        let elderlyCount = 0;

        patients.forEach(patient => {
          const birthDate = new Date(patient.dateOfBirth);
          let age = currentDate.getFullYear() - birthDate.getFullYear(); // Changed from const to let
          const monthDiff = currentDate.getMonth() - birthDate.getMonth();

          // Adjust age if the current month and day haven't passed the birth month and day
          if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
            age--;
          }

          // Classify the patient based on age
          if (age < 18) {
            childCount++;
          } else if (age < 65) {
            adultCount++;
          } else {
            elderlyCount++;
          }
        });

        // Set the chart data
        setChartData({
          labels: ["Child", "Adult", "Elderly"],
          datasets: [
            {
              label: "Patients by Age Group",
              backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
              data: [childCount, adultCount, elderlyCount],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatients();

    // Cleanup function to destroy chart instance when component unmounts
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return chartData ? <Pie ref={chartRef} data={chartData} /> : <p>Loading...</p>;
};

export default PatientOverviewChart;
