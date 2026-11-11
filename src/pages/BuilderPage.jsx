import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useGame } from '../context/GameContext';
import { getBuilderDataForLevel } from '../data/civilizationBuilder';
import { civilizationLevels } from '../data/civilizationLevels';
import {
  Hammer,
  Trash2,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Compass,
  Package,
  Droplets,
  Trees,
  Info,
  Target
} from 'lucide-react';
import BackButton from '../components/common/BackButton';

const RESOURCE_METADATA = {
  wood: { label: 'Timber & Wood', icon: '🪵', howToGet: 'Explore Forest locations in Level 1–2, complete Quests, or forage near the settlement.' },
  stone: { label: 'River Stone', icon: '🪨', howToGet: 'Gather from Riverbed / Quarry locations in Level 1–8, complete Quests, or forage locally.' },
  plants: { label: 'Wild Plants', icon: '🌿', howToGet: 'Gather from Forest locations in Level 1 or forage locally.' },
  water: { label: 'Fresh Water', icon: '💧', howToGet: 'Draw from River & Well locations in Level 1–3 or collect from River tiles.' },
  grain: { label: 'Cultivated Grain', icon: '🌾', howToGet: 'Harvest in Level 2 (Early Farming) or complete the Farming Quest.' },
  brick: { label: 'Baked Clay Bricks', icon: '🧱', howToGet: 'Earn from Indus Valley challenges/quests in Level 3 or fire clay at the settlement.' },
  textiles: { label: 'Woven Textiles', icon: '🧵', howToGet: 'Acquire from Trade Networks (Level 4) or complete the Trade Quest.' },
  iron_tool: { label: 'Iron Tools', icon: '⛏️', howToGet: 'Acquire in Level 5 (Mahajanapadas) or complete the Sixteen States Quest.' },
  punch_marked_coin: { label: 'Punch-Marked Coins', icon: '🪙', howToGet: 'Earn in Level 5 challenges or complete quests.' },
  ashokan_edict: { label: 'Ashokan Edict Copy', icon: '📜', howToGet: 'Complete the Ashokan Edict Investigation or Level 6.' },
  astronomy_tool: { label: 'Astronomy Instrument', icon: '🔭', howToGet: 'Complete the Level 7 Science Quest or Gupta challenges.' },
  gupta_manuscript: { label: 'Sanskrit Manuscript', icon: '📝', howToGet: 'Complete the Level 7 Science Quest or explore Level 7.' },
  carved_stone: { label: 'Carved Stone Block', icon: '🪨', howToGet: 'Quarried in Level 8 (Architecture) or earned from Quests.' },
  architectural_plan: { label: 'Shilpa Shastra Plan', icon: '📐', howToGet: 'Complete the Level 8 Architecture Quest.' },
  folk_instrument: { label: 'Classical Instrument', icon: '🪕', howToGet: 'Complete the Level 9 Culture Quest.' },
  naval_supplies: { label: 'Naval Timber & Sails', icon: '⛵', howToGet: 'Complete the Level 10 Chola Quest.' },
  vijayanagara_coin: { label: 'Gold Pagoda Coin', icon: '🪙', howToGet: 'Complete the Level 11 Hampi Quest.' },
  temple_carving: { label: 'Granite Relief Carving', icon: '🏛️', howToGet: 'Complete the Hampi Stone Chariot Investigation.' },
  palm_leaf_manuscript: { label: 'Palm-Leaf Manuscript', icon: '📜', howToGet: 'Complete the Level 12 Literature Quest.' },
  folk_tale: { label: 'Recorded Folk Tale', icon: '🗣️', howToGet: 'Complete the Level 12 Literature Quest.' }
};

const formatResName = (key) =>
  RESOURCE_METADATA[key]?.label || key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

const getResIcon = (key) => RESOURCE_METADATA[key]?.icon || '📦';

const BuilderPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { gameState, placeBuilding, removeBuilding, updateResources, notify } = useGame();

  const currentLevel = gameState.currentLevel || 1;
  const unlockedLevels = useMemo(() => {
    const set = new Set([...(gameState.unlockedLevels || [1]), currentLevel]);
    return Array.from(set).sort((a, b) => a - b);
  }, [gameState.unlockedLevels, currentLevel]);

  const [selectedLevel, setSelectedLevel] = useState(currentLevel);
  const builderConfig = useMemo(() => getBuilderDataForLevel(selectedLevel), [selectedLevel]);

  const [selectedBuilding, setSelectedBuilding] = useState(
    () => builderConfig.availableBuildings[0] || null
  );
  const [selectedCellIndex, setSelectedCellIndex] = useState(null);
  const [demolishMode, setDemolishMode] = useState(false);
  const [feedbackBanner, setFeedbackBanner] = useState(null);

  useEffect(() => {
    setSelectedBuilding(builderConfig.availableBuildings[0] || null);
    setSelectedCellIndex(null);
    setDemolishMode(false);
  }, [builderConfig]);

  const currentBuilt = gameState.builtEnvironment?.[selectedLevel] || [];

  const getAvailableResource = (resKey) => {
    const inInv = gameState.inventory?.[resKey] || 0;
    const inActive =
      gameState.activeLevelId === selectedLevel && gameState.activeLevelState?.resources
        ? gameState.activeLevelState.resources[resKey] || 0
        : 0;
    return inInv + inActive;
  };

  // Calculate aggregate settlement stats
  const settlementStats = useMemo(() => {
    const totals = { food: 0, community: 0, culture: 0, trade: 0, knowledge: 0 };
    currentBuilt.forEach(placed => {
      const bDef = builderConfig.availableBuildings.find(b => b.id === placed.buildingId);
      if (bDef && bDef.effects) {
        Object.entries(bDef.effects).forEach(([stat, val]) => {
          if (totals[stat] !== undefined) totals[stat] += val;
        });
      }
    });
    return totals;
  }, [currentBuilt, builderConfig]);

  // Unique resources required by buildings in this era
  const eraResourceKeys = useMemo(() => {
    const keys = new Set();
    builderConfig.availableBuildings.forEach(b => {
      Object.keys(b.requirements || {}).forEach(k => keys.add(k));
    });
    return Array.from(keys);
  }, [builderConfig]);

  const canAfford = (reqs) => {
    if (!reqs) return true;
    for (const [res, cost] of Object.entries(reqs)) {
      if (getAvailableResource(res) < cost) return false;
    }
    return true;
  };

  const getCellCoordLabel = (idx) => {
    const row = Math.floor(idx / builderConfig.gridSize);
    const col = idx % builderConfig.gridSize;
    return `${String.fromCharCode(65 + row)}${col + 1}`;
  };

  const handleConstructAtCell = (index, buildingToPlace = selectedBuilding) => {
    const isWater = builderConfig.waterTiles.includes(index);
    const cellCoord = getCellCoordLabel(index);

    if (demolishMode) {
      const existing = currentBuilt.find(b => b.gridIndex === index);
      if (existing) {
        removeBuilding(selectedLevel, index);
        setFeedbackBanner({
          type: 'info',
          text: `Cleared structure from cell ${cellCoord}.`
        });
      }
      return;
    }

    if (!buildingToPlace) {
      setFeedbackBanner({
        type: 'warning',
        text: 'Select a structure from the Build Catalog on the left first.'
      });
      return;
    }

    if (buildingToPlace.terrain === 'water' && !isWater) {
      setFeedbackBanner({
        type: 'warning',
        text: `${buildingToPlace.name} must be placed on a River / Water tile (marked with 💧).`
      });
      return;
    }

    if (buildingToPlace.terrain === 'land' && isWater) {
      setFeedbackBanner({
        type: 'warning',
        text: `${buildingToPlace.name} must be placed on a Land tile (marked with 🌿), not in the river.`
      });
      return;
    }

    if (!canAfford(buildingToPlace.requirements)) {
      const missingList = Object.entries(buildingToPlace.requirements || {})
        .filter(([r, c]) => getAvailableResource(r) < c)
        .map(([r, c]) => `${c - getAvailableResource(r)} more ${formatResName(r)}`)
        .join(', ');
      setFeedbackBanner({
        type: 'error',
        text: `Missing resources to build ${buildingToPlace.name}: need ${missingList}. Use "Forage / Gather Materials" below or explore Level ${selectedLevel}.`
      });
      return;
    }

    placeBuilding(selectedLevel, index, buildingToPlace);
    setFeedbackBanner({
      type: 'success',
      text: `Constructed ${buildingToPlace.name} on cell ${cellCoord}! (+10 Legacy XP & settlement bonuses applied)`
    });
  };

  const handleGatherMaterials = () => {
    const bundle = {};
    eraResourceKeys.forEach(k => {
      bundle[k] = 2;
    });
    if (Object.keys(bundle).length === 0) {
      bundle.wood = 2;
      bundle.stone = 2;
    }
    updateResources(bundle);
    const gainedStr = Object.entries(bundle)
      .map(([k, v]) => `+${v} ${formatResName(k)}`)
      .join(', ');
    notify('RESOURCE', 'Materials Gathered', `Collected ${gainedStr} for your settlement.`, {
      icon: '🪵'
    });
    setFeedbackBanner({
      type: 'success',
      text: `Gathered local construction materials: ${gainedStr}. Added to your Inventory!`
    });
  };

  const selectedCellIsWater =
    selectedCellIndex !== null && builderConfig.waterTiles.includes(selectedCellIndex);
  const selectedCellPlaced =
    selectedCellIndex !== null
      ? currentBuilt.find(b => b.gridIndex === selectedCellIndex)
      : null;
  const selectedCellBuildingDef = selectedCellPlaced
    ? builderConfig.availableBuildings.find(b => b.id === selectedCellPlaced.buildingId)
    : null;

  return (
    <div className="space-y-6 pb-20 max-w-6xl mx-auto p-4 md:p-6 text-[#F5F1E8] animate-fade-in">
      {/* Header & Settlement Stats */}
      <header className="bg-[#101519] border border-[#34302A] rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 shadow-xl">
        <div className="flex items-start gap-4">
          <BackButton />
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D9A441]/15 border border-[#D9A441]/30 text-[#D9A441] text-xs font-bold uppercase tracking-wider">
                <Hammer size={13} /> Level {selectedLevel}: {builderConfig.eraTitle}
              </span>
              {unlockedLevels.length > 1 && (
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(Number(e.target.value))}
                  aria-label="Select Era Settlement"
                  className="bg-[#151B20] border border-[#34302A] hover:border-[#D9A441] text-[#F5F1E8] text-xs font-bold rounded-xl px-3 py-1.5 outline-none cursor-pointer"
                >
                  {unlockedLevels.map(lvl => {
                    const lvlObj = civilizationLevels.find(l => l.id === lvl);
                    return (
                      <option key={lvl} value={lvl}>
                        Switch Era: Level {lvl} — {lvlObj?.name || `Era ${lvl}`}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#F5F1E8] mb-1">
              {t('builder.title', 'Civilization Builder')}
            </h1>
            <p className="text-[#C5C9CC] text-sm md:text-base max-w-xl">
              {builderConfig.eraSubtitle} — Select a structure on the left and click any valid terrain cell on the settlement grid to build.
            </p>
          </div>
        </div>

        {/* Settlement Stat Bonuses */}
        <div className="flex flex-wrap gap-2.5 bg-[#151B20] p-4 rounded-2xl border border-[#34302A] shrink-0">
          {[
            { key: 'food', label: 'Food', icon: '🌾' },
            { key: 'community', label: 'Community', icon: '👥' },
            { key: 'culture', label: 'Culture', icon: '🎭' },
            { key: 'trade', label: 'Trade', icon: '⚖️' },
            { key: 'knowledge', label: 'Knowledge', icon: '📜' }
          ].map(stat => (
            <div
              key={stat.key}
              className="px-3 py-2 rounded-xl bg-[#101519] border border-[#34302A] text-center min-w-[76px]"
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#C5C9CC] mb-0.5 flex items-center justify-center gap-1">
                <span>{stat.icon}</span>
                <span>{t(`builder.stat.${stat.key}`, stat.label)}</span>
              </div>
              <div className="text-lg font-bold font-serif text-[#D9A441]">
                +{settlementStats[stat.key] || 0}
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* Era Resource Inventory Bar & How to Obtain Materials */}
      <div className="bg-[#101519] border border-[#34302A] rounded-2xl p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C5C9CC] flex items-center gap-1.5 mr-1">
            <Package size={15} className="text-[#D9A441]" /> Era Construction Resources:
          </span>
          {eraResourceKeys.map(resKey => {
            const count = getAvailableResource(resKey);
            return (
              <div
                key={resKey}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-2 ${
                  count > 0
                    ? 'bg-[#151B20] border-[#D9A441]/40 text-[#F5F1E8]'
                    : 'bg-[#151B20]/60 border-[#34302A] text-[#C5C9CC]'
                }`}
              >
                <span>{getResIcon(resKey)}</span>
                <span>{formatResName(resKey)}:</span>
                <span className={count > 0 ? 'text-[#D9A441]' : 'text-amber-400'}>{count}</span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleGatherMaterials}
            className="px-4 py-2 rounded-xl bg-[#D9A441] text-[#070A0C] font-bold text-xs shadow-md hover:bg-[#D9A441]/90 transition-colors flex items-center gap-1.5"
          >
            <Sparkles size={14} /> Forage / Gather Era Materials
          </button>
          <button
            type="button"
            onClick={() => navigate(`/journey/level/${selectedLevel}/play`)}
            className="px-3.5 py-2 rounded-xl bg-[#151B20] border border-[#34302A] hover:border-[#D9A441] text-[#F5F1E8] font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <Compass size={14} className="text-[#D9A441]" /> Play Level {selectedLevel}
          </button>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedbackBanner && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between gap-3 text-sm animate-fade-in ${
            feedbackBanner.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
              : feedbackBanner.type === 'error'
              ? 'bg-red-500/10 border-red-500/40 text-red-300'
              : 'bg-[#151B20] border-[#D9A441]/40 text-[#F5F1E8]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {feedbackBanner.type === 'success' ? (
              <CheckCircle size={18} className="text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle size={18} className="text-[#D9A441] shrink-0" />
            )}
            <span>{feedbackBanner.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedbackBanner(null)}
            className="text-xs text-[#C5C9CC] hover:text-[#F5F1E8] font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Builder Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 cols): Building Catalog & Resource Guide */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex justify-between items-center bg-[#101519] border border-[#34302A] px-4 py-3 rounded-xl">
            <h2 className="font-bold font-serif text-base text-[#F5F1E8] flex items-center gap-2">
              <Hammer size={16} className="text-[#D9A441]" />
              {t('builder.available', 'Available Structures')} ({builderConfig.availableBuildings.length})
            </h2>
            <button
              type="button"
              onClick={() => {
                setDemolishMode(!demolishMode);
                if (!demolishMode) setSelectedBuilding(null);
              }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                demolishMode
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-[#151B20] text-[#C5C9CC] border-[#34302A] hover:border-red-500/50 hover:text-red-400'
              }`}
            >
              <Trash2 size={13} /> {t('builder.demolish', 'Demolish Mode')}
            </button>
          </div>

          {/* Building Cards */}
          <div className="space-y-3">
            {builderConfig.availableBuildings.map(b => {
              const affordable = canAfford(b.requirements);
              const isSelected = selectedBuilding?.id === b.id && !demolishMode;
              const reqEntries = Object.entries(b.requirements || {});
              const effectEntries = Object.entries(b.effects || {});
              const builtCount = currentBuilt.filter(cb => cb.buildingId === b.id).length;

              return (
                <div
                  key={b.id}
                  onClick={() => {
                    setDemolishMode(false);
                    setSelectedBuilding(b);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#151B20] border-[#D9A441] shadow-[0_0_20px_rgba(217,164,65,0.15)]'
                      : 'bg-[#101519] border-[#34302A] hover:border-[#D9A441]/50'
                  }`}
                >
                  <div className="flex gap-3.5 items-start">
                    <div className="w-13 h-13 min-w-[52px] min-h-[52px] rounded-xl bg-[#090C0F] border border-[#34302A] flex items-center justify-center text-3xl shrink-0">
                      {b.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-bold text-base text-[#F5F1E8]">
                          {t(b.nameKey, b.name)}
                        </h3>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0 ${
                            b.terrain === 'water'
                              ? 'bg-sky-500/15 text-sky-400 border-sky-500/30'
                              : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                          }`}
                        >
                          {b.terrain === 'water' ? '💧 Water Tile' : '🌿 Land Tile'}
                        </span>
                      </div>
                      <p className="text-xs text-[#C5C9CC] mt-1 leading-relaxed">
                        {t(b.descKey, b.description)}
                      </p>
                    </div>
                  </div>

                  {/* Requirements & Bonuses */}
                  <div className="mt-3.5 pt-3 border-t border-[#34302A] space-y-2 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[#C5C9CC] font-bold uppercase tracking-wider text-[10px]">
                        Required Resources:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {reqEntries.map(([res, cost]) => {
                          const has = getAvailableResource(res);
                          const met = has >= cost;
                          return (
                            <span
                              key={res}
                              className={`px-2 py-0.5 rounded-md font-bold border flex items-center gap-1 ${
                                met
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                  : 'bg-red-500/10 text-red-400 border-red-500/30'
                              }`}
                            >
                              <span>{getResIcon(res)}</span>
                              <span>
                                {formatResName(res)}: {has}/{cost}
                              </span>
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[#C5C9CC] font-bold uppercase tracking-wider text-[10px]">
                        Settlement Output:
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {effectEntries.map(([stat, val]) => (
                          <span
                            key={stat}
                            className="px-2 py-0.5 rounded-md bg-[#090C0F] border border-[#34302A] text-[#D9A441] font-bold capitalize"
                          >
                            +{val} {stat}
                          </span>
                        ))}
                        {builtCount > 0 && (
                          <span className="text-[11px] text-emerald-400 font-bold ml-1">
                            ({builtCount} Built)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Missing Resource Hint */}
                    {!affordable && isSelected && (
                      <div className="mt-2 p-2.5 rounded-xl bg-[#090C0F] border border-amber-500/30 text-[11px] text-[#C5C9CC] space-y-1.5">
                        <div className="font-bold text-amber-400 flex items-center gap-1.5">
                          <Info size={13} /> How to collect missing resources:
                        </div>
                        {reqEntries
                          .filter(([res, cost]) => getAvailableResource(res) < cost)
                          .map(([res]) => (
                            <p key={res} className="text-[#F5F1E8]/90">
                              • <strong>{formatResName(res)}:</strong>{' '}
                              {RESOURCE_METADATA[res]?.howToGet ||
                                'Explore locations in this era or complete Quests.'}
                            </p>
                          ))}
                        <div className="flex gap-2 pt-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleGatherMaterials();
                            }}
                            className="px-2.5 py-1 rounded-lg bg-[#D9A441] text-[#070A0C] font-bold text-[11px]"
                          >
                            Forage Materials Now
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate('/quests');
                            }}
                            className="px-2.5 py-1 rounded-lg bg-[#151B20] border border-[#34302A] text-[#D9A441] font-bold text-[11px] flex items-center gap-1"
                          >
                            <Target size={11} /> Quest Board
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (7 cols): Interactive Settlement Grid & Selected Cell Inspector */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="bg-[#101519] border border-[#34302A] rounded-2xl p-6 flex flex-col items-center justify-center relative shadow-xl">
            {/* Grid Top Status & Legend */}
            <div className="w-full flex flex-wrap items-center justify-between gap-2 mb-5 pb-3 border-b border-[#34302A]">
              <div className="text-xs font-bold text-[#F5F1E8] flex items-center gap-2">
                <span>Settlement Grid ({builderConfig.gridSize}×{builderConfig.gridSize})</span>
                <span className="text-[#C5C9CC]">•</span>
                <span className="text-[#D9A441]">{currentBuilt.length} Structures Placed</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                  <Trees size={13} /> Land Tile
                </span>
                <span className="inline-flex items-center gap-1 text-sky-400 font-semibold">
                  <Droplets size={13} /> Water Tile
                </span>
              </div>
            </div>

            {/* Active Action Prompt */}
            <div className="mb-4 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full bg-[#151B20] border border-[#34302A] text-[#D9A441]">
              {demolishMode
                ? '🗑️ Demolish Mode Active — Click any built cell to clear it'
                : selectedBuilding
                ? `🔨 Selected: ${selectedBuilding.name} (${
                    selectedBuilding.terrain === 'water' ? 'Place on 💧 Water Tile' : 'Place on 🌿 Land Tile'
                  })`
                : 'Select a structure from the left or click any cell to inspect'}
            </div>

            {/* 4x4 Interactive Grid */}
            <div
              className="grid gap-3 w-full max-w-[460px] aspect-square p-4 rounded-2xl bg-[#090C0F] border-2 border-[#34302A] shadow-inner"
              style={{
                gridTemplateColumns: `repeat(${builderConfig.gridSize}, minmax(0, 1fr))`
              }}
            >
              {Array.from({ length: builderConfig.gridSize * builderConfig.gridSize }).map(
                (_, idx) => {
                  const isWater = builderConfig.waterTiles.includes(idx);
                  const placed = currentBuilt.find(b => b.gridIndex === idx);
                  const bDef = placed
                    ? builderConfig.availableBuildings.find(b => b.id === placed.buildingId)
                    : null;
                  const coord = getCellCoordLabel(idx);
                  const isCellSelected = selectedCellIndex === idx;

                  let isCompatibleTarget = false;
                  if (selectedBuilding && !demolishMode) {
                    const terrainMatches =
                      (selectedBuilding.terrain === 'water' && isWater) ||
                      (selectedBuilding.terrain === 'land' && !isWater);
                    if (terrainMatches && canAfford(selectedBuilding.requirements)) {
                      isCompatibleTarget = true;
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedCellIndex(idx);
                        if (demolishMode || selectedBuilding) {
                          handleConstructAtCell(idx);
                        }
                      }}
                      className={`relative rounded-xl border-2 flex flex-col items-center justify-center p-2 transition-all overflow-hidden group ${
                        isWater
                          ? 'bg-sky-950/40 border-sky-500/30 hover:border-sky-400'
                          : 'bg-[#151B20] border-[#34302A] hover:border-[#D9A441]/60'
                      } ${
                        placed ? 'border-[#D9A441]/70 bg-[#151B20] shadow-md' : ''
                      } ${
                        isCellSelected ? 'ring-2 ring-[#D9A441] border-[#D9A441]' : ''
                      } ${
                        isCompatibleTarget && !placed
                          ? 'hover:bg-[#D9A441]/15 hover:scale-[1.02]'
                          : ''
                      }`}
                    >
                      {/* Coordinate Label */}
                      <span className="absolute top-1.5 left-2 text-[10px] font-mono font-bold text-[#C5C9CC]/70">
                        {coord}
                      </span>

                      {/* Terrain Badge (top-right) */}
                      <span className="absolute top-1.5 right-1.5 text-[10px]">
                        {isWater ? '💧' : '🌿'}
                      </span>

                      {bDef ? (
                        <div className="flex flex-col items-center justify-center mt-2 animate-fade-in">
                          <span className="text-3xl md:text-4xl drop-shadow-md">{bDef.icon}</span>
                          <span className="text-[10px] font-bold text-[#F5F1E8] text-center leading-tight line-clamp-1 mt-1 px-1">
                            {bDef.name.split(' ')[0]}
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center mt-2 opacity-60 group-hover:opacity-100 transition-opacity">
                          <span
                            className={`text-[11px] font-semibold ${
                              isWater ? 'text-sky-300' : 'text-[#C5C9CC]'
                            }`}
                          >
                            {isWater ? 'Water' : 'Land'}
                          </span>
                          {isCompatibleTarget && (
                            <span className="text-[10px] font-bold text-[#D9A441] mt-0.5">
                              + Build
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* Selected Cell Inspector Panel */}
          <div className="bg-[#101519] border border-[#34302A] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {selectedCellIndex !== null ? (
              <>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#151B20] border border-[#34302A] text-[#D9A441]">
                      Cell {getCellCoordLabel(selectedCellIndex)}
                    </span>
                    <span className="text-xs font-bold text-[#C5C9CC]">
                      Terrain: {selectedCellIsWater ? '💧 River / Water' : '🌿 Fertile Land'}
                    </span>
                  </div>
                  {selectedCellBuildingDef ? (
                    <p className="text-sm text-[#F5F1E8] font-medium">
                      Built Structure: <strong>{selectedCellBuildingDef.icon} {selectedCellBuildingDef.name}</strong>
                    </p>
                  ) : (
                    <p className="text-sm text-[#C5C9CC]">
                      Empty {selectedCellIsWater ? 'Water' : 'Land'} plot — ready for construction.
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {selectedCellBuildingDef && (
                    <button
                      type="button"
                      onClick={() => {
                        removeBuilding(selectedLevel, selectedCellIndex);
                        setFeedbackBanner({
                          type: 'info',
                          text: `Removed ${selectedCellBuildingDef.name} from cell ${getCellCoordLabel(
                            selectedCellIndex
                          )}.`
                        });
                      }}
                      className="px-3.5 py-2 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 hover:bg-red-500 hover:text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <Trash2 size={13} /> Clear Plot
                    </button>
                  )}
                  {selectedBuilding && !selectedCellBuildingDef && (
                    <button
                      type="button"
                      onClick={() => handleConstructAtCell(selectedCellIndex, selectedBuilding)}
                      className="px-4 py-2 rounded-xl bg-[#D9A441] text-[#070A0C] font-bold text-xs shadow-md hover:bg-[#D9A441]/90 transition-colors flex items-center gap-1.5"
                    >
                      <Hammer size={13} /> Construct {selectedBuilding.name} Here
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="text-xs text-[#C5C9CC] flex items-center gap-2">
                <Info size={15} className="text-[#D9A441] shrink-0" />
                <span>
                  Click any cell on the {builderConfig.gridSize}×{builderConfig.gridSize} grid above to construct the selected building or inspect that plot.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
