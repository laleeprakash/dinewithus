import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TableBooking() {
  const API = import.meta.env.VITE_API_URL;

  const { userId, restaurantId } = useParams();
  const navigate = useNavigate();

  const [allTables, setAllTables] = useState([]);
  const [availableTables, setAvailableTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [amountToPay, setAmountToPay] = useState(0);
  const [bookingInProgress, setBookingInProgress] = useState(false);

  // Fetch all tables when component mounts
  useEffect(() => {
    const fetchAllTables = async () => {
      try {
        const response = await axios.get(
          `${API}/restaurants/${restaurantId}/tables`
        );
        setAllTables(response.data.tables || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tables:", err);
        setError("Failed to fetch tables");
        setLoading(false);
      }
    };
    fetchAllTables();
  }, [restaurantId]);

  // Fetch available tables when a date is selected
  useEffect(() => {
    if (selectedDate) {
      const fetchAvailableTables = async () => {
        setAvailabilityLoading(true);
        try {
          const dateStr = selectedDate.toLocaleDateString("en-CA"); // Format: YYYY-MM-DD
          const response = await axios.get(
            `${API}/restaurants/${restaurantId}/availability`,
            { params: { bookingDate: dateStr } }
          );
          setAvailableTables(response.data.availableTables || []);
        } catch (err) {
          console.error("Error checking availability:", err);
          setError("Failed to check availability");
        } finally {
          setAvailabilityLoading(false);
        }
      };
      fetchAvailableTables();
    }
  }, [selectedDate, restaurantId]);

  const handlenotify = () => {
    navigate(`/${userId}/${restaurantId}/notify`);
  };

  const handleTableClick = (table) => {
    if (selectedTable === table.id) {
      setSelectedTable(null);
      setAmountToPay(0);
    } else {
      setSelectedTable(table.id);
      setAmountToPay(table.capacity * 10);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTable(null);
  };

  const filterTime = (date) => {
    const now = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    if (hour < 9 || hour > 20) return false;

    if (isToday) {
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();
      const nextHour = currentMinutes >= 30 ? currentHour + 1 : currentHour;
      const nextMinutes = currentMinutes >= 30 ? 0 : 30;

      if (
        hour < nextHour ||
        (hour === nextHour && minutes < nextMinutes)
      ) {
        return false;
      }
    }

    return minutes === 0 || minutes === 30;
  };

  const handleBooking = async () => {
    if (!userId || !selectedTable || !selectedDate) {
      alert("Please complete the booking form.");
      return;
    }

    setBookingInProgress(true);

    try {
      const bookingData = {
        customerId: userId,
        restaurantId,
        bookingDate: selectedDate,
        numberOfGuests: allTables.find((t) => t.id === selectedTable)?.capacity,
        tableId: selectedTable,
      };

      const response = await axios.post(
        `${API}/booking/${userId}/${restaurantId}`,
        bookingData
      );

      if (response.data.msg === "Booked successfully...") {
        await axios.put(`${API}/updatestatus`, { tableId: selectedTable });
        alert("Booking confirmed!");
        navigate(`/homepage/${userId}`);
      } else {
        alert("There was an issue with your booking.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Booking failed. Please try again.");
    } finally {
      setBookingInProgress(false);
    }
  };

  const isMoreThan3HoursAway =
    selectedDate && selectedDate.getTime() > Date.now() + 3 * 60 * 60 * 1000;

  const tablesToDisplay =
    isMoreThan3HoursAway || !selectedDate
      ? allTables
      : availableTables;

  if (loading) return <div>Loading tables...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="p-4">
      <h1
        className="absolute right-4 top-4 font-extrabold text-2xl mr-20 mt-10 cursor-pointer border w-fit p-4"
        onClick={handlenotify}
      >
        Notify
      </h1>

      <h1 className="text-center text-3xl font-bold mb-4">
        Select Your Dining Table
      </h1>

      <div className="mb-4 m-3">
        <label className="block mb-2">Select Date & Time</label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          showTimeSelect
          timeIntervals={30}
          dateFormat="MMMM d, yyyy h:mm aa"
          className="p-2 border-2 rounded-lg w-full"
          placeholderText="Select Date and Time"
          filterTime={filterTime}
          timeFormat="h:mm aa"
        />
      </div>

      {availabilityLoading && (
        <div className="text-center text-blue-500">Checking availability...</div>
      )}

      <div>
        <h2 className="text-xl mb-4">
          {selectedDate ? "Available Dining Tables" : "All Tables in Restaurant"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tablesToDisplay.map((table) => (
            <div
              key={table.id}
              className={`p-4 text-center cursor-pointer border-2 rounded-lg transition-colors
                ${
                  selectedTable === table.id
                    ? "bg-blue-500 text-white"
                    : selectedDate
                    ? "bg-green-100 hover:bg-green-200"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              onClick={() => handleTableClick(table)}
            >
              <p className="font-bold">{`Table ${table.tableNumber}`}</p>
              <p>{`${table.capacity} seats`}</p>
              <p className="text-sm">${table.capacity * 10}</p>
              {selectedDate && (
                <p className="text-xs text-green-600">Available</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {tablesToDisplay.length === 0 && (
        <div className="text-center mt-4">
          <p className="text-red-500">
            {selectedDate
              ? "No available tables for selected date"
              : "No tables found"}
          </p>
        </div>
      )}

      {selectedTable && (
        <div className="mt-6 text-center">
          <p className="text-lg mb-2">Amount to pay: ${amountToPay}</p>
          <button
            onClick={handleBooking}
            disabled={!selectedDate || !selectedTable || bookingInProgress}
            className={`px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors 
              ${
                !selectedDate || !selectedTable || bookingInProgress
                  ? "opacity-50 cursor-wait"
                  : ""
              }`}
          >
            {bookingInProgress ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      )}
    </div>
  );
}

export default TableBooking;
