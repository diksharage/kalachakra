const fs = require('fs');
let sidebar = fs.readFileSync('src/components/layout/Sidebar.jsx', 'utf8');

sidebar = sidebar.replace(
  "{ name: 'AI Guide', path: '/ai-guide', icon: Bot },",
  "{ name: 'KALA Companion', path: '/ai-guide', icon: Bot, highlight: true },"
);

sidebar = sidebar.replace(
  "return (\n            <NavLink",
  `return (
            <NavLink`
);

// We need to inject the highlight style
sidebar = sidebar.replace(
  /className=\{\(\{\s*isActive\s*\}\) =>\s*`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 \$\{/,
  `className={({ isActive }) => \`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 \${item.highlight ? 'bg-gold/10 border border-gold/40 text-gold shadow-[0_0_15px_rgba(255,215,0,0.15)] hover:bg-gold/20' : ''} \${`
);

fs.writeFileSync('src/components/layout/Sidebar.jsx', sidebar);
