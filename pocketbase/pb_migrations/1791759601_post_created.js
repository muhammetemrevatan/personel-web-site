// Track insertion time independently of the editorial publication date.
migrate((app) => {
  const collection = app.findCollectionByNameOrId("posts");
  if (collection.fields.getByName("created")) return;
  collection.fields.add(new AutodateField({name: "created", onCreate: true, onUpdate: false}));
  app.save(collection);
  // Historical insertion times were not recorded. Preserve their existing date order.
  app.db().newQuery("UPDATE posts SET created = date WHERE created = '' OR created IS NULL").execute();
});
