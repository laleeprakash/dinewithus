import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Viewdining() {
  const { id } = useParams(); // Get the restaurant ID from the URL
  const [diningOptions, setDiningOptions] = useState([]);
  const [loading, setLoading] = useState(true);
 const API = import.meta.env.VITE_API_URL;
  // Fetch dining options for the restaurant on page load
  useEffect(() => {
    const fetchDiningOptions = async () => {
      try {
        const response = await axios.get(`${API}/restaurants/${id}/dining`);
        setDiningOptions(response.data.diningOptions); // Set dining options data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dining options:", error);
        setLoading(false);
      }
    };

    fetchDiningOptions();
  }, [id]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Dining Options for Restaurant {id}</h2>

      {loading ? (
        <div>Loading dining options...</div> // Show loading message
      ) : diningOptions.length === 0 ? (
        <div>No dining options available for this restaurant.</div> // If no dining options are found
      ) : (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left border-b">Table Number</th>
              <th className="p-4 text-left border-b">Capacity</th>
            </tr>
          </thead>
          <tbody>
            {diningOptions.map((table) => (
              <tr key={table.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{table.tableNumber}</td>
                <td className="p-4">{table.capacity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Viewdining;
