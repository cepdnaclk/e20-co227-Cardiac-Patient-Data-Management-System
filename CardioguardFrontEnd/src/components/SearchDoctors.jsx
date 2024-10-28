import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axiosClient from "../../axios-client"; // Adjust the path accordingly

const SearchDoctors = ({ onSelectDoctor }) => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get("/admin/doctors/bulk");
        if (response.data) {
          setDoctors(response.data);
          setFilteredDoctors(response.data);
        } else {
          setError("Failed to fetch doctors data.");
        }
      } catch (err) {
        setError("Failed to fetch doctors data.");
        console.error("Error fetching doctors data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term) {
      const filtered = doctors.filter((doctor) => {
        return (
          doctor.surname.toLowerCase().includes(term) ||
          doctor.lastName.toLowerCase().includes(term) ||
          doctor.nic.toLowerCase().includes(term) ||
          doctor.doctorId.toString().toLowerCase().includes(term) // Convert doctorId to string
        );
      });
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors(doctors);
    }
  };

  const handleRowClick = (doctor) => {
    onSelectDoctor(doctor.doctorId, `${doctor.surname} ${doctor.lastName}`);
  };

  return (
    <div className="w-full mx-auto p-4 bg-white">
      <div className="w-full">
        <h1 className="text-2xl font-bold p-4">Doctors</h1>
        <input
          type="text"
          placeholder="Search by Doctor ID, Surname, Last Name, or NIC"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 border rounded-md mb-4"
        />
        <div className="w-full mx-auto p-4  bg-white">
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
              <div className="max-h-[240px] overflow-y-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left">Doctor ID</th>
                      <th className="px-4 py-2 text-left">Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDoctors.map((doctor) => (
                      <tr
                        key={doctor.doctorId}
                        className="hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleRowClick(doctor)}
                      >
                        <td className="border-t px-4 py-2">
                          {doctor.doctorId}
                        </td>
                        <td className="border-t px-4 py-2">
                          {"Dr. " + doctor.surname + " " + doctor.lastName}
                        </td>
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

SearchDoctors.propTypes = {
  onSelectDoctor: PropTypes.func.isRequired,
};

export default SearchDoctors;
