import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { libraryCategories, libraryBooks } from '../data/libraryContent';
import { heritageLibrary, certaintyLevels } from '../data/heritageLibrary';
import { useLanguage } from '../context/LanguageContext';
import { useGame } from '../context/GameContext';
import {
  BookOpen,
  Search,
  Sparkles,
  Clock,
  ArrowRight,
  X,
  ShieldAlert,
  CheckCircle,
  Bot
} from 'lucide-react';
import BackButton from '../components/common/BackButton';

const HeritageLibraryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { gameState } = useGame();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArchiveItem, setSelectedArchiveItem] = useState(null);

  const unlockedArtifacts = gameState.unlockedArtifacts || [];

  // Support deep-linking via ?item=... or ?q=...
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    const item = params.get('item');
    if (q) {
      setSearchQuery(q);
    }
    if (item) {
      const found = heritageLibrary.find(entry => entry.id === item);
      if (found) {
        setSelectedArchiveItem(found);
      }
    }
  }, [location.search]);

  const filteredBooks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return libraryBooks.filter(book => {
      const matchesCat = selectedCategory === 'all' || book.categoryId === selectedCategory;
      if (!matchesCat) return false;
      if (!q) return true;
      const inTitle = (book.title || '').toLowerCase().includes(q);
      const inSub = (book.subtitle || '').toLowerCase().includes(q);
      const inMeta =
        (book.period || '').toLowerCase().includes(q) ||
        (book.region || '').toLowerCase().includes(q);
      const inChapters = (book.chapters || []).some(
        ch =>
          (ch.title || '').toLowerCase().includes(q) ||
          (ch.content || '').toLowerCase().includes(q)
      );
      return inTitle || inSub || inMeta || inChapters;
    });
  }, [selectedCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const map = { all: libraryBooks.length };
    libraryCategories.forEach(c => {
      map[c.id] = libraryBooks.filter(b => b.categoryId === c.id).length;
    });
    return map;
  }, []);

  const filteredArchiveEntries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return heritageLibrary.filter(item => {
      const title = t(`library.entry.${item.id}.title`, item.id.replace(/_/g, ' '));
      const known = t(`library.entry.${item.id}.known`, '');
      if (!q) return true;
      return (
        title.toLowerCase().includes(q) ||
        known.toLowerCase().includes(q) ||
        (item.period || '').toLowerCase().includes(q) ||
        (item.region || '').toLowerCase().includes(q)
      );
    });
  }, [searchQuery, t]);

  return (
    <div className="space-y-8 pb-20 max-w-6xl mx-auto p-4 md:p-6 text-[#F5F1E8] animate-fade-in">
      {/* Header Banner */}
      <header className="bg-[#101519] border border-[#34302A] rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 shadow-xl">
        <div className="flex items-start gap-4">
          <BackButton />
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A441]/15 border border-[#D9A441]/30 text-[#D9A441] text-xs font-bold uppercase tracking-wider mb-3">
              <BookOpen size={14} /> Knowledge Repository
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#F5F1E8] mb-2">
              {t('library.title', 'The Heritage Library')}
            </h1>
            <p className="text-[#C5C9CC] text-sm md:text-base max-w-2xl">
              Explore curated historical volumes and primary archaeological entries covering India’s civilizations, architecture, science, arts, literature, and living traditions.
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-80 shrink-0">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D9A441]"
            size={18}
          />
          <input
            type="text"
            placeholder="Search volumes, eras, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#151B20] border border-[#34302A] rounded-xl pl-11 pr-9 py-3 text-sm text-[#F5F1E8] placeholder-[#C5C9CC]/50 focus:outline-none focus:border-[#D9A441] transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C5C9CC] hover:text-[#F5F1E8]"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </header>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar bg-[#101519] border border-[#34302A] p-3 rounded-2xl">
        <button
          type="button"
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all border flex items-center gap-2 ${
            selectedCategory === 'all'
              ? 'bg-[#D9A441] text-[#070A0C] border-[#D9A441] shadow-md'
              : 'bg-[#151B20] text-[#C5C9CC] border-[#34302A] hover:border-[#D9A441]/50 hover:text-[#F5F1E8]'
          }`}
        >
          <span>📚</span>
          <span>All Volumes ({categoryCounts.all})</span>
        </button>

        {libraryCategories.map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all border flex items-center gap-2 ${
              selectedCategory === cat.id
                ? 'bg-[#D9A441] text-[#070A0C] border-[#D9A441] shadow-md'
                : 'bg-[#151B20] text-[#C5C9CC] border-[#34302A] hover:border-[#D9A441]/50 hover:text-[#F5F1E8]'
            }`}
          >
            <span>{cat.icon}</span>
            <span>
              {cat.title} ({categoryCounts[cat.id] || 0})
            </span>
          </button>
        ))}
      </div>

      {/* Books Grid */}
      {filteredBooks.length === 0 ? (
        <div className="bg-[#101519] border border-[#34302A] rounded-2xl p-12 text-center">
          <BookOpen className="w-12 h-12 text-[#D9A441]/50 mx-auto mb-3" />
          <h3 className="text-lg font-serif font-bold text-[#F5F1E8] mb-1">
            No volumes match your search
          </h3>
          <p className="text-sm text-[#C5C9CC] mb-4">
            Try clearing your search query or selecting "All Volumes".
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-5 py-2.5 rounded-xl bg-[#D9A441] text-[#070A0C] font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map(book => {
            const cat = libraryCategories.find(c => c.id === book.categoryId);
            return (
              <div
                key={book.id}
                onClick={() => navigate(`/library/${book.categoryId}/${book.id}`)}
                className="bg-[#101519] border border-[#34302A] hover:border-[#D9A441] rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-lg group"
              >
                <div>
                  {/* Cover Banner */}
                  <div
                    className={`h-36 bg-gradient-to-br ${
                      cat ? cat.color : 'from-[#D9A441] to-[#B77B2E]'
                    } p-5 flex items-center justify-between relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors" />
                    <div className="relative z-10 flex flex-col justify-between h-full">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white border border-white/20 w-fit">
                        <span>{cat?.icon}</span>
                        <span>{cat?.title || 'Heritage Volume'}</span>
                      </span>
                      <span className="text-[11px] font-medium text-white/90 drop-shadow">
                        {book.period}
                      </span>
                    </div>
                    <div className="text-6xl relative z-10 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-xl">
                      {book.coverIcon}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <div className="text-[11px] font-bold text-[#D9A441] uppercase tracking-wider mb-1">
                      {book.region}
                    </div>
                    <h2 className="text-xl font-serif font-bold text-[#F5F1E8] mb-2 group-hover:text-[#D9A441] transition-colors leading-snug">
                      {book.title}
                    </h2>
                    <p className="text-sm text-[#C5C9CC] leading-relaxed line-clamp-3">
                      {book.subtitle}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-[#34302A] bg-[#151B20]/60 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-[#C5C9CC]">
                    <span>{book.chapters.length} Chapters</span>
                    {book.readTime && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {book.readTime}
                        </span>
                      </>
                    )}
                  </div>
                  <span className="text-xs text-[#D9A441] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Read Story →</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Historical Archive Codex Entries (Primary Artifacts & Sites) */}
      <section className="pt-6 border-t border-[#34302A] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#F5F1E8] flex items-center gap-2">
              <Sparkles size={20} className="text-[#D9A441]" />
              Historical Evidence Codex ({filteredArchiveEntries.length})
            </h2>
            <p className="text-xs md:text-sm text-[#C5C9CC]">
              Primary artifacts, inscriptions, and sites documented across the 14 levels—distinguishing verified evidence from ongoing research.
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#151B20] border border-[#34302A] text-[#D9A441]">
            {unlockedArtifacts.length} Discovered in Gameplay
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredArchiveEntries.map(item => {
            const isDiscovered = unlockedArtifacts.includes(item.id);
            const title = t(`library.entry.${item.id}.title`, item.id.replace(/_/g, ' '));
            const known = t(`library.entry.${item.id}.known`, '');
            const cert = certaintyLevels.find(c => c.id === item.certainty);

            return (
              <div
                key={item.id}
                onClick={() => setSelectedArchiveItem(item)}
                className="bg-[#101519] border border-[#34302A] hover:border-[#D9A441] rounded-2xl p-5 cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-[#151B20] border border-[#34302A] flex items-center justify-center text-2xl">
                      {item.icon}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#151B20] border border-[#34302A] text-[#D9A441]">
                        Level {item.level} • {item.period}
                      </span>
                      {isDiscovered && (
                        <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle size={11} /> Discovered
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="font-bold font-serif text-base text-[#F5F1E8] group-hover:text-[#D9A441] transition-colors mb-1">
                    {title}
                  </h3>
                  <p className="text-xs text-[#C5C9CC] line-clamp-2 leading-relaxed">{known}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#34302A] flex items-center justify-between text-xs">
                  {cert && (
                    <span className={`font-bold text-[10px] uppercase ${cert.color}`}>
                      {t(cert.labelKey, cert.id.replace(/_/g, ' '))}
                    </span>
                  )}
                  <span className="text-[#D9A441] font-bold ml-auto flex items-center gap-1">
                    Inspect Record <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Archive Entry Detail Modal */}
      {selectedArchiveItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedArchiveItem(null)}
        >
          <div
            className="w-full max-w-2xl bg-[#101519] border border-[#D9A441]/50 rounded-3xl p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedArchiveItem(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#151B20] border border-[#34302A] text-[#C5C9CC] hover:text-[#F5F1E8]"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-[#151B20] border border-[#D9A441]/40 flex items-center justify-center text-4xl shrink-0">
                {selectedArchiveItem.icon}
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#D9A441] mb-1">
                  Level {selectedArchiveItem.level} • {selectedArchiveItem.period} •{' '}
                  {selectedArchiveItem.region}
                </div>
                <h2 className="text-2xl font-serif font-bold text-[#F5F1E8]">
                  {t(
                    `library.entry.${selectedArchiveItem.id}.title`,
                    selectedArchiveItem.id.replace(/_/g, ' ')
                  )}
                </h2>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="p-4 rounded-xl bg-[#151B20] border border-[#34302A]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#D9A441] mb-1">
                  {t('library.section.known', 'What We Know')}
                </h4>
                <p className="text-[#F5F1E8] leading-relaxed">
                  {t(`library.entry.${selectedArchiveItem.id}.known`, '')}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#151B20] border border-[#34302A]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1.5">
                  <ShieldAlert size={13} />{' '}
                  {t('library.section.evidence', 'How Historians Know This')}
                </h4>
                <p className="text-[#C5C9CC] leading-relaxed">
                  {t(`library.entry.${selectedArchiveItem.id}.evidence`, '')}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#151B20] border border-[#34302A]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                  {t('library.section.debated', 'What Remains Uncertain or Debated')}
                </h4>
                <p className="text-[#C5C9CC] leading-relaxed">
                  {t(`library.entry.${selectedArchiveItem.id}.debated`, '')}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#34302A] flex flex-wrap justify-between items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  const itemTitle = t(
                    `library.entry.${selectedArchiveItem.id}.title`,
                    selectedArchiveItem.id
                  );
                  navigate(`/ai-guide?q=${encodeURIComponent(itemTitle)}`);
                }}
                className="px-4 py-2.5 rounded-xl bg-[#D9A441] text-[#070A0C] font-bold text-xs flex items-center gap-2"
              >
                <Bot size={15} /> Ask KALA About This Entry
              </button>
              <button
                type="button"
                onClick={() => setSelectedArchiveItem(null)}
                className="px-4 py-2.5 rounded-xl bg-[#151B20] border border-[#34302A] text-[#F5F1E8] font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeritageLibraryPage;
