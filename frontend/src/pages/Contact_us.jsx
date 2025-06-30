import React, { useState } from 'react';
import HeroSection from "../components/HeroSection";
import AddressSection from "../components/AddressSection";
import FAQSection from "../components/FAQSection";
import MapComponent from "../components/MapComponent";
import { Heading } from '../components/Heading';
import { Inputbox } from '../components/Inputbox';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router';
import axios from 'axios';



const ContactUs = () => {
 

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Contact Form Section */}
    

      {/* Address Section */}
      <AddressSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Map Section */}
      <MapComponent />
    </div>
  );
};

export default ContactUs;