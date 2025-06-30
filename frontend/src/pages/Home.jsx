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
  const API = import.meta.env.VITE_API_URL; // ✅ API base URL from .env

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

  const handleLogin = () => {
    navigate("/owner-signup");
  };

  const handleDropdownClick = () => {
    navigate(`/profile/${userId}`);
  };

  const handleBookedTable = () => {
    navigate(`/${userId}/bookedtable`);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem("token");
    navigate('/signin');
  };

  return (
    <div
      className="bg-cover bg-center w-full h-screen bg-blend-overlay"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Navigation Bar */}
      <ul className="flex flex-row font-bold justify-end items-end gap-10 p-7 mr-20 text-white">
        <li className="cursor-pointer hover:text-yellow-400 transition duration-300" onClick={handleLogin}>
          Investor Relations
        </li>
        <li className="cursor-pointer hover:text-yellow-400 transition duration-300" onClick={handleDropdownClick}>
          Profile
        </li>
        <li className="cursor-pointer hover:text-yellow-400 transition duration-300" onClick={handleBookedTable}>
          Booked Restaurant
        </li>
        <li className="cursor-pointer hover:text-yellow-400 transition duration-300" onClick={handleLogout}>
          Log out
        </li>
      </ul>

      {/* Hero Text */}
      <div className="text-center pt-10">
        <h2 className="font-serif text-5xl text-yellow-500 drop-shadow-lg">RESERVE YOUR SEAT</h2>
        <h3 className="text-4xl font-light tracking-wider text-white mt-4">
          Discover The Best Restaurants & Food
        </h3>
      </div>

      {/* Search Bar */}
      <div className="bg-white mx-[15%] rounded-lg shadow-2xl flex items-center py-3 mt-8 px-6">
        <div className="flex flex-row items-center w-full space-x-6">
          {/* Location Input */}
          <div className="flex items-center w-full bg-gray-50 rounded-full px-4 py-2">
            <img src={locationimg} alt="Location" className="w-6 h-6" />
            <input
              className="w-full px-4 py-2 ml-2 rounded-full text-lg text-gray-700 focus:outline-none"
              placeholder="Search by Location"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
            />
          </div>

          <div className="font-bold py-3 text-xl text-gray-400">|</div>

          {/* Restaurant Name Input */}
          <div className="flex items-center w-full bg-gray-50 rounded-full px-4 py-2">
            <img src={searchicon} alt="Search" className="w-6 h-6" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 ml-2 rounded-full text-lg text-gray-700 focus:outline-none"
              placeholder="Search your Favorite Restaurant"
            />
          </div>
        </div>
      </div>

      {/* Restaurant List */}
      <div className="mt-8 text-white text-lg px-10">
        <h4 className="text-center font-semibold text-2xl mb-6">
          Restaurants in {locationQuery || 'Selected Location'}
        </h4>
        <div className="flex flex-col gap-6 mt-4">
          {loading ? (
            <p className="text-center text-white font-semibold">Loading restaurants...</p>
          ) : filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="flex justify-between items-center bg-white p-5 rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition duration-300 ease-in-out font-extrabold"
                onClick={() => navigate(`/${userId}/resta/${restaurant.id}`)}
              >
                <div className="w-1/4">
                  <img
                    src={restaurant.imageurl}
                    alt={restaurant.name}
                    className="w-full h-auto rounded-lg object-cover"
                  />
                </div>
                <div className="flex flex-col w-[70%]">
                  <h5 className="text-xl font-semibold text-gray-800">{restaurant.name}</h5>
                  <p className="text-sm text-gray-600">{restaurant.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{restaurant.location}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-white font-semibold">No restaurants found matching your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
