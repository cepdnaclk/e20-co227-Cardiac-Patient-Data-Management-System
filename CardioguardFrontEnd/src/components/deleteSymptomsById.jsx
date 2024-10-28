import { useState } from "react";
import axiosClient from "../../axios-client"; // Updated path for axiosClient

const DeleteSymptoms = () => {
  const [patientId, setPatientId] = useState("");
  const [symptomCode, setSymptomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (!patientId || !symptomCode) {
      setError("Please enter both Patient ID and Symptom Code");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Delete symptoms data
      await axiosClient.delete(
        `/api/doctors/patients/${patientId}/symptoms/${symptomCode}`
      );
      alert("Symptoms deleted successfully.");
    } catch (err) {
      setError(
        "Failed to delete symptoms. Please check the data and try again."
      );
      console.error("Error deleting symptoms:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 max-w-md mx-auto mt-10">
      <input
        type="text"
        placeholder="Enter Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        className={`w-full p-2 border rounded-md ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />

      <input
        type="text"
        placeholder="Enter Symptom Code"
        value={symptomCode}
        onChange={(e) => setSymptomCode(e.target.value)}
        className={`w-full p-2 border rounded-md ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />

      {error && <p className="text-red-600 text-sm text-center">{error}</p>}

      <button
        onClick={handleDelete}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all disabled:opacity-50"
      >
        Delete Symptoms
      </button>

      {loading && (
        <div className="flex justify-center">
          <svg
            className="animate-spin h-5 w-5 text-blue-600"
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
        </div>
      )}
    </div>
  );
};

export default DeleteSymptoms;
