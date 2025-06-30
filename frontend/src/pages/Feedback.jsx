import axios from "axios";
import { useEffect, useState } from "react";

function Feedback() {
  const [feedback, setFeedback] = useState([]);
  const API = import.meta.env.VITE_API_URL; // Get the base URL from env

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`${API}/feedbacks`);
        setFeedback(response.data.feedbacks || []);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedback();
  }, [API]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex justify-center mt-4">Feedback</h2>
      {feedback.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <table className="w-full border-collapse mt-5">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Message</th>
            </tr>
          </thead>
          <tbody>
            {feedback.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                <td className="border border-gray-300 px-4 py-2">{item.full_Name}</td>
                <td className="border border-gray-300 px-4 py-2">{item.email}</td>
                <td className="border border-gray-300 px-4 py-2">{item.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Feedback;
