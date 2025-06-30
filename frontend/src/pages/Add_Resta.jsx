import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Add_Resta() {
  const [name, setname] = useState("");
  const [location, setlocation] = useState("");
  const [description, setdescription] = useState("");
  const [imageurl, setimageurl] = useState("");  // Storing base64 encoded image URL
  const navigate = useNavigate();
  const { id } = useParams(); // Extracting the ownerId from URL params

  const handlename = (e) => {
    setname(e.target.value);
  };

  const handlelocation = (e) => {
    setlocation(e.target.value);
  };

  const handledescription = (e) => {
    setdescription(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setimageurl(reader.result);  // Storing the base64 encoded image URL
      };
      reader.readAsDataURL(file);  // Converting file to base64
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3000/addrestaurant/${id}`, {
        imageurl,
        name,
        description,
        location,
        ownerId: id
      });

      
      alert("Restaurant created successfully! Click OK.");
      navigate(`/ownerpage/${id}`);  // Navigate to homepage after successful submission
    } catch (error) {
      console.error(error);
      alert("Error creating restaurant. Please try again.");
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/homepage");  // Navigate to homepage if canceled
  };

  return (
    <div className="flex justify-center w-full h-[100vh] bg-gradient-to-b from-pink-900 to-purple-700">
      <div className="flex flex-col justify-center items-center rounded-3xl">
        <div className="flex justify-center rounded-3xl">
          <div className="bg-slate-300 flex flex-col justify-center">
            <div className="rounded-3xl bg-white w-9/10 p-8">
              <Heading label={"Add Restaurant"} />

              {/* Form wrapper */}
              <Inputbox
                label={"Restaurant Name"}
                type="text"
                placeholder={"John_doe_restaurant"}
                id={"restaurantName"}
                name="name"
                value={name}
                onChange={handlename}
                required
              />

              <Inputbox
                label={"Location"}
                type="text"
                placeholder={"Second Street XYZ Colony"}
                id={"location"}
                name="location"
                value={location}
                onChange={handlelocation}
                required
              />

              <Inputbox
                label={"Description"}
                type="text"
                placeholder={"A cozy place for great food!"}
                id={"description"}
                name="description"
                value={description}
                onChange={handledescription}
                required
              />

              {/* Image input with preview */}
              <div>
                <label htmlFor="image" className="block text-lg font-medium mb-2">
                  Image of the Restaurant
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="image"
                  onChange={handleFileChange}
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
                {imageurl && (
                  <div className="mt-4">
                    <img
                      src={imageurl}  // Preview of the base64 encoded image
                      alt="Restaurant preview"
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="mt-4 p-2 px-5 rounded-2xl border border-black bg-black text-white hover:opacity-90"
                  onClick={handleSubmit}
                >
                  Add Restaurant
                </button>
                <button
                  className="mt-4 p-2 rounded-2xl border border-black px-8 hover:opacity-95"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
              {/* End form wrapper */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add_Resta;
