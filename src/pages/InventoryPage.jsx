import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useGame } from '../context/GameContext';
import { inventoryItems, inventoryCategories } from '../data/inventoryItems';
import { heritageLibrary } from '../data/heritageLibrary';
import { historicalLocations } from '../data/historicalLocations';
import { civilizationLevels } from '../data/civilizationLevels';
import {
  Package,
  Search,
  Sparkles,
  BookOpen,
  Compass,
  Hammer,
  Target,
  Brain,
  Library,
  Star,
  Heart,
  X
} from 'lucide-react';
import BackButton from '../components/common/BackButton';

const SYSTEM_STAT_KEYS = new Set(['xp', 'knowledge', 'culture', 'legacy', 'energy', 'coins']);

const rarityBadgeStyles = {
  common: 'text-[#C5C9CC] bg-[#151B20] border-[#34302A]',
  uncommon: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  rare: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
  epic: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
  legendary: 'text-[#D9A441] bg-[#D9A441]/15 border-[#D9A441]/50'
};

const resolveItemDefinition = (id, t, fallbackLevel = 1) => {
  const fromCatalog = inventoryItems.find(item => item.id === id);
  if (fromCatalog) {
    return {
      ...fromCatalog,
      displayName: t(`inventory.item.${id}.name`, fromCatalog.name),
      displayDesc: t(`inventory.item.${id}.desc`, fromCatalog.description)
    };
  }

  const fromLibrary = heritageLibrary.find(entry => entry.id === id);
  if (fromLibrary) {
    const mappedCategory = inventoryCategories.some(c => c.id === fromLibrary.category)
      ? fromLibrary.category
      : 'artifacts';
    return {
      id,
      category: mappedCategory,
      icon: fromLibrary.icon || '🏺',
      rarity: 'rare',
      isHistorical: true,
      level: fromLibrary.level || fallbackLevel,
      source: `${fromLibrary.region} (${fromLibrary.period})`,
      purpose: 'Documented in the Historical Evidence Codex',
      displayName: t(`library.entry.${id}.title`, id.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())),
      displayDesc: t(`library.entry.${id}.known`, 'Historical discovery recorded during exploration.')
    };
  }

  const fromMap = historicalLocations.find(loc => loc.id === id || loc.libraryId === id);
  if (fromMap) {
    return {
      id,
      category: 'artifacts',
      icon: fromMap.icon || '🗺️',
      rarity: 'uncommon',
      isHistorical: true,
      level: fromMap.level || fallbackLevel,
      source: `${fromMap.region} (${fromMap.period})`,
      purpose: 'Surveyed on the Heritage Map',
      displayName: t(`map.loc.${fromMap.id}`, fromMap.id.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())),
      displayDesc: fromMap.significance || 'Explored historical site.'
    };
  }

  const formattedName = id
    .replace(/^l\d+_/, '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());

  return {
    id,
    category: 'resources',
    icon: '📦',
    rarity: 'common',
    isHistorical: false,
    level: fallbackLevel,
    source: `Collected in Level ${fallbackLevel}`,
    purpose: 'Used for era progression and settlement building',
    displayName: formattedName,
    displayDesc: `Collected ${formattedName.toLowerCase()} during your journey.`
  };
};

const InventoryPage = () => {
  const { t } = useLanguage();
  const { gameState } = useGame();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLevel, setActiveLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const currentLevel = gameState.currentLevel || 1;

  // Build actual collected items from gameState.inventory, activeLevelState.resources, and unlockedArtifacts
  const collectedItems = useMemo(() => {
    const qtyMap = new Map();

    const inv = gameState.inventory || {};
    Object.entries(inv).forEach(([key, val]) => {
      if (SYSTEM_STAT_KEYS.has(key)) return;
      const num = Number(val) || 0;
      if (num > 0) {
        qtyMap.set(key, (qtyMap.get(key) || 0) + num);
      }
    });

    const activeRes = gameState.activeLevelState?.resources || {};
    const activeLvl = gameState.activeLevelId || currentLevel;
    Object.entries(activeRes).forEach(([key, val]) => {
      if (SYSTEM_STAT_KEYS.has(key)) return;
      const num = Number(val) || 0;
      if (num > 0 && !qtyMap.has(key)) {
        qtyMap.set(key, num);
      }
    });

    const unlocked = gameState.unlockedArtifacts || [];
    unlocked.forEach(artId => {
      if (!artId || SYSTEM_STAT_KEYS.has(artId)) return;
      if (!qtyMap.has(artId)) {
        qtyMap.set(artId, 1);
      }
    });

    const list = [];
    qtyMap.forEach((qty, id) => {
      if (qty <= 0) return;
      const def = resolveItemDefinition(id, t, activeLvl);
      list.push({
        ...def,
        qty
      });
    });

    return list.sort((a, b) => a.level - b.level || a.displayName.localeCompare(b.displayName));
  }, [
    gameState.inventory,
    gameState.activeLevelState?.resources,
    gameState.activeLevelId,
    gameState.unlockedArtifacts,
    currentLevel,
    t
  ]);

  const totalUniqueCollected = collectedItems.length;
  const totalQuantityCollected = useMemo(
    () => collectedItems.reduce((sum, item) => sum + item.qty, 0),
    [collectedItems]
  );

  const categoryCounts = useMemo(() => {
    const counts = { all: collectedItems.length };
    inventoryCategories.forEach(c => {
      counts[c.id] = collectedItems.filter(item => item.category === c.id).length;
    });
    return counts;
  }, [collectedItems]);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return collectedItems.filter(item => {
      const catMatch = activeCategory === 'all' || item.category === activeCategory;
      const lvlMatch = activeLevel === 'all' || String(item.level) === String(activeLevel);
      if (!catMatch || !lvlMatch) return false;
      if (!q) return true;
      return (
        item.displayName.toLowerCase().includes(q) ||
        item.displayDesc.toLowerCase().includes(q) ||
        (item.source || '').toLowerCase().includes(q)
      );
    });
  }, [collectedItems, activeCategory, activeLevel, searchQuery]);

  const categories = [
    { id: 'all', icon: '🎒', label: `All Collected (${categoryCounts.all})` },
    ...inventoryCategories.map(c => ({
      ...c,
      label: `${t(c.labelKey, c.label)} (${categoryCounts[c.id] || 0})`
    }))
  ];

  const levelsOptions = [
    { id: 'all', label: 'All Eras (Levels 1–14)' },
    ...civilizationLevels.map(l => ({ id: l.id, label: `Level ${l.id}: ${l.name}` }))
  ];

  return (
    <div className="space-y-6 pb-20 max-w-6xl mx-auto p-4 md:p-6 text-[#F5F1E8] animate-fade-in">
      {/* Header Banner */}
      <header className="bg-[#101519] border border-[#34302A] rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 shadow-xl">
        <div className="flex items-start gap-4">
          <BackButton />
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A441]/15 border border-[#D9A441]/30 text-[#D9A441] text-xs font-bold uppercase tracking-wider mb-3">
              <Package size={14} /> Traveler’s Vault & Satchel
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#F5F1E8] mb-2">
              {t('inventory.title', 'Inventory & Collection')}
            </h1>
            <p className="text-[#C5C9CC] text-sm md:text-base max-w-2xl">
              {t(
                'inventory.subtitle',
                'View the artifacts, construction resources, trade goods, manuscripts, and cultural items you have gathered during your journey.'
              )}
            </p>
          </div>
        </div>

        {/* Summary Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#151B20] border border-[#34302A] p-4 rounded-2xl shrink-0 w-full lg:w-auto">
          <div className="text-center px-3 py-1">
            <div className="text-xl font-serif font-bold text-[#D9A441]">{totalUniqueCollected}</div>
            <div className="text-[10px] text-[#C5C9CC] uppercase tracking-wider font-bold">
              Unique Items
            </div>
          </div>
          <div className="text-center px-3 py-1 border-l border-[#34302A]">
            <div className="text-xl font-serif font-bold text-[#F5F1E8]">{totalQuantityCollected}</div>
            <div className="text-[10px] text-[#C5C9CC] uppercase tracking-wider font-bold">
              Total Units
            </div>
          </div>
          <div className="text-center px-3 py-1 border-l border-[#34302A]">
            <div className="text-xl font-serif font-bold text-sky-400 flex items-center justify-center gap-1">
              <Brain size={15} /> {gameState.knowledge || 0}
            </div>
            <div className="text-[10px] text-[#C5C9CC] uppercase tracking-wider font-bold">
              Knowledge
            </div>
          </div>
          <div className="text-center px-3 py-1 border-l border-[#34302A]">
            <div className="text-xl font-serif font-bold text-purple-400 flex items-center justify-center gap-1">
              <Library size={15} /> {gameState.culture || 0}
            </div>
            <div className="text-[10px] text-[#C5C9CC] uppercase tracking-wider font-bold">
              Culture
            </div>
          </div>
        </div>
      </header>

      {/* Filters & Search Bar */}
      <div className="bg-[#101519] border border-[#34302A] rounded-2xl p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                  activeCategory === cat.id
                    ? 'bg-[#D9A441] text-[#070A0C] border-[#D9A441] shadow-md'
                    : 'bg-[#151B20] text-[#C5C9CC] border-[#34302A] hover:border-[#D9A441]/50 hover:text-[#F5F1E8]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Era Dropdown & Search */}
          <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
            <select
              value={activeLevel}
              onChange={(e) => setActiveLevel(e.target.value)}
              aria-label="Filter by Era"
              className="bg-[#151B20] text-[#F5F1E8] border border-[#34302A] hover:border-[#D9A441] rounded-xl px-3.5 py-2 text-xs font-bold outline-none cursor-pointer"
            >
              {levelsOptions.map(l => (
                <option key={l.id} value={l.id}>
                  {l.label}
                </option>
              ))}
            </select>

            <div className="relative">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D9A441]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter collected items..."
                className="bg-[#151B20] border border-[#34302A] focus:border-[#D9A441] rounded-xl pl-9 pr-8 py-2 text-xs text-[#F5F1E8] placeholder-[#C5C9CC]/50 outline-none w-full sm:w-52"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#C5C9CC] hover:text-[#F5F1E8]"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Collected Items or Useful Empty State */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {totalUniqueCollected === 0 ? (
            /* Empty state when player has collected nothing yet */
            <div className="bg-[#101519] border border-[#34302A] rounded-2xl p-8 md:p-10 text-center space-y-5 shadow-lg">
              <div className="w-16 h-16 rounded-2xl bg-[#151B20] border border-[#D9A441]/40 flex items-center justify-center mx-auto text-[#D9A441]">
                <Package size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-bold text-[#F5F1E8] mb-2">
                  Your Satchel is Ready for Discovery
                </h2>
                <p className="text-sm text-[#C5C9CC] max-w-lg mx-auto leading-relaxed">
                  You haven’t collected any artifacts, resources, or trade goods yet. Items appear here automatically as you explore historical locations, complete quests, and gather settlement materials.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-2xl mx-auto">
                <div className="p-4 rounded-xl bg-[#151B20] border border-[#34302A]">
                  <div className="text-xs font-bold text-[#D9A441] mb-1 flex items-center gap-1.5">
                    <Compass size={14} /> 1. Explore Levels & Map
                  </div>
                  <p className="text-xs text-[#C5C9CC]">
                    Play Level {currentLevel} or visit the Heritage Map to uncover artifacts and gather wood, stone, and water.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#151B20] border border-[#34302A]">
                  <div className="text-xs font-bold text-[#D9A441] mb-1 flex items-center gap-1.5">
                    <Target size={14} /> 2. Complete Quests
                  </div>
                  <p className="text-xs text-[#C5C9CC]">
                    Accept missions on the Quest Board or verify your knowledge to earn rare historical items.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#151B20] border border-[#34302A]">
                  <div className="text-xs font-bold text-[#D9A441] mb-1 flex items-center gap-1.5">
                    <Hammer size={14} /> 3. Forage in Builder
                  </div>
                  <p className="text-xs text-[#C5C9CC]">
                    Visit the Civilization Builder to forage era materials and construct settlement structures.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => navigate(`/journey/level/${currentLevel}/play`)}
                  className="px-5 py-2.5 rounded-xl bg-[#D9A441] text-[#070A0C] font-bold text-xs flex items-center gap-2 shadow-md hover:bg-[#D9A441]/90 transition-colors"
                >
                  <Compass size={15} /> Explore Level {currentLevel}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/explore')}
                  className="px-5 py-2.5 rounded-xl bg-[#151B20] border border-[#34302A] hover:border-[#D9A441] text-[#F5F1E8] font-bold text-xs flex items-center gap-2 transition-colors"
                >
                  Open Heritage Map
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/builder')}
                  className="px-5 py-2.5 rounded-xl bg-[#151B20] border border-[#34302A] hover:border-[#D9A441] text-[#D9A441] font-bold text-xs flex items-center gap-2 transition-colors"
                >
                  <Hammer size={15} /> Civilization Builder
                </button>
              </div>
            </div>
          ) : filteredItems.length === 0 ? (
            /* Empty state when current filter has no matches */
            <div className="bg-[#101519] border border-[#34302A] rounded-2xl p-10 text-center space-y-4">
              <Search size={36} className="text-[#D9A441]/50 mx-auto" />
              <div>
                <h3 className="text-lg font-serif font-bold text-[#F5F1E8] mb-1">
                  No collected items match this filter
                </h3>
                <p className="text-xs md:text-sm text-[#C5C9CC] max-w-md mx-auto">
                  You have {totalUniqueCollected} collected item{totalUniqueCollected === 1 ? '' : 's'} in other categories or eras. Reset the filters below or explore more eras to expand your collection.
                </p>
              </div>
              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('all');
                    setActiveLevel('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#D9A441] text-[#070A0C] font-bold text-xs"
                >
                  Show All Collected Items ({totalUniqueCollected})
                </button>
              </div>
            </div>
          ) : (
            /* Grid of Actual Collected Items */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredItems.map(item => {
                const isSelected = selectedItem?.id === item.id;
                const badgeStyle = rarityBadgeStyles[item.rarity] || rarityBadgeStyles.common;

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#151B20] border-[#D9A441] shadow-[0_0_20px_rgba(217,164,65,0.15)]'
                        : 'bg-[#101519] border-[#34302A] hover:border-[#D9A441]/60'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start gap-3 mb-3">
                        <div className="w-14 h-14 rounded-2xl bg-[#090C0F] border border-[#34302A] flex items-center justify-center text-3xl shrink-0">
                          {item.icon}
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#D9A441] text-[#070A0C] font-bold text-xs">
                            ×{item.qty}
                          </span>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeStyle}`}
                          >
                            {item.rarity}
                          </span>
                        </div>
                      </div>

                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#D9A441] mb-1">
                        Level {item.level} • {item.category}
                      </div>
                      <h3 className="text-base font-bold font-serif text-[#F5F1E8] mb-1">
                        {item.displayName}
                      </h3>
                      <p className="text-xs text-[#C5C9CC] line-clamp-2 leading-relaxed">
                        {item.displayDesc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#34302A] flex items-center justify-between text-[11px] text-[#C5C9CC]">
                      <span className="truncate max-w-[70%]">{item.source}</span>
                      <span className="text-[#D9A441] font-bold shrink-0">Inspect →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Item Inspector Panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-[#101519] border border-[#34302A] rounded-2xl p-6 shadow-xl">
            {selectedItem ? (
              <div className="space-y-5 animate-fade-in">
                <div className="flex justify-between items-start">
                  <div className="w-16 h-16 rounded-2xl bg-[#151B20] border border-[#D9A441]/40 flex items-center justify-center text-4xl shadow-inner">
                    {selectedItem.icon}
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#D9A441]/15 border border-[#D9A441]/40 text-[#D9A441] text-xs font-bold">
                      Quantity: {selectedItem.qty}
                    </span>
                    <div className="text-[11px] text-[#C5C9CC] mt-1 font-bold uppercase tracking-wider">
                      Level {selectedItem.level} • {selectedItem.rarity}
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold font-serif text-[#F5F1E8] mb-1.5">
                    {selectedItem.displayName}
                  </h2>
                  <p className="text-sm text-[#C5C9CC] leading-relaxed">
                    {selectedItem.displayDesc}
                  </p>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-[#34302A] text-xs">
                  <div className="p-3 rounded-xl bg-[#151B20] border border-[#34302A]">
                    <span className="font-bold uppercase tracking-wider text-[#D9A441] block mb-0.5">
                      {t('inventory.source', 'Historical / Gameplay Source')}
                    </span>
                    <span className="text-[#F5F1E8]">{selectedItem.source}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#151B20] border border-[#34302A]">
                    <span className="font-bold uppercase tracking-wider text-emerald-400 block mb-0.5">
                      {t('inventory.purpose', 'Use & Significance')}
                    </span>
                    <span className="text-[#F5F1E8]">{selectedItem.purpose}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  {selectedItem.category === 'resources' && (
                    <button
                      type="button"
                      onClick={() => navigate('/builder')}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#D9A441] text-[#070A0C] font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <Hammer size={14} /> Use in Civilization Builder
                    </button>
                  )}
                  {selectedItem.isHistorical && (
                    <button
                      type="button"
                      onClick={() => navigate(`/library?q=${encodeURIComponent(selectedItem.displayName)}`)}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#151B20] border border-[#D9A441]/50 hover:bg-[#D9A441]/15 text-[#D9A441] font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <BookOpen size={14} /> Read in Heritage Library
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-12 text-center space-y-3 text-[#C5C9CC]">
                <Sparkles size={32} className="mx-auto text-[#D9A441]/50" />
                <h3 className="font-serif font-bold text-base text-[#F5F1E8]">Item Inspector</h3>
                <p className="text-xs leading-relaxed max-w-xs mx-auto">
                  Select any collected item on the left to inspect its historical origin, rarity, and how it can be used in the Civilization Builder or Heritage Library.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
