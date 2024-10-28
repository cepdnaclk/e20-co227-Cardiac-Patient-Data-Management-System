import React, { useState, useEffect, useCallback } from "react";
import axiosClient from "../../../../../axios-client";
import { useParams } from "react-router-dom";
import Modal from "./Modal";
import DoctorExaminationUpdate from "./UpdateDoctorExamination";
import DoctorExaminationSubmission from "./DoctorExaminationSubmission";

const ExaminationDataById = () => {
  const { patientId } = useParams();
  const [examinationData, setExaminationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Fetch examination data
  const fetchExaminationData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setExaminationData([]);

      const examinationDataResponse = await axiosClient.get(
        `/doctors/${patientId}/examines`
      );

      if (
        examinationDataResponse.data &&
        examinationDataResponse.data.length > 0
      ) {
        const sortedData = examinationDataResponse.data.sort(
          (a, b) => new Date(b.examinationDate) - new Date(a.examinationDate)
        );
        setExaminationData(sortedData);
      } else {
        setError("No examination data found.");
      }
    } catch (err) {
      setError(
        "Failed to fetch examination data. Please check the Patient ID and try again."
      );
      console.error("Error fetching examination data:", err);
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    fetchExaminationData();
  }, [fetchExaminationData]);

  const toggleRowExpansion = (index) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleAddRecord = () => {
    setEditIndex(null);
    setIsModalOpen(true);
  };

  const handleEditRecord = (index) => {
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditIndex(null);
  };

  const handleDeleteRecord = async (index) => {
    try {
      const record = examinationData[index];
      await axiosClient.delete(
        `/doctors/${patientId}/examines/${record.examinationCode}`
      );
      fetchExaminationData(); // Refresh the data
    } catch (err) {
      console.error("Error deleting examination data:", err);
    }
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-left ml-4">
          Patient Examination Data
        </h1>
        <p className="font-semibold pr-4">Patient ID : {patientId}</p>
      </div>

      <div className="mb-4 flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddRecord}
        >
          Add Record
        </button>
      </div>

      {loading && <p className="text-blue-500 text-center">Loading data...</p>}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      {examinationData.length > 0 && (
        <div className="bg-gray-50 rounded-md p-4">
          <div className="overflow-y-auto" style={{ maxHeight: "500px" }}>
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Date (M/D/Y)</th>
                  <th className="px-4 py-2 w-2/3">Details</th>
                </tr>
              </thead>
              <tbody>
                {examinationData.map((data, index) => (
                  <React.Fragment key={index}>
                    <tr
                      className="bg-white border-b cursor-pointer"
                      onClick={() => toggleRowExpansion(index)}
                    >
                      <td className="px-4 py-2 align-top">
                        {new Date(data.examinationDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 text-gray-700 text-right">
                        {expandedRows[index] ? "Hide Details" : "Show Details"}
                      </td>
                    </tr>
                    {expandedRows[index] && (
                      <tr className="bg-gray-100 border-b">
                        <td colSpan="2" className="px-4 py-2">
                          <div className="flex">
                            <div className="w-1/2 pr-4">
                              <ul>
                                <li>
                                  Tachycardia at Rest:{" "}
                                  <span
                                    className={
                                      data.tachycardiaAtRest
                                        ? "text-red-500"
                                        : "text-green-500"
                                    }
                                  >
                                    {data.tachycardiaAtRest ? "Yes" : "No"}
                                  </span>
                                </li>
                                <li>
                                  Hypotension:{" "}
                                  <span
                                    className={
                                      data.hypotension
                                        ? "text-red-500"
                                        : "text-green-500"
                                    }
                                  >
                                    {data.hypotension ? "Yes" : "No"}
                                  </span>
                                </li>
                                <li>
                                  Narrow Pulse Pressure:{" "}
                                  <span
                                    className={
                                      data.narrowPulsePressure
                                        ? "text-red-500"
                                        : "text-green-500"
                                    }
                                  >
                                    {data.narrowPulsePressure ? "Yes" : "No"}
                                  </span>
                                </li>
                                <li>
                                  Raised Jugular Venous Pressure:{" "}
                                  <span
                                    className={
                                      data.raisedJugularVenousPressure
                                        ? "text-red-500"
                                        : "text-green-500"
                                    }
                                  >
                                    {data.raisedJugularVenousPressure
                                      ? "Yes"
                                      : "No"}
                                  </span>
                                </li>
                                <li>
                                  Displaced Apex Beat:{" "}
                                  <span
                                    className={
                                      data.displacedApexBeat
                                        ? "text-red-500"
                                        : "text-green-500"
                                    }
                                  >
                                    {data.displacedApexBeat ? "Yes" : "No"}
                                  </span>
                                </li>
                              </ul>
                            </div>
                            <div className="w-1/2">
                              <ul>
                                <li>
                                  Right Ventricular Heave:{" "}
                                  <span
                                    className={
                                      data.rightVentricularHeave
                                        ? "text-red-500"
                                        : "text-green-500"
                                    }
                                  >
                                    {data.rightVentricularHeave ? "Yes" : "No"}
                                  </span>
                                </li>
                                <li>
                                  Pleural Effusion:{" "}
                                  <span
                                    className={
                                      data.pleuralEffusion
                                        ? "text-red-500"
                                        : "text-green-500"
                                    }
                                  >
                                    {data.pleuralEffusion ? "Yes" : "No"}
                                  </span>
                                </li>
                                <li>
                                  Hepatomegaly:{" "}
                                  <span
                                    className={
                                      data.hepatomegaly
                                        ? "text-red-500"
                                        : "text-green-500"
                                    }
                                  >
                                    {data.hepatomegaly ? "Yes" : "No"}
                                  </span>
                                </li>
                                <li>
                                  Pedal and Ankle Oedema:{" "}
                                  <span
                                    className={
                                      data.pedalAndAnkleOedema
                                        ? "text-red-500"
                                        : "text-green-500"
                                    }
                                  >
                                    {data.pedalAndAnkleOedema ? "Yes" : "No"}
                                  </span>
                                </li>
                                <li>
                                  Gallop Rhythm on Auscultation:{" "}
                                  <span
                                    className={
                                      data.gallopRhythmOnAuscultation
                                        ? "text-red-500"
                                        : "text-green-500"
                                    }
                                  >
                                    {data.gallopRhythmOnAuscultation
                                      ? "Yes"
                                      : "No"}
                                  </span>
                                </li>
                                <li>
                                  Murmurs Associated with Valvular Heart
                                  Disease:{" "}
                                  <span
                                    className={
                                      data.murmursAssociatedWithValvularHeartDisease
                                        ? "text-red-500"
                                        : "text-green-500"
                                    }
                                  >
                                    {data.murmursAssociatedWithValvularHeartDisease
                                      ? "Yes"
                                      : "No"}
                                  </span>
                                </li>
                                <li>
                                  Tachypnoea:{" "}
                                  <span
                                    className={
                                      data.tachypnoea
                                        ? "text-red-500"
                                        : "text-green-500"
                                    }
                                  >
                                    {data.tachypnoea ? "Yes" : "No"}
                                  </span>
                                </li>
                                <li>
                                  Ascites:{" "}
                                  <span
                                    className={
                                      data.ascites
                                        ? "text-red-500"
                                        : "text-green-500"
                                    }
                                  >
                                    {data.ascites ? "Yes" : "No"}
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
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

      <Modal isVisible={isModalOpen} onClose={handleCloseModal}>
        {editIndex !== null ? (
          <DoctorExaminationUpdate
            patientId={patientId}
            examinationData={examinationData[editIndex]}
            onClose={handleCloseModal}
            fetchData={fetchExaminationData}
          />
        ) : (
          <DoctorExaminationSubmission
            patientId={patientId}
            onClose={handleCloseModal}
            fetchData={fetchExaminationData}
          />
        )}
      </Modal>
    </div>
  );
};

export default ExaminationDataById;
