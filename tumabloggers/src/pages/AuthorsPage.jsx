import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Tadiwa from "../assets/tadi.png";
import Davies from "../assets/davies.png";
import { FaLinkedin } from "react-icons/fa";
import Footer from "../components/Footer";

const authors = [
  {
    id: 1,
    name: "Tadiwa Choga",
    bio: `Tadiwa Choga, 16, lives in the UK where he’s studying Sixth Form. He’s a part-time UX/UI designer who loves creating app and web designs. A fan of soccer and basketball, he’s also an avid reader and a proud Manchester United supporter. Raised in a family of three kids as the youngest, he grew up in Mkhosana, Victoria Falls.`,
    hobbies: ["Designing", "Playing sports", "Reading"],
    location: "United Kingdom",
    faith: "Christian",
    image: Tadiwa,
    social: {
      linkedin: "https://www.linkedin.com/in/tadiwachoga",
    },
  },
  {
    id: 2,
    name: "Davies Gotosa",
    bio: `Davies Gotosa, 19, is a frontend web developer from Zimbabwe, currently based in Johannesburg, South Africa. He’s passionate about coding websites, designing, and listening to music. A Tottenham supporter and Christian, Davies grew up in Mkhosana, Victoria Falls, in a family of two as the younger of two.`,
    hobbies: ["Coding", "Designing", "Music"],
    location: "South Africa",
    faith: "Christian",
    image: Davies,
    social: {
      linkedin: "https://www.linkedin.com/in/davies-gotosa/",
    },
  },
];

const AuthorsPage = () => {
  return (
    <div>
      <Navbar />
      {/* Header Section */}
      <div
        className="h-[80vh] bg-cover bg-center flex items-center justify-center flex-col text-center text-white"
        style={{ backgroundImage: `url(${Tadiwa})` }}
      >
        <div className="bg-black bg-opacity-50 w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-5xl font-extrabold">Meet Our Authors</h1>
          <p className="text-lg mt-3 max-w-2xl mx-auto">
            Learn more about the creative minds behind our stories and insights.
          </p>
        </div>
      </div>

      {/* Authors Cards */}
      <div className="container mx-auto my-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {authors.map((author) => (
            <div
              key={author.id}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition duration-300 relative"
            >
              {/* Profile Image with LinkedIn Icon */}
              <div className="relative">
                <img
                  src={author.image}
                  alt={author.name}
                  className="w-40 h-40 object-cover rounded-full mb-6 transition-transform duration-300 hover:scale-105"
                />
                <a
                  href={author.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-6 right-2 bg-white rounded-full p-2 text-blue-700 text-xl shadow-lg hover:scale-110 transition-transform duration-300"
                >
                  <FaLinkedin />
                </a>
              </div>

              <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                {author.name}
              </h2>
              <p className="text-gray-600 text-center">{author.bio}</p>

              {/* Hobbies, Location, and Faith as Individual Items */}
              <div className="mt-4 mb-3 text-center flex flex-wrap gap-2 justify-center">
                {author.hobbies.map((hobby, index) => (
                  <p
                    key={index}
                    className="bg-green-200 text-green-700 px-3 py-1 rounded-lg"
                  >
                    {hobby}
                  </p>
                ))}
                <p className="bg-green-200 text-green-700 px-3 py-2 rounded-md">
                  {author.location}
                </p>
                <p className="bg-green-200 text-green-700 px-3 py-2 rounded-md">
                  {author.faith}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthorsPage;
