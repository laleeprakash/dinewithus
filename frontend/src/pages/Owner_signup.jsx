import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios"; // Ensure axios is imported
import { Inputbox } from "../components/Inputbox";
import { Button } from "../components/Button";

function Owner_signup() {
   const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const [success, setSuccess] = useState(""); // Success state

  const handlename = (e) => {
    setname(e.target.value);
  };

  const handlemail = (e) => {
    setemail(e.target.value);
  };

  const handlepassword = (e) => {
    setpassword(e.target.value);
  };

  const handlesubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Input validation
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true); // Set loading state
    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success messages

    try {
      const response = await axios.post(`${API}/owner-signup`, {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        setSuccess("Signup successful! Redirecting to login...");
        setname("");
        setemail("");
        setpassword("");
        setTimeout(() => {
          navigate("/restaurantlogin");
        }, 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setError(
        error.response?.data?.message || "An error occurred during signup."
      );
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg my-12">
        <h2 className="text-3xl font-extrabold text-center text-blue-900 mb-6">
          Restaurant Owner Signup
        </h2>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handlesubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-lg">
              Owner Name
            </label>
            <Inputbox
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={handlename}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-lg">
              Email
            </label>
            <Inputbox
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={handlemail}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-lg">
              Password
            </label>
            <Inputbox
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlepassword}
              required
            />
          </div>

         <div className="flex flex-row justify-around" >
         <Button
            label={loading ? "Submitting..." : "Submit"}
            onClick={handlesubmit}
            disabled={loading} // Disable button while loading
          />
          <Button label={"Already had Account"} onClick={()=>{
            navigate("/restaurantlogin")
          }}/>
         </div>
        </form>
      </div>
    </div>
  );
}

export default Owner_signup;