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
      const response = await fetch(`https://public-api.wordpress.com/wp/v2/sites/tumabloggers.wordpress.com/posts?categories=${categoryId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setBlogs(data);
    } catch (err) {
      setError(err);
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [category]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>{category} Blogs</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {blogs.map(blog => (
          <li key={blog.id} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
            <Link to={`/blog/${blog.id}`} style={{ textDecoration: 'none', color: 'black' }}>
              <h2 style={{ fontSize: '20px', margin: '0 0 10px' }}>{blog.title.rendered}</h2>
              <p style={{ fontSize: '14px', color: '#666' }}>
                <strong>Author:</strong> {blog.author} | 
                <strong> Posted on:</strong> {new Date(blog.date).toLocaleString()}
              </p>
              <p dangerouslySetInnerHTML={{ __html: blog.excerpt.rendered }} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
