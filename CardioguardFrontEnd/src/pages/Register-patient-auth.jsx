import axiosClient from "../../axios-client"; // Adjust the import based on your project structure
import { useNavigate, useLocation, Link } from "react-router-dom"; // Import useNavigate and useLocation
import { useState } from "react";

export default function RegisterUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const { patientId } = location.state || {}; // Extract patientId from location state

  const [values, setValues] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0); // Add passwordStrength state
  const [passwordTips, setPasswordTips] = useState([]); // Add password tips state

  const validate = () => {
    let tempError = {};
    tempError.username = values.username ? "" : "This field is required";
    tempError.password = values.password
      ? values.password.length >= 8
        ? ""
        : "Password must be at least 8 characters"
      : "This field is required";
    setErrors(tempError);
    return Object.values(tempError).every((x) => x === "");
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    let tips = [];

    if (password.length >= 8) strength += 25;
    else tips.push("Password should be at least 8 characters long");

    if (/[A-Z]/.test(password)) strength += 25;
    else tips.push("Include at least one uppercase letter");

    if (/[a-z]/.test(password)) strength += 25;
    else tips.push("Include at least one lowercase letter");

    if (/[0-9]/.test(password)) strength += 15;
    else tips.push("Include at least one number");

    if (/[^A-Za-z0-9]/.test(password)) strength += 10;
    else tips.push("Include at least one special character");

    setPasswordStrength(strength);
    setPasswordTips(tips);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setValues({ ...values, password });
    checkPasswordStrength(password); // Call password strength checker
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    const loginData = {
      username: values.username,
      password: values.password,
    };

    try {
      console.log(`Submitting to: /auth/register/patient/${patientId}`);
      console.log("Submitting registration data:", loginData);

      await axiosClient.post(`/auth/register/patient/${patientId}`, loginData);

      console.log("Registration successful, navigating to login page.");
      navigate("/login");
    } catch (error) {
      console.error("There was an error with the registration:", error);
    }
  };

  const getStrengthMessage = () => {
    if (passwordStrength <= 25) return "Very Weak";
    if (passwordStrength <= 50) return "Weak";
    if (passwordStrength <= 75) return "Moderate";
    return "Strong";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-indigo-600 text-white p-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c.381 0 .762-.141 1.061-.439l.939-.939M15.5 12.5L18 15m0 0l-3 3m3-3H9m6 0v2m-2-3l-1.5-1.5m2.5-3.5V6a2 2 0 10-4 0v2m0 4l-1.5-1.5"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-gray-700">
            Register
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={values.username}
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
              autoComplete="username"
              required
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={handlePasswordChange} // Use handlePasswordChange function
              autoComplete="current-password"
              required
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}

            {/* Password Strength Meter */}
            <div className="mt-2">
              <div className="w-full bg-gray-300 rounded-md">
                <div
                  style={{ width: `${passwordStrength}%` }}
                  className={`h-2 rounded-md ${
                    passwordStrength < 50 ? "bg-red-500" : "bg-green-500"
                  }`}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Password Strength: {getStrengthMessage()}
              </p>
            </div>

            {/* Password Tips */}
            {passwordTips.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                <p>To strengthen your password, include:</p>
                <ul className="list-disc ml-4">
                  {passwordTips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex justify-center items-center">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor="remember"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={passwordStrength < 75} // Disable until strong password
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                passwordStrength < 75
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              }`}
            >
              Register
            </button>
          </div>

          <div className="flex justify-between">
            <Link
              to="/terms"
              className="text-sm text-indigo-600 hover:underline"
            >
              Terms and Conditions
            </Link>
            <Link
              to="/login"
              className="text-sm text-indigo-600 hover:underline"
            >
              Already have an account? Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
