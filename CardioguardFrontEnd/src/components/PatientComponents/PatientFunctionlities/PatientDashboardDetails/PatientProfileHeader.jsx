import { useState, useEffect } from "react";
import axiosClient from "../../../../../axios-client";
import useStateContext from "../../../../contexts/useStateContext";

const PatientProfileHeader = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nic: "",
    gender: "",
    dateOfBirth: "",
    email: "",
  });
  const { user } = useStateContext();

  const patientId = user.patientId;

  // Fetch patient data when the component loads
  useEffect(() => {
    const fetchPatientDataById = async () => {
      try {
        setLoading(true);
        setError(null);
        setPatient(null);

        // Fetch patient data
        const patientResponse = await axiosClient.get(`/patients/${patientId}`);
        if (patientResponse.data) {
          setPatient(patientResponse.data);
          setFormData({
            firstName: patientResponse.data.firstName,
            lastName: patientResponse.data.lastName,
            nic: patientResponse.data.nic,
            gender: patientResponse.data.gender,
            dateOfBirth: patientResponse.data.dateOfBirth,
            email: patientResponse.data.email,
          });
        } else {
          setError("No patient data found.");
        }
      } catch (err) {
        setError(
          "Failed to fetch data. Please check the Patient ID and try again."
        );
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDataById();
  }, [patientId]);

  const handleEditClick = () => {
    setShowEditForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosClient.put(
        `/patients/${patientId}`,
        formData
      );
      if (response.data) {
        setPatient(response.data);
        setShowEditForm(false); // Hide form after successful update
      }
    } catch (err) {
      setError("Failed to update the patient data. Please try again.");
      console.error("Update error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg p-4">
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : patient ? (
        <>
          {/* Display the profile info or the edit form based on showEditForm */}
          {!showEditForm ? (
            <>
              {/* Left Section: User Icon, Name, Patient ID */}
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5.121 19.121A1.25 1.25 0 016.25 18h11.5a1.25 1.25 0 011.129.736A9.978 9.978 0 0012 21a9.978 9.978 0 00-6.879-2.879zM12 11a5 5 0 100-10 5 5 0 000 10z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      {patient.firstName} {patient.lastName}
                    </h2>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                      Active
                    </span>
                    <p className="text-sm text-gray-500">
                      Patient ID:{" "}
                      <span className="font-bold">{patient.patientId}</span>
                    </p>
                  </div>
                </div>

                {/* Edit Button */}
                <button
                  onClick={handleEditClick}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Edit Data
                </button>
              </div>
            </>
          ) : (
            // Display edit form when showEditForm is true
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm">NIC</label>
                <input
                  type="text"
                  name="nic"
                  value={formData.nic}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditForm(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </>
      ) : (
        <div className="text-center text-gray-500">
          {error || "No patient data available."}
        </div>
      )}
    </div>
  );
};

export default PatientProfileHeader;
