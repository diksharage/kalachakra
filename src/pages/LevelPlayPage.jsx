import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { levelConfigs } from '../data/levelConfigs';
import { useGame } from '../context/GameContext';
import { useBackground } from '../context/BackgroundContext';
import LevelEngine from '../components/gameplay/LevelEngine';
import { AlertTriangle } from 'lucide-react';

const getLevelBackground = (levelId) => {
  if (levelId === 1) return 'prehistoric_l1.jpg';
  if (levelId === 2) return 'early_farming_l2.jpg';
  if (levelId === 3) return 'indus.jpg';
  if (levelId === 4) return 'maritime.jpg';
  if (levelId >= 5 && levelId <= 7) return 'mauryan.jpg';
  if (levelId === 8 || levelId === 10) return 'temple.jpg';
  if (levelId >= 11) return 'city.jpg';
  return 'forest.jpg';
};

const LevelPlayPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { gameState } = useGame();
  const { setBgType } = useBackground();
  
  useEffect(() => {
    setBgType('none'); // Handle background directly for cinematic immersion
  }, [setBgType]);
  
  const config = levelConfigs[id];
  const levelId = parseInt(id, 10);
  const unlockedLevels = gameState.unlockedLevels || [1];

  if (!unlockedLevels.includes(levelId)) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center bg-[#070A0C] p-4">
        <AlertTriangle className="w-14 h-14 sm:w-16 sm:h-16 text-[#D96B62] mb-4" />
        <h2 className="text-xl sm:text-2xl font-bold text-[#D96B62] mb-2">Level Locked</h2>
        <p className="text-sm sm:text-base text-[#C5C9CC] mb-6">You must complete previous levels to access this era.</p>
        <button
          type="button"
          onClick={() => navigate('/journey')}
          className="px-6 py-3 bg-[#D9A441] text-[#070A0C] font-bold rounded-xl hover:bg-[#D9A441]/90 shadow-lg transition-all"
        >
          Return to Journey
        </button>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center bg-[#070A0C] p-4">
        <AlertTriangle className="w-14 h-14 sm:w-16 sm:h-16 text-[#D9A441] mb-4" />
        <h2 className="text-xl sm:text-2xl font-bold text-[#F5F1E8] mb-2">Level {id} Under Construction</h2>
        <p className="text-sm sm:text-base text-[#C5C9CC] mb-6">This level's gameplay is being excavated by archaeologists.</p>
        <button
          type="button"
          onClick={() => navigate('/journey')}
          className="px-6 py-3 bg-[#D9A441] text-[#070A0C] font-bold rounded-xl hover:bg-[#D9A441]/90 shadow-lg transition-all"
        >
          Return to Journey
        </button>
      </div>
    );
  }

  const bgImage = getLevelBackground(levelId);

  return (
    <div 
      className="h-full min-h-0 w-full bg-[#070A0C] bg-cover bg-center bg-no-repeat relative flex flex-col overflow-hidden"
      style={{ backgroundImage: `url('${import.meta.env.BASE_URL}assets/backgrounds/${bgImage}')` }}
    >
      {/* Dark overlay for readability while keeping the cinematic atmosphere */}
      <div className="absolute inset-0 bg-[#070A0C]/80 backdrop-blur-[2px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070A0C] via-transparent to-[#070A0C]/60 pointer-events-none" />
      
      {/* Responsive Gameplay Engine Container */}
      <div className="relative z-10 w-full h-full flex flex-col max-w-[1600px] mx-auto p-2 sm:p-4 md:p-6 overflow-hidden min-h-0">
        <LevelEngine key={id} config={config} />
      </div>
    </div>
  );
};

export default LevelPlayPage;
