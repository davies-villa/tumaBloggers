import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FrogNotFound from "../assets/frognot.png";
import Navbar from "../components/Navbar";
import BackgroundImage from "../assets/2.png";
import Footer from "../components/Footer";

const sanitizeHTMLContent = (html) => html.replace(/&nbsp;/g, " ");

const AllBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchBlogsAndCategories = async () => {
      try {
        const categoriesResponse = await fetch(
          "https://public-api.wordpress.com/wp/v2/sites/tumabloggers.wordpress.com/categories"
        );
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        const postsResponse = await fetch(
          "https://public-api.wordpress.com/wp/v2/sites/tumabloggers.wordpress.com/posts?_embed"
        );
        if (!postsResponse.ok) throw new Error("Failed to fetch blogs");

        const postsData = await postsResponse.json();
        const sanitizedPostsData = postsData.map((post) => ({
          ...post,
          title: { rendered: sanitizeHTMLContent(post.title.rendered) },
          excerpt: { rendered: sanitizeHTMLContent(post.excerpt.rendered) },
        }));
        setBlogs(sanitizedPostsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load blogs. Please try again later.");
      }
    };

    fetchBlogsAndCategories();
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "" || blog.categories.includes(selectedCategory);
    const matchesSearchTerm = blog.title.rendered
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  return (
    <div>
      <Navbar />
      <div
        className="h-[80vh] w-[95%] lg:w-full bg-cover bg-center flex items-center justify-center flex-col text-center"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <div className="bg-black bg-opacity-50 w-full h-full items-center justify-center flex flex-col">
          <h1 className="text-white text-5xl font-extrabold mb-3">All Blogs</h1>
          <div className="flex justify-center mb-4 w-full px-4">
            {/* Combined Search Bar with Dropdown */}
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search blogs..."
                className="w-full px-4 py-2 rounded-md shadow-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
              />
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 9l-7.5 7.5L4.5 9"
                  />
                </svg>
              </button>

              {/* Dropdown menu for categories */}
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                  <button
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => handleCategoryChange("")}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => handleCategoryChange(category.id)}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <p className="text-white text-xl mt-2">
              {filteredBlogs.length}{" "}
              {filteredBlogs.length === 1 ? "Blog" : "Blogs"} Available
            </p>
          )}
        </div>
      </div>

      <div className="container mx-auto my-8 px-4">
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBlogs.map((blog) => (
              <Link key={blog.id} to={`/blog/${blog.id}`}>
                <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between h-full hover:shadow-lg transition relative">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {blog.title.rendered}
                    </h2>
                    <div className="border-l-4 border-green-500 rounded-sm pl-2 mt-2">
                      <p
                        className="text-gray-700 line-clamp-3"
                        dangerouslySetInnerHTML={{
                          __html: blog.excerpt.rendered,
                        }}
                      ></p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-600">
                     {blog._embedded?.author?.[0]?.name || "Davies Gotosa"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(blog.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-[50vh] text-center">
            <p className="text-gray-600 text-2xl mb-4">No blogs available.</p>
            <img
              src={FrogNotFound}
              alt="404 No Blog Found"
              className="w-64 h-64 object-contain"
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AllBlogsPage;
