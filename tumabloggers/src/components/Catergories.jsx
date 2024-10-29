import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate for navigation

// Import category images
import TravelImg from "../assets/2.png";
import TechImg from "../assets/5.png";
import FoodImg from "../assets/4.png";
import LifestyleImg from "../assets/3.png";
import ReligionImg from "../assets/4.png";
import RelationshipImg from "../assets/1.png";

const Categories = () => {
  const [categoryCounts, setCategoryCounts] = useState({});
  const navigate = useNavigate(); // Initialize navigate for navigation

  const cards = [
    { category: "Food", image: FoodImg, bgColor: "#fff" },
    { category: "Lifestyle", image: LifestyleImg, bgColor: "#fff" },
    { category: "Relationships", image: RelationshipImg, bgColor: "#fff" },
    { category: "Religion", image: ReligionImg, bgColor: "#fff" },
    { category: "Tech", image: TechImg, bgColor: "#fff" },
    { category: "Travel", image: TravelImg, bgColor: "#fff" },
  ];

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        const response = await fetch("https://public-api.wordpress.com/wp/v2/sites/tumabloggers.wordpress.com/categories");
        const data = await response.json();

        // Map the category names to their counts
        const counts = {};
        data.forEach(category => {
          counts[category.name] = category.count; // Assuming each category object has a 'count' property
        });

        setCategoryCounts(counts);
      } catch (error) {
        console.error("Error fetching category counts:", error);
      }
    };

    fetchCategoryCounts();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`); 
  };

  return (
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto p-3 lg:px-8">
        <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="p-8 shadow-lg rounded-lg hover:shadow-xl transition cursor-pointer flex flex-col items-center relative"
              style={{ backgroundColor: card.bgColor }}
              onClick={() => handleCategoryClick(card.category)}
            >
              {/* Category Name */}
              <h3 className="text-lg lg:text-md font-medium text-gray-800 mb-2">
                {card.category}
              </h3>

              {/* Radial Gradient + Image */}
              <div className="relative bg-custom-gradient w-24 h-24">
                <div className="absolute bg-custom-gradient border-white inset-0 rounded-full"></div>
                <img
                  src={card.image}
                  alt={card.category}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
