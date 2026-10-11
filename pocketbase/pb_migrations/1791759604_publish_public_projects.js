// Publish the two portfolio projects after their GitHub repositories became public.
const publishedSlugs = [
 "courier-tracking-system",
 "courier-tracking-system-tr",
 "telegram-reminder-assistant",
 "telegram-reminder-assistant-tr",
];

migrate((app) => {
 for (const slug of publishedSlugs) {
  const records = app.findRecordsByFilter(
   "projects",
   "slug = {:slug}",
   "",
   1,
   0,
   { slug },
  );

  if (!records.length) {
   throw new Error(`Expected project record not found: ${slug}`);
  }

  const record = records[0];
  record.set("published", true);
  app.save(record);
 }
}, (app) => {
 for (const slug of publishedSlugs) {
  const records = app.findRecordsByFilter(
   "projects",
   "slug = {:slug}",
   "",
   1,
   0,
   { slug },
  );

  for (const record of records) {
   record.set("published", false);
   app.save(record);
  }
 }
});
