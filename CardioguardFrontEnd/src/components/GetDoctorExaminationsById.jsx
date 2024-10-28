import { useState } from "react";
import axiosClient from "../../axios-client"; // Updated path for axiosClient

const PatientExaminationDataById = () => {
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
        `/doctors/${patientId}/examines`
      );

      // Set fetched patient data
      if (patientResponse?.data) {
        setPatient(patientResponse.data);
      } else {
        setError("No patient data found.");
      }

      // Set fetched clinical data
      if (clinicalDataResponse?.data) {
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
          Patient Examination Data
        </h1>

        {/* Input for Patient ID */}
        <input
          type="text"
          placeholder="Enter Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="w-full px-4 py-2 border rounded-md mb-4"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {/* Button to fetch data */}
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

        {/* Patient Details */}
        {patient && (
          <div className="bg-gray-50 rounded-md p-4 mb-4">
            <h2 className="text-lg font-bold mb-2">Patient Details</h2>
            <p>
              <strong>Patient ID:</strong> {patient.patientId || "N/A"}
            </p>
            <p>
              <strong>NIC:</strong> {patient.nic || "N/A"}
            </p>
            <p>
              <strong>First Name:</strong> {patient.firstName || "N/A"}
            </p>
            <p>
              <strong>Last Name:</strong> {patient.lastName || "N/A"}
            </p>
            <p>
              <strong>Gender:</strong> {patient.gender || "N/A"}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {patient.dateOfBirth
                ? new Date(patient.dateOfBirth).toLocaleDateString()
                : "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {patient.email || "N/A"}
            </p>
          </div>
        )}

        {/* Clinical Data */}
        {clinicalData && (
          <div className="bg-gray-50 rounded-md p-4">
            <h2 className="text-lg font-bold mb-2">Examination Data</h2>
            <p>
              <strong>Examination Code:</strong>{" "}
              {clinicalData.examinationCode || "N/A"}
            </p>
            <p>
              <strong>Tachycardia at Rest:</strong>{" "}
              {clinicalData.tachycardiaAtrest ? "Yes" : "No"}
            </p>
            <p>
              <strong>Hypotension:</strong>{" "}
              {clinicalData.hypotention ? "Yes" : "No"}
            </p>
            <p>
              <strong>Narrow Pulse Pressure:</strong>{" "}
              {clinicalData.narrowPulsePressure ? "Yes" : "No"}
            </p>
            <p>
              <strong>Raised Jugular Venous Pressure:</strong>{" "}
              {clinicalData.raisedJugularVenousPressure ? "Yes" : "No"}
            </p>
            <p>
              <strong>Displaced Apex Beat:</strong>{" "}
              {clinicalData.displacedApexBeat ? "Yes" : "No"}
            </p>
            <p>
              <strong>Right Ventricular Heave:</strong>{" "}
              {clinicalData.rightVenticularHeave ? "Yes" : "No"}
            </p>
            <p>
              <strong>Pleural Effusion:</strong>{" "}
              {clinicalData.pleuralEffusion ? "Yes" : "No"}
            </p>
            <p>
              <strong>Hepatomegaly:</strong>{" "}
              {clinicalData.hepatomegaly ? "Yes" : "No"}
            </p>
            <p>
              <strong>Gallop Rhythm on Auscultation:</strong>{" "}
              {clinicalData.gallopRhythmOnAuscultation ? "Yes" : "No"}
            </p>
            <p>
              <strong>Murmurs Associated with Valvular Heart Disease:</strong>{" "}
              {clinicalData.murmursAssociatedWithValvularHeartDisease
                ? "Yes"
                : "No"}
            </p>
            <p>
              <strong>Pedal and Ankle Oedema:</strong>{" "}
              {clinicalData.pedalAndAnkleOedema ? "Yes" : "No"}
            </p>
            <p>
              <strong>Tachypnoea:</strong>{" "}
              {clinicalData.tachypnoea ? "Yes" : "No"}
            </p>
            <p>
              <strong>Ascites:</strong> {clinicalData.ascites ? "Yes" : "No"}
            </p>
            <p>
              <strong>Examination Date:</strong>{" "}
              {clinicalData.examinationDate
                ? new Date(clinicalData.examinationDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        )}

        {/* No data message */}
        {!patient && !loading && !error && (
          <p className="text-gray-600 text-center">
            No patient data available.
          </p>
        )}
      </div>
    </div>
  );
};

export default PatientExaminationDataById;
