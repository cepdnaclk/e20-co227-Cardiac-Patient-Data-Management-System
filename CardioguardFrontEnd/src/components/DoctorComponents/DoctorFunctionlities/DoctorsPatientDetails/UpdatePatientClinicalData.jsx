import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axiosClient from "../../../../../axios-client";

const PatientClinicalDataUpdate = ({
  patientId,
  clinicalDataId,
  onClose,
  fetchData,
}) => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch existing data to pre-fill the form
  useEffect(() => {
    const fetchClinicalData = async () => {
      try {
        const response = await axiosClient.get(
          `/doctors/patients/${patientId}/clinical-data/${clinicalDataId}`
        );
        setFormData(response.data); // Update the state with the fetched data
        setLoading(false); // Data is fetched, stop loading
      } catch (error) {
        setError("Error fetching clinical data.", error);
        setLoading(false); // Error occurred, stop loading
      }
    };

    fetchClinicalData();
  }, [patientId, clinicalDataId]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosClient.put(
        `/doctors/patients/${patientId}/clinical-data/${clinicalDataId}`,
        formData
      );
      fetchData();
      onClose();
    } catch (error) {
      setError("There was an error with the update.", error);
    }
  };

  if (loading) {
    return <p>Loading clinical data...</p>; // Loading feedback
  }

  if (error) {
    return <p className="text-red-500">{error}</p>; // Error feedback
  }

  return (
    formData && (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
          <h1 className="text-2xl font-bold text-center mb-6">
            Patient Clinical Data Update Form
          </h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {/* Diagnosis of Heart Disease */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="diagnosisOfHeartDisease"
                checked={formData.diagnosisOfHeartDisease}
                onChange={handleChange}
                className="cursor-pointer"
              />
              <label className="text-gray-700">
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
              <label className="text-gray-700">Presence of Anemia</label>
            </div>

            {/* Creatinine Phosphokinase */}
            <div className="mb-4">
              <label className="block text-gray-700">
                Creatinine Phosphokinase
              </label>
              <input
                type="number"
                name="creatininePhosphokinase"
                value={formData.creatininePhosphokinase}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
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
              <label className="text-gray-700">Diabetes</label>
            </div>

            {/* Ejection Fraction */}
            <div className="mb-4">
              <label className="block text-gray-700">
                Ejection Fraction (%)
              </label>
              <input
                type="number"
                name="ejectionFraction"
                value={formData.ejectionFraction}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Blood Pressure */}
            <div className="mb-4">
              <label className="block text-gray-700">Blood Pressure</label>
              <input
                type="number"
                name="bloodPressure"
                value={formData.bloodPressure}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Platelets */}
            <div className="mb-4">
              <label className="block text-gray-700">Platelets</label>
              <input
                type="number"
                name="platelets"
                value={formData.platelets}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Serum Creatinine */}
            <div className="mb-4">
              <label className="block text-gray-700">Serum Creatinine</label>
              <input
                type="number"
                name="serumCreatinine"
                value={formData.serumCreatinine}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Serum Sodium */}
            <div className="mb-4">
              <label className="block text-gray-700">Serum Sodium</label>
              <input
                type="number"
                name="serumSodium"
                value={formData.serumSodium}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
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
              <label className="text-gray-700">Smoking</label>
            </div>

            {/* Follow-Up Period */}
            <div className="mb-4">
              <label className="block text-gray-700">
                Follow-Up Period (Days)
              </label>
              <input
                type="number"
                name="followUpPeriodDays"
                value={formData.followUpPeriodDays}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Clinical Date */}
            <div className="mb-4 col-span-2">
              <label className="block text-gray-700">Clinical Date</label>
              <input
                type="date"
                name="clinicalDate"
                value={formData.clinicalDate}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

// Define PropTypes for the component
PatientClinicalDataUpdate.propTypes = {
  patientId: PropTypes.string.isRequired, // patientId is required and should be a string
  clinicalDataId: PropTypes.string.isRequired, // clinicalDataId is required and should be a string
  onClose: PropTypes.func.isRequired, // onClose is required and should be a function
  fetchData: PropTypes.func.isRequired,
};

export default PatientClinicalDataUpdate;
