import { useState } from "react";
import axiosClient from "../../axios-client"; // Updated path for axiosClient
// import { useNavigate } from "react-router-dom";

const DoctorExaminationDataSubmission = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    tachycardiaAtrest: false,
    hypotention: false,
    narrowPulsePressure: false,
    raisedJugularVenousPressure: false,
    displacedApexBeat: false,
    rightVenticularHeave: false,
    pleuralEffusion: false,
    hepatomegaly: false,
    gallopRhythmOnAuscultation: false,
    murmursAssociatedWithValvularHeartDisease: false,
    pedalAndAnkleOedema: false,
    tachypnoea: false,
    ascites: false,
    examinationDate: "",
  });

  //   const navigate = useNavigate();

  // Handle input changes
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Log the form data for debugging
    console.log("Patient details submitted:", formData);

    try {
      // Assume patientId is obtained or defined elsewhere
      const patientId = 1;
      await axiosClient.post(`/doctors/${patientId}/examines`, formData);
      console.log("Patient Examines added successfully");
      //   navigate(-1); // Navigate to the previous page
    } catch (error) {
      console.error("There was an error with the registration:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-orange-300">
      <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-8">
          Patient Examination Submission Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { id: "tachycardiaAtrest", label: "Tachycardia at Rest" },
              { id: "hypotention", label: "Hypotention" },
              { id: "narrowPulsePressure", label: "Narrow Pulse Pressure" },
              {
                id: "raisedJugularVenousPressure",
                label: "Raised Jugular Venous Pressure",
              },
              { id: "displacedApexBeat", label: "Displaced Apex Beat" },
              {
                id: "rightVenticularHeave",
                label: "Right Venticular Heave",
              },
              { id: "pleuralEffusion", label: "Pleural Effusion" },
              { id: "hepatomegaly", label: "Hepatomegaly" },
              {
                id: "gallopRhythmOnAuscultation",
                label: "Gallop Rhythm on Auscultation",
              },
              {
                id: "murmursAssociatedWithValvularHeartDisease",
                label: "Murmurs Associated with Valvular Heart Disease",
              },
              {
                id: "pedalAndAnkleOedema",
                label: "Pedal and Ankle Oedema",
              },
              { id: "tachypnoea", label: "Tachypnoea" },
              { id: "ascites", label: "Ascites" },
            ].map((field) => (
              <div key={field.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={field.id}
                  name={field.id}
                  checked={formData[field.id]}
                  onChange={handleChange}
                  className="cursor-pointer"
                />
                <label
                  htmlFor={field.id}
                  className="block text-sm font-bold text-gray-700"
                >
                  {field.label}
                </label>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label
              htmlFor="examinationDate"
              className="block text-sm font-bold text-gray-700"
            >
              Examination Date:
              <input
                type="datetime-local"
                name="examinationDate"
                value={formData.examinationDate}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </label>
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-orange-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorExaminationDataSubmission;
