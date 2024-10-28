import { useState } from "react";
import PropTypes from "prop-types";
import axiosClient from "../../../../../axios-client";

const PatientSymptomsSubmission = ({ patientId, onClose }) => {
  const [formData, setFormData] = useState({
    bilateralLowerLimbSwelling: false,
    dyspnoea: false,
    orthopnoea: false,
    paroxysmalNocturnalDyspnoea: false,
    fatigue: false,
    doctorRecommendation: "",
    symptomDate: "",
  });

  const handleChange = (event) => {
    const { name, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Patient symptoms details submitted:", formData);
    console.log("Patient ID:", patientId);

    try {
      const formattedData = {
        ...formData,
        symptomDate: new Date(formData.symptomDate).toISOString(),
      };

      await axiosClient.post(
        `doctors/patients/${patientId}/symptoms`,
        formattedData
      );
      console.log("Submission successful, navigating to the previous page.");
      onClose();
    } catch (error) {
      console.error("There was an error with the submission:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          Patient Symptoms Submission Form
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Bilateral Lower Limb Swelling */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="bilateralLowerLimbSwelling"
              checked={formData.bilateralLowerLimbSwelling}
              onChange={handleChange}
              className="cursor-pointer"
            />
            <label
              htmlFor="bilateralLowerLimbSwelling"
              className="text-gray-700"
            >
              Bilateral Lower Limb Swelling
            </label>
          </div>

          {/* Dyspnoea */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="dyspnoea"
              checked={formData.dyspnoea}
              onChange={handleChange}
              className="cursor-pointer"
            />
            <label htmlFor="dyspnoea" className="text-gray-700">
              Dyspnoea
            </label>
          </div>

          {/* Orthopnoea */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="orthopnoea"
              checked={formData.orthopnoea}
              onChange={handleChange}
              className="cursor-pointer"
            />
            <label htmlFor="orthopnoea" className="text-gray-700">
              Orthopnoea
            </label>
          </div>

          {/* Paroxysmal Nocturnal Dyspnoea */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="paroxysmalNocturnalDyspnoea"
              checked={formData.paroxysmalNocturnalDyspnoea}
              onChange={handleChange}
              className="cursor-pointer"
            />
            <label
              htmlFor="paroxysmalNocturnalDyspnoea"
              className="text-gray-700"
            >
              Paroxysmal Nocturnal Dyspnoea
            </label>
          </div>

          {/* Fatigue */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="fatigue"
              checked={formData.fatigue}
              onChange={handleChange}
              className="cursor-pointer"
            />
            <label htmlFor="fatigue" className="text-gray-700">
              Fatigue
            </label>
          </div>

          {/* Doctor Recommendation */}
          <div className="flex flex-col">
            <label htmlFor="doctorRecommendation" className="text-gray-700">
              Doctor Recommendation:
            </label>
            <textarea
              name="doctorRecommendation"
              value={formData.doctorRecommendation}
              onChange={handleChange}
              className="p-2 border rounded-md"
              rows="3"
            />
          </div>

          {/* Symptom Date */}
          <div className="flex flex-col">
            <label htmlFor="symptomDate" className="text-gray-700">
              Symptom Date:
            </label>
            <input
              type="date"
              name="symptomDate"
              value={formData.symptomDate}
              onChange={handleChange}
              className="p-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

PatientSymptomsSubmission.propTypes = {
  patientId: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PatientSymptomsSubmission;
