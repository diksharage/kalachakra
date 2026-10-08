const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// Replace Explore (Stage 1) Popup
const exploreOld = /\{type === 'explore' && \(\s*<>\s*<div className="text-6xl mb-4 opacity-50 grayscale">\{data\.icon\}<\/div>\s*<h3 className=\{"text-2xl font-bold mb-2 uppercase " \+ theme\.primary\}>Unknown Location<\/h3>\s*<p className="text-content\/80 mb-6">Investigate this area to find clues\.<\/p>\s*<button onClick=\{\(\) => markExplored\(data\)\}/;

const exploreNew = `{type === 'explore' && (
              <>
                <div className="text-6xl mb-4 opacity-50 grayscale">{data.icon}</div>
                <h3 className={"text-2xl font-bold mb-2 uppercase " + theme.primary}>Unknown Location</h3>
                <p className="text-content/80 mb-6">Investigate this area to find clues about {config.title}.</p>
                <button onClick={() => markExplored(data)}`;
code = code.replace(exploreOld, exploreNew);

// Replace Discover (Stage 2) Popup
const discoverOldStr = `            {type === 'discover' && (
              <>
                <div className="text-6xl mb-4">{data.icon}</div>
                <h3 className={"text-2xl font-bold mb-2 uppercase " + theme.primary}>{data.label}</h3>
                <p className="text-content/80 mb-6">You uncovered something significant here!</p>
                <button onClick={() => markDiscovered(data)}`;

const discoverNewStr = `            {type === 'discover' && (
              <>
                <div className="text-6xl mb-4">{data.icon}</div>
                <h3 className={"text-2xl font-bold mb-2 uppercase " + theme.primary}>{data.label}</h3>
                <p className="text-content/90 mb-6 text-lg font-serif">
                  {data.getDiscoverMessage ? data.getDiscoverMessage(ageGroup) : (data.discoverMessage || "You uncovered something significant here!")}
                </p>
                {data.yields && Object.keys(data.yields).length > 0 && (
                  <div className="mb-6 bg-surface/40 p-3 rounded-xl border border-content/10">
                    <p className="text-xs uppercase tracking-widest font-bold opacity-70 mb-2">Rewards Earned</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {Object.entries(data.yields).map(([res, amt]) => (
                        <span key={res} className="bg-gold/10 text-gold px-3 py-1 rounded-lg border border-gold/30 font-bold text-sm">+{amt} {res}</span>
                      ))}
                    </div>
                  </div>
                )}
                <button onClick={() => markDiscovered(data)}`;

// Because regex multiline can be brittle, use split/join or indexOf
if (code.includes('You uncovered something significant here!</p>')) {
    const parts = code.split('You uncovered something significant here!</p>');
    code = parts[0] + discoverNewStr.split('You uncovered something significant here!</p>')[1] + parts[1];
}

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Updated Explore and Discover interactive popups!");
