import { useState } from "react";
import axiosClient from "../../axios-client"; // Updated path for axiosClient
import { useNavigate } from "react-router-dom";

const FetchAllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to fetch all doctors
  const fetchAllDoctors = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch data from the API
      const response = await axiosClient.get("/doctors");

      if (response.data) {
        setDoctors(response.data);
      } else {
        setError("No doctors found.");
      }
    } catch (err) {
      setError("Failed to fetch doctors. Please try again.");
      console.error("Error fetching doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle row click
  const handleRowClick = (doctorId) => {
    navigate(`/findbydoctorId?doctorId=${doctorId}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-orange-300">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-6">
          Fetch All Doctors
        </h1>

        {/* Button to fetch all doctors */}
        <button
          onClick={fetchAllDoctors}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all disabled:opacity-50 mb-4"
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mx-auto text-white"
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
          ) : (
            "Fetch All Doctors"
          )}
        </button>

        {/* Display error message if any */}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {/* Display doctors in a table if available */}
        {doctors.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Doctor ID</th>
                  <th className="px-4 py-2 border">Surname</th>
                  <th className="px-4 py-2 border">Last Name</th>
                  <th className="px-4 py-2 border">NIC</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr
                    key={doctor.doctorId}
                    onClick={() => handleRowClick(doctor.doctorId)}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <td className="px-4 py-2 border text-center">
                      {doctor.doctorId}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {doctor.surname}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {doctor.lastName}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {doctor.nic}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Show message when no doctors are available */}
        {doctors.length === 0 && !loading && !error && (
          <p className="text-gray-600 text-center">No doctors available.</p>
        )}
      </div>
    </div>
  );
};

export default FetchAllDoctors;
