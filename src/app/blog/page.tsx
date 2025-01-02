import { getAllPosts, getAllCategories, getAllTags } from "@/utils/blog";
import BlogList from "./BlogList";

export default async function Blog() {
  const [allPosts, categories, tags] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
    getAllTags(),
  ]);

  return (
    <BlogList initialPosts={allPosts} categories={categories} tags={tags} />
  );
}
