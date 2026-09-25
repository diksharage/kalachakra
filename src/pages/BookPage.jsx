import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { libraryBooks, libraryCategories } from '../data/libraryContent';
import { ArrowLeft, BookOpen } from 'lucide-react';

const BookPage = () => {
  const { categoryId, bookId } = useParams();
  const navigate = useNavigate();

  const book = libraryBooks.find(b => b.id === bookId);
  const category = libraryCategories.find(c => c.id === categoryId);

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-center">
        <BookOpen className="w-16 h-16 text-gold opacity-50 mb-4" />
        <h2 className="text-2xl font-serif font-bold text-content">Text Lost to Time</h2>
        <p className="text-content/70 mt-2">The archives could not locate this document.</p>
        <button onClick={() => navigate('/library')} className="mt-6 text-gold hover:underline">
          Return to Library
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <button 
        onClick={() => navigate('/library')}
        className="flex items-center gap-2 text-gold font-bold text-sm mb-8 hover:-translate-x-1 transition-transform"
      >
        <ArrowLeft className="w-4 h-4" /> BACK TO LIBRARY
      </button>

      <div className="glass-panel p-8 md:p-12 rounded-2xl border border-gold/30 shadow-2xl relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <BookOpen className="w-64 h-64" />
        </div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{category?.icon}</span>
                <span className="text-xs font-bold text-gold uppercase tracking-wider">{category?.title}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-content leading-tight mb-4">{book.title}</h1>
              <p className="text-content/60 font-serif italic text-lg">{book.excerpt}</p>
            </div>
            
            <div className="bg-main/80 border border-content/10 p-4 rounded-xl shrink-0 min-w-[200px]">
              <div className="text-xs text-content/50 uppercase mb-1">Author / Source</div>
              <div className="font-bold text-content mb-4">{book.author}</div>
              
              <div className="text-xs text-content/50 uppercase mb-1">Historical Period</div>
              <div className="font-bold text-gold">{book.period}</div>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-gold/50 via-[#C56A3D]/20 to-transparent mb-10" />

          {/* Book Content */}
          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:text-gold prose-p:text-content/90 prose-p:leading-relaxed">
            <p>{book.content}</p>
          </div>
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C56A3D]/20 to-[#D4A64A]/50 mt-12 mb-8" />

          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <button 
              onClick={() => navigate('/challenges')}
              className="w-full sm:w-auto px-8 py-3 bg-gold text-[#171B3A] font-bold rounded-lg shadow-lg hover:shadow-[#D4A64A]/40 transition-all"
            >
              TEST YOUR KNOWLEDGE
            </button>
            <button 
              onClick={() => navigate(`/ai-guide?q=Tell me more about ${encodeURIComponent(book.title)}`)}
              className="w-full sm:w-auto px-8 py-3 border-2 border-gold text-gold font-bold rounded-lg hover:bg-gold/10 transition-all"
            >
              ASK AI GUIDE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPage;



