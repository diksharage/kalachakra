const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

code = code.replace(/const InteractiveLearnNode = \([^)]+\) => \{/, \`$&
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const safeSetTimeout = (cb, ms) => { const id = setTimeout(cb, ms); timers.current.push(id); return id; };\`);
  
code = code.replace(/const MatchingGame = \([^)]+\) => \{/, \`$&
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const safeSetTimeout = (cb, ms) => { const id = setTimeout(cb, ms); timers.current.push(id); return id; };\`);

code = code.replace(/const OrderingGame = \([^)]+\) => \{/, \`$&
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const safeSetTimeout = (cb, ms) => { const id = setTimeout(cb, ms); timers.current.push(id); return id; };\`);

// LevelEngine already has multiple refs
code = code.replace(/const \\[lockToast, setLockToast\\] = useState\\(null\\);/, \`$&
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const safeSetTimeout = (cb, ms) => { const id = setTimeout(cb, ms); timers.current.push(id); return id; };\`);

code = code.replace(/setTimeout\(/g, 'safeSetTimeout(');

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Injected safeSetTimeout into LevelEngine components!");
