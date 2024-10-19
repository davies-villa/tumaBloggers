import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import WhyBlogs from "../components/MainItems";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <WhyBlogs />
      <Footer />
    </div>
  );
};

export default LandingPage;
