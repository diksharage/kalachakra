import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useGame } from '../context/GameContext';
import { useTheme } from '../context/ThemeContext';
import BackButton from '../components/common/BackButton';
import {
  ATLAS_ERAS,
  ATLAS_LOCATIONS,
  ATLAS_RIVERS,
  ATLAS_TRADE_ROUTES,
  ATLAS_TERRITORIES,
  ATLAS_TERRAIN,
  ATLAS_SEAS,
  SUBCONTINENT_COASTLINE,
  SRI_LANKA_COASTLINE
} from '../data/historicalAtlasData';
import { civilizationLevels } from '../data/civilizationLevels';
import { askHeritageGuide } from '../services/aiService';
import {
  Compass,
  Map as MapIcon,
  List as ListIcon,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Info,
  X,
  ExternalLink,
  Search,
  Bot,
  Play,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  BookOpen,
  ArrowRight,
  Maximize2,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

// Robust asset resolver supporting Vite base path and fallbacks
export const resolveAsset = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseUrl = import.meta.env.BASE_URL || '/';
  return `${baseUrl}${cleanPath}`;
};

const ExplorePage = () => {
  const { t } = useLanguage();
  const { gameState, unlockArtifact, updateResources, updateActiveLevelState, notify } = useGame();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // State management: initialize to incoming route state or active level or default to Indus (level_3)
  const [selectedEraId, setSelectedEraId] = useState(() => {
    if (location.state?.eraId) return location.state.eraId;
    if (location.state?.periodId) return location.state.periodId;
    if (location.state?.levelId) return `level_${location.state.levelId}`;
    if (gameState?.activeLevelId) return `level_${gameState.activeLevelId}`;
    return 'level_3';
  });

  const [selectedLoc, setSelectedLoc] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'lifestyle', 'then_now', 'actions'
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [mobileLayersOpen, setMobileLayersOpen] = useState(false);

  // Active layers
  const [layers, setLayers] = useState({
    settlements: true,
    kingdoms: true,
    rivers: true,
    tradeRoutes: true,
    monuments: true,
    archaeological: true
  });

  // Map Zoom & Pan State
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapContainerRef = useRef(null);
  const timelineRef = useRef(null);

  // Puzzle state
  const [puzzleModal, setPuzzleModal] = useState(null);
  const [puzzleAnswerIdx, setPuzzleAnswerIdx] = useState(null);
  const [puzzleSolved, setPuzzleSolved] = useState(false);

  // KALA AI state in map
  const [kalaOpen, setKalaOpen] = useState(false);
  const [kalaQuery, setKalaQuery] = useState('');
  const [kalaLoading, setKalaLoading] = useState(false);
  const [kalaAnswer, setKalaAnswer] = useState(null);

  const { unlockedLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], unlockedArtifacts = [] } = gameState || {};

  // Find active era object
  const currentEra = useMemo(() => {
    return ATLAS_ERAS.find(e => e.id === selectedEraId) || ATLAS_ERAS[0];
  }, [selectedEraId]);

  // Synchronize bottom timeline scroll when selectedEraId changes
  useEffect(() => {
    if (timelineRef.current) {
      const activeBtn = timelineRef.current.querySelector(`[data-era-id="${selectedEraId}"]`);
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [selectedEraId]);

  // Filter locations by selected era, functional layer toggles & search query
  const filteredLocations = useMemo(() => {
    return ATLAS_LOCATIONS.filter(loc => {
      // Era matching
      const matchesEra = selectedEraId === 'all' || loc.eraId === selectedEraId;

      // Layer matching
      const matchesLayer =
        (layers.settlements && ['city', 'capital', 'port', 'settlement'].includes(loc.category)) ||
        (layers.monuments && loc.category === 'monument') ||
        (layers.archaeological && loc.category === 'archaeological');

      // Search matching
      const matchesSearch =
        searchQuery.trim() === '' ||
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.modernLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.significance.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesEra && matchesLayer && matchesSearch;
    });
  }, [selectedEraId, searchQuery, layers.settlements, layers.monuments, layers.archaeological]);

  // Filter trade routes by selected era
  const activeTradeRoutes = useMemo(() => {
    if (!layers.tradeRoutes) return [];
    if (selectedEraId === 'all') return ATLAS_TRADE_ROUTES;
    return ATLAS_TRADE_ROUTES.filter(r => (r.eraIds && r.eraIds.includes(selectedEraId)) || r.eraId === selectedEraId);
  }, [selectedEraId, layers.tradeRoutes]);

  // Filter territories by selected era
  const activeTerritories = useMemo(() => {
    if (!layers.kingdoms) return [];
    if (selectedEraId === 'all') return ATLAS_TERRITORIES;
    return ATLAS_TERRITORIES.filter(t => (t.eraIds && t.eraIds.includes(selectedEraId)) || t.eraId === selectedEraId);
  }, [selectedEraId, layers.kingdoms]);

  // Auto-select first location when era changes if current selected doesn't belong
  useEffect(() => {
    if (filteredLocations.length > 0 && (!selectedLoc || (selectedEraId !== 'all' && selectedLoc.eraId !== selectedEraId))) {
      setSelectedLoc(filteredLocations[0]);
    }
  }, [selectedEraId, filteredLocations]);

  // Handle Discovering / Marking a place explored in active game
  const handleDiscover = (loc) => {
    if (!loc) return;
    if (loc.libraryId && !unlockedArtifacts.includes(loc.libraryId)) {
      unlockArtifact(loc.libraryId);
      updateResources({ legacy: 25, knowledge: 50 });
      notify?.('DISCOVERY', `Explored ${loc.name}!`, `Added to your historical discoveries.`, { icon: loc.icon || '🏛️' });
    }

    // Connect to current active level if player is currently playing that level
    if (gameState?.activeLevelId === loc.level && gameState?.activeLevelState) {
      const currentState = gameState.activeLevelState;
      const currentExp = currentState.exploration || [];
      if (!currentExp.includes(loc.id)) {
        updateActiveLevelState(loc.level, {
          ...currentState,
          exploration: [...currentExp, loc.id]
        });
      }
    }
  };

  // Zoom and pan handlers
  const handleZoomIn = () => setZoom(z => Math.min(z + 0.25, 2.5));
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.25, 0.75));
  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (e.target.closest('button') || e.target.closest('.interactive-pin')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Puzzle resolution
  const handleSolvePuzzle = () => {
    if (!currentEra.puzzle) return;
    setPuzzleModal(currentEra.puzzle);
    setPuzzleAnswerIdx(null);
    setPuzzleSolved(false);
  };

  const handleSelectPuzzleOption = (idx, opt) => {
    setPuzzleAnswerIdx(idx);
    if (opt.isCorrect) {
      setPuzzleSolved(true);
      if (currentEra.puzzle.reward) {
        updateResources(currentEra.puzzle.reward);
        notify?.('REWARD', 'Map Challenge Solved!', `Earned +${currentEra.puzzle.reward.legacy || 50} Legacy XP!`, { icon: '🧩' });
      }
    }
  };

  // Ask KALA AI regarding current location or era
  const handleAskKala = async (customPrompt) => {
    const q = customPrompt || kalaQuery;
    if (!q || !q.trim()) return;
    setKalaLoading(true);
    setKalaOpen(true);
    setKalaAnswer(null);

    try {
      const context = {
        currentLocation: selectedLoc?.name,
        currentEra: currentEra.title,
        dates: currentEra.dates,
        significance: selectedLoc?.significance,
        modernLocation: selectedLoc?.modernLocation
      };
      const response = await askHeritageGuide(q, context);
      setKalaAnswer(response.text || response);
    } catch {
      setKalaAnswer(
        `${selectedLoc?.name || currentEra.title} was an essential center of ancient Indian civilization. In ${currentEra.dates}, it played a pivotal role in trade, architecture, and cultural exchange across the subcontinent.`
      );
    } finally {
      setKalaLoading(false);
    }
  };

  // Check if player has an active playing level to display "Return to Level"
  const activePlayingLevel = gameState?.activeLevelId
    ? civilizationLevels.find(l => l.id === gameState.activeLevelId)
    : null;

  return (
    <div className="min-h-screen bg-[#070A0C] text-[#F5F1E8] flex flex-col overflow-x-hidden font-sans">
      {/* TOP HEADER BAR */}
      <header className="bg-[#090C0F] border-b border-[#34302A] px-4 py-3 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <BackButton />
            {activePlayingLevel ? (
              <button
                type="button"
                onClick={() => navigate(`/journey/level/${activePlayingLevel.id}/play`)}
                className="px-3.5 py-1.5 rounded-xl bg-gold/15 border border-gold/40 text-gold hover:bg-gold hover:text-[#070A0C] text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
              >
                ← Return to Level {activePlayingLevel.id}: {activePlayingLevel.title}
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gold/20 border border-gold/40 flex items-center justify-center text-gold">
                  <Compass size={18} />
                </div>
                <div className="text-left">
                  <h1 className="font-serif font-bold text-base md:text-lg text-[#F5F1E8] leading-tight">
                    KALACHAKRA Historical Atlas
                  </h1>
                  <span className="text-[11px] text-[#C5C9CC] block">
                    Interactive Geography of the Indian Subcontinent
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Era Title Badge */}
          <div className="hidden lg:flex items-center gap-3 bg-[#101519] px-4 py-1.5 rounded-xl border border-[#34302A]">
            <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: currentEra.color }} />
            <div className="text-left">
              <span className="text-xs font-bold text-[#F5F1E8] block">{currentEra.title}</span>
              <span className="text-[10px] text-gold uppercase font-bold tracking-wider">{currentEra.dates}</span>
            </div>
          </div>

          {/* Search, Puzzle & View Controls */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#C5C9CC]/40" />
              <input
                type="text"
                placeholder="Search historical site..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#101519] border border-[#34302A] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#F5F1E8] placeholder:text-[#C5C9CC]/50 focus:outline-none focus:border-gold w-36 sm:w-48 transition-all"
              />
            </div>

            {currentEra.puzzle && (
              <button
                type="button"
                onClick={handleSolvePuzzle}
                className="px-3 py-1.5 rounded-xl bg-gold/20 border border-gold/50 text-gold hover:bg-gold hover:text-[#070A0C] text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Sparkles size={13} />
                <span className="hidden sm:inline">Era Challenge</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => handleAskKala(`Explain the geographical and historical importance of ${currentEra.title}`)}
              className="px-3 py-1.5 rounded-xl bg-purple-900/30 border border-purple-500/40 text-purple-200 hover:bg-purple-900/50 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Bot size={13} className="text-gold" />
              <span className="hidden sm:inline">Ask KALA</span>
            </button>

            <div className="flex bg-[#101519] p-0.5 rounded-xl border border-[#34302A]">
              <button
                type="button"
                onClick={() => setViewMode('map')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'map' ? 'bg-gold text-[#070A0C]' : 'text-[#C5C9CC] hover:text-white'
                }`}
                title="Map View"
              >
                <MapIcon size={15} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'list' ? 'bg-gold text-[#070A0C]' : 'text-[#C5C9CC] hover:text-white'
                }`}
                title="List View"
              >
                <ListIcon size={15} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN ATLAS WORKSPACE (3-PANEL LAYOUT) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* MOBILE LAYERS TOGGLE BAR (< lg) */}
        <div className="lg:hidden px-4 py-2 bg-[#090C0F] border-b border-[#34302A] flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={() => setMobileLayersOpen(o => !o)}
            className="px-3 py-1.5 rounded-xl bg-gold/15 border border-gold/40 text-gold text-xs font-bold flex items-center gap-1.5 min-h-[36px]"
          >
            <Layers size={14} />
            <span>Historical Layers & Context ({Object.values(layers).filter(Boolean).length}/6) {mobileLayersOpen ? '▲' : '▼'}</span>
          </button>
          <span className="text-[11px] text-[#C5C9CC] font-mono">{filteredLocations.length} Sites</span>
        </div>

        {/* LEFT PANEL: HISTORICAL LAYERS & FILTERS */}
        <aside className={`${mobileLayersOpen ? 'flex' : 'hidden'} lg:flex w-full lg:w-72 bg-[#090C0F] border-b lg:border-b-0 lg:border-r border-[#34302A] p-4 flex-col gap-4 shrink-0 overflow-y-auto max-h-[260px] lg:max-h-full text-left z-20`}>
          {/* Layer toggles */}
          <div>
            <div className="text-xs uppercase tracking-widest text-gold font-bold flex items-center gap-1.5 mb-2">
              <Layers size={14} className="text-gold" /> Historical Layers
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5">
              {[
                { key: 'settlements', label: 'Settlements & Cities', icon: '🏙️' },
                { key: 'kingdoms', label: 'Kingdoms & Extents', icon: '👑' },
                { key: 'rivers', label: 'Rivers & Geography', icon: '🌊' },
                { key: 'tradeRoutes', label: 'Trade & Sea Routes', icon: '🧭' },
                { key: 'monuments', label: 'Monuments & Edicts', icon: '🏛️' },
                { key: 'archaeological', label: 'Excavation Sites', icon: '⛏️' }
              ].map(lyr => (
                <button
                  key={lyr.key}
                  type="button"
                  onClick={() => setLayers(prev => ({ ...prev, [lyr.key]: !prev[lyr.key] }))}
                  className={`flex items-center justify-between p-2 rounded-xl text-xs font-bold border transition-all text-left ${
                    layers[lyr.key]
                      ? 'bg-[#151B20] border-gold/40 text-[#F5F1E8]'
                      : 'bg-[#101519]/50 border-transparent text-[#C5C9CC]/50 hover:border-[#34302A]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{lyr.icon}</span>
                    <span>{lyr.label}</span>
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      layers[lyr.key] ? 'bg-green-400' : 'bg-[#C5C9CC]/20'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Subcontinent Context & Overlap Notice */}
          <div className="bg-[#101519] p-3 rounded-2xl border border-[#34302A] text-left space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-gold uppercase tracking-wider">
              <span>Historical Context</span>
              <span className="text-[10px] text-[#C5C9CC]/70">{filteredLocations.length} Sites</span>
            </div>
            <p className="text-xs text-[#C5C9CC] leading-relaxed line-clamp-3">
              {currentEra.context}
            </p>
            <div className="pt-2 border-t border-[#34302A]/60">
              <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block mb-0.5">
                ⚠ Regional Overlap:
              </span>
              <p className="text-[11px] text-[#C5C9CC]/85 leading-snug">
                {currentEra.civilizationOverlap}
              </p>
            </div>
          </div>

          {/* Era Quick Jump List (All 14 Periods Synchronized) */}
          <div className="hidden lg:block space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gold block mb-1">
              Historical Periods (14 Levels)
            </span>
            <div className="flex flex-col gap-1 max-h-56 overflow-y-auto pr-1">
              {ATLAS_ERAS.map(era => (
                <button
                  key={era.id}
                  type="button"
                  onClick={() => setSelectedEraId(era.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-left text-xs font-bold transition-all flex items-center justify-between ${
                    selectedEraId === era.id
                      ? 'bg-gold text-[#070A0C]'
                      : 'text-[#C5C9CC] hover:bg-[#151B20]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    {era.levelId && era.levelId !== 'all' && (
                      <span className={`text-[9px] px-1 py-0.5 rounded font-mono ${
                        selectedEraId === era.id ? 'bg-[#070A0C] text-gold' : 'bg-gold/20 text-gold'
                      }`}>
                        L{era.levelId}
                      </span>
                    )}
                    <span className="truncate">{era.title}</span>
                  </div>
                  <span className="text-[9px] opacity-75 shrink-0 ml-1">{era.dates.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN AREA: INTERACTIVE GEOGRAPHICAL MAP */}
        <main
          ref={mapContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="flex-1 relative bg-[#070A0C] overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
        >
          {viewMode === 'map' ? (
            <div
              className="relative w-full h-full flex items-center justify-center transition-transform duration-100 ease-out"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`
              }}
            >
              {/* THE GEOGRAPHICAL SUB-CONTINENT SVG MAP */}
              <svg
                viewBox="0 0 1000 850"
                className="w-full h-full max-h-[820px] object-contain drop-shadow-2xl"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {/* Subtle Grid Filter */}
                  <pattern id="latLonGrid" width="100" height="100" patternUnits="userSpaceOnUse">
                    <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(217, 164, 65, 0.05)" strokeWidth="0.8" />
                  </pattern>

                  {/* Ocean Gradient */}
                  <radialGradient id="oceanGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#0B1319" />
                    <stop offset="100%" stopColor="#05080A" />
                  </radialGradient>

                  {/* Land Gradient */}
                  <linearGradient id="subcontinentLand" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1B242C" />
                    <stop offset="50%" stopColor="#141B21" />
                    <stop offset="100%" stopColor="#0E1418" />
                  </linearGradient>

                  {/* Route Dash Animation */}
                  <style>{`
                    @keyframes dashFlow {
                      to { stroke-dashoffset: -20; }
                    }
                    .animated-route {
                      stroke-dasharray: 6, 4;
                      animation: dashFlow 1.2s linear infinite;
                    }
                  `}</style>
                </defs>

                {/* Ocean Background & Lat-Long Grid */}
                <rect x="0" y="0" width="1000" height="850" fill="url(#oceanGlow)" />
                <rect x="0" y="0" width="1000" height="850" fill="url(#latLonGrid)" />

                {/* ACCURATE GEOGRAPHICAL SUB-CONTINENT COASTLINE */}
                <path
                  d={SUBCONTINENT_COASTLINE}
                  fill="url(#subcontinentLand)"
                  stroke="#34302A"
                  strokeWidth="2.5"
                  className="filter drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]"
                />

                {/* ACCURATE SRI LANKA COASTLINE */}
                <path
                  d={SRI_LANKA_COASTLINE}
                  fill="url(#subcontinentLand)"
                  stroke="#34302A"
                  strokeWidth="1.8"
                />

                {/* ANDAMAN & NICOBAR ISLANDS */}
                <ellipse cx="670" cy="650" rx="3.5" ry="9" fill="#1B242C" stroke="#34302A" strokeWidth="1" />
                <ellipse cx="678" cy="690" rx="4" ry="11" fill="#1B242C" stroke="#34302A" strokeWidth="1" />
                <ellipse cx="685" cy="740" rx="4.5" ry="14" fill="#1B242C" stroke="#34302A" strokeWidth="1" />

                {/* SURROUNDING BODIES OF WATER */}
                {layers.rivers && ATLAS_SEAS.map(sea => (
                  <text
                    key={sea.name}
                    x={sea.x}
                    y={sea.y}
                    fill="#38BDF8"
                    fontSize="11"
                    fontWeight="bold"
                    letterSpacing="3"
                    opacity="0.35"
                    textAnchor="middle"
                    className="pointer-events-none select-none"
                  >
                    {sea.name}
                  </text>
                ))}

                {/* PHYSICAL TERRAIN RELIEF (Mountains & Deserts) */}
                {layers.rivers && ATLAS_TERRAIN.map(terrain => (
                  <g key={terrain.id} opacity="0.75">
                    <path
                      d={terrain.d}
                      fill={terrain.id === 'thar_desert' ? 'rgba(217, 164, 65, 0.08)' : 'none'}
                      stroke={terrain.id === 'thar_desert' ? 'rgba(217, 164, 65, 0.25)' : '#6B7280'}
                      strokeWidth={terrain.id === 'himalayas' ? '4.5' : '3'}
                      strokeLinecap="round"
                      strokeDasharray="4 5"
                    />
                    <text
                      x={terrain.labelX}
                      y={terrain.labelY}
                      fill={terrain.id === 'thar_desert' ? '#D9A441' : '#9CA3AF'}
                      fontSize="10"
                      fontWeight="bold"
                      letterSpacing="2"
                      textAnchor="middle"
                      className="pointer-events-none select-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
                    >
                      {terrain.name}
                    </text>
                  </g>
                ))}

                {/* SOUTHEAST ASIA MARITIME EXTENSION (For Chola Era Level 10 or All) */}
                {(selectedEraId === 'level_10' || selectedEraId === 'all') && (
                  <g opacity="0.85">
                    {/* Malay Peninsula (Kadaram) */}
                    <path
                      d="M 870,640 C 880,670 890,710 900,740 C 890,755 875,730 865,690 Z"
                      fill="#141B21"
                      stroke="#34302A"
                      strokeWidth="1.5"
                    />
                    <text x="880" y="660" fill="#C5C9CC" fontSize="10" fontWeight="bold">
                      Malay Peninsula (Kadaram)
                    </text>

                    {/* Sumatra (Srivijaya) */}
                    <path
                      d="M 910,735 C 935,755 965,795 980,835 C 960,845 930,815 905,775 Z"
                      fill="#141B21"
                      stroke="#34302A"
                      strokeWidth="1.5"
                    />
                    <text x="920" y="760" fill="#C5C9CC" fontSize="10" fontWeight="bold">
                      Sumatra (Srivijaya)
                    </text>
                  </g>
                )}

                {/* KINGDOMS & CIVILIZATION TERRITORIES */}
                {activeTerritories.map(t => (
                  <polygon
                    key={t.id}
                    points={t.points}
                    fill={t.color}
                    stroke={t.borderColor}
                    strokeWidth="2"
                    strokeDasharray="6 3"
                    className="transition-all duration-500 pointer-events-none"
                  />
                ))}

                {/* RIVERS & WATER COURSES */}
                {layers.rivers &&
                  ATLAS_RIVERS.map(r => (
                    <g key={r.id} className="group">
                      <path
                        d={r.d}
                        fill="none"
                        stroke={r.color}
                        strokeWidth={r.isPaleo ? '2.5' : '2'}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray={r.isPaleo ? '4 3' : 'none'}
                        opacity={r.isPaleo ? '0.75' : '0.85'}
                      />
                    </g>
                  ))}

                {/* TRADE & SEA ROUTES */}
                {activeTradeRoutes.map(rt => (
                  <g key={rt.id}>
                    <path
                      d={rt.d}
                      fill="none"
                      stroke={rt.color}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      className="animated-route"
                      opacity="0.9"
                    />
                  </g>
                ))}

                {/* HISTORICAL PLACE MARKERS */}
                {filteredLocations.map(loc => {
                  const isSelected = selectedLoc?.id === loc.id;
                  const isDiscovered = unlockedArtifacts.includes(loc.libraryId);
                  const isLevelActive = gameState?.activeLevelId === loc.level;

                  return (
                    <g
                      key={loc.id}
                      transform={`translate(${loc.coordinates.x}, ${loc.coordinates.y})`}
                      onClick={() => {
                        setSelectedLoc(loc);
                        handleDiscover(loc);
                      }}
                      className="interactive-pin cursor-pointer group"
                    >
                      {/* Pulsing selection aura */}
                      {isSelected && (
                        <circle
                          r="18"
                          fill="none"
                          stroke="#D9A441"
                          strokeWidth="2.5"
                          className="animate-ping opacity-75"
                        />
                      )}

                      {/* Discovered green indicator ring */}
                      {isDiscovered && (
                        <circle r="14" fill="none" stroke="#22C55E" strokeWidth="1.5" opacity="0.6" />
                      )}

                      {/* Pin Circle Body */}
                      <circle
                        r={isSelected ? '12' : '9.5'}
                        fill={isSelected ? '#D9A441' : '#101519'}
                        stroke={isSelected ? '#FFFFFF' : isLevelActive ? '#D9A441' : '#34302A'}
                        strokeWidth={isSelected ? '2.5' : '2'}
                        className="transition-all duration-200 group-hover:scale-125"
                      />

                      {/* Icon */}
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={isSelected ? '11' : '9'}
                        className="pointer-events-none select-none"
                      >
                        {loc.icon}
                      </text>

                      {/* Text Label */}
                      <text
                        x="0"
                        y={isSelected ? '22' : '18'}
                        textAnchor="middle"
                        fill={isSelected ? '#D9A441' : '#F5F1E8'}
                        fontSize={isSelected ? '11' : '9'}
                        fontWeight="bold"
                        className="transition-all select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                      >
                        {loc.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          ) : (
            /* LIST VIEW MODE */
            <div className="w-full h-full p-6 overflow-y-auto max-w-4xl mx-auto space-y-3 text-left">
              <h2 className="text-lg font-serif font-bold text-gold">
                Historical Places & Archaeological Settlements ({filteredLocations.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredLocations.map(loc => {
                  const isSelected = selectedLoc?.id === loc.id;
                  const isDiscovered = unlockedArtifacts.includes(loc.libraryId);

                  return (
                    <div
                      key={loc.id}
                      onClick={() => {
                        setSelectedLoc(loc);
                        setViewMode('map');
                      }}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        isSelected
                          ? 'bg-gold/15 border-gold shadow-lg'
                          : 'bg-[#101519] border-[#34302A] hover:border-gold/50'
                      }`}
                    >
                      <span className="text-3xl p-2.5 rounded-xl bg-black/40 border border-[#34302A] shrink-0">
                        {loc.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <h3 className="font-bold text-sm text-[#F5F1E8] truncate">{loc.name}</h3>
                          {isDiscovered && (
                            <span className="text-[10px] font-bold text-green-400 bg-green-950/60 px-2 py-0.5 rounded-full border border-green-500/30 shrink-0">
                              Explored ✓
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-gold font-bold mb-1">{loc.modernLocation}</p>
                        <p className="text-xs text-[#C5C9CC] line-clamp-2">{loc.significance}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Map Floating Zoom & Pan Controls */}
          {viewMode === 'map' && (
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-[#090C0F]/90 backdrop-blur-md p-1 rounded-xl border border-[#34302A] shadow-xl z-20">
              <button
                type="button"
                onClick={handleZoomIn}
                className="p-2 rounded-lg text-[#C5C9CC]/70 hover:text-gold hover:bg-[#151B20] transition-colors"
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                className="p-2 rounded-lg text-[#C5C9CC]/70 hover:text-gold hover:bg-[#151B20] transition-colors"
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              <button
                type="button"
                onClick={handleResetView}
                className="p-2 rounded-lg text-[#C5C9CC]/70 hover:text-gold hover:bg-[#151B20] transition-colors"
                title="Reset View"
              >
                <RotateCcw size={16} />
              </button>
              <span className="text-[11px] font-bold text-[#C5C9CC]/50 px-2 font-mono">
                {Math.round(zoom * 100)}%
              </span>
            </div>
          )}
        </main>

        {/* RIGHT PANEL: SELECTED PLACE INFORMATION & RECONSTRUCTION DECK */}
        {selectedLoc && (
          <aside className="fixed inset-x-0 bottom-0 z-50 max-h-[82vh] lg:max-h-full lg:static lg:w-96 bg-[#090C0F] border-t-2 border-gold/40 lg:border-t-0 lg:border-l border-[#34302A] rounded-t-3xl lg:rounded-none flex flex-col shrink-0 shadow-2xl animate-fade-in overflow-hidden text-left">
            {/* Mobile Handle Indicator */}
            <div className="lg:hidden w-12 h-1 bg-content/25 rounded-full mx-auto my-2 shrink-0" />
            {/* Place Header */}
            <div className="p-3.5 sm:p-4 bg-[#101519] border-b border-[#34302A] relative flex items-start gap-3">
              <span className="text-3xl sm:text-4xl p-2 rounded-xl bg-black/40 border border-[#34302A] shrink-0">
                {selectedLoc.icon}
              </span>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold px-2 py-0.5 rounded-full bg-gold/15 border border-gold/30">
                    {selectedLoc.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedLoc(null)}
                    className="text-[#C5C9CC] hover:text-gold transition-colors p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg hover:bg-surface/50"
                    aria-label="Close place details"
                  >
                    <X size={18} />
                  </button>
                </div>
                <h2 className="text-base sm:text-lg font-serif font-bold text-[#F5F1E8] truncate mt-1">
                  {selectedLoc.name}
                </h2>
                <p className="text-[11px] text-[#C5C9CC] truncate">{selectedLoc.modernLocation}</p>
              </div>
            </div>

            {/* Visual Reconstruction Image Banner */}
            {selectedLoc.reconstructionImage && (
              <div
                onClick={() => setEnlargedImage(resolveAsset(selectedLoc.reconstructionImage))}
                className="relative h-36 bg-black/60 overflow-hidden cursor-pointer group shrink-0 border-b border-[#34302A]"
              >
                <img
                  src={resolveAsset(selectedLoc.reconstructionImage)}
                  alt={selectedLoc.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = resolveAsset('assets/backgrounds/indus.jpg');
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-[10px] font-bold text-gold flex items-center gap-1">
                  <Maximize2 size={10} /> View Reconstruction
                </span>
                <span className="absolute bottom-2 left-2 text-[10px] text-[#F5F1E8] font-bold truncate max-w-[200px]">
                  {selectedLoc.period}
                </span>
              </div>
            )}

            {/* Deck Tabs */}
            <div className="flex border-b border-[#34302A] bg-[#101519]/70 text-xs font-bold">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'lifestyle', label: 'How People Lived' },
                { id: 'then_now', label: 'Then & Now' },
                { id: 'actions', label: 'Gameplay' }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2.5 text-center border-b-2 transition-all ${
                    activeTab === tab.id
                      ? 'border-gold text-gold bg-[#151B20]'
                      : 'border-transparent text-[#C5C9CC] hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="p-4 overflow-y-auto flex-1 text-left space-y-4">
              {/* TAB 1: OVERVIEW & DISCOVERIES */}
              {activeTab === 'overview' && (
                <div className="space-y-3.5 animate-fade-in">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-bold text-gold block mb-1">
                      Historical Significance
                    </span>
                    <p className="text-xs md:text-sm text-[#F5F1E8]/90 leading-relaxed">
                      {selectedLoc.significance}
                    </p>
                  </div>

                  {/* Artifacts discovered */}
                  {selectedLoc.artifacts && selectedLoc.artifacts.length > 0 && (
                    <div className="bg-[#101519] p-3 rounded-xl border border-[#34302A]">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gold block mb-2">
                        Excavated Artifacts & Evidence
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedLoc.artifacts.map((art, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] px-2.5 py-1 rounded-lg bg-gold/15 text-gold border border-gold/30 font-medium"
                          >
                            🏺 {art}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-black/40 p-3 rounded-xl border border-[#34302A] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#C5C9CC] uppercase font-bold block">Period</span>
                      <span className="text-xs font-bold text-[#F5F1E8]">{selectedLoc.period}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#C5C9CC] uppercase font-bold block">Game Level</span>
                      <span className="text-xs font-bold text-gold">Level {selectedLoc.level}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: HOW PEOPLE LIVED */}
              {activeTab === 'lifestyle' && (
                <div className="space-y-3 animate-fade-in">
                  <div className="bg-[#101519] p-3 rounded-xl border border-[#34302A] space-y-1">
                    <span className="text-xs font-bold text-gold flex items-center gap-1.5">
                      🏠 Architecture & Town Planning
                    </span>
                    <p className="text-xs text-[#F5F1E8]/90 leading-relaxed">
                      {selectedLoc.architecture || selectedLoc.howPeopleLived?.architecture || 'Constructed with local stone, timber and brick reflecting sophisticated regional building traditions.'}
                    </p>
                  </div>

                  <div className="bg-[#101519] p-3 rounded-xl border border-[#34302A] space-y-1">
                    <span className="text-xs font-bold text-gold flex items-center gap-1.5">
                      🧑‍🤝‍🧑 Daily Life & Occupations
                    </span>
                    <p className="text-xs text-[#F5F1E8]/90 leading-relaxed">
                      {selectedLoc.lifestyle || selectedLoc.howPeopleLived?.dailyLife || 'Inhabited by artisans, agriculturalists, and traders participating in lively municipal and ritual assemblies.'}
                    </p>
                  </div>

                  <div className="bg-[#101519] p-3 rounded-xl border border-[#34302A] space-y-1">
                    <span className="text-xs font-bold text-gold flex items-center gap-1.5">
                      🌾 Food, Farming & Nutrition
                    </span>
                    <p className="text-xs text-[#F5F1E8]/90 leading-relaxed">
                      {selectedLoc.food || selectedLoc.howPeopleLived?.food || 'Harvested seasonal grains, pulses, and local river and marine produce.'}
                    </p>
                  </div>

                  <div className="bg-[#101519] p-3 rounded-xl border border-[#34302A] space-y-1">
                    <span className="text-xs font-bold text-gold flex items-center gap-1.5">
                      🧵 Clothing & Adornments
                    </span>
                    <p className="text-xs text-[#F5F1E8]/90 leading-relaxed">
                      {selectedLoc.clothing || selectedLoc.howPeopleLived?.clothing || 'Spun and dyed cotton garments decorated with stone, shell and metal ornaments.'}
                    </p>
                  </div>

                  <div className="bg-[#101519] p-3 rounded-xl border border-[#34302A] space-y-1">
                    <span className="text-xs font-bold text-gold flex items-center gap-1.5">
                      ⚖️ Craft, Industry & Trade
                    </span>
                    <p className="text-xs text-[#F5F1E8]/90 leading-relaxed">
                      {selectedLoc.trade || selectedLoc.howPeopleLived?.trade || 'Exchanged precious raw materials, tools, and finished crafts along major river and land routes.'}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 3: THEN AND NOW */}
              {activeTab === 'then_now' && (
                <div className="space-y-3.5 animate-fade-in">
                  <div className="bg-[#101519] p-3.5 rounded-xl border border-gold/30 space-y-2">
                    <span className="text-xs font-bold text-gold uppercase tracking-wider block">
                      Geographical Evolution
                    </span>
                    <p className="text-xs md:text-sm text-[#F5F1E8]/90 leading-relaxed">
                      {selectedLoc.thenAndNow || 'Over centuries, changing river courses, silt deposition, and climatic shifts altered the landscape from its ancient grandeur.'}
                    </p>
                  </div>

                  <div className="bg-black/30 p-3 rounded-xl border border-[#34302A] text-xs text-[#C5C9CC] space-y-1.5">
                    <span className="font-bold text-[#F5F1E8] block">Archaeological Preservation Note:</span>
                    <p>
                      Modern archaeologists use stratigraphy, satellite imagery, and radiocarbon dating to protect these fragile ruins and decipher how ancient communities adapted to ecological changes.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 4: GAMEPLAY & ACTIONS */}
              {activeTab === 'actions' && (
                <div className="space-y-3 animate-fade-in">
                  {/* Jump to Level in Journey */}
                  <button
                    type="button"
                    onClick={() => navigate(`/journey/level/${selectedLoc.level}/play`)}
                    className="w-full py-3 px-4 rounded-xl bg-gold text-[#070A0C] font-extrabold text-xs md:text-sm hover:bg-gold/90 transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Play size={15} /> Play Level {selectedLoc.level} ({selectedLoc.name})
                  </button>

                  {/* Connect to Investigation */}
                  {selectedLoc.investigationId && (
                    <button
                      type="button"
                      onClick={() => navigate(`/investigations/${selectedLoc.investigationId}`)}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#151B20] border border-gold/40 text-gold hover:bg-[#1A2228] text-xs font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <Search size={14} /> Open Connected Investigation
                    </button>
                  )}

                  {/* Ask KALA */}
                  <button
                    type="button"
                    onClick={() => handleAskKala(`Tell me about everyday life and historical discoveries at ${selectedLoc.name} during the ${selectedLoc.period}.`)}
                    className="w-full py-2.5 px-4 rounded-xl bg-purple-900/30 border border-purple-500/40 text-purple-200 hover:bg-purple-900/50 text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <Bot size={14} className="text-gold" /> Ask KALA About {selectedLoc.name}
                  </button>

                  {/* Mark Explored */}
                  <button
                    type="button"
                    onClick={() => handleDiscover(selectedLoc)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#101519] border border-[#34302A] text-[#F5F1E8] hover:border-gold text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={14} className="text-green-400" />
                    {unlockedArtifacts.includes(selectedLoc.libraryId)
                      ? 'Already Explored in Collection ✓'
                      : 'Mark as Explored (+25 XP)'}
                  </button>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>

      {/* BOTTOM TIMELINE: TIME TRAVEL SLIDER & ERA SCRUBBER */}
      <footer className="bg-[#090C0F] border-t border-[#34302A] px-4 py-3 z-30 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-gold uppercase tracking-widest flex items-center gap-1.5">
              <span>⏳</span> Time Travel Slider
            </span>
            <span className="text-[#C5C9CC] font-mono text-[11px]">
              Active Period: <strong className="text-gold">{currentEra.dates}</strong>
            </span>
          </div>

          {/* Era Pills Track */}
          <div ref={timelineRef} className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
            {ATLAS_ERAS.map(era => {
              const isSelected = selectedEraId === era.id;
              return (
                <button
                  key={era.id}
                  data-era-id={era.id}
                  type="button"
                  onClick={() => setSelectedEraId(era.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-gold text-[#070A0C] border-gold shadow-[0_0_15px_rgba(217,164,65,0.4)] scale-102'
                      : 'bg-[#101519] text-[#C5C9CC] border-[#34302A] hover:border-gold/50 hover:bg-[#151B20]'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: isSelected ? '#070A0C' : era.color }}
                  />
                  {era.levelId && era.levelId !== 'all' && (
                    <span className={`text-[10px] px-1 rounded font-mono ${isSelected ? 'bg-[#070A0C]/20' : 'bg-gold/20 text-gold'}`}>
                      L{era.levelId}
                    </span>
                  )}
                  <span>{era.title}</span>
                  <span className={`text-[10px] opacity-75 ${isSelected ? 'text-[#070A0C]' : 'text-gold'}`}>
                    ({era.dates.split(' ')[0]})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </footer>

      {/* MAP CHALLENGE MODAL */}
      {puzzleModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-[#101519] border-2 border-gold/50 rounded-3xl p-6 max-w-lg w-full text-left space-y-4 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setPuzzleModal(null)}
              className="absolute top-4 right-4 text-[#C5C9CC] hover:text-gold p-1"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider">
              <Sparkles size={15} /> Era Map Challenge
            </div>

            <h3 className="text-xl font-serif font-bold text-[#F5F1E8]">
              {puzzleModal.title}
            </h3>

            <p className="text-sm text-[#F5F1E8]/90 leading-relaxed bg-black/40 p-3.5 rounded-xl border border-[#34302A]">
              {puzzleModal.prompt}
            </p>

            <div className="space-y-2">
              {puzzleModal.options.map((opt, idx) => {
                const isSelected = puzzleAnswerIdx === idx;
                let btnStyle = 'bg-[#151B20] border-[#34302A] text-[#F5F1E8] hover:border-gold';
                if (isSelected) {
                  btnStyle = opt.isCorrect
                    ? 'bg-green-900/30 border-green-500 text-green-200'
                    : 'bg-red-900/30 border-red-500 text-red-200';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPuzzleOption(idx, opt)}
                    className={`w-full p-3.5 rounded-xl border text-xs md:text-sm font-semibold transition-all text-left ${btnStyle}`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {puzzleAnswerIdx !== null && (
              <div
                className={`p-3.5 rounded-xl text-xs md:text-sm border animate-fade-in ${
                  puzzleModal.options[puzzleAnswerIdx].isCorrect
                    ? 'bg-green-900/20 border-green-500/40 text-green-300'
                    : 'bg-red-900/20 border-red-500/40 text-red-200'
                }`}
              >
                {puzzleModal.options[puzzleAnswerIdx].explanation}
              </div>
            )}

            {puzzleSolved && (
              <button
                type="button"
                onClick={() => setPuzzleModal(null)}
                className="w-full py-3 bg-gold text-[#070A0C] font-extrabold text-sm rounded-xl shadow-lg hover:bg-gold/90 transition-all"
              >
                Claim Rewards & Continue Exploring →
              </button>
            )}
          </div>
        </div>
      )}

      {/* KALA AI CHAT DRAWER */}
      {kalaOpen && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-[#090C0F] border-l border-[#34302A] p-4 flex flex-col z-50 shadow-2xl animate-in slide-in-from-right duration-300 text-left">
          <div className="flex items-center justify-between pb-3 border-b border-[#34302A] mb-3">
            <div className="flex items-center gap-2 text-gold font-bold text-sm">
              <Bot size={18} /> KALA Heritage Map Companion
            </div>
            <button
              type="button"
              onClick={() => setKalaOpen(false)}
              className="text-[#C5C9CC] hover:text-gold p-1"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 mb-3 pr-1">
            <div className="bg-[#101519] p-3 rounded-2xl border border-[#34302A] text-xs text-[#C5C9CC] leading-relaxed">
              Namaste! Ask me about historical settlements, trade connections, rivers, architecture, or how people lived in {currentEra.title}.
            </div>

            {kalaLoading && (
              <div className="p-4 rounded-2xl bg-black/40 border border-gold/30 text-xs text-gold flex items-center gap-2 animate-pulse">
                <Sparkles size={16} /> KALA is consulting historical records...
              </div>
            )}

            {kalaAnswer && (
              <div className="p-4 rounded-2xl bg-[#151B20] border border-gold/40 text-xs md:text-sm text-[#F5F1E8] leading-relaxed space-y-2 animate-fade-in shadow-md">
                <span className="text-[10px] text-gold font-bold uppercase tracking-wider block">
                  KALA Explanation:
                </span>
                <p>{kalaAnswer}</p>
              </div>
            )}
          </div>

          {/* Quick Prompt Pills */}
          <div className="space-y-1.5 mb-3">
            <span className="text-[10px] uppercase font-bold text-gold">Suggested Questions:</span>
            <div className="flex flex-col gap-1 text-[11px]">
              <button
                type="button"
                onClick={() => handleAskKala(`How did people live during ${currentEra.title}?`)}
                className="text-left p-1.5 rounded-lg bg-[#101519] hover:bg-[#151B20] text-[#C5C9CC] truncate"
              >
                • How did people live during {currentEra.title}?
              </button>
              <button
                type="button"
                onClick={() => handleAskKala(`What were the main trade routes and goods in ${currentEra.title}?`)}
                className="text-left p-1.5 rounded-lg bg-[#101519] hover:bg-[#151B20] text-[#C5C9CC] truncate"
              >
                • What were the main trade routes and goods?
              </button>
            </div>
          </div>

          {/* Input Box */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ask KALA about this map..."
              value={kalaQuery}
              onChange={(e) => setKalaQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAskKala()}
              className="flex-1 bg-[#101519] border border-[#34302A] rounded-xl px-3 py-2 text-xs text-[#F5F1E8] placeholder:text-[#C5C9CC]/50 focus:outline-none focus:border-gold"
            />
            <button
              type="button"
              onClick={() => handleAskKala()}
              disabled={kalaLoading || !kalaQuery.trim()}
              className="px-3.5 py-2 rounded-xl bg-gold text-[#070A0C] font-bold text-xs disabled:opacity-40 hover:bg-gold/90 transition-all"
            >
              Ask
            </button>
          </div>
        </div>
      )}

      {/* ENLARGED RECONSTRUCTION IMAGE MODAL */}
      {enlargedImage && (
        <div
          onClick={() => setEnlargedImage(null)}
          className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[85vh] bg-[#101519] p-2 rounded-3xl border-2 border-gold/50 shadow-2xl overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setEnlargedImage(null)}
              className="absolute top-4 right-4 bg-black/80 hover:bg-gold hover:text-[#070A0C] text-white p-2 rounded-full transition-colors z-10"
            >
              <X size={20} />
            </button>
            <img
              src={enlargedImage}
              alt="Historical Reconstruction"
              className="w-full h-full max-h-[80vh] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
