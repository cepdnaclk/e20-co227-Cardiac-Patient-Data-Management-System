import React, { useState, useEffect, useCallback } from "react";
import axiosClient from "../../../../../axios-client";
import { useParams } from "react-router-dom";
import Modal from "./Modal"; // Adjust the path to your modal component
import PatientClinicalDataUpdate from "./UpdatePatientClinicalData";
import PatientClinicalDataSubmission from "./PatientClinicalDataSubmission"; // Import the add record component
import ClinicalDataChart from "./ClinicalDataChart";

const ClinicalDataById = () => {
  const { patientId } = useParams();
  const [clinicalData, setClinicalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [editIndex, setEditIndex] = useState(null); // Track the index of the row being edited

  // Fetch clinical data
  const fetchClinicalData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setClinicalData([]);

      const clinicalDataResponse = await axiosClient.get(
        `/doctors/patients/${patientId}/clinical-data`
      );
      // console.log(clinicalDataResponse);

      if (clinicalDataResponse.data && clinicalDataResponse.data.length > 0) {
        // Sort the clinical data by clinicalDate in descending order
        const sortedData = clinicalDataResponse.data.sort(
          (a, b) => new Date(b.clinicalDate) - new Date(a.clinicalDate)
        );
        setClinicalData(sortedData);
      } else {
        setError("No clinical data found.");
      }
    } catch (err) {
      setError(
        "Failed to fetch clinical data. Please check the Patient ID and try again."
      );
      console.error("Error fetching clinical data:", err);
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    fetchClinicalData();
  }, [fetchClinicalData]);

  // Toggle the expanded state of a row
  const toggleRowExpansion = (index) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  // Open the modal to add a record
  const handleAddRecord = () => {
    setEditIndex(null); // Clear the edit index for adding a new record
    setIsModalOpen(true);
  };

  // Open the modal to edit a record
  const handleEditRecord = (index) => {
    setEditIndex(index); // Set the edit index
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Delete a record
  const handleDeleteRecord = async (index) => {
    try {
      const record = clinicalData[index];
      await axiosClient.delete(
        `/doctors/patients/${patientId}/clinical-data/${record.clinicalDataId}`
      ); // Adjust the API endpoint as necessary
      // Refresh the data
      fetchClinicalData();
    } catch (err) {
      console.error("Error deleting clinical data:", err);
    }
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-left ml-4">
          Patient Clinical Data
        </h1>
        <p className="font-semibold pr-4">Patient ID : {patientId}</p>
      </div>

      {/* Add Record button */}
      <div className="mb-4 flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddRecord}
        >
          Add Record
        </button>
      </div>

      {/* Error message */}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      {/* Display clinical data */}
      {clinicalData.length > 0 && (
        <div className="bg-gray-50 rounded-md p-4">
          <div className="overflow-y-auto" style={{ maxHeight: "500px" }}>
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Date(M/D/Y)</th>
                  <th className="px-4 py-2 w-2/3">Details</th>
                </tr>
              </thead>
              <tbody>
                {clinicalData.map((data, index) => (
                  <React.Fragment key={index}>
                    {/* Main row */}
                    <tr
                      className="bg-white border-b cursor-pointer"
                      onClick={() => toggleRowExpansion(index)} // Toggle on click
                    >
                      <td className="px-4 py-2 align-top">
                        {new Date(data.clinicalDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 text-gray-700  text-right">
                        {expandedRows[index] ? "Hide Details" : "Show Details"}
                      </td>
                    </tr>

                    {/* Expanded row details */}
                    {expandedRows[index] && (
                      <tr className="bg-gray-100 border-b">
                        <td colSpan="2" className="px-4 py-2">
                          <div className="flex">
                            <div className="w-1/2 pr-4">
                              <ul>
                                <li>
                                  Diagnosis of Heart Disease:{" "}
                                  <span
                                    className={
                                      data.diagnosisOfHeartDisease
                                        ? "text-red-500"
                                        : "text-green-500"
                                    }
                                  >
                                    {data.diagnosisOfHeartDisease
                                      ? "Yes"
                                      : "No"}
                                  </span>
                                </li>
                                <li>
                                  Presence of Anemia:{" "}
                                  <span
                                    className={
                                      data.presenceOfAnemia
                                        ? "text-red-500"
                                        : "text-green-500"
                                    }
                                  >
                                    {data.presenceOfAnemia ? "Yes" : "No"}
                                  </span>
                                </li>
                                <li>
                                  Creatinine Phosphokinase:{" "}
                                  <span className="font-semibold">
                                    {data.creatininePhosphokinase}
                                  </span>
                                </li>
                                <li>
                                  Diabetes:{" "}
                                  <span
                                    className={
                                      data.diabetes
                                        ? "text-red-500"
                                        : "text-green-500"
                                    }
                                  >
                                    {data.diabetes ? "Yes" : "No"}
                                  </span>
                                </li>
                                <li>
                                  Ejection Fraction:{" "}
                                  <span className="font-semibold">
                                    {data.ejectionFraction}%
                                  </span>
                                </li>
                              </ul>
                            </div>
                            <div className="w-1/2">
                              <ul>
                                <li>
                                  Blood Pressure:{" "}
                                  <span className="font-semibold">
                                    {data.bloodPressure}
                                  </span>
                                </li>
                                <li>
                                  Platelets:{" "}
                                  <span className="font-semibold">
                                    {data.platelets}
                                  </span>
                                </li>
                                <li>
                                  Serum Creatinine:{" "}
                                  <span className="font-semibold">
                                    {data.serumCreatinine}
                                  </span>
                                </li>
                                <li>
                                  Serum Sodium:{" "}
                                  <span className="font-semibold">
                                    {data.serumSodium}
                                  </span>
                                </li>
                                <li>
                                  Smoking:{" "}
                                  <span
                                    className={
                                      data.smoking
                                        ? "text-red-500"
                                        : "text-green-500"
                                    }
                                  >
                                    {data.smoking ? "Yes" : "No"}
                                  </span>
                                </li>
                                <li>
                                  Follow-Up Period (Days):{" "}
                                  <span className="font-semibold">
                                    {data.followUpPeriodDays}
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          {/* Buttons for updating and deleting */}
                          <div className="mt-4 flex justify-end">
                            <button
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 mr-2 rounded"
                              onClick={() => handleEditRecord(index)}
                            >
                              Update
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                              onClick={() => handleDeleteRecord(index)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* No data message */}
      {!clinicalData.length && !loading && !error && (
        <p className="text-gray-600 text-center">No clinical data available.</p>
      )}

      {/* Modal for Adding/Editing Clinical Data */}
      <Modal isVisible={isModalOpen} onClose={handleCloseModal}>
        {editIndex === null ? (
          <PatientClinicalDataSubmission
            patientId={patientId}
            onClose={handleCloseModal}
          />
        ) : (
          <PatientClinicalDataUpdate
            patientId={patientId}
            clinicalDataId={clinicalData[editIndex]?.clinicalDataId} // Ensure the correct id is passed here
            onClose={handleCloseModal}
            fetchData={fetchClinicalData}
          />
        )}
      </Modal>
      <ClinicalDataChart patientId={patientId} />
    </div>
  );
};

export default ClinicalDataById;
