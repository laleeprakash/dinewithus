import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);  // Initialize with an empty array
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);  // Handle errors if any
  const navigate = useNavigate();  // Hook to navigate

  const handleNavigate = (id) => {
    navigate(`/restaurants/${id}`);  // Dynamically navigate using restaurant ID
  };

  useEffect(() => {
    axios.get("http://localhost:3000/restaurants")
      .then(res => {
        setRestaurants(res.data.all || []);  
        setLoading(false);  // Set loading to false once data is fetched
      })
      .catch(error => {
        setError("There was an error fetching the restaurants");
        setLoading(false);  // Set loading to false even if there's an error
      });
  }, []); 

  if (loading) {
    return <div>Loading...</div>;  // Show loading message while fetching
  }

  if (error) {
    return <div>{error}</div>;  // Show error message if any
  }

  return (
    <div>
      <h1>Restaurants</h1>
      {restaurants.length > 0 ? (
        <ul>
          {restaurants.map((restaurant) => (
            <li key={restaurant.id}>
              <div 
                className='border-4 border-red-400 p-4 cursor-pointer hover:bg-gray-200' 
                onClick={() => handleNavigate(restaurant.id)}  // Pass restaurant ID to handleNavigate
              >
                <h1>{restaurant.name}</h1>
                <img 
                  src={restaurant.imageurl} 
                  alt={restaurant.name} 
                  className="w-[200px] h-[200px]" 
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No restaurants found</p>  // Display message if there are no restaurants
      )}
    </div>
  );
}

export default Restaurants;
