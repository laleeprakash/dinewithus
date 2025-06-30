import React from 'react';
import bg from '../assets/img1.jpg';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const navigate = useNavigate();
  
  const Signin_handler = () => {
    navigate("/Signin"); // Navigate to the /Signin route
  };

  const Signup_handler = () => {
    navigate("/Signup"); // Navigate to the /Signup route
  };

  const AdminLogin_handler = () => {
    navigate("/AdminLogin"); // Navigate to the /AdminLogin route
  };

  return (
    <>
      <div
        className="bg-cover bg-center w-full h-screen bg-blend-overlay"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <div className="h-screen flex flex-col justify-center items-center text-center">
          {/* Welcome Section */}
          <div className="flex-1 flex flex-col justify-center items-center py-8">
            <h2 className="text-4xl font-semibold text-white mb-4 mt-10">
              Welcome to{' '}
              <span className="text-5xl font-bold text-yellow-400">Dine with us</span>
            </h2>
            <h3 className="text-2xl text-white mb-8">
              Reserve Your Seat and Experience Exceptional Dining
            </h3>
            
            {/* Description Text */}
            <p className="bg-transparent px-8 py-6  text-xl font-bold text-white rounded-lg shadow-xl w-[80%] mx-auto mb-8">
              Experience the art of fine dining in a warm and welcoming atmosphere. 
              Our menu features a delightful blend of gourmet dishes crafted with the freshest ingredients. 
              Whether you're here for a casual meal or a special celebration, our attentive staff ensures a memorable dining experience. 
              Join us and savor the moments that make dining with us truly unforgettable.
            </p>

            {/* Sign In / Sign Up Section */}
              <div className="flex flex-col items-center gap-2 mb-2 w-[500px] justify-around">
                {/* Sign Up Section */}
                <div className="flex gap-4 text-xl text-white font-semibold justify-around mb-4">
                <span className='mr-7'>Don't have an account?</span>
                <button
                  className=" bg-transparent border-2 border-orange-400 gap-4 text-orange-500 pl-2 pr-2 pb-2 rounded-3xl shadow-md hover:bg-orange-400 hover:text-white transition duration-200"
                  onClick={Signup_handler}
                >
                  Sign Up
                </button>
              </div>

              {/* Sign In Section */}
              <div className="flex items-center gap-5 text-xl text-white font-semibold">
                <span className='mr-5'>Already have an account?</span>
                <button
                  className="bg-transparent border-2 border-orange-500 text-orange-500 pl-2 pr-2 pb-2 rounded-3xl shadow-md hover:bg-orange-400 hover:text-white transition duration-200"
                  onClick={Signin_handler}
                >
                  Sign In
                </button>
              </div>

              {/* Restaurant Admin Login Section */}
              <div className="flex items-center gap-5 text-xl text-white font-semibold mt-4 ">
                <span className='mr-2'>Restaurant Admin?</span>
                <button
                  className="bg-transparent border-2 border-orange-500 text-orange-500 px-1 py-1 rounded-3xl shadow-md hover:bg-orange-400 hover:text-white transition duration-200 ml-10"
                  onClick={AdminLogin_handler}
                >
                  Admin Login
                </button>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <footer className="w-full py-4 mt-4 bg-gradient-to-t from-black via-gray-900 to-transparent">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                {/* Footer Text */}
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <h3 className="text-3xl font-semibold text-white tracking-wider">Dining Experience</h3>
                  <p className="mt-2 text-lg text-gray-300 opacity-80">
                    Delicious meals. Unforgettable moments. Book your table with us today!
                  </p>
                </div>
                {/* Footer Links */}
                <div>
                  <ul className="flex space-x-6 justify-center md:justify-start text-xl font-medium">
                    <li>
                      <a href="/about" className="text-white hover:text-amber-500 transition duration-300">About Us</a>
                    </li>
                    <li>
                      <a href="/contact" className="text-white hover:text-amber-500 transition duration-300">Contact Us</a>
                    </li>
                    <li>
                      <a href="/feedback" className="text-white hover:text-amber-500 transition duration-300">Feed back</a>
                    </li>
                    <li>
                      <a href="/Privacy" className="text-white hover:text-amber-500 transition duration-300">Privacy Policy</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Homepage;
