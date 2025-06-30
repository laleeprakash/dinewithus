import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function View_Booked_dining() {
   const API = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [ownerData, setOwnerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null); // Track which booking is being updated

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API}/owner/${id}`);
      setOwnerData(response.data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApiError = (error) => {
    console.error("API Error:", error);
    let errorMessage = "Failed to fetch data";
    
    if (error.response) {
      if (error.response.status === 404) {
        errorMessage = "Owner not found. Please check the ID.";
      } else if (error.response.status === 500) {
        errorMessage = "Server error. Please try again later.";
      }
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    setError(errorMessage);
  };

  const handleStatusUpdate = async (bookingId, tableId) => {
    try {
      setUpdatingId(bookingId);
      
      // Update the status on the backend
      await axios.put(`${API}/tables/${tableId}/status`, {
        status: 0 // 0 means available
      });

      // Refresh the data after successful update
      await fetchData();
    } catch (error) {
      console.error("Failed to update status:", error);
      setError("Failed to update table status");
    } finally {
      setUpdatingId(null);
    }
  };

  const processBookings = () => {
    if (!ownerData || !ownerData.restaurant) return [];

    return ownerData.restaurant.flatMap(restaurant => {
      if (!restaurant.bookings || !Array.isArray(restaurant.bookings)) return [];
      
      return restaurant.bookings.map(booking => {
        const table = restaurant.tables?.find(t => t.id === booking.tableId);
        
        return {
          ...booking,
          id: booking.id, // Ensure booking id is included
          tableId: booking.tableId, // Ensure table id is included
          restaurantName: restaurant.name || 'Unknown Restaurant',
          location: restaurant.location || 'Unknown Location',
          tableNumber: table?.tableNumber || 'N/A',
          capacity: table?.capacity || 'N/A',
          status: table?.status === 1 ? 'Booked' : 'Available',
          customerName: booking.user?.name || 'Unknown Customer',
          customerPhone: booking.user?.phone || 'N/A',
          customerUsername: booking.user?.username || 'N/A'
        };
      });
    });
  };

  const allBookings = processBookings();

  const formatDate = (dateString) => {
    try {
      const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch {
      return 'Invalid date';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mx-4 my-8">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!ownerData) {
    return (
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded mx-4 my-8">
        <p>No owner data found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {ownerData.name || 'Owner'}'s Restaurant Bookings
        </h1>
        <div className="flex flex-wrap gap-4 text-gray-600">
          <p><span className="font-semibold">Email:</span> {ownerData.email || 'N/A'}</p>
          <p><span className="font-semibold">Total Restaurants:</span> {ownerData.restaurant?.length || 0}</p>
          <p><span className="font-semibold">Total Bookings:</span> {allBookings.length}</p>
        </div>
      </div>

      {allBookings.length === 0 ? (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded">
          <p>No bookings available for any restaurants.</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Table</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {booking.restaurantName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {booking.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {booking.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {booking.customerPhone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {booking.customerUsername}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {formatDate(booking.bookingDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {booking.tableNumber}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {booking.capacity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.status === 'Booked' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleStatusUpdate(booking.id, booking.tableId)}
                        disabled={updatingId === booking.id || booking.status === 'Available'}
                        className={`px-3 py-1 rounded-md text-white ${
                          booking.status === 'Available'
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                        } ${
                          updatingId === booking.id ? 'opacity-50 cursor-wait' : ''
                        }`}
                      >
                        {updatingId === booking.id ? 'Updating...' : 'Mark Available'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default View_Booked_dining;