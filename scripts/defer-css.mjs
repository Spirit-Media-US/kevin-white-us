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

// Move every <link rel="stylesheet" href="/_astro/..."> out of <head> and
// into the end of <body>. Above-fold content paints with only inline <head>
// styles; external CSS loads in parallel and applies once it arrives.
const linkRe = /<link rel="stylesheet" href="\/_astro\/[^"]+\.css">/g;

const files = walk('dist');
let rewritten = 0;
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  const matches = html.match(linkRe);
  if (!matches) continue;
  // Remove from original position, then insert just before </body>
  let out = html.replace(linkRe, '');
  const joined = matches.join('');
  out = out.replace('</body>', `${joined}</body>`);
  if (out !== html) {
    writeFileSync(f, out);
    rewritten++;
  }
}
console.log(`[defer-css] moved CSS link to end of body in ${rewritten} of ${files.length} files`);
