import { useState } from "react";
import axiosClient from "../../axios-client";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import useStateContext from "../contexts/useStateContext";

export default function LoginPage() {
  const { setUser, setToken } = useStateContext();
  const navigate = useNavigate();
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [formErrors, setFormErrors] = useState(false);

  const validateUsername = (username) => {
    return username.trim().length > 0; // Basic non-empty validation
  };

  const validatePassword = (password) => {
    return password.length >= 8; // Updated password length validation
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");

    // Reset previous error messages
    setUsernameError("");
    setPasswordError("");
    setGeneralError("");
    setFormErrors(false);

    // Validate form inputs
    let isValid = true;

    if (!validateUsername(username)) {
      setUsernameError("Please enter a valid username.");
      isValid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters long.");
      isValid = false;
    }

    // If validation fails, don't proceed with login
    if (!isValid) {
      setFormErrors(true);
      return;
    }

    // Proceed with login if validation passes
    const loginData = {
      username,
      password,
    };

    try {
      const { data } = await axiosClient.post("/auth/login", loginData);
      let userdata = data.userRoles[0];

      setUser(userdata);
      setToken(data.accessToken);

      switch (userdata.role) {
        case "ADMIN":
          navigate("/admin");
          break;
        case "USER":
          navigate("/patient");
          break;
        case "DOCTOR":
          navigate("/doctor");
          break;
        default:
          navigate("/");
          break;
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setGeneralError("Invalid username or password. Please try again.");
        } else if (error.response.status === 404) {
          setGeneralError("Invalid username or password. Please try again.");
        } else if (error.response.status === 500) {
          setGeneralError("Server error. Please try again later.");
        } else {
          setGeneralError("An unexpected error occurred. Please try again.");
        }
      } else {
        setGeneralError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-xs bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-col items-center">
            <div className="bg-gray-800 text-white rounded-full p-4 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c.381 0 .762-.141 1.061-.439l.939-.939M15.5 12.5L18 15m0 0l-3 3m3-3H9m6 0v2m-2-3l-1.5-1.5m2.5-3.5V6a2 2 0 10-4 0v2m0 4l-1.5-1.5"
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold mb-4">Log In</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username field */}
            <div>
              <label
                htmlFor="username"
                className="block text-gray-700 font-medium mb-2"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className={`w-full px-3 py-2 border ${
                  usernameError ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                  usernameError ? "focus:ring-red-500" : "focus:ring-indigo-500"
                }`}
              />
              {usernameError && (
                <p className="text-red-500 text-sm mt-1">{usernameError}</p>
              )}
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={`w-full px-3 py-2 border ${
                  passwordError ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                  passwordError ? "focus:ring-red-500" : "focus:ring-indigo-500"
                }`}
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            {/* General error */}
            {generalError && (
              <p className="text-red-500 text-sm text-center mt-2">
                {generalError}
              </p>
            )}

            <div>
              <button
                type="submit"
                className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 ${
                  formErrors ? "opacity-75 cursor-not-allowed" : ""
                }`}
                disabled={formErrors}
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
