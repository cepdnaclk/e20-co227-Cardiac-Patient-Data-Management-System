import SymptomDataById from "./SymptomsDataById";
import ClinicalDataById from "./ClinicalDataById";
import ExaminationDataById from "./ExaminationDataById";

const MedicalInfo = () => {
  return (
    <div className="mb-4">
      <SymptomDataById />
      <ExaminationDataById />
      <ClinicalDataById />
    </div>
  );
};

export default MedicalInfo;
