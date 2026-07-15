const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}
const files = [...walk('app'), ...walk('components')];
let count = 0;
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  const newLines = lines.filter(line => !line.includes('className="section__label"'));
  if (lines.length !== newLines.length) {
    fs.writeFileSync(file, newLines.join('\n'), 'utf8');
    count++;
  }
});
console.log('Modified ' + count + ' files.');
