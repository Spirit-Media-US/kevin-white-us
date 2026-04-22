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

// Move <link rel="stylesheet" href="/_astro/*.css"> out of <head> and into
// just before </body>. Above-fold content paints with only inline critical
// CSS; the external Tailwind chunk is non-blocking.
const linkRe = /<link rel="stylesheet" href="\/(?:_astro\/[^"]+|homepage-below)\.css">/g;

const files = walk('dist');
let rewritten = 0;
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  const matches = html.match(linkRe);
  if (!matches) continue;
  let out = html.replace(linkRe, '');
  const joined = matches.join('');
  out = out.replace('</body>', `${joined}</body>`);
  if (out !== html) {
    writeFileSync(f, out);
    rewritten++;
  }
}
console.log(`[defer-css] moved CSS link to end of body in ${rewritten} of ${files.length} files`);
