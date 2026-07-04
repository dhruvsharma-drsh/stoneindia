const https = require('https');
const fs = require('fs');

const BASE_URL = 'https://www.stoneindia.co/blog.html/page/';
const blogs = [];

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractLinks(html) {
  const matches = [...html.matchAll(/<h2[^>]*><a[^>]*href="([^"]+)"[^>]*>(.*?)<\/a><\/h2>/g)];
  return matches.map(m => ({ url: m[1], title: m[2] }));
}

async function scrapeAll() {
  for (let i = 1; i <= 6; i++) {
    console.log(`Fetching page ${i}...`);
    try {
      const html = await fetchPage(`${BASE_URL}${i}/`);
      const links = extractLinks(html);
      
      for (const link of links) {
         console.log(`  Fetching blog: ${link.title}`);
         const blogHtml = await fetchPage(link.url);
         const contentMatch = blogHtml.match(/<div class="entry-content[^>]*>([\s\S]*?)<\/div>\s*<!-- \.entry-content -->/);
         let content = contentMatch ? contentMatch[1].trim() : '';
         // clean up content a bit, remove scripts
         content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
         blogs.push({
            title: link.title,
            slug: link.url.split('/').pop().replace('.html', ''),
            content: content
         });
      }
    } catch (e) {
      console.error(e);
    }
  }
  
  fs.writeFileSync('blogs.json', JSON.stringify(blogs, null, 2));
  console.log(`Scraped ${blogs.length} blogs!`);
}

scrapeAll();
