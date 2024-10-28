import { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function RegisterPage() {
  const [data, setData] = useState({
    nic: "",
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
  });

  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // New state for button disabling
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "firstName":
        if (!value) error = "First Name is required.";
        else if (!/^[a-zA-Z]+$/.test(value))
          error = "First Name must contain only letters.";
        break;
      case "lastName":
        if (!value) error = "Last Name is required.";
        else if (!/^[a-zA-Z]+$/.test(value))
          error = "Last Name must contain only letters.";
        break;
      case "nic":
        if (!value) error = "National ID is required.";
        break;
      case "gender":
        if (!value) error = "Gender is required.";
        break;
      case "dateOfBirth":
        if (!value) error = "Date of Birth is required.";
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  // Function to check if all fields are filled
  useEffect(() => {
    const isFormValid =
      data.firstName &&
      data.lastName &&
      data.nic &&
      data.gender &&
      data.dateOfBirth &&
      Object.values(errors).every((error) => error === "");

    setIsButtonDisabled(!isFormValid);
  }, [data, errors]); // Update button state when data or errors change

  const validate = () => {
    let tempErrors = {};
    Object.keys(data).forEach((key) => {
      tempErrors[key] = validateField(key, data[key]);
    });
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      axiosClient
        .post("/patients", data)
        .then((response) => {
          const patientId = response.data.patientId;
          navigate("/register-user", { state: { patientId } });
        })
        .catch((error) => {
          console.error("There was an error submitting the data:", error);
        });
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 space-y-6">
          <h1 className="text-xl font-bold mb-6 text-center">Register</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={data.firstName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                    errors.firstName
                      ? "focus:ring-red-500"
                      : "focus:ring-indigo-500"
                  }`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={data.lastName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                    errors.lastName
                      ? "focus:ring-red-500"
                      : "focus:ring-indigo-500"
                  }`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">National ID</label>
              <input
                type="text"
                name="nic"
                value={data.nic}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.nic ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                  errors.nic ? "focus:ring-red-500" : "focus:ring-indigo-500"
                }`}
              />
              {errors.nic && (
                <p className="text-red-500 text-sm mt-1">{errors.nic}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Gender</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={data.gender === "male"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Male
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={data.gender === "female"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Female
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={data.gender === "other"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Other
                </label>
              </div>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={data.dateOfBirth}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                  errors.dateOfBirth
                    ? "focus:ring-red-500"
                    : "focus:ring-indigo-500"
                }`}
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dateOfBirth}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-indigo-600"
              />
              <span>
                I want to receive inspiration, marketing promotions, and updates
                via email.
              </span>
            </div>

            <button
              type="submit"
              className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-lg transition duration-300 ${
                isButtonDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-indigo-700"
              }`}
              disabled={isButtonDisabled} // Button disabled state
            >
              Next
            </button>

            <div className="text-center mt-4">
              <Link to="/login" className="text-indigo-500 hover:underline">
                Already have an account? Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
