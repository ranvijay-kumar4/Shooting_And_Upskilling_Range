import { RevealOnScroll } from "../RevealOnScroll";
import { FaUniversity, FaBriefcase } from "react-icons/fa";

export const Background = () => {
  return (
    <section id="background" className="min-h-screen flex items-center justify-center py-20 bg-gray-900 text-white">
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent animate-fadeIn">
            My Background
          </h2>

          {/* Education Section */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-10">
            <div className="flex items-center justify-center mb-4">
              <FaUniversity className="text-blue-400 text-4xl" />
              <h3 className="text-2xl font-semibold ml-3">Education</h3>
            </div>
            <p className="text-lg text-gray-200 font-medium">Bachelor of Technology - Information Technology</p>
            <p className="text-md text-gray-300">Jabalpur Engineering College, Jabalpur (2022-2026)</p>
            <p className="text-sm text-gray-400 mt-2">Relevant Coursework:  Data Structures and Algorithms (C++), Object Oriented Programming, System Design,
            Computer Architecture, Operating System, Computer Networks, Database Management System</p>
          </div>

          {/* Experience Section */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <FaBriefcase className="text-yellow-400 text-4xl" />
              <h3 className="text-2xl font-semibold ml-3">Experience</h3>
            </div>
            <p className="text-lg text-gray-200 font-medium">Web Developer Intern</p>
            <p className="text-md text-gray-300">Savshka Communications Pvt. Ltd. (May 2024 - Aug 2024)</p>
            <ul className="text-sm text-gray-400 mt-2 list-disc list-inside">
              <li>Developed and optimized web applications, enhancing UI/UX by 60%.</li>
              <li>Reduced website load speed by 45% through performance optimization.</li>
              <li>Implemented SEO strategies, boosting rankings by 40%.</li>
              <li>Collaborated with the design team to create responsive web pages.</li>
            </ul>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
