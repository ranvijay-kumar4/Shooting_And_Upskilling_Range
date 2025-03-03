import { RevealOnScroll } from "../RevealOnScroll";
import savshkaImg from "../assets/savshka.png";
import adcliq360Img from "../assets/adcliq360.png";
import greenandyoungImg from "../assets/greenandyoung.png";
import githubExplorerImg from "../assets/githubexplorer.png";

export const Projects = () => {
  const projects = [
    {
      title: "Telecommunication Marketing Agency",
      description: "Noida-based telecommunication firm dealing in Bulk SMS, Voice Services, and Email Services.",
      technologies: ["HTML", "CSS", "JavaScript", "React.js", "Tailwind CSS"],
      link: "https://www.savshka.com/",
      imageUrl: savshkaImg,
    },
    {
      title: "Comprehensive Digital Agency",
      description: "A complete digital marketing agency offering web solutions, branding, and online promotions.",
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap", "Figma"],
      link: "https://adcliq360.com/",
      imageUrl: adcliq360Img,
    },
    {
      title: "Home Interior Company",
      description: "A modern and stylish home interior design website showcasing projects and services.",
      technologies: ["React.js", "Tailwind CSS", "Canva", "JavaScript"],
      link: "https://greenandyoung.in/",
      imageUrl: greenandyoungImg,
    },
    {
      title: "GitHub Explorer",
      description: "An interactive web app to explore GitHub user profiles and repositories, built with React and Tailwind CSS.",
      technologies: ["React.js", "Tailwind CSS", "Axios", "GitHub API"],
      link: "https://github.com/ranvijay-kumar4/Explorer",
      imageUrl: githubExplorerImg,
    },
  ];

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center py-20">
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
              >
                <img
                  src={project.imageUrl}
                  alt={`${project.title} screenshot`}
                  className="mb-4 rounded-lg w-full h-48 object-cover"
                />
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                  >
                    View Project →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
