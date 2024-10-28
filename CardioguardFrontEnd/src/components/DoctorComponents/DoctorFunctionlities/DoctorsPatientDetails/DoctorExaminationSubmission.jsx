import { useState } from "react";
import PropTypes from "prop-types";
import axiosClient from "../../../../../axios-client";

const DoctorExaminationSubmission = ({ patientId, onClose }) => {
  const [formData, setFormData] = useState({
    tachycardiaAtRest: false,
    hypotension: false,
    raisedJugularVenousPressure: false,
    displacedApexBeat: false,
    pedalAndAnkleOedema: false,
    gallopRhythm: false,
    tachypnoea: false,
    ascites: false,
    examinationDate: "",
  });

  const handleChange = (event) => {
    const { name, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Doctor examination details submitted:", formData);

    try {
      const formattedData = {
        ...formData,
        examinationDate: new Date(formData.examinationDate).toISOString(),
      };

      await axiosClient.post(`/doctors/${patientId}/examines`, formattedData);
      console.log("Submission successful, navigating to the previous page.");
      onClose(); // Close the modal
    } catch (error) {
      console.error("There was an error with the submission:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          Doctor Examination Submission Form
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Tachycardia at Rest */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="tachycardiaAtRest"
              checked={formData.tachycardiaAtRest}
              onChange={handleChange}
              className="cursor-pointer"
            />
            <label htmlFor="tachycardiaAtRest" className="text-gray-700">
              Tachycardia at Rest
            </label>
          </div>

          {/* Hypotension */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="hypotension"
              checked={formData.hypotension}
              onChange={handleChange}
              className="cursor-pointer"
            />
            <label htmlFor="hypotension" className="text-gray-700">
              Hypotension
            </label>
          </div>

          {/* Raised Jugular Venous Pressure */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="raisedJugularVenousPressure"
              checked={formData.raisedJugularVenousPressure}
              onChange={handleChange}
              className="cursor-pointer"
            />
            <label
              htmlFor="raisedJugularVenousPressure"
              className="text-gray-700"
            >
              Raised Jugular Venous Pressure
            </label>
          </div>

          {/* Displaced Apex Beat */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="displacedApexBeat"
              checked={formData.displacedApexBeat}
              onChange={handleChange}
              className="cursor-pointer"
            />
            <label htmlFor="displacedApexBeat" className="text-gray-700">
              Displaced Apex Beat
            </label>
          </div>

          {/* Pedal and Ankle Oedema */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="pedalAndAnkleOedema"
              checked={formData.pedalAndAnkleOedema}
              onChange={handleChange}
              className="cursor-pointer"
            />
            <label htmlFor="pedalAndAnkleOedema" className="text-gray-700">
              Pedal and Ankle Oedema
            </label>
          </div>

          {/* Gallop Rhythm */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="gallopRhythm"
              checked={formData.gallopRhythm}
              onChange={handleChange}
              className="cursor-pointer"
            />
            <label htmlFor="gallopRhythm" className="text-gray-700">
              Gallop Rhythm
            </label>
          </div>

          {/* Tachypnoea */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="tachypnoea"
              checked={formData.tachypnoea}
              onChange={handleChange}
              className="cursor-pointer"
            />
            <label htmlFor="tachypnoea" className="text-gray-700">
              Tachypnoea
            </label>
          </div>

          {/* Ascites */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="ascites"
              checked={formData.ascites}
              onChange={handleChange}
              className="cursor-pointer"
            />
            <label htmlFor="ascites" className="text-gray-700">
              Ascites
            </label>
          </div>

          {/* Examination Date */}
          <div className="flex flex-col">
            <label htmlFor="examinationDate" className="text-gray-700">
              Examination Date:
            </label>
            <input
              type="date"
              name="examinationDate"
              value={formData.examinationDate}
              onChange={handleChange}
              className="p-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

DoctorExaminationSubmission.propTypes = {
  patientId: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DoctorExaminationSubmission;
