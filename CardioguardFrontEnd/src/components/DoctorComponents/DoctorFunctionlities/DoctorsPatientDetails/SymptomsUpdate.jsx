import { useState } from "react";
import PropTypes from "prop-types";
import axiosClient from "../../../../../axios-client";

const SymptomsUpdate = ({ patientId, symptomsData, onClose, fetchData }) => {
  // Initialize state for form fields, defaulting to the symptomsData or fallback to false/null
  const [formData, setFormData] = useState({
    bilateralLowerLimbSwelling:
      symptomsData?.bilateralLowerLimbSwelling || false,
    dyspnoea: symptomsData?.dyspnoea || false,
    orthopnoea: symptomsData?.orthopnoea || false,
    paroxysmalNocturnalDyspnoea:
      symptomsData?.paroxysmalNocturnalDyspnoea || false,
    fatigue: symptomsData?.fatigue || false,
    doctorRecommendation: symptomsData?.doctorRecommendation || "",
    symptomDate: symptomsData?.symptomDate || "",
  });

  // Handle input changes and update the formData state
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.put(
        `/doctors/patients/${patientId}/symptoms/${symptomsData.symptomCode}`,
        formData
      );
      fetchData();
      onClose();
    } catch (err) {
      console.error("Error updating symptoms data:", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Update Symptoms</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold mb-2">Symptom Date:</label>
            <input
              type="date"
              name="symptomDate"
              value={formData.symptomDate}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-2">
              Bilateral Lower Limb Swelling:
            </label>
            <input
              type="checkbox"
              name="bilateralLowerLimbSwelling"
              checked={formData.bilateralLowerLimbSwelling}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span>{formData.bilateralLowerLimbSwelling ? "Yes" : "No"}</span>
          </div>

          <div>
            <label className="block font-bold mb-2">Dyspnoea:</label>
            <input
              type="checkbox"
              name="dyspnoea"
              checked={formData.dyspnoea}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span>{formData.dyspnoea ? "Yes" : "No"}</span>
          </div>

          <div>
            <label className="block font-bold mb-2">Orthopnoea:</label>
            <input
              type="checkbox"
              name="orthopnoea"
              checked={formData.orthopnoea}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span>{formData.orthopnoea ? "Yes" : "No"}</span>
          </div>

          <div>
            <label className="block font-bold mb-2">
              Paroxysmal Nocturnal Dyspnoea:
            </label>
            <input
              type="checkbox"
              name="paroxysmalNocturnalDyspnoea"
              checked={formData.paroxysmalNocturnalDyspnoea}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span>{formData.paroxysmalNocturnalDyspnoea ? "Yes" : "No"}</span>
          </div>

          <div>
            <label className="block font-bold mb-2">Fatigue:</label>
            <input
              type="checkbox"
              name="fatigue"
              checked={formData.fatigue}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span>{formData.fatigue ? "Yes" : "No"}</span>
          </div>

          <div className="md:col-span-2">
            <label className="block font-bold mb-2">
              Doctor Recommendation:
            </label>
            <textarea
              name="doctorRecommendation"
              value={formData.doctorRecommendation}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
              rows="4"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// Define PropTypes for the component
SymptomsUpdate.propTypes = {
  patientId: PropTypes.string.isRequired,
  symptomsData: PropTypes.shape({
    bilateralLowerLimbSwelling: PropTypes.bool,
    dyspnoea: PropTypes.bool,
    orthopnoea: PropTypes.bool,
    paroxysmalNocturnalDyspnoea: PropTypes.bool,
    fatigue: PropTypes.bool,
    doctorRecommendation: PropTypes.string,
    symptomDate: PropTypes.string,
    symptomCode: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default SymptomsUpdate;
