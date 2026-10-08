const fs = require('fs');
let content = fs.readFileSync('src/components/ui/GameBackground.jsx', 'utf8');

const newMapping = `
  const getBackgroundImage = () => {
    switch (bgType) {
      case 'level1': case 'forest':
        return "url('/kalachakra/assets/backgrounds/forest.jpg')";
      case 'level2':
        return "url('/kalachakra/assets/backgrounds/indus.jpg')";
      case 'level3': case 'level4': case 'level5': case 'mauryan':
        return "url('/kalachakra/assets/backgrounds/mauryan.jpg')";
      case 'level6': case 'level7': case 'temple':
        return "url('/kalachakra/assets/backgrounds/temple.jpg')";
      case 'level8': case 'maritime':
        return "url('/kalachakra/assets/backgrounds/maritime.jpg')";
      case 'level9': case 'level10': case 'level11': case 'city':
        return "url('/kalachakra/assets/backgrounds/city.jpg')";
      case 'dashboard': case 'map': case 'level12': case 'level13': case 'level14': case 'quests': case 'legacy': default:
        return "url('/kalachakra/assets/backgrounds/dashboard.jpg')";
    }
  };
`;

// Also, the asset paths in vite github pages (base='/kalachakra/') need to reflect the base path. Wait! In React Router, it might work with relative or absolute paths, but since we have `vite.config.js` with `base: process.env.NODE_ENV === 'production' ? '/kalachakra/' : '/'`, using `import.meta.env.BASE_URL` is best.

const betterMapping = `
  const getBackgroundImage = () => {
    const base = import.meta.env.BASE_URL || '/';
    const path = (file) => \`url('\${base}assets/backgrounds/\${file}')\`;
    switch (bgType) {
      case 'level1': case 'forest':
        return path('forest.jpg');
      case 'level2':
        return path('indus.jpg');
      case 'level3': case 'level4': case 'level5': case 'mauryan':
        return path('mauryan.jpg');
      case 'level6': case 'level7': case 'temple':
        return path('temple.jpg');
      case 'level8': case 'maritime':
        return path('maritime.jpg');
      case 'level9': case 'level10': case 'level11': case 'city':
        return path('city.jpg');
      case 'dashboard': case 'map': case 'level12': case 'level13': case 'level14': case 'quests': case 'legacy': default:
        return path('dashboard.jpg');
    }
  };
`;

content = content.replace(/const getBackgroundImage = \(\) => \{[\s\S]*?\}\s*};\n/m, betterMapping + '\n');
fs.writeFileSync('src/components/ui/GameBackground.jsx', content);
