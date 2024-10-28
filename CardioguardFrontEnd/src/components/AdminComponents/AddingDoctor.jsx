import { useState } from "react";
import axiosClient from "../../../axios-client";
import { useNavigate } from "react-router-dom";

const CreateDoctorForm = () => {
  const [doctorData, setDoctorData] = useState({
    nic: "",
    surname: "",
    lastName: "",
  });

  const [authData, setAuthData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track if form is being submitted
  const [popupMessage, setPopupMessage] = useState(""); // Popup message content
  const [isDoctorCreated, setIsDoctorCreated] = useState(false); // State to track doctor creation
  const navigate = useNavigate();

  // Handle changes for doctorData (NIC, surname, last name)
  const handleChangeDoctorData = (e) => {
    setDoctorData({
      ...doctorData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle changes for authData (username, password)
  const handleChangeAuthData = (e) => {
    setAuthData({
      ...authData,
      [e.target.name]: e.target.value,
    });

    // Clear the password error if user starts typing in the password field again
    if (e.target.name === "password") {
      setPasswordError(null);
    }
  };

  // Function to validate password
  const isValidPassword = (password) => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/; // Checks for special characters
    return password.length >= 8 && specialCharRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (
      !doctorData.nic ||
      !doctorData.surname ||
      !doctorData.lastName ||
      !authData.username ||
      !authData.password
    ) {
      setError("All fields are required.");
      return;
    }

    // Validate password strength
    if (!isValidPassword(authData.password)) {
      setPasswordError(
        "* Password must be at least 8 characters long and contain at least one special character."
      );
      return;
    }

    // Clear any previous error
    setError(null);
    setPasswordError(null); // Clear password error if validation passes

    // Show "Creating..." popup
    setIsSubmitting(true);
    setPopupMessage("Creating...");

    try {
      // First request: Create doctor
      console.log("Submitting doctor data:", doctorData);
      const createDoctorResponse = await axiosClient.post(
        "/admin/createDoctor",
        doctorData
      );
      const doctorId = createDoctorResponse.data.doctorId;
      console.log("Doctor created successfully:", createDoctorResponse.data);

      // Second request: Register doctor with auth data
      try {
        const authResponse = await axiosClient.post(
          `/auth/register/doctor/${doctorId}`,
          authData
        );
        console.log("Doctor registered successfully:", authResponse.data);

        // Update popup message to success
        setPopupMessage("Doctor created and registered successfully.");
        setError(null);
        setSuccessMessage("Doctor successfully created!"); // Set success message

        // Set doctor creation success flag
        setIsDoctorCreated(true);

        // Hide success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage(null); // Clear the success message after 3 seconds
          setIsDoctorCreated(false); // Reset the doctor creation flag
          navigate("/admin/doctors"); // Navigate back to the doctors list page
        }, 3000); // Delay of 3 seconds
      } catch (authError) {
        console.error("Error registering doctor:", authError);

        // If registration fails, delete the created doctor
        await axiosClient.delete(`/admin/delete/doctor/${doctorId}`);
        console.log(
          `Doctor with ID ${doctorId} deleted due to registration failure.`
        );

        setError(
          "Doctor creation succeeded, but registration failed. Doctor deleted."
        );
        setSuccessMessage(null);
        setIsSubmitting(false); // Close popup on failure
      }
    } catch (error) {
      console.error("Error creating doctor:", error);

      // Handle NIC already exists error
      if (error.response && error.response.status === 500) {
        const errorMessage = error.response.data;
        if (errorMessage.includes("already exists")) {
          setError("NIC already exists. Please use a unique NIC.");
        } else {
          setError("Failed to create doctor. Please try again.");
        }
      } else {
        setError("Failed to create doctor. Please try again.");
      }

      setSuccessMessage(null);
      setIsSubmitting(false); // Close popup on failure
    }
  };

  return (
    <div>
      {/* Success message displayed on top */}
      {isDoctorCreated && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white p-4 text-center">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create New Doctor
        </h2>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        {successMessage && (
          <p className="text-green-600 mb-4 text-center">{successMessage}</p>
        )}

        {/* Doctor Data Fields */}
        <div className="mb-4">
          <label
            htmlFor="nic"
            className="block text-sm font-medium text-gray-700"
          >
            NIC
          </label>
          <input
            type="text"
            name="nic"
            id="nic"
            value={doctorData.nic}
            onChange={handleChangeDoctorData}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="surname"
            className="block text-sm font-medium text-gray-700"
          >
            Surname
          </label>
          <input
            type="text"
            name="surname"
            id="surname"
            value={doctorData.surname}
            onChange={handleChangeDoctorData}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={doctorData.lastName}
            onChange={handleChangeDoctorData}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Auth Data Fields */}
        <div className="mb-4">
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
            value={authData.username}
            onChange={handleChangeAuthData}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-6">
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
            value={authData.password}
            onChange={handleChangeAuthData}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          {/* Display password error message below the password input */}
          {passwordError && (
            <p className="text-red-600 mt-2 text-xs">{passwordError}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Create Doctor
        </button>
      </form>

      {/* Modal/Popup for showing progress and success */}
      {isSubmitting && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-green-500">
            <p>{popupMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateDoctorForm;
