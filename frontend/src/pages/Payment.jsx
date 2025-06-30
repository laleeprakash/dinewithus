import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";  // Add missing import

function Payment() {
   const API = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState(null);  // Initialize state with null instead of an empty array
  const { userId, restaurantId, selectedTable } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API}/${userId}`);
        setUser(response.data.user || {});  // Set the user data (as an object)
      } catch (error) {
        console.error("Error Fetching User Options:", error);
      }
    };

    fetchUser();
  }, [userId]);  // Dependency array should contain userId to refetch on change

  // Render loading state or user data
  if (!user) {
    return <div>Loading...</div>;  // Show loading message if user is not loaded
  }

  return (
    <div>
      {/* Render user info if it exists */}
      {user.username ? (
        <h2>Welcome, {user.username}</h2>
      ) : (
        <div>No user data available</div>
      )}
    </div>
  );
}

export default Payment;
