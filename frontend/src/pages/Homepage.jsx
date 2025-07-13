import React from 'react';
import bg from '../assets/img1.jpg';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const navigate = useNavigate();

  const Signin_handler = () => navigate("/signin");
  const Signup_handler = () => navigate("/signup");
  const AdminLogin_handler = () => navigate("/adminLogin");

  return (
    <div
      className="w-full h-screen bg-cover bg-center bg-blend-overlay"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <div className="h-full flex flex-col justify-between items-center text-center py-8 px-4 sm:px-6 md:px-12">
        {/* Welcome Section */}
        <div className="flex flex-col justify-center items-center flex-1 w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4">
            Welcome to <span className="text-yellow-400 font-bold">Dine with us</span>
          </h2>
          <h3 className="text-xl sm:text-2xl md:text-3xl text-white mb-6">
            Reserve Your Seat and Experience Exceptional Dining
          </h3>

          <p className="bg-transparent px-4 sm:px-6 py-4 text-base sm:text-lg md:text-xl font-medium text-white rounded-lg shadow-lg max-w-4xl mb-8">
            Experience the art of fine dining in a warm and welcoming atmosphere.
            Our menu features a delightful blend of gourmet dishes crafted with the freshest ingredients.
            Whether you're here for a casual meal or a special celebration, our attentive staff ensures a memorable dining experience.
            Join us and savor the moments that make dining with us truly unforgettable.
          </p>

          {/* Auth Buttons */}
          <div className="flex flex-col gap-4 w-full max-w-md">
            {[
              {
                label: "Don't have an account?",
                action: "Sign Up",
                handler: Signup_handler,
              },
              {
                label: "Already have an account?",
                action: "Sign In",
                handler: Signin_handler,
              },
              {
                label: "Restaurant Admin?",
                action: "Admin Login",
                handler: AdminLogin_handler,
              },
            ].map(({ label, action, handler }, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-between text-white text-lg sm:text-xl font-semibold px-2"
              >
                <span>{label}</span>
                <button
                  className="border-2 border-orange-400 text-orange-500 px-5 py-2 rounded-3xl shadow-md hover:bg-orange-400 hover:text-white transition"
                  onClick={handler}
                >
                  {action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <footer className="w-full py-4 bg-gradient-to-t from-black via-gray-900 to-transparent mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-white text-center md:text-left">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl sm:text-2xl font-semibold">Dining Experience</h3>
                <p className="mt-1 text-sm sm:text-base opacity-80">
                  Delicious meals. Unforgettable moments. Book your table with us today!
                </p>
              </div>

              <ul className="flex flex-wrap justify-center md:justify-end gap-4 text-sm sm:text-base font-medium mt-4 md:mt-0">
                {["About Us", "Contact Us", "Feedback", "Privacy Policy"].map((link, i) => (
                  <li key={i}>
                    <a
                      href={`/${link.toLowerCase().replace(/ /g, '')}`}
                      className="hover:text-amber-500 transition duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Homepage;
