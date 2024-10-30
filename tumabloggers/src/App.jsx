
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CategoryPage from './pages/CategoryPage';
import BlogPostPage from './pages/BlogPostPage';
import AuthorsPage from "./pages/AuthorsPage";
import Blogs from './pages/AllBlogsPage';
import AboutUsPage from "./pages/AboutUsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/blog/:postId" element={<BlogPostPage />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<AboutUsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
