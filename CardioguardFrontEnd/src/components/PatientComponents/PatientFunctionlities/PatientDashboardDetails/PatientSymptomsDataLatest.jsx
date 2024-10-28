import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import axiosClient from "../../../../../axios-client";
import { FaStethoscope } from "react-icons/fa"; // Use the stethoscope icon

const PatientSymptomDataById = ({ patientId }) => {
  const [symptom, setSymptom] = useState(null); // Store a single symptom object now
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSymptomsData = async () => {
    try {
      setLoading(true);
      setError(null);
      setSymptom(null); // Set to null instead of an empty array

      // Fetch symptoms data
      const symptomsResponse = await axiosClient.get(
        `/doctors/patients/${patientId}/symptoms`
      );

      if (symptomsResponse.data && symptomsResponse.data.length > 0) {
        // Find the latest symptom entry by symptomCode
        const latestSymptom = symptomsResponse.data.reduce((prev, current) => {
          return prev.symptomCode > current.symptomCode ? prev : current;
        });

        setSymptom(latestSymptom);
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
        Latest Patient Symptoms Information
      </h1>

      {/* Error message */}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      {/* Display symptoms data */}
      {symptom && (
        <div className="bg-gray-50 rounded-md p-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                label: "Bilateral Lower Limb Swelling",
                value: symptom.bilateralLowerLimbSwelling ? "Yes" : "No",
                color: symptom.bilateralLowerLimbSwelling
                  ? "text-green-500"
                  : "text-red-500",
              },
              {
                label: "Dyspnoea",
                value: symptom.dyspnoea ? "Yes" : "No",
                color: symptom.dyspnoea ? "text-green-500" : "text-red-500",
              },
              {
                label: "Orthopnoea",
                value: symptom.orthopnoea ? "Yes" : "No",
                color: symptom.orthopnoea ? "text-green-500" : "text-red-500",
              },
              {
                label: "Paroxysmal Nocturnal Dyspnoea",
                value: symptom.paroxysmalNocturnalDyspnoea ? "Yes" : "No",
                color: symptom.paroxysmalNocturnalDyspnoea
                  ? "text-green-500"
                  : "text-red-500",
              },
              {
                label: "Fatigue",
                value: symptom.fatigue ? "Yes" : "No",
                color: symptom.fatigue ? "text-green-500" : "text-red-500",
              },
              {
                label: "Doctor Recommendation",
                value: symptom.doctorRecommendation || "N/A",
                color: "text-gray-700", // Neutral color for text recommendation
              },
              {
                label: "Symptom Date",
                value: new Date(symptom.symptomDate).toLocaleDateString(),
                color: "text-gray-700", // Neutral color for date
              },
            ].map((symptomItem, index) => (
              <div
                key={index}
                className="flex items-center bg-blue-100 p-4 rounded-lg h-28"
              >
                <FaStethoscope className="text-blue-500 mr-4" size={40} />
                <div>
                  <p className="text-sm font-medium">{symptomItem.label}</p>
                  <p className={`text-lg ${symptomItem.color}`}>
                    {symptomItem.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No data message */}
      {!symptom && !loading && !error && (
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
