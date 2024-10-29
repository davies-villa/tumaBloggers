import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CategoryPage from './pages/CategoryPage';
import BlogPostPage from './pages/BlogPostPage'; // Change this to import BlogPostPage
import Blogs from './pages/Blogs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/blog/:postId" element={<BlogPostPage />} /> 
        <Route path="/blogs" element={<Blogs />} />
      </Routes>
    </Router>
  );
}

export default App;
