import { useState } from "react";
import axiosClient from "../../axios-client"; // Ensure the correct path for axiosClient

const PatientClinicalDataById = () => {
  const [patient, setPatient] = useState(null);
  const [clinicalData, setClinicalData] = useState(null);
  const [patientId, setPatientId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPatientDataById = async () => {
    if (!patientId) {
      setError("Please enter a valid Patient ID");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setPatient(null);
      setClinicalData(null);

      // Fetch patient data
      const patientResponse = await axiosClient.get(`/patients/${patientId}`);
      // Fetch clinical data
      const clinicalDataResponse = await axiosClient.get(
        `/doctors/patients/${patientId}/clinical-data`
      );

      if (patientResponse.data) {
        setPatient(patientResponse.data);
      } else {
        setError("No patient data found.");
      }

      if (clinicalDataResponse.data) {
        setClinicalData(clinicalDataResponse.data);
      } else {
        setError("No clinical data found.");
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-orange-300">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Patient Clinical Data
        </h1>

        {/* Input field for patient ID */}
        <input
          type="text"
          placeholder="Enter Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="w-full px-4 py-2 border rounded-md mb-4"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {/* Button to fetch patient data */}
        <button
          onClick={fetchPatientDataById}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all disabled:opacity-50 mb-4"
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mx-auto text-white"
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
          ) : (
            "Get Patient Data"
          )}
        </button>

        {/* Display patient data */}
        {patient && (
          <div className="bg-gray-50 rounded-md p-4 mb-4">
            <h2 className="text-lg font-bold mb-2">Patient Details</h2>
            <p>
              <strong>Patient ID:</strong> {patient.patientId}
            </p>
            <p>
              <strong>NIC:</strong> {patient.nic}
            </p>
            <p>
              <strong>First Name:</strong> {patient.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {patient.lastName}
            </p>
            <p>
              <strong>Gender:</strong> {patient.gender}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {new Date(patient.dateOfBirth).toLocaleDateString()}
            </p>
            <p>
              <strong>Email:</strong> {patient.email || "N/A"}
            </p>
          </div>
        )}

        {/* Display clinical data */}
        {clinicalData && (
          <div className="bg-gray-50 rounded-md p-4">
            <h2 className="text-lg font-bold mb-2">Clinical Data Details</h2>
            <p>
              <strong>Clinical Data ID:</strong> {clinicalData.clinicalDataId || "N/A"}
            </p>
            <p>
              <strong>Diagnosis of Heart Disease:</strong>{" "}
              {clinicalData.diagnosisOfHeartDisease ? "Yes" : "No"}
            </p>
            <p>
              <strong>Presence of Anemia:</strong>{" "}
              {clinicalData.presenceOfAnemia ? "Yes" : "No"}
            </p>
            <p>
              <strong>Creatinine Phosphokinase:</strong>{" "}
              {clinicalData.creatininePhosphokinase || "N/A"}
            </p>
            <p>
              <strong>Diabetes:</strong>{" "}
              {clinicalData.diabetes ? "Yes" : "No"}
            </p>
            <p>
              <strong>Ejection Fraction:</strong>{" "}
              {clinicalData.ejectionFraction
                ? `${clinicalData.ejectionFraction}%`
                : "N/A"}
            </p>
            <p>
              <strong>Blood Pressure:</strong>{" "}
              {clinicalData.bloodPressure || "N/A"}
            </p>
            <p>
              <strong>Platelets:</strong> {clinicalData.platelets || "N/A"}
            </p>
            <p>
              <strong>Serum Creatinine:</strong>{" "}
              {clinicalData.serumCreatinine || "N/A"}
            </p>
            <p>
              <strong>Serum Sodium:</strong> {clinicalData.serumSodium || "N/A"}
            </p>
            <p>
              <strong>Smoking:</strong> {clinicalData.smoking ? "Yes" : "No"}
            </p>
            <p>
              <strong>Follow-Up Period (Days):</strong>{" "}
              {clinicalData.followUpPeriodDays || "N/A"}
            </p>
          </div>
        )}

        {/* No data message */}
        {!patient && !loading && !error && (
          <p className="text-gray-600 text-center">No patient data available.</p>
        )}
      </div>
    </div>
  );
};

export default PatientClinicalDataById;
