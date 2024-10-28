import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import PatientOverviewChart from "../AdminComponents/PatientOverviewChart";
import RevenueChart from "../AdminComponents/RevenueChart";

import SearchPatients from "./AdminFunctionlities/SearchPatients";
import SearchDoctors from "./AdminFunctionlities/SearchDoctors";

const AdminDashboard = () => {
  const [data, setData] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    appointments: 0,
    totalInvoice: 0,
  });

  // Function to fetch the total number of patients
  const fetchTotalPatients = async () => {
    try {
      const response = await axiosClient.get("/admin/patients/bulk");
      if (response.data) {
        setData((prevData) => ({
          ...prevData,
          totalPatients: response.data.length,
        }));
      }
    } catch (err) {
      console.error("Error fetching total patients:", err);
    }
  };

  // Function to fetch the total number of doctors
  const fetchTotalDoctors = async () => {
    try {
      const response = await axiosClient.get("/admin/doctors/bulk");
      if (response.data) {
        setData((prevData) => ({
          ...prevData,
          totalDoctors: response.data.length,
        }));
      }
    } catch (err) {
      console.error("Error fetching total doctors:", err);
    }
  };

  // Fetch dashboard data and total patients and doctors when the component mounts
  useEffect(() => {
    // Fetch the total number of patients and doctors when the component mounts
    fetchTotalPatients();
    fetchTotalDoctors();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <span className="text-3xl text-center font-bold text-blue-500 mb-4">
        {" "}
        Admin Dashboard
      </span>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg">
            <p className="text-3xl">Total Patients</p>
            <h3 className="text-3xl text-blue-400">{data.totalPatients}</h3>
          </div>
          <div className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg">
            <p className="text-3xl">Total Doctors</p>
            <h3 className="text-3xl text-blue-400">{data.totalDoctors}</h3>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-6 shadow-lg rounded">
            <PatientOverviewChart />
          </div>
          <div className="bg-white p-6 shadow-lg rounded">
            <RevenueChart />
          </div>
        </div>
        <div className="flex w-full item-center justify-center space-x-4">
          <SearchPatients />
          <SearchDoctors />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
