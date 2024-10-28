import { useState, useEffect } from "react";
import axiosClient from "../../../../axios-client";

const SearchPatients = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get("/admin/patients/bulk");
        if (response.data) {
          setPatients(response.data);
          setFilteredPatients(response.data);
        } else {
          setError("Failed to fetch patients data.");
        }
      } catch (err) {
        setError("Failed to fetch patients data.");
        console.error("Error fetching patients data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term) {
      const filtered = patients.filter(
        (patient) =>
          patient.firstName.toLowerCase().includes(term) ||
          patient.lastName.toLowerCase().includes(term) ||
          patient.nic.toLowerCase().includes(term)
      );
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients(patients);
    }
  };

  return (
    <div className="w-full mx-auto p-4 shadow-lg rounded-lg bg-white">
      <div className="w-full">
        <h1 className="text-2xl font-bold p-2 mb-4">Patients</h1>
        <input
          type="text"
          placeholder="Search by First Name, Last Name or NIC"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 border rounded-md mb-4"
        />

        <div className="w-full mx-auto p-4 bg-white">
          {loading ? (
            <div className="flex justify-center">
              <svg
                className="animate-spin h-6 w-6 text-blue-600"
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
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="w-full overflow-x-auto">
              <div className="max-h-96 overflow-y-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg table-auto">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left">Patient ID</th>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">NIC</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.map((patient) => (
                      <tr
                        key={patient.patientId}
                        className="hover:bg-gray-50 cursor-pointer"
                      >
                        <td className="border-t px-4 py-2">
                          {patient.patientId}
                        </td>
                        <td className="border-t px-4 py-2">
                          {patient.firstName + " " + patient.lastName}
                        </td>
                        <td className="border-t px-4 py-2">{patient.nic}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPatients;
