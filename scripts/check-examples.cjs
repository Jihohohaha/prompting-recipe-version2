const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'src', 'pages', 'gpt-study', 'components', 'content', 'tabs', 'expanded', 'tutorial');
const files = fs.readdirSync(dir).filter(f => f.endsWith('TutorialExample.jsx'));

const results = files.map(f => {
  const p = path.join(dir, f);
  const stat = fs.statSync(p);
  const isEmpty = stat.size === 0;
  return { file: f, size: stat.size, isEmpty };
});

console.log('Recipe Example files:');
results.forEach(r => console.log(`${r.file} - ${r.isEmpty ? 'EMPTY' : 'POPULATED'} (${r.size} bytes)`));

const populated = results.filter(r => !r.isEmpty);
if (populated.length === 0) {
  console.log('\nNo populated Recipe Example files found.');
} else {
  console.log('\nPopulated examples:');
  populated.forEach(p => console.log(` - ${p.file}`));
}
