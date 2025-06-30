import React from 'react';
import { useLocation } from 'react-router-dom';

function Notify() {
  const location = useLocation();
  const { bookedSeats } = location.state || { bookedSeats: [] }; // Get booked seats from state

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Notification Page</h1>
      <p className="text-lg">
        Booked Seats: <strong>{bookedSeats.join(', ')}</strong>
      </p>
    </div>
  );
};

export default Notify;