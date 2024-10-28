import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axiosClient from "../../../../../axios-client";

const DoctorExaminationUpdate = ({
  patientId,
  examinationData,
  onClose,
  fetchData,
}) => {
  // Initialize state for form fields, defaulting to the examinationData or fallback to false/null
  const [formData, setFormData] = useState({
    tachycardiaAtRest: false,
    hypotension: false,
    narrowPulsePressure: false,
    raisedJugularVenousPressure: false,
    displacedApexBeat: false,
    rightVentricularHeave: false,
    pleuralEffusion: false,
    hepatomegaly: false,
    gallopRhythmOnAuscultation: false,
    murmursAssociatedWithValvularHeartDisease: false,
    pedalAndAnkleOedema: false,
    tachypnoea: false,
    ascites: false,
    examinationDate: "",
    examinationCode: "", // Include examinationCode here
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Debugging to see if examinationData is being received
    console.log("Examination Data:", examinationData);

    if (examinationData) {
      setFormData({
        tachycardiaAtRest: examinationData?.tachycardiaAtRest || false,
        hypotension: examinationData?.hypotension || false,
        narrowPulsePressure: examinationData?.narrowPulsePressure || false,
        raisedJugularVenousPressure:
          examinationData?.raisedJugularVenousPressure || false,
        displacedApexBeat: examinationData?.displacedApexBeat || false,
        rightVentricularHeave: examinationData?.rightVentricularHeave || false,
        pleuralEffusion: examinationData?.pleuralEffusion || false,
        hepatomegaly: examinationData?.hepatomegaly || false,
        gallopRhythmOnAuscultation:
          examinationData?.gallopRhythmOnAuscultation || false,
        murmursAssociatedWithValvularHeartDisease:
          examinationData?.murmursAssociatedWithValvularHeartDisease || false,
        pedalAndAnkleOedema: examinationData?.pedalAndAnkleOedema || false,
        tachypnoea: examinationData?.tachypnoea || false,
        ascites: examinationData?.ascites || false,
        examinationDate: examinationData?.examinationDate || "",
        examinationCode: examinationData?.examinationCode || "", // Add examinationCode here as well
      });
    }
  }, [examinationData]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      // Debugging: Check formData values before submission
      console.log("Submitting Form Data:", formData);

      await axiosClient.put(
        `/doctors/${patientId}/examines/${formData.examinationCode}`,
        formData
      );
      fetchData(); // Refresh the examination data
      onClose(); // Close the modal after successful submission
    } catch (err) {
      setError("Failed to update examination data.");
      console.error("Error updating examination data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-bold mb-4">Update Examination Record</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {loading && <p className="text-blue-500">Updating...</p>}

      {/* Add input fields for each form field */}
      <div className="mb-4">
        <label>
          Tachycardia at Rest:
          <input
            type="checkbox"
            name="tachycardiaAtRest"
            checked={formData.tachycardiaAtRest}
            onChange={handleChange}
            className="ml-2"
          />
        </label>
      </div>
      <div className="mb-4">
        <label>
          Hypotension:
          <input
            type="checkbox"
            name="hypotension"
            checked={formData.hypotension}
            onChange={handleChange}
            className="ml-2"
          />
        </label>
      </div>
      <div className="mb-4">
        <label>
          Narrow Pulse Pressure:
          <input
            type="checkbox"
            name="narrowPulsePressure"
            checked={formData.narrowPulsePressure}
            onChange={handleChange}
            className="ml-2"
          />
        </label>
      </div>
      <div className="mb-4">
        <label>
          Raised Jugular Venous Pressure:
          <input
            type="checkbox"
            name="raisedJugularVenousPressure"
            checked={formData.raisedJugularVenousPressure}
            onChange={handleChange}
            className="ml-2"
          />
        </label>
      </div>
      <div className="mb-4">
        <label>
          Displaced Apex Beat:
          <input
            type="checkbox"
            name="displacedApexBeat"
            checked={formData.displacedApexBeat}
            onChange={handleChange}
            className="ml-2"
          />
        </label>
      </div>
      <div className="mb-4">
        <label>
          Right Ventricular Heave:
          <input
            type="checkbox"
            name="rightVentricularHeave"
            checked={formData.rightVentricularHeave}
            onChange={handleChange}
            className="ml-2"
          />
        </label>
      </div>
      <div className="mb-4">
        <label>
          Pleural Effusion:
          <input
            type="checkbox"
            name="pleuralEffusion"
            checked={formData.pleuralEffusion}
            onChange={handleChange}
            className="ml-2"
          />
        </label>
      </div>
      <div className="mb-4">
        <label>
          Hepatomegaly:
          <input
            type="checkbox"
            name="hepatomegaly"
            checked={formData.hepatomegaly}
            onChange={handleChange}
            className="ml-2"
          />
        </label>
      </div>
      <div className="mb-4">
        <label>
          Gallop Rhythm on Auscultation:
          <input
            type="checkbox"
            name="gallopRhythmOnAuscultation"
            checked={formData.gallopRhythmOnAuscultation}
            onChange={handleChange}
            className="ml-2"
          />
        </label>
      </div>
      <div className="mb-4">
        <label>
          Murmurs Associated with Valvular Heart Disease:
          <input
            type="checkbox"
            name="murmursAssociatedWithValvularHeartDisease"
            checked={formData.murmursAssociatedWithValvularHeartDisease}
            onChange={handleChange}
            className="ml-2"
          />
        </label>
      </div>
      <div className="mb-4">
        <label>
          Pedal and Ankle Oedema:
          <input
            type="checkbox"
            name="pedalAndAnkleOedema"
            checked={formData.pedalAndAnkleOedema}
            onChange={handleChange}
            className="ml-2"
          />
        </label>
      </div>
      <div className="mb-4">
        <label>
          Tachypnoea:
          <input
            type="checkbox"
            name="tachypnoea"
            checked={formData.tachypnoea}
            onChange={handleChange}
            className="ml-2"
          />
        </label>
      </div>
      <div className="mb-4">
        <label>
          Ascites:
          <input
            type="checkbox"
            name="ascites"
            checked={formData.ascites}
            onChange={handleChange}
            className="ml-2"
          />
        </label>
      </div>
      <div className="mb-4 col-span-2">
        <label className="block text-gray-700">Examination Date</label>
        <input
          type="date"
          name="examinationDate"
          value={formData.examinationDate}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Update
      </button>
      <button
        type="button"
        onClick={onClose}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
      >
        Cancel
      </button>
    </form>
  );
};

// Define PropTypes for the component
DoctorExaminationUpdate.propTypes = {
  patientId: PropTypes.string.isRequired,
  examinationData: PropTypes.shape({
    tachycardiaAtRest: PropTypes.bool,
    hypotension: PropTypes.bool,
    narrowPulsePressure: PropTypes.bool,
    raisedJugularVenousPressure: PropTypes.bool,
    displacedApexBeat: PropTypes.bool,
    rightVentricularHeave: PropTypes.bool,
    pleuralEffusion: PropTypes.bool,
    hepatomegaly: PropTypes.bool,
    gallopRhythmOnAuscultation: PropTypes.bool,
    murmursAssociatedWithValvularHeartDisease: PropTypes.bool,
    pedalAndAnkleOedema: PropTypes.bool,
    tachypnoea: PropTypes.bool,
    ascites: PropTypes.bool,
    examinationDate: PropTypes.string,
    examinationCode: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default DoctorExaminationUpdate;
