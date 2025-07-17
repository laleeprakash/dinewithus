import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function AdminPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL; // ✅ Use environment variable

  const handlenavigate = () => navigate("/feedbacks");
  const handleuserdetais = () => navigate("/userdetails")
  const handleApproved = () => navigate("/approvedrestaurant");
  const handleRejected = () => navigate("/rejectedrestaurant");
  const handlerestaurantdetails = () => navigate("/restaurantdetails")
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(`${API}/restaurants`); // ✅ Use dynamic base URL
        setRestaurants(response.data.restaurants || []);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, [API]); // ✅ Watch API in case it changes

  const handleApproveReject = (id) => {
    navigate(`/approve-reject/${id}`);
  };

  return (
    <div className="p-6">
      <div className="flex flex-row-reverse gap-4 right-1 top-0">
        <div
          className="flex flex-row-reverse font-extrabold text-lg cursor-pointer hover:opacity-20"
          onClick={handlenavigate}
        >
          Feed Backs
        </div>
        <div
          className="flex flex-row-reverse font-extrabold text-lg cursor-pointer hover:opacity-20"
          onClick={handleuserdetais}
        >
          User Details
        </div>
         <div
          className="flex flex-row-reverse font-extrabold text-lg cursor-pointer hover:opacity-20"
          onClick={handlerestaurantdetails}
        >
          Restaurant Details
        </div>
        <div
          className="flex flex-row-reverse font-extrabold text-lg cursor-pointer hover:opacity-20"
          onClick={handleApproved}
        >
          Approved Restaurants
        </div>
        <div
          className="flex flex-row-reverse font-extrabold text-lg cursor-pointer hover:opacity-20"
          onClick={handleRejected}
        >
          Rejected Restaurants
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-6">Admin - Pending Restaurant Approvals</h1>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Id</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Restaurant Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Location</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Description</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Image</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.length > 0 ? (
              restaurants.map((restaurant) => (
                <tr key={restaurant.id} className="border-b">
                  <td className="px-6 py-4 text-sm text-gray-700">{restaurant.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{restaurant.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{restaurant.location}</td>
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
                    {restaurant.approval === 1 || restaurant.approval === 0 ? (
                      <div className="w-fit p-2 bg-black text-white pl-3 ml-3">Done</div>
                    ) : (
                      <div
                        className="flex flex-row gap-3 border w-fit p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleApproveReject(restaurant.id)}
                      >
                        Approve or Reject
                      </div>
                    )}
                  </td>
                  <td>
                    {restaurant.approval === 1 ? (
                      <div className="bg-green-500 p-3 w-fit">Approved</div>
                    ) : restaurant.approval === 0 ? (
                      <div className="bg-red-500 p-2 w-fit">Rejected</div>
                    ) : (
                      <div className="bg-blue-500 p-2 w-fit">Not Approved</div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-700">
                  No restaurants available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminPage;
