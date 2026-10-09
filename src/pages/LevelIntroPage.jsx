import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { civilizationLevels } from '../data/civilizationLevels';
import { useGame } from '../context/GameContext';
import { useAudio } from '../context/AudioContext';
import { useBackground } from '../context/BackgroundContext';
import { PlayCircle, Map, Search, BookOpen, Target, Hammer, ArrowRight } from 'lucide-react';
import BackButton from '../components/common/BackButton';

const getLevelBackground = (levelId) => {
  if (levelId === 3) return 'indus.jpg';
  if (levelId === 4) return 'maritime.jpg';
  if (levelId >= 5 && levelId <= 7) return 'mauryan.jpg';
  if (levelId === 8 || levelId === 10) return 'temple.jpg';
  if (levelId >= 11) return 'city.jpg';
  return 'forest.jpg';
};

const StageGuide = () => (
  <div className="mb-8 w-full overflow-x-auto no-scrollbar">
    <h2 className="text-[13px] font-bold text-[#C5C9CC] mb-3 uppercase tracking-widest">Gameplay Flow</h2>
    <div className="flex items-center gap-2 min-w-[500px] bg-[#151B20]/80 p-4 rounded-xl border border-[#34302A]">
      <div className="flex flex-col items-center flex-1 text-center group">
        <Map className="text-[#D9A441] mb-2 group-hover:scale-110 transition-transform" size={20} />
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#F5F1E8]">Explore</span>
      </div>
      <ArrowRight className="text-[#34302A]" size={14} />
      <div className="flex flex-col items-center flex-1 text-center group">
        <Search className="text-[#D9A441] mb-2 group-hover:scale-110 transition-transform" size={20} />
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#F5F1E8]">Discover</span>
      </div>
      <ArrowRight className="text-[#34302A]" size={14} />
      <div className="flex flex-col items-center flex-1 text-center group">
        <BookOpen className="text-[#D9A441] mb-2 group-hover:scale-110 transition-transform" size={20} />
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#F5F1E8]">Learn</span>
      </div>
      <ArrowRight className="text-[#34302A]" size={14} />
      <div className="flex flex-col items-center flex-1 text-center group">
        <Target className="text-[#D9A441] mb-2 group-hover:scale-110 transition-transform" size={20} />
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#F5F1E8]">Solve</span>
      </div>
      <ArrowRight className="text-[#34302A]" size={14} />
      <div className="flex flex-col items-center flex-1 text-center group">
        <Hammer className="text-[#D9A441] mb-2 group-hover:scale-110 transition-transform" size={20} />
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#F5F1E8]">Build</span>
      </div>
    </div>
  </div>
);

const LevelIntroPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { gameState } = useGame();
  const { playSound } = useAudio();
  const { setBgType } = useBackground();
  
  useEffect(() => {
    setBgType('none'); // Let the page manage its own background
  }, [setBgType]);
  
  const levelId = parseInt(id, 10);
  const level = civilizationLevels.find(l => l.id === levelId);

  if (!level) {
    return (
      <div className="text-center py-20 min-h-screen bg-[#070A0C]">
        <h2 className="text-2xl text-[#D9A441]">Level not found</h2>
        <button onClick={() => navigate('/journey')} className="mt-4 text-[#F5F1E8] underline">Return to Journey</button>
      </div>
    );
  }

  const unlockedLevels = gameState.unlockedLevels || [1];
  if (!unlockedLevels.includes(levelId)) {
    return (
      <div className="min-h-screen bg-[#070A0C] flex items-center justify-center p-4">
        <div className="text-center p-12 max-w-lg w-full bg-[#101519] rounded-2xl border border-[#D96B62]/30 shadow-2xl">
          <h2 className="text-2xl font-bold text-[#D96B62] mb-4">Level Locked</h2>
          <p className="text-[#C5C9CC] mb-6">You must complete the previous levels before entering this era.</p>
          <button onClick={() => navigate('/journey')} className="px-6 py-3 bg-[#151B20] border border-[#34302A] rounded-xl hover:bg-[#1A2228] text-[#F5F1E8] transition-colors">Return to Journey</button>
        </div>
      </div>
    );
  }

  const introText = level.getIntroText ? level.getIntroText(gameState.ageGroup) : `Explore the era of ${level.title}.`;
  const isResuming = gameState.activeLevelId === level.id && gameState.activeLevelState;
  const isCompleted = gameState.completedLevels?.includes(level.id);
  const bgImage = getLevelBackground(levelId);

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative flex flex-col justify-center py-12 px-4"
      style={{ backgroundImage: `url('${import.meta.env.BASE_URL}assets/backgrounds/${bgImage}')` }}
    >
      <div className="absolute inset-0 bg-[#070A0C]/70 backdrop-blur-sm pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#070A0C] via-[#070A0C]/80 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10 animate-slide-up">
        
        <div className="mb-6 flex items-center">
          <BackButton />
        </div>
        
        <div className="bg-[#101519]/90 backdrop-blur-md rounded-3xl border border-[#34302A] overflow-hidden shadow-2xl p-8 md:p-12 relative">
          
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-9xl pointer-events-none">
            {level.icon}
          </div>
          
          <div className="relative z-10">
            <p className="text-[#D9A441] font-bold tracking-[0.2em] uppercase mb-2 text-sm">Level {level.id}</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#F5F1E8] mb-2">{level.title}</h1>
            <p className="text-[13px] font-mono text-[#C5C9CC] mb-10">{level.historicalPeriod}</p>
            
            <div className="bg-[#151B20] border border-[#34302A] p-6 rounded-2xl mb-8 max-w-3xl shadow-inner">
              <h2 className="text-[13px] uppercase tracking-widest font-bold text-[#D9A441] mb-3">Main Objective</h2>
              <p className="text-[#F5F1E8] text-base leading-relaxed">{introText}</p>
            </div>

            <h2 className="text-[13px] font-bold text-[#C5C9CC] mb-4 uppercase tracking-widest">Key Discoveries</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10 max-w-2xl">
              {level.focus.map((item, idx) => (
                <div key={idx} className="bg-[#151B20]/50 border border-[#34302A] px-4 py-3 rounded-xl flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D9A441]" />
                  <span className="text-[#F5F1E8] font-medium text-[13px]">{item}</span>
                </div>
              ))}
            </div>

            {!isResuming && <StageGuide />}

            <div className="pt-6 border-t border-[#34302A] flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => { playSound('ui'); navigate(`/journey/level/${level.id}/play`); }}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-[#D9A441] text-[#070A0C] font-bold text-[15px] uppercase tracking-widest rounded-xl hover:bg-[#D9A441]/90 hover:scale-[1.02] transition-all shadow-[0_5px_15px_rgba(217,164,65,0.2)] w-full md:w-auto"
              >
                <PlayCircle className="w-5 h-5" />
                {isResuming ? "Continue Level" : isCompleted ? "Replay Level" : "Start Level"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelIntroPage;
