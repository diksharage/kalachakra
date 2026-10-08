const fs = require('fs');

let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// 1. Discoveries Reward Feedback
const discoverOrig = /const markDiscovered = \(loc\) => \{([\s\S]*?)notify\('SUCCESS', 'Artifact Discovered', 'You uncovered a piece of history.', \{ icon: '🏺' \}\);\n  \};/;
const discoverNew = `const markDiscovered = (loc) => {
    unlockArtifact(loc.id);
    const newResources = { ...resources };
    let yieldStrings = [];
    if (loc.yields) {
      Object.keys(loc.yields).forEach(k => {
        newResources[k] = (newResources[k] || 0) + loc.yields[k];
        yieldStrings.push(\`+\${loc.yields[k]} \${k}\`);
      });
      updateResources(loc.yields);
    }
    setLevelState(prev => {
      const next = { ...prev, discovery: [...prev.discovery, loc.id], resources: newResources, activePopup: null };
      next.stage = checkStageProgression(next);
      return next;
    });
    notify('SUCCESS', 'Artifact Discovered', yieldStrings.length > 0 ? \`Added to Inventory: \${yieldStrings.join(', ')}\` : 'You uncovered a piece of history.', { icon: '🏺' });
  };`;
code = code.replace(discoverOrig, discoverNew);

// 2. Build Reward Feedback
const buildOrig = /notify\('BUILD', 'Building Constructed!', `Consumed required resources.`, \{ icon: '🔨' \}\);/;
const buildNew = `let effectStrings = [];
                   if (data.effects) {
                     Object.keys(data.effects).forEach(k => effectStrings.push(\`+\${data.effects[k]} \${k.replace('_', ' ')}\`));
                   }
                   notify('BUILD', 'Building Constructed!', effectStrings.length > 0 ? \`Produced: \${effectStrings.join(', ')}\` : \`Consumed required resources.\`, { icon: '🔨' });`;
code = code.replace(buildOrig, buildNew);

// 3. Challenge Reward Feedback
const chalOrig = /notify\('SUCCESS', 'Challenge Completed!', `Rewards: \$\{rewardStrings\}`, \{ icon: '⭐' \}\);/;
const chalNew = `notify('SUCCESS', 'Challenge Completed!', \`Rewards: \${rewardStrings} (Used to Build!)\`, { icon: '⭐' });`;
code = code.replace(chalOrig, chalNew);

// 4. Level Completion Summary - Dynamic +Legacy
const completeUIOrig = /<p className="font-bold mb-2 uppercase tracking-widest text-xs opacity-60">Rewards Earned<\/p>\s*<div className="flex flex-wrap gap-2 text-sm font-bold text-gold">\s*<span className="px-2 py-1 bg-gold\/10 rounded border border-gold\/20">\+100 XP<\/span>\s*<span className="px-2 py-1 bg-gold\/10 rounded border border-gold\/20">\+Level Mastery<\/span>\s*<\/div>/;

const completeUINew = `<p className="font-bold mb-2 uppercase tracking-widest text-xs opacity-60">Rewards Earned</p>
                     <div className="flex flex-wrap gap-2 text-sm font-bold text-gold">
                        <span className="px-2 py-1 bg-gold/10 rounded border border-gold/20">+100 Legacy</span>
                        <span className="px-2 py-1 bg-gold/10 rounded border border-gold/20">+Level Mastery</span>
                     </div>`;
code = code.replace(completeUIOrig, completeUINew);


fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Injected Reward System Polish");
