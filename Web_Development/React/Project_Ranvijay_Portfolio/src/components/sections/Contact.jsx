import { RevealOnScroll } from "../RevealOnScroll";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";

export const Contact = () => {
  const codingProfiles = [
    {
      id: 1,
      icon: <SiLeetcode size={40} className="text-white" />,
      name: "LeetCode",
      url: "https://leetcode.com/u/ranvijay-kumar4/",
      hoverBg: "hover:bg-[#FFA116]", // LeetCode Orange
    },
    {
      id: 2,
      icon: <SiGeeksforgeeks size={40} className="text-white" />,
      name: "Geeks for Geeks",
      url: "https://www.geeksforgeeks.org/user/ranvijay_kumar4/",
      hoverBg: "hover:bg-[#2F8D46]", // GFG Green
    },
    {
      id: 3,
      icon: <FaGithub size={40} className="text-white" />,
      name: "Github",
      url: "https://github.com/ranvijay-kumar4",
      hoverBg: "hover:bg-black", // GitHub Black
    },
  ];

  const socialLinks = [
    {
      id: 1,
      icon: <FaLinkedin size={40} className="text-white" />,
      name: "LinkedIn",
      url: "https://linkedin.com/in/ranvijay-kumar4/",
      hoverBg: "hover:bg-[#0077B5]", // LinkedIn Blue
    },
    {
      id: 2,
      icon: <FaTwitter size={40} className="text-white" />,
      name: "X (Twitter)",
      url: "https://x.com/ranvijay_kumar4",
      hoverBg: "hover:bg-[#1DA1F2]", // Twitter Blue
    },
    {
      id: 3,
      icon: <FaInstagram size={40} className="text-white" />,
      name: "Instagram",
      url: "https://instagram.com/ranvijay_kumar4/",
      hoverBg:
        "hover:bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500", // Instagram Gradient
    },
  ];

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center py-20 bg-gray-900 text-white"
    >
      <RevealOnScroll>
        {/* Coding Profiles Section */}
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
          Coding Profiles
        </h2>
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {codingProfiles.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center space-y-2 transition hover:scale-110"
            >
              <div
                className={`p-4 bg-white/10 rounded-full shadow-md transition ${link.hoverBg}`}
              >
                {link.icon}
              </div>
              <span className="text-lg font-medium">{link.name}</span>
            </a>
          ))}
        </div>

        {/* Social Links Section */}
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
          Connect with Me
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center space-y-2 transition hover:scale-110"
            >
              <div
                className={`p-4 bg-white/10 rounded-full shadow-md transition ${link.hoverBg}`}
              >
                {link.icon}
              </div>
              <span className="text-lg font-medium">{link.name}</span>
            </a>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
};
