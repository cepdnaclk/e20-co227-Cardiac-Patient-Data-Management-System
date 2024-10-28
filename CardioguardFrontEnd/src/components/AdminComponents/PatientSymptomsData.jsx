import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import axiosClient from "../../../axios-client"; // Updated path for axiosClient
import { FaStethoscope } from "react-icons/fa"; // Use the stethoscope icon

const PatientSymptomDataById = ({ patientId }) => {
  const [symptoms, setSymptoms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSymptomsData = async () => {
    try {
      setLoading(true);
      setError(null);
      setSymptoms([]);

      // Fetch symptoms data
      const symptomsResponse = await axiosClient.get(
        `/doctors/patients/${patientId}/symptoms`
      );

      if (symptomsResponse.data) {
        setSymptoms(symptomsResponse.data);
      } else {
        setError("No symptoms data found.");
      }
    } catch (err) {
      setError(
        "Failed to fetch symptoms data. Please check the Patient ID and try again."
      );
      console.error("Error fetching symptoms data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Automatically fetch data on component load
    fetchSymptomsData();
  }, [patientId]); // Add patientId as a dependency to refetch data when patientId changes

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-5xl">
      <h1 className="text-2xl font-bold text-center mb-6">
        Patient Symptoms Info
      </h1>

      {/* Error message */}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      {/* Display symptoms data */}
      {symptoms.length > 0 && (
        <div className="bg-gray-50 rounded-md p-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                label: "Bilateral Lower Limb Swelling",
                value: symptoms[0].bilateralLowerLimbSwelling ? "Yes" : "No",
                color: symptoms[0].bilateralLowerLimbSwelling
                  ? "text-green-500"
                  : "text-red-500",
              },
              {
                label: "Dyspnoea",
                value: symptoms[0].dyspnoea ? "Yes" : "No",
                color: symptoms[0].dyspnoea ? "text-green-500" : "text-red-500",
              },
              {
                label: "Orthopnoea",
                value: symptoms[0].orthopnoea ? "Yes" : "No",
                color: symptoms[0].orthopnoea
                  ? "text-green-500"
                  : "text-red-500",
              },
              {
                label: "Paroxysmal Nocturnal Dyspnoea",
                value: symptoms[0].paroxysmalNocturnalDyspnoea ? "Yes" : "No",
                color: symptoms[0].paroxysmalNocturnalDyspnoea
                  ? "text-green-500"
                  : "text-red-500",
              },
              {
                label: "Fatigue",
                value: symptoms[0].fatigue ? "Yes" : "No",
                color: symptoms[0].fatigue ? "text-green-500" : "text-red-500",
              },
              {
                label: "Doctor Recommendation",
                value: symptoms[0].doctorRecommendation || "N/A",
                color: "text-gray-700", // Neutral color for text recommendation
              },
              {
                label: "Symptom Date",
                value: new Date(symptoms[0].symptomDate).toLocaleDateString(),
                color: "text-gray-700", // Neutral color for date
              },
            ].map((symptom, index) => (
              <div
                key={index}
                className="flex items-center bg-blue-100 p-4 rounded-lg h-28" // Ensuring equal height for all boxes
              >
                <FaStethoscope className="text-blue-500 mr-4" size={40} />{" "}
                {/* Fixed icon size */}
                <div>
                  <p className="text-sm font-medium">{symptom.label}</p>
                  <p className={`text-lg ${symptom.color}`}>
                    {symptom.value}
                  </p>{" "}
                  {/* Color based on value */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No data message */}
      {!symptoms.length && !loading && !error && (
        <p className="text-gray-600 text-center">No symptoms data available.</p>
      )}
    </div>
  );
};

// Add PropTypes validation for patientId
PatientSymptomDataById.propTypes = {
  patientId: PropTypes.number.isRequired, // Validate that patientId is a required number
};

export default PatientSymptomDataById;
