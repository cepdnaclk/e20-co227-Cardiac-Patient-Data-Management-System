import { useEffect, useState } from "react";
import axiosClient from "../../axios-client"; // Updated path for axiosClient
import { useNavigate } from "react-router-dom";
import { FiRefreshCw } from "react-icons/fi"; // Import the reload icon

const FetchAllPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [patientsPerPage] = useState(10); // Show 10 patients per page
  const navigate = useNavigate();

  // Function to fetch all patients
  const fetchAllPatients = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch data from the API
      const response = await axiosClient.get("/admin/patients/bulk");

      if (response.data) {
        setPatients(response.data);
      } else {
        setError("No patients found.");
      }
    } catch (err) {
      setError("Failed to fetch patients. Please try again.");
      console.error("Error fetching patients:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch patients on component mount
  useEffect(() => {
    fetchAllPatients();
  }, []); // Empty dependency array to run the effect only once

  // Get current patients for pagination
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = patients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

  // Function to handle row click
  const handleRowClick = (patientId) => {
    navigate(`/admin/patient/${patientId}`);
  };

  // Handle next page
  const nextPage = () => {
    if (currentPage * patientsPerPage < patients.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="relative">
      {/* Flex container to position the reload button on the right */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-center">Fetch All Patients</h1>

        {/* Reload icon button on the right */}
        <button
          onClick={fetchAllPatients}
          disabled={loading}
          className="text-blue-600 hover:text-blue-700 transition-all"
        >
          <FiRefreshCw className={`h-6 w-6 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Display error message if any */}
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {/* Display patients in a table if available */}
      {currentPatients.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Patient ID</th>
                <th className="px-4 py-2 border">NIC</th>
                <th className="px-4 py-2 border">First Name</th>
                <th className="px-4 py-2 border">Last Name</th>
                <th className="px-4 py-2 border">Gender</th>
                <th className="px-4 py-2 border">Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.map((patient) => (
                <tr
                  key={patient.patientId}
                  onClick={() => handleRowClick(patient.patientId)}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <td className="px-4 py-2 border text-center">
                    {patient.patientId}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {patient.nic}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {patient.firstName}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {patient.lastName}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {patient.gender}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {new Date(patient.dateOfBirth).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded ${
            currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {Math.ceil(patients.length / patientsPerPage)}
        </span>

        <button
          onClick={nextPage}
          disabled={currentPage * patientsPerPage >= patients.length}
          className={`px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded ${
            currentPage * patientsPerPage >= patients.length
              ? "cursor-not-allowed opacity-50"
              : ""
          }`}
        >
          Next
        </button>
      </div>

      {/* Show message when no patients are available */}
      {patients.length === 0 && !loading && !error && (
        <p className="text-gray-600 text-center">No patients available.</p>
      )}
    </div>
  );
};

export default FetchAllPatients;
