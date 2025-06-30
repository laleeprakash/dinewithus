import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "/src/App.css";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Button } from "../components/Button";
import Bottom from "../components/Bottom";

function Signup() {
  const navigate = useNavigate();

  // State initialization (useState)
  const [username, setusername] = useState("");
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // To handle form submission status

  // Event handlers
  const mailhandler = (e) => {
    setusername(e.target.value);
  };

  const phonehandler = (e) => {
    setphone(e.target.value);
  };

  const namehandler = (e) => {
    setname(e.target.value);
  };

  const passwordhandler = (e) => {
    setpassword(e.target.value);
  };

  // Submit handler
  const submithandler = async (e) => {
    e.preventDefault(); // Prevent form's default submit behavior

    // Basic validations
    if (!/\S+@\S+\.\S+/.test(username)) { // General email regex
      alert("Invalid email, please enter a valid email.");
      return;
    }
    if (phone.length !== 10) {
      alert("Entered Invalid Phone No");
      return;
    }
    if (username === "" || name === "" || password === "" || phone === "") {
      alert("Everything should be filled...");
      return;
    }

    // Prevent multiple submissions by disabling the button
    setIsSubmitting(true);

    try {
      // Make a POST request to the backend to create a user
      const response = await axios.post("http://localhost:3000/signup", {
        username,
        name,
        phone,
        password,
      });

      // After successful signup, store the userId in localStorage
      if (response.data.token) {
        localStorage.setItem("userId", response.data.user.username); // Save the username (or userId) to localStorage
        localStorage.setItem("authToken", response.data.token); // Optionally save the JWT token for auth
      }

      alert("Account created successfully! Click Okay");
      navigate("/signin"); // Navigate to Sign In page after successful signup
    } catch (error) {
      console.error("There was an error during the signup process:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false); // Re-enable the button after the request is finished
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-cover bg-center" >
      <div className="bg-white p-8 rounded-xl w-full max-w-lg flex flex-col justify-center items-center shadow-lg">
        <Heading className="text-3xl font-bold text-center text-gray-800 mb-6" label={"Sign up"}/>
        <form className="w-full" onSubmit={submithandler}> {/* Handle form submit here */}
          <div className="mb-4">
            <label htmlFor="email-signup" className="block text-gray-700 text-lg">Email</label>
            <Inputbox
              type="email"
              id="email-signup"
              placeholder="Enter your email"
              value={username}
              onChange={mailhandler}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone-signup" className="block text-gray-700 text-lg">Phone No</label>
            <Inputbox
              type="tel"
              id="phone-signup"
              placeholder="Enter your phone number"
              value={phone}
              onChange={phonehandler}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="name-signup" className="block text-gray-700 text-lg">Full Name</label>
            <Inputbox
              type="text"
              id="name-signup"
              placeholder="Enter your name"
              value={name}
              onChange={namehandler}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password-signup" className="block text-gray-700 text-lg">Password</label>
            <Inputbox
              type="password"
              id="password-signup"
              placeholder="Enter your password"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={passwordhandler}
              required
            />
          </div>

          <Button
            type="submit"  // Submit event handled by form onSubmit
            className="w-full p-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-500 transition duration-200"
            label={"Sign Up"}
            disabled={isSubmitting}  // Disable the button during submission
          >
          </Button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm">
            Already have an account?{" "}
            <a href="/signin" className="font-bold text-green-500 opacity-90 hover:text-green-600 hover:opacity-100">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
