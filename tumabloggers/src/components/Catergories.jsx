import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import TravelImg from "../assets/travel.png";
import RelationshipImg from "../assets/relationships.png";
import WellnessImg from "../assets/wellness.png";
import ReligionImg from "../assets/religion.png";

const Categories = () => {
  useEffect(() => {
    const initialData = {
      Relationships: 0,
      Travel: 0,
      'Health & Wellness': 0,
      'Religion and Belief': 0,
    };
    localStorage.setItem('categoryCount', JSON.stringify(initialData));
  }, []);

  const cards = [
    {
      category: "Relationships",
      heading: "Connect with Loved Ones",
      link: "/blog/relationships",
      image: RelationshipImg,
      bgColor: "#f5a8b9",
      categoryTextColor: "text-[#e30436]",
      headingTextColor: "text-gray-700",
      iconBgColor: "bg-[#e30436]",
    },
    {
      category: "Travel",
      heading: "Explore the Wild",
      link: "/blog/travel",
      image: TravelImg,
      bgColor: "#ffd8a5",
      categoryTextColor: "text-[#f5ae52]",
      headingTextColor: "text-[#333333]",
      iconBgColor: "bg-[#f5ae52]",
    },
    {
      category: "Health & Wellness",
      heading: "Embrace Wellness",
      link: "/blog/wellness",
      image: WellnessImg,
      bgColor: "#bbf7d0",
      categoryTextColor: "text-[#25995c]",
      headingTextColor: "text-[#333333]",
      iconBgColor: "bg-[#25995c]",
    },
    {
      category: "Religion and Belief",
      heading: "Indulge in Beliefs",
      link: "/blog/religion",
      image: ReligionImg,
      bgColor: "#96bce7",
      categoryTextColor: "text-[#6798cf]",
      headingTextColor: "text-[#333333]",
      iconBgColor: "bg-[#6798cf]",
    },
  ];

  return (
    <section className="bg-gray-100 py-4 h-auto flex justify-center items-center">
      <div className="container mx-auto px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <Link
              to={card.link}
              key={index}
              className={`p-8 shadow-md rounded-md hover:shadow-lg transition-shadow flex items-center`}
              style={{ backgroundColor: card.bgColor }}
            >
              {/* Left Side: Text Content */}
              <div className="w-2/3">
                <div className={`mb-2 ${card.categoryTextColor}`}>
                  <span className="text-sm font-bold uppercase">{card.category}</span>
                </div>

                <h2 className={`text-2xl font-semibold ${card.headingTextColor} mb-6`}>
                  {card.heading}
                </h2>

                {/* No Blogs Available */}
                <p className="text-gray-600 mb-4">No Blogs Found</p>
              </div>

              {/* Right Side: Image */}
              <div className="w-1/3">
                <img
                  src={card.image}
                  alt={card.heading}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
