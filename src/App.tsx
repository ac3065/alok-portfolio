import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, ChevronRight, Download, Calendar, Award, Trophy, Code } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';



gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
      el: containerRef.current!,
      smooth: true,
      multiplier: 1,
      class: 'is-revealed'
    });

    // GSAP animations
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      gsap.fromTo(section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      scroll.destroy();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      alert('Error sending message. Please try again.');
    }

    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const navigationItems = [
    'About',
    'Skills',
    'Projects',
    'Experience',
    'Achievements',
    'Certifications',
    'Contact'
  ];

  
  return (
    <div ref={containerRef} className="bg-[#0a192f] text-gray-100 min-h-screen" data-scroll-container>
      {/* Navigation */}
      <nav className="fixed w-full bg-[#0a192f]/95 backdrop-blur-sm z-50 border-b border-[#112240]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 font-bold text-xl text-[#64ffda]">
              Alok Chauhan
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {navigationItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-300 hover:text-[#64ffda] transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-400 hover:text-white focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#0a192f] border-b border-[#112240]">
              {navigationItems.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-base w-full text-left text-gray-300 hover:text-[#64ffda] hover:bg-[#112240] transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" data-scroll-section>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Hi, I'm <span className="text-[#64ffda]">Alok Chauhan</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-400 mb-8">
              B.Tech CSE Student at Invertis University | Full Stack Developer
            </p>
            <div className="flex gap-4">
              <a href="#contact" className="bg-[#64ffda] text-[#0a192f] hover:bg-[#64ffda]/90 px-6 py-3 rounded-lg font-medium transition-colors">
                Contact Me
              </a>
              <a href="https://drive.google.com/file/d/1TeLZigAZ5kxI1A_pJwwHOKJqk3tU_d_7/view?usp=drivesdk" className="border border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda]/10 px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
                Resume <Download size={18} />
              </a>
            </div>
          </div>
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#64ffda] flex-shrink-0">
            <img
              src="./images1/Myself.jpg"
              alt="Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#112240]" data-scroll-section>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-[#64ffda]">About Me</h2>
          <div className="text-gray-300">
            <p className="mb-6">
              I am currently pursuing B.Tech in Computer Science Engineering from Invertis University.
              As a passionate Full Stack Developer, I love building web applications and solving complex
              problems through code. My journey in technology has equipped me with a strong foundation
              in both frontend and backend development.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/ac3065" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#64ffda] transition-colors">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/alok-chauhan-32ab7b254/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#64ffda] transition-colors">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8" data-scroll-section>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-[#64ffda]">Skills</h2>
          <div className="grid gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-6 text-gray-300">Frontend Development</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {[
                  { name: 'HTML5', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg' },
                  { name: 'CSS3',  icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg' },
                  { name: 'Tailwind CSS', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg' },
                  { name: 'Bootstrap', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-original.svg' },
                  { name: 'JavaScript', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg' },
                  { name: 'React', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg' },
                ].map((skill) => (
                  <div key={skill.name} className="flex items-center gap-3 bg-[#112240] p-4 rounded-lg">
                    <img src={skill.icon} alt={skill.name} className="w-8 h-8" />
                    <span className="text-gray-300">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6 text-gray-300">Backend Development</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {[
                  { name: 'Node.js', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg' },
                  { name: 'Express', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg' },
                  { name: 'MongoDB', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg' },
                  
                ].map((skill) => (
                  <div key={skill.name} className="flex items-center gap-3 bg-[#112240] p-4 rounded-lg">
                    <img src={skill.icon} alt={skill.name} className="w-8 h-8" />
                    <span className="text-gray-300">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6 text-gray-300">Developer Tools</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {[
                  { name: 'Git', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg' },
                  { name: 'GitHub', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg' },
                  { name: 'VS Code', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg' },
                  { name: 'Postman', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postman/postman-original.svg' },
                  { name: 'MongoDb Compass', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg' },
                
                ].map((skill) => (
                  <div key={skill.name} className="flex items-center gap-3 bg-[#112240] p-4 rounded-lg">
                    <img src={skill.icon} alt={skill.name} className="w-8 h-8" />
                    <span className="text-gray-300">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#112240]" data-scroll-section>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-[#64ffda]">Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Real time Device Track',
                description: 'A real-time device tracking system built with Express.js and modern web technologies. This project enables users to track devices efficiently with real-time updates and secure data handling.',
                image: './images1/map.png',
                github: 'https://github.com/ac3065/Live-Tracking-Device?tab=readme-ov-file',
                demo: 'https://ecommerce-demo.com',
              },
              {
                title: 'Travel PackMate',
                description: 'PackTrack – A React-based packing organizer that helps you efficiently manage your travel essentials. Easily track, sort, and check off items as you pack. ',
                image: './images1/p2.png',
                github: 'https://github.com/ac3065/Reactjs/tree/UpdatedTravel_list_App',
                demo: 'https://task-manager-demo.com',
              },
              {
                title: 'Weather Dashboard',
                description: 'Weather forecasting app using OpenWeather API and React',
                image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&q=80',
                github: 'https://github.com/yourusername/weather-app',
                demo: 'https://weather-app-demo.com',
              },
            ].map((project) => (
              <div key={project.title} className="bg-[#0a192f] rounded-lg overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#64ffda] hover:text-[#64ffda]/80"
                    >
                      <Github size={16} />
                      Code
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#64ffda] hover:text-[#64ffda]/80"
                    >
                      <ExternalLink size={16} />
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8" data-scroll-section>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-[#64ffda]">Experience</h2>
          <div className="relative border-l-2 border-[#64ffda] pl-8 ml-4">
            {[
              {
                title: 'Social Winter of Code 4.0',
                company: 'Contributor',
                date: 'Jan 2025 - April 2025',
                description: 'Collaborated and contributed to open-source projects in SWOC (Social Winter of Code), gaining hands-on experience in real-world developmen',
              },
              {
                title: 'Frontend Development Intern',
                company: 'CodeClause',
                date: 'Jan 2025 - Feb 2025',
                description: 'Developed responsive user interfaces using React and Tailwind CSS.',
              },
            ].map((exp, index) => (
              <div key={index} className="mb-12 relative">
                <div className="absolute -left-14 mt-1.5 w-5 h-5 rounded-full bg-[#64ffda]"></div>
                <div className="bg-[#112240] p-6 rounded-lg">
                  <div className="flex items-center gap-2 text-[#64ffda] mb-2">
                    <Calendar size={16} />
                    <span className="text-sm">{exp.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                  <p className="text-gray-400 mb-2">{exp.company}</p>
                  <p className="text-gray-300">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
<section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#112240]" data-scroll-section>
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-bold mb-12 text-[#64ffda]">Achievements</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      
      {/* LeetCode */}
      <div 
        className="bg-[#0a192f] p-8 rounded-lg border border-[#233554] transform hover:scale-105 transition-transform cursor-pointer"
        onClick={() => window.open("https://leetcode.com/u/RaceBegun/", "_blank")}
      >
        <div className="flex items-center justify-between mb-6">
          <img
            src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/leet-code.svg"
            alt="LeetCode"
            className="w-12 h-12"
          />
          <span className="text-4xl font-bold text-[#64ffda]">70+</span>
        </div>
        <h3 className="text-xl font-bold mb-2">LeetCode Problems</h3>
        <p className="text-gray-400">Solved various DSA problems ranging from easy to hard difficulty</p>
      </div>

     {/* GeeksForGeeks */}
<div 
  className="bg-[#0a192f] p-8 rounded-lg border border-[#233554] transform hover:scale-105 transition-transform cursor-pointer"
  onClick={() => window.open("https://auth.geeksforgeeks.org/user/alokc7pop/", "_blank")}
>
  <div className="flex items-center justify-between mb-6">
    <img
      src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/geeks-for-geeks.svg"
      alt="GeeksForGeeks"
      className="w-12 h-12"
    />
    <span className="text-4xl font-bold text-[#64ffda]">320+</span>
  </div>
  <h3 className="text-xl font-bold mb-2">GFG Problems</h3>
  <p className="text-gray-400">Solved DSA problems and contributed to the GFG community</p>
</div>


  {/* Additional Achievements - Diary Style */}
  <div className="bg-[#0a192f] p-8 rounded-lg border border-[#233554] transform hover:scale-105 transition-transform shadow-lg relative diary-box">
        <h3 className="text-xl font-bold text-[#64ffda] mb-4">My Achievements</h3>
        <div className="text-gray-300 space-y-3">
          <div className="border-l-4 border-[#64ffda] pl-4">
            <p>📌 GFG Institute <span className="text-[#64ffda] font-semibold">Rank 8</span> out of <span className="text-[#64ffda] font-semibold">1100+</span> students.</p>
          </div>
          <div className="border-l-4 border-[#64ffda] pl-4">
            <p>📌 Solved <span className="text-[#64ffda] font-semibold">400+</span> DSA Problems across different platforms.</p>
          </div>
          <div className="border-l-4 border-[#64ffda] pl-4">
            <p>📌 Contributed to <span className="text-[#64ffda] font-semibold">SWOC [Social Winter of Code Season-5]</span>, enhancing project features with impactful code and successful PRs.</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

          {/* Certifications Section */}
          <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8" data-scroll-section>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-[#64ffda]">Certifications</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Udemy Certification */}
            <div 
              className="bg-[#112240] p-8 rounded-lg transform hover:scale-105 transition-transform cursor-pointer"
              onClick={() => window.open('https://www.udemy.com/certificate/UC-c9c0266f-7a00-49e7-b0cc-8600e4680e6d/', '_blank')}
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
                  alt="Udemy"
                  className="w-24"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Node.js, Express, MongoDB & More: The Complete Bootcamp</h3>
                  <p className="text-gray-400">Udemy</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                Comprehensive course covering full-stack web development including HTML, CSS, JavaScript, Node.js, and more.
              </p>
              <div className="flex items-center gap-2 text-[#64ffda]">
                <Award size={16} />
                <span>Issued Feb 2025</span>
              </div>
            </div>

            {/* Add more certifications as needed */}
            <div 
              className="bg-[#112240] p-8 rounded-lg transform hover:scale-105 transition-transform cursor-pointer"
              onClick={() => window.open('https://www.example.com/udemy-react-redux-cert', '_blank')}
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
                  alt="Udemy"
                  className="w-24"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Advanced React and Redux</h3>
                  <p className="text-gray-400">Udemy</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                In-depth course on advanced React concepts, Redux state management, and modern frontend development practices.
              </p>
              <div className="flex items-center gap-2 text-[#64ffda]">
                <Award size={16} />
                <span>Issued Dec 2023</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#112240]" data-scroll-section>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-[#64ffda]">Contact Me</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-[#0a192f] border border-[#233554] rounded-lg focus:outline-none focus:border-[#64ffda] text-gray-100"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-[#0a192f] border border-[#233554] rounded-lg focus:outline-none focus:border-[#64ffda] text-gray-100"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-[#0a192f] border border-[#233554] rounded-lg focus:outline-none focus:border-[#64ffda] text-gray-100"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#64ffda] text-[#0a192f] hover:bg-[#64ffda]/90 py-3 rounded-lg font-medium transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-100">Get in Touch</h3>
                <p className="text-gray-400">
                  I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                </p>
              </div>
              <div className="space-y-4">
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=alokc03655@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-[#64ffda] transition-colors">
  <Mail size={20} />
  alokc03655@gmail.com
</a>

                <a href="https://github.com/ac3065" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-[#64ffda] transition-colors">
                  <Github size={20} />
                  github.com/yourusername
                </a>
                <a href="https://www.linkedin.com/in/alok-chauhan-32ab7b254/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-[#64ffda] transition-colors">
                  <Linkedin size={20} />
                  linkedin.com/in/yourusername
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a192f] py-8 px-4 sm:px-6 lg:px-8 border-t border-[#112240]">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>© 2024 Alok Chauhan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;