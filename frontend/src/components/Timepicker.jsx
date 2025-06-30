import React, { useState, useEffect } from 'react';

const DateTimePicker = ({ setDate, setTime }) => {
  const [currentDateTime, setCurrentDateTime] = useState({
    currentDate: '',
    currentTime: '',
  });

  useEffect(() => {
    // Get the current date and time in the format yyyy-mm-dd and hh:mm
    const now = new Date();
    const date = now.toISOString().split('T')[0]; // Extract date in yyyy-mm-dd format
    const time = now.toISOString().split('T')[1].split('.')[0].slice(0, 5); // Extract time in hh:mm format

    setCurrentDateTime({
      currentDate: date,
      currentTime: time,
    });
  }, []);

  // Generate time slots in 30-minute intervals from current time
  const generateTimeSlots = () => {
    const slots = [];
    const now = new Date();
    let hours = now.getHours();
    let minutes = Math.ceil(now.getMinutes() / 30) * 30; // Round up to the nearest 30 minutes

    // Create time slots for the next 24 hours in 30-minute intervals
    for (let i = 0; i < 48; i++) {
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
      const timeSlot = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      slots.push(timeSlot);
      minutes += 30;
    }
    return slots;
  };

  // Get the time slots
  const timeSlots = generateTimeSlots();

  return (
    <div className="date-time-picker">
      <div>
        <label htmlFor="date">Select Date: </label>
        <input
          type="date"
          id="date"
          name="date"
          min={currentDateTime.currentDate} // Prevent past dates
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="time">Select Time: </label>
        <select
          id="time"
          name="time"
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="">Select a time</option>
          {timeSlots.map((slot, index) => (
            <option key={index} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DateTimePicker;
