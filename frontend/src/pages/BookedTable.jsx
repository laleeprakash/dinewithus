import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Modal component
function Modal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p>{message}</p>
        <div className="mt-4">
          <button
            onClick={onConfirm}
            className="p-2 bg-green-500 text-white font-bold rounded-lg mr-2"
          >
            OK
          </button>
          <button
            onClick={onCancel}
            className="p-2 bg-red-500 text-white font-bold rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function Bookedtable() {
  const { userId } = useParams();
  const [bookedTables, setBookedTables] = useState([]); // Initialize as an empty array
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const [selectedBookingId, setSelectedBookingId] = useState(null); // Store the booking ID to cancel

  useEffect(() => {
    const fetchBookedTables = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/${userId}/bookedtable`);
        const bookedData = response.data;
        console.log(bookedData); // Log to check the data
        setBookedTables(bookedData);
      } catch (error) {
        console.error("Error fetching booked tables:", error);
      }
    };

    fetchBookedTables();
  }, [userId]);

  const handleCancelBooking = (bookingId) => {
    setSelectedBookingId(bookingId); // Store the bookingId to cancel later
    setShowModal(true); // Show the modal
  };

  const handleConfirmCancellation = async () => {
    try {
    

      // Send cancellation request
      const response = await axios.put(`http://localhost:3000/${userId}/cancel-booking/${selectedBookingId}`);

      if (response.status === 200) {
        alert("Your booking has been successfully cancelled.");
        setBookedTables((prev) => prev.filter((table) => table.id !== selectedBookingId)); // Update state after cancellation
        setShowModal(false); // Hide the modal after success
      }
    } catch (error) {
      console.error("Error cancelling the booking:", error);
      alert("There was an error canceling your booking. Please try again.");
      setShowModal(false); // Hide the modal on error
    }
  };

  const handleCancelAction = () => {
    setShowModal(false); // Close the modal without doing anything
  };

  return (
    <div>
      {showModal && (
        <Modal
          message="Are you sure you want to cancel this booking?"
          onConfirm={handleConfirmCancellation}
          onCancel={handleCancelAction}
        />
      )}

      {bookedTables.length > 0 ? (
        <div>
          <h1>Your Booked Tables</h1>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 text-left">S.No.</th>
                <th className="border border-gray-300 p-2 text-left">Restaurant</th>
                <th className="border border-gray-300 p-2 text-left">Booking Date</th>
                <th className="border border-gray-300 p-2 text-left">Number of Guests</th>
                <th className="border border-gray-300 p-2 text-left">Table ID</th>
                <th className="border border-gray-300 p-2 text-left">Location</th>
                <th className="border border-gray-300 p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookedTables.map((bookedTable, index) => (
                <tr key={bookedTable.id}>
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">
                    {bookedTable.restaurant ? bookedTable.restaurant.name : "Not available"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {new Date(bookedTable.bookingDate).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 p-2">{bookedTable.numberOfGuests}</td>
                  <td className="border border-gray-300 p-2">{bookedTable.tableId}</td>
                  <td className="border border-gray-300 p-2">
                    {bookedTable.restaurant ? bookedTable.restaurant.location : "Not available"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleCancelBooking(bookedTable.id)}
                      className="p-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-700"
                    >
                      Cancel Booking
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No booked tables found.</p>
      )}
    </div>
  );
}

export default Bookedtable;
