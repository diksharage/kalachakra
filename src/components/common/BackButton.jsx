import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const BackButton = ({ fallback = '/dashboard', className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const handleBack = () => {
    // If we have history, navigate back.
    // React Router's location.key is 'default' for the very first page load in a tab
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`flex items-center gap-2 px-4 py-2 bg-surface/50 hover:bg-surface border border-content/10 hover:border-gold rounded-xl transition-all font-medium text-content group ${className} focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-surface`}
      aria-label={t('common.back', 'Back')}
      title={t('common.back', 'Back')}
    >
      <ChevronLeft size={18} className="text-content/60 group-hover:text-gold transition-colors" />
      <span className="hidden sm:inline">{t('common.back', 'Back')}</span>
    </button>
  );
};

export default BackButton;
