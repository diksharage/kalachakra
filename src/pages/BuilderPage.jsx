import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useGame } from '../context/GameContext';
import { useTheme } from '../context/ThemeContext';
import { getBuilderDataForLevel } from '../data/civilizationBuilder';
import { levelThemes } from '../data/levelThemes';
import { Pickaxe, Trash2, Info, ChevronRight, Map, BookOpen, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/BackButton';

const BuilderPage = () => {
  const { t } = useLanguage();
  const { gameState, placeBuilding, removeBuilding } = useGame();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const currentLevel = gameState.currentLevel || 1;
  const builderData = useMemo(() => getBuilderDataForLevel(currentLevel), [currentLevel]);
  const levelThemeData = levelThemes[currentLevel] || levelThemes.default;
  
  const [selectedCategory, setSelectedCategory] = useState(builderData.categories[0] || 'Settlement');
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [feedback, setFeedback] = useState(null); // { message, type }

  const builtEnv = (gameState.builtEnvironment && gameState.builtEnvironment[currentLevel]) || [];
  const inventory = gameState.inventory || {};

  // Clear feedback on tab switch or selection change
  useEffect(() => {
    setFeedback(null);
  }, [selectedCategory, selectedBuilding, selectedCell]);

  const totalCells = builderData.gridSize.cols * builderData.gridSize.rows;

  const handleCellClick = (idx) => {
    setSelectedCell(idx);
    const existing = builtEnv.find(b => b.gridIndex === idx);
    if (existing) {
      const bData = builderData.buildings.find(b => b.id === existing.buildingId);
      setSelectedBuilding(bData);
    } else {
      setSelectedBuilding(null);
    }
  };

  const handlePlace = () => {
    if (selectedCell === null || !selectedBuilding) return;
    
    // Validate Terrain
    const isWater = builderData.terrain?.water?.includes(selectedCell);
    if (selectedBuilding.requiresTerrain === 'water' && !isWater) {
      setFeedback({ message: t('builder.err.need_water', 'Must be placed on a water terrain.'), type: 'error' });
      return;
    }

    // Validate Resources
    const reqs = selectedBuilding.requirements || {};
    for (const [res, cost] of Object.entries(reqs)) {
      if ((inventory[res] || 0) < cost) {
        setFeedback({ message: t('builder.err.no_res', 'Insufficient resources to build this.'), type: 'error' });
        return;
      }
    }

    placeBuilding(currentLevel, selectedCell, selectedBuilding);
    setFeedback({ message: t('builder.success', 'Building completed successfully!'), type: 'success' });
    
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleRemove = () => {
    if (selectedCell === null) return;
    removeBuilding(currentLevel, selectedCell);
    setSelectedBuilding(null);
    setFeedback({ message: t('builder.removed', 'Building removed.'), type: 'info' });
    setTimeout(() => setFeedback(null), 3000);
  };

  const filteredBuildings = builderData.buildings.filter(b => b.category === selectedCategory);

  return (
    <div className="space-y-6 pb-20 max-w-6xl mx-auto">
      <header className="flex items-center gap-6 mb-8">
        <BackButton />
        <div className="flex-1">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex gap-4 items-center">
            <div className="w-14 h-14 bg-main rounded-xl flex items-center justify-center text-3xl shadow-inner border border-content/10">
              ðŸ› ï¸
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-70">
                {currentLevel === 14 ? t('builder.title_l14', 'Heritage Space Builder') : t('builder.title', 'Civilization Builder')}
              </div>
              <h1 className={`text-2xl md:text-3xl font-serif font-bold ${levelThemeData.text}`}>
                {t(`levels.${currentLevel}.title`, `Level ${currentLevel}`)}
              </h1>
            </div>
          </div>
          
          <div className="bg-main/50 px-4 py-3 rounded-lg border border-content/10 text-sm max-w-sm flex gap-3">
            <Info size={20} className="shrink-0 text-gold" />
            <p className="opacity-80 leading-snug">
              {t('builder.disclaimer', 'Simulation inspired by archaeological and historical evidence. This is a strategic representation, not an exact reconstruction.')}
            </p>
          </div>
        </div>
      
        </div>
      </header>

      {/* Main Builder Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Grid */}
        <div className="lg:col-span-8 space-y-6">
          <div className={`glass-panel p-6 rounded-2xl border ${levelThemeData.border} ${theme === 'light' ? 'bg-surface' : 'bg-surface/80'}`}>
            <h2 className="text-lg font-bold font-serif mb-4 flex justify-between items-center">
              <span>{t('builder.grid_title', 'Build Area')}</span>
              <span className="text-sm font-sans font-normal opacity-60 bg-main px-3 py-1 rounded-md border border-content/10">
                {builtEnv.length} / {totalCells} Space Used
              </span>
            </h2>
            
            {/* The CSS Grid */}
            <div 
              className="grid gap-1 md:gap-2 aspect-square max-h-[60vh] mx-auto bg-main p-2 md:p-4 rounded-xl border border-content/10"
              style={{ gridTemplateColumns: `repeat(${builderData.gridSize.cols}, minmax(0, 1fr))` }}
            >
              {Array.from({ length: totalCells }).map((_, idx) => {
                const isWater = builderData.terrain?.water?.includes(idx);
                const built = builtEnv.find(b => b.gridIndex === idx);
                const bData = built ? builderData.buildings.find(b => b.id === built.buildingId) : null;
                const isSelected = selectedCell === idx;
                
                return (
                  <button
                    key={idx}
                    onClick={() => handleCellClick(idx)}
                    className={`
                      relative rounded-lg transition-all flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl
                      ${isSelected ? 'ring-4 ring-gold ring-offset-2 ring-offset-main z-10 scale-105' : 'hover:ring-2 hover:ring-content/20 hover:scale-[1.02]'}
                      ${isWater && !built ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-surface border border-content/5'}
                      ${built ? 'shadow-inner' : ''}
                    `}
                    style={{ aspectRatio: '1/1' }}
                  >
                    {built && bData ? (
                      <span className="drop-shadow-md animate-pop-in">{bData.icon}</span>
                    ) : isWater ? (
                      <span className="opacity-20 text-blue-500 text-lg">â‰ˆ</span>
                    ) : (
                      <span className="opacity-10 text-sm font-mono">{idx}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Menu & Details */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Build Menu Categories */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {builderData.categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setSelectedBuilding(null); }}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${selectedCategory === cat ? 'bg-gold text-main shadow-md shadow-gold/20' : 'bg-surface border border-content/10 text-content/60 hover:text-content'}`}
              >
                {t(`builder.cat.${cat.toLowerCase()}`, cat)}
              </button>
            ))}
          </div>

          {/* Building Selection List */}
          <div className={`glass-panel p-4 rounded-xl border ${levelThemeData.border} bg-surface h-48 overflow-y-auto`}>
            {filteredBuildings.length === 0 ? (
              <div className="text-center text-sm opacity-50 py-8">No buildings in this category.</div>
            ) : (
              <div className="flex flex-col gap-2">
                {filteredBuildings.map(b => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBuilding(b)}
                    className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${selectedBuilding?.id === b.id ? 'bg-gold/10 border-gold' : 'bg-main border-content/10 hover:border-gold/50'}`}
                  >
                    <span className="text-2xl">{b.icon}</span>
                    <div className="flex-1">
                      <div className="font-bold text-sm">{t(b.nameKey, b.id)}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Selected Building Details */}
          {selectedBuilding && (
            <div className={`glass-panel p-6 rounded-xl border animate-slide-up ${theme === 'light' ? levelThemeData.bg : 'bg-surface border-gold/30'}`}>
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{selectedBuilding.icon}</div>
                <div>
                  <h3 className="font-bold font-serif text-lg leading-tight mb-1">{t(selectedBuilding.nameKey, selectedBuilding.id)}</h3>
                  <div className="text-xs uppercase font-bold text-content/50 bg-main px-2 py-0.5 rounded border border-content/10 inline-block">
                    {selectedBuilding.category}
                  </div>
                </div>
              </div>
              
              <p className="text-sm opacity-80 mb-6">{t(selectedBuilding.descKey, 'Description')}</p>

              {/* Requirements */}
              <div className="bg-main/50 p-3 rounded-lg border border-content/10 mb-4">
                <div className="text-xs font-bold text-content/60 uppercase mb-2">{t('builder.requirements', 'Requirements')}</div>
                {Object.keys(selectedBuilding.requirements || {}).length === 0 ? (
                  <div className="text-sm italic opacity-60">None</div>
                ) : (
                  <div className="space-y-1">
                    {Object.entries(selectedBuilding.requirements).map(([res, cost]) => {
                      const hasEnough = (inventory[res] || 0) >= cost;
                      return (
                        <div key={res} className="flex justify-between items-center text-sm">
                          <span className="capitalize">{res.replace(/_/g, ' ')}</span>
                          <span className={`font-bold ${hasEnough ? 'text-emerald-500' : 'text-red-500'}`}>
                            {cost} <span className="opacity-50 font-normal">({inventory[res] || 0})</span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Actions */}
              {selectedCell !== null && builtEnv.find(b => b.gridIndex === selectedCell)?.buildingId === selectedBuilding.id ? (
                <div className="space-y-3">
                  <div className="text-emerald-500 text-sm font-bold text-center bg-emerald-500/10 py-2 rounded-lg">
                    {t('builder.already_placed', 'Placed in Selected Cell')}
                  </div>
                  <button onClick={handleRemove} className="w-full py-3 rounded-lg font-bold border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center gap-2">
                    <Trash2 size={18} /> {t('builder.remove', 'Remove Building')}
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handlePlace}
                  disabled={selectedCell === null}
                  className="w-full py-3 rounded-lg font-bold bg-gold text-main hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Pickaxe size={18} /> {t('builder.place', 'Place Building')}
                </button>
              )}

              {/* Feedback Toast Inline */}
              {feedback && (
                <div className={`mt-4 p-3 rounded-lg text-sm font-bold flex items-center gap-2 animate-slide-up ${feedback.type === 'error' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'}`}>
                  {feedback.type === 'error' ? <AlertTriangle size={16} /> : <Pickaxe size={16} />}
                  {feedback.message}
                </div>
              )}

              {/* Historical Context Dropdown / Link */}
              <div className="mt-6 pt-4 border-t border-content/10">
                <h4 className="text-xs font-bold uppercase opacity-60 mb-2">{t('builder.historical_context', 'Historical Context')}</h4>
                <p className="text-xs opacity-80 leading-relaxed mb-3">
                  {t(selectedBuilding.historicalContextKey, 'Historically inspired simulation.')}
                </p>
                {selectedBuilding.libraryId && (
                  <button onClick={() => navigate('/library')} className="text-xs font-bold text-gold flex items-center gap-1 hover:underline">
                    <BookOpen size={12} /> {t('builder.view_library', 'View in Library')}
                  </button>
                )}
              </div>
            </div>
          )}

          {!selectedBuilding && (
            <div className={`glass-panel p-6 rounded-xl border border-dashed border-content/20 text-center opacity-60 flex flex-col items-center justify-center h-48`}>
              <Map size={32} className="mb-2 opacity-50" />
              <p className="text-sm font-medium">{t('builder.select_prompt', 'Select a cell and a building to begin construction.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;

