import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";

const API = import.meta.env.VITE_API_URL; // Ensure this is set in .env

function Add_Resta() {
  const [name, setname] = useState("");
  const [location, setlocation] = useState("");
  const [description, setdescription] = useState("");
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // ownerId

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !location || !description || !file) {
      alert("Please fill in all fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("image", file); // `image` matches multer field on backend

    try {
      await axios.post(`${API}/addrestaurant/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Restaurant created successfully!");
      navigate(`/ownerpage/${id}`);
    } catch (error) {
      console.error("Error creating restaurant:", error);
      alert("Error creating restaurant. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/homepage");
  };

  return (
    <div className="flex justify-center w-full h-[100vh] bg-gradient-to-b from-pink-900 to-purple-700">
      <div className="flex flex-col justify-center items-center rounded-3xl">
        <div className="flex justify-center rounded-3xl">
          <div className="bg-slate-300 flex flex-col justify-center">
            <form
              className="rounded-3xl bg-white w-9/10 p-8"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <Heading label={"Add Restaurant"} />

              <Inputbox
                label="Restaurant Name"
                type="text"
                placeholder="John_doe_restaurant"
                id="restaurantName"
                name="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                required
              />
              <Inputbox
                label="Location"
                type="text"
                placeholder="Second Street XYZ Colony"
                id="location"
                name="location"
                value={location}
                onChange={(e) => setlocation(e.target.value)}
                required
              />
              <Inputbox
                label="Description"
                type="text"
                placeholder="A cozy place for great food!"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
                required
              />

              <div className="mt-4">
                <label htmlFor="image" className="block text-lg font-medium mb-2">
                  Image of the Restaurant
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="image"
                  name="image"
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  onChange={handleFileChange}
                  required
                />
                {previewImage && (
                  <div className="mt-4">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="mt-4 p-2 px-5 rounded-2xl border border-black bg-black text-white hover:opacity-90"
                >
                  Add Restaurant
                </button>
                <button
                  type="button"
                  className="mt-4 p-2 rounded-2xl border border-black px-8 hover:opacity-95"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add_Resta;
