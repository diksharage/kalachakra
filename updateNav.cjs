const fs = require('fs');

let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// Ensure BackButton is imported
if (!code.includes('import BackButton from')) {
    code = code.replace("import { Search } from 'lucide-react';", "import { Search } from 'lucide-react';\nimport BackButton from '../common/BackButton';");
}

// Inject BackButton into the header row
const headerOrig = /<div className="flex flex-wrap items-center justify-between gap-4">\s*<div>\s*<p className=\{"text-xs font-bold tracking-widest uppercase mb-1 " \+ theme\.primary\}>Level \{config\.id\}<\/p>\s*<h2 className="text-xl font-serif font-bold text-content">\{config\.title\}<\/h2>\s*<\/div>/;

const headerNew = `<div className="flex flex-wrap items-center justify-between gap-4">
             <div className="flex items-center gap-4">
                <BackButton fallback="/journey" />
                <div>
                   <p className={"text-xs font-bold tracking-widest uppercase mb-1 " + theme.primary}>Level {config.id}</p>
                   <h2 className="text-xl font-serif font-bold text-content">{config.title}</h2>
                </div>
             </div>`;

code = code.replace(headerOrig, headerNew);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Added BackButton to LevelEngine header!");
