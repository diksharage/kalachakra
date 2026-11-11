import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { libraryBooks, libraryCategories } from '../data/libraryContent';
import { ArrowLeft, BookOpen, Lightbulb, Sparkles, Clock, Bot, Target } from 'lucide-react';

const BookPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const book = libraryBooks.find(b => b.id === bookId);
  const category = libraryCategories.find(c => c.id === book?.categoryId);

  if (!book) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20 px-4 text-[#F5F1E8]">
        <div className="bg-[#101519] border border-[#34302A] rounded-2xl p-10">
          <BookOpen className="w-12 h-12 text-[#D9A441]/50 mx-auto mb-3" />
          <h2 className="text-2xl font-serif font-bold mb-2">Volume Not Found</h2>
          <p className="text-sm text-[#C5C9CC] mb-6">
            The requested historical volume could not be located in the archive.
          </p>
          <button
            onClick={() => navigate('/library')}
            className="px-6 py-2.5 bg-[#D9A441] text-[#070A0C] font-bold rounded-xl text-sm"
          >
            Return to Heritage Library
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20 space-y-8 p-4 md:p-6 text-[#F5F1E8] animate-fade-in">
      {/* Top Navigation */}
      <button
        onClick={() => navigate('/library')}
        className="inline-flex items-center gap-2 text-sm font-bold text-[#C5C9CC] hover:text-[#D9A441] bg-[#101519] border border-[#34302A] px-4 py-2 rounded-xl transition-colors"
      >
        <ArrowLeft size={16} /> Back to Heritage Library
      </button>

      {/* Book Hero Header */}
      <div
        className={`rounded-3xl p-8 md:p-10 bg-gradient-to-br ${
          category ? category.color : 'from-[#D9A441] to-[#B77B2E]'
        } relative overflow-hidden shadow-2xl border border-[#D9A441]/30`}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-black/40 border border-white/20 flex items-center justify-center text-6xl md:text-7xl shrink-0 shadow-xl">
            {book.coverIcon}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-[#D9A441] border border-[#D9A441]/40">
                <BookOpen size={12} /> {category?.title || 'Heritage Volume'}
              </span>
              {book.period && (
                <span className="px-3 py-1 rounded-full bg-black/50 text-xs font-semibold text-white/90 border border-white/15">
                  {book.period}
                </span>
              )}
              {book.readTime && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/50 text-xs text-white/80 border border-white/15">
                  <Clock size={12} /> {book.readTime}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2 leading-tight drop-shadow">
              {book.title}
            </h1>
            <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-2xl">
              {book.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Chapters */}
      <div className="space-y-6">
        {book.chapters.map((chapter, index) => (
          <article
            key={index}
            className="bg-[#101519] p-6 md:p-8 rounded-2xl border border-[#34302A] shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#34302A]">
              <span className="w-9 h-9 rounded-xl bg-[#D9A441]/15 border border-[#D9A441]/40 flex items-center justify-center text-[#D9A441] font-serif font-bold text-base shrink-0">
                {index + 1}
              </span>
              <h2 className="text-xl md:text-2xl font-serif font-bold text-[#F5F1E8]">
                {chapter.title}
              </h2>
            </div>
            <p className="text-base md:text-[17px] text-[#F5F1E8]/90 leading-relaxed">
              {chapter.content}
            </p>
          </article>
        ))}
      </div>

      {/* Archaeological & Historical Highlights */}
      {book.funFacts && book.funFacts.length > 0 && (
        <div className="bg-[#101519] border border-[#D9A441]/40 rounded-2xl p-6 md:p-8 shadow-lg">
          <div className="flex items-center gap-2.5 mb-5">
            <Lightbulb className="text-[#D9A441] w-6 h-6" />
            <h3 className="text-xl font-serif font-bold text-[#D9A441]">
              Historical Evidence & Key Insights
            </h3>
          </div>
          <ul className="space-y-3">
            {book.funFacts.map((fact, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 bg-[#151B20] p-4 rounded-xl border border-[#34302A]"
              >
                <Sparkles className="w-4 h-4 text-[#D9A441] shrink-0 mt-1" />
                <span className="text-sm md:text-base text-[#F5F1E8]/90 leading-relaxed">
                  {fact}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer Actions */}
      <div className="bg-[#101519] border border-[#34302A] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-serif font-bold text-lg text-[#F5F1E8]">
            Continue Exploring This Topic
          </h4>
          <p className="text-xs md:text-sm text-[#C5C9CC]">
            Ask KALA follow-up questions about {book.title} or test your historical reasoning.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <button
            onClick={() => navigate(`/ai-guide?q=${encodeURIComponent(book.title)}`)}
            className="px-5 py-2.5 rounded-xl bg-[#151B20] border border-[#D9A441]/50 hover:bg-[#D9A441]/15 text-[#D9A441] font-bold text-xs flex items-center gap-2 transition-colors"
          >
            <Bot size={15} /> Ask KALA
          </button>
          <button
            onClick={() => navigate('/quests')}
            className="px-5 py-2.5 rounded-xl bg-[#D9A441] text-[#070A0C] font-bold text-xs flex items-center gap-2 shadow-md hover:bg-[#D9A441]/90 transition-colors"
          >
            <Target size={15} /> Open Quest Board
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookPage;
