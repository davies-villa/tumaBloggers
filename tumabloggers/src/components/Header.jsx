import React from "react";

const Header = () => {
  return (
    <header
      className="bg-gray-100 py-24 h-auto flex flex-col items-center bg-cover"
      style={{ backgroundImage: "url(/path/to/your/background-image.jpg)" }}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Bold Perspectives, Unfiltered Opinions
      </h1>
      <p className="text-lg text-center max-w-2xl mb-8">
        Welcome to our blog, where we share our unique insights on various
        topics. Together, we aim to challenge conventional thinking and spark
        meaningful conversations through our writing.
      </p>
    </header>
  );
};

export default Header;
