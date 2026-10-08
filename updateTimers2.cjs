const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

const hookStr = `
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const safeSetTimeout = (cb, ms) => { const id = setTimeout(cb, ms); timers.current.push(id); return id; };`;

code = code.replace(/const InteractiveLearnNode = \([^)]+\) => \{/, match => match + hookStr);
code = code.replace(/const MatchingGame = \([^)]+\) => \{/, match => match + hookStr);
code = code.replace(/const OrderingGame = \([^)]+\) => \{/, match => match + hookStr);
code = code.replace(/const \[lockToast, setLockToast\] = useState\(null\);/, match => match + hookStr);

// Replace all \`setTimeout(\` with \`safeSetTimeout(\` except the one INSIDE hookStr
code = code.replace(/setTimeout\(/g, 'safeSetTimeout(');
// Restore the one inside the hook
code = code.replace(/const id = safeSetTimeout\(/g, 'const id = setTimeout(');

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Injected safeSetTimeout into LevelEngine components!");
