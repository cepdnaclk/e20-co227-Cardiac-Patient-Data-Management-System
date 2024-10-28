import { useState } from "react";
// import { useParams } from "react-router-dom";
import axiosClient from "../../axios-client";

const DeletePatient = () => {
  // const { patient_id } = useParams(); // Get patient_id from the URL
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleDelete = async () => {
    const patient_id = 1;
    if (!patient_id) {
      setError("Patient ID is missing from the URL.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      // Send DELETE request to delete patient
      const response = await axiosClient.delete(
        `/admin/delete/patient/${patient_id}`
      );

      if (response.status === 200) {
        setSuccess("Patient deleted successfully!");
      } else {
        setError("Failed to delete patient. Please try again.");
      }
    } catch (err) {
      setError("Failed to delete patient. Please try again.");
      console.error("Error deleting patient:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-10">
      <h2 className="text-lg font-semibold mb-4 text-center">Delete Patient</h2>

      <button
        onClick={handleDelete}
        disabled={loading}
        className={`w-full bg-red-600 text-white py-2 px-4 rounded-md transition-all hover:bg-red-700 disabled:opacity-50 ${
          loading ? "flex justify-center items-center" : ""
        }`}
      >
        {loading ? (
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
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        ) : (
          "Delete Patient"
        )}
      </button>

      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      {success && <p className="text-green-600 mt-4 text-center">{success}</p>}
    </div>
  );
};

export default DeletePatient;
