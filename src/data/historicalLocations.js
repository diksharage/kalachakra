import { ATLAS_LOCATIONS } from './historicalAtlasData.js';

// Enriched Historical Locations with backwards-compatible (x, y) percentages and rich metadata
export const historicalLocations = ATLAS_LOCATIONS.map(loc => ({
  ...loc,
  x: Math.round((loc.coordinates.x / 1000) * 100),
  y: Math.round((loc.coordinates.y / 850) * 100),
  region: loc.modernLocation.split(',')[1]?.trim() || loc.modernLocation.split(',')[0]?.trim() || 'Subcontinent'
}));

export default historicalLocations;
