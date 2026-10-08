const fs = require('fs');
let content = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

content = content.replace(
  `                disabled={investigating === disc.id && (
      <div className="absolute left-0 bottom-0 h-1 bg-gold transition-all duration-[800ms] ease-linear w-full" style={{ width: '100%', animation: 'fillBar 0.8s linear forwards' }} />
   )}
   {isFound}`,
  `                disabled={isFound}`
);

// Now correctly place the progress bar inside the button
content = content.replace(
  /<span className={`text-3xl transition-all duration-500/,
  `{investigating === disc.id && (
      <div className="absolute left-0 bottom-0 h-1 bg-gold transition-all duration-[800ms] ease-linear w-full" style={{ width: '100%', animation: 'fillBar 0.8s linear forwards' }} />
   )}
   <span className={\`text-3xl transition-all duration-500`
);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', content);
