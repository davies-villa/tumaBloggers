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

  // Function to load AdSense script
  const loadAdsense = () => {
    const script = document.createElement("script");
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6152210468637513";
    script.async = true;
    script.crossOrigin = "anonymous"; // Setting the crossorigin attribute
    document.body.appendChild(script);
  };

  useEffect(() => {
    loadAdsense();
  }, []);

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

      {/* Header section */}
      <div className="bg-green-500 rounded-lg h-[70vh] flex items-center justify-start p-4">
        <h1 className="text-4xl text-white font-bold mb-4">
          {blog.title.rendered}
        </h1>
        <p className="text-sm text-white mt-2">
          By {blog._embedded?.author?.[0]?.name || "Unknown"} on{" "}
          {new Date(blog.date).toLocaleDateString()}
        </p>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto my-8 px-4">
        <div className="flex flex-col lg:flex-row">
          {/* Blog Content - Takes left side on large screens */}
          <div className="w-full lg:w-3/4 lg:pr-8">
            <div
              className="text-gray-800 leading-relaxed [&>p]:mb-8 [&>p]:text-xl [&>p]:p-6"
              dangerouslySetInnerHTML={{ __html: blog.content.rendered }}
            ></div>

            {/* AdSense Ad Placeholder in the main content */}
            <div className="my-8 text-center">
              <ins
                className="adsbygoogle"
                style={{ display: "block", textAlign: "center" }}
                data-ad-layout="in-article"
                data-ad-format="fluid"
                data-ad-client="ca-pub-6152210468637513"
                data-ad-slot="4250380045"
              ></ins>
              <script>
                {`(adsbygoogle = window.adsbygoogle || []).push({});`}
              </script>
            </div>
          </div>

          {/* Sidebar with AdSense Ad */}
          <div className="hidden lg:block lg:w-1/4">
            <div className="bg-gray-100 p-4 rounded shadow">
              {/* AdSense Ad Placeholder in the sidebar */}
              <ins
                className="adsbygoogle"
                style={{ display: "block", textAlign: "center" }}
                data-ad-layout="in-article"
                data-ad-format="fluid"
                data-ad-client="ca-pub-6152210468637513"
                data-ad-slot="4250380045"
              ></ins>
              <script>
                {`(adsbygoogle = window.adsbygoogle || []).push({});`}
              </script>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
