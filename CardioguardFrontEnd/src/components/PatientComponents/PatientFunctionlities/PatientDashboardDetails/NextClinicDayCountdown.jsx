import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const NextClinicDayCountdown = ({ nextClinicDay }) => {
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const today = new Date();
    const nextClinic = new Date(nextClinicDay);
    const difference = nextClinic - today;
    const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
    setDaysLeft(days);
  }, [nextClinicDay]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mx-auto text-center">
      <h2 className="text-lg font-bold mb-4">Days Until Next Clinic Day</h2>
      <p className="text-4xl font-bold text-green-600">{daysLeft} Days</p>
    </div>
  );
};

// PropTypes validation
NextClinicDayCountdown.propTypes = {
  nextClinicDay: PropTypes.string.isRequired,
};

export default NextClinicDayCountdown;
