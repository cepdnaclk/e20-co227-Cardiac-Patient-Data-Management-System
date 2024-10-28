import { useState, useEffect, useCallback } from "react";
import {
  FaHeartbeat,
  FaLungs,
  FaTint,
  FaRuler,
  FaStethoscope,
  FaArrowUp,
} from "react-icons/fa";
import axiosClient from "../../../../../axios-client";
import useStateContext from "../../../../contexts/useStateContext";

const PatientExaminationDataById = () => {
  const [clinicalData, setClinicalData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useStateContext();

  const patientId = user.patientId;

  const fetchClinicalData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setClinicalData([]);

      // Fetch clinical data
      const clinicalDataResponse = await axiosClient.get(
        `/doctors/${patientId}/examines`
      );

      if (clinicalDataResponse.data) {
        setClinicalData(clinicalDataResponse.data);
      } else {
        setError("No clinical data found.");
      }
    } catch (err) {
      setError(
        "Failed to fetch clinical data. Please check the Patient ID and try again."
      );
      console.error("Error fetching clinical data:", err);
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    fetchClinicalData();
  }, [fetchClinicalData]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-full mb-2">
      <h1 className="text-2xl font-bold text-left mb-6">Examination Data</h1>

      {/* Error message */}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      {/* Display clinical data in a table if no record is selected */}
      {!selectedRecord && clinicalData.length > 0 && (
        <table className="min-w-full bg-gray-50 rounded-md">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Examination Date</th>
              <th className="py-2 px-4 flex justify-end">Details</th>
            </tr>
          </thead>
          <tbody>
            {clinicalData.map((data, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-4">
                  {data.examinationDate
                    ? new Date(data.examinationDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="py-2 px-6 flex justify-end">
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                    onClick={() => setSelectedRecord(data)}
                  >
                    Show Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* No data message */}
      {!clinicalData.length && !loading && !error && (
        <p className="text-gray-600 text-center">
          No examination data available.
        </p>
      )}

      {/* Display detailed view of selected record */}
      {selectedRecord && (
        <div className="bg-gray-50 rounded-md p-4 mt-6">
          <h2 className="text-xl font-bold mb-4">Examination Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Tachycardia at Rest",
                value: selectedRecord.tachycardiaAtrest ? "Yes" : "No",
                color: selectedRecord.tachycardiaAtrest
                  ? "text-green-500"
                  : "text-red-500",
                icon: <FaHeartbeat className="text-blue-500 mr-4" size={40} />,
              },
              {
                label: "Hypotension",
                value: selectedRecord.hypotention ? "Yes" : "No",
                color: selectedRecord.hypotention
                  ? "text-green-500"
                  : "text-red-500",
                icon: (
                  <FaStethoscope className="text-blue-500 mr-4" size={40} />
                ),
              },
              {
                label: "Raised Jugular Venous Pressure",
                value: selectedRecord.raisedJugularVenousPressure
                  ? "Yes"
                  : "No",
                color: selectedRecord.raisedJugularVenousPressure
                  ? "text-green-500"
                  : "text-red-500",
                icon: <FaArrowUp className="text-blue-500 mr-4" size={40} />,
              },
              {
                label: "Displaced Apex Beat",
                value: selectedRecord.displacedApexBeat ? "Yes" : "No",
                color: selectedRecord.displacedApexBeat
                  ? "text-green-500"
                  : "text-red-500",
                icon: <FaHeartbeat className="text-blue-500 mr-4" size={40} />,
              },
              {
                label: "Right Ventricular Heave",
                value: selectedRecord.rightVenticularHeave ? "Yes" : "No",
                color: selectedRecord.rightVenticularHeave
                  ? "text-green-500"
                  : "text-red-500",
                icon: <FaLungs className="text-blue-500 mr-4" size={40} />,
              },
              {
                label: "Pleural Effusion",
                value: selectedRecord.pleuralEffusion ? "Yes" : "No",
                color: selectedRecord.pleuralEffusion
                  ? "text-green-500"
                  : "text-red-500",
                icon: <FaLungs className="text-blue-500 mr-4" size={40} />,
              },
              {
                label: "Hepatomegaly",
                value: selectedRecord.hepatomegaly ? "Yes" : "No",
                color: selectedRecord.hepatomegaly
                  ? "text-green-500"
                  : "text-red-500",
                icon: <FaTint className="text-blue-500 mr-4" size={40} />,
              },
              {
                label: "Gallop Rhythm on Auscultation",
                value: selectedRecord.gallopRhythmOnAuscultation ? "Yes" : "No",
                color: selectedRecord.gallopRhythmOnAuscultation
                  ? "text-green-500"
                  : "text-red-500",
                icon: (
                  <FaStethoscope className="text-blue-500 mr-4" size={40} />
                ),
              },
              {
                label: "Pedal and Ankle Oedema",
                value: selectedRecord.pedalAndAnkleOedema ? "Yes" : "No",
                color: selectedRecord.pedalAndAnkleOedema
                  ? "text-green-500"
                  : "text-red-500",
                icon: <FaRuler className="text-blue-500 mr-4" size={40} />,
              },
              {
                label: "Tachypnoea",
                value: selectedRecord.tachypnoea ? "Yes" : "No",
                color: selectedRecord.tachypnoea
                  ? "text-green-500"
                  : "text-red-500",
                icon: <FaLungs className="text-blue-500 mr-4" size={40} />,
              },
              {
                label: "Ascites",
                value: selectedRecord.ascites ? "Yes" : "No",
                color: selectedRecord.ascites
                  ? "text-green-500"
                  : "text-red-500",
                icon: <FaTint className="text-blue-500 mr-4" size={40} />,
              },
            ].map((data, index) => (
              <div
                key={index}
                className="flex items-center bg-blue-100 p-4 rounded-lg h-28"
              >
                {data.icon}
                <div>
                  <p className="text-sm font-medium">{data.label}</p>
                  <p className={`text-lg ${data.color}`}>{data.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Back to list button */}
          <button
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => setSelectedRecord(null)}
          >
            Back to List
          </button>
        </div>
      )}
    </div>
  );
};

export default PatientExaminationDataById;
