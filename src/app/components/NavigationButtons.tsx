"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const pages = {
  "/": "Home",
  "/projects": "Projects",
  "/blog": "Blog",
  "/contact": "Contact",
} as const;

const pageOrder = ["/", "/projects", "/blog", "/contact"] as const;

function getNextPage(currentPath: string): (typeof pageOrder)[number] {
  const currentIndex = pageOrder.indexOf(
    currentPath as (typeof pageOrder)[number]
  );
  return currentIndex < pageOrder.length - 1
    ? pageOrder[currentIndex + 1]
    : pageOrder[0];
}

function getPreviousPage(currentPath: string): (typeof pageOrder)[number] {
  const currentIndex = pageOrder.indexOf(
    currentPath as (typeof pageOrder)[number]
  );
  return currentIndex > 0
    ? pageOrder[currentIndex - 1]
    : pageOrder[pageOrder.length - 1];
}

export default function NavigationButtons() {
  const pathname = usePathname();
  const nextPage = getNextPage(pathname);
  const prevPage = getPreviousPage(pathname);

  return (
    <>
      <div className="fixed inset-y-0 left-0 flex items-center">
        <div className="p-4 group relative">
          <Link href={prevPage}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-600/10 hover:bg-blue-600/20 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 transition-all duration-300"
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-blue-600 dark:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={{ x: 0 }}
                animate={{ x: [-2, 0, -2] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </motion.svg>
            </motion.div>
            <div className="absolute left-20 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {pages[prevPage]}
            </div>
          </Link>
        </div>
      </div>

      <div className="fixed inset-y-0 right-0 flex items-center">
        <div className="p-4 group relative">
          <Link href={nextPage}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-600/10 hover:bg-blue-600/20 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 transition-all duration-300"
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-blue-600 dark:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={{ x: 0 }}
                animate={{ x: [2, 0, 2] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </motion.svg>
            </motion.div>
            <div className="absolute right-20 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {pages[nextPage]}
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
