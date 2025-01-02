"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Template from "../components/Template";
import type { BlogPost } from "@/utils/blog";

const POSTS_PER_PAGE = 6;

interface Props {
  initialPosts: BlogPost[];
  categories: string[];
  tags: string[];
}

export default function BlogList({ initialPosts, categories, tags }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        !selectedCategory || post.category === selectedCategory;
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      const matchesLanguage =
        !selectedLanguage || post.language === selectedLanguage;
      return matchesSearch && matchesCategory && matchesTag && matchesLanguage;
    });
  }, [
    initialPosts,
    searchQuery,
    selectedCategory,
    selectedTag,
    selectedLanguage,
  ]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <Template>
      <div className="min-h-screen bg-[#0a192f] py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#ccd6f6]">
              Blog
            </h1>
            <p className="text-xl text-[#8892b0]">
              Thoughts, tutorials and insights
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto mb-8 space-y-4">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#112240] text-[#ccd6f6] border border-[#64ffda]/10 focus:border-[#64ffda] focus:outline-none"
            />

            <div className="flex flex-wrap gap-4">
              <select
                value={selectedCategory || ""}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="px-4 py-2 rounded-lg bg-[#112240] text-[#ccd6f6] border border-[#64ffda]/10"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={selectedTag || ""}
                onChange={(e) => setSelectedTag(e.target.value || null)}
                className="px-4 py-2 rounded-lg bg-[#112240] text-[#ccd6f6] border border-[#64ffda]/10"
              >
                <option value="">All Tags</option>
                {tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>

              <select
                value={selectedLanguage || ""}
                onChange={(e) => setSelectedLanguage(e.target.value || null)}
                className="px-4 py-2 rounded-lg bg-[#112240] text-[#ccd6f6] border border-[#64ffda]/10"
              >
                <option value="">All Languages</option>
                <option value="en">English</option>
                <option value="tr">Türkçe</option>
              </select>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {currentPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#112240] rounded-lg p-8 hover:translate-y-[-4px] transition-transform duration-300 border border-[#64ffda]/10"
              >
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#8892b0] mb-4">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <span className="text-[#64ffda]">{post.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    {post.language === "tr" ? (
                      <>
                        <span className="w-4 h-4 rounded-full overflow-hidden inline-block">
                          🇹🇷
                        </span>
                        <span className="text-[#8892b0]">TR</span>
                      </>
                    ) : (
                      <>
                        <span className="w-4 h-4 rounded-full overflow-hidden inline-block">
                          🇬🇧
                        </span>
                        <span className="text-[#8892b0]">EN</span>
                      </>
                    )}
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-3 text-[#ccd6f6]">
                  {post.title}
                </h2>
                <p className="text-[#8892b0] mb-4">{post.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-sm rounded-full bg-[#64ffda]/10 text-[#64ffda]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <motion.a
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-[#64ffda] hover:text-[#64ffda]/80 transition group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Read more
                  <motion.span
                    className="ml-1"
                    initial={{ x: 0 }}
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.a>
              </motion.article>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 space-x-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-[#112240] text-[#ccd6f6] border border-[#64ffda]/10 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-[#8892b0]">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-[#112240] text-[#ccd6f6] border border-[#64ffda]/10 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </Template>
  );
}
