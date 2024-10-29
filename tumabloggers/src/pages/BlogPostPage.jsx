import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import Navbar from "../components/Navbar";

const BlogPostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate(); 
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(
          `https://public-api.wordpress.com/wp/v2/sites/tumabloggers.wordpress.com/posts/${postId}?_embed`
        );

        if (!response.ok) throw new Error("Failed to fetch blog post.");

        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setError("Failed to load the blog post.");
      }
    };

    fetchBlogPost();
  }, [postId]);

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="text-center mt-10">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div>
        <Navbar />
        <div className="text-center mt-10">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="bg-green-500 rounded-lg h-[70vh] justify-start items-center flex p-4"> 
        <h1 className="text-4xl text-white font-bold mb-4">{blog.title.rendered}</h1>
        <p className="text-sm text-white mt-2">
          By {blog._embedded?.author?.[0]?.name || "Unknown"} on{" "}
          {new Date(blog.date).toLocaleDateString()}
        </p>
      </div>
      <div className="container mx-auto my-8 px-4">
        <div
          className="text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content.rendered }}
        ></div>
       
      </div>
    </div>
  );
};

export default BlogPostPage;
