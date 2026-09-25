export const inventoryItems = [
  // LEVEL 1: Early Humans
  { id: 'wood', category: 'resources', icon: '🪵', rarity: 'common', isHistorical: false, level: 1, source: 'Foraged from forests', purpose: 'Used to build shelters and fires' },
  { id: 'stone', category: 'resources', icon: '🪨', rarity: 'common', isHistorical: false, level: 1, source: 'Gathered from riverbeds', purpose: 'Knapped into tools' },
  { id: 'hand_axe', category: 'artifacts', icon: '🪓', rarity: 'rare', isHistorical: true, level: 1, source: 'Excavated Paleolithic Site', purpose: 'Cutting and hunting' },
  
  // LEVEL 2: Early Farming
  { id: 'grain', category: 'resources', icon: '🌾', rarity: 'common', isHistorical: false, level: 2, source: 'Harvested from early farms', purpose: 'Feeding the growing community' },
  { id: 'water', category: 'resources', icon: '💧', rarity: 'common', isHistorical: false, level: 2, source: 'Drawn from rivers/wells', purpose: 'Irrigation and survival' },
  { id: 'early_pottery', category: 'artifacts', icon: '🏺', rarity: 'uncommon', isHistorical: true, level: 2, source: 'Neolithic settlements', purpose: 'Storing surplus grain safely' },

  // LEVEL 3: Indus Valley
  { id: 'harappan_bead', category: 'trade', icon: '📿', rarity: 'rare', isHistorical: true, level: 3, source: 'Carnelian workshops', purpose: 'Long-distance luxury trade' },
  { id: 'steatite_seal', category: 'artifacts', icon: '🔏', rarity: 'epic', isHistorical: true, level: 3, source: 'Mohenjo-Daro', purpose: 'Marking trade goods' },
  { id: 'standardized_weight', category: 'artifacts', icon: '⚖️', rarity: 'uncommon', isHistorical: true, level: 3, source: 'Harappan markets', purpose: 'Ensuring fair trade' },
  { id: 'brick', category: 'resources', icon: '🧱', rarity: 'common', isHistorical: false, level: 3, source: 'Baked in kilns', purpose: 'Constructing planned cities' },
  { id: 'materials', category: 'resources', icon: '📦', rarity: 'common', isHistorical: false, level: 3, source: 'Various sources', purpose: 'General construction' },
  { id: 'craftMaterials', category: 'resources', icon: '🧶', rarity: 'uncommon', isHistorical: false, level: 3, source: 'Artisan workshops', purpose: 'Crafting goods' },
  { id: 'storage', category: 'resources', icon: '🧺', rarity: 'common', isHistorical: false, level: 3, source: 'Potters', purpose: 'Holding surplus' },

  // LEVEL 4: Trade Networks
  { id: 'textiles', category: 'trade', icon: '🧵', rarity: 'uncommon', isHistorical: true, level: 4, source: 'Weaver guilds', purpose: 'Exporting via trade routes' },
  { id: 'spices', category: 'trade', icon: '🌿', rarity: 'rare', isHistorical: true, level: 4, source: 'Southern forests', purpose: 'High-value trading' },
  { id: 'maritime_cargo', category: 'trade', icon: '🚢', rarity: 'uncommon', isHistorical: false, level: 4, source: 'Coastal ports', purpose: 'Oceanic trade' },

  // LEVEL 5: Mahajanapadas
  { id: 'punch_marked_coin', category: 'trade', icon: '🪙', rarity: 'rare', isHistorical: true, level: 5, source: 'Royal mints', purpose: 'Standardizing economy' },
  { id: 'iron_tool', category: 'resources', icon: '⛏️', rarity: 'uncommon', isHistorical: true, level: 5, source: 'Iron smelters', purpose: 'Deep plowing and clearing forests' },
  
  // LEVEL 6: Mauryan Empire
  { id: 'ashokan_edict', category: 'knowledge', icon: '📜', rarity: 'epic', isHistorical: true, level: 6, source: 'Rock faces & pillars', purpose: 'Spreading Dhamma' },
  { id: 'royal_decree', category: 'knowledge', icon: '🏛️', rarity: 'rare', isHistorical: true, level: 6, source: 'Pataliputra', purpose: 'Imperial administration' },

  // LEVEL 7: Gupta Knowledge
  { id: 'gupta_manuscript', category: 'knowledge', icon: '📝', rarity: 'rare', isHistorical: true, level: 7, source: 'Universities (Nalanda)', purpose: 'Preserving math & science' },
  { id: 'astronomy_tool', category: 'artifacts', icon: '🔭', rarity: 'epic', isHistorical: true, level: 7, source: 'Observatories', purpose: 'Calculating planetary movements' },
  
  // LEVEL 8: Architecture
  { id: 'carved_stone', category: 'architecture', icon: '🪨', rarity: 'uncommon', isHistorical: true, level: 8, source: 'Quarries', purpose: 'Temple construction' },
  { id: 'architectural_plan', category: 'knowledge', icon: '📐', rarity: 'rare', isHistorical: false, level: 8, source: 'Master architects', purpose: 'Guiding vast projects' },

  // LEVEL 9: Cultural Traditions
  { id: 'bronze_statue', category: 'culture', icon: '🗽', rarity: 'rare', isHistorical: true, level: 9, source: 'Lost-wax casting', purpose: 'Religious & cultural expression' },
  { id: 'folk_instrument', category: 'culture', icon: '🪕', rarity: 'uncommon', isHistorical: true, level: 9, source: 'Village artisans', purpose: 'Passing down oral traditions' },

  // LEVEL 10: Chola & South India
  { id: 'chola_bronze', category: 'artifacts', icon: '🕺', rarity: 'epic', isHistorical: true, level: 10, source: 'Temple guilds', purpose: 'Processional worship' },
  { id: 'naval_supplies', category: 'trade', icon: '⛵', rarity: 'uncommon', isHistorical: false, level: 10, source: 'Coastal shipyards', purpose: 'Equipping maritime expeditions' },

  // LEVEL 11: Vijayanagara
  { id: 'vijayanagara_coin', category: 'trade', icon: '🪙', rarity: 'rare', isHistorical: true, level: 11, source: 'Imperial mint', purpose: 'Fueling a massive market economy' },
  { id: 'temple_carving', category: 'architecture', icon: '🏛️', rarity: 'epic', isHistorical: true, level: 11, source: 'Hampi ruins', purpose: 'Showcasing artistic zenith' },

  // LEVEL 12: Literature & Stories
  { id: 'palm_leaf_manuscript', category: 'knowledge', icon: '📜', rarity: 'rare', isHistorical: true, level: 12, source: 'Ancient libraries', purpose: 'Preserving epics and poetry' },
  { id: 'folk_tale', category: 'culture', icon: '🗣️', rarity: 'uncommon', isHistorical: false, level: 12, source: 'Oral traditions', purpose: 'Teaching moral lessons' },

  // LEVEL 13: Traditional Games
  { id: 'pachisi_board', category: 'games', icon: '🎲', rarity: 'rare', isHistorical: true, level: 13, source: 'Royal courts', purpose: 'Strategic entertainment' },
  { id: 'game_piece', category: 'games', icon: '♟️', rarity: 'common', isHistorical: false, level: 13, source: 'Craftsmen', purpose: 'Playing traditional board games' },

  // LEVEL 14: Preserve the Legacy
  { id: 'heritage_archive', category: 'preservation', icon: '🏛️', rarity: 'legendary', isHistorical: false, level: 14, source: 'Digital scanning', purpose: 'Protecting history forever' },
  { id: 'preservation_record', category: 'preservation', icon: '📑', rarity: 'epic', isHistorical: false, level: 14, source: 'Conservation labs', purpose: 'Documenting restoration methods' }
];

export const inventoryCategories = [
  { id: 'artifacts', icon: '🏺', labelKey: 'inventory.cat.artifacts' },
  { id: 'resources', icon: '🌾', labelKey: 'inventory.cat.resources' },
  { id: 'trade', icon: '🚢', labelKey: 'inventory.cat.trade' },
  { id: 'knowledge', icon: '📜', labelKey: 'inventory.cat.knowledge' },
  { id: 'culture', icon: '🎭', labelKey: 'inventory.cat.culture' },
  { id: 'architecture', icon: '🏛️', labelKey: 'inventory.cat.architecture' },
  { id: 'games', icon: '🎲', labelKey: 'inventory.cat.games' },
  { id: 'preservation', icon: '🔬', labelKey: 'inventory.cat.preservation' }
];