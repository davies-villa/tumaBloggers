import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FrogNotFound from "../assets/frognot.png";
import Navbar from "../components/Navbar";
import BackgroundImage from "../assets/2.png";

const AllBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogsAndCategories = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await fetch(
          "https://public-api.wordpress.com/wp/v2/sites/tumabloggers.wordpress.com/categories"
        );
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        // Fetch all blogs
        const postsResponse = await fetch(
          "https://public-api.wordpress.com/wp/v2/sites/tumabloggers.wordpress.com/posts?_embed"
        );

        if (!postsResponse.ok) throw new Error("Failed to fetch blogs");

        const postsData = await postsResponse.json();
        setBlogs(postsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load blogs. Please try again later.");
      }
    };

    fetchBlogsAndCategories();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter blogs based on selected category and search term
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
        className="h-[70vh] bg-cover bg-center flex items-center justify-center flex-col text-center"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <h1 className="text-white text-4xl mb-3 font-bold">All Blogs</h1>
        <div className="flex flex-col md:flex-row justify-center mb-4 w-full px-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search blogs..."
            className="px-4 py-2 mb-2 md:mb-0 md:mr-2 rounded-md shadow-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p className="text-white text-xl mt-2">
            {filteredBlogs.length} {filteredBlogs.length === 1 ? "Blog" : "Blogs"} Available
          </p>
        )}
      </div>

      <div className="container mx-auto my-8 px-4">
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
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
              ))
            ) : (
              <div className="text-center mt-10">
                <p className="text-gray-600 text-xl">No blogs available.</p>
                <img
                  src={FrogNotFound}
                  alt="404 No Blog Found"
                  className="w-64 h-64 object-contain"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBlogsPage;
