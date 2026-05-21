const https = require('https');

const images = [
  { line: 62,   url: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800&h=450" },
  { line: 165,  url: "https://images.unsplash.com/photo-1614680376593-902f74fa0d41?auto=format&fit=crop&q=80&w=800&h=450" },
  { line: 253,  url: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=800&h=450" },
  { line: 342,  url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800&h=450" },
  { line: 446,  url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800&h=450" },
  { line: 546,  url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800&h=450" },
  { line: 639,  url: "https://images.unsplash.com/photo-1531535934202-f0d444b05fc0?auto=format&fit=crop&q=80&w=800&h=450" },
  { line: 721,  url: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800&h=450" },
  { line: 812,  url: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800&h=450" },
  { line: 900,  url: "https://images.unsplash.com/photo-1553481187-be93c21490a9?auto=format&fit=crop&q=80&w=800&h=450" },
  { line: 1007, url: "https://images.unsplash.com/photo-1536240478700-b869ad10e128?auto=format&fit=crop&q=80&w=800&h=450" },
  { line: 1094, url: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800&h=450" },
  { line: 1190, url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800&h=450" },
  { line: 1281, url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=450" },
  { line: 1375, url: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=800&h=450" },
  { line: 1466, url: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=800&h=450" },
  { line: 1535, url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800&h=450" },
  { line: 1603, url: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&q=80&w=800&h=450" },
  { line: 1663, url: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&q=80&w=800&h=450" },
  { line: 1729, url: "https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&q=80&w=800&h=450" },
  { line: 1798, url: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&q=80&w=800&h=450" },
  { line: 1867, url: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=800&h=450" },
  { line: 1940, url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800&h=450" },
  { line: 2004, url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800&h=450" },
  { line: 2073, url: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=800&h=450" },
  { line: 2143, url: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80&w=800&h=450" },
  { line: 2217, url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800&h=450" },
  { line: 2297, url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=450" },
  { line: 2366, url: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=800&h=450" },
  { line: 2444, url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800&h=450" },
];

let pending = images.length;
const results = [];

images.forEach(({ line, url }) => {
  const req = https.get(url, (res) => {
    results.push({ line, status: res.statusCode, url });
    pending--;
    if (pending === 0) printResults();
  });
  req.on('error', (e) => {
    results.push({ line, status: 'ERROR: ' + e.message, url });
    pending--;
    if (pending === 0) printResults();
  });
  req.setTimeout(10000, () => {
    results.push({ line, status: 'TIMEOUT', url });
    req.destroy();
    pending--;
    if (pending === 0) printResults();
  });
});

function printResults() {
  results.sort((a, b) => a.line - b.line);
  console.log("\n=== IMAGE CHECK RESULTS ===");
  results.forEach(r => {
    const status = r.status === 200 ? "✓ OK" : `✗ BROKEN (${r.status})`;
    console.log(`Line ${r.line}: ${status}`);
    if (r.status !== 200) console.log(`  URL: ${r.url}`);
  });
  const broken = results.filter(r => r.status !== 200);
  console.log(`\n=== SUMMARY: ${results.length - broken.length} OK / ${broken.length} BROKEN ===`);
}
