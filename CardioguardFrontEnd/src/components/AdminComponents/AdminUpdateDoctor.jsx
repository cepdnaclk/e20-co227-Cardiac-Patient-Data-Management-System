import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axiosClient from "../../../axios-client";

const AdminUpdateDoctor = ({ doctorId, onComplete }) => {
  const [setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nic: "",
    surname: "",
    lastName: "",
    // Add more fields as necessary
  });

  // Fetch doctor details
  const fetchDoctorData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use the correct API URL with doctorId
      const response = await axiosClient.get(`/admin/doctor/${doctorId}`);
      setDoctor(response.data); // Store doctor data in state
      // Pre-fill the form with existing doctor data
      setFormData({
        nic: response.data.nic || "",
        surname: response.data.surname || "",
        lastName: response.data.lastName || "",
        // Add more fields as necessary
      });
    } catch (err) {
      setError("Failed to fetch doctor data.");
      console.error("Error fetching doctor data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (doctorId) {
      fetchDoctorData();
    }
  }, [doctorId]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the doctor details using the API
      await axiosClient.put(`/admin/update/doctor/${doctorId}`, formData);
      alert("Doctor details updated successfully.");
      if (onComplete) onComplete(); // Call onComplete if it exists
    } catch (error) {
      console.error("Error updating doctor:", error);
      setError("Failed to update doctor details.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Update Doctor Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="nic"
            className="block text-sm font-medium text-gray-700"
          >
            NIC
          </label>
          <input
            type="text"
            name="nic"
            id="nic"
            value={formData.nic}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="surname"
            className="block text-sm font-medium text-gray-700"
          >
            Surname
          </label>
          <input
            type="text"
            name="surname"
            id="surname"
            value={formData.surname}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        {/* Add more fields as necessary */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Doctor
        </button>
      </form>
    </div>
  );
};

AdminUpdateDoctor.propTypes = {
  doctorId: PropTypes.string.isRequired,
  onComplete: PropTypes.func,
};

export default AdminUpdateDoctor;
