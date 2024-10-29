import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import TravelImg from "../assets/2.png";
import TechImg from "../assets/5.png";
import FoodImg from "../assets/4.png";
import LifestyleImg from "../assets/3.png";
import ReligionImg from "../assets/4.png";
import RelationshipImg from "../assets/1.png";
import FrogNotFound from "../assets/frognot.png";
import Navbar from "../components/Navbar";

const categoryImages = {
  Food: FoodImg,
  Lifestyle: LifestyleImg,
  Relationships: RelationshipImg,
  Religion: ReligionImg,
  Tech: TechImg,
  Travel: TravelImg,
};

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const backgroundImage = categoryImages[categoryName] || "";

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const categoriesResponse = await fetch(
          "https://public-api.wordpress.com/wp/v2/sites/tumabloggers.wordpress.com/categories"
        );
        const categoriesData = await categoriesResponse.json();

        const category = categoriesData.find(
          (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
        );

        if (!category) throw new Error("Category not found");

        const postsResponse = await fetch(
          `https://public-api.wordpress.com/wp/v2/sites/tumabloggers.wordpress.com/posts?categories=${category.id}&_embed`
        );

        if (!postsResponse.ok) throw new Error("Network response was not ok");

        const postsData = await postsResponse.json();
        setBlogs(postsData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blogs. Please try again later.");
      }
    };

    fetchBlogs();
  }, [categoryName]);

  return (
    <div>
      <Navbar />
      <div
        className="h-[70vh] bg-cover bg-center flex items-center justify-center flex-col text-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <h1 className="text-white text-4xl font-bold">{categoryName}</h1>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p className="text-white text-xl mt-2">
            {blogs.length} {blogs.length === 1 ? "Blog" : "Blogs"} Available
          </p>
        )}
      </div>

      <div className="container mx-auto my-8 px-4">
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {blogs.map((blog) => (
              <Link key={blog.id} to={`/blog/${blog.id}`}>
                <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between h-full hover:shadow-lg transition relative">
                  <div>
                    <h2 className="text-xl font-semibold">{blog.title.rendered}</h2>
                    <div className="border-l-4 border-green-500 rounded-sm pl-2 mt-2">
                      <p
                        className="text-gray-700 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: blog.excerpt.rendered }}
                      ></p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-600">
                      By {blog._embedded?.author?.[0]?.name || "Unknown"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(blog.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center mt-10">
            <p className="text-gray-600 text-xl">No blogs available in this category.</p>
            <div className="flex justify-center mt-1">
              <img
                src={FrogNotFound}
                alt="404 No Blog Found"
                className="w-64 h-64 object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
