"use client";

import { Repository } from "@/types/github";
import { motion } from "framer-motion";

interface ProjectListProps {
  projects: Repository[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1120] to-[#0B1120]">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            bounce: 0.4,
            duration: 0.8,
          }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-2">My Projects</h1>
          <p className="text-gray-400">
            A collection of my work and contributions
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.name}
              variants={item}
              className="bg-[#0F172A] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {project.metadata?.title || project.name}
                </h3>
                <p className="text-gray-400 mb-4">
                  {project.metadata?.description || project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.metadata?.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      whileHover={{
                        scale: 1.1,
                        transition: { type: "spring", stiffness: 400 },
                      }}
                      className="px-3 py-1 text-sm bg-[#1E293B] text-emerald-400 rounded-full"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <motion.a
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-400 hover:text-emerald-300"
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  View Project
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
