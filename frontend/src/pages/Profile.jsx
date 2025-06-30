import React, { useEffect, useState } from 'react';
import { Heading } from '../components/Heading';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { Inputbox } from '../components/Inputbox';
import { Button } from '../components/Button';

function Profile() {
   const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { id } = useParams();
  const [username, setUsername] = useState(''); // State for storing the fetched username
  const [phone, setPhone] = useState(''); // State for phone number
  const [name, setName] = useState(''); // State for name
  const [password, setPassword] = useState(''); // State for password

  // Handlers for input changes
  const phoneHandler = (e) => {
    setPhone(e.target.value);
  };

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  // Handle cancel button click
  const handleCancel = () => {
    navigate(`/homepage/${id}`);
  };

  // Handle update profile button click
  const handlebutton = async (e) => {
    e.preventDefault();
    if(name.trim() ==" "){
      alert("Name cannot be empty") 
      return
    }
    if(phone.trim() ==" "){
      alert("Name cannot be empty") 
      return
    }
    if(password.trim() == " " ){
      alert("Name cannot be empty") 
      return
    }
      try {
      const response = await axios.put(`${API}/user/update/${id}`, {
        username,
        phone,
        name,
        password,
      });

      if (response.status === 200) {
        alert('Profile updated successfully!');
        navigate('/homepage'); // Navigate back to the homepage after updating
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  // Fetch user details when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API}/user/${id}`);
        const userData = response.data;

        // Set the fetched data in state
        setUsername(userData.username || '');
        setPhone(userData.phone || '');
        setName(userData.name || '');
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <div className="flex justify-center items-center w-full h-screen bg-cover bg-center bg-gray-600">
      <div className="bg-white p-6 rounded-xl w-full max-w-md flex flex-col justify-center items-center shadow-lg">
        <Heading label={'Profile'} className="text-xl mb-4" /> {/* Smaller heading */}
        
        {/* Email Section */}
        <form>
                  <div className="w-full mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="p-2 border rounded w-full text-sm text-gray-600 bg-gray-100">
            {username}
          </div>
        </div>

        {/* Phone Number Section */}
        <div className="w-full mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone No</label>
          <Inputbox
            type="text"
            onChange={phoneHandler}
            required
            value={phone}
            placeholder={'Enter 10-digit phone number'}
            className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Name Section */}
        <div className="w-full mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <Inputbox
            type="text"
            onChange={nameHandler}
            required
            value={name}
            placeholder={'John Doe Roy'}
            className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password Section */}
        <div className="w-full mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <Inputbox
            type="password" // Use type="password" for password fields
            onChange={passwordHandler}
            required
            value={password}
            placeholder={'***********'}
            className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Buttons Section */}
        <div className="flex flex-row justify-between gap-3 w-full">
          <Button
            label={'Update Profile'}
            onClick={handlebutton}
            className="w-full bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 transition duration-300 text-sm"
          />
          <button
            className="w-[50%] bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition duration-300 text-sm"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;