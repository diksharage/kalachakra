import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useGame } from '../context/GameContext';
import { inventoryItems, inventoryCategories } from '../data/inventoryItems';
import { Package, Lock, Filter } from 'lucide-react';
import { levelThemes } from '../data/levelThemes';
import { civilizationLevels } from '../data/civilizationLevels';
import { useTheme } from '../context/ThemeContext';
import BackButton from '../components/common/BackButton';

const InventoryCard = ({ item, quantity, levelThemeData }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  if (!quantity || quantity === 0) {
    return (
      <div className={`rounded-xl p-4 flex gap-4 transition-all opacity-50 grayscale border border-content/10 ${theme === 'light' ? 'bg-surface' : 'bg-surface/50'}`}>
        <div className="w-14 h-14 rounded-lg bg-main border border-content/20 flex items-center justify-center shrink-0">
          <Lock className="text-content/30" />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <h4 className="font-bold text-content">{t('inventory.unknown', 'Unknown Item')}</h4>
          <p className="text-xs text-content/60">{t('inventory.unknown_desc', 'Continue exploring to find this.')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-xl p-4 flex gap-4 transition-all shadow-md border ${levelThemeData.border} ${theme === 'light' ? levelThemeData.bg : 'bg-surface/80'}`}>
      <div className={`w-14 h-14 rounded-lg flex items-center justify-center text-3xl shrink-0 shadow-inner bg-main border border-content/10`}>
        {item.icon}
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex justify-between items-start mb-1">
          <h4 className={`font-bold ${levelThemeData.text}`}>{t(`inventory.item.${item.id}.name`, item.name || item.id)}</h4>
          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider bg-main ${levelThemeData.text}`}>
            x{quantity}
          </span>
        </div>
        <div className="text-[10px] uppercase font-bold text-content/50 mb-1 flex items-center gap-1">
          <span>{t(`inventory.cat.${item.category}`, item.category)}</span>
          <span>•</span>
          <span>Level {item.level}</span>
        </div>
        {item.isHistorical && (
          <span className="inline-block text-[9px] bg-gold/10 text-gold px-1.5 rounded uppercase tracking-wider mb-2 border border-gold/20">
            {t('inventory.historical', 'Historical Reference')}
          </span>
        )}
        <div className="flex flex-col gap-1 mt-1 text-[10px] text-content/70">
          <p><strong className="text-content/90 opacity-70">Source:</strong> {item.source}</p>
          <p><strong className="text-content/90 opacity-70">Purpose:</strong> {item.purpose}</p>
        </div>
      </div>
    </div>
  );
};

const InventoryPage = () => {
  const { t } = useLanguage();
  const { gameState } = useGame();
  const { theme } = useTheme();

  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLevel, setActiveLevel] = useState('all');

  const { inventory, legacy, unlockedArtifacts } = gameState;

  const filteredItems = useMemo(() => {
    return inventoryItems.filter(item => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const matchLevel = activeLevel === 'all' || item.level.toString() === activeLevel.toString();
      return matchCat && matchLevel;
    });
  }, [activeCategory, activeLevel]);

  const levelsOptions = [{ id: 'all', label: 'All Eras' }, ...civilizationLevels.map(l => ({ id: l.id, label: `Level ${l.id}` }))];

  const totalCollected = Object.values(inventory || {}).filter(v => v > 0).length;
  
  return (
    <div className="space-y-8 pb-20 max-w-6xl mx-auto">
      <header className="flex items-center gap-6 mb-8">
        <BackButton />
        <div className="flex-1">

        <div>
          <div className="w-14 h-14 bg-gradient-to-br from-gold to-terracotta rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-gold/20">
            <Package size={28} className="text-main" />
          </div>
          <h1 className="text-3xl font-serif font-bold gold-gradient-text mb-2">{t('inventory.title', 'My Inventory')}</h1>
          <p className="text-content/70 text-sm max-w-xl">{t('inventory.subtitle', 'Your collected resources, trade goods, and discovered heritage items across all civilizations.')}</p>
        </div>
        
        <div className={`glass-panel px-6 py-4 rounded-xl border flex gap-6 ${theme === 'light' ? 'bg-surface border-gold/30' : 'bg-surface/50 border-content/10'}`}>
          <div>
            <div className="text-[10px] font-bold text-gold uppercase tracking-wider mb-1">{t('common.legacy', 'Legacy')}</div>
            <div className="text-2xl font-bold text-content">{legacy || 0}</div>
          </div>
          <div className="w-px bg-content/10"></div>
          <div>
            <div className="text-[10px] font-bold text-gold uppercase tracking-wider mb-1">{t('inventory.collected', 'Collected Types')}</div>
            <div className="text-2xl font-bold text-content">{totalCollected}</div>
          </div>
        </div>
      
        </div>
      </header>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center bg-surface border border-content/10 p-2 rounded-xl">
        <div className="flex items-center px-4 shrink-0 text-content/50">
          <Filter size={18} />
        </div>
        
        {/* Category Tabs */}
        <div className="flex-1 overflow-x-auto no-scrollbar flex gap-2 w-full">
          <button 
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${activeCategory === 'all' ? 'bg-gold text-main' : 'hover:bg-main text-content/70'}`}
          >
            {t('common.all', 'All')}
          </button>
          {inventoryCategories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${activeCategory === cat.id ? 'bg-gold text-main' : 'hover:bg-main text-content/70'}`}
            >
              <span>{cat.icon}</span> {t(cat.labelKey, cat.labelKey.split('.').pop())}
            </button>
          ))}
        </div>
        
        {/* Level Select */}
        <select 
          value={activeLevel}
          onChange={(e) => setActiveLevel(e.target.value)}
          className="bg-main text-content border border-content/20 rounded-lg px-4 py-2 text-sm font-bold outline-none cursor-pointer hover:border-gold transition-colors shrink-0"
        >
          {levelsOptions.map(l => (
            <option key={l.id} value={l.id}>{l.label}</option>
          ))}
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredItems.map(item => {
          // If it's an artifact, quantity is based on unlockedArtifacts. If resource/trade, it's based on inventory.
          let qty = (inventory && inventory[item.id]) || 0;
          if (item.category === 'artifacts' || item.category === 'knowledge' || item.isHistorical) {
             // For purely historical items without stacked numbers, we can represent unlocked artifact status as 1 or 0
             if (unlockedArtifacts.includes(item.id)) qty = 1;
             // But if it's explicitly tracked in inventory dictionary, use that
             if (inventory && inventory[item.id]) qty = inventory[item.id];
          }

          const levelThemeData = levelThemes[item.level] || levelThemes[1];

          return (
            <InventoryCard 
              key={item.id}
              item={item}
              quantity={qty}
              levelThemeData={levelThemeData}
            />
          );
        })}
        {filteredItems.length === 0 && (
          <div className="col-span-full py-12 text-center text-content/50 border border-content/10 border-dashed rounded-2xl bg-surface/30">
            {t('inventory.no_items', 'No items found for this filter.')}
          </div>
        )}
      </div>

    </div>
  );
};

export default InventoryPage;
