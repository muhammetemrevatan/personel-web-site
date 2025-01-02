"use client";

import { motion } from "framer-motion";
import Template from "./components/Template";
import { useState, useEffect } from "react";
import { getFeaturedProjects } from "@/services/github";
import { Repository } from "@/types/github";
import ErrorMessage from "./components/ErrorMessage";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const Home = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [projects, setProjects] = useState<Repository[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            const sectionIndex = parseInt(sectionId.split("-")[1]);
            setActiveSection(sectionIndex);
          }
        });
      },
      {
        root: null,
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    document.querySelectorAll("section[id^='section-']").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    const container = document.querySelector(".scroll-container");
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const fetchProjects = async () => {
    try {
      setError(null);
      const data = await getFeaturedProjects();
      setProjects(data);
    } catch (err) {
      setError(
        "Failed to load projects. Please check your internet connection and try again."
      );
      console.error("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Template>
      <div className="relative md:snap-y md:snap-mandatory h-screen overflow-y-scroll scroll-smooth scroll-container">
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: showScrollTop ? 1 : 0,
            scale: showScrollTop ? 1 : 0.5,
            y: showScrollTop ? 0 : 20,
          }}
          className="fixed bottom-8 right-8 z-50 bg-[#64ffda] text-[#0a192f] w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-[#64ffda]/90 transition-colors"
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>

        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-50">
          {[0, 1, 2].map((_, i) => (
            <a
              key={i}
              href={`#section-${i}`}
              className={`w-2 h-2 rounded-full border border-[#64ffda] transition-all duration-300 ${
                activeSection === i
                  ? "bg-[#64ffda]"
                  : "bg-transparent hover:bg-[#64ffda]/50"
              }`}
              aria-label={`Scroll to section ${i + 1}`}
            />
          ))}
        </div>

        <motion.section
          id="section-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="min-h-screen md:snap-start flex items-center bg-[#0a192f] py-20 md:py-0"
        >
          <div className="container mx-auto px-4">
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl"
              >
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-[#64ffda] font-mono text-lg mb-5"
                >
                  Hi there, I&apos;m
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-[#ccd6f6] text-5xl md:text-7xl font-bold tracking-tight mb-4"
                >
                  Muhammet Emre.
                </motion.h1>

                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-[#8892b0] text-4xl md:text-6xl font-bold tracking-tight mb-4"
                >
                  Software Engineer
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="font-dancing-script text-3xl md:text-4xl text-[#64ffda] transform -rotate-6 mb-8 ml-auto w-fit"
                >
                  Happy Coding :)
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-[#8892b0] text-lg max-w-xl mb-6"
                >
                  Crafting robust backend solutions and building scalable
                  software architectures. Specialized in Java, Spring Boot, and
                  cloud technologies.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex items-center gap-6"
                >
                  <a
                    href="/contact"
                    className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-[#64ffda] border-2 border-[#64ffda] rounded hover:bg-[#64ffda]/5 transition-all duration-300"
                  >
                    <span>Contact Me</span>
                  </a>
                  <a
                    href="/projects"
                    className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-[#ccd6f6] hover:text-[#64ffda] transition-all duration-300"
                  >
                    <span>View Projects</span>
                    <svg
                      className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="section-1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="min-h-screen md:snap-start flex items-center bg-[#112240] py-20 md:py-0"
        >
          <div className="container mx-auto px-4 max-w-[1600px]">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#ccd6f6]">
                Technical Skills
              </h2>
              <p className="text-xl text-[#8892b0] mb-16">
                Technologies and tools I work with
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h3 className="text-[#64ffda] font-semibold text-xl mb-6">
                  Backend Development
                </h3>
                <div className="space-y-2.5">
                  {[
                    "Java",
                    "Spring Boot",
                    "Spring Framework",
                    "Spring Security",
                    "Spring Cloud",
                    "Spring Integration",
                    "Spring Batch",
                    "Hibernate",
                    "JUnit",
                    "Mockito",
                    "Maven/Gradle",
                    "Swagger/OpenAPI",
                    "Unit Testing",
                  ].map((skill) => (
                    <div
                      key={skill}
                      className="p-2.5 bg-[#0a192f] rounded-lg text-[#8892b0] hover:text-[#64ffda] transition-colors"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h3 className="text-[#64ffda] font-semibold text-xl mb-6">
                  Frontend Development
                </h3>
                <div className="space-y-2.5">
                  {[
                    "HTML5",
                    "CSS3",
                    "JavaScript",
                    "TypeScript",
                    "React",
                    "Next.js",
                    "Material-UI",
                    "Bootstrap",
                  ].map((skill) => (
                    <div
                      key={skill}
                      className="p-2.5 bg-[#0a192f] rounded-lg text-[#8892b0] hover:text-[#64ffda] transition-colors"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h3 className="text-[#64ffda] font-semibold text-xl mb-6">
                  Database & Tools
                </h3>
                <div className="space-y-2.5">
                  {[
                    "PostgreSQL",
                    "MySQL",
                    "MongoDB",
                    "Redis",
                    "Git",
                    "IntelliJ IDEA",
                    "VS Code",
                  ].map((skill) => (
                    <div
                      key={skill}
                      className="p-2.5 bg-[#0a192f] rounded-lg text-[#8892b0] hover:text-[#64ffda] transition-colors"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h3 className="text-[#64ffda] font-semibold text-xl mb-6">
                  DevOps & Other
                </h3>
                <div className="space-y-2.5">
                  {[
                    "CI/CD",
                    "Linux",
                    "Apache",
                    "Docker",
                    "Apache Kafka",
                    "RabbitMQ",
                  ].map((skill) => (
                    <div
                      key={skill}
                      className="p-2.5 bg-[#0a192f] rounded-lg text-[#8892b0] hover:text-[#64ffda] transition-colors"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h3 className="text-[#64ffda] font-semibold text-xl mb-6">
                  Methodologies & Practices
                </h3>
                <div className="space-y-2.5">
                  {[
                    "Agile/Scrum",
                    "Microservices",
                    "RESTful APIs",
                    "TDD",
                    "Clean Code",
                    "SOLID Principles",
                    "Design Patterns",
                    "Code Review",
                  ].map((skill) => (
                    <div
                      key={skill}
                      className="p-2.5 bg-[#0a192f] rounded-lg text-[#8892b0] hover:text-[#64ffda] transition-colors"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="section-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="min-h-screen md:snap-start flex items-center bg-[#0a192f] py-20 md:py-0"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#ccd6f6]">
                Featured Projects
              </h2>
              <p className="text-xl text-[#8892b0] mb-16">
                Some of my recent work
              </p>
            </motion.div>

            {error ? (
              <ErrorMessage message={error} retryFn={fetchProjects} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-[#112240] rounded-lg p-6 hover:translate-y-[-4px] transition-transform duration-300"
                  >
                    <div className="text-[#64ffda] mb-4">
                      <svg
                        className="w-10 h-10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-[#ccd6f6]">
                      {project.metadata?.title || project.name}
                    </h3>
                    <p className="text-[#8892b0] mb-4">
                      {project.metadata?.description || project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.metadata?.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-sm text-[#64ffda] bg-[#64ffda]/10 px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.section>
      </div>
    </Template>
  );
};

export default Home;
