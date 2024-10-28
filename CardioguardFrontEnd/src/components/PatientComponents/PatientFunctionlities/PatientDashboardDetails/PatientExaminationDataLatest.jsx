import { useState, useEffect } from "react";
import axiosClient from "../../../../../axios-client";
import {
  FaHeartbeat,
  FaLungs,
  FaTint,
  FaRuler,
  FaStethoscope,
  FaArrowUp,
} from "react-icons/fa"; // Import relevant icons
import PropTypes from "prop-types";

const PatientExaminationDataById = ({ patientId }) => {
  const [clinicalData, setClinicalData] = useState(null); // Single object now
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchClinicalData = async () => {
    try {
      setLoading(true);
      setError(null);
      setClinicalData(null);

      // Fetch clinical data
      const clinicalDataResponse = await axiosClient.get(
        `/doctors/${patientId}/examines`
      );

      if (clinicalDataResponse.data && clinicalDataResponse.data.length > 0) {
        // Find the latest examination entry by examinationCode
        const latestData = clinicalDataResponse.data.reduce((prev, current) => {
          return prev.examinationCode > current.examinationCode
            ? prev
            : current;
        });

        setClinicalData(latestData);
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
  };

  useEffect(() => {
    // Automatically fetch data on component load
    fetchClinicalData();
  }, [patientId]); // Added patientId as dependency to refetch if patientId changes

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-5xl">
      <h1 className="text-2xl font-bold text-center mb-6">
        Latest Examination Data
      </h1>

      {/* Error message */}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      {/* Display clinical data */}
      {clinicalData && (
        <div className="bg-gray-50 rounded-md p-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                label: "Tachycardia at Rest",
                value: clinicalData.tachycardiaAtrest ? "Yes" : "No",
                color: clinicalData.tachycardiaAtrest
                  ? "text-green-500"
                  : "text-red-500",
                icon: <FaHeartbeat className="text-blue-500 mr-4" size={40} />,
              },
              {
                label: "Hypotension",
                value: clinicalData.hypotention ? "Yes" : "No",
                color: clinicalData.hypotention
                  ? "text-green-500"
                  : "text-red-500",
                icon: (
                  <FaStethoscope className="text-blue-500 mr-4" size={40} />
                ),
              },
              {
                label: "Raised Jugular Venous Pressure",
                value: clinicalData.raisedJugularVenousPressure ? "Yes" : "No",
                color: clinicalData.raisedJugularVenousPressure
                  ? "text-green-500"
                  : "text-red-500",
                icon: <FaArrowUp className="text-blue-500 mr-4" size={40} />,
              },
              {
                label: "Displaced Apex Beat",
                value: clinicalData.displacedApexBeat ? "Yes" : "No",
                color: clinicalData.displacedApexBeat
                  ? "text-green-500"
                  : "text-red-500",
                icon: <FaHeartbeat className="text-blue-500 mr-4" size={40} />,
              },
              {
                label: "Right Ventricular Heave",
                value: clinicalData.rightVenticularHeave ? "Yes" : "No",
                color: clinicalData.rightVenticularHeave
                  ? "text-green-500"
                  : "text-red-500",
                icon: <FaLungs className="text-blue-500 mr-4" size={40} />,
              },
              {
                label: "Pleural Effusion",
                value: clinicalData.pleuralEffusion ? "Yes" : "No",
                color: clinicalData.pleuralEffusion
                  ? "text-green-500"
                  : "text-red-500",
                icon: <FaLungs className="text-blue-500 mr-4" size={40} />,
              },
              {
                label: "Hepatomegaly",
                value: clinicalData.hepatomegaly ? "Yes" : "No",
                color: clinicalData.hepatomegaly
                  ? "text-green-500"
                  : "text-red-500",
                icon: <FaTint className="text-blue-500 mr-4" size={40} />,
              },
              {
                label: "Gallop Rhythm on Auscultation",
                value: clinicalData.gallopRhythmOnAuscultation ? "Yes" : "No",
                color: clinicalData.gallopRhythmOnAuscultation
                  ? "text-green-500"
                  : "text-red-500",
                icon: (
                  <FaStethoscope className="text-blue-500 mr-4" size={40} />
                ),
              },
              {
                label: "Pedal and Ankle Oedema",
                value: clinicalData.pedalAndAnkleOedema ? "Yes" : "No",
                color: clinicalData.pedalAndAnkleOedema
                  ? "text-green-500"
                  : "text-red-500",
                icon: <FaRuler className="text-blue-500 mr-4" size={40} />,
              },
              {
                label: "Tachypnoea",
                value: clinicalData.tachypnoea ? "Yes" : "No",
                color: clinicalData.tachypnoea
                  ? "text-green-500"
                  : "text-red-500",
                icon: <FaLungs className="text-blue-500 mr-4" size={40} />,
              },
              {
                label: "Ascites",
                value: clinicalData.ascites ? "Yes" : "No",
                color: clinicalData.ascites ? "text-green-500" : "text-red-500",
                icon: <FaTint className="text-blue-500 mr-4" size={40} />,
              },
              {
                label: "Examination Date",
                value: clinicalData.examinationDate
                  ? new Date(clinicalData.examinationDate).toLocaleDateString()
                  : "N/A",
                color: "text-gray-700",
                icon: (
                  <FaStethoscope className="text-blue-500 mr-4" size={40} />
                ),
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
        </div>
      )}

      {/* No data message */}
      {!clinicalData && !loading && !error && (
        <p className="text-gray-600 text-center">
          No examination data available.
        </p>
      )}
    </div>
  );
};

PatientExaminationDataById.propTypes = {
  patientId: PropTypes.number.isRequired,
};

export default PatientExaminationDataById;
