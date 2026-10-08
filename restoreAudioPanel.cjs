const fs = require('fs');
let code = fs.readFileSync('src/pages/ProfilePage.jsx', 'utf8');

// Ensure we import audio context
if (!code.includes('useAudio')) {
    code = code.replace(/import \{ useGame \} from '\.\.\/context\/GameContext';/, "import { useGame } from '../context/GameContext';\nimport { useAudio } from '../context/AudioContext';");
}
if (!code.includes('Volume2')) {
    code = code.replace(/import \{ User, Activity, Map, Trophy, Hexagon, Star, PlayCircle, BookOpen, Hammer, Search, CheckCircle \} from 'lucide-react';/, "import { User, Activity, Map, Trophy, Hexagon, Star, PlayCircle, BookOpen, Hammer, Search, CheckCircle, Volume2, VolumeX } from 'lucide-react';");
}

// Inside ProfilePage, destructure useAudio
code = code.replace(/const \{ gameState \} = useGame\(\);/, "const { gameState } = useGame();\n  const { settings: audioSettings, updateSetting, toggleMute } = useAudio();");

// Create the AudioSettings panel string
const audioPanel = `
          {/* AUDIO SETTINGS */}
          <div className="glass-panel p-6 md:p-8 rounded-2xl border border-content/10">
            <h2 className="text-xl font-serif font-bold text-content mb-6 flex items-center gap-3"><Volume2 className="text-blue-400"/> Audio Settings</h2>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="font-bold text-content mb-1">Mute All</h3>
                  <p className="text-sm text-content/60">Quickly disable all game sounds and ambience.</p>
                </div>
                <button 
                  onClick={toggleMute}
                  className={\`px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all \${audioSettings.muted ? 'bg-red-900/20 text-red-400 border border-red-500/30' : 'bg-surface border border-content/20 text-content'}\`}
                >
                  {audioSettings.muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  {audioSettings.muted ? 'Muted' : 'Unmuted'}
                </button>
              </div>

              {!audioSettings.muted && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-content/10">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-bold opacity-80">Sound Effects (UI & Feedback)</label>
                      <span className="text-xs opacity-60">{Math.round(audioSettings.sfxVolume * 100)}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="1" step="0.1" 
                      value={audioSettings.sfxVolume}
                      onChange={(e) => updateSetting('sfxVolume', parseFloat(e.target.value))}
                      className="w-full accent-gold"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-bold opacity-80">Atmospheric Ambience</label>
                      <span className="text-xs opacity-60">{Math.round(audioSettings.ambienceVolume * 100)}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="1" step="0.1" 
                      value={audioSettings.ambienceVolume}
                      onChange={(e) => updateSetting('ambienceVolume', parseFloat(e.target.value))}
                      className="w-full accent-gold"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
`;

// Inject below the Achievements panel
const targetStr = `</div>
          </div>

        </div>`;
code = code.replace(targetStr, `</div>
          </div>\n${audioPanel}
        </div>`);

fs.writeFileSync('src/pages/ProfilePage.jsx', code);
console.log("Restored Audio Settings panel to ProfilePage!");
