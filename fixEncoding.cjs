const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// Replace garbled checkmarks
code = code.replace(/o" LEVEL COMPLETE/g, "✓ LEVEL COMPLETE");
// Wait, replacing garbled bytes via regex might be tricky. Let me just replace the whole header line.
const badHeader = /<h3 className=\{"text-3xl md:text-5xl font-serif font-bold mb-2 " \+ theme\.primary\}>[^<]*LEVEL COMPLETE<\/h3>/g;
code = code.replace(badHeader, '<h3 className={"flex items-center gap-4 text-3xl md:text-5xl font-serif font-bold mb-2 " + theme.primary}><CheckCircle className="w-10 h-10" /> LEVEL COMPLETE</h3>');

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Fixed garbled characters in LevelEngine!");
