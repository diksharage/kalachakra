const fs = require('fs');
let code = fs.readFileSync('src/pages/LibraryPage.jsx', 'utf8');

const effectBlock = `  useEffect(() => {
    const itemParam = searchParams.get('item');
    if (itemParam) {
      const found = heritageLibrary.find(e => e.id === itemParam);
      if (found) setSelectedEntry(found);
    }
  }, [searchParams]);`;

const insertIndex = code.indexOf('const handleCloseModal = () => {');
code = code.slice(0, insertIndex) + effectBlock + '\n\n  ' + code.slice(insertIndex);

fs.writeFileSync('src/pages/LibraryPage.jsx', code);
console.log("Added useEffect for searchParams!");
