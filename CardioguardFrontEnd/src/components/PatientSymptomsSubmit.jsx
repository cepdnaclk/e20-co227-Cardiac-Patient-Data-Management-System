import { useState } from "react";
import axiosClient from "../../axios-client"; // Adjust the import based on your project structure
import { useNavigate } from "react-router-dom";

const PatientSymptomsSubmit = () => {
  const [formData, setFormData] = useState({
    bilateralLowerLimbSwelling: false,
    dyspnoea: false,
    orthopnoea: false,
    paroxysmalNocturnalDyspnoea: false,
    fatigue: false,
    doctorRecommendation: "",
    symptomDate: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Patient details submitted:", formData);

    try {
      const patientId = 1; // Assuming the patient ID is obtained elsewhere
      await axiosClient.post(`/patients/${patientId}/symptoms`, formData);
      console.log("Submission successful, navigating to the previous page.");
      navigate(-1); // Navigate to the previous page
    } catch (error) {
      console.error("There was an error with the submission:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-orange-300">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          Patient Symptoms Submission Form
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

          <div className="flex flex-col">
            <label htmlFor="doctorRecommendation" className="text-gray-700">
              Doctor Recommendation:
            </label>
            <textarea
              name="doctorRecommendation"
              value={formData.doctorRecommendation}
              onChange={handleChange}
              className="p-2 border rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="symptomDate" className="text-gray-700">
              Symptom Date:
            </label>
            <input
              type="datetime-local"
              name="symptomDate"
              value={formData.symptomDate}
              onChange={handleChange}
              className="p-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientSymptomsSubmit;
