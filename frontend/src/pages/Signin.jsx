import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Button } from "../components/Button";
import axios from "axios";

function Signin() {
  const API = import.meta.env.VITE_API_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const mailhandler = (e) => setUsername(e.target.value);
  const passwordhandler = (e) => setPassword(e.target.value);

  const signinhandler = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await axios.post(`${API}/signin`, {
        username,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("tokenTimestamp", Date.now().toString());  // Save timestamp
      localStorage.setItem("userId", user.id);
      localStorage.setItem("user", JSON.stringify(user));

      navigate(`/homepage/${user.id}`);
    } catch (error) {
      console.error("There was an error during the sign-in process:", error);
      setErrorMessage("Invalid username or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-cover bg-center">
      <div className="bg-white p-8 rounded-xl w-full max-w-lg flex flex-col justify-center items-center shadow-lg">
        <Heading label="Sign In" />

        {errorMessage && (
          <div className="mb-4 text-red-600 text-center">{errorMessage}</div>
        )}

        <form onSubmit={signinhandler} className="w-full">
          <div className="mb-4">
            <label htmlFor="email-signin" className="block text-gray-700 text-lg">
              Email
            </label>
            <Inputbox
              type="email"
              id="email-signin"
              placeholder="Enter your email"
              value={username}
              onChange={mailhandler}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password-signin" className="block text-gray-700 text-lg">
              Password
            </label>
            <Inputbox
              type="password"
              id="password-signin"
              placeholder="Enter your password"
              value={password}
              onChange={passwordhandler}
              required
            />
          </div>

          <Button
            type="submit"
            label={isLoading ? "Signing in..." : "Sign In"}
            disabled={isLoading}
          />
        </form>

        <div className="text-center mt-4">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-bold text-green-500 opacity-90 hover:text-green-600 hover:opacity-100"
            >
              Sign Up
            </Link>
          </p>
          <p className="text-sm mt-2">
            <Link
              to="/adminlogin"
              className="font-bold text-green-500 opacity-90 hover:text-green-600 hover:opacity-100"
            >
              Login as Admin
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
