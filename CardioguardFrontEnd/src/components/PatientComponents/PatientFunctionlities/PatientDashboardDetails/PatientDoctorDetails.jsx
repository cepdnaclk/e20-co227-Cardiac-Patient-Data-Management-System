import { useState, useEffect } from "react";
import axiosClient from "../../../../../axios-client";
import useStateContext from "../../../../contexts/useStateContext";

const PatientDoctorDetails = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

  return (
    <div className="bg-white p-6 w-full max-w-2xl">
      <h2 className="text-lg font-bold mb-4">Visited Doctors</h2>
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : patient ? (
        <div className="border-l pl-4">
          {/* Doctors Table */}
          <div className="mb-4">
            {patient.visitedDoctorsForPatient &&
            patient.visitedDoctorsForPatient.length > 0 ? (
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Doctor ID</th>
                    <th className="py-2 px-4 border-b">Surname</th>
                    <th className="py-2 px-4 border-b">Last Name</th>
                  </tr>
                </thead>
                <tbody>
                  {patient.visitedDoctorsForPatient.map((doctor) => (
                    <tr key={doctor.doctorId}>
                      <td className="py-2 px-4 border-b">{doctor.doctorId}</td>
                      <td className="py-2 px-4 border-b">{doctor.surname}</td>
                      <td className="py-2 px-4 border-b">{doctor.lastName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No doctors visited.</p>
            )}
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

export default PatientDoctorDetails;
