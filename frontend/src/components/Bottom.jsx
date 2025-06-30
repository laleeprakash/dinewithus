import React from 'react';
import { Link } from 'react-router-dom';

const Bottom = ({ label, to }) => {
  return (
    <div className="flex justify-center items-center mt-2 mb-2">
      <Link 
        to={to} 
        className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:opacity-80 transition duration-300"
      >
        {label}
      </Link>
    </div>
  );
};

export default Bottom;
