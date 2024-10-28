import PatientClinicalDataById from "./PatientClinicalData";
import PatientExaminationDataById from "./PatientExaminationData";
import PatientSymptomDataById from "./PatientSymptomsData";

const PatientMedicalInfo = () => {
  return (
    <div>
      <PatientSymptomDataById />
      <PatientClinicalDataById />
      <PatientExaminationDataById />
    </div>
  );
};

export default PatientMedicalInfo;
