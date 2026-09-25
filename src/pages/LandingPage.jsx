import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Compass, Book, Hammer, Trophy, Map, Brain, Shield, Gamepad2, ArrowRight, Sun, Moon } from 'lucide-react';

const LandingPage = () => {
  const { t } = useLanguage();

  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-main text-content font-sans selection:bg-gold selection:text-main flex flex-col transition-colors duration-300">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between p-4 md:px-8 md:py-6 max-w-7xl mx-auto w-full border-b border-gold/20 sticky top-0 bg-main/90 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-terracotta flex items-center justify-center">
            <span className="text-main font-serif font-bold text-xl">K</span>
          </div>
          <span className="font-serif font-bold text-2xl gold-gradient-text tracking-widest hidden md:block">KALACHAKRA</span>
        </div>
        <div className="flex gap-4 md:gap-6 items-center text-sm font-bold tracking-wider">
          <button onClick={toggleTheme} className="p-2 hover:bg-surface rounded-full transition-colors text-gold">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <a href="#how-it-works" className="hidden sm:block hover:text-gold transition-colors">{t('nav.howItWorks')}</a>
          <a href="#journey-preview" className="hidden sm:block hover:text-gold transition-colors">Journey Preview</a>
          <button 
            onClick={() => navigate('/auth')}
            className="hover:text-gold transition-colors"
          >
            {t('common.login')}
          </button>
          <button 
            onClick={() => navigate('/auth')}
            className="px-6 py-2 bg-transparent border-2 border-gold text-gold rounded hover:bg-gold hover:text-[#171B3A] transition-colors duration-300 shadow-lg shadow-gold/30 hidden md:block"
          >
            {t('nav.startJourney')}
          </button>
        </div>
      </nav>

      {/* 2. & 3. PUBLIC LANDING PAGE & HERO VISUAL */}
      <div className="relative flex flex-col items-center justify-center text-center px-4 py-24 md:py-32 overflow-hidden">
        {/* Background decorations - Symbolic Heritage Pattern */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-surface/20 rounded-full blur-[100px] -z-10 pointer-events-none" />
        <div className="absolute top-10 left-10 text-9xl opacity-5">ðŸ›ï¸</div>
        <div className="absolute bottom-10 right-10 text-9xl opacity-5">ðŸº</div>
        <div className="absolute top-40 right-20 text-7xl opacity-5">ðŸ“œ</div>
        <div className="absolute bottom-40 left-20 text-7xl opacity-5">â™Ÿï¸</div>
        
        <h2 className="text-gold font-bold tracking-[0.3em] uppercase mb-4">AI-Powered Civilization & Heritage Game</h2>
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-wide drop-shadow-lg text-content">
          KALACHAKRA
        </h1>
        <p className="text-2xl md:text-3xl text-content font-serif italic mb-12 opacity-90">
          "Play the Past. Build the Future."
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <button 
            onClick={() => navigate('/auth')}
            className="px-8 py-4 bg-gradient-to-r from-gold to-terracotta text-[#171B3A] font-bold text-lg rounded shadow-xl shadow-gold/40 hover:shadow-2xl shadow-gold/60 transition-all duration-300 transform hover:-translate-y-1"
          >
            START YOUR JOURNEY
          </button>
          <a 
            href="#what-can-you-explore"
            className="px-8 py-4 bg-transparent border border-content/30 text-content font-bold text-lg rounded hover:bg-[#F5E8CC]/10 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            EXPLORE KALACHAKRA <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* 4. PRODUCT INTRODUCTION */}
      <section className="py-20 px-4 text-center max-w-4xl mx-auto border-t border-gold/10">
        <h2 className="text-3xl font-serif font-bold gold-gradient-text mb-6">YOUR JOURNEY THROUGH HISTORY</h2>
        <p className="text-lg md:text-xl text-content/80 leading-relaxed">
          KALACHAKRA turns the exploration of history and culture into an interactive journey. Discover communities, build settlements, explore civilizations, solve challenges, understand traditions, play heritage-inspired games and create your own preservation legacy.
        </p>
      </section>

      {/* 5. GAMEPLAY LOOP */}
      <section id="how-it-works" className="py-24 bg-surface/20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold gold-gradient-text mb-12">HOW YOU PLAY</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <LoopCard title="EXPLORE" desc="Discover places, environments and historical settings." />
            <LoopCard title="DISCOVER" desc="Find artifacts, resources, stories and cultural clues." />
            <LoopCard title="LEARN" desc="Understand the people, practices and context behind them." />
            <LoopCard title="PLAY" desc="Interact with strategy, puzzles, simulations and mini-games." />
            <LoopCard title="SOLVE" desc="Make decisions and complete challenges." />
            <LoopCard title="BUILD" desc="Develop settlements, heritage spaces and systems." />
            <LoopCard title="PRESERVE" desc="Document and protect cultural knowledge." />
            <LoopCard title="UNLOCK" desc="Continue your journey through time." />
          </div>
        </div>
      </section>

      {/* 6. WHAT CAN YOU EXPLORE? */}
      <section id="what-can-you-explore" className="py-24 px-4 max-w-6xl mx-auto border-t border-gold/10">
        <h2 className="text-3xl font-serif font-bold gold-gradient-text text-center mb-16">WHAT CAN YOU EXPLORE?</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard icon="ðŸº" title="CIVILIZATIONS" desc="Explore historical communities and urban traditions." />
          <FeatureCard icon="ðŸ—ºï¸" title="TRADE & JOURNEYS" desc="Discover how goods, people and ideas moved." />
          <FeatureCard icon="ðŸ›ï¸" title="ARCHITECTURE" desc="Explore construction, engineering and heritage spaces." />
          <FeatureCard icon="ðŸ“œ" title="KNOWLEDGE" desc="Discover mathematics, astronomy, literature and learning traditions." />
          <FeatureCard icon="ðŸŽ­" title="CULTURE" desc="Explore music, dance, crafts, festivals and traditions." />
          <FeatureCard icon="ðŸŽ²" title="TRADITIONAL GAMES" desc="Experience strategy, skill and community through game-inspired activities." />
        </div>
      </section>

      {/* 7. THE 14-LEVEL JOURNEY */}
      <section id="journey-preview" className="py-24 bg-main px-4 relative overflow-hidden">
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-[#D4A64A]/30 to-transparent hidden lg:block" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold gold-gradient-text mb-4">THE 14-LEVEL JOURNEY</h2>
            <p className="text-content/70 max-w-2xl mx-auto text-lg">Explore different periods, communities, regions and traditions across a changing historical landscape.</p>
          </div>
          
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-x-16 gap-y-8">
            {[
              "Early Human Communities", "Early Farming Communities", "Indus Civilization", 
              "Early Indian Trade Networks", "Mahajanapadas & Early Kingdoms", "Mauryan Empire", 
              "Gupta Period & Knowledge", "Indian Architecture & Engineering", "Indian Cultural Traditions", 
              "Chola & Regional Civilizations", "Vijayanagara & Medieval Heritage", "Stories, Literature & Folk Arts", 
              "Traditional Indian Games", "Preserve the Legacy"
            ].map((level, idx) => (
              <div key={idx} className={`glass-panel p-6 rounded-xl border border-gold/30 flex items-center gap-4 hover:border-gold transition-colors ${idx % 2 === 0 ? 'lg:text-right lg:flex-row-reverse' : ''}`}>
                <div className="text-3xl font-serif font-bold text-gold/30 w-12 shrink-0">{String(idx + 1).padStart(2, '0')}</div>
                <h3 className="font-bold text-content text-lg">{level}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PERSONALIZED EXPERIENCE */}
      <section className="py-24 px-4 bg-surface/10 border-y border-gold/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif font-bold gold-gradient-text text-center mb-6">YOUR JOURNEY, YOUR WAY</h2>
          <p className="text-center text-content/70 max-w-2xl mx-auto mb-16 text-lg">Your player type changes how KALACHAKRA guides your journey â€” not what you are allowed to explore.</p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <TypeCard icon="ðŸ§­" title="Explorer" desc="Discover places, artifacts and stories." />
            <TypeCard icon="â™Ÿï¸" title="Strategist" desc="Plan resources, trade and decisions." />
            <TypeCard icon="ðŸ“œ" title="Historian" desc="Investigate evidence and historical context." />
            <TypeCard icon="ðŸ›ï¸" title="Builder" desc="Create settlements, structures and heritage spaces." />
          </div>
        </div>
      </section>

      {/* 9. AGE-ADAPTIVE EXPERIENCE */}
      <section className="py-24 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-serif font-bold gold-gradient-text text-center mb-6">DESIGNED TO GROW WITH YOU</h2>
        <p className="text-center text-content/70 max-w-2xl mx-auto mb-16 text-lg">Historical ideas can be explored at different levels of complexity.</p>
        
        <div className="space-y-4">
          <AgeRow age="6â€“8" desc="Stories, visuals and simple exploration" />
          <AgeRow age="9â€“11" desc="Challenges, discovery and basic strategy" />
          <AgeRow age="12â€“14" desc="Strategy and historical reasoning" />
          <AgeRow age="15â€“17" desc="Evidence, decisions and deeper challenges" />
          <AgeRow age="18+" desc="Simulation and research-oriented exploration" />
        </div>
      </section>

      {/* 10. MEET KALA & 12. EVIDENCE */}
      <section className="py-24 bg-main px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* KALA */}
          <div className="glass-panel p-10 rounded-3xl border border-gold/20">
            <h2 className="text-3xl font-serif font-bold gold-gradient-text mb-6">MEET KALA</h2>
            <p className="text-content/80 text-lg leading-relaxed mb-8">
              KALA is your in-game guide, helping you understand discoveries, challenges and historical context throughout your journey. An adaptive in-game guide that evolves with your age and player type.
            </p>
            <button className="px-6 py-3 bg-transparent border border-gold text-gold rounded hover:bg-gold hover:text-[#171B3A] transition-colors font-bold">
              MEET KALA
            </button>
          </div>
          
          {/* Evidence */}
          <div className="glass-panel p-10 rounded-3xl border border-gold/20">
            <h2 className="text-3xl font-serif font-bold text-green-400 mb-6">DISCOVER. QUESTION. UNDERSTAND.</h2>
            <p className="text-content/80 text-lg leading-relaxed mb-4">
              Historical knowledge comes from many kinds of evidence. KALACHAKRA distinguishes archaeological evidence, written records, oral traditions, literary traditions and historical interpretation wherever appropriate.
            </p>
            <p className="text-content/60 italic">
              Some historical questions remain debated. The game avoids presenting uncertain interpretations as absolute facts.
            </p>
          </div>
        </div>
      </section>

      {/* 11. CULTURAL DIVERSITY */}
      <section className="py-24 px-4 bg-surface/20 border-y border-gold/10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold gold-gradient-text mb-6">ONE JOURNEY. MANY TRADITIONS.</h2>
          <p className="text-lg text-content/80 leading-relaxed mb-12 max-w-3xl mx-auto">
            KALACHAKRA does not treat culture as one single story. It explores regional traditions, changing communities, different forms of knowledge and multiple ways cultural practices have been transmitted.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Languages", "Arts", "Architecture", "Music", "Dance", "Food Traditions", "Festivals", "Games", "Stories", "Crafts"].map(tag => (
              <span key={tag} className="px-6 py-3 bg-main border border-content/20 rounded-full text-content font-bold hover:border-gold transition-colors">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 13. PRESERVE THE LEGACY */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNENEE2NEEiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold gold-gradient-text mb-6 leading-tight">THE JOURNEY DOESN'T END WITH DISCOVERY.</h2>
          <p className="text-xl text-content/80 leading-relaxed mb-12">
            After exploring civilizations, knowledge, culture, stories and games, you create your own heritage-preservation project.
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-4 font-bold tracking-widest text-gold mb-12">
            <span>DOCUMENT</span> <ArrowRight className="w-4 h-4 opacity-50" />
            <span>BUILD</span> <ArrowRight className="w-4 h-4 opacity-50" />
            <span>SHARE</span> <ArrowRight className="w-4 h-4 opacity-50" />
            <span>PRESERVE</span>
          </div>
          
          <button 
            onClick={() => navigate('/auth')}
            className="px-8 py-4 bg-transparent border-2 border-gold text-gold font-bold text-lg rounded shadow-[0_0_20px_rgba(212,166,74,0.2)] hover:bg-gold hover:text-[#171B3A] transition-all duration-300"
          >
            EXPLORE THE LEGACY
          </button>
        </div>
      </section>

      {/* 14. FINAL CALL TO ACTION */}
      <section className="py-24 bg-gradient-to-b from-main to-surface px-4 text-center border-t border-gold/30">
        <h2 className="text-4xl font-serif font-bold text-content mb-6">READY TO ENTER THE KALACHAKRA?</h2>
        <p className="text-xl text-content/70 mb-12 italic max-w-2xl mx-auto">Explore the past. Discover the stories. Build your legacy.</p>
        <button 
          onClick={() => navigate('/auth')}
          className="px-10 py-5 bg-gradient-to-r from-gold to-terracotta text-[#171B3A] font-bold text-xl rounded-xl shadow-[0_0_30px_rgba(212,166,74,0.5)] hover:shadow-[0_0_40px_rgba(212,166,74,0.8)] transition-all duration-300 transform hover:-translate-y-2"
        >
          START YOUR JOURNEY
        </button>
      </section>

      {/* 16. FOOTER */}
      <footer className="bg-main pt-16 pb-8 px-4 border-t border-gold/20 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-terracotta flex items-center justify-center">
                <span className="text-[#171B3A] font-serif font-bold">K</span>
              </div>
              <span className="font-serif font-bold text-xl gold-gradient-text tracking-widest">KALACHAKRA</span>
            </div>
            <p className="text-content/70 italic">"Play the Past. Build the Future."</p>
          </div>
          
          <div className="flex gap-8 text-sm font-bold text-content/60">
            <a href="#what-can-you-explore" className="hover:text-gold transition-colors">Explore</a>
            <a href="#journey-preview" className="hover:text-gold transition-colors">Journey</a>
            <a href="#how-it-works" className="hover:text-gold transition-colors">About</a>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center border-t border-content/10 pt-8">
          <p className="text-xs text-content/40 tracking-wider">
            An interactive exploration of history, culture and heritage.
          </p>
        </div>
      </footer>
    </div>
  );
};

/* Helper Components */
const LoopCard = ({ title, desc }) => (
  <div className="bg-main p-6 rounded-xl border border-content/10 hover:border-gold transition-all hover:-translate-y-1">
    <h3 className="font-bold text-gold mb-2">{title}</h3>
    <p className="text-sm text-content/70">{desc}</p>
  </div>
);

const FeatureCard = ({ icon, title, desc }) => (
  <div className="glass-panel p-8 rounded-2xl border border-gold/20 hover:border-gold transition-all hover:bg-surface/30 group">
    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-bottom-left">{icon}</div>
    <h3 className="text-xl font-bold text-content mb-3">{title}</h3>
    <p className="text-content/70 leading-relaxed">{desc}</p>
  </div>
);

const TypeCard = ({ icon, title, desc }) => (
  <div className="glass-panel p-6 rounded-xl border border-content/10 text-center hover:border-gold transition-colors">
    <div className="text-4xl mb-3">{icon}</div>
    <h3 className="font-bold text-gold mb-2">{title}</h3>
    <p className="text-sm text-content/70">{desc}</p>
  </div>
);

const AgeRow = ({ age, desc }) => (
  <div className="flex flex-col md:flex-row items-center gap-4 p-4 glass-panel rounded-xl border border-content/10 hover:border-gold/50 transition-colors">
    <div className="w-24 text-center font-bold text-xl text-gold">{age}</div>
    <div className="hidden md:block w-px h-8 bg-gold/30"></div>
    <div className="text-content/90 text-center md:text-left flex-1">{desc}</div>
  </div>
);

export default LandingPage;




