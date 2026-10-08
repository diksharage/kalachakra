const fs = require('fs');

let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// 1. Update MatchingGame component to use isYoung
const matchingOrig = /const MatchingGame = \(\{ data, onComplete, theme \}\) => \{/;
const matchingNew = `const MatchingGame = ({ data, onComplete, theme, isYoung }) => {`;
code = code.replace(matchingOrig, matchingNew);

const matchingReturnOrig = /<div className="flex gap-4 w-full text-sm">/;
const matchingReturnNew = `{isYoung && <div className="text-left w-full text-xs font-bold text-blue-400 mb-3 uppercase tracking-wider animate-pulse-slow">💡 Hint: Look at the icons to figure out what goes together!</div>}\n    <div className="flex gap-4 w-full text-sm">`;
code = code.replace(matchingReturnOrig, matchingReturnNew);

// 2. Update OrderingGame component to use isYoung
const orderingOrig = /const OrderingGame = \(\{ data, onComplete, theme \}\) => \{/;
const orderingNew = `const OrderingGame = ({ data, onComplete, theme, isYoung }) => {`;
code = code.replace(orderingOrig, orderingNew);

const orderingReturnOrig = /<div className="flex flex-col gap-4 w-full">/;
const orderingReturnNew = `{isYoung && <div className="text-left w-full text-xs font-bold text-blue-400 mb-3 uppercase tracking-wider animate-pulse-slow">💡 Hint: Think about what you must do FIRST before you can do the next step!</div>}\n    <div className="flex flex-col gap-4 w-full">`;
code = code.replace(orderingReturnOrig, orderingReturnNew);

// 3. Extract ageGroup inside LevelEngine
const engTopOrig = /const \{ triggerEventAchievement \} = useAchievements\(\);/;
const engTopNew = `const { triggerEventAchievement } = useAchievements();
  const ageGroup = gameState.ageGroup || '9-11';
  const isYoung = ageGroup === '6-8' || ageGroup === '9-11';
  const isAdult = ageGroup === '18+';`;
code = code.replace(engTopOrig, engTopNew);

// 4. Pass isYoung to the games
const matchCallOrig = /<MatchingGame data=\{data\} theme=\{theme\} onComplete=\{\(success\) => handleChallengeAnswer\(data, success, isBuild\)\} \/>/;
const matchCallNew = `<MatchingGame data={data} theme={theme} isYoung={isYoung} onComplete={(success) => handleChallengeAnswer(data, success, isBuild)} />`;
code = code.replace(matchCallOrig, matchCallNew);

const orderCallOrig = /<OrderingGame data=\{data\} theme=\{theme\} onComplete=\{\(success\) => handleChallengeAnswer\(data, success, isBuild\)\} \/>/;
const orderCallNew = `<OrderingGame data={data} theme={theme} isYoung={isYoung} onComplete={(success) => handleChallengeAnswer(data, success, isBuild)} />`;
code = code.replace(orderCallOrig, orderCallNew);

// 5. Update Error popup explanation
const errPopupOrig = /\{retry\.data\.explanation\}/;
const errPopupNew = `{retry.data.getExplanation ? retry.data.getExplanation(ageGroup) : retry.data.explanation}`;
code = code.replace(errPopupOrig, errPopupNew);

// 6. Update Question string
const qPopupOrig = /\{data\.getQuestion \? data\.getQuestion\(gameState\.ageGroup\) : data\.question\}/;
const qPopupNew = `{data.getQuestion ? data.getQuestion(ageGroup) : data.question}`;
code = code.replace(qPopupOrig, qPopupNew);

// 7. Update Learn context helper
const learnPopupOrig = /<p className="text-lg text-content mb-6">\{data\.discoverMessage \|\| data\.description\}<\/p>/;
const learnPopupNew = `{isYoung && <p className="text-sm font-bold text-blue-400 mb-2 uppercase tracking-widest animate-pulse-slow">💡 Did you know?</p>}
              <p className="text-lg text-content mb-6">{data.getLearnMessage ? data.getLearnMessage(ageGroup) : (data.discoverMessage || data.description)}</p>`;
code = code.replace(learnPopupOrig, learnPopupNew);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Injected Age-based logic into LevelEngine!");
