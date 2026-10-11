migrate((app) => {
  for (const name of ["projects", "posts"]) {
    const collection = new Collection({
      name, type: "base",
      listRule: "published = true", viewRule: "published = true",
      createRule: null, updateRule: null, deleteRule: null,
      fields: [
        { name: "slug", type: "text", required: true, max: 160, pattern: "^[a-z0-9]+(-[a-z0-9]+)*$" },
        { name: "title", type: "text", required: true, max: 250 },
        { name: "description", type: "text", required: true, max: 1000 },
        { name: "content", type: "text", required: true, max: 200000 },
        { name: "language", type: "select", required: true, maxSelect: 1, values: ["tr", "en"] },
        { name: "published", type: "bool" },
        { name: "featured", type: "bool" },
        { name: "date", type: "date", required: true },
        { name: "category", type: "text", max: 100 },
        { name: "tags", type: "json", maxSize: 5000 },
        { name: "cover", type: "file", maxSelect: 1, maxSize: 10485760, mimeTypes: ["image/jpeg", "image/png", "image/webp"] },
        ...(name === "projects" ? [
          { name: "outcome", type: "text", max: 2000 },
          { name: "demo_url", type: "url" },
          { name: "source_url", type: "url" },
          { name: "order", type: "number" },
        ] : []),
      ],
      indexes: [`CREATE UNIQUE INDEX idx_${name}_slug ON ${name} (slug)`],
    });
    app.save(collection);
  }
}, (app) => {
  for (const name of ["posts", "projects"]) app.delete(app.findCollectionByNameOrId(name));
});
