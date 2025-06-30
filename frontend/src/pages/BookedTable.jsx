import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Modal component
function Modal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
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
  const [bookedTables, setBookedTables] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchBookedTables = async () => {
      try {
        const response = await axios.get(`${API}/${userId}/bookedtable`);
        setBookedTables(response.data);
      } catch (error) {
        console.error("Error fetching booked tables:", error);
      }
    };

    fetchBookedTables();
  }, [userId, API]);

  const handleCancelBooking = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowModal(true);
  };

  const handleConfirmCancellation = async () => {
    try {
      const response = await axios.put(`${API}/${userId}/cancel-booking/${selectedBookingId}`);
      if (response.status === 200) {
        alert("Your booking has been successfully cancelled.");
        setBookedTables((prev) => prev.filter((table) => table.id !== selectedBookingId));
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error cancelling the booking:", error);
      alert("There was an error canceling your booking. Please try again.");
      setShowModal(false);
    }
  };

  const handleCancelAction = () => {
    setShowModal(false);
  };

  return (
    <div className="p-6">
      {showModal && (
        <Modal
          message="Are you sure you want to cancel this booking?"
          onConfirm={handleConfirmCancellation}
          onCancel={handleCancelAction}
        />
      )}

      {bookedTables.length > 0 ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">Your Booked Tables</h1>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border p-2">S.No.</th>
                <th className="border p-2">Restaurant</th>
                <th className="border p-2">Booking Date</th>
                <th className="border p-2">Guests</th>
                <th className="border p-2">Table ID</th>
                <th className="border p-2">Location</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookedTables.map((bookedTable, index) => (
                <tr key={bookedTable.id}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{bookedTable.restaurant?.name || "N/A"}</td>
                  <td className="border p-2">
                    {new Date(bookedTable.bookingDate).toLocaleString()}
                  </td>
                  <td className="border p-2">{bookedTable.numberOfGuests}</td>
                  <td className="border p-2">{bookedTable.tableId}</td>
                  <td className="border p-2">{bookedTable.restaurant?.location || "N/A"}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleCancelBooking(bookedTable.id)}
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                    >
                      Cancel
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
