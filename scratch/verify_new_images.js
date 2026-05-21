const https = require('https');

const newUrls = [
  { label: "Discord (line 165)",    url: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&q=80&w=800&h=450" },
  { label: "Slack/Teams (line 639)", url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800&h=450" },
  { label: "4K to 1080p (line 1007)", url: "https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&q=80&w=800&h=450" },
];

newUrls.forEach(({ label, url }) => {
  https.get(url, (res) => {
    const ok = res.statusCode === 200 ? '✓ OK' : `✗ BROKEN (${res.statusCode})`;
    console.log(`${label}: ${ok}`);
  }).on('error', e => {
    console.log(`${label}: ERROR - ${e.message}`);
  });
});
