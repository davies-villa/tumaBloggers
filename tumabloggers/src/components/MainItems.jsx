import React from "react";
import Icon1 from "../assets/views.svg";
import Icon2 from "../assets/collab.svg";
import Icon3 from "../assets/sharedworkload.svg";
import Icon4 from "../assets/undraw_personal_opinions_re_qw29.svg";

const WhyBlogs = () => {
  const reasons = [
    {
      title: "Diverse Perspectives",
      content:
        "With two writers contributing, the blog can showcase a wider range of viewpoints and experiences. This diversity enriches the content, allowing readers to gain insights from different angles on various topics.",
      icon: Icon1,
    },
    {
      title: "Collaborative Creativity",
      content:
        "Managing a blog can be time-consuming. With two  writers, tasks such as researching, writing, and editing can be shared, making it easier to maintain a consistent posting schedule and keep the content fresh.",
      icon: Icon2,
    },
    {
      title: "Shared Workload",
      content:
        "Two writers can brainstorm and collaborate on ideas, resulting in more innovative and well-rounded posts. This teamwork can lead to unique content that combines their strengths, making the blog more engaging.",
      icon: Icon3,
    },
    {
      title: "Dynamic Conversations",
      content:
        "With two writers contributing, the blog can showcase a wider range of viewpoints and experiences. This diversity enriches the content, allowing readers to gain insights from different angles on various topics.",
      icon: Icon4,
    },
  ];

  return (
    <div className="p-8 lg:px-24 space-y-10">
      <h2 className="text-4xl font-bold mb-8 text-center">
        <span className="text-black">Why </span>
        <span className="text-green-500">Blogs?</span>
      </h2>

      {reasons.map((reason, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row items-center md:items-start text-center md:text-left ${
            index % 2 === 0 ? "md:justify-start" : "md:justify-end"
          } space-y-4 md:space-y-0`}
        >
          {/* Icon and Content */}
          <div className="w-full md:w-1/2 flex flex-col items-center ">
            <img
              src={reason.icon}
              alt={`${reason.title} icon`}
              className="w-32 h-32 mb-4" // Increased size
            />
            <h3 className="text-2xl font-semibold">{reason.title}</h3>
            <p className="mt-2 text-lg text-gray-600">{reason.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WhyBlogs;
