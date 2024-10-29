import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="relative bg-white w-[95%] border  left-1/2 transform  -translate-x-1/2 rounded-md p-2   text-white shadow-2xl">
      {/* Content Section */}
      <div className="py-20 px-6 flex justify-start flex-col lg:px-12">
        {/* Header Title */}
        <h1 className="text-5xl font-bold text-main text-left ">
          Stories at Heart
        </h1>

        {/* Sub-paragraph */}
        <p className="mt-6 text-lg text-paragraph max-w-2xl text-left">
          Here, we share moments that inspire, surprise, and connect one heart at a time. 
          Jump in and feel the pulse!
        </p>

        {/* Buttons Section */}
        <div className="mt-8 flex justify-start lg:justify-start space-x-4">
          {/* Link to Blogs Page */}
          <Link to="/blogs">
            <button className="px-6 py-3 bg-background text-white text-lg font-medium rounded-md hover:bg-gray-200 transition">
              Find your read
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
