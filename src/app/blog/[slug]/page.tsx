import { getPostBySlug } from "@/utils/blog";
import Template from "@/app/components/Template";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

interface Props {
  params: {
    slug: string;
  };
}

export default async function BlogPost({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <Template>
      <div className="min-h-screen bg-[#0a192f] py-20">
        <article className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center text-[#64ffda] hover:text-[#64ffda]/80 transition mb-8 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Blog
          </Link>

          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#8892b0] mb-4">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
              <span>•</span>
              <span className="text-[#64ffda]">{post.category}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#ccd6f6]">
              {post.title}
            </h1>
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-sm rounded-full bg-[#64ffda]/10 text-[#64ffda]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="prose prose-invert prose-pre:bg-[#112240] prose-pre:border prose-pre:border-[#64ffda]/10 max-w-none">
            <MDXRemote source={post.content} />
          </div>

          <div className="mt-12 border-t border-[#64ffda]/10 pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-[#64ffda] hover:text-[#64ffda]/80 transition group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Blog
            </Link>
          </div>
        </article>
      </div>
    </Template>
  );
}
