import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import useStateContext from "../../contexts/useStateContext";
import Sidebar from "../DoctorComponents/SideBar";
import TopBar from "../DoctorComponents/TopBar";
import { Navigate, Outlet } from "react-router-dom";

const DoctorMainLayout = () => {
  const { token, setUser, user, setToken } = useStateContext();
  const [doctorName, setDoctorName] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      const doctor_id = user.doctorId;

      const response = await axiosClient.get(`/doctors/${doctor_id}`);
      if (response.data) {
        setDoctorName(response.data.surname + " " + response.data.lastName);
      } else {
        setDoctorName("Doctor " + doctor_id);
      }
    };

    fetchDoctor();
  }, [user]);

  //Safely check if the user is authenticated and has the "DOCTOR" role
  if (!token || !user || user.role !== "DOCTOR") {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    window.location.href = "/login"; // Redirect to login page after logout
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar will remain fixed to the left */}
      <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-20">
        <Sidebar />
      </div>

      {/* Main content area, with margin to make space for the sidebar */}
      <div className="flex-1 flex flex-col ml-64">
        {/* TopBar will be fixed at the top */}
        <div className="fixed top-0 left-64 right-0 h-16 bg-white shadow-lg z-10">
          <TopBar doctorName={doctorName} handleLogout={handleLogout} />
        </div>

        {/* This Outlet will load the corresponding page component */}
        <div className="flex-1 mt-16 overflow-y-auto p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DoctorMainLayout;
