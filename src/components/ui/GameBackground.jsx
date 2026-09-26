import React from 'react';
import { useBackground } from '../../context/BackgroundContext';
import { useTheme } from '../../context/ThemeContext';

// SVG Noise Filter for cinematic texture (sandstone/dust/parchment feel)
const textureOverlay = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`;

const GameBackground = () => {
  const { bgType, bgIntensity } = useBackground();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const getBackgroundImage = () => {
    switch (bgType) {
      case 'level1': case 'level2': case 'forest':
        return "url('/assets/backgrounds/forest.jpg')";
      case 'level3': case 'level4': case 'level5': case 'level6': case 'city':
        return "url('/assets/backgrounds/city.jpg')";
      case 'level7': case 'level8': case 'level9': case 'level10': case 'level11': case 'temple':
        return "url('/assets/backgrounds/temple.jpg')";
      case 'dashboard': case 'map': case 'level12': case 'level13': case 'level14': case 'quests': case 'legacy': default:
        return "url('/assets/backgrounds/dashboard.jpg')";
    }
  };

  // Mapping contexts to cinematic color palettes
  const getBackgroundStyle = () => {
    switch (bgType) {
      case 'level1':
      case 'forest':
        // Deep green forests, prehistoric, warm sunlight breaking through
        return 'radial-gradient(circle at 50% 20%, #2a3d24 0%, #152213 50%, #0a110a 100%)';
      case 'water':
      case 'river':
        // River/water source
        return 'radial-gradient(circle at 50% 0%, #2c4a52 0%, #162a30 50%, #0b151a 100%)';
      case 'level2':
      case 'farming':
        // Farmland, village, river valley (earthy, warm)
        return 'radial-gradient(circle at 50% 20%, #4a3f28 0%, #2a2212 50%, #120e06 100%)';
      case 'level3':
      case 'city':
        // Ancient planned city, brick structures (terracotta/brick tones)
        return 'radial-gradient(circle at 50% 40%, #523428 0%, #2e1a12 50%, #140a06 100%)';
      case 'level4':
      case 'trade':
        // Trade routes, caravan (dusty sandstone)
        return 'radial-gradient(circle at 40% 30%, #544430 0%, #2e2416 50%, #120e08 100%)';
      case 'level5':
      case 'kingdom':
        // Fortified kingdom
        return 'radial-gradient(circle at 60% 40%, #48303e 0%, #22121a 50%, #0e0509 100%)';
      case 'level6':
      case 'mauryan':
        // Palace, roads, monuments (imperial gold/bronze)
        return 'radial-gradient(circle at 50% 20%, #544420 0%, #2a200c 50%, #120e04 100%)';
      case 'level7':
      case 'gupta':
      case 'library':
        // Knowledge, manuscripts, astronomy (mystical deep blue/purple)
        return 'radial-gradient(circle at 50% 10%, #242a42 0%, #121422 50%, #080911 100%)';
      case 'level8':
      case 'architecture':
      case 'temple':
        // Stone architecture (cool grey/blue stone)
        return 'radial-gradient(circle at 50% 50%, #30383a 0%, #181d1e 50%, #0a0c0c 100%)';
      case 'level9':
      case 'cultural':
        // Crafts, textiles (rich vibrant warm tones)
        return 'radial-gradient(circle at 30% 30%, #5c2c2c 0%, #2e1212 50%, #140606 100%)';
      case 'level10':
      case 'chola':
        // South Indian temple, coastal
        return 'radial-gradient(circle at 50% 30%, #2c4248 0%, #162226 50%, #0a1114 100%)';
      case 'level11':
      case 'vijayanagara':
        // Large historic city, markets
        return 'radial-gradient(circle at 40% 40%, #523a22 0%, #281a0e 50%, #120a04 100%)';
      case 'level12':
      case 'stories':
      case 'quests':
        // Traditional storytelling (warm firelight)
        return 'radial-gradient(circle at 50% 60%, #5c3214 0%, #2e1406 50%, #120602 100%)';
      case 'level13':
      case 'games':
      case 'minigame':
        // Historical gathering
        return 'radial-gradient(circle at 50% 50%, #423820 0%, #221c0e 50%, #0e0a04 100%)';
      case 'level14':
      case 'legacy':
        // Museum, sunset
        return 'radial-gradient(circle at 50% 80%, #542212 0%, #2e0e04 50%, #120401 100%)';
      case 'map':
        // Aged parchment/explorer map
        return 'radial-gradient(circle at 50% 50%, #4a3e2a 0%, #221c10 60%, #0e0a04 100%)';
      case 'dashboard':
        // Epic overview
        return 'radial-gradient(circle at 50% 0%, #3a3222 0%, #1a160e 50%, #080604 100%)';
      default:
        // Default warm earthy tone
        return 'radial-gradient(circle at 50% 30%, #3a342a 0%, #1a1612 50%, #0a0908 100%)';
    }
  };

  const getOpacity = () => {
    switch (bgIntensity) {
      case 'light': return 'opacity-40';
      case 'heavy': return 'opacity-100';
      case 'medium':
      default: return 'opacity-80';
    }
  };

  return (
    <div className={`fixed inset-0 z-[-1] overflow-hidden pointer-events-none transition-colors duration-1000 ${isLight ? 'bg-[#E8D9B8]' : 'bg-[#080808]'}`}>
      
      {/* 0. Cinematic AI Image Base */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: getBackgroundImage() }}
      />

      {/* 1. Base Readability Overlay & Civilization Colors */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${isLight ? 'bg-[#E8D9B8]/75' : 'bg-[#0a0a0c]/85'}`} />
      <div 
        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${getOpacity()} mix-blend-color pointer-events-none`}
        style={{ background: getBackgroundStyle() }}
      />
      
      {/* 2. Dust/Texture Overlay (Cinematic Grain) */}
      <div 
        className={`absolute inset-0 pointer-events-none ${isLight ? 'mix-blend-multiply opacity-20' : 'mix-blend-overlay opacity-30'}`}
        style={{ backgroundImage: textureOverlay }}
      />
      
      {/* 3. Sunlight/Atmosphere (Soft Glow from Top) */}
      <div className={`absolute top-0 left-0 right-0 h-[70vh] bg-gradient-to-b from-amber-500/15 to-transparent pointer-events-none transition-opacity duration-1000 ${isLight ? 'mix-blend-overlay opacity-80' : 'mix-blend-screen opacity-50'}`} />

      {/* 4. Cinematic Vignette (Dark Edges for depth) */}
      <div className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${isLight ? 'opacity-60' : 'opacity-100'}`} style={{
        background: isLight 
          ? 'radial-gradient(circle at 50% 50%, transparent 30%, rgba(180,150,110,0.5) 80%, rgba(120,90,50,0.8) 100%)'
          : 'radial-gradient(circle at 50% 50%, transparent 30%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,0.95) 100%)'
      }} />
    </div>
  );
};

export default GameBackground;
