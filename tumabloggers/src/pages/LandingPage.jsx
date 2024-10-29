import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Categories from "../components/Catergories";

const LandingPage = () => {
  return (
    <div className="py-6">
      <Navbar />
      <div className="mt-28"> 
        <Header />
      </div>
      <div>
        <Categories />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
