import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import bg from '../assets/img1.jpg';
import locationimg from "../assets/location.png";
import searchicon from "../assets/search.png";
import axios from 'axios';

function Home() {
  const [restaurant, setRestaurant] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(`${API}/approvedrestaurant`);
        setRestaurant(response.data.approvedrestaurant || []);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [API]);

  const filteredRestaurants = restaurant.filter((restaurant) =>
    restaurant.location.toLowerCase().includes(locationQuery.toLowerCase()) &&
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogin = () => navigate("/owner-signup");
  const handleDropdownClick = () => navigate(`/profile/${userId}`);
  const handleBookedTable = () => navigate(`/${userId}/bookedtable`);
  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem("token");
    navigate('/signin');
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen bg-blend-overlay"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Navigation Bar */}
      <ul className="flex flex-wrap justify-center md:justify-end gap-4 p-5 md:pr-20 text-white font-semibold text-sm md:text-base">
        <li className="cursor-pointer hover:text-yellow-400" onClick={handleLogin}>Investor Relations</li>
        <li className="cursor-pointer hover:text-yellow-400" onClick={handleDropdownClick}>Profile</li>
        <li className="cursor-pointer hover:text-yellow-400" onClick={handleBookedTable}>Booked Restaurant</li>
        <li className="cursor-pointer hover:text-yellow-400" onClick={handleLogout}>Log out</li>
      </ul>

      {/* Hero Text */}
      <div className="text-center px-4 pt-10">
        <h2 className="text-3xl md:text-5xl text-yellow-500 font-bold drop-shadow-lg">RESERVE YOUR SEAT</h2>
        <h3 className="text-xl md:text-3xl text-white mt-3">Discover The Best Restaurants & Food</h3>
      </div>

      {/* Search Bar */}
      <div className="bg-white mx-4 md:mx-[15%] mt-8 rounded-lg shadow-xl flex flex-col md:flex-row items-center p-4 gap-4">
        <div className="flex items-center w-full bg-gray-100 rounded-full px-4 py-2">
          <img src={locationimg} alt="Location" className="w-5 h-5" />
          <input
            className="w-full px-3 py-1 ml-2 rounded-full text-base text-gray-700 focus:outline-none"
            placeholder="Search by Location"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
          />
        </div>

        <div className="font-bold hidden md:inline">|</div>

        <div className="flex items-center w-full bg-gray-100 rounded-full px-4 py-2">
          <img src={searchicon} alt="Search" className="w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-1 ml-2 rounded-full text-base text-gray-700 focus:outline-none"
            placeholder="Search your Favorite Restaurant"
          />
        </div>
      </div>

      {/* Restaurant List */}
      <div className="mt-6 px-4 md:px-10 text-white">
        <h4 className="text-center font-semibold text-xl md:text-2xl mb-4">
          Restaurants in {locationQuery || 'Selected Location'}
        </h4>
        <div className="flex flex-col gap-4">
          {loading ? (
            <p className="text-center font-medium">Loading restaurants...</p>
          ) : filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="flex flex-col md:flex-row items-center bg-white text-black p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition duration-200"
                onClick={() => navigate(`/${userId}/resta/${restaurant.id}`)}
              >
                <div className="w-full md:w-1/4 mb-3 md:mb-0">
                  <img
                    src={restaurant.imageurl}
                    alt={restaurant.name}
                    className="w-full h-48 md:h-auto rounded-lg object-cover"
                  />
                </div>
                <div className="flex flex-col w-full md:w-[70%] md:ml-6">
                  <h5 className="text-lg font-bold text-gray-800">{restaurant.name}</h5>
                  <p className="text-sm text-gray-600">{restaurant.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{restaurant.location}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center font-medium">No restaurants found matching your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
