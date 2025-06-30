import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";

function Restaurantlogin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState(""); // Error state

  const handlemail = (e) => setemail(e.target.value);
  const handlepassword = (e) => setpassword(e.target.value);

  const handlelogin = async () => {
    // Input validation
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true); // Set loading state
    setError(""); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:3000/owner-signin", {
        email,
        password,
      });

      if (response.status === 200) {
        // Save the token (if returned) in local storage or cookies
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }

        // Save the owner id in local storage
        if (response.data.owner && response.data.owner.id) {
          localStorage.setItem("id", response.data.owner.id);
        }

        // Navigate to owner page after successful login
        const ownerId = localStorage.getItem("id");
        navigate(`/ownerpage/${ownerId}`);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.response?.data?.message || "An error occurred during login.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-cover bg-center">
      <div className="bg-white p-8 rounded-xl w-full max-w-lg flex flex-col justify-center items-center shadow-lg">
        <Heading label={"Owner Login"} />

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email-signup" className="block text-gray-700 text-lg">
            Email
          </label>
          <Inputbox
            value={email}
            type="email"
            id="email-signup"
            placeholder="Enter your email"
            onChange={handlemail}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password-signin" className="block text-gray-700 text-lg">
            Password
          </label>
          <Inputbox
            value={password}
            type="password"
            id="password-signin"
            placeholder="Enter your password"
            onChange={handlepassword}
            required
          />
        </div>

        <Button
          onClick={handlelogin}
          type="submit"
          label={isLoading ? "Signing in..." : "Sign In"}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}

export default Restaurantlogin;
