import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import CreateDoctorForm from "../AdminComponents/AddingDoctor";
import AdminUpdateDoctor from "../AdminComponents/AdminUpdateDoctor";
import RegisterPatientToDoctor from "../RegisterPatientsForDoctor";

const FetchAllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [doctorsPerPage] = useState(10); // Show 10 doctors per page
  const [showAddModal, setShowAddModal] = useState(false); // State for Add modal visibility
  const [showUpdateModal, setShowUpdateModal] = useState(false); // State for Update modal visibility
  const [selectedDoctorId, setSelectedDoctorId] = useState(null); // Store selected doctor ID

  // Function to fetch all doctors
  const fetchAllDoctors = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch data from the API
      const response = await axiosClient.get("/admin/doctors/bulk");

      // Log the API response to the console
      console.log("API Response:", response.data); // Debugging line

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

  // Fetch doctors on component mount automatically
  useEffect(() => {
    fetchAllDoctors();
  }, []); // Empty dependency array to run the effect only once

  // Function to handle deleting a doctor
  const handleDelete = async (doctorId) => {
    try {
      // Make DELETE request to the API
      await axiosClient.delete(`/admin/delete/doctor/${doctorId}`); // Adjust the API endpoint as needed
      // Filter out the deleted doctor from the state
      setDoctors(doctors.filter((doctor) => doctor.doctorId !== doctorId));
      console.log(`Doctor with ID ${doctorId} deleted successfully.`);
    } catch (err) {
      console.error("Error deleting doctor:", err);
      setError("Failed to delete doctor. Please try again.");
    }
  };

  // Function to handle opening the Add Doctor modal
  const handleAddDoctor = () => {
    setShowAddModal(true); // Show the Add modal
  };

  // Function to handle closing the Add Doctor modal
  const handleCloseAddModal = () => {
    setShowAddModal(false); // Hide the Add modal
  };

  // Function to handle opening the Update Doctor modal
  const handleUpdate = (doctorId) => {
    setSelectedDoctorId(doctorId); // Set the selected doctor ID
    setShowUpdateModal(true); // Show the Update modal
  };

  // Function to handle closing the Update Doctor modal
  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false); // Hide the Update modal
    fetchAllDoctors(); // Refresh the doctors list
  };

  // Get current doctors for pagination
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // Handle next page
  const nextPage = () => {
    if (currentPage * doctorsPerPage < doctors.length) {
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
      {/* Blur Background Wrapper */}
      <div
        className={`transition duration-300 ${
          showAddModal || showUpdateModal ? "blur-md" : ""
        }`}
      >
        {/* Flex container for title and Add Doctor button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-red-600">Doctors List</h1>
          <button
            onClick={handleAddDoctor}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Doctor
          </button>
        </div>

        {/* Display error message if any */}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {/* Display doctors in a table if available */}
        {currentDoctors.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Doctor ID</th>
                  <th className="px-4 py-2 border">NIC</th>
                  <th className="px-4 py-2 border">Surname</th>
                  <th className="px-4 py-2 border">Last Name</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentDoctors.map((doctor) => (
                  <tr key={doctor.doctorId} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border text-center">
                      {doctor.doctorId || "N/A"}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {doctor.nic || "N/A"}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {doctor.surname || "N/A"}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {doctor.lastName || "N/A"}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <button
                        onClick={() => handleUpdate(doctor.doctorId)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(doctor.doctorId)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
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
            Page {currentPage} of {Math.ceil(doctors.length / doctorsPerPage)}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage * doctorsPerPage >= doctors.length}
            className={`px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded ${
              currentPage * doctorsPerPage >= doctors.length
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
          >
            Next
          </button>
        </div>

        {/* Show message when no doctors are available */}
        {doctors.length === 0 && !loading && !error && (
          <p className="text-gray-600 text-center">No doctors available.</p>
        )}
      </div>

      {/* Modal for Add Doctor */}
      {showAddModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="relative w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
            {" "}
            {/* Adjust styling here */}
            <CreateDoctorForm />
            <button
              onClick={handleCloseAddModal}
              className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 rounded-full px-2 py-1"
            >
              X
            </button>
          </div>
        </div>
      )}

      {/* Modal for Update Doctor */}
      {showUpdateModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="relative w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
            {" "}
            {/* Adjust styling here */}
            <AdminUpdateDoctor
              doctorId={selectedDoctorId}
              onComplete={handleCloseUpdateModal}
            />
            <button
              onClick={handleCloseUpdateModal}
              className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 rounded-full px-2 py-1"
            >
              X
            </button>
          </div>
        </div>
      )}
      <div>
        <RegisterPatientToDoctor />
      </div>
    </div>
  );
};

export default FetchAllDoctors;
