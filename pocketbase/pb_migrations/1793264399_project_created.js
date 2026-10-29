// Track project insertion time separately from its editorial date, as posts already do.
migrate((app) => {
  const collection = app.findCollectionByNameOrId("projects");
  if (collection.fields.getByName("created")) return;
  collection.fields.add(new AutodateField({name: "created", onCreate: true, onUpdate: false}));
  app.save(collection);
  // Older records have no insertion timestamp; use their existing dates as a stable fallback.
  app.db().newQuery("UPDATE projects SET created = date WHERE created = '' OR created IS NULL").execute();
});
