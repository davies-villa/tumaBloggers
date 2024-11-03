import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaGlobe,
  FaBullseye,
  FaHeart,
} from "react-icons/fa";
import backgroundImage from "../assets/1.png";

const AboutUsPage = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with email: ${email}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div
        className="h-[80vh] bg-cover bg-center flex items-center justify-center flex-col text-center text-white "
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="bg-black bg-opacity-50 w-full h-full items-center justify-center flex flex-col">
          <h1 className="text-5xl font-extrabold">About Us</h1>
          <p className="text-xl mt-2 max-w-2xl">
            Learn more about our mission and values.
          </p>
        </div>
      </div>

      {/* Three About Sections */}
      <div className=" py-12 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-around gap-8 text-center">
            {/* Section 1 */}
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
              <FaGlobe className="text-gray-500 text-5xl mb-4" />
              <h3 className="text-xl font-bold mb-2">Our Global Vision</h3>
              <p className="text-gray-600">
                We are committed to fostering a global community by connecting
                people across diverse cultures through our inspiring stories and
                initiatives.
              </p>
            </div>

            {/* Section 2 */}
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
              <FaBullseye className="text-gray-500 text-5xl mb-4" />
              <h3 className="text-xl font-bold mb-2">Our Mission</h3>
              <p className="text-gray-600">
                Our mission is to aim high and deliver valuable content that
                resonates with our readers, sparking curiosity and encouraging
                learning.
              </p>
            </div>

            {/* Section 3 */}
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
              <FaHeart className="text-gray-500 text-5xl mb-4" />
              <h3 className="text-xl font-bold mb-2">Our Passion</h3>
              <p className="text-gray-600">
                Passion drives us forward. We care deeply about making a
                positive impact through meaningful stories and valuable
                insights.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUsPage;
