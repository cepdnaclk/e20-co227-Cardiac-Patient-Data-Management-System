import { useState } from "react";
import MachineLearningData from "../components/MachineLerningDataForm";

const PredictionButton = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className="bg-orange-500 text-white text-lg py-2 px-6 rounded-md transition-all duration-300 ease-in-out hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
        onClick={handleClick}
      >
        Predict
      </button>
      {showMenu && <MachineLearningData />}
    </div>
  );
};

export default PredictionButton;
