import { useEffect, useState } from "react";
import axiosClient from "../../../../../axios-client";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./ClinicalDataChart.css"; // Import the CSS file for styles

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const ClinicalDataChart = ({ patientId }) => {
  const [bloodPressureData, setBloodPressureData] = useState({
    labels: [],
    datasets: [],
  });
  const [serumCreatinineData, setSerumCreatinineData] = useState({
    labels: [],
    datasets: [],
  });
  const [ejectionFractionData, setEjectionFractionData] = useState({
    labels: [],
    datasets: [],
  });
  const [plateletsData, setPlateletsData] = useState({
    labels: [],
    datasets: [],
  });
  const [creatininePhosphokinaseData, setCreatininePhosphokinaseData] =
    useState({ labels: [], datasets: [] });
  const [serumSodiumData, setSerumSodiumData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!patientId) {
      setLoading(false);
      return;
    }

    const fetchClinicalData = async () => {
      try {
        const response = await axiosClient.get(
          `/doctors/patients/${patientId}/clinical-data`
        );
        const data = response.data;

        const bloodPressure = data.map((record) => record.bloodPressure);
        const serumCreatinine = data.map((record) => record.serumCreatinine);
        const ejectionFraction = data.map((record) => record.ejectionFraction);
        const platelets = data.map((record) => record.platelets);
        const creatininePhosphokinase = data.map(
          (record) => record.creatininePhosphokinase
        );
        const serumSodium = data.map((record) => record.serumSodium);
        const dates = data.map((record) =>
          new Date(record.clinicalDate).toLocaleDateString()
        );

        setBloodPressureData({
          labels: dates,
          datasets: [
            {
              label: "Blood Pressure",
              data: bloodPressure,
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.2)",
              tension: 0.1,
            },
          ],
        });

        setSerumCreatinineData({
          labels: dates,
          datasets: [
            {
              label: "Serum Creatinine",
              data: serumCreatinine,
              borderColor: "rgba(255,159,64,1)",
              backgroundColor: "rgba(255,159,64,0.2)",
              tension: 0.1,
            },
          ],
        });

        setEjectionFractionData({
          labels: dates,
          datasets: [
            {
              label: "Ejection Fraction",
              data: ejectionFraction,
              borderColor: "rgba(153,102,255,1)",
              backgroundColor: "rgba(153,102,255,0.2)",
              tension: 0.1,
            },
          ],
        });

        setPlateletsData({
          labels: dates,
          datasets: [
            {
              label: "Platelets",
              data: platelets,
              borderColor: "rgba(255,205,86,1)",
              backgroundColor: "rgba(255,205,86,0.2)",
              tension: 0.1,
            },
          ],
        });

        setCreatininePhosphokinaseData({
          labels: dates,
          datasets: [
            {
              label: "Creatinine Phosphokinase",
              data: creatininePhosphokinase,
              borderColor: "rgba(255,99,132,1)",
              backgroundColor: "rgba(255,99,132,0.2)",
              tension: 0.1,
            },
          ],
        });

        setSerumSodiumData({
          labels: dates,
          datasets: [
            {
              label: "Serum Sodium",
              data: serumSodium,
              borderColor: "rgba(54,162,235,1)",
              backgroundColor: "rgba(54,162,235,0.2)",
              tension: 0.1,
            },
          ],
        });
      } catch (err) {
        setError(
          err.response
            ? err.response.data.message
            : "Error fetching clinical data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchClinicalData();
  }, [patientId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="chart-grid-container">
      <h2>Clinical Data Charts</h2>

      <div className="chart-grid">
        {/* Blood Pressure */}
        <div className="chart-item">
          <h3>Blood Pressure</h3>
          <Line data={bloodPressureData} />
        </div>

        {/* Serum Creatinine */}
        <div className="chart-item">
          <h3>Serum Creatinine</h3>
          <Line data={serumCreatinineData} />
        </div>

        {/* Ejection Fraction */}
        <div className="chart-item">
          <h3>Ejection Fraction</h3>
          <Line data={ejectionFractionData} />
        </div>

        {/* Platelets */}
        <div className="chart-item">
          <h3>Platelets</h3>
          <Line data={plateletsData} />
        </div>

        {/* Creatinine Phosphokinase */}
        <div className="chart-item">
          <h3>Creatinine Phosphokinase</h3>
          <Line data={creatininePhosphokinaseData} />
        </div>

        {/* Serum Sodium */}
        <div className="chart-item">
          <h3>Serum Sodium</h3>
          <Line data={serumSodiumData} />
        </div>
      </div>
    </div>
  );
};

export default ClinicalDataChart;

ClinicalDataChart.propTypes = {
  patientId: PropTypes.string.isRequired,
};
