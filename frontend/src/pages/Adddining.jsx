import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Adddining() {
  const { ownerid } = useParams(); // Get owner ID from URL params
  const { id } = useParams(); // Get restaurant ID from URL params
  const navigate = useNavigate(); // Navigate to different pages after form submission
  const [tableNumber, setTableNumber] = useState(""); // State to hold the table number
  const [capacity, setCapacity] = useState(""); // State to hold the capacity
  const [loading, setLoading] = useState(false); // Loading state for the form submission
  const [existingTables, setExistingTables] = useState([]); // State to hold the existing table numbers

  // Fetch existing tables for the restaurant when component loads
  useEffect(() => {
    const fetchExistingTables = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/restaurants/${id}/tables`);
        setExistingTables(response.data.tables); // Assume response has a 'tables' array
      } catch (error) {
        console.error("Error fetching existing tables:", error);
      }
    };

    fetchExistingTables();
  }, [id]); // Run only when the restaurant ID changes

  // Function to check if table number already exists for the restaurant
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if table already exists
    if (existingTables.includes(Number(tableNumber))) {
      alert("This table number already exists. Please choose a different one.");
      return;
    }
  
    setLoading(true); // Set loading to true during the request
  
    try {
      // Send a POST request to add the dining option (table) for the specific restaurant
      const response = await axios.post(`http://localhost:3000/restaurants/${id}/adddining`, {
        tableNumber: Number(tableNumber), // Send table number as a number
        capacity: Number(capacity), // Send capacity as a number
      });
  
      // Handle success
      alert("Dining option added successfully!");
      
      // Update the existing tables list
      setExistingTables([...existingTables, Number(tableNumber)]); // Add the new table to the existing list
  
      navigate(`/ownerpage/${ownerid}`); // Navigate back to the owner page with correct path after success
    } catch (error) {
      console.error("Error adding dining option:", error);
      alert("Error adding dining option. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after the request
    }
  };

  return (
    <div className="flex justify-center w-full h-screen bg-gradient-to-b from-pink-900 to-purple-700">
      <div className="flex flex-col justify-center items-center rounded-3xl">
        <div className="bg-slate-300 flex flex-col justify-center">
          <div className="rounded-3xl bg-white w-9/10 p-8">
            <h2 className="text-2xl font-semibold text-center mb-6">Add Dining for Restaurant</h2>

            {/* Dining Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="tableNumber" className="block text-lg font-medium mb-2">
                  Table Number
                </label>
                <select
                  id="tableNumber"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                >
                  <option value="" disabled>
                    Select Table Number
                  </option>
                  {/* Populate table number options, removing already taken ones */}
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter((table) => !existingTables.includes(table)).map((table) => (
                    <option key={table} value={table}>
                      Table {table}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="capacity" className="block text-lg font-medium mb-2">
                  Capacity
                </label>
                <select
                  id="capacity"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                >
                  <option value="" disabled>
                    Select Capacity
                  </option>
                  {/* Populate capacity options */}
                  {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((cap) => (
                    <option key={cap} value={cap}>
                      {cap} People
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="mt-4 p-3 px-8 bg-blue-700 text-white rounded-md hover:bg-blue-800"
                  disabled={loading} // Disable button when loading
                >
                  {loading ? "Adding..." : "Add Dining"}
                </button>
                <button
                  type="button"
                  className="mt-4 p-3 px-8 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                  onClick={() => navigate(`/ownerpage/${id}`)} // Correct path for going back to the owner page
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adddining;
