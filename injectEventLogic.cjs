const fs = require('fs');

let code = fs.readFileSync('src/components/minigames/MiniGameManager.jsx', 'utf8');

// Update BuildFromMemory
const oldBuild = `const BuildFromMemory = ({ config, onComplete, theme, ageGroup, setProgress }) => {
  const { t } = useLanguage();
  const band = getBand(ageGroup);
  
  const initialTime = useMemo(() => {
    if (band === 'younger') return (config.memorizeTime || 5) + 5;
    if (band === 'older') return Math.max(2, (config.memorizeTime || 5) - 2);
    return config.memorizeTime || 5;
  }, [config, band]);`;

const newBuild = `const BuildFromMemory = ({ config, onComplete, theme, ageGroup, setProgress }) => {
  const { t } = useLanguage();
  const { gameState } = useGame();
  const band = getBand(ageGroup);
  
  const eventTimeBonus = useMemo(() => {
    let bonus = 0;
    if (gameState.activeLevelId === 3 && gameState.completedEvents?.['evt_l3_water']) bonus += 3;
    if (gameState.activeLevelId === 6 && gameState.completedEvents?.['evt_l6_road']) bonus += 3;
    return bonus;
  }, [gameState.activeLevelId, gameState.completedEvents]);

  const initialTime = useMemo(() => {
    let base = config.memorizeTime || 5;
    if (band === 'younger') base += 5;
    if (band === 'older') base = Math.max(2, base - 2);
    return base + eventTimeBonus;
  }, [config, band, eventTimeBonus]);`;

code = code.replace(oldBuild, newBuild);

// Also add a visual note about the bonus in the memorize UI
const oldMemoUI = `{band === 'older' && <div className="text-sm font-bold text-red-400 mb-4 flex items-center justify-center gap-2 bg-red-900/20 px-4 py-2 rounded-xl"><AlertCircle size={16}/> {t('minigame.hard_memory') || "Efficiency constraint active: Time reduced."}</div>}`;
const newMemoUI = `{band === 'older' && <div className="text-sm font-bold text-red-400 mb-4 flex items-center justify-center gap-2 bg-red-900/20 px-4 py-2 rounded-xl"><AlertCircle size={16}/> {t('minigame.hard_memory') || "Efficiency constraint active: Time reduced."}</div>}
        {eventTimeBonus > 0 && <div className="text-sm font-bold text-green-400 mb-4 flex items-center justify-center gap-2 bg-green-900/20 px-4 py-2 rounded-xl"><CheckCircle size={16}/> World Event Bonus: +{eventTimeBonus}s Memory Time!</div>}`;

code = code.replace(oldMemoUI, newMemoUI);

fs.writeFileSync('src/components/minigames/MiniGameManager.jsx', code);
console.log("Updated MiniGameManager.jsx with World Event modifiers for BuildFromMemory.");
