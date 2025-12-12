import React from 'react';
import { useLanguage } from '@/hooks/use-language';
import { getTranslation } from './translations';

interface LanguageToggleProps {
  className?: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ className = '' }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`
        flex items-center justify-center 
        w-12 h-12 
        rounded-full 
        bg-black/80 
        border border-cyan-400/30
        text-white 
        font-bold 
        shadow-lg 
        transition-all 
        duration-300 
        hover:shadow-cyan-400/30 
        hover:border-cyan-400/80
        focus:outline-none
        hover:scale-105
        ${className}
      `}
      aria-label="Toggle language"
    >
      {getTranslation('ui.language', language)}
    </button>
  );
};

export default LanguageToggle;
