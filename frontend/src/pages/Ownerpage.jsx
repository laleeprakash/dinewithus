import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heading } from "../components/Heading";
import axios from "axios";

function Ownerpage() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the owner ID from the URL
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleaddrestaurant = () => {
    navigate(`/addrestaurant/${id}`); // Navigate to Add Restaurant page with owner ID
  };

  // Fetch restaurants for this owner on page load or when owner ID changes
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/restaurants/${id}`);
        setRestaurants(response.data.restaurants); // Set restaurants data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [id]); // Refetch when the owner ID changes

  // Navigate to dining management page for the specific restaurant
  const handleAddDining = (restaurantId) => {
    navigate(`/${id}/adddining/${restaurantId}`); // Navigate to add dining page with restaurant ID
  };

  // View dining options for a specific restaurant
  const handleviewdining = (restaurantId) => {
    navigate(`/viewdining/${restaurantId}`); // Navigate to view dining page with restaurant ID
  };

  // View all dining options for all restaurants
const handle_view_booked_dining = () =>{
  navigate(`/view_Booked_dining/${id}`)
}

  return (
    <div className="relative">
      {/* Heading aligned to the center */}
      <div className="text-center p-4">
        <Heading label={"Welcome to Restaurant Owner Page"} />
      </div>

      {/* Buttons positioned at the top right corner */}
      <div className="absolute top-16 right-4 flex gap-2">
        <button 
          className="p-2 bg-blue-700 text-white cursor-pointer rounded hover:bg-blue-800"
          onClick={handleaddrestaurant}
        >
          Add Restaurant
        </button>
      
        <button 
          className="p-2 bg-blue-700 text-white cursor-pointer rounded hover:bg-blue-800"
          onClick={handle_view_booked_dining}
       
        >
          View All Booked Dining
        </button>
      </div>

      {/* Display Restaurants in a table format */}
      <div className="mt-12 p-4 overflow-x-auto">
        {loading ? (
          <div>Loading restaurants...</div>
        ) : restaurants.length === 0 ? (
          <div>No restaurants found for this owner.</div>
        ) : (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left border-b">Image</th>
                <th className="p-4 text-left border-b">Restaurant Name</th>
                <th className="p-4 text-left border-b">Location</th>
                <th className="p-4 text-left border-b">Description</th>
                <th className="p-4 text-left border-b">Dining Options</th>
                <th className="p-4 text-left border-b">View Dining</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant) => (
                <tr key={restaurant.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    {restaurant.imageurl && (
                      <img
                        src={restaurant.imageurl}
                        alt={restaurant.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    )}
                  </td>
                  <td className="p-4">{restaurant.name}</td>
                  <td className="p-4">{restaurant.location}</td>
                  <td className="p-4">{restaurant.description}</td>
                  <td className="p-4">
                    <button
                      className="p-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
                      onClick={() => handleAddDining(restaurant.id)}
                    >
                      Add Dining
                    </button>
                  </td>
                  <td className="p-4">
                    <button
                      className="w-fit p-2 border rounded hover:bg-gray-100"
                      onClick={() => handleviewdining(restaurant.id)}
                    >
                      View Dining Options
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Ownerpage;