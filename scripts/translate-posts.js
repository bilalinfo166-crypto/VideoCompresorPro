const fs = require('fs');
const path = require('path');

const locales = [
  "ar", "hi", "es", "pt", "fr", "de", "it", "id", "ja", 
  "ru", "zh", "tr", "vi", "ko", "th", "nl", "pl", "fa", "ro", 
  "el", "uk", "sv", "he", "da", "fi", "no", "cs", "hu"
];

const targetFilePath = path.join(__dirname, '../src/data/blog-posts.ts');
const translationsDir = path.join(__dirname, '../src/data/translations');

async function translateText(text, targetLang) {
  let lang = targetLang;
  if (targetLang === 'zh') lang = 'zh-CN';
  if (targetLang === 'tw') lang = 'zh-TW';
  
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${lang}&dt=t&q=${encodeURIComponent(text)}`;
  
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        if (res.status === 429) {
          console.warn(`Rate limit hit (429) for ${targetLang}. Waiting 5s before retry (attempt ${attempt}/5)...`);
          await new Promise(r => setTimeout(r, 5000));
          continue;
        }
        throw new Error(`HTTP error ${res.status}`);
      }
      const data = await res.json();
      return data[0].map(x => x[0]).join('');
    } catch (err) {
      if (attempt === 5) throw err;
      console.warn(`Translation attempt ${attempt} failed for lang ${targetLang}. Retrying in 2s...`);
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}

async function translateMarkdown(markdown, targetLang) {
  // 1. Extract markdown links [text](url) and replace URLs with placeholders
  const urls = [];
  let tempMarkdown = markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    urls.push(url);
    const placeholder = `__URL_${urls.length - 1}__`;
    return `[${text}](${placeholder})`;
  });

  // 2. Group paragraphs into batches of max 4000 characters
  const paragraphs = tempMarkdown.split('\n\n');
  const batches = [];
  let currentBatch = '';

  for (const para of paragraphs) {
    if ((currentBatch + '\n\n' + para).length > 4000) {
      if (currentBatch) batches.push(currentBatch);
      currentBatch = para;
    } else {
      if (currentBatch) {
        currentBatch += '\n\n' + para;
      } else {
        currentBatch = para;
      }
    }
  }
  if (currentBatch) {
    batches.push(currentBatch);
  }

  // 3. Translate each batch
  const translatedBatches = [];
  for (const batch of batches) {
    let translatedBatch = batch;
    try {
      translatedBatch = await translateText(batch, targetLang);
      await new Promise(r => setTimeout(r, 200)); // small delay
    } catch (err) {
      console.error(`Failed to translate batch of size ${batch.length} for lang ${targetLang}. Using original.`);
    }
    translatedBatches.push(translatedBatch);
  }

  let finalMarkdown = translatedBatches.join('\n\n');

  // 4. Restore URLs and clean up any spaces introduced between brackets and parentheses
  finalMarkdown = finalMarkdown.replace(/\]\s+\(\s*__url_(\d+)__\s*\)/gi, (match, id) => {
    return `](${urls[parseInt(id, 10)]})`;
  });
  finalMarkdown = finalMarkdown.replace(/\(\s*__url_(\d+)__\s*\)/gi, (match, id) => {
    return `(${urls[parseInt(id, 10)]})`;
  });

  return finalMarkdown;
}

async function run() {
  console.log('Compiling blog-posts.ts to extract posts...');
  const tsContent = fs.readFileSync(targetFilePath, 'utf8');

  // Convert TS to clean JS by removing type declarations
  const jsContent = tsContent
    .replace(/export interface Author \{[\s\S]*?\}/g, '')
    .replace(/export interface BlogPost \{[\s\S]*?\n\}/g, '')
    .replace(/: Record<string, Author>/g, '')
    .replace(/: BlogPost\[\]/g, '');

  const tempPath = path.join(__dirname, 'blog-posts.temp.js');
  fs.writeFileSync(tempPath, jsContent, 'utf8');

  let BLOG_POSTS;
  try {
    const tempModule = require(tempPath);
    BLOG_POSTS = tempModule.BLOG_POSTS;
  } catch (e) {
    console.error('Failed to load temp JS:', e);
    fs.unlinkSync(tempPath);
    process.exit(1);
  }
  fs.unlinkSync(tempPath);

  console.log(`Loaded ${BLOG_POSTS.length} posts.`);

  if (!fs.existsSync(translationsDir)) {
    fs.mkdirSync(translationsDir, { recursive: true });
  }

  for (const post of BLOG_POSTS) {
    console.log(`Processing post: "${post.slug}"...`);

    for (const locale of locales) {
      const localeDir = path.join(translationsDir, locale);
      if (!fs.existsSync(localeDir)) {
        fs.mkdirSync(localeDir, { recursive: true });
      }

      const transPath = path.join(localeDir, `${post.slug}.json`);

      // Skip if already exists
      if (fs.existsSync(transPath)) {
        continue;
      }

      console.log(`[${locale}] Translating "${post.slug}"...`);

      try {
        const title = await translateText(post.title, locale);
        const excerpt = await translateText(post.excerpt, locale);
        const metaTitle = await translateText(post.metaTitle, locale);
        const metaDesc = await translateText(post.metaDesc, locale);

        // Translate FAQs
        const faqs = [];
        for (const faq of post.faqs) {
          const q = await translateText(faq.question, locale);
          const a = await translateText(faq.answer, locale);
          faqs.push({ question: q, answer: a });
        }

        // Translate markdown content
        const content = await translateMarkdown(post.content, locale);

        const transData = {
          title,
          excerpt,
          metaTitle,
          metaDesc,
          faqs,
          content
        };

        fs.writeFileSync(transPath, JSON.stringify(transData, null, 2) + '\n', 'utf8');
        console.log(`[${locale}] Saved translation to ${locale}/${post.slug}.json`);
      } catch (err) {
        console.error(`[${locale}] Error translating post "${post.slug}":`, err);
      }
    }
  }

  console.log('SUCCESS: All blog post content translations complete!');
}

run().catch(err => {
  console.error('Fatal error running translation script:', err);
  process.exit(1);
});
