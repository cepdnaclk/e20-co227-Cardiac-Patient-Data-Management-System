import { useState, useEffect } from "react";
import axiosClient from "../../../../../axios-client";
import useStateContext from "../../../../contexts/useStateContext";

const PatientGeneralInfo = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false); // Keep this
  const [error, setError] = useState(null);
  const { user } = useStateContext();

  const patientId = user.patientId;

  // Function to calculate age from date of birth
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Fetch patient data when the component loads
  useEffect(() => {
    const fetchPatientDataById = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data
        setError(null);
        setPatient(null);

        // Fetch patient data
        const patientResponse = await axiosClient.get(`/patients/${patientId}`);

        if (patientResponse.data) {
          setPatient(patientResponse.data);
        } else {
          setError("No patient data found.");
        }
      } catch (err) {
        setError(
          "Failed to fetch data. Please check the Patient ID and try again."
        );
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchPatientDataById();
  }, [patientId]); // Fetch data when patientId is loaded (which is hardcoded here)

  return (
    <div className="bg-white p-6 w-full max-w-2xl">
      <h2 className="text-lg font-bold mb-4">General Info</h2>
      {loading ? ( // Show loading message if loading is true
        <div className="text-center text-gray-500">Loading...</div>
      ) : patient ? (
        <div className="grid grid-cols-2 gap-4">
          {/* Left Column */}
          <div>
            {/* Gender */}
            <div className="mb-4">
              <p className="text-sm text-gray-500">Gender</p>
              <p className="text-md font-medium">{patient.gender || "N/A"}</p>
            </div>

            {/* Age */}
            <div className="mb-4">
              <p className="text-sm text-gray-500">Age</p>
              <p className="text-md font-medium">
                {patient.dateOfBirth
                  ? `${calculateAge(patient.dateOfBirth)} years old`
                  : "N/A"}
              </p>
            </div>

            {/* Date of Birth */}
            <div className="mb-4">
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="text-md font-medium">
                {patient.dateOfBirth || "N/A"}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="border-l pl-4">
            {/* Occupation */}
            <div className="mb-4">
              <p className="text-sm text-gray-500">Occupation</p>
              <p className="text-md font-medium">Software Engineer</p>
            </div>

            {/* Insurance */}
            <div className="mb-4">
              <p className="text-sm text-gray-500">Insurance</p>
              <p className="text-md font-medium">HealthPlus</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          {error || "No data available."}
        </div>
      )}
    </div>
  );
};

export default PatientGeneralInfo;
