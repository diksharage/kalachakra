import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, LayoutDashboard, Compass, Search, Target, Hammer, Bot, BookOpen, Trophy, User, Map, Package } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { useLanguage } from '../../context/LanguageContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { logoutUser } = useGame();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Journey', path: '/journey', icon: Map },
    { name: 'Explore', path: '/explore', icon: Compass },
    { name: 'Investigations', path: '/investigations', icon: Search },
    { name: 'Quests', path: '/quests', icon: Target },
    { name: 'Build', path: '/builder', icon: Hammer },
    { name: 'AI Guide', path: '/ai-guide', icon: Bot },
    { name: 'Heritage Library', path: '/library', icon: BookOpen },
    { name: 'Inventory', path: '/inventory', icon: Package },
    { name: 'Achievements', path: '/achievements', icon: Trophy },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm animate-fade-in" onClick={onClose} />}
      <div className={`fixed md:static inset-y-0 left-0 z-50 w-64 h-screen bg-main border-r border-gold/20 flex flex-col p-4 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-terracotta flex items-center justify-center">
            <span className="text-[#171B3A] font-serif font-bold text-lg">K</span>
          </div>
          <h1 className="text-xl font-serif font-bold gold-gradient-text tracking-wider">KALACHAKRA</h1>
          <button onClick={onClose} className="md:hidden ml-auto p-1 hover:bg-surface rounded-lg text-content/70 hover:text-content">
            <X size={20}/>
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar pb-10">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              onClick={onClose} 
              to={item.path} 
              data-tutorial={item.name === 'Journey' ? 'nav-journey' : item.name === 'AI Guide' ? 'nav-kala' : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-surface text-gold border border-gold/30 shadow-[0_0_10px_rgba(212,166,74,0.1)]'
                    : 'text-content/70 hover:bg-surface/50 hover:text-content'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{t('nav.' + item.name.toLowerCase().replace(/ /g, '_'), item.name)}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t border-gold/20">
          <button className="flex items-center gap-3 px-3 py-2 w-full text-left text-content/70 hover:text-content transition-colors rounded-lg hover:bg-surface/50">
            <span className="font-medium text-sm">Settings</span>
          </button>
          <button onClick={() => { logoutUser(); onClose && onClose(); }} className="flex items-center gap-3 px-3 py-2 mt-2 w-full text-left text-red-400 hover:text-red-300 transition-colors rounded-lg hover:bg-red-900/20">
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
