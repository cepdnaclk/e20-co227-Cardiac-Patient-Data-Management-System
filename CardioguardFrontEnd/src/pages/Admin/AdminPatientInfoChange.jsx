import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axiosClient from "../../../axios-client"; // Adjust the path as per your project structure
import PatientExaminationDataById from "../../components/AdminComponents/PatientExaminationData";
import PatientClinicalDataById from "../../components/AdminComponents/PatientClinicalData";
import PatientSymptomDataById from "../../components/AdminComponents/PatientSymptomsData";
import AdminUpdatePatient from "../../components/AdminComponents/UpdatePatientData";

const AdminPatientInfoChange = () => {
  const { patientId } = useParams(); // Get patientId from URL
  const navigate = useNavigate(); // Initialize navigate
  const [patient, setPatient] = useState(null); // Store patient data
  const [loading, setLoading] = useState(true); // Handle loading state
  const [error, setError] = useState(null); // Handle error state
  const [showUpdateForm, setShowUpdateForm] = useState(false); // Toggle to show the update form

  // Fetch patient details
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

  useEffect(() => {
    if (patientId) {
      fetchPatientData();
    }
  }, [patientId]);

  // Handle update complete
  const handleUpdateComplete = () => {
    setShowUpdateForm(false); // Hide the update form
    fetchPatientData(); // Refresh the patient data
  };

  // Handle update patient (show update form)
  const handleUpdate = () => {
    setShowUpdateForm(true); // Show the update form
  };

  // Handle delete patient
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?"
    );
    if (!confirmDelete) return;

    try {
      await axiosClient.delete(`/admin/delete/patient/${patientId}`);
      alert("Patient deleted successfully.");
      navigate("/admin/patients"); // Navigate back to the patients list after deletion
    } catch (error) {
      console.error("Error deleting patient:", error);
      setError("Failed to delete patient.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Patient Information</h1>
      {showUpdateForm ? (
        // Show the update form
        <AdminUpdatePatient
          patientId={patientId}
          onComplete={handleUpdateComplete}
        />
      ) : (
        // Show the patient information
        <>
          {patient ? (
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p>
                    <strong>Patient ID:</strong> {patient.patientId}
                  </p>
                  <p>
                    <strong>NIC:</strong> {patient.nic}
                  </p>
                  <p>
                    <strong>Name:</strong> {patient.firstName}{" "}
                    {patient.lastName}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Gender:</strong> {patient.gender}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong>{" "}
                    {new Date(patient.dateOfBirth).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {patient.email ? patient.email : "N/A"}
                  </p>
                </div>
              </div>

              {/* Buttons for updating and deleting the patient */}
              <div className="mt-6 flex justify-between">
                <button
                  onClick={handleUpdate}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Update Details
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete Patient
                </button>
              </div>
            </div>
          ) : (
            <p>No patient found.</p>
          )}

          <div>
            <PatientExaminationDataById patientId={patientId} />
            <PatientClinicalDataById patientId={patientId} />
            <PatientSymptomDataById patientId={patientId} />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPatientInfoChange;
