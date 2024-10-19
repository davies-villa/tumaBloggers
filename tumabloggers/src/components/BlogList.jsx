import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BlogList = ({ category }) => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  // Mapping category names to their IDs
  const categoryIds = {
    Relationships: 197,
    Travel: 198,
    "Health & Wellness": 199,
    "Religion and Belief": 200,
  };

  const fetchBlogs = async () => {
    const categoryId = categoryIds[category];
    if (!categoryId) {
      console.error(`Category ID not found for: ${category}`);
      return;
    }

    try {
      const response = await fetch(
        `https://public-api.wordpress.com/wp/v2/sites/tumabloggers.wordpress.com/posts?categories=${categoryId}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setBlogs(data);
    } catch (err) {
      setError(err);
      console.error('Error fetching blogs:', err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [category]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">{category} Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            {/* Inner card with "TV" effect */}
            <div className="relative bg-gray-100 p-6 rounded-lg shadow-inner">
              <Link to={`/blog/${blog.id}`} className="text-decoration-none">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  {blog.title.rendered}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Author:</strong> {blog.author} |{' '}
                  <strong>Posted on:</strong>{' '}
                  {new Date(blog.date).toLocaleString('en-GB', {
                    hour12: false,
                  })}
                </p>
                <div
                  className="text-gray-700 text-sm"
                  dangerouslySetInnerHTML={{ __html: blog.excerpt.rendered }}
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
