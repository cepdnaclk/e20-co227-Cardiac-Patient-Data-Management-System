import { useState } from "react";
import axiosClient from "../../axios-client"; // Updated path for axiosClient

const DoctorDataById = () => {
  const [doctor, setDoctor] = useState(null);
  const [doctorId, setDoctorId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch doctor data by ID
  const fetchDoctorDataById = async () => {
    if (!doctorId) {
      setError("Please enter a valid Doctor ID");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setDoctor(null);

      // Fetch data from the API
      const response = await axiosClient.get(`/doctors/${doctorId}`);

      console.log("Fetched Doctor Data:", response.data);

      if (response.data) {
        setDoctor(response.data);
      } else {
        setError("No doctor data found.");
      }
    } catch (err) {
      setError(
        "Failed to fetch doctor data. Please check the Doctor ID and try again."
      );
      console.error("Error fetching doctor data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-orange-300">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Doctor Data</h1>

        {/* Input for Doctor ID */}
        <input
          type="text"
          placeholder="Enter Doctor ID"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          className="w-full px-4 py-2 border rounded-md mb-4"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {/* Button to fetch doctor data */}
        <button
          onClick={fetchDoctorDataById}
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
            "Get Doctor Data"
          )}
        </button>

        {/* Display doctor details */}
        {doctor && (
          <div className="bg-gray-50 rounded-md p-4">
            <h2 className="text-lg font-bold mb-2">Doctor Details</h2>
            <p>
              <strong>Doctor ID:</strong> {doctor.doctorId}
            </p>
            <p>
              <strong>Surname:</strong> {doctor.surname}
            </p>
            <p>
              <strong>Last Name:</strong> {doctor.lastName}
            </p>
            <p>
              <strong>NIC:</strong> {doctor.nic}
            </p>
            <p>
              <strong>Registered Patients:</strong>{" "}
              {doctor.registeredPatientsForDoctor.length > 0
                ? doctor.registeredPatientsForDoctor.join(", ")
                : "None"}
            </p>
          </div>
        )}

        {/* No data message */}
        {!doctor && !loading && !error && (
          <p className="text-gray-600 text-center">No doctor data available.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorDataById;
