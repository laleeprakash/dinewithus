import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function Restaurantdetails() {
  const API = import.meta.env.VITE_API_URL;
  const [data, setData] = useState({ restaurantDetails: [], usersWithBookings: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handlenavigate = () => navigate("/adminpage")
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${API}/admin_dashboard_data`);
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch admin dashboard data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [API]);

  if (loading)
    return <p className="p-6 text-center text-gray-600">Loading...</p>;

  if (error)
    return <p className="p-6 text-center text-red-600">{error}</p>;

  const { restaurantDetails, usersWithBookings } = data;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-16">
      {/* Restaurant Owners & Their Restaurants */}
      <section>
       <div className="flex flex-row justify-between">
         <h2 className="text-3xl font-semibold mb-8 border-b pb-2">Restaurant Owners & Details</h2>
         <h2 className="text-2xl font-semibold mb-8  pb-2 cursor-pointer"
         onClick={handlenavigate}> Back to DashBoard</h2>
       </div>

        {restaurantDetails.length === 0 ? (
          <p className="text-gray-500">No restaurant owners found.</p>
        ) : (
          restaurantDetails.map((owner) => (
            <div key={owner.id} className="mb-12">
              <h3 className="text-xl font-bold mb-4">
                {owner.name}{" "}
                <span className="text-sm text-gray-500">({owner.email})</span>
              </h3>

              {owner.restaurant.length === 0 ? (
                <p className="text-gray-500">No restaurants available.</p>
              ) : (
                owner.restaurant.map((rest) => (
                  <div key={rest.id} className="mb-10 border rounded-md p-4 shadow-sm">
                    <h4 className="text-lg font-semibold mb-2 flex items-center justify-between">
                      <span>{rest.name} - <span className="text-gray-600">{rest.location}</span></span>
                      <span
                        className={`text-sm font-medium px-2 py-1 rounded ${
                          rest.approval === 1 ? "bg-green-200 text-green-800" :
                          rest.approval === 0 ? "bg-red-200 text-red-800" :
                          "bg-yellow-200 text-yellow-800"
                        }`}
                      >
                        {rest.approval === 1 ? "Approved" : rest.approval === 0 ? "Rejected" : "Pending"}
                      </span>
                    </h4>

                    <p className="mb-4 text-gray-700">{rest.description}</p>

                    {rest.imageurl && (
                      <img
                        src={rest.imageurl}
                        alt={rest.name}
                        className="max-w-xs rounded mb-6"
                      />
                    )}

                    {/* Tables */}
                    <div className="mb-6">
                      <h5 className="font-semibold mb-2">Tables</h5>
                      {rest.tables.length === 0 ? (
                        <p className="text-gray-500">No tables available.</p>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="min-w-full border border-gray-300 rounded-md">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="px-4 py-2 border-b text-left">Table Number</th>
                                <th className="px-4 py-2 border-b text-left">Capacity</th>
                                <th className="px-4 py-2 border-b text-left">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {rest.tables.map((table) => (
                                <tr key={table.id} className="even:bg-gray-50">
                                  <td className="px-4 py-2 border-b">{table.tableNumber}</td>
                                  <td className="px-4 py-2 border-b">{table.capacity}</td>
                                  <td className="px-4 py-2 border-b">
                                    {table.status === 0 ? (
                                      <span className="text-green-600 font-medium">Available</span>
                                    ) : (
                                      <span className="text-red-600 font-medium">Booked</span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>

                    {/* Bookings */}
                    <div>
                      <h5 className="font-semibold mb-2">Bookings</h5>
                      {rest.bookings.length === 0 ? (
                        <p className="text-gray-500">No bookings yet.</p>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="min-w-full border border-gray-300 rounded-md">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="px-4 py-2 border-b text-left">Booking Date</th>
                                <th className="px-4 py-2 border-b text-left">Guests</th>
                                <th className="px-4 py-2 border-b text-left">Customer</th>
                                <th className="px-4 py-2 border-b text-left">Username</th>
                                <th className="px-4 py-2 border-b text-left">Phone</th>
                              </tr>
                            </thead>
                            <tbody>
                              {rest.bookings.map((booking) => (
                                <tr key={booking.id} className="even:bg-gray-50">
                                  <td className="px-4 py-2 border-b">
                                    {new Date(booking.bookingDate).toLocaleString()}
                                  </td>
                                  <td className="px-4 py-2 border-b text-center">{booking.numberOfGuests}</td>
                                  <td className="px-4 py-2 border-b">{booking.user?.name || "Unknown"}</td>
                                  <td className="px-4 py-2 border-b">{booking.user?.username || "Unknown"}</td>
                                  <td className="px-4 py-2 border-b">{booking.user?.phone || "Unknown"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          ))
        )}
      </section>

      {/* Users & Their Bookings */}
      <section>
        <h2 className="text-3xl font-semibold mb-8 border-b pb-2">Users & Bookings</h2>

        {usersWithBookings.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          usersWithBookings.map((user) => (
            <div key={user.id} className="mb-10 border rounded-md p-4 shadow-sm">
              <h3 className="text-xl font-bold mb-4">
                {user.name}{" "}
                <span className="text-gray-600 text-sm">({user.username})</span> - {user.phone}
              </h3>

              {user.bookings.length === 0 ? (
                <p className="text-gray-500">No bookings available.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 rounded-md">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 border-b text-left">Booking Date</th>
                        <th className="px-4 py-2 border-b text-left">Guests</th>
                        <th className="px-4 py-2 border-b text-left">Table Number</th>
                        <th className="px-4 py-2 border-b text-left">Capacity</th>
                        <th className="px-4 py-2 border-b text-left">Table Status</th>
                        <th className="px-4 py-2 border-b text-left">Restaurant Name</th>
                        <th className="px-4 py-2 border-b text-left">Location</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.bookings.map((booking) => (
                        <tr key={booking.id} className="even:bg-gray-50">
                          <td className="px-4 py-2 border-b">
                            {new Date(booking.bookingDate).toLocaleString()}
                          </td>
                          <td className="px-4 py-2 border-b text-center">{booking.numberOfGuests}</td>
                          <td className="px-4 py-2 border-b">{booking.table?.tableNumber || "Unknown"}</td>
                          <td className="px-4 py-2 border-b text-center">{booking.table?.capacity || "Unknown"}</td>
                          <td className="px-4 py-2 border-b text-center">
                            {booking.table?.status === 0 ? (
                              <span className="text-green-600 font-medium">Available</span>
                            ) : (
                              <span className="text-red-600 font-medium">Booked</span>
                            )}
                          </td>
                          <td className="px-4 py-2 border-b">{booking.restaurant?.name || "Unknown"}</td>
                          <td className="px-4 py-2 border-b">{booking.restaurant?.location || "Unknown"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default Restaurantdetails;
