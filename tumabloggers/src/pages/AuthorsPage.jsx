import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"; 
import Author1Image from "../assets/tadiii.JPG"; 
import Author2Image from "../assets/davies.JPG"; 

const authors = [
  {
    id: 1,
    name: "Tadiwa Choga",
    bio: "Author One is a passionate writer who loves to explore new cultures and cuisines.",
    image: Author1Image,
    blogUrl: "/author/1", 
  },
  {
    id: 2,
    name: "Davies Gotosa",
    bio: "Author Two shares insights on technology and lifestyle.",
    image: Author2Image,
    blogUrl: "/author/2", 
  },
  
];

const AuthorsPage = () => {
  return (
    <div>
      <Navbar /> 
      <div className="h-[50vh] bg-cover bg-center flex items-center justify-center flex-col text-center">
        <h1 className="text-white text-4xl font-bold">Meet Our Authors</h1>
        <p className="text-white text-xl mt-2">Learn more about the writers behind our blogs.</p>
      </div>

      <div className="container mx-auto my-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {authors.length > 0 ? (
            authors.map((author) => (
              <div key={author.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between h-full hover:shadow-lg transition relative">
                <div className="flex justify-center">
                  <img src={author.image} alt={author.name} className="w-48 h-48 object-cover rounded-full" /> 
                </div>
                <h2 className="text-xl font-semibold mt-4 text-center">{author.name}</h2> 
                <p className="text-gray-700 mt-2 text-center">{author.bio}</p> 
                <Link to={author.blogUrl} className="mt-4 text-blue-500 hover:underline text-center">
                  Read More
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center mt-10">
              <p className="text-gray-600 text-xl">No authors available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorsPage;
