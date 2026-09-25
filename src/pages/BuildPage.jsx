import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Pickaxe, Info } from 'lucide-react';
import { buildings } from '../data/gameData';

const BuildPage = () => {
  const { gameState, updateResources, addBuilding } = useGame();
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  
  // Filter buildings specific to the current civilization
  const availableBuildings = buildings.filter(b => b.civilization === gameState.currentCivilization || b.civilization === 'all');

  const handleBuild = () => {
    if (!selectedBuilding) return;

    if (gameState.culture >= selectedBuilding.cost.culture && gameState.knowledge >= selectedBuilding.cost.knowledge) {
      updateResources({
        culture: -selectedBuilding.cost.culture,
        knowledge: -selectedBuilding.cost.knowledge,
        legacy: selectedBuilding.reward.legacy
      });
      addBuilding(selectedBuilding.id);
      setSelectedBuilding(null);
    } else {
      alert("Not enough resources to build this structure.");
    }
  };

  return (
    <div className="space-y-8 pb-12 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-serif font-bold gold-gradient-text mb-2">Civilization Builder</h1>
        <p className="text-content/70">Use your acquired knowledge and culture to construct historical infrastructure.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1">
        {/* Building Options Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-max">
          {availableBuildings.map((building) => {
            const isBuilt = gameState.buildings.includes(building.id);
            const canAfford = gameState.culture >= building.cost.culture && gameState.knowledge >= building.cost.knowledge;
            const isSelected = selectedBuilding?.id === building.id;

            return (
              <button 
                key={building.id}
                onClick={() => !isBuilt && setSelectedBuilding(building)}
                disabled={isBuilt}
                className={`p-6 rounded-2xl text-left transition-all border-2 ${
                  isBuilt 
                    ? 'bg-main border-gold/30 opacity-60' 
                    : isSelected
                      ? 'glass-panel border-gold shadow-[0_0_20px_rgba(212,166,74,0.3)]'
                      : 'glass-panel border-transparent hover:border-gold/50'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-4xl bg-main w-14 h-14 flex items-center justify-center rounded-xl shadow-inner">
                    {building.icon}
                  </div>
                  {isBuilt && (
                    <span className="bg-gold/20 text-gold text-xs px-3 py-1 rounded-full font-bold">BUILT</span>
                  )}
                </div>
                <h3 className="font-bold text-xl mb-1 text-content">{building.name}</h3>
                
                {!isBuilt && (
                  <div className="mt-4 flex gap-4 text-sm">
                    <span className={`font-bold ${gameState.culture >= building.cost.culture ? 'text-[#C56A3D]' : 'text-red-400'}`}>
                      {building.cost.culture} Culture
                    </span>
                    <span className={`font-bold ${gameState.knowledge >= building.cost.knowledge ? 'text-gold' : 'text-red-400'}`}>
                      {building.cost.knowledge} Knowledge
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Detailed Education Panel */}
        <div className="w-full lg:w-96 glass-panel rounded-2xl border border-gold/30 p-6 flex flex-col min-h-[500px]">
          {selectedBuilding ? (
            <div className="flex flex-col h-full animate-in fade-in">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-content/10">
                <div className="text-5xl">{selectedBuilding.icon}</div>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-content">{selectedBuilding.name}</h2>
                  <p className="text-gold text-sm font-bold tracking-widest uppercase">Construction Plan</p>
                </div>
              </div>

              <div className="flex-1 space-y-6 overflow-y-auto custom-scrollbar pr-2">
                <div>
                  <h3 className="text-xs text-gold font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><Info className="w-4 h-4"/> Historical Basis</h3>
                  <p className="text-sm text-content/80 leading-relaxed bg-main/50 p-4 rounded-xl border border-content/5">
                    {selectedBuilding.historicalBasis}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs text-gold font-bold uppercase tracking-wider mb-2">Historical Function</h3>
                  <p className="text-sm text-content/80 leading-relaxed">
                    {selectedBuilding.purpose}
                  </p>
                </div>

                <div className="bg-surface/40 p-4 rounded-xl border border-gold/20">
                  <h3 className="text-xs text-gold font-bold uppercase tracking-wider mb-2">Gameplay Effect</h3>
                  <p className="text-sm text-content font-bold">{selectedBuilding.effectDescription}</p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-content/10">
                <button 
                  onClick={handleBuild}
                  className="w-full py-4 bg-gradient-to-r from-gold to-terracotta text-[#171B3A] font-bold text-lg rounded-xl shadow-lg hover:shadow-[#D4A64A]/40 transition-all flex items-center justify-center gap-3"
                >
                  <Pickaxe className="w-5 h-5" />
                  COMMENCE CONSTRUCTION
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-content/40">
              <Pickaxe className="w-16 h-16 mb-4 opacity-30" />
              <p className="max-w-[200px]">Select a blueprint to review its historical significance and commence construction.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuildPage;



