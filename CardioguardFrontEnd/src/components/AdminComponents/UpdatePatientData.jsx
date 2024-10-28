import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axiosClient from "../../../axios-client"; // Adjust the path as per your project structure

const AdminUpdatePatient = ({ patientId, onComplete }) => {
  // Receive patientId and onComplete as props
  const [patient, setPatient] = useState({
    firstName: "",
    lastName: "",
    nic: "",
    gender: "",
    dateOfBirth: "",
    email: "",
  }); // State to hold patient data
  const [loading, setLoading] = useState(true); // Handle loading state
  const [updateLoading, setUpdateLoading] = useState(false); // Loading state for the update process
  const [error, setError] = useState(null); // Handle error state

  // Fetch patient details when the component mounts or patientId changes
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use the correct API URL with patientId
        const response = await axiosClient.get(`/admin/patient/${patientId}`);
        setPatient(response.data); // Store patient data in state
      } catch (err) {
        setError("Failed to fetch patient data.");
        console.error("Error fetching patient data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      // Ensure patientId is available
      fetchPatientData();
    }
  }, [patientId]);

  // Handle form submission to update patient data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdateLoading(true);
      setError(null);

      // Use the correct API URL with patientId
      await axiosClient.put(`/admin/update/patient/${patientId}`, patient);
      alert("Patient updated successfully.");

      // Call onComplete prop to notify parent component
      if (onComplete) onComplete();
    } catch (error) {
      console.error("Error updating patient:", error);
      setError("Failed to update patient.");
    } finally {
      setUpdateLoading(false);
    }
  };

  // Handle input change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  // Handle cancel action
  const handleCancel = () => {
    if (onComplete) {
      onComplete(); // Notify parent to hide the update form
    }
  };

  if (loading) return <p>Loading patient data...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Patient Information</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={patient.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={patient.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">NIC</label>
            <input
              type="text"
              name="nic"
              value={patient.nic}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Gender</label>
            <select
              name="gender"
              value={patient.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              {/* Add more gender options as needed */}
            </select>
          </div>
          <div>
            <label className="block mb-2">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={patient.dateOfBirth}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={patient.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={updateLoading} // Disable button during update process
          >
            {updateLoading ? "Updating..." : "Update Patient"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

AdminUpdatePatient.propTypes = {
  patientId: PropTypes.string.isRequired,
  onComplete: PropTypes.func,
};

export default AdminUpdatePatient;
