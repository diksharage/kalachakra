const fs = require('fs');

let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// Inject import if missing
if (!code.includes('artifactInvestigations')) {
    code = code.replace("import { getBuilderDataForLevel } from '../../data/civilizationBuilder';", 
    "import { getBuilderDataForLevel } from '../../data/civilizationBuilder';\nimport { artifactInvestigations } from '../../data/artifactInvestigations';\nimport { Search } from 'lucide-react';");
}

// Check if an investigation exists for this level in the component
if (!code.includes('const levelInvestigation')) {
    code = code.replace("const navigate = useNavigate();", 
    "const navigate = useNavigate();\n  const levelInvestigation = useMemo(() => artifactInvestigations.find(inv => inv.levelId === config.id), [config.id]);");
}

// In the 'discover' or 'learn' popup, if levelInvestigation exists and matches the current location (or just show it for the first one)
// We will show it in 'learn' popup as a secondary button.
const learnPopupOrig = /<button onClick=\{\(\) => markLearned\(data\)\} className=\{"px-6 py-3 font-bold rounded-xl w-full " \+ theme\.button\}>\n                  Mark as Learned\n                <\/button>\n              <\/>/;

const learnPopupNew = `<button onClick={() => markLearned(data)} className={"px-6 py-3 font-bold rounded-xl w-full " + theme.button}>
                  Mark as Learned
                </button>
                {levelInvestigation && (
                  <button onClick={() => navigate(\`/investigations/\${levelInvestigation.id}?returnTo=/journey/level/\${config.id}/play\`)} className={"mt-3 px-6 py-3 font-bold rounded-xl w-full border flex items-center justify-center gap-2 transition-all hover:scale-105 " + theme.primary + " border-current"}>
                    <Search size={18} /> Investigate Evidence
                  </button>
                )}
              </>`;

code = code.replace(learnPopupOrig, learnPopupNew);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Injected Investigation button!");
