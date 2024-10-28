import { useState } from "react";
import NavBar from "../NavBar";

function GetAdvice() {
  const [condition, setCondition] = useState("");
  const [duration, setDuration] = useState("");
  const [severity, setSeverity] = useState("");
  const [advice, setAdvice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    generateAdvice();
  };

  const generateAdvice = () => {
    if (
      condition === "Headache" &&
      duration === "1 hour" &&
      severity === "Mild"
    ) {
      setAdvice(
        "Rest in a quiet, dark room. Drink water and take a mild pain reliever like ibuprofen if needed."
      );
    } else if (
      condition === "Headache" &&
      duration === "2 hours" &&
      severity === "Severe"
    ) {
      setAdvice(
        "Consider seeing a doctor if the headache is intense or accompanied by vision problems or dizziness."
      );
    } else if (
      condition === "Headache" &&
      duration === "1 day" &&
      severity === "Moderate"
    ) {
      setAdvice(
        "Apply a cold compress to your forehead and keep hydrated. Rest and limit screen time."
      );

      // Stomach Pain
    } else if (
      condition === "Stomach Pain" &&
      duration === "1 hour" &&
      severity === "Mild"
    ) {
      setAdvice(
        "Drink water and rest. Avoid solid food for a few hours and stick to a bland diet if the pain persists."
      );
    } else if (
      condition === "Stomach Pain" &&
      duration === "3 days" &&
      severity === "Severe"
    ) {
      setAdvice(
        "Seek medical attention immediately. Severe stomach pain lasting more than 24 hours can indicate a serious issue."
      );
    } else if (
      condition === "Stomach Pain" &&
      duration === "2 days" &&
      severity === "Moderate"
    ) {
      setAdvice(
        "Avoid spicy or greasy foods, and try gentle heat on the abdomen. Monitor for changes."
      );

      // Fever
    } else if (
      condition === "Fever" &&
      duration === "1 day" &&
      severity === "Mild"
    ) {
      setAdvice(
        "Stay hydrated, rest, and take paracetamol or ibuprofen if needed. Monitor for worsening symptoms."
      );
    } else if (
      condition === "Fever" &&
      duration === "2 days" &&
      severity === "Moderate"
    ) {
      setAdvice(
        "Continue hydration and monitor your temperature. Seek medical advice if fever persists or exceeds 102°F (39°C)."
      );

      // Cold
    } else if (
      condition === "Cold" &&
      duration === "2 days" &&
      severity === "Moderate"
    ) {
      setAdvice(
        "Get plenty of rest, drink fluids, and use over-the-counter cold remedies for symptoms. Consult a doctor if it worsens."
      );
    } else if (
      condition === "Cold" &&
      duration === "1 week" &&
      severity === "Severe"
    ) {
      setAdvice(
        "If symptoms worsen or do not improve, consider seeing a healthcare provider for evaluation."
      );

      // Back Pain
    } else if (
      condition === "Back Pain" &&
      duration === "1 week" &&
      severity === "Moderate"
    ) {
      setAdvice(
        "Maintain proper posture, avoid heavy lifting, and consider gentle stretching exercises. Seek medical advice if it persists."
      );
    } else if (
      condition === "Back Pain" &&
      duration === "1 month" &&
      severity === "Severe"
    ) {
      setAdvice(
        "Consult a doctor or physiotherapist for a tailored treatment plan and possible imaging tests."
      );

      // Sore Throat
    } else if (
      condition === "Sore Throat" &&
      duration === "2 days" &&
      severity === "Mild"
    ) {
      setAdvice(
        "Gargle with warm salt water, stay hydrated, and use throat lozenges. Avoid straining your voice."
      );
    } else if (
      condition === "Sore Throat" &&
      duration === "1 week" &&
      severity === "Severe"
    ) {
      setAdvice(
        "If accompanied by fever or difficulty swallowing, seek medical attention."
      );

      // Cough
    } else if (
      condition === "Cough" &&
      duration === "3 hours" &&
      severity === "Mild"
    ) {
      setAdvice(
        "Stay hydrated and avoid irritants like smoke. Use cough drops and consider honey to soothe your throat."
      );
    } else if (
      condition === "Cough" &&
      duration === "1 week" &&
      severity === "Moderate"
    ) {
      setAdvice(
        "Consider over-the-counter cough syrup. If symptoms persist, see a healthcare professional."
      );
    } else if (
      condition === "Cough" &&
      duration === "3 days" &&
      severity === "Severe"
    ) {
      setAdvice(
        "Persistent coughs could indicate a respiratory infection or other issue. Consult a doctor for further advice."
      );

      // Nausea
    } else if (
      condition === "Nausea" &&
      duration === "1 hour" &&
      severity === "Mild"
    ) {
      setAdvice(
        "Try ginger tea or peppermint to soothe your stomach. Rest in a comfortable position."
      );
    } else if (
      condition === "Nausea" &&
      duration === "2 days" &&
      severity === "Severe"
    ) {
      setAdvice(
        "If nausea persists or is accompanied by vomiting, consult a healthcare professional."
      );

      // Fatigue
    } else if (
      condition === "Fatigue" &&
      duration === "1 week" &&
      severity === "Mild"
    ) {
      setAdvice(
        "Ensure you are getting enough sleep and consider reducing stress. Monitor your diet and hydration."
      );
    } else if (
      condition === "Fatigue" &&
      duration === "1 month" &&
      severity === "Severe"
    ) {
      setAdvice(
        "Chronic fatigue may require medical evaluation to rule out underlying health conditions."
      );

      // General Advice
    } else {
      setAdvice(
        "Please provide more specific information or consult a medical professional."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto mt-8 p-6">
        <h1 className="text-2xl font-bold text-center mb-8">
          Get Medical Advice
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Input Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Condition:
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                >
                  <option value="">Select Condition</option>
                  <option value="Headache">Headache</option>
                  <option value="Stomach Pain">Stomach Pain</option>
                  <option value="Cold">Cold</option>
                  <option value="Fever">Fever</option>
                  <option value="Back Pain">Back Pain</option>
                  <option value="Sore Throat">Sore Throat</option>
                  <option value="Cough">Cough</option>
                  {/* Add more conditions as needed */}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Duration:
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                >
                  <option value="">Select Duration</option>
                  <option value="1 hour">1 hour</option>
                  <option value="2 hours">2 hours</option>
                  <option value="3 hours">3 hours</option>
                  <option value="1 day">1 day</option>
                  <option value="2 days">2 days</option>
                  <option value="3 days">3 days</option>
                  <option value="1 week">1 week</option>
                  {/* Add more duration options as needed */}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Severity:
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                >
                  <option value="">Select Severity</option>
                  <option value="Mild">Mild</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe">Severe</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Get Advice
              </button>
            </form>
          </div>

          {/* Advice Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Advice:</h2>
            <div className="text-gray-700">
              {advice ? (
                <p>{advice}</p>
              ) : (
                <p>Please fill out the form to receive medical advice.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetAdvice;
