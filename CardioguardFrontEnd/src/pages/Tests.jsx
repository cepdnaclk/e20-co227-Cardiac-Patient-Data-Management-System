import FetchAllDoctors from "../components/AllDoctors";
import FetchAllPatients from "../components/AllPatients";
import DeleteDoctor from "../components/DeleteDoctor";
import DeletePatient from "../components/DeletePatient";
import DeleteSymptoms from "../components/deleteSymptomsById";
import DoctorExaminationDataSubmission from "../components/DoctorExaminationDataSubmission ";
import DoctorDataById from "../components/GetDoctorById";
import PatientExaminationDataById from "../components/GetDoctorExaminationsById";
import PatientDataById from "../components/GetPatientById";
import PatientSymptomDataById from "../components/GetPatientSymptomsById";
import DoctorPatients from "../components/GetRegisteredPatientsForDoctor";
import MachineLearningData from "../components/MachineLerningDataForm";
import PatientClinicalDataById from "../components/PatientClinicalDataById";
import RegisterPatientToDoctor from "../components/RegisterPatientsForDoctor";

export default function Tests() {
  return (
    <div>
      <MachineLearningData />
      <DeleteDoctor />
      <FetchAllDoctors />
      <DeletePatient />
      <DeleteSymptoms />
      <DoctorExaminationDataSubmission />
      <FetchAllPatients />
      <PatientClinicalDataById />
      <DoctorDataById />
      <PatientExaminationDataById />
      <PatientDataById />
      <PatientSymptomDataById />
      <DoctorPatients />
      <RegisterPatientToDoctor />
    </div>
  );
}

//This was used for testing the components UI
