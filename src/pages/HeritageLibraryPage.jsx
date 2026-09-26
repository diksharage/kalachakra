import React, { useState } from 'react';
import { libraryCategories, libraryBooks } from '../data/libraryContent';
import { BookOpen, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBackground } from '../context/BackgroundContext';

const HeritageLibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const { setBgType } = useBackground();

  React.useEffect(() => {
    setBgType('library');
  }, [setBgType]);

  const filteredBooks = libraryBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory ? book.categoryId === selectedCategory : true;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif font-bold gold-gradient-text mb-2">Heritage Library</h1>
          <p className="text-content/70">Explore the vast knowledge archives of ancient Indian civilizations.</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/50" />
          <input 
            type="text" 
            placeholder="Search the archives..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-main/80 border border-gold/30 rounded-xl py-4 pl-12 pr-4 text-content focus:outline-none focus:border-gold transition-colors"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
        <button 
          onClick={() => setSelectedCategory(null)}
          className={`shrink-0 px-6 py-2 rounded-full border transition-all ${!selectedCategory ? 'bg-gold text-[#171B3A] border-gold' : 'bg-main/80 border-content/20 hover:border-gold/50'}`}
        >
          All Categories
        </button>
        {libraryCategories.map(cat => (
          <button 
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`shrink-0 px-6 py-2 rounded-full border transition-all flex items-center gap-2 ${selectedCategory === cat.id ? 'bg-gold text-[#171B3A] border-gold' : 'bg-main/80 border-content/20 hover:border-gold/50'}`}
          >
            <span>{cat.icon}</span> {cat.title}
          </button>
        ))}
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map(book => (
          <div 
            key={book.id} 
            onClick={() => navigate(`/library/${book.categoryId}/${book.id}`)}
            className="glass-panel p-6 rounded-2xl border border-gold/30 hover:shadow-[0_0_20px_rgba(212,166,74,0.2)] hover:-translate-y-1 transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-[#171B3A] transition-colors">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-gold uppercase tracking-wider">{book.period}</span>
            </div>
            
            <h3 className="font-serif font-bold text-xl mb-2 text-content">{book.title}</h3>
            <p className="text-sm text-content/70 mb-6 line-clamp-3">{book.excerpt}</p>
            
            <div className="flex justify-between items-center mt-auto border-t border-content/10 pt-4">
              <span className="text-xs text-content/50">By {book.author}</span>
              <span className="text-xs text-gold font-bold group-hover:underline">Read Story â†’</span>
            </div>
          </div>
        ))}
      </div>
      
      {filteredBooks.length === 0 && (
        <div className="text-center py-20 opacity-50">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-gold" />
          <p>No texts found in the archives matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default HeritageLibraryPage;



