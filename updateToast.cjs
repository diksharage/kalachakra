const fs = require('fs');
let content = fs.readFileSync('src/components/layout/ToastManager.jsx', 'utf8');

content = content.replace("className={`pointer-events-auto transform transition-all duration-300 animate-slide-up", "className={`pointer-events-auto transform transition-all duration-300 ${isAchievement ? 'animate-pop-in border-gold/40 shadow-[0_0_20px_rgba(212,166,74,0.3)]' : 'animate-slide-up border-content/10'}");

content = content.replace("${isAchievement ? 'border-gold/40 shadow-gold/10' : 'border-content/10 shadow-black/10'}", "");

fs.writeFileSync('src/components/layout/ToastManager.jsx', content, 'utf8');
console.log('ToastManager updated.');
