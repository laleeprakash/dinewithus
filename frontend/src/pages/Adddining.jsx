import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL; // ✅ Environment-based API URL

function Adddining() {
  const { ownerid, id } = useParams(); // Get both owner ID and restaurant ID from URL
  const navigate = useNavigate();
  const [tableNumber, setTableNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [loading, setLoading] = useState(false);
  const [existingTables, setExistingTables] = useState([]);

  useEffect(() => {
    const fetchExistingTables = async () => {
      try {
        const response = await axios.get(`${API}/restaurants/${id}/tables`);
        setExistingTables(response.data.tables || []);
      } catch (error) {
        console.error("Error fetching existing tables:", error);
      }
    };

    fetchExistingTables();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (existingTables.includes(Number(tableNumber))) {
      alert("This table number already exists. Please choose a different one.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${API}/restaurants/${id}/adddining`, {
        tableNumber: Number(tableNumber),
        capacity: Number(capacity),
      });

      alert("Dining option added successfully!");
      setExistingTables([...existingTables, Number(tableNumber)]);
      navigate(`/ownerpage/${ownerid}`);
    } catch (error) {
      console.error("Error adding dining option:", error);
      alert("Error adding dining option. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center w-full h-screen bg-gradient-to-b from-pink-900 to-purple-700">
      <div className="flex flex-col justify-center items-center rounded-3xl">
        <div className="bg-slate-300 flex flex-col justify-center">
          <div className="rounded-3xl bg-white w-9/10 p-8">
            <h2 className="text-2xl font-semibold text-center mb-6">Add Dining for Restaurant</h2>
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
                  <option value="" disabled>Select Table Number</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                    .filter((table) => !existingTables.includes(table))
                    .map((table) => (
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
                  <option value="" disabled>Select Capacity</option>
                  {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((cap) => (
                    <option key={cap} value={cap}>{cap} People</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="mt-4 p-3 px-8 bg-blue-700 text-white rounded-md hover:bg-blue-800"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Dining"}
                </button>
                <button
                  type="button"
                  className="mt-4 p-3 px-8 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                  onClick={() => navigate(`/ownerpage/${ownerid}`)} // ✅ navigate to ownerpage using ownerid
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
