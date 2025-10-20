const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'src', 'pages', 'gpt-study', 'components', 'content', 'tabs', 'expanded', 'tutorial');
const pollMs = 3000;

let known = new Set();

function scan() {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('TutorialExample.jsx'));
  const populated = files.filter(f => fs.statSync(path.join(dir, f)).size > 0);
  populated.forEach(f => known.add(f));
  return { files, populated };
}

// initialize
const initial = scan();
console.log('Watching tutorial example files in:', dir);
console.log('Initially populated:', initial.populated.length ? initial.populated.join(', ') : '(none)');

setInterval(() => {
  try {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('TutorialExample.jsx'));
    files.forEach(f => {
      const p = path.join(dir, f);
      const size = fs.statSync(p).size;
      const wasKnown = known.has(f);
      const isPopulated = size > 0;
      if (!wasKnown && isPopulated) {
        known.add(f);
        console.log(`Detected new populated example: ${f} — run 'npm run check-examples' or ping me to apply mitigation B`);
      }
      if (wasKnown && !isPopulated) {
        known.delete(f);
        console.log(`Example became empty again: ${f}`);
      }
    });
  } catch (e) {
    console.error('watch-examples error', e);
  }
}, pollMs);
