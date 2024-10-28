import useStateContext from "../../contexts/useStateContext";
import PatientClinicalDataById from "./PatientFunctionlities/PatientDashboardDetails/PatientClinicalDataLatest";
import PatientContactInfo from "./PatientFunctionlities/PatientDashboardDetails/PatientContactInfo";
import PatientDoctorDetails from "./PatientFunctionlities/PatientDashboardDetails/PatientDoctorDetails";
import PatientExaminationDataById from "./PatientFunctionlities/PatientDashboardDetails/PatientExaminationDataLatest";
import CalendarComponent from "./PatientFunctionlities/PatientDashboardDetails/PatientFunctionlityUtils/Calender";
import PatientGeneralInfo from "./PatientFunctionlities/PatientDashboardDetails/PatientGeneralInfo";
import PatientProfileHeader from "./PatientFunctionlities/PatientDashboardDetails/PatientProfileHeader";
import PatientSymptomDataById from "./PatientFunctionlities/PatientDashboardDetails/PatientSymptomsDataLatest";

const PatientDashboard = () => {
  const { user } = useStateContext();
  const patientId = user.patientId;

  return (
    <div className="flex flex-col items-center justify-center">
      <span className="text-3xl text-center font-bold text-blue-500 mb-4">
        {" "}
        Patient Dashboard
      </span>

      <div className="p-4 space-y-8 bg-gray-100 min-h-screen">
        {/* Patient Profile Header */}
        <PatientProfileHeader />

        {/* Contact and General Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
          {/* Contact Info */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <PatientContactInfo />
          </div>

          {/* General Info */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <PatientGeneralInfo />
          </div>

          <div className="bg-white shadow-lg rounded-lg p-4">
            <PatientDoctorDetails />
          </div>

          {/* Calendar Component */}
          <div className="bg-white shadow-lg rounded-lg p-4 md:col-span-2 lg:col-span-1">
            <CalendarComponent />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-2">
          <PatientSymptomDataById patientId={patientId} />
          <PatientExaminationDataById patientId={patientId} />
          <PatientClinicalDataById patientId={patientId} />
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
