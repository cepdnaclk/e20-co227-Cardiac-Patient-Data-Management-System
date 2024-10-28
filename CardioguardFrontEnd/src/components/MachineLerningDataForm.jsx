import { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import useStateContext from "../contexts/useStateContext";
import MachineLearningData from "./DoctorComponents/DoctorFunctionlities/DoctorsPatientDetails/MachineLearningData";

const MachineLearn = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const { user } = useStateContext();

  useEffect(() => {
    const fetchPatients = async () => {
      const doctor_id = user.doctorId;
      try {
        setLoading(true);
        const response = await axiosClient.get(
          `/doctors/patients/bulk/${doctor_id}`
        );
        if (response.data) {
          // Sort patients by patientId in ascending order
          const sortedPatients = response.data.sort(
            (a, b) => a.patientId - b.patientId
          );
          setPatients(sortedPatients);
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
  }, [user.doctorId]);

  const handleRowClick = (patientId) => {
    setSelectedPatientId(patientId);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full mt-8">
      {!selectedPatientId ? (
        <>
          <h1 className="text-2xl font-bold text-center mb-12">
            Select Patient For Prediction Facility
          </h1>
          <span className="text-md font-sans text-green-500">
            click to open prediction model
          </span>
          {loading ? (
            <div className="flex justify-center">
              <svg
                className="animate-spin h-5 w-5 text-blue-500"
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
            <p className="text-red-600 text-center">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-md">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Patient ID</th>
                    <th className="px-4 py-2 text-left">First Name</th>
                    <th className="px-4 py-2 text-left">Last Name</th>
                    <th className="px-4 py-2 text-left">Gender</th>
                    <th className="px-4 py-2 text-left">Date of Birth</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr
                      key={patient.patientId}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleRowClick(patient.patientId)}
                    >
                      <td className="border-t px-4 py-2">
                        {patient.patientId}
                      </td>
                      <td className="border-t px-4 py-2">
                        {patient.firstName}
                      </td>
                      <td className="border-t px-4 py-2">{patient.lastName}</td>
                      <td className="border-t px-4 py-2">{patient.gender}</td>
                      <td className="border-t px-4 py-2">
                        {new Date(patient.dateOfBirth).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <MachineLearningData />
      )}
    </div>
  );
};

export default MachineLearn;
