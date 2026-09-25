import React from 'react';
import { artifacts } from '../data/artifacts';
import { useGame } from '../context/GameContext';
import { Lock } from 'lucide-react';

const ArtifactsPage = () => {
  const { gameState } = useGame();

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-serif font-bold gold-gradient-text mb-2">Artifacts Collection</h1>
        <p className="text-content/70">Relics of the past you have uncovered during your explorations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artifacts.map((artifact) => {
          const isUnlocked = gameState.unlockedArtifacts.includes(artifact.id);
          
          return (
            <div 
              key={artifact.id}
              className={`glass-panel rounded-2xl border overflow-hidden transition-all duration-300 ${
                isUnlocked ? 'border-gold/30 hover:border-gold/60 hover:-translate-y-1' : 'border-content/10 opacity-70'
              }`}
            >
              <div className={`h-40 flex items-center justify-center border-b ${
                isUnlocked ? 'bg-surface border-gold/20' : 'bg-main border-content/10'
              }`}>
                {isUnlocked ? (
                  <div className="text-6xl drop-shadow-[0_0_15px_rgba(212,166,74,0.5)]">ðŸº</div>
                ) : (
                  <Lock className="w-12 h-12 text-content/20" />
                )}
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-serif font-bold text-lg ${isUnlocked ? 'text-content' : 'text-content/40'}`}>
                    {isUnlocked ? artifact.name : 'Unknown Artifact'}
                  </h3>
                  {isUnlocked && (
                    <span className="text-xs bg-terracotta/20 text-[#C56A3D] border border-[#C56A3D]/30 px-2 py-1 rounded">
                      {artifact.rarity}
                    </span>
                  )}
                </div>
                
                {isUnlocked ? (
                  <>
                    <p className="text-xs text-gold mb-4 uppercase tracking-wider">{artifact.civilization} â€¢ {artifact.period}</p>
                    <p className="text-sm text-content/80 line-clamp-3">{artifact.story}</p>
                  </>
                ) : (
                  <p className="text-sm text-content/30 italic">Explore ancient settlements on the map to discover this artifact.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArtifactsPage;



