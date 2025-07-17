import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";  // Import Link
import { Inputbox } from "../components/Inputbox";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";

function Signup() {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); 
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signupHandler = async (e) => {
    e.preventDefault();

    if (!username || !password || !name || !phone) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await axios.post(`${API}/signup`, {
        username,
        password,
        name,
        phone,
      });

      alert("Account created successfully! Please sign in.");
      navigate("/signin");
    } catch (err) {
      console.error(err);
      setErrorMessage(
        err.response?.data?.error || "Signup failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form
        onSubmit={signupHandler}
        className="bg-white p-8 rounded shadow w-full max-w-md"
      >
        <Heading label="Sign Up" />
        
        {errorMessage && (
          <div className="mb-4 text-red-600 text-center">{errorMessage}</div>
        )}

        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <Inputbox
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Phone</label>
          <Inputbox
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <Inputbox
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <Inputbox
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <Button
          type="submit"
          label={isSubmitting ? "Creating Account..." : "Sign Up"}
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white rounded p-2"
        />
      </form>

      <p className="mt-4 text-center text-gray-700">
        Already have an account?{" "}
        <Link
          to="/signin"
          className="text-green-600 font-semibold hover:text-green-800"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}

export default Signup;
