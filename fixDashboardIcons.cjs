const fs = require('fs');

let code = fs.readFileSync('src/components/dashboard/DashboardWidgets.jsx', 'utf8');

const regexComplete = /\{isCompleted && <span[^>]*>.*?<\/span>\}/;
const regexLocked = /\{isLocked && <span[^>]*>.*?<\/span>\}/;
const regexCurrent = /\{isCurrent && <span[^>]*>.*?<\/span>\}/;

code = code.replace(regexComplete, '{isCompleted && <CheckCircle size={20} className="text-emerald-500" />}');
code = code.replace(regexLocked, '{isLocked && <Lock size={20} className="text-content/30" />}');
code = code.replace(regexCurrent, '{isCurrent && <MapPin size={20} className="animate-pulse text-gold" />}');

fs.writeFileSync('src/components/dashboard/DashboardWidgets.jsx', code);
console.log("Replaced emojis with Lucide icons in DashboardWidgets.jsx.");
