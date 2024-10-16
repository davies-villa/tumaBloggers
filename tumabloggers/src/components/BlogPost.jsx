import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BlogPost = () => {
  const { id } = useParams(); 
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`https://public-api.wordpress.com/wp/v2/sites/tumabloggers.wordpress.com/posts/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setBlog(data);
    } catch (err) {
      setError(err);
      console.error("Error fetching blog post:", err);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{blog.title.rendered}</h1>
      <p><strong>Author:</strong> {blog.author} | <strong>Posted on:</strong> {new Date(blog.date).toLocaleString()}</p>
      <div dangerouslySetInnerHTML={{ __html: blog.content.rendered }} />
    </div>
  );
};

export default BlogPost;
