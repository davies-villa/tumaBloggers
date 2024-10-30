import React from "react";
import Navbar from "../components/Navbar"; 
import Author1Image from "../assets/tadi.png";
import Author2Image from "../assets/davies.png";

const authors = [
  {
    id: 1,
    name: "Tadiwa Choga",
    mission: "To inspire readers through stories of culture and culinary adventures.",
    image: Author1Image,
  },
  {
    id: 2,
    name: "Davies Gotosa",
    mission: "To provide insightful articles on technology and lifestyle trends.",
    image: Author2Image,
  },
];

const AboutUsPage = () => {
  return (
    <div>
      <Navbar /> {/* Add the Navbar here */}
      <div className="h-[50vh] bg-background flex items-center justify-center flex-col text-center">
        <h1 className="text-white text-4xl font-bold">About Us</h1>
        <p className="text-white text-xl mt-2">Learn more about our mission and values.</p>
      </div>

      <div className="container mx-auto my-8 px-4">
        <h2 className="text-2xl font-semibold text-center mb-8">Our Mission</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <div key={author.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
              <img src={author.image} alt={author.name} className="w-32 h-32 object-cover rounded-full mb-4" />
              <h3 className="text-xl font-semibold text-center">{author.name}</h3>
              <p className="text-gray-700 text-center mt-2">{author.mission}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
