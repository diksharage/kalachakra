const fs = require('fs');
let content = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

const getResourceHint = `
const getResourceHint = (res) => {
  const hints = {
    wood: "Explore the Forest or Woods",
    plants: "Explore the Forest or Tall Grass",
    stone: "Search the Rocky Outcrop",
    flint: "Search the Rocky Outcrop",
    water: "Visit the Water Source / River",
    meat: "Track Wild Animals",
    hide: "Track Wild Animals",
    wild_seeds: "Search Open Land / Fields",
    fertile_soil: "Search Open Land",
    clay: "Dig at the Clay Bank",
    mud: "Dig at the Clay Bank",
    mudbrick: "Craft using mud in Challenges",
    clay_pots: "Fire clay in Challenges",
    harvested_grain: "Farm wild seeds in Challenges",
    tools: "Craft using stone and wood in Challenges",
  };
  return hints[res] || "Explore the map to find this.";
};
`;

if (!content.includes('getResourceHint')) {
    content = content.replace("const LevelEngine = ({ config, onComplete, ageGroup }) => {", getResourceHint + "\nconst LevelEngine = ({ config, onComplete, ageGroup }) => {");
}

const originalReqMap = /\{Object\.entries\(reqs\)\.map\(\(\[k, v\]\) => \{[\s\S]*?return \([\s\S]*?className="flex justify-between items-center text-sm">[\s\S]*?<span className="font-bold">\{k\}<\/span>[\s\S]*?<span className=\{isMet \? "text-green-400" : "text-red-400 font-bold"\}>\{has\} \/ \{v\}<\/span>[\s\S]*?<\/div>[\s\S]*?\)\s*\}\)\}/;

const newReqMap = `{Object.entries(reqs).map(([k, v]) => {
                             const has = resources[k] || 0;
                             const isMet = has >= v;
                             return (
                               <div key={k} className="flex flex-col gap-1 text-sm border-b border-content/10 pb-2 mb-2 last:border-0 last:mb-0">
                                 <div className="flex justify-between items-center">
                                   <span className="font-bold capitalize">{k.replace(/_/g, ' ')}</span>
                                   <span className={isMet ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
                                     {has} / {v} {isMet && <CheckCircle className="inline w-4 h-4 ml-1" />}
                                   </span>
                                 </div>
                                 {!isMet && (
                                   <div className="flex justify-between items-center mt-1 bg-red-900/10 p-2 rounded border border-red-500/20">
                                      <div className="flex items-center gap-2 text-xs text-content/70">
                                        <Search className="w-3 h-3 text-gold" />
                                        <span>{getResourceHint(k)}</span>
                                      </div>
                                      <button onClick={() => setLevelState(prev => ({...prev, activePopup: null}))} className="text-xs px-2 py-1 bg-gold/20 text-gold font-bold rounded hover:bg-gold hover:text-[#171B3A] transition-colors uppercase tracking-wider">
                                        Gather
                                      </button>
                                   </div>
                                 )}
                               </div>
                             )
                           })}`;

content = content.replace(originalReqMap, newReqMap);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', content);
