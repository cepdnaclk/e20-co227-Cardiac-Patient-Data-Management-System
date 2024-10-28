import { useState } from "react";
import axiosClient from "../../axios-client"; // Updated path for axiosClient

const PatientSymptomDataById = () => {
  const [patient, setPatient] = useState(null);
  const [symptoms, setSymptoms] = useState([]);
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
      setSymptoms([]);

      // Fetch patient data
      const patientResponse = await axiosClient.get(`/patients/${patientId}`);
      // Fetch symptoms data
      const symptomsResponse = await axiosClient.get(
        `/doctors/patients/${patientId}/symptoms`
      );

      if (patientResponse.data) {
        setPatient(patientResponse.data);
      } else {
        setError("No patient data found.");
      }

      if (symptomsResponse.data) {
        setSymptoms(symptomsResponse.data);
      } else {
        setError("No symptoms data found.");
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
      {/* Enlarge the outer box */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-5xl">
        <h1 className="text-2xl font-bold text-center mb-6">
          Patient Symptoms Data
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
            <h2 className="text-lg font-bold text-center mb-2">
              Patient Details
            </h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b-2 border-r-2 p-2">Field</th>
                  <th className="border-b-2 p-2">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 font-bold border-r-2">Patient ID</td>
                  <td className="p-2">{patient.patientId}</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold border-r-2">NIC</td>
                  <td className="p-2">{patient.nic}</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold border-r-2">First Name</td>
                  <td className="p-2">{patient.firstName}</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold border-r-2">Last Name</td>
                  <td className="p-2">{patient.lastName}</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold border-r-2">Gender</td>
                  <td className="p-2">{patient.gender}</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold border-r-2">Date of Birth</td>
                  <td className="p-2">
                    {new Date(patient.dateOfBirth).toLocaleDateString()}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 font-bold border-r-2">Email</td>
                  <td className="p-2">{patient.email || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Display symptoms data in a table */}
        {symptoms.length > 0 && (
          <div className="bg-gray-50 rounded-md p-4">
            <h2 className="text-lg font-bold text-center mb-2">
              Symptoms Details
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b-2 border-r-2 p-2">Symptom Code</th>
                    <th className="border-b-2 border-r-2 p-2">
                      Bilateral Lower Limb Swelling
                    </th>
                    <th className="border-b-2 border-r-2 p-2">Dyspnoea</th>
                    <th className="border-b-2 border-r-2 p-2">Orthopnoea</th>
                    <th className="border-b-2 border-r-2 p-2">
                      Paroxysmal Nocturnal Dyspnoea
                    </th>
                    <th className="border-b-2 border-r-2 p-2">Fatigue</th>
                    <th className="border-b-2 border-r-2 p-2">
                      Doctor Recommendation
                    </th>
                    <th className="border-b-2 p-2">Symptom Date</th>
                  </tr>
                </thead>
                <tbody>
                  {symptoms.map((symptom, index) => (
                    <tr key={index}>
                      <td className="p-2 border-r-2">{symptom.symptomCode}</td>
                      <td className="p-2 border-r-2">
                        {symptom.bilateralLowerLimbSwelling ? "Yes" : "No"}
                      </td>
                      <td className="p-2 border-r-2">
                        {symptom.dyspnoea ? "Yes" : "No"}
                      </td>
                      <td className="p-2 border-r-2">
                        {symptom.orthopnoea ? "Yes" : "No"}
                      </td>
                      <td className="p-2 border-r-2">
                        {symptom.paroxysmalNocturnalDyspnoea ? "Yes" : "No"}
                      </td>
                      <td className="p-2 border-r-2">
                        {symptom.fatigue ? "Yes" : "No"}
                      </td>
                      <td className="p-2 border-r-2">
                        {symptom.doctorRecommendation}
                      </td>
                      <td className="p-2">
                        {new Date(symptom.symptomDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

export default PatientSymptomDataById;

// import { useState } from "react";
// import axiosClient from "../../axios-client"; // Updated path for axiosClient

// const PatientSymptomDataById = () => {
//   const [patient, setPatient] = useState(null);
//   const [symptoms, setSymptoms] = useState([]);
//   const [patientId, setPatientId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchPatientDataById = async () => {
//     if (!patientId) {
//       setError("Please enter a valid Patient ID");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);
//       setPatient(null);
//       setSymptoms([]);

//       // Fetch patient data
//       const patientResponse = await axiosClient.get(`/patients/${patientId}`);
//       // Fetch symptoms data
//       const symptomsResponse = await axiosClient.get(
//         `/doctors/patients/${patientId}/symptoms`
//       );

//       if (patientResponse.data) {
//         setPatient(patientResponse.data);
//       } else {
//         setError("No patient data found.");
//       }

//       if (symptomsResponse.data) {
//         setSymptoms(symptomsResponse.data);
//       } else {
//         setError("No symptoms data found.");
//       }
//     } catch (err) {
//       setError(
//         "Failed to fetch data. Please check the Patient ID and try again."
//       );
//       console.error("Error fetching data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-orange-300">
//       <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
//         <h1 className="text-2xl font-bold text-center mb-6">
//           Patient Symptoms Data
//         </h1>

//         {/* Input field for patient ID */}
//         <input
//           type="text"
//           placeholder="Enter Patient ID"
//           value={patientId}
//           onChange={(e) => setPatientId(e.target.value)}
//           className="w-full px-4 py-2 border rounded-md mb-4"
//         />
//         {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

//         {/* Button to fetch patient data */}
//         <button
//           onClick={fetchPatientDataById}
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all disabled:opacity-50 mb-4"
//         >
//           {loading ? (
//             <svg
//               className="animate-spin h-5 w-5 mx-auto text-white"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//               ></circle>
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 0116 0A8 8 0 014 12z"
//               ></path>
//             </svg>
//           ) : (
//             "Get Patient Data"
//           )}
//         </button>

//         {/* Display patient data */}
//         {patient && (
//           <div className="bg-gray-50 rounded-md p-4 mb-4">
//             <h2 className="text-lg font-bold mb-2">Patient Details</h2>
//             <table className="w-full text-left">
//               <thead>
//                 <tr>
//                   <th className="border-b-2 p-2">Patient ID</th>
//                   <th className="border-b-2 p-2">NIC</th>
//                   <th className="border-b-2 p-2">First Name</th>
//                   <th className="border-b-2 p-2">Last Name</th>
//                   <th className="border-b-2 p-2">Gender</th>
//                   <th className="border-b-2 p-2">Date of Birth</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="p-2">{patient.patientId}</td>
//                   <td className="p-2">{patient.nic}</td>
//                   <td className="p-2">{patient.firstName}</td>
//                   <td className="p-2">{patient.lastName}</td>
//                   <td className="p-2">{patient.gender}</td>
//                   <td className="p-2">
//                     {new Date(patient.dateOfBirth).toLocaleDateString()}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Display symptoms in a table */}
//         {symptoms.length > 0 && (
//           <div className="bg-gray-50 rounded-md p-4">
//             <h2 className="text-lg font-bold mb-2">Symptoms Details</h2>
//             <table className="w-full text-left">
//               <thead>
//                 <tr>
//                   <th className="border-b-2 p-2">Symptom Code</th>
//                   <th className="border-b-2 p-2">Bilateral Lower Limb Swelling</th>
//                   <th className="border-b-2 p-2">Dyspnoea</th>
//                   <th className="border-b-2 p-2">Orthopnoea</th>
//                   <th className="border-b-2 p-2">Paroxysmal Nocturnal Dyspnoea</th>
//                   <th className="border-b-2 p-2">Fatigue</th>
//                   <th className="border-b-2 p-2">Doctor Recommendation</th>
//                   <th className="border-b-2 p-2">Symptom Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {symptoms.map((symptom, index) => (
//                   <tr key={index}>
//                     <td className="p-2">{symptom.symptomCode}</td>
//                     <td className="p-2">{symptom.bilateralLowerLimbSwelling ? "Yes" : "No"}</td>
//                     <td className="p-2">{symptom.dyspnoea ? "Yes" : "No"}</td>
//                     <td className="p-2">{symptom.orthopnoea ? "Yes" : "No"}</td>
//                     <td className="p-2">{symptom.paroxysmalNocturnalDyspnoea ? "Yes" : "No"}</td>
//                     <td className="p-2">{symptom.fatigue ? "Yes" : "No"}</td>
//                     <td className="p-2">{symptom.doctorRecommendation}</td>
//                     <td className="p-2">{new Date(symptom.symptomDate).toLocaleDateString()}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* No data message */}
//         {!patient && !loading && !error && (
//           <p className="text-gray-600 text-center">
//             No patient data available.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PatientSymptomDataById;
