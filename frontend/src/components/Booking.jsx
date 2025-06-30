import React, { useState } from 'react';
import DateTimePicker from "./Timepicker.jsx"

// Booking Component
const Booking = ({ restaurantId, restaurantName }) => {
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    time: '',
    guests: 1,
  });

  // Date and Time change handlers
  const setDate = (date) => {
    setBookingDetails({
      ...bookingDetails,
      date: date,
    });
  };

  const setTime = (time) => {
    setBookingDetails({
      ...bookingDetails,
      time: time,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({
      ...bookingDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking confirmed for ${restaurantName} on ${bookingDetails.date} at ${bookingDetails.time} for ${bookingDetails.guests} guests.`);
    // Here you can add logic to send the booking details to your backend or API
  };

  return (
    <div className="mt-8 p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Book a Table</h2>
      <form onSubmit={handleSubmit}>
        {/* Date and Time Picker Component */}
        <DateTimePicker setDate={setDate} setTime={setTime} />

        {/* Number of Guests */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Number of Guests</label>
          <input
            type="number"
            name="guests"
            value={bookingDetails.guests}
            onChange={handleChange}
            min="1"
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default Booking;
