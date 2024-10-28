import { useState } from "react";
import axiosClient from "../../axios-client"; // Adjust the path accordingly
import { useNavigate } from "react-router-dom";

const PatientClinicalDataSubmission = () => {
  const [formData, setFormData] = useState({
    diagnosisOfHeartDisease: false,
    presenceOfAnemia: false,
    creatininePhosphokinase: "",
    diabetes: false,
    ejectionFraction: "",
    bloodPressure: "",
    platelets: "",
    serumCreatinine: "",
    serumSodium: "",
    smoking: false,
    followUpPeriodDays: "",
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
      const patientId = 1;
      await axiosClient.post(
        `/doctors/patients/${patientId}/clinical-data`,
        formData
      );
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
          Patient Details Submission Form
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Diagnosis of Heart Disease */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="diagnosisOfHeartDisease"
              checked={formData.diagnosisOfHeartDisease}
              onChange={handleChange}
              className="cursor-pointer"
            />
            <label htmlFor="diagnosisOfHeartDisease" className="text-gray-700">
              Diagnosis of Heart Disease
            </label>
          </div>

          {/* Presence of Anemia */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="presenceOfAnemia"
              checked={formData.presenceOfAnemia}
              onChange={handleChange}
              className="cursor-pointer"
            />
            <label htmlFor="presenceOfAnemia" className="text-gray-700">
              Presence of Anemia
            </label>
          </div>

          {/* Creatinine Phosphokinase */}
          <div className="flex flex-col">
            <label htmlFor="creatininePhosphokinase" className="text-gray-700">
              Creatinine Phosphokinase:
            </label>
            <input
              type="number"
              name="creatininePhosphokinase"
              value={formData.creatininePhosphokinase}
              onChange={handleChange}
              className="p-2 border rounded-md"
            />
          </div>

          {/* Diabetes */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="diabetes"
              checked={formData.diabetes}
              onChange={handleChange}
              className="cursor-pointer"
            />
            <label htmlFor="diabetes" className="text-gray-700">
              Diabetes
            </label>
          </div>

          {/* Ejection Fraction */}
          <div className="flex flex-col">
            <label htmlFor="ejectionFraction" className="text-gray-700">
              Ejection Fraction:
            </label>
            <input
              type="number"
              name="ejectionFraction"
              value={formData.ejectionFraction}
              onChange={handleChange}
              className="p-2 border rounded-md"
            />
          </div>

          {/* Blood Pressure */}
          <div className="flex flex-col">
            <label htmlFor="bloodPressure" className="text-gray-700">
              Blood Pressure:
            </label>
            <input
              type="number"
              name="bloodPressure"
              value={formData.bloodPressure}
              onChange={handleChange}
              className="p-2 border rounded-md"
            />
          </div>

          {/* Platelets */}
          <div className="flex flex-col">
            <label htmlFor="platelets" className="text-gray-700">
              Platelets:
            </label>
            <input
              type="number"
              name="platelets"
              value={formData.platelets}
              onChange={handleChange}
              className="p-2 border rounded-md"
            />
          </div>

          {/* Serum Creatinine */}
          <div className="flex flex-col">
            <label htmlFor="serumCreatinine" className="text-gray-700">
              Serum Creatinine:
            </label>
            <input
              type="number"
              name="serumCreatinine"
              value={formData.serumCreatinine}
              onChange={handleChange}
              className="p-2 border rounded-md"
            />
          </div>

          {/* Serum Sodium */}
          <div className="flex flex-col">
            <label htmlFor="serumSodium" className="text-gray-700">
              Serum Sodium:
            </label>
            <input
              type="number"
              name="serumSodium"
              value={formData.serumSodium}
              onChange={handleChange}
              className="p-2 border rounded-md"
            />
          </div>

          {/* Smoking */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="smoking"
              checked={formData.smoking}
              onChange={handleChange}
              className="cursor-pointer"
            />
            <label htmlFor="smoking" className="text-gray-700">
              Smoking
            </label>
          </div>

          {/* Follow-Up Period (Days) */}
          <div className="flex flex-col">
            <label htmlFor="followUpPeriodDays" className="text-gray-700">
              Follow-Up Period (Days):
            </label>
            <input
              type="number"
              name="followUpPeriodDays"
              value={formData.followUpPeriodDays}
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

export default PatientClinicalDataSubmission;
