import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaTelegram,
  FaRegHeart, // Import heart icon for unliked state
  FaHeart, // Import filled heart icon for liked state
  FaShareAlt, // Import share icon
} from "react-icons/fa";

const BlogPostPage = () => {
  const { postId } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState("Copy Link");
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false); // State to track like status

  const shareUrl = `https://tumabloggers.co.zw/blog/${postId}`;
  const blogTitle =
    blog?.title?.rendered.replace(/&nbsp;/g, " ") ||
    "Check out this blog post!";

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(
          `https://public-api.wordpress.com/wp/v2/sites/tumabloggers.wordpress.com/posts/${postId}?_embed`
        );
        if (!response.ok) throw new Error("Failed to fetch blog post.");

        const data = await response.json();
        setBlog(data);
        setLikeCount(data.likes || 0); // Set initial like count from the post data
      } catch (error) {
        setError("Failed to load the blog post.");
      }
    };

    fetchBlogPost();
  }, [postId]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopyButtonText("Link Copied!");
      setTimeout(() => setCopyButtonText("Copy Link"), 2000);
    });
  };

  const toggleShareModal = () => setShareModalOpen(!isShareModalOpen);

  const handleLikePost = async () => {
    try {
      const response = await fetch(
        `https://public-api.wordpress.com/wp/v2/sites/tumabloggers.wordpress.com/posts/${postId}/likes`,
        {
          method: isLiked ? "DELETE" : "POST",
          headers: {
            Authorization: "Bearer YOUR_ACCESS_TOKEN",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to update like status.");

      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="text-center mt-10 text-red-500">{error}</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div>
        <Navbar />
        <div className="text-center mt-10">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="bg-green-500 rounded-lg h-[70vh] flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-4xl text-white font-bold mb-4">{blogTitle}</h1>
        <p className="text-sm text-white mt-2">
          By {blog._embedded?.author?.[0]?.name || "Unknown"} on{" "}
          {new Date(blog.date).toLocaleDateString()}
        </p>

        <div className="flex justify-center space-x-6 mt-4">
          <button
            onClick={handleLikePost}
            className="flex items-center text-gray-400 hover:text-gray-300"
          >
            <span className="p-3 bg-white rounded-full">
              {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </span>
            <span className="ml-2 text-white">{likeCount} Likes</span>
          </button>

          <button
            onClick={toggleShareModal}
            className="flex items-center text-gray-400 hover:text-gray-300"
          >
            <span className="p-3 bg-white rounded-full">
              <FaShareAlt className="text-gray-400" />
            </span>
            <span className="ml-2 text-white">Share</span>
          </button>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto my-8 px-4">
        <div className="flex flex-col items-center">
          {/* Blog Content - Centered */}
          <div className="w-full lg:w-3/4">
            <div
              className="text-gray-800 leading-relaxed [&>p]:mb-8 [&>p]:text-l [&>p]:font-semi-bold [&>p]:p-6"
              dangerouslySetInnerHTML={{ __html: blog.content.rendered }}
            ></div>
          </div>
        </div>
      </div>

      {isShareModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center p-6 justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
            <button
              onClick={toggleShareModal}
              className="absolute top-3 right-3 text-gray-800 hover:bg-gray-200 p-2 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h3 className="text-lg font-semibold mb-4">Share this post via</h3>
            <div className="flex items-center justify-center space-x-4 mb-4">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  shareUrl
                )}&quote=${encodeURIComponent(blogTitle)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-blue-500 text-white rounded-full"
                aria-label="Share on Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href={`https://twitter.com/share?url=${encodeURIComponent(
                  shareUrl
                )}&text=${encodeURIComponent(blogTitle)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-blue-300 text-white rounded-full"
                aria-label="Share on Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href={`https://instagram.com/`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-pink-500 text-white rounded-full"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `${blogTitle} - ${shareUrl}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-green-500 text-white rounded-full"
                aria-label="Share on WhatsApp"
              >
                <FaWhatsapp size={20} />
              </a>
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(
                  shareUrl
                )}&text=${encodeURIComponent(blogTitle)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-blue-600 text-white rounded-full"
                aria-label="Share on Telegram"
              >
                <FaTelegram size={20} />
              </a>
            </div>
            <div className="flex items-center border rounded-md p-4 mb-2 w-full">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 bg-transparent outline-none px-2 text-sm md:text-base"
              />
              <button
                onClick={handleCopyLink}
                className="ml-2 text-gray-800 "
                aria-label="Copy Link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 hover:text-gray-400  transition duration-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BlogPostPage;
