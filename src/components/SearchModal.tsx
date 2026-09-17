import { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, TrendingUp, TrendingDown } from 'lucide-react';
import { IndexItem, StockItem, CryptoItem, CommodityItem, ForexItem } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  indices: IndexItem[];
  stocks: StockItem[];
  crypto: CryptoItem[];
  commodities: CommodityItem[];
  forex: ForexItem[];
  onSelectItem: (item: { type: string; data: unknown }) => void;
}

export const SearchModal = ({
  isOpen,
  onClose,
  indices,
  stocks,
  crypto,
  commodities,
  forex,
  onSelectItem,
}: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Stocks' | 'Crypto' | 'Indices' | 'Commodities' | 'Forex'>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    const q = query.toLowerCase().trim();

    const results: {
      type: 'Stocks' | 'Crypto' | 'Indices' | 'Commodities' | 'Forex';
      symbol: string;
      name: string;
      price: number | string;
      change: number;
      isPositive: boolean;
      raw: unknown;
    }[] = [];

    // Indices
    if (activeFilter === 'All' || activeFilter === 'Indices') {
      indices.forEach((idx) => {
        if (!q || idx.name.toLowerCase().includes(q) || idx.symbol.toLowerCase().includes(q) || idx.shortCode.toLowerCase().includes(q)) {
          results.push({
            type: 'Indices',
            symbol: idx.symbol,
            name: idx.name,
            price: idx.price.toLocaleString(),
            change: idx.changePercent,
            isPositive: idx.isPositive,
            raw: idx,
          });
        }
      });
    }

    // Stocks
    if (activeFilter === 'All' || activeFilter === 'Stocks') {
      stocks.forEach((s) => {
        if (!q || s.name.toLowerCase().includes(q) || s.symbol.toLowerCase().includes(q)) {
          results.push({
            type: 'Stocks',
            symbol: s.symbol,
            name: s.name,
            price: `$${s.price.toFixed(2)}`,
            change: s.changePercent,
            isPositive: s.isPositive,
            raw: s,
          });
        }
      });
    }

    // Crypto
    if (activeFilter === 'All' || activeFilter === 'Crypto') {
      crypto.forEach((c) => {
        if (!q || c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q)) {
          results.push({
            type: 'Crypto',
            symbol: c.symbol,
            name: c.name,
            price: `$${c.price.toLocaleString()}`,
            change: c.changePercent,
            isPositive: c.isPositive,
            raw: c,
          });
        }
      });
    }

    // Commodities
    if (activeFilter === 'All' || activeFilter === 'Commodities') {
      commodities.forEach((cm) => {
        if (!q || cm.name.toLowerCase().includes(q) || cm.ticker.toLowerCase().includes(q)) {
          results.push({
            type: 'Commodities',
            symbol: cm.ticker,
            name: cm.name,
            price: `$${cm.price.toFixed(2)}`,
            change: cm.changePercent,
            isPositive: cm.isPositive,
            raw: cm,
          });
        }
      });
    }

    // Forex
    if (activeFilter === 'All' || activeFilter === 'Forex') {
      forex.forEach((f) => {
        if (!q || f.pair.toLowerCase().includes(q) || f.name.toLowerCase().includes(q)) {
          results.push({
            type: 'Forex',
            symbol: f.pair,
            name: f.name,
            price: f.rate.toFixed(4),
            change: f.changePercent,
            isPositive: f.isPositive,
            raw: f,
          });
        }
      });
    }

    return results.slice(0, 15);
  }, [query, activeFilter, indices, stocks, crypto, commodities, forex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/40 backdrop-blur-xs">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E0E3EB] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-[#E0E3EB]">
          <Search className="w-5 h-5 text-[#787B86] mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbol, company, crypto, index (e.g. NVDA, BTC, S&P 500)..."
            className="w-full text-base bg-transparent border-none outline-hidden text-[#131722] placeholder-[#787B86]"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#787B86] hover:text-[#131722] rounded-full cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-xs font-mono bg-gray-100 text-[#787B86] px-2 py-1 rounded">ESC</span>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-gray-100 bg-[#F8FAFC] overflow-x-auto no-scrollbar">
          {(['All', 'Stocks', 'Crypto', 'Indices', 'Commodities', 'Forex'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`text-xs px-3 py-1 rounded-full transition-colors cursor-pointer ${
                activeFilter === tab
                  ? 'bg-[#131722] text-white font-semibold'
                  : 'text-[#787B86] hover:text-[#131722] hover:bg-gray-200/60'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="max-h-[380px] overflow-y-auto divide-y divide-gray-100 p-2">
          {searchResults.length === 0 ? (
            <div className="py-12 text-center text-[#787B86] text-sm">
              No matching instruments found for "{query}".
            </div>
          ) : (
            searchResults.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onSelectItem({ type: item.type, data: item.raw });
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F0F3FA] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700 uppercase font-mono">
                    {item.type}
                  </span>
                  <div>
                    <div className="font-bold text-sm text-[#131722] group-hover:text-[#2962FF] transition-colors">
                      {item.symbol}
                    </div>
                    <div className="text-xs text-[#787B86]">{item.name}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono text-sm font-semibold text-[#131722]">{item.price}</div>
                  <div
                    className={`text-xs font-semibold flex items-center justify-end gap-0.5 ${
                      item.isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}
                  >
                    {item.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {item.isPositive ? '+' : ''}
                    {item.change.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[#F8FAFC] border-t border-[#E0E3EB] flex items-center justify-between text-xs text-[#787B86]">
          <span>Select an asset to inspect or plot on the main chart</span>
          <span className="font-mono">Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
