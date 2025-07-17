import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function Userdetails() {
  const API = import.meta.env.VITE_API_URL;
  const [userdetails, setUserdetails] = useState([]);
  const navigate = useNavigate();
  const handlenavigate = ()=> navigate("/adminpage")
  useEffect(() => {
    const fetchUserdetails = async () => {
      try {
        const response = await axios.get(`${API}/userdetails`);
        setUserdetails(response.data || []);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserdetails();
  }, [API]);

  return (
    <div className="p-6">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-2xl font-semibold mb-4">User Details</h2>
        <h2 className="text-2xl font-semibold mb-4 cursor-pointer hover:text-gray-800"
        onClick={handlenavigate}>Back to Dashboard</h2>
      </div>
      {userdetails.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-3 border-b">ID</th>
                <th className="px-6 py-3 border-b">Username</th>
                <th className="px-6 py-3 border-b">Name</th>
              </tr>
            </thead>
            <tbody>
              {userdetails.map((user, index) => (
                <tr
                  key={user.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 border-b text-center">{user.id}</td>
                  <td className="px-6 py-4 border-b">{user.username}</td>
                  <td className="px-6 py-4 border-b">{user.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Userdetails;
