import fs from 'node:fs';
import matter from 'gray-matter';
const entries = [
 ['ethical-coding-practices','ethical-coding-practices-tr','tr','Kodun Etiği: Empatiyle Yazılım Geliştirmek','Etik kodlama pratiklerinin önemini ve geliştiricilerin ekip arkadaşlarının işini nasıl kolaylaştırabileceğini ele alıyorum.','Yazılım Geliştirme',['etik','temiz-kod','iyi-pratikler','yazılım-geliştirme','programlama']],
 ['ethical-java-development','ethical-java-development-tr','tr',"Java’da Temiz Kod: Spring Boot Geliştiricileri İçin Rehber",'Spring Boot uygulamalarında okunabilir, bakımı kolay Java kodu yazmak için geliştirici empatisine ve kod kalitesine odaklanan pratikler.','Backend Geliştirme',['java','spring-boot','temiz-kod','iyi-pratikler','backend']],
 ['getting-started-with-spring-boot-3','getting-started-with-spring-boot-3-tr','tr','Spring Boot 3 ile İlk Adımlar','Spring Boot 3 özellikleriyle modern Java uygulamaları geliştirmeye giriş.','Backend Geliştirme',['java','spring-boot','backend']],
 ['spring-integration-nedir','spring-integration-en','en','Enterprise Application Integration with Spring Integration','Explore the core concepts of Spring Integration and learn how to connect enterprise applications.','Backend Development',['java','spring','spring-integration','enterprise','integration']],
 ['yapay-zeka-is-dunyasini-tehdit-ediyor-mu','ai-work-debate-en','en','Debate: Does Artificial Intelligence Threaten the World of Work?','Two perspectives on AI and employment: the concerns of skeptics and the opportunities seen by optimists.','Debate',['artificial-intelligence','work','debate','future','technology']],
 ['yapay-zekanin-gelecegi','ai-opportunities-en','en','The Two Sides of AI: Opportunities and Concerns','An exploration of the potential benefits and risks of artificial intelligence for society.','Artificial Intelligence',['artificial-intelligence','technology','future','ethics']],
];
const posts=entries.map(([source,slug,language,title,description,category,tags])=>{
 const original=matter(fs.readFileSync(`content/blog/${source}.md`,'utf8'));
 const codes=original.content.match(/```[\s\S]*?```/g)||[];
 let content=fs.readFileSync(`content/translations/${slug}.md`,'utf8').replace(/\{\{CODE(\d+)\}\}/g,(_,index)=>{
  if(!codes[index])throw Error('Missing code sample: '+slug);return codes[index];
 });
 if(content.includes('{{CODE'))throw Error('Unresolved code sample');
 fs.writeFileSync(`content/translations/${slug}.md`,content);
 return {slug,title,description,language,category,tags,content,date:new Date(original.data.date).toISOString(),published:true,featured:false};
});
fs.writeFileSync('pocketbase/pb_migrations/1791759600_post_translations.js',`// Adds missing language editions once; existing CMS records are never overwritten.\nmigrate((app) => {\n const collection = app.findCollectionByNameOrId("posts");\n const posts = ${JSON.stringify(posts,null,2)};\n for (const data of posts) {\n  const existing = app.findRecordsByFilter("posts", "slug = {:slug}", "", 1, 0, {slug:data.slug});\n  if (existing.length) continue;\n  const record = new Record(collection);\n  for (const key in data) record.set(key,data[key]);\n  app.save(record);\n }\n});\n`);
console.log('Prepared',posts.length,'translations');
