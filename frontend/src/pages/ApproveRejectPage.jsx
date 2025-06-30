import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

function ApproveRejectPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL; // ✅ Load base API URL

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`${API}/restaurant/${id}`);
        setRestaurant(response.data);
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [id, API]);

  const handleApprove = async () => {
    try {
      const response = await axios.put(`${API}/approverestaurant/${id}`);
      if (response.status === 200) {
        alert("Restaurant approved successfully");
        navigate("/adminpage");
      }
    } catch (error) {
      console.error("Error approving restaurant:", error);
      alert("Failed to approve the restaurant");
    }
  };

  const handleReject = async () => {
    try {
      const response = await axios.put(`${API}/rejected/${id}`);
      if (response.status === 200) {
        alert("Restaurant rejected successfully");
        navigate("/adminpage");
      }
    } catch (error) {
      console.error("Error rejecting restaurant:", error);
      alert("Failed to reject the restaurant");
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (!restaurant) return <div className="text-center">Restaurant not found.</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Approve or Reject Restaurant</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">{restaurant.name}</h2>
        <p className="text-gray-700 mb-2">Location: {restaurant.location}</p>
        <p className="text-gray-700 mb-2">Description: {restaurant.description}</p>
        {restaurant.imageurl && (
          <img
            src={restaurant.imageurl}
            alt={restaurant.name}
            className="w-32 h-32 object-cover mb-4"
          />
        )}
        <div className="flex gap-4">
          <button className="bg-green-500 text-white p-2 rounded" onClick={handleApprove}>
            Approve
          </button>
          <button className="bg-red-500 text-white p-2 rounded" onClick={handleReject}>
            Reject
          </button>
          <button className="bg-gray-500 text-white p-2 rounded" onClick={() => navigate("/adminpage")}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApproveRejectPage;
