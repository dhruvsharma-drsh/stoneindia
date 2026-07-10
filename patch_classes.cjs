const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('View.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(path.join(process.cwd(), 'src/pages'));
const newClass = 'className="relative w-full aspect-[3/4] mb-4 sm:mb-8 overflow-hidden bg-[#DFDDD8] border border-black/5 transition-all duration-700 ease-out"';

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  // Match any relative w-... aspect-[3/4] ... ease-out group-hover:..."
  const regex = /className="relative\s+[^"]*aspect-\[3\/4\][^"]*ease-out[^"]*"/g;
  content = content.replace(regex, newClass);
  fs.writeFileSync(f, content);
});
console.log("Updated all View.jsx files!");
