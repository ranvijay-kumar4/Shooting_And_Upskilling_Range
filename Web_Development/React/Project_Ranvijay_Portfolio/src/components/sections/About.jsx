import { RevealOnScroll } from "../RevealOnScroll";
import { 
  FaHtml5, FaCss3Alt, FaReact, FaBootstrap, FaGitAlt, FaGithub, FaFigma 
} from "react-icons/fa"; 
import { SiTailwindcss, SiJavascript, SiCplusplus, SiMysql, SiPhp, SiCanva, SiGooglecloud } from "react-icons/si";
import { DiJava, DiVisualstudio, DiDatabase } from "react-icons/di";
import { TbBrandCpp } from "react-icons/tb";

export const About = () => {
  const skills = [
    {
      category: "Languages",
      skills: [
        { name: "C++", icon: TbBrandCpp, color: "text-blue-500", hoverColor: "group-hover:text-blue-300" },
        { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400", hoverColor: "group-hover:text-yellow-200" },
        { name: "C", icon: SiCplusplus, color: "text-blue-700", hoverColor: "group-hover:text-blue-400" },
        { name: "SQL", icon: SiMysql, color: "text-blue-500", hoverColor: "group-hover:text-blue-300" },
        { name: "PHP", icon: SiPhp, color: "text-purple-500", hoverColor: "group-hover:text-purple-300" },
      ],
    },
    {
      category: "Web Technologies",
      skills: [
        { name: "HTML5", icon: FaHtml5, color: "text-orange-500", hoverColor: "group-hover:text-orange-300" },
        { name: "CSS3", icon: FaCss3Alt, color: "text-blue-500", hoverColor: "group-hover:text-blue-300" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-teal-400", hoverColor: "group-hover:text-teal-200" },
        { name: "Bootstrap", icon: FaBootstrap, color: "text-purple-600", hoverColor: "group-hover:text-purple-400" },
        { name: "Responsive Design", icon: DiDatabase, color: "text-green-500", hoverColor: "group-hover:text-green-300" },
        { name: "React.js", icon: FaReact, color: "text-cyan-400", hoverColor: "group-hover:text-cyan-200" },
      ],
    },
    {
      category: "Designing / Development Tools",
      skills: [
        { name: "Figma", icon: FaFigma, color: "text-pink-500", hoverColor: "group-hover:text-pink-300" },
        { name: "Canva", icon: SiCanva, color: "text-blue-400", hoverColor: "group-hover:text-blue-200" },
        { name: "VS Code", icon: DiVisualstudio, color: "text-blue-500", hoverColor: "group-hover:text-blue-300" },
        { name: "Git", icon: FaGitAlt, color: "text-orange-500", hoverColor: "group-hover:text-orange-300" },
        { name: "Google Cloud Platform", icon: SiGooglecloud, color: "text-yellow-500", hoverColor: "group-hover:text-yellow-300" },
        { name: "GitHub", icon: FaGithub, color: "text-black bg-white rounded-full p-1", hoverColor: "group-hover:text-white group-hover:bg-black" },
      ],
    },
  ];

  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20 bg-gray-900">
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-6 text-white">
          <h2 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent animate-fadeIn">
            About Me
          </h2>

          <p className="text-center text-lg text-gray-300 mb-8">
            Web / Software developer with expertise in building scalable web applications and creating innovative solutions.</p> 
            <p className="text-center text-lg text-gray-300 mb-8"> With experience as a <u> Web Developer Intern</u> at <strong> " Savshka Communications Pvt. Ltd. "</strong>, I have built and optimized high-performance websites, improving UI/UX and SEO. I am always eager to learn, build innovative solutions, and collaborate on impactful projects. </p>

          {/* Skills Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillCategory, index) => (
              <div key={index} className="rounded-xl p-6 bg-gray-800 shadow-md hover:shadow-lg transition-all">
                <h3 className="text-2xl font-semibold mb-4 text-blue-400">{skillCategory.category}</h3>
                <div className="flex flex-wrap gap-4 justify-center">
                  {skillCategory.skills.map((skill, key) => (
                    <div key={key} className="group flex flex-col items-center">
                      <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center transition-all group-hover:bg-gray-600">
                        <skill.icon className={`w-10 h-10 ${skill.color} ${skill.hoverColor} group-hover:scale-110 transition-transform`} />
                      </div>
                      <span className="text-sm text-gray-300 mt-2 group-hover:text-blue-300 transition">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
