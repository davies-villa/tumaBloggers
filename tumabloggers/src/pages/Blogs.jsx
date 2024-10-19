import React, { useEffect, useRef, useState } from "react";
import TravelImg from "../assets/travel.png";
import RelationshipImg from "../assets/relationships.png";
import WellnessImg from "../assets/wellness.png";
import ReligionImg from "../assets/religion.png";
import BlogList from "../components/BlogList";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Categories = () => {
  const [categoryCounts, setCategoryCounts] = useState({
    Relationships: 0,
    Travel: 0,
    "Health & Wellness": 0,
    "Religion and Belief": 0,
  });

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hasBlogs, setHasBlogs] = useState(true); // Track if blogs are available

  const blogListRef = useRef(null); // Ref for auto-scrolling to the BlogList

  const cards = [
    {
      category: "Relationships",
      heading: "Connect with Loved Ones",
      image: RelationshipImg,
      bgColor: "#fff",
      categoryTextColor: "text-[#e30436]",
      headingTextColor: "text-gray-700",
    },
    {
      category: "Travel",
      heading: "Explore the Wild",
      image: TravelImg,
      bgColor: "#fff",
      categoryTextColor: "text-[#f5ae52]",
      headingTextColor: "text-[#333333]",
    },
    {
      category: "Health & Wellness",
      heading: "Embrace Wellness",
      image: WellnessImg,
      bgColor: "#fff",
      categoryTextColor: "text-[#25995c]",
      headingTextColor: "text-[#333333]",
    },
    {
      category: "Religion and Belief",
      image: ReligionImg,
      bgColor: "#fff",
      categoryTextColor: "text-[#6798cf]",
      headingTextColor: "text-[#333333]",
    },
  ];

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        const response = await fetch(
          "https://public-api.wordpress.com/wp/v2/sites/tumabloggers.wordpress.com/categories"
        );
        const data = await response.json();

        const counts = data.reduce((acc, category) => {
          if (category.name in acc) {
            acc[category.name] = category.count || 0;
          }
          return acc;
        }, { ...categoryCounts });

        setCategoryCounts(counts);
      } catch (error) {
        console.error("Error fetching category counts:", error);
      }
    };

    fetchCategoryCounts();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setHasBlogs(categoryCounts[category] > 0); // Check if blogs are available

    // Scroll to the BlogList section
    if (blogListRef.current) {
      blogListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-gray-100">
      <Navbar />

      {/* Header Section */}
      <div className="text-center px-6 py-36">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Explore Our Blogs
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          It is not our intention to offend, but rather to explore perspectives,
          share experiences, and inspire meaningful conversations. We welcome
          diversity of thought and encourage respectful dialogue to foster
          understanding. Join us on this journey of reflection and discovery.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className="p-8 shadow-md rounded-md hover:shadow-lg transition-shadow flex items-center cursor-pointer"
              style={{ backgroundColor: card.bgColor }}
              onClick={() => handleCategoryClick(card.category)}
            >
              <div className="w-2/3">
                <div className={`${card.categoryTextColor} mb-2`}>
                  <span className="text-sm font-bold uppercase">
                    {card.category}
                  </span>
                </div>
                <h2
                  className={`text-2xl font-semibold ${card.headingTextColor} mb-6`}
                >
                  {card.heading}
                </h2>
                <p className="text-gray-600 mb-4">
                  {categoryCounts[card.category] > 0
                    ? `${categoryCounts[card.category]} Blogs Available`
                    : "No Blogs Found"}
                </p>
              </div>
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

        {/* Blog List Section */}
        <div ref={blogListRef} className="mt-8">
          {selectedCategory ? (
            hasBlogs ? (
              <BlogList category={selectedCategory} />
            ) : (
              <div className="text-center text-xl text-gray-500">
                There are No Blogs Currently in {selectedCategory}
              </div>
            )
          ) : null}
        </div>
      </div>
      
      <Footer />
    </section>
  );
};

export default Categories;
