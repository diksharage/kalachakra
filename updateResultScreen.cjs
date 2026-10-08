const fs = require('fs');
let code = fs.readFileSync('src/components/minigames/MiniGameManager.jsx', 'utf8');

// Update MiniGameManager signature to accept challengeData
code = code.replace(
  `const MiniGameManager = ({ gameConfig, theme, onComplete }) => {`,
  `const MiniGameManager = ({ gameConfig, challengeData, theme, onComplete }) => {`
);

// Update Result screen to show rewards
const resultBlockMatch = `<div className="bg-surface border border-content/10 p-6 rounded-2xl max-w-sm mx-auto mb-8 flex flex-col gap-4">
          <div className="flex justify-between items-center text-lg">
            <span className="text-content/60 font-bold uppercase tracking-wider text-sm">Final Score</span>
            <span className="font-bold font-mono text-2xl text-gold">{result.score}</span>
          </div>
          <div className="flex justify-between items-center text-lg pt-4 border-t border-content/10">
            <span className="text-content/60 font-bold uppercase tracking-wider text-sm">Mastery Earned</span>
            <span className="font-bold text-blue-400">+{result.score} XP</span>
          </div>
        </div>`;

const newResultBlock = `<div className="bg-surface border border-content/10 p-6 rounded-2xl max-w-sm mx-auto mb-8 flex flex-col gap-3 text-left">
          <div className="flex justify-between items-center text-lg">
            <span className="text-content/60 font-bold uppercase tracking-wider text-sm">Final Score</span>
            <span className="font-bold font-mono text-2xl text-gold">{result.score}</span>
          </div>
          
          {previousBest && (
            <div className="flex justify-between items-center text-sm pt-2">
              <span className="text-content/40 font-bold uppercase tracking-wider">Previous Best</span>
              <span className="font-bold font-mono text-content/60">{previousBest.score}</span>
            </div>
          )}

          <div className="pt-4 mt-2 border-t border-content/10 flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-content/60 font-bold uppercase tracking-wider">Mastery Earned</span>
              <span className="font-bold text-blue-400">+{result.score}</span>
            </div>
            {!isReplay && challengeData?.reward && (
              <>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-content/60 font-bold uppercase tracking-wider">XP Earned</span>
                  <span className="font-bold text-blue-400">+50 XP</span>
                </div>
                {Object.entries(challengeData.reward).map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center text-sm">
                    <span className="text-content/60 font-bold uppercase tracking-wider">{k}</span>
                    <span className="font-bold text-green-400">+{v}</span>
                  </div>
                ))}
              </>
            )}
            {isReplay && (
               <div className="text-xs text-center text-content/40 mt-2 italic">
                 Resource rewards are only granted on first completion.
               </div>
            )}
          </div>
        </div>`;

code = code.replace(resultBlockMatch, newResultBlock);
fs.writeFileSync('src/components/minigames/MiniGameManager.jsx', code);
console.log("Updated MiniGameManager result screen.");
