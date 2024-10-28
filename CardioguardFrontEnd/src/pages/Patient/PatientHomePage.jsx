import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "../../components/PatientHomePageComponents/SideBarPatient";
import TopBar from "../../components/PatientHomePageComponents/TopBarPatient";
import AdminDashboard from "../../components/AdminComponents/AdminDashboard";
import AdminPatients from "../../components/AdminComponents/AdminPatients";
import PatientDashboard from "../../components/PatientHomePageComponents/PatientDashboard";
import PatientMedicalInfo from "../../components/PatientHomePageComponents/PatientMedicalInfo";

const PatientHome = () => {
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
            <Route path="/" element={<Navigate to="/patient-dashboard" />} />

            {/* Dashboard Route */}
            <Route path="/patient-dashboard" element={<PatientDashboard />} />

            {/* Patients View Route */}
            <Route path="/patients" element={<PatientMedicalInfo />} />

            {/* You can add more routes for other views, like Doctors */}
            <Route path="/doctors" element={<h1>Doctors Page</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default PatientHome;
