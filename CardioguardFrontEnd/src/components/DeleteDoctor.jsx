import { useState } from "react";

import { useParams } from "react-router-dom";
import axiosClient from "../../axios-client";

const DeleteDoctor = () => {
  const { doctor_id } = useParams(); // Get doctor_id from the URL
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleDelete = async () => {
    const doctor_id = 1;
    if (!doctor_id) {
      setError("Doctor ID is missing from the URL.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      // Send DELETE request to delete doctor
      const response = await axiosClient.delete(
        `/admin/delete/doctor/${doctor_id}`
      );

      if (response.status === 200) {
        setSuccess("Doctor deleted successfully!");
      } else {
        setError(`Failed to delete doctor. Status code: ${response.status}`);
      }
    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 2xx
        setError(
          `Failed to delete doctor. Server responded with status ${
            err.response.status
          }: ${err.response.data.message || "Unknown error"}`
        );
      } else if (err.request) {
        // Request was made but no response was received
        setError(
          "No response from the server. Please check your network connection."
        );
      } else {
        // Something happened in setting up the request
        setError(`Failed to delete doctor: ${err.message}`);
      }
      console.error("Error deleting doctor:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-8 space-y-4">
      <h2 className="text-xl font-semibold">Delete Doctor</h2>

      <button
        onClick={handleDelete}
        disabled={loading}
        className={`w-full py-2 bg-red-500 text-white font-bold rounded ${
          loading ? "cursor-not-allowed opacity-50" : "hover:bg-red-600"
        }`}
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
          "Delete Doctor"
        )}
      </button>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </div>
  );
};

export default DeleteDoctor;
