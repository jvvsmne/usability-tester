import { useState } from 'react';
import { Search, Globe, User, ChevronDown, Check } from 'lucide-react';

interface GlobalHeaderProps {
  onOpenSearch: () => void;
  onGetStarted: () => void;
  activeNav?: string;
  onSelectNav?: (nav: string) => void;
}

export const GlobalHeader = ({
  onOpenSearch,
  onGetStarted,
  activeNav = 'Markets',
  onSelectNav,
}: GlobalHeaderProps) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');

  const languages = [
    { code: 'EN', name: 'English (US)' },
    { code: 'ES', name: 'Español' },
    { code: 'DE', name: 'Deutsch' },
    { code: 'FR', name: 'Français' },
    { code: 'JA', name: '日本語' },
    { code: 'ZH', name: '繁體中文' },
  ];

  const moreItems = [
    { title: 'News & Insights', desc: 'Real-time financial editorial' },
    { title: 'Pine Script™', desc: 'Code custom indicators & strategies' },
    { title: 'Community Ideas', desc: 'Trading setups & technical analysis' },
    { title: 'Desktop & Mobile Apps', desc: 'Cross-platform market alerts' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E0E3EB]" data-purpose="global-header">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Logo & Search Bar & Nav */}
        <div className="flex items-center gap-6">
          {/* TradingView Official Iconmark SVG */}
          <a
            aria-label="TradingView Home"
            className="flex items-center group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <svg
              className="w-9 h-7 text-black fill-current group-hover:opacity-80 transition-opacity"
              fill="none"
              viewBox="0 0 36 28"
            >
              <path d="M7.05 0H0v28h7.05V0z" fill="currentColor"></path>
              <path d="M21.15 0h-7.05v28h7.05V0z" fill="currentColor"></path>
              <path d="M35.25 0h-7.05v28h7.05V0z" fill="currentColor"></path>
              <path d="M0 0l14.1 28h7.05L7.05 0H0z" fill="currentColor"></path>
            </svg>
          </a>

          {/* Search Input Pill */}
          <div className="relative hidden sm:block w-52 md:w-64">
            <button
              onClick={onOpenSearch}
              className="w-full h-10 bg-[#F0F3FA] hover:bg-[#E4E7EE] transition-colors rounded-full flex items-center px-4 gap-2.5 text-[#787B86] text-sm font-normal text-left cursor-pointer group"
              type="button"
            >
              <Search className="w-4 h-4 text-[#787B86] group-hover:text-[#131722] transition-colors" />
              <span className="truncate">Search (Ctrl+K)</span>
            </button>
          </div>

          {/* Desktop Navigation Items */}
          <nav className="hidden lg:flex items-center space-x-7 text-[15px] font-medium tracking-tight">
            {['Products', 'Community', 'Markets', 'Brokers'].map((item) => {
              const isActive = activeNav === item;
              return (
                <button
                  key={item}
                  onClick={() => onSelectNav && onSelectNav(item)}
                  className={`transition-colors py-5 inline-block cursor-pointer relative ${
                    isActive
                      ? 'text-[#2962FF] font-semibold'
                      : 'text-[#131722] hover:text-[#2962FF]'
                  }`}
                >
                  {item}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#2962FF] rounded-t-sm" />
                  )}
                </button>
              );
            })}

            {/* More Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                onBlur={() => setTimeout(() => setShowMoreMenu(false), 200)}
                className="cursor-pointer flex items-center gap-1 text-[#131722] hover:text-[#2962FF] transition-colors py-5"
              >
                <span>More</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {showMoreMenu && (
                <div className="absolute top-14 left-0 w-64 bg-white border border-[#E0E3EB] rounded-2xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  {moreItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 hover:bg-[#F0F3FA] rounded-xl cursor-pointer transition-colors"
                      onClick={() => setShowMoreMenu(false)}
                    >
                      <div className="text-sm font-semibold text-[#131722]">{item.title}</div>
                      <div className="text-xs text-[#787B86]">{item.desc}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right: International, Profile & CTA */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Mobile search button */}
          <button
            onClick={onOpenSearch}
            className="sm:hidden p-2 text-[#787B86] hover:text-[#131722] rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              onBlur={() => setTimeout(() => setShowLangMenu(false), 200)}
              className="flex items-center gap-1.5 text-sm font-medium text-[#131722] hover:bg-gray-100 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              title="Change Language"
            >
              <Globe className="w-4 h-4 text-[#434651]" />
              <span>{currentLang}</span>
            </button>

            {showLangMenu && (
              <div className="absolute right-0 top-11 w-44 bg-white border border-[#E0E3EB] rounded-xl shadow-lg p-1.5 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang.code);
                      setShowLangMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg text-left transition-colors ${
                      currentLang === lang.code
                        ? 'bg-[#F0F3FA] font-semibold text-[#2962FF]'
                        : 'text-[#131722] hover:bg-gray-50'
                    }`}
                  >
                    <span>{lang.name}</span>
                    {currentLang === lang.code && <Check className="w-3.5 h-3.5 text-[#2962FF]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Avatar Placeholder Button */}
          <button
            onClick={onGetStarted}
            className="p-2 hover:bg-gray-100 text-[#131722] rounded-full transition-colors cursor-pointer"
            title="User Profile / Sign In"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Main Action CTA */}
          <button
            onClick={onGetStarted}
            className="gradient-btn text-white text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-full transition-all shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
          >
            Get started
          </button>
        </div>
      </div>
    </header>
  );
};
