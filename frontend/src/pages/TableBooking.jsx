  import { useEffect, useState } from "react";
  import { useParams, useNavigate } from "react-router-dom";
  import axios from "axios";
  import DatePicker from "react-datepicker";
  import "react-datepicker/dist/react-datepicker.css";

  function TableBooking() {
     const API = import.meta.env.VITE_API_URL;
    const { userId, restaurantId } = useParams();
    const navigate = useNavigate();
    const [allTables, setAllTables] = useState([]); // All tables in the restaurant
    const [availableTables, setAvailableTables] = useState([]); // Available tables for selected date
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTable, setSelectedTable] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [amountToPay, setAmountToPay] = useState(0);

    // Fetch all tables when component mounts
    useEffect(() => {
      const fetchAllTables = async () => {
        try {
          const response = await axios.get(
            `${API}/restaurants/${restaurantId}/tables`
          );
          setAllTables(response.data.tables || []);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching tables:", error);
          setError("Failed to fetch tables");
          setLoading(false);
        }
      };
      fetchAllTables();
    }, [restaurantId]);

    // Fetch available tables when date is selected
    useEffect(() => {
      if (selectedDate) {
        const fetchAvailableTables = async () => {
          try {
            const dateStr = selectedDate.toISOString().split('T')[0];
            const response = await axios.get(
              `http://localhost:3000/restaurants/${restaurantId}/availability`,
              { params: { bookingDate: dateStr } }
            );
            setAvailableTables(response.data.availableTables || []);
          } catch (error) {
            console.error("Error fetching availability:", error);
            setError("Failed to check availability");
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
      setSelectedTable(null); // Reset selection when date changes
    };

    const filterTime = (date) => {
      const now = new Date();
      const hour = date.getHours();
      const minutes = date.getMinutes();
      
      const isToday = date.getDate() === now.getDate() && 
                    date.getMonth() === now.getMonth() && 
                    date.getFullYear() === now.getFullYear();
    
      if (hour < 9 || hour > 20) return false;
    
      if (isToday) {
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();
        const nextAvailableHour = currentMinutes >= 30 ? currentHour + 1 : currentHour;
        const nextAvailableMinutes = currentMinutes >= 30 ? 0 : 30;
        
        if (hour < nextAvailableHour || 
            (hour === nextAvailableHour && minutes < nextAvailableMinutes)) {
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
    
      try {
        const bookingData = {
          customerId: userId,
          restaurantId,
          bookingDate: selectedDate,
          numberOfGuests: allTables.find(table => table.id === selectedTable)?.capacity,
          tableId: selectedTable,
        };
    
        const response = await axios.post(
          `http://localhost:3000/booking/${userId}/${restaurantId}`,
          bookingData
        );
    
        if (response.data.msg === "Booked successfully...") {
          await axios.put("http://localhost:3000/updatestatus", { tableId: selectedTable });
          alert("Booking confirmed!");
          navigate(`/homepage/${userId}`);
        } else {
          alert("There was an issue with your booking.");
        }
      } catch (error) {
        console.error("Booking error:", error);
        alert("Booking failed. Please try again.");
      }
    };

    // Check if the selected date is more than 3 hours from now
    const isMoreThan3HoursAway = selectedDate && (new Date(selectedDate).getTime() > new Date().getTime() + 2.5 * 60 * 60 * 1000);

    // Determine which tables to display: show all tables if more than 3 hours away, else show only available tables
    const tablesToDisplay = isMoreThan3HoursAway ? allTables : (selectedDate ? availableTables : allTables);

    if (loading) return <div>Loading tables...</div>;
    if (error) return <div className="text-red-600">{error}</div>;

    return (
      <div className="p-4">
        <h1 className="absolute right-4 top-4 font-extrabold text-2xl mr-20 mt-10 cursor-pointer border w-fit p-4" 
            onClick={handlenotify}>
          Notify
        </h1>

        <h1 className="text-center text-3xl font-bold mb-4">Select Your Dining Table</h1>

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

        <div>
          <h2 className="text-xl mb-4">
            {selectedDate ? "Available Dining Tables" : "All Tables in Restaurant"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tablesToDisplay.map(table => (
              <div
                key={table.id}
                className={`p-4 text-center cursor-pointer border-2 rounded-lg transition-colors
                  ${selectedTable === table.id ? 'bg-blue-500 text-white' : 
                    selectedDate ? 'bg-green-100 hover:bg-green-200' : 'bg-gray-100 hover:bg-gray-200'}`}
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
              {selectedDate ? "No available tables for selected date" : "No tables found"}
            </p>
          </div>
        )}

        {selectedTable && (
          <div className="mt-6 text-center">
            <p className="text-lg mb-2">Amount to pay: ${amountToPay}</p>
            <button
              onClick={handleBooking}
              className={`px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors 
                ${!selectedDate || !selectedTable ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!selectedDate || !selectedTable}
            >
              Confirm Booking
            </button>
          </div>
        )}
      </div>
    );
  }

  export default TableBooking;
