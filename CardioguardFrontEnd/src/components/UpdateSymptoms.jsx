import { useState, useEffect } from "react";
import axiosClient from "../../axios-client";

const UpdateSymptoms = () => {
  const [patientId, setPatientId] = useState("");
  const [symptomCode, setSymptomCode] = useState("");
  const [symptomData, setSymptomData] = useState({
    bilateralLowerLimbSwelling: false,
    dyspnoea: false,
    orthopnoea: false,
    paroxysmalNocturnalDyspnoea: false,
    fatigue: false,
    doctorRecommendation: "",
    symptomDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSymptomData = async (code) => {
    if (!patientId || !code) return;
    try {
      setLoading(true);
      setError(null);

      // Fetch symptoms data
      const response = await axiosClient.get(
        `/api/doctors/patients/${patientId}/symptoms/${code}`
      );
      if (response.data) {
        setSymptomData(response.data);
      }
    } catch (err) {
      setError(
        "Failed to fetch symptoms data. Please check the data and try again."
      );
      console.error("Error fetching symptoms data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (symptomCode) {
      fetchSymptomData(symptomCode);
    }
  }, [symptomCode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSymptomData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (!patientId || !symptomCode) {
      setError("Please enter both Patient ID and Symptom Code");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Update symptoms data
      const response = await axiosClient.put(
        `/api/doctors/patients/${patientId}/symptoms/${symptomCode}`,
        symptomData
      );
      if (response.data) {
        alert("Symptoms updated successfully.");
      }
    } catch (err) {
      setError(
        "Failed to update symptoms. Please check the data and try again."
      );
      console.error("Error updating symptoms:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto mt-8">
      <input
        type="text"
        placeholder="Enter Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        className="w-full px-4 py-2 mb-4 border rounded-md"
      />
      <input
        type="text"
        placeholder="Enter Symptom Code"
        value={symptomCode}
        onChange={(e) => setSymptomCode(e.target.value)}
        className="w-full px-4 py-2 mb-4 border rounded-md"
      />

      <textarea
        placeholder="Doctor Recommendation"
        name="doctorRecommendation"
        value={symptomData.doctorRecommendation}
        onChange={handleChange}
        className="w-full px-4 py-2 mb-4 border rounded-md"
      />

      <input
        type="date"
        name="symptomDate"
        value={symptomData.symptomDate}
        onChange={handleChange}
        className="w-full px-4 py-2 mb-4 border rounded-md"
      />

      {/* Checkbox inputs */}
      {[
        "bilateralLowerLimbSwelling",
        "dyspnoea",
        "orthopnoea",
        "paroxysmalNocturnalDyspnoea",
        "fatigue",
      ].map((symptom) => (
        <label key={symptom} className="flex items-center mb-2">
          <input
            type="checkbox"
            name={symptom}
            checked={symptomData[symptom]}
            onChange={handleChange}
            className="mr-2"
          />
          {symptom.replace(/([A-Z])/g, " $1").toLowerCase()}
        </label>
      ))}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all"
        disabled={loading}
      >
        {loading ? (
          <div className="flex justify-center">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 0116 0A8 8 0 014 12z"
              ></path>
            </svg>
          </div>
        ) : (
          "Update Symptoms"
        )}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default UpdateSymptoms;
