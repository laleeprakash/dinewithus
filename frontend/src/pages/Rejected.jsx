import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Rejected() {
   const API = import.meta.env.VITE_API_URL;
  const [rejectedRestaurants, setRejectedRestaurants] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const navigate = useNavigate()
  const handleadminpage = () =>{
    navigate("/adminpage")
  }
  useEffect(() => {
    const fetchRejectedRestaurants = async () => {
      try {
        const response = await axios.get(`${API}/rejectedrestaurant`);
        if (response.data && response.data.rejectedrestaurant) {
          setRejectedRestaurants(response.data.rejectedrestaurant);
        } else {
          setError("No rejected restaurants found");
        }
      } catch (err) {
        setError("Failed to fetch rejected restaurants");
        console.error("Error fetching rejected restaurants:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRejectedRestaurants();
  }, []); // Empty dependency array to only run once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Rejected Restaurants</h1>
      <div className="flex flex-row-reverse font-bold text-xl cursor-pointer" onClick={handleadminpage}>Back to Admin dashboard</div>
      {rejectedRestaurants.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Id</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Restaurant Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Description</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Image</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {rejectedRestaurants.map((restaurant) => (
              <tr key={restaurant.id} className="border-b">
                <td className="px-6 py-4 text-sm text-gray-700">{restaurant.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{restaurant.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{restaurant.description}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {restaurant.imageurl && (
                    <img
                      src={restaurant.imageurl}
                      alt={restaurant.name}
                      className="w-16 h-16 object-cover"
                    />
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <h1 className="p-3 border w-24 bg-red-500">Rejected</h1>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No rejected restaurants available.</p>
      )}
    </div>
  );
}

export default Rejected;
