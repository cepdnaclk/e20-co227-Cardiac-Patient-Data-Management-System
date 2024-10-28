import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "../../components/AdminComponents/SideBar";
import TopBar from "../../components/AdminComponents/TopBar";
import AdminDashboard from "../../components/AdminComponents/AdminDashboard";
import AdminPatients from "../../components/AdminComponents/AdminPatients";
import AdminDoctors from "../components/AdminComponents/AdminDoctors";

const AdminHome = () => {
  return (
    <div className="flex">
      {/* Sidebar is static */}
      <Sidebar />

      {/* Right-hand side content, containing the TopBar and dynamic views */}
      <div className="flex-1">
        <TopBar />

        {/* Main content area */}
        <div className="p-6">
          <Routes>
            {/* Default route, redirects to dashboard */}
            <Route path="/" element={<Navigate to="/admin-dashboard" />} />

            {/* Dashboard Route */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />

            {/* Patients View Route */}
            <Route path="/patients" element={<AdminPatients />} />

            {/* You can add more routes for other views, like Doctors */}
            <Route path="/doctors" element={<AdminDoctors />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
