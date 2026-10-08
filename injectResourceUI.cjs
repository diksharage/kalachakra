const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// Find the Resources Available section and inject the calculation
const targetRender = `{Object.entries(resources).map(([k, v]) => (
                  <ResourceCard key={k} type={k} value={v} theme={theme} />
                ))}`;

const replacementRender = `
                {(() => {
                  const unbuilt = buildActions.filter(b => !builtItems.includes(b.id));
                  const totalReqs = {};
                  unbuilt.forEach(b => {
                    if (b.requirements) {
                      Object.entries(b.requirements).forEach(([rk, rv]) => {
                        totalReqs[rk] = (totalReqs[rk] || 0) + rv;
                      });
                    }
                  });
                  return Object.entries(resources).map(([k, v]) => (
                    <ResourceCard key={k} type={k} value={v} required={totalReqs[k]} theme={theme} />
                  ));
                })()}
`;

code = code.replace(
  /\{Object\.entries\(resources\)\.map\(\(\[k, v\]\) => \(\s*<ResourceCard key=\{k\} type=\{k\} value=\{v\} theme=\{theme\} \/>\s*\)\)\}/,
  replacementRender.trim()
);

// We should also prevent resources from going negative when consumed.
// In the confirm_build logic:
code = code.replace(
  'newResources[k] = (newResources[k] || 0) - data.requirements[k];',
  'newResources[k] = Math.max(0, (newResources[k] || 0) - data.requirements[k]);'
);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Updated LevelEngine Resource Display and Safety!");
