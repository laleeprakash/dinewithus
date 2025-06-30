import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Restaurant Header Component
const RestaurantHeader = ({ name }) => (
  <h2 className="text-center text-5xl font-bold text-blue-800 mb-6">{name}</h2>
);

// Restaurant Image Component
const RestaurantImage = ({ imageUrl, name }) => (
  <div className="flex justify-center mb-8">
    <img
      src={imageUrl}
      alt={name}
      className="rounded-lg shadow-lg max-w-full h-auto"
    />
  </div>
);

// Restaurant Description Component
const RestaurantDescription = ({ description }) => (
  <div className="mb-6">
    <strong className="text-2xl font-serif">Description:</strong>
    <p className="text-gray-700 mt-2">{description}</p>
  </div>
);

// Restaurant Location Component
const RestaurantLocation = ({ location }) => (
  <div className="mb-6">
    <strong className="text-2xl font-serif">Location:</strong>
    <p className="text-gray-700 mt-2">{location}</p>
  </div>
);

// Restaurant Rating Component
const RestaurantRating = ({ rating }) => (
  <div className="mb-6">
    <strong className="text-2xl font-serif">Rating:</strong>
    <p className="text-gray-700 mt-2">{rating} / 5 ⭐</p>
  </div>
);

// Restaurant Contact Component
const RestaurantContact = ({ phone, email }) => (
  <div className="mb-6">
    <strong className="text-2xl font-serif">Contact:</strong>
    <p className="text-gray-700 mt-2">Phone: {phone}</p>
    <p className="text-gray-700 mt-2">Email: {email}</p>
  </div>
);

// Restaurant Reviews Component
const RestaurantReviews = ({ reviews }) => (
  <div className="mb-6">
    <strong className="text-2xl font-serif">Customer Reviews:</strong>
    <ul className="mt-2 space-y-4">
      {reviews.map((review, index) => (
        <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <p className="text-gray-700">{review.comment}</p>
          <p className="text-sm text-gray-500 mt-1">- {review.user}</p>
        </li>
      ))}
    </ul>
  </div>
);

// Disclaimer Component
const Disclaimer = () => (
  <div className="mt-8 text-center text-lg text-gray-800">
    <p className="font-serif text-xl leading-relaxed">
      <strong className="text-blue-700">Disclaimer:</strong><br />
      - Refunds are provided for 50% of the total cost if you cancel your booking within 24 hours of the reservation time.<br />
      - If the cancellation is made within 12 hours of the dining time, no refund will be provided.<br />
      - Please arrive at the restaurant at least 10 minutes before your scheduled dining time to ensure a smooth experience.<br />
      - Late arrivals of more than 15 minutes may result in your reservation being canceled, and no refund will be issued.<br />
      - A valid ID is required for verification when booking a table or when arriving at the restaurant.<br />
      - All bookings are subject to availability and may be changed or canceled in case of unforeseen circumstances.<br />
      - Parking is available at the back of the restaurant. Please park only in designated spots to avoid any inconvenience.<br />
      - The restaurant is not responsible for any loss, theft, or damage to personal property while on the premises.<br />
      - By confirming your booking, you acknowledge and agree to these terms and conditions.<br />
    </p>
  </div>
);

function Res() {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
   const API = import.meta.env.VITE_API_URL;
  // Fetch userId from localStorage
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`${API}/restaurant/${id}`);
        setRestaurant(response.data);
        setError(null); // Clear previous errors
      } catch (error) {
        console.error('Error fetching restaurant:', error);
        setError('Failed to fetch restaurant details. Please try again later.');
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchRestaurant();
  }, [id]);

  const handleBooking = async () => {
    if (!userId) {
      alert("You need to be logged in to book a table.");
      navigate("/signin");
      return;
    }

    const confirmed = window.confirm("Are you okay with the Disclaimer?");
    if (confirmed) {
      navigate(`/${userId}/${id}/tablebooking`);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-600">{error}</div>;
  }

  if (!restaurant) {
    return <div className="flex justify-center items-center h-screen">No restaurant data found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-3xl font-bold text-blue-600 mb-8">Restaurant Details</h1>

      {/* Restaurant Header */}
      <RestaurantHeader name={restaurant.name} />

      {/* Restaurant Image */}
      <RestaurantImage imageUrl={restaurant.imageurl} name={restaurant.name} />

      {/* Restaurant Description */}
      <RestaurantDescription description={restaurant.description} />

      {/* Restaurant Location */}
      <RestaurantLocation location={restaurant.location} />

      {/* Restaurant Rating */}
      {restaurant.rating && <RestaurantRating rating={restaurant.rating} />}

      {/* Restaurant Contact */}
      {restaurant.contact && (
        <RestaurantContact phone={restaurant.contact.phone} email={restaurant.contact.email} />
      )}

      {/* Restaurant Reviews */}
      {restaurant.reviews && <RestaurantReviews reviews={restaurant.reviews} />}

      {/* Disclaimer Section */}
      <Disclaimer />

      {/* Book Dining Button */}
      <div className="text-center" onClick={handleBooking}>
        <button className="p-3 bg-green-500 text-white font-extrabold rounded-lg mt-4">
          Book Dining
        </button>
      </div>
    </div>
  );
}

export default Res;
