import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { civilizationLevels } from '../data/civilizationLevels';
import { useLanguage } from '../context/LanguageContext';
import { getAdaptiveText } from '../utils/ageUtils';
import { levelThemes } from '../data/levelThemes';
import { questData } from '../data/quests';
import { Lock, Unlock, CheckCircle, Star } from 'lucide-react';
import BackButton from '../components/common/BackButton';

const JourneyPage = () => {
  const { t } = useLanguage();
  const { gameState, notify } = useGame();
  const navigate = useNavigate();

  // Progress logic
  const totalLevels = civilizationLevels.length;
  const unlockedLevels = gameState.unlockedLevels || [1];
  const completedLevels = gameState.completedLevels || [];
  const currentLevel = gameState.currentLevel || 1;
  const unlockedCount = Math.min(unlockedLevels.length, totalLevels);
  const progressPercent = (unlockedCount / totalLevels) * 100;

  // Adaptive logic for descriptions
  const getLevelDescription = (level) => {
    // Basic fallback using the static description from data
    const baseDesc = level.description;

    // Simulate adaptive complexity based on age Group
    // In a full implementation, this would be defined in data per level
    if (gameState.ageGroup === '6-8' || gameState.ageGroup === '9-11') {
      return `Long ago, people lived in the time of ${t('levels.' + level.id + '.title', level.title)}. ${baseDesc.split(',')[0]}.`;
    } else if (gameState.ageGroup === '18+') {
      return `${baseDesc} Archaeological evidence from this period demonstrates complex societal structures and adaptations.`;
    }
    return baseDesc;
  };

  // Adaptive logic for focus tags based on playerType
  const getAdaptiveFocus = (level) => {
    let extraTags = [];
    if (gameState.playerType === 'Explorer') extraTags = ['Locations', 'Discovery'];
    if (gameState.playerType === 'Strategist') extraTags = ['Resources', 'Management'];
    if (gameState.playerType === 'Historian') extraTags = ['Evidence', 'Context'];
    if (gameState.playerType === 'Builder') extraTags = ['Construction', 'Development'];
    
    // Combine base focus with player specific focus (max 4 tags)
    return [...new Set([...level.focus, ...extraTags])].slice(0, 4);
  };


  return (
    <div className="space-y-8 pb-20 atmospheric-bg max-w-4xl mx-auto overflow-x-hidden">
      
      <header className="relative flex flex-col justify-center items-center gap-4 mb-16 p-10 rounded-3xl border-2 border-[#A8794F]/40 bg-gradient-to-br from-[#121714] to-[#18352B] overflow-hidden shadow-2xl">
        <div className="absolute top-6 left-6 z-20">
          <BackButton />
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNENEE2NEEiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-10 pointer-events-none animate-drift" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#C49A45]/10 rounded-full blur-3xl" />
        <div className="relative z-10 text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#E8D9B8] drop-shadow-md mb-4 uppercase tracking-widest">
            {t('nav.journey', 'The Ancient Path')}
          </h1>
          <p className="text-[#A97932] text-lg italic tracking-wider">
            Travel the timeline of civilization.
          </p>
        </div>
      </header>

      <div className="flex flex-col items-center gap-12 relative py-8 before:absolute before:inset-y-0 before:left-1/2 before:w-1 before:-translate-x-1/2 before:bg-gradient-to-b before:from-[#A8794F] before:to-[#18352B]">
        {civilizationLevels.map((level, idx) => {
          const isUnlocked = unlockedLevels.includes(level.id);
          const isCompleted = completedLevels.includes(level.id);
          const isCurrent = currentLevel === level.id;
          
          const levelThemeData = levelThemes[level.id] || levelThemes.default;
          const focusTags = getAdaptiveFocus(level);
          const desc = getLevelDescription(level);

          return (
            <div 
              key={level.id} 
              className={`relative w-full max-w-2xl flex ${idx % 2 === 0 ? 'justify-start md:pr-12' : 'justify-end md:pl-12'} items-center group`}
            >
              {/* Waypoint Dot */}
              <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 z-10 transition-all duration-300 ${isCompleted ? 'bg-[#A97932] border-[#C49A45] shadow-[0_0_15px_rgba(200,150,80,0.8)]' : isUnlocked ? 'bg-[#18352B] border-[#A8794F] animate-pulse-glow' : 'bg-[#121714] border-[#625B4A]'}`} />

              <div 
                onClick={() => {
                  if (isUnlocked) {
                      if (gameState.activeLevelId === level.id && gameState.activeLevelState) {
                         navigate(`/journey/level/${level.id}/play`);
                      } else {
                         navigate(`/journey/level/${level.id}`);
                      }
                    } else {
                      notify('ERROR', 'Level Locked', `Complete Level ${level.id - 1} to unlock this era.`);
                    }
                }}
                className={`w-full md:w-[90%] p-6 rounded-2xl shadow-xl transition-all duration-300 relative overflow-hidden border ${isUnlocked ? 'cursor-pointer hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)] border-[#A8794F]/40' : 'cursor-not-allowed border-[#625B4A]/20 opacity-70'} ${isCompleted ? 'bg-gradient-to-br from-[#211A15] to-[#18352B]' : isUnlocked ? 'bg-[#211A15]' : 'bg-[#121714]'}`}
              >
                {/* Background texture for unlocked levels */}
                {isUnlocked && <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNENEE2NEEiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-[0.03] pointer-events-none" />}
                
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div>
                    <div className="text-[#A97932] text-xs font-bold uppercase tracking-widest mb-1">Level {level.id}</div>
                    <h3 className="text-2xl font-serif font-bold text-[#E8D9B8] group-hover:text-[#C49A45] transition-colors">{t(`levels.${level.id}.title`, level.title)}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {isCompleted && <CheckCircle className="w-6 h-6 text-[#A97932]" />}
                    {!isUnlocked && (
                        <div className="flex flex-col items-end">
                          <Lock className="w-6 h-6 text-[#625B4A] mb-1" />
                          <span className="text-[10px] text-[#625B4A] uppercase font-bold tracking-widest hidden md:block">Requires Lvl {level.id - 1}</span>
                        </div>
                      )}
                    {isCurrent && !isCompleted && <Unlock className="w-6 h-6 text-[#A8794F] animate-pulse" />}
                  </div>
                </div>
                
                <p className="text-[#E8D9B8]/70 text-sm leading-relaxed mb-6 relative z-10">{desc}</p>
                
                <div className="flex flex-wrap gap-2 relative z-10">
                  {focusTags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-[#121714] border border-[#A8794F]/30 text-[#E8D9B8]/80 text-xs rounded-full uppercase tracking-wider font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {isUnlocked && (
                  <div className="mt-6 pt-4 border-t border-[#A8794F]/20 flex justify-end relative z-10">
                    <span className="text-[#C49A45] text-sm font-bold uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                      {isCompleted ? t('common.explore', 'Revisit') : t('common.continue', 'Enter Region')} <span className="text-lg"><ArrowRight className="w-5 h-5 inline ml-1" /></span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JourneyPage;
