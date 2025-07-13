import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Inputbox } from "../components/Inputbox";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";

function Signin() {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill in both email and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/signin`, {
        username,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", user.id); // optional
        alert("Login successful!");
        navigate("/"); // redirect after login
      }
    } catch (err) {
      console.error(err);
      alert("Login failed: " + (err.response?.data?.error || "Something went wrong."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={loginHandler} className="bg-white p-8 rounded shadow w-full max-w-md">
        <Heading label="Sign In" />
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
          label="Sign In"
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white rounded p-2"
        />
      </form>
    </div>
  );
}

export default Signin;
