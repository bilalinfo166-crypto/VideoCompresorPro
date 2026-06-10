const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../src/locales');
const postsPath = path.join(__dirname, '../src/data/blog-posts.ts');

async function translateText(text, targetLang) {
  let lang = targetLang;
  if (targetLang === 'zh') lang = 'zh-CN';
  if (targetLang === 'tw') lang = 'zh-TW';
  
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${lang}&dt=t&q=${encodeURIComponent(text)}`;
  
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      return data[0].map(x => x[0]).join('');
    } catch (err) {
      if (attempt === 3) throw err;
      console.warn(`Translation attempt ${attempt} failed for lang ${targetLang}. Retrying in 1s...`);
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}

async function run() {
  console.log(`Loading posts from ${postsPath}...`);
  if (!fs.existsSync(postsPath)) {
    console.error('blog-posts.ts not found!');
    process.exit(1);
  }
  
  const content = fs.readFileSync(postsPath, 'utf8');
  const postChunks = content.split('slug: "');
  const posts = [];
  
  for (let i = 1; i < postChunks.length; i++) {
    const chunk = postChunks[i];
    const slugEnd = chunk.indexOf('"');
    if (slugEnd === -1) continue;
    const slug = chunk.substring(0, slugEnd);
    
    const titleLabel = 'metaTitle: "';
    const titleIdx = chunk.indexOf(titleLabel);
    if (titleIdx === -1) continue;
    const titleStart = titleIdx + titleLabel.length;
    const title = chunk.substring(titleStart, chunk.indexOf('"', titleStart));
    
    const descLabel = 'metaDesc: "';
    const descIdx = chunk.indexOf(descLabel);
    if (descIdx === -1) continue;
    const descStart = descIdx + descLabel.length;
    const desc = chunk.substring(descStart, chunk.indexOf('"', descStart));
    
    posts.push({ slug, title, desc });
  }
  
  console.log(`Found ${posts.length} posts in database.`);
  
  if (!fs.existsSync(localesDir)) {
    console.error('Locales directory not found!');
    process.exit(1);
  }
  
  const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json') && f !== 'en.json');
  console.log(`Found ${files.length} locale files to process.`);
  
  for (const file of files) {
    const filePath = path.join(localesDir, file);
    const locale = file.replace('.json', '');
    
    let localeJson;
    try {
      localeJson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (err) {
      console.error(`Error parsing ${file}:`, err);
      continue;
    }
    
    if (!localeJson.blog) {
      localeJson.blog = {};
    }
    
    let updated = false;
    for (const post of posts) {
      if (!localeJson.blog[post.slug]) {
        localeJson.blog[post.slug] = {};
      }
      
      const postTrans = localeJson.blog[post.slug];
      
      // Translate title if missing or placeholder
      if (!postTrans.title || postTrans.title.includes('blog.')) {
        console.log(`[${locale}] Translating title for "${post.slug}"...`);
        try {
          postTrans.title = await translateText(post.title, locale);
          updated = true;
          await new Promise(r => setTimeout(r, 100)); // small delay
        } catch (err) {
          console.error(`[${locale}] Failed to translate title for "${post.slug}":`, err.message);
        }
      }
      
      // Translate description if missing or placeholder
      if (!postTrans.description || postTrans.description.includes('blog.')) {
        console.log(`[${locale}] Translating description for "${post.slug}"...`);
        try {
          postTrans.description = await translateText(post.desc, locale);
          updated = true;
          await new Promise(r => setTimeout(r, 100)); // small delay
        } catch (err) {
          console.error(`[${locale}] Failed to translate description for "${post.slug}":`, err.message);
        }
      }
    }
    
    if (updated) {
      console.log(`Saving updates to ${file}...`);
      fs.writeFileSync(filePath, JSON.stringify(localeJson, null, 2) + '\n', 'utf8');
    }
  }
  
  console.log('SUCCESS: Metadata translations check complete!');
}

run().catch(err => {
  console.error('Fatal error running translation script:', err);
  process.exit(1);
});
