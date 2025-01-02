"use client";

import { motion } from "framer-motion";

interface ErrorMessageProps {
  message: string;
  retryFn?: () => void;
}

export default function ErrorMessage({ message, retryFn }: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-8 bg-[#112240] rounded-lg border border-red-500/10"
    >
      <svg
        className="w-12 h-12 text-red-500 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <h3 className="text-xl font-semibold text-red-500 mb-2">Error</h3>
      <p className="text-[#8892b0] text-center mb-4">{message}</p>
      {retryFn && (
        <button
          onClick={retryFn}
          className="px-4 py-2 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20 transition-colors"
        >
          Try Again
        </button>
      )}
    </motion.div>
  );
}
