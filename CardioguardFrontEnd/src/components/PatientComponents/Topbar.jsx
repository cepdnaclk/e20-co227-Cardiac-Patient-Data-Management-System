import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const getRandomGrey = () => {
  const greys = ["#d3d3d3", "#a9a9a9", "#808080", "#696969", "#505050"];
  return greys[Math.floor(Math.random() * greys.length)];
};

const TopBar = ({ patientName, handleLogout }) => {
  const [avatarColor, setAvatarColor] = useState("#d3d3d3");
  const navigate = useNavigate();

  useEffect(() => {
    setAvatarColor(getRandomGrey());
  }, [patientName]);

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  return (
    <div
      className="bg-white p-4 shadow-md flex justify-between items-center"
      style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
    >
      {/* Home Button on the left */}
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-600"
        style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
        onClick={() => navigate("/")} // Use navigate to go to the home page
      >
        Home
      </button>

      {/* Push the logout button and avatar to the right */}
      <div className="flex items-center space-x-4 ml-auto">
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-red-600"
          style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
          onClick={handleLogout} // Call handleLogout function
        >
          Log Out
        </button>

        <div className="flex items-center">
          <div
            className="rounded-full w-10 h-10 flex items-center justify-center text-white"
            style={{
              backgroundColor: avatarColor,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <span className="text-xl font-bold">{getInitial(patientName)}</span>
          </div>
          <p className="ml-3 text-lg font-semibold">
            {patientName || "PatientName"}
          </p>
        </div>
      </div>
    </div>
  );
};

// Define PropTypes
TopBar.propTypes = {
  patientName: PropTypes.string,
  handleLogout: PropTypes.func.isRequired,
};

export default TopBar;
