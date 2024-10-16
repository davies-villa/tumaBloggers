import React, { useEffect, useState } from "react";
import TravelImg from "../assets/travel.png";
import RelationshipImg from "../assets/relationships.png";
import WellnessImg from "../assets/wellness.png";
import ReligionImg from "../assets/religion.png";
import BlogList from "./BlogList"; 

const Categories = () => {
  const [categoryCounts, setCategoryCounts] = useState({
    Relationships: 0,
    Travel: 0,
    "Health & Wellness": 0,
    "Religion and Belief": 0,
  });

  const [selectedCategory, setSelectedCategory] = useState(null);

  const cards = [
    {
      category: "Relationships",
      heading: "Connect with Loved Ones",
      image: RelationshipImg,
      bgColor: "#f5a8b9",
      categoryTextColor: "text-[#e30436]",
      headingTextColor: "text-gray-700",
    },
    {
      category: "Travel",
      heading: "Explore the Wild",
      image: TravelImg,
      bgColor: "#ffd8a5",
      categoryTextColor: "text-[#f5ae52]",
      headingTextColor: "text-[#333333]",
    },
    {
      category: "Health & Wellness",
      heading: "Embrace Wellness",
      image: WellnessImg,
      bgColor: "#bbf7d0",
      categoryTextColor: "text-[#25995c]",
      headingTextColor: "text-[#333333]",
    },
    {
      category: "Religion and Belief",
      heading: "Indulge in Beliefs",
      image: ReligionImg,
      bgColor: "#96bce7",
      categoryTextColor: "text-[#6798cf]",
      headingTextColor: "text-[#333333]",
    },
  ];

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        const response = await fetch("https://public-api.wordpress.com/wp/v2/sites/tumabloggers.wordpress.com/categories");
        const data = await response.json();

        // Map the data to get the counts for each category
        const counts = data.reduce((acc, category) => {
          if (category.name === "Relationships") {
            acc.Relationships = category.count || 0;
          } else if (category.name === "Travel") {
            acc.Travel = category.count || 0;
          } else if (category.name === "Health & Wellness") {
            acc["Health & Wellness"] = category.count || 0;
          } else if (category.name === "Religion and Belief") {
            acc["Religion and Belief"] = category.count || 0;
          }
          return acc;
        }, {});

        setCategoryCounts(counts);
      } catch (error) {
        console.error("Error fetching category counts:", error);
      }
    };

    fetchCategoryCounts();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <section className="bg-gray-100 py-4 flex justify-center items-center">
      <div className="container mx-auto px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className="p-8 shadow-md rounded-md hover:shadow-lg transition-shadow flex items-center cursor-pointer"
              style={{ backgroundColor: card.bgColor }}
              onClick={() => handleCategoryClick(card.category)} 
            >
              {/* Left Side: Text Content */}
              <div className="w-2/3">
                <div className={`${card.categoryTextColor} mb-2`}>
                  <span className="text-sm font-bold uppercase">{card.category}</span>
                </div>
                <h2 className={`text-2xl font-semibold ${card.headingTextColor} mb-6`}>
                  {card.heading}
                </h2>
                {/* Display the number of blogs available or "No Blogs Found" */}
                <p className="text-gray-600 mb-4">
                  {categoryCounts[card.category] > 0
                    ? `${categoryCounts[card.category]} Blogs Available`
                    : "No Blogs Found"}
                </p>
              </div>

              {/* Right Side: Image */}
              <div className="w-1/3">
                <img
                  src={card.image}
                  alt={card.heading}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Conditionally render BlogList if a category is selected */}
        {selectedCategory && (
          <BlogList category={selectedCategory} />
        )}
      </div>
    </section>
  );
};

export default Categories;
