import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Handle date change
  const onChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="calendar-container p-4 bg-white max-w-sm mx-auto">
      <h2 className="text-lg font-bold text-center mb-4">Select a Date</h2>
      <Calendar onChange={onChange} value={selectedDate} className="mx-auto" />
      <p className="text-center mt-4">
        <strong>Selected Date:</strong> {selectedDate.toDateString()}
      </p>
    </div>
  );
};

export default CalendarComponent;
