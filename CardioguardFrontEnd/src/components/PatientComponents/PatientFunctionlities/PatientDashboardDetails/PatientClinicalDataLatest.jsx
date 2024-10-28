import { useState, useEffect } from "react";
import axiosClient from "../../../../../axios-client";
import {
  FaHeartbeat,
  FaDiagnoses,
  FaSyringe,
  FaSmoking,
  FaTint,
  FaChartLine,
} from "react-icons/fa"; // Import relevant icons
import PropTypes from "prop-types";

const PatientClinicalDataById = ({ patientId }) => {
  const [clinicalData, setClinicalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchClinicalData = async () => {
    try {
      setLoading(true);
      setError(null);
      setClinicalData(null);

      // Fetch clinical data
      const clinicalDataResponse = await axiosClient.get(
        `/doctors/patients/${patientId}/clinical-data`
      );

      if (clinicalDataResponse.data && clinicalDataResponse.data.length > 0) {
        // Find the latest clinical data entry by clinicalDataId
        const latestClinicalData = clinicalDataResponse.data.reduce(
          (prev, current) => {
            return prev.clinicalDataId > current.clinicalDataId
              ? prev
              : current;
          }
        );

        setClinicalData(latestClinicalData);
      } else {
        setError("No clinical data found.");
      }
    } catch (err) {
      setError(
        "Failed to fetch clinical data. Please check the Patient ID and try again."
      );
      console.error("Error fetching clinical data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Automatically fetch data on component load
    fetchClinicalData();
  }, [patientId]); // Fetch data again if patientId changes

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-5xl">
      <h1 className="text-2xl font-bold text-center mb-6">
        Latest Clinical Data
      </h1>

      {/* Error message */}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      {/* Display clinical data */}
      {clinicalData && (
        <div className="bg-gray-50 rounded-md p-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                label: "Diagnosis of Heart Disease",
                value: clinicalData.diagnosisOfHeartDisease ? "Yes" : "No",
                color: clinicalData.diagnosisOfHeartDisease
                  ? "text-green-500"
                  : "text-red-500",
                icon: <FaHeartbeat className="text-blue-500 mr-4" size={40} />,
              },
              {
                label: "Presence of Anemia",
                value: clinicalData.presenceOfAnemia ? "Yes" : "No",
                color: clinicalData.presenceOfAnemia
                  ? "text-green-500"
                  : "text-red-500",
                icon: <FaTint className="text-blue-500 mr-4" size={40} />,
              },
              {
                label: "Creatinine Phosphokinase",
                value: clinicalData.creatininePhosphokinase || "N/A",
                color: "text-gray-700",
                icon: <FaSyringe className="text-blue-500 mr-4" size={40} />,
              },
              {
                label: "Diabetes",
                value: clinicalData.diabetes ? "Yes" : "No",
                color: clinicalData.diabetes
                  ? "text-green-500"
                  : "text-red-500",
                icon: <FaDiagnoses className="text-blue-500 mr-4" size={40} />,
              },
              {
                label: "Ejection Fraction",
                value: clinicalData.ejectionFraction
                  ? `${clinicalData.ejectionFraction}%`
                  : "N/A",
                color: "text-gray-700",
                icon: <FaChartLine className="text-blue-500 mr-4" size={40} />,
              },
              {
                label: "Blood Pressure",
                value: clinicalData.bloodPressure || "N/A",
                color: "text-gray-700",
                icon: <FaHeartbeat className="text-blue-500 mr-4" size={40} />,
              },
              {
                label: "Platelets",
                value: clinicalData.platelets || "N/A",
                color: "text-gray-700",
                icon: <FaSyringe className="text-blue-500 mr-4" size={40} />,
              },
              {
                label: "Serum Creatinine",
                value: clinicalData.serumCreatinine || "N/A",
                color: "text-gray-700",
                icon: <FaTint className="text-blue-500 mr-4" size={40} />,
              },
              {
                label: "Serum Sodium",
                value: clinicalData.serumSodium || "N/A",
                color: "text-gray-700",
                icon: <FaSyringe className="text-blue-500 mr-4" size={40} />,
              },
              {
                label: "Smoking",
                value: clinicalData.smoking ? "Yes" : "No",
                color: clinicalData.smoking ? "text-green-500" : "text-red-500",
                icon: <FaSmoking className="text-blue-500 mr-4" size={40} />,
              },
              {
                label: "Follow-Up Period (Days)",
                value: clinicalData.followUpPeriodDays || "N/A",
                color: "text-gray-700",
                icon: <FaChartLine className="text-blue-500 mr-4" size={40} />,
              },
              {
                label: "Clinical Date", // Adding clinical date field
                value: new Date(clinicalData.clinicalDate).toLocaleDateString(),
                color: "text-gray-700",
                icon: <FaChartLine className="text-blue-500 mr-4" size={40} />,
              },
            ].map((data, index) => (
              <div
                key={index}
                className="flex items-center bg-blue-100 p-4 rounded-lg h-28"
              >
                {data.icon}
                <div>
                  <p className="text-sm font-medium">{data.label}</p>
                  <p className={`text-lg ${data.color}`}>{data.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No data message */}
      {!clinicalData && !loading && !error && (
        <p className="text-gray-600 text-center">No clinical data available.</p>
      )}
    </div>
  );
};

PatientClinicalDataById.propTypes = {
  patientId: PropTypes.number.isRequired, // Validate that patientId is a required number
};

export default PatientClinicalDataById;
