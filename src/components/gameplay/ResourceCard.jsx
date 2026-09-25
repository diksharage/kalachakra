import React, { useEffect, useState } from 'react';

const ResourceCard = ({ type, value, required, theme }) => {
  let emoji = '📦';
  let label = type;
  
  if (type === 'wood' || type === 'timber') { emoji = '🪵'; label = type; }
  else if (type === 'stone' || type === 'materials' || type === 'craftMaterials' || type === 'brick' || type === 'bricks') { emoji = '🪨'; label = type; }
  else if (type === 'plants' || type === 'food' || type === 'agriculture') { emoji = '🌾'; label = type; }
  else if (type === 'water') { emoji = '💧'; label = type; }
  else if (type === 'storage' || type === 'capacity') { emoji = '🏺'; label = type; }
  else if (type === 'tradeGoods' || type === 'cargo' || type === 'supplies') { emoji = '📦'; label = type; }
  else if (type === 'population' || type === 'community' || type === 'builder') { emoji = '👥'; label = type; }
  else if (type === 'revenue') { emoji = '💰'; label = type; }
  else if (type === 'currency' || type === 'earlyCoinage') { emoji = '🪙'; label = type === 'currency' ? 'Early Coinage' : type; }
  else if (type === 'defense') { emoji = '🛡️'; label = type; }
  else if (type === 'communication' || type === 'documentation' || type === 'stories') { emoji = '📜'; label = type; }
  else if (type === 'infrastructure' || type === 'space') { emoji = '🛣️'; label = type; }
  else if (type === 'knowledge' || type === 'learning') { emoji = '🧠'; label = type; }
  else if (type === 'time' || type === 'progress') { emoji = '⏳'; label = type; }
  else if (type === 'creative' || type === 'culture' || type === 'art') { emoji = '🎨'; label = type; }
  else if (type === 'practice' || type === 'skill' || type === 'performance') { emoji = '🎭'; label = type; }
  else if (type === 'strategy') { emoji = '♟️'; label = type; }
  else if (type === 'pieces') { emoji = '🎲'; label = type; }
  else if (type === 'preservation' || type === 'legacy') { emoji = '🏛️'; label = type; }
  else if (type === 'output') { emoji = '⚙️'; label = type; }
  
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [value]);

  // Format label nicely (camelCase to Title Case)
  const formattedLabel = label.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  
  // Calculate if we have enough
  const isNeeded = required !== undefined && required > 0;
  const isMet = isNeeded && value >= required;
  const showRequired = isNeeded ? ` / ${required}` : "";
  const statusColor = isNeeded ? (isMet ? 'text-green-400' : 'text-red-400') : (theme.primary || 'text-gold');

  return (
    <div className={`group relative text-center px-3 py-2 rounded-lg border ${theme.border || 'border-gold/30'} ${theme.surface || 'bg-main'} transition-transform ${animate ? 'scale-110 shadow-lg' : ''}`}>
      <div className="text-xl mb-1">{emoji}</div>
      <div className={`text-xs uppercase font-bold ${statusColor}`}>
        {value}{showRequired} 
        <span className="opacity-70 text-[10px] block mt-0.5 text-content">{formattedLabel}</span>
      </div>
      
      {/* Tooltip to explain where it's used */}
      {isNeeded && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 bg-surface border border-content/20 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none text-xs text-content">
          {isMet ? 'Ready to Build!' : 'Needed for upcoming objectives'}
        </div>
      )}
    </div>
  );
};

export default ResourceCard;
