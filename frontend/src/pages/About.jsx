import bg from "../assets/img1.jpg";

function About() {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-700 text-white">
      <div
        className="px-4 py-8 md:px-16 min-h-screen bg-opacity-80"
        style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {/* About Us Title */}
        <h1 className="font-extrabold text-5xl text-center mb-11 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-red-300 relative group drop-shadow-lg">
          About Us
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-100 via-transparent to-red-100 opacity-60 rounded-full transform scale-x-0 transition-all duration-500 group-hover:scale-x-100"></span>
        </h1>

        {/* Subtitle */}
        <h2 className="font-semibold text-3xl text-center mb-5 text-teal-100 drop-shadow-md hover:text-teal-200 transition-colors duration-300">
          Welcome to Dine With Us – Your Seamless Dining Experience
        </h2>

        {/* Description */}
        <div className="flex justify-center w-full mb-10">
          <h3 className="text-lg font-semibold text-teal-200 text-center w-full md:w-3/4 drop-shadow-md hover:text-teal-300 transition-colors duration-300">
            At Dine With Us, we believe in transforming your dining experience by combining the best of technology with exceptional hospitality. Our platform is designed to make reserving a table at your favorite restaurant effortless and convenient, providing you with a smooth experience from start to finish.
          </h3>
        </div>

        {/* Our Mission */}
        <h2 className="font-semibold text-3xl text-center mb-6 text-emerald-200 drop-shadow-lg hover:text-emerald-300 transition-colors duration-300">
          Our Mission
        </h2>
        <p className="text-lg text-lime-100 mb-6 text-center drop-shadow-md hover:text-lime-200 transition-colors duration-300">
          We aim to simplify the way you book your dining experiences by offering a hassle-free table reservation system. Whether it’s a casual lunch or a special celebration, our goal is to ensure that your dining experience is seamless, timely, and enjoyable. With just a few clicks, you can reserve your seat and let us take care of the rest!
        </p>

        {/* Why Choose Us */}
        <h2 className="font-semibold text-2xl text-center mb-5 text-emerald-300 drop-shadow-md hover:text-emerald-400 transition-colors duration-300">
          Why Choose Dine With Us?
        </h2>
        <ul className="list-disc pl-6 md:pl-10 text-lg text-slate-100 space-y-3 mb-10 drop-shadow-sm hover:text-slate-300 transition-colors duration-300">
          <li><strong>Instant Reservations:</strong> Book a table instantly and receive immediate confirmation.</li>
          <li><strong>Flexible Options:</strong> Choose from cozy dinners, family gatherings, or large celebrations with customizable options.</li>
          <li><strong>Convenience:</strong> Make reservations anytime, anywhere, via our easy-to-use React-based platform.</li>
          <li><strong>Real-Time Availability:</strong> Our platform shows real-time table availability to avoid overbooking.</li>
          <li><strong>Easy Cancellations & Modifications:</strong> Easily cancel or modify your reservation with no hassle.</li>
        </ul>

        {/* How It Works */}
        <h2 className="font-semibold text-2xl text-center mb-5 text-emerald-300 drop-shadow-md hover:text-emerald-400 transition-colors duration-300">
          How It Works
        </h2>
        <ol className="list-decimal pl-6 md:pl-10 text-lg text-slate-100 space-y-3 mb-10 drop-shadow-sm hover:text-slate-300 transition-colors duration-300">
          <li><strong>Choose Your Restaurant:</strong> Select from a wide variety of restaurants listed on our platform.</li>
          <li><strong>Select Date & Time:</strong> Pick the date and time that works best for you.</li>
          <li><strong>Reserve Your Seat:</strong> Book your table with just a few simple clicks.</li>
          <li><strong>Confirmation & Reminder:</strong> Receive an instant booking confirmation and a reminder closer to your reservation time.</li>
          <li><strong>Enjoy Your Meal:</strong> When you arrive, just show your confirmation and enjoy your meal!</li>
        </ol>

        {/* Our Commitment */}
        <h2 className="font-semibold text-2xl text-center mb-5 text-emerald-300 drop-shadow-md hover:text-emerald-400 transition-colors duration-300">
          Our Commitment
        </h2>
        <p className="text-lg text-lime-100 text-center mb-10 drop-shadow-md hover:text-lime-200 transition-colors duration-300">
          We are committed to offering a smooth and enjoyable experience for our customers and restaurant partners. By leveraging the latest in React JS technology, we ensure that our system is fast, reliable, and user-friendly. Your satisfaction is our top priority.
        </p>

        {/* Thank You Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gray-800 via-transparent to-gray-800 p-8 rounded-lg border-4 border-gray-200 shadow-lg max-w-xl mx-auto transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <p className="font-[Poppins] text-3xl bg-gradient-to-r from-indigo-400 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
              Thank you for choosing Dine With Us. We look forward to being part of your next memorable dining experience.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;
