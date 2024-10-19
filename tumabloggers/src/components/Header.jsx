import { Link } from "react-router-dom";
import wave from "../assets/wave.svg"; // Import your wave SVG

const Header = () => {
  return (
    <header className="relative bg-[#0ABF5D] lg:bg-none text-white overflow-hidden">
      {/* Content Section */}
      <div className="py-48 px-6 lg:px-12">
        {/* Header Content */}
        <h1 className="text-5xl font-bold text-white text-center lg:text-left">
          Two Voices, One Journey
        </h1>

        <p className="mt-6 text-lg text-white max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
          Our goal is to inspire meaningful conversations that challenge
          conventional thinking. Through collaborative writing, we explore
          diverse ideas, share stories, and encourage deeper understanding. Join
          us on this journey of reflection, exploration, and discovery!
        </p>

        {/* Buttons */}
        <div className="mt-8 flex justify-center lg:justify-start space-x-4">
          {/* Link to Blogs Page */}
          <Link to="/blogs">
            <button className="px-6 py-3 bg-white text-green-400 text-lg font-medium rounded-md hover:bg-gray-200 transition flex items-center space-x-2">
              {/* SVG Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              </svg>
              <span>Read Now</span>
            </button>
          </Link>

          <button className="px-6 py-3 text-white text-lg font-normal rounded-md hover:bg-green-800 hover:text-green-500 transition">
            Explore Blogs
          </button>
        </div>
      </div>

      {/* Larger Green Circle for Large Screens */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] z-0 hidden lg:block bg-green-500 rounded-full" />

      {/* Wave Background at the Bottom for Small Screens */}
      <div
        className="absolute bottom-0 left-0 w-full h-24 lg:h-36 bg-no-repeat bg-bottom"
        style={{
          backgroundImage: `url(${wave})`,
          backgroundSize: "cover",
        }}
      ></div>
    </header>
  );
};

export default Header;
