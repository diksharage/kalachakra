import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  X,
  LayoutDashboard,
  Compass,
  Search,
  Bot,
  BookOpen,
  Trophy,
  User,
  Map,
  Package,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [isTabletExpanded, setIsTabletExpanded] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Journey', path: '/journey', icon: Map },
    { name: 'Heritage Map', path: '/explore', icon: Compass },
    { name: 'Investigations', path: '/investigations', icon: Search },
    { name: 'KALA Companion', path: '/ai-guide', icon: Bot, highlight: true },
    { name: 'Heritage Library', path: '/library', icon: BookOpen },
    { name: 'Inventory', path: '/inventory', icon: Package },
    { name: 'Achievements', path: '/achievements', icon: Trophy },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/75 z-40 md:hidden backdrop-blur-sm animate-fade-in"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 h-screen bg-[#090C0F] border-r border-gold/20 flex flex-col p-3 sm:p-4 transform transition-all duration-300 ${
          isOpen
            ? 'translate-x-0 w-72 max-w-[85vw] shadow-2xl'
            : '-translate-x-full md:translate-x-0'
        } ${
          isTabletExpanded ? 'md:w-64' : 'md:w-20 lg:w-64'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-[#B77B2E] flex items-center justify-center shrink-0 shadow-md">
              <span className="text-[#070A0C] font-serif font-bold text-lg">K</span>
            </div>
            <div className={`transition-opacity duration-200 ${isTabletExpanded ? 'block' : 'hidden lg:block'}`}>
              <h1 className="text-lg font-serif font-bold gold-gradient-text tracking-wider leading-none">
                KALACHAKRA
              </h1>
              <span className="text-[10px] text-[#C5C9CC]/60 tracking-widest uppercase block mt-0.5">
                History & Heritage
              </span>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            type="button"
            onClick={onClose}
            className="md:hidden p-2 rounded-xl text-[#C5C9CC]/70 hover:text-white hover:bg-[#151B20] transition-colors"
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto no-scrollbar pb-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const label = t('nav.' + item.name.toLowerCase().replace(/ /g, '_'), item.name);

            return (
              <NavLink
                key={item.name}
                onClick={onClose}
                to={item.path}
                title={label}
                data-tutorial={item.name === 'Journey' ? 'nav-journey' : item.name === 'AI Guide' ? 'nav-kala' : undefined}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group min-h-[44px] ${
                    isActive
                      ? 'bg-[#151B20] text-gold border border-gold/40 shadow-[0_0_15px_rgba(217,164,65,0.15)] font-bold'
                      : 'text-[#C5C9CC]/70 hover:bg-[#101519] hover:text-[#F5F1E8] border border-transparent'
                  } ${isTabletExpanded ? 'justify-start' : 'justify-center lg:justify-start'}`
                }
              >
                <Icon className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${item.highlight ? 'text-gold' : ''}`} />
                <span
                  className={`text-sm truncate transition-opacity duration-200 ${
                    isTabletExpanded ? 'inline' : 'hidden lg:inline'
                  }`}
                >
                  {label}
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Settings & Tablet Toggle */}
        <div className="mt-auto pt-3 border-t border-gold/20 flex flex-col gap-2">
          {/* Tablet Collapse/Expand Toggle (hidden on mobile and desktop) */}
          <button
            type="button"
            onClick={() => setIsTabletExpanded(!isTabletExpanded)}
            className="hidden md:flex lg:hidden items-center justify-center p-2 rounded-xl bg-[#101519] hover:bg-[#151B20] text-[#C5C9CC] hover:text-gold transition-colors text-xs"
            title={isTabletExpanded ? 'Collapse Sidebar' : 'Expand Sidebar'}
            aria-label={isTabletExpanded ? 'Collapse Sidebar' : 'Expand Sidebar'}
          >
            {isTabletExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>

          <NavLink
            to="/settings"
            onClick={onClose}
            title={t('nav.settings', 'Settings')}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors min-h-[44px] ${
                isActive
                  ? 'bg-[#151B20] text-gold border border-gold/40'
                  : 'text-[#C5C9CC]/70 hover:bg-[#101519] hover:text-[#F5F1E8]'
              } ${isTabletExpanded ? 'justify-start' : 'justify-center lg:justify-start'}`
            }
          >
            <Settings className="w-5 h-5 shrink-0" />
            <span
              className={`text-sm font-medium truncate ${
                isTabletExpanded ? 'inline' : 'hidden lg:inline'
              }`}
            >
              {t('nav.settings', 'Settings')}
            </span>
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
