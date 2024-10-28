import { useState, useEffect } from "react";
import axiosClient from "../../axios-client"; // Adjust the import path
import { useParams } from "react-router-dom";

const UpdateDoctor = () => {
  const { doctor_id } = useParams(); // Get doctor_id from the URL
  const [doctorData, setDoctorData] = useState({
    surname: "",
    lastName: "",
    nic: "",
    registeredPatientsForDoctor: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [setOriginalData] = useState(null);

  // Fetch the current data of the doctor on component mount
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const doctor_id = 1;
        setLoading(true);
        const response = await axiosClient.get(`/admin/doctor/${doctor_id}`);
        if (response.data) {
          setDoctorData(response.data);
          setOriginalData(response.data); // Store the original data
        } else {
          setError("Failed to fetch doctor data.");
        }
      } catch (err) {
        setError("Failed to fetch doctor data.");
        console.error("Error fetching doctor data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [doctor_id]);

  const handleFieldFocus = (field) => {
    setDoctorData({
      ...doctorData,
      [field]: "", // Clear the field when focused
    });
  };

  const handleChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const doctor_id = 1;
    if (!doctor_id) {
      setError("Doctor ID is missing.");
      return;
    }

    try {
      const doctor_id = 1;
      setLoading(true);
      setError(null);
      setSuccess(null);

      // Send PUT request to update doctor
      const response = await axiosClient.put(
        `/admin/update/doctor/${doctor_id}`,
        doctorData
      );

      if (response.status === 200) {
        setSuccess("Doctor updated successfully!");
      } else {
        setError("Failed to update doctor. Please try again.");
      }
    } catch (err) {
      setError("Failed to update doctor. Please try again.");
      console.error("Error updating doctor:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Update Doctor</h1>

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
      ) : (
        <>
          <input
            type="text"
            name="surname"
            placeholder="Surname"
            value={doctorData.surname}
            onFocus={() => handleFieldFocus("surname")}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded-md"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={doctorData.lastName}
            onFocus={() => handleFieldFocus("lastName")}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded-md"
          />
          <input
            type="text"
            name="nic"
            placeholder="NIC"
            value={doctorData.nic}
            onFocus={() => handleFieldFocus("nic")}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded-md"
          />

          {/* Assuming registeredPatientsForDoctor is handled differently */}
          {/* Additional components or logic can be added here to manage registeredPatientsForDoctor */}

          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all w-full"
            disabled={loading}
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
              "Update Doctor"
            )}
          </button>
        </>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>
  );
};

export default UpdateDoctor;
