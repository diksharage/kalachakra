import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSelectionScreen = () => {
  const { setLanguage } = useLanguage();

  const handleSelect = (lang) => {
    setLanguage(lang);
  };

  return (
    <div className="min-h-screen bg-main bg-[url('/pattern.svg')] flex items-center justify-center p-4">
      <div className="glass-panel p-8 md:p-12 rounded-3xl max-w-md w-full border border-gold/30 text-center animate-fade-in shadow-2xl">
        <Globe className="w-16 h-16 text-gold mx-auto mb-6" />
        <h1 className="text-3xl font-serif font-bold gold-gradient-text mb-2">
          Choose Your Language
        </h1>
        <p className="text-content/70 mb-8">Select your preferred language to begin</p>

        <div className="space-y-4">
          <button 
            onClick={() => handleSelect('en')}
            className="w-full p-4 bg-surface/50 border border-gold/30 hover:border-gold hover:bg-gold/10 rounded-xl flex items-center justify-between group transition-all"
          >
            <span className="text-2xl">ðŸ‡¬ðŸ‡§</span>
            <span className="text-xl font-bold text-content group-hover:text-gold transition-colors">English</span>
            <span className="opacity-0 group-hover:opacity-100 text-gold">â†’</span>
          </button>

          <button 
            onClick={() => handleSelect('hi')}
            className="w-full p-4 bg-surface/50 border border-gold/30 hover:border-gold hover:bg-gold/10 rounded-xl flex items-center justify-between group transition-all"
          >
            <span className="text-2xl">ðŸ‡®ðŸ‡³</span>
            <span className="text-xl font-bold text-content group-hover:text-gold transition-colors">हिन्दी</span>
            <span className="opacity-0 group-hover:opacity-100 text-gold">â†’</span>
          </button>

          <button 
            onClick={() => handleSelect('te')}
            className="w-full p-4 bg-surface/50 border border-gold/30 hover:border-gold hover:bg-gold/10 rounded-xl flex items-center justify-between group transition-all"
          >
            <span className="text-2xl">ðŸ‡®ðŸ‡³</span>
            <span className="text-xl font-bold text-content group-hover:text-gold transition-colors">తెలుగు</span>
            <span className="opacity-0 group-hover:opacity-100 text-gold">â†’</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelectionScreen;




