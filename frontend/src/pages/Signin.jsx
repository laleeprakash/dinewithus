import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Button } from "../components/Button";
import Bottom from "../components/Bottom";
import axios from "axios";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);  // New state to handle loading
  const [errorMessage, setErrorMessage] = useState("");  // To show errors
  const navigate = useNavigate();

  const mailhandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordhandler = (e) => {
    setPassword(e.target.value);
  };

  const signinhandler = async (e) => {
    e.preventDefault(); 

    if (!username || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    try {
      setIsLoading(true);  // Set loading to true when making the request

      const response = await axios.post("http://localhost:3000/signin", {
        username,
        password,
      });

      const { token, user } = response.data;

      // Save the user data and token into localStorage
      localStorage.setItem('userId', user.id);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to the homepage with the user ID
      navigate(`/homepage/${user.id}`);
    } catch (error) {
      console.error("There was an error during the sign-in process:", error);
      setErrorMessage("Invalid username or password. Please try again.");
    } finally {
      setIsLoading(false);  // Set loading to false after the request finishes
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-cover bg-center">
      <div className="bg-white p-8 rounded-xl w-full max-w-lg flex flex-col justify-center items-center shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign In</h1>

        {errorMessage && (
          <div className="mb-4 text-red-600 text-center">{errorMessage}</div>
        )}

        <form onSubmit={signinhandler} className="w-full">
          <div className="mb-4">
            <label htmlFor="email-signin" className="block text-gray-700 text-lg">Email</label>
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
            <label htmlFor="password-signin" className="block text-gray-700 text-lg">Password</label>
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
            <a href="/signup" className="font-bold text-green-500 opacity-90 hover:text-green-600 hover:opacity-100">
              Sign Up
            </a>
          </p>
          <p className="text-sm mt-2">
            <a href="/adminlogin" className="font-bold text-green-500 opacity-90 hover:text-green-600 hover:opacity-100">
              Login as Admin
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
