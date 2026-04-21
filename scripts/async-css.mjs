import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walk(p));
    else if (p.endsWith('.html')) out.push(p);
  }
  return out;
}

const files = walk('dist');
const linkRe = /<link rel="stylesheet" href="([^"]+\.css)">/g;

let total = 0;
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  const rewritten = html.replace(linkRe, (_m, href) =>
    `<link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" href="${href}"></noscript>`
  );
  if (rewritten !== html) {
    writeFileSync(f, rewritten);
    total++;
  }
}
console.log(`[async-css] rewrote ${total} of ${files.length} HTML files`);
