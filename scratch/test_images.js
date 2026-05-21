const https = require('https');

const urls = [
  "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800&h=450",
  "https://images.unsplash.com/photo-1614680376593-902f74fa0d41?auto=format&fit=crop&q=80&w=800&h=450",
  "https://images.unsplash.com/photo-1536240478700-b869ad10e128?auto=format&fit=crop&q=80&w=800&h=450",
  "https://images.unsplash.com/photo-1531535934202-f0d444b05fc0?auto=format&fit=crop&q=80&w=800&h=450"
];

urls.forEach(url => {
  https.get(url, (res) => {
    console.log(`URL: ${url}`);
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  }).on('error', (e) => {
    console.error(`ERROR: ${e.message}`);
  });
});
