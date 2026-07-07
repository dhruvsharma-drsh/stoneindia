const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/pages/*View.jsx');

let modifiedCount = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // 1. Add handleTouchMove
  if (content.includes('const handleLensMove = (e) => {') && !content.includes('const handleTouchMove = (e) => {')) {
    const handleLensMoveBlock = `  const handleLensMove = (e) => {
    if (!zoomRef.current) return;
    const rect = zoomRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLens({ show: true, x, y, rectW: rect.width, rectH: rect.height });
  };`;
    const handleTouchMoveBlock = `  const handleLensMove = (e) => {
    if (!zoomRef.current) return;
    const rect = zoomRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLens({ show: true, x, y, rectW: rect.width, rectH: rect.height });
  };

  const handleTouchMove = (e) => {
    if (!zoomRef.current) return;
    const rect = zoomRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    setLens({ show: true, x, y, rectW: rect.width, rectH: rect.height });
  };`;
    content = content.replace(handleLensMoveBlock, handleTouchMoveBlock);
  }

  // 2. Add Touch Events
  const mouseEvents = `            onMouseMove={handleLensMove}
            onMouseLeave={() => setLens((l) => ({ ...l, show: false }))}`;
  const touchEvents = `            onMouseMove={handleLensMove}
            onMouseLeave={() => setLens((l) => ({ ...l, show: false }))}
            onTouchMove={handleTouchMove}
            onTouchStart={(e) => {
              handleTouchMove(e);
            }}
            onTouchEnd={() => setLens((l) => ({ ...l, show: false }))}`;
  if (content.includes(mouseEvents) && !content.includes('onTouchMove={handleTouchMove}')) {
    content = content.replace(mouseEvents, touchEvents);
  }

  // 3. Instruction Text (handling variations)
  // E.g. <ZoomIn size={16} /> Move your cursor over the image
  // E.g. <ZoomIn size={16} /> Move your cursor over the stone
  const textSearch = /<div className="hidden lg:flex items-center gap-2 text-\[#B8955D\] text-sm font-medium">\s*<ZoomIn size=\{16\} \/>\s*(Move your cursor over the [a-zA-Z]+)\s*<\/div>/g;
  
  content = content.replace(textSearch, (match, p1) => {
    return `<div className="flex items-center gap-2 text-[#B8955D] text-sm font-medium">
              <ZoomIn size={16} /> <span className="hidden lg:inline">${p1}</span><span className="inline lg:hidden">Drag your finger to explore the texture</span>
            </div>`;
  });

  // 4. Lens Overlay
  const lensSearch = /className="hidden lg:block absolute pointer-events-none rounded-full border-4 border-white shadow-2xl"/g;
  const lensReplace = `className="absolute pointer-events-none rounded-full border-4 border-white shadow-2xl z-50 -translate-y-16 lg:translate-y-0"`;
  content = content.replace(lensSearch, lensReplace);

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
}

console.log(`Modified ${modifiedCount} files.`);
