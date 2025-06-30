import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

function NotifyTable() {
  const { userId, restaurantId } = useParams();
  const navigate = useNavigate();
  const [notifyData, setNotifyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleNotify = (table) => {
    alert(`Notification sent for Table #${table.tableNumber}`);
    // Here you could also add an API call to notify the restaurant staff
  };

  const handleBackToHomepage = () => {
    navigate(`/homepage/${userId}`);
  };

  useEffect(() => {
    const fetchBookedTables = async () => {
      try {
        if (!restaurantId) {
          throw new Error("Restaurant ID is missing");
        }

        const response = await fetch(
          `http://localhost:3000/${restaurantId}/notify_restaurant`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setNotifyData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookedTables();
  }, [restaurantId]);

  if (loading) return <div className="p-5 text-center">Loading...</div>;
  if (error) return <div className="p-5 text-red-500 text-2xl">All the table Available </div>;
  if (!notifyData) return <div className="p-5">No booked tables found</div>;

  return (
    <div className="max-w-6xl mx-auto p-8 font-sans relative">
      <button 
        onClick={handleBackToHomepage}
        className="absolute top-0 right-0 font-bold text-lg text-blue-600 hover:text-blue-800 transition-colors flex items-center "
      >
        ← Back to Homepage
      </button>

      <div className="text-center mb-8 p-4 bg-gray-50 rounded-lg relative">
        <div className="absolute right-4 top-4">
          {notifyData.imageurl ? (
            <img 
              src={notifyData.imageurl} 
              alt={notifyData.name} 
              className="w-20 h-20 object-cover rounded-full border-2 border-white shadow-md"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-200 rounded-full flex justify-center items-center border-2 border-white shadow-md">
              <span className="text-xs text-gray-500">No Image</span>
            </div>
          )}
        </div>
        
        <h1 className="text-3xl text-gray-800 mb-2">{notifyData.name}</h1>
        <p className="text-lg text-gray-600">
          📍 {notifyData.location}
        </p>
      </div>
      
      <h2 className="text-2xl text-gray-800 mb-6 pb-2 border-b border-gray-200">
        Booked Tables ({notifyData.tables?.length || 0})
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notifyData.tables?.length > 0 ? (
          notifyData.tables.map((table) => (
            <div 
              key={table.id}
              className="bg-white rounded-xl shadow-sm p-6 transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer"
            >
              <div className="mb-4">
                <h3 className="text-xl text-blue-500 mb-2">
                  Table #{table.tableNumber}
                </h3>
                <p className="text-gray-600">
                  Capacity: {table.capacity} people
                </p>
              </div>
              <div className="text-center">
                <button 
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNotify(table);
                  }}
                >
                  Notify 
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600 py-8">
            No booked tables available.
          </div>
        )}
      </div>
    </div>
  );
}

export default NotifyTable;