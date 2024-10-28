import useStateContext from "../../contexts/useStateContext";

import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../PatientComponents/Sidebar";
import TopBar from "../PatientComponents/Topbar";
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";

const PatientMainLayout = () => {
  const { token, setUser, user, setToken } = useStateContext();
  const [patientName, setPatientName] = useState("");

  useEffect(() => {
    const fetchPatient = async () => {
      const patient_id = user.patientId;

      const response = await axiosClient.get(`/patients/${patient_id}`);
      if (response.data) {
        setPatientName(response.data.firstName + " " + response.data.lastName);
      } else {
        setPatientName("Patient " + patient_id);
      }
    };

    fetchPatient();
  }, [user]);

  // Safely check if the user is authenticated and has the "ADMIN" role
  if (!token || !user || user.role !== "USER") {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    window.location.href = "/login"; // Redirect to login page after logout
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-20">
        <Sidebar />
      </div>

      {/* Main content section */}
      <div className="flex-1 flex flex-col ml-64">
        {/* TopBar */}
        <div className="fixed top-0 left-64 right-0 h-16 bg-white shadow-lg z-10">
          <TopBar patientName={patientName} handleLogout={handleLogout} />
        </div>

        {/* PatientDashboard */}
        <div className="flex-1 mt-16 overflow-y-auto p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PatientMainLayout;
