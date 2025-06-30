import React from 'react';
import bg from '../assets/img1.jpg';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const navigate = useNavigate();

  const Signin_handler = () => {
    navigate("/signin");
  };

  const Signup_handler = () => {
    navigate("/signup");
  };

  const AdminLogin_handler = () => {
    navigate("/adminLogin");
  };

  return (
    <div
      className="bg-cover bg-center w-full h-screen bg-blend-overlay"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <div className="h-screen flex flex-col justify-between items-center text-center py-10">
        {/* Welcome Section */}
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-4xl font-semibold text-white mb-4">
            Welcome to{' '}
            <span className="text-5xl font-bold text-yellow-400">Dine with us</span>
          </h2>
          <h3 className="text-2xl text-white mb-6">
            Reserve Your Seat and Experience Exceptional Dining
          </h3>

          {/* Description */}
          <p className="bg-transparent px-8 py-6 text-xl font-bold text-white rounded-lg shadow-xl w-[80%] max-w-4xl mb-8">
            Experience the art of fine dining in a warm and welcoming atmosphere.
            Our menu features a delightful blend of gourmet dishes crafted with the freshest ingredients.
            Whether you're here for a casual meal or a special celebration, our attentive staff ensures a memorable dining experience.
            Join us and savor the moments that make dining with us truly unforgettable.
          </p>

          {/* Auth Buttons */}
          <div className="flex flex-col items-center gap-4 w-full max-w-md">
            {/* Sign Up */}
            <div className="flex gap-4 text-xl text-white font-semibold items-center justify-between w-full px-4">
              <span>Don't have an account?</span>
              <button
                className="border-2 border-orange-400 text-orange-500 px-4 py-2 rounded-3xl shadow-md hover:bg-orange-400 hover:text-white transition"
                onClick={Signup_handler}
              >
                Sign Up
              </button>
            </div>

            {/* Sign In */}
            <div className="flex gap-4 text-xl text-white font-semibold items-center justify-between w-full px-4">
              <span>Already have an account?</span>
              <button
                className="border-2 border-orange-500 text-orange-500 px-4 py-2 rounded-3xl shadow-md hover:bg-orange-400 hover:text-white transition"
                onClick={Signin_handler}
              >
                Sign In
              </button>
            </div>

            {/* Admin Login */}
            <div className="flex gap-4 text-xl text-white font-semibold items-center justify-between w-full px-4">
              <span>Restaurant Admin?</span>
              <button
                className="border-2 border-orange-500 text-orange-500 px-4 py-2 rounded-3xl shadow-md hover:bg-orange-400 hover:text-white transition"
                onClick={AdminLogin_handler}
              >
                Admin Login
              </button>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="w-full py-4 bg-gradient-to-t from-black via-gray-900 to-transparent">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-white">
              {/* Footer Text */}
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h3 className="text-2xl font-semibold">Dining Experience</h3>
                <p className="mt-1 text-lg opacity-80">
                  Delicious meals. Unforgettable moments. Book your table with us today!
                </p>
              </div>

              {/* Footer Links */}
              <ul className="flex flex-wrap justify-center md:justify-start gap-6 text-lg font-medium mt-4 md:mt-0">
                <li>
                  <a href="/about" className="hover:text-amber-500 transition duration-300">About Us</a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-amber-500 transition duration-300">Contact Us</a>
                </li>
                <li>
                  <a href="/feedback" className="hover:text-amber-500 transition duration-300">Feedback</a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-amber-500 transition duration-300">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Homepage;
