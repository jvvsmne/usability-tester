import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface HeroHeadlineSectionProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export const HeroHeadlineSection = ({
  activeCategory,
  onSelectCategory,
}: HeroHeadlineSectionProps) => {
  const [headline, setHeadline] = useState('Markets, everywhere');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const headlineOptions = [
    'Markets, everywhere',
    'US Markets at a Glance',
    'Crypto & Digital Assets',
    'World Indices Overview',
    'Macro & Fixed Income',
  ];

  const categories = [
    { label: 'Indices', id: 'indices-section' },
    { label: 'US stocks', id: 'us-stocks-section' },
    { label: 'World stocks', id: 'world-indices-section' },
    { label: 'Crypto', id: 'crypto-section' },
    { label: 'Futures', id: 'futures-section' },
    { label: 'Forex', id: 'forex-section' },
    { label: 'Government bonds', id: 'bonds-section' },
    { label: 'Corporate bonds', id: 'bonds-section' },
    { label: 'ETFs', id: 'us-stocks-section' },
    { label: 'Economy', id: 'economy-section' },
  ];

  const handleCategoryClick = (cat: { label: string; id: string }) => {
    onSelectCategory(cat.label);
    const elem = document.getElementById(cat.id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="text-center pt-4 pb-3" data-purpose="hero-title-section">
      {/* Title with dropdown chevron */}
      <div className="relative inline-block">
        <div
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="inline-flex items-center justify-center gap-3 cursor-pointer group select-none"
        >
          <h1 className="text-4xl sm:text-5xl md:text-[54px] font-extrabold tracking-tight text-[#131722]">
            {headline}
          </h1>
          <ChevronDown
            className={`w-7 h-7 sm:w-9 sm:h-9 text-[#131722] stroke-[3] transition-transform duration-200 ${
              dropdownOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'
            }`}
          />
        </div>

        {dropdownOpen && (
          <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-72 bg-white border border-[#E0E3EB] rounded-2xl shadow-xl p-2 z-50 text-left">
            {headlineOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  setHeadline(opt);
                  setDropdownOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm rounded-xl transition-colors cursor-pointer ${
                  headline === opt
                    ? 'bg-[#F0F3FA] text-[#2962FF] font-semibold'
                    : 'text-[#131722] hover:bg-gray-50'
                }`}
              >
                <span>{opt}</span>
                {headline === opt && <Check className="w-4 h-4 text-[#2962FF]" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Markets Nav Pills Ribbon */}
      <div className="mt-8 flex justify-center">
        <nav
          aria-label="Market Categories"
          className="flex items-center gap-1.5 p-1.5 bg-[#F0F3FA] rounded-full overflow-x-auto no-scrollbar max-w-full border border-gray-200/60"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.label;
            return (
              <button
                key={cat.label}
                onClick={() => handleCategoryClick(cat)}
                className={`text-sm px-4 py-2 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#131722] text-white font-semibold shadow-sm'
                    : 'text-[#131722] hover:bg-white/80 font-medium'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </nav>
      </div>
    </section>
  );
};
