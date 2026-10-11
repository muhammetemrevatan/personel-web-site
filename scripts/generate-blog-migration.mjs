import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
const posts = fs.readdirSync("content/blog").filter(f => f.endsWith(".md")).sort().map(file => {
  const { data, content } = matter(fs.readFileSync(path.join("content/blog", file), "utf8"));
  return { slug: file.slice(0, -3), title: data.title, description: data.description,
    content, language: data.language || "tr", date: new Date(data.date).toISOString(),
    category: data.category || "", tags: data.tags || [], published: true };
});
const source = `// Existing Markdown posts, imported once. Original files are retained as an archive.
migrate((app) => {
  const collection = app.findCollectionByNameOrId("posts");
  const posts = ${JSON.stringify(posts, null, 2)};
  for (const data of posts) {
    const record = new Record(collection);
    for (const key in data) record.set(key, data[key]);
    app.save(record);
  }
});
`;
fs.writeFileSync("pocketbase/pb_migrations/1791676801_existing_posts.js", source);
console.log(`Prepared ${posts.length} existing blog posts.`);
