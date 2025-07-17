import axios from "axios";
import { useState, useEffect } from "react";

function Userdetails() {
  const API = import.meta.env.VITE_API_URL;
  const [userdetails, setUserdetails] = useState([]);

  useEffect(() => {
    const fetchUserdetails = async () => {
      try {
        const response = await axios.get(`${API}/userdetails`);
        setUserdetails(response.data.userdetails || []);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserdetails();
  }, [API]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Details</h2>

      {userdetails.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {userdetails.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Userdetails;
