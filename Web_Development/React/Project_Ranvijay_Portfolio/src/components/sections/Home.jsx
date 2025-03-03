import { RevealOnScroll } from "../RevealOnScroll";
import profilePic from "../assets/profile.jpg"; // Ensure you have your image in the assets folder
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { FaEnvelope, FaCommentDots } from "react-icons/fa";

export const Home = () => {
  const typedTextRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedTextRef.current, {
      strings: [
        "Student",
        "Frontend Developer",
        "UI/UX Developer",
        "Web Developer",
        "Coder",
        "Software Developer",
        "Software Engineer",
      ],
      typeSpeed: 100,
      backSpeed: 80,
      backDelay: 2000,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center relative bg-gray-900 text-white overflow-hidden p-10"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 opacity-80 z-0"></div>
      
      <RevealOnScroll>
        <div className="flex flex-col md:flex-row items-center z-10 max-w-5xl w-full text-center md:text-left">
          <img
            src={profilePic}
            alt="Ranvijay Kumar"
            className="w-52 h-52 md:w-64 md:h-64 rounded-full border-4 border-blue-500 shadow-lg mb-6 md:mb-0 md:mr-10 animate-fadeIn"
          />

          <div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent leading-tight animate-fadeIn">
              Hi, Myself <span className="text-cyan-300">Ranvijay Kumar</span>
            </h1>
            
            <p className="text-2xl md:text-3xl font-semibold mb-6 animate-fadeIn">
              I'm a <span ref={typedTextRef} className="text-blue-400"></span>
            </p>

            <p className="text-gray-300 text-lg mb-8 max-w-xl animate-fadeIn delay-100">
            having a strong foundation in Web Development, Data Structures, System Design, Object Oriented Programming (OOPs), Computer Architecture, 
            Operating System, Computer Networks, and Database Management System etc.            </p>

            <div className="flex justify-center md:justify-start space-x-6 animate-fadeIn delay-200">
              <a
                href="#projects"
                className="relative bg-blue-500 text-white py-3 px-7 rounded-xl font-semibold transition-all duration-300 overflow-hidden 
                hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
              >
                View Projects
              </a>

              <a
                href="https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&to=ranvijay9399@gmail.com"
                className="relative border border-green-500/50 text-green-400 py-3 px-7 rounded-xl font-semibold transition-all duration-300 
                flex items-center space-x-2 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:bg-green-500/10"
              >
                <FaEnvelope />
                <span>Mail Me</span>
              </a>

              <a
                href="https://wa.me/+919399688140"
                className="relative bg-green-500 text-white py-3 px-7 rounded-xl font-semibold transition-all duration-300 
                flex items-center space-x-2 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
              >
                <FaCommentDots />
                <span>Message Me</span>
              </a>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
