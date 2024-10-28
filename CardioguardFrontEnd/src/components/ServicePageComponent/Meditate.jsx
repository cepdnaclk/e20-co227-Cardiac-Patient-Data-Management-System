import { useState } from "react";
import NavBar from "../NavBar";

function Meditate() {
  const [condition, setCondition] = useState("");
  const [age, setAge] = useState("");
  const [activity, setActivity] = useState("");
  const [advice, setAdvice] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    generateMeditationAdvice();
  };

  const generateMeditationAdvice = () => {
    // Base advice logic based on condition
    if (condition === "Stress") {
      setAdvice(
        "Try deep breathing exercises or progressive muscle relaxation. Focus on clearing your mind and breathing slowly."
      );
      setVideoUrl("https://www.youtube.com/watch?v=inpok4MKVLM"); // Example: 10-Minute Meditation for Stress
    } else if (condition === "Anxiety") {
      setAdvice(
        "Consider mindfulness meditation or body scan meditation to help reduce anxiety and focus on the present moment."
      );
      setVideoUrl("https://www.youtube.com/watch?v=O-6f5wQXSu8"); // Example: Meditation for Anxiety
    } else if (condition === "Insomnia") {
      setAdvice(
        "Practice a guided sleep meditation or visualization techniques to help you relax and fall asleep."
      );
      setVideoUrl("https://www.youtube.com/watch?v=ZToicYcHIOU"); // Example: Sleep Meditation
    } else if (condition === "Low Energy") {
      setAdvice(
        "Try energizing meditations with focused breathing to help increase alertness and reduce fatigue."
      );
      setVideoUrl("https://www.youtube.com/watch?v=Yzm3fA2HhkQ"); // Example: Morning Meditation for Energy
    } else {
      setAdvice("Please choose a condition to receive meditation advice.");
      setVideoUrl("");
    }

    // Additional logic based on activity and age
    if (activity === "Going to bed") {
      setAdvice(
        (prev) =>
          prev +
          " Consider a guided meditation to calm your mind and prepare for restful sleep."
      );
    } else if (activity === "Working") {
      setAdvice(
        (prev) =>
          prev +
          " Try a short mindfulness break to refocus and reduce tension while working."
      );
    } else if (activity === "Driving") {
      setAdvice(
        (prev) =>
          prev +
          " Focus on deep, calming breaths and stay attentive. Avoid closing your eyes."
      );
    } else if (activity === "Cooking") {
      setAdvice(
        (prev) =>
          prev +
          " Practice mindful cooking by being fully present in the task and enjoying the process."
      );
    }

    if (age && parseInt(age) > 60) {
      setAdvice(
        (prev) =>
          prev +
          " As an older adult, focus on gentle, calming meditation to promote relaxation and stress relief."
      );
    } else if (age && parseInt(age) < 18) {
      setAdvice(
        (prev) =>
          prev +
          " For younger individuals, consider using meditation apps with fun, engaging guides."
      );
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex">
        {/* Left side: Input form */}
        <div className="w-1/2 p-8">
          <h1 className="text-2xl font-bold mb-4">Meditation Advice</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              Condition:
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="block w-full mt-2 p-2 border border-gray-300 rounded"
              >
                <option value="">Select Condition</option>
                <option value="Stress">Stress</option>
                <option value="Anxiety">Anxiety</option>
                <option value="Insomnia">Insomnia</option>
                <option value="Low Energy">Low Energy</option>
                {/* Add more conditions as needed */}
              </select>
            </label>

            <label className="block">
              Age:
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="block w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </label>

            <label className="block">
              What are you doing now?
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="block w-full mt-2 p-2 border border-gray-300 rounded"
              >
                <option value="">Select Activity</option>
                <option value="Going to bed">Going to bed</option>
                <option value="Working">Working</option>
                <option value="Driving">Driving</option>
                <option value="Cooking">Cooking</option>
                {/* Add more activities as needed */}
              </select>
            </label>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
            >
              Get Advice
            </button>
          </form>
        </div>

        {/* Right side: Advice and video */}
        <div className="w-1/2 p-8 bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">
            Your Meditation Advice:
          </h2>
          {advice && (
            <div className="mb-4">
              <p>{advice}</p>
            </div>
          )}
          {videoUrl && (
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Recommended Meditation Video:
              </h3>
              <iframe
                width="100%"
                height="315"
                src={videoUrl}
                title="YouTube Meditation Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Meditate;
