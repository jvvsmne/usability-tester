import { useState, useMemo } from 'react';
import { ChevronRight, ArrowUpDown } from 'lucide-react';
import { StockItem, StockTab } from '../types';

interface USStocksSectionProps {
  stocks: StockItem[];
  onSelectStock: (stock: StockItem) => void;
  onOpenScreener: () => void;
}

export const USStocksSection = ({
  stocks,
  onSelectStock,
  onOpenScreener,
}: USStocksSectionProps) => {
  const [activeTab, setActiveTab] = useState<StockTab>('Large cap');
  const [sortField, setSortField] = useState<'price' | 'changePercent' | 'marketCap' | null>(null);
  const [sortAsc, setSortAsc] = useState(false);

  const tabs: StockTab[] = ['Large cap', 'Most active', 'Gainers', 'Losers'];

  // Filter and sort stocks
  const displayedStocks = useMemo(() => {
    let filtered = stocks.filter((s) => s.category === activeTab);
    if (filtered.length < 4) {
      filtered = stocks;
    }

    if (sortField) {
      return [...filtered].sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];
        if (typeof valA === 'string') valA = parseFloat(valA.replace(/[^0-9.-]/g, '')) || 0;
        if (typeof valB === 'string') valB = parseFloat(valB.replace(/[^0-9.-]/g, '')) || 0;
        return sortAsc ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
      });
    }

    return filtered;
  }, [stocks, activeTab, sortField, sortAsc]);

  // Top 6 cards for the quick ticker grid
  const tickerCards = useMemo(() => {
    return stocks.filter((s) => s.category === 'Large cap').slice(0, 6);
  }, [stocks]);

  const handleSort = (field: 'price' | 'changePercent' | 'marketCap') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const renderRatingBadge = (rating: StockItem['analystRating']) => {
    switch (rating) {
      case 'Strong Buy':
        return <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 rounded font-semibold">Strong Buy</span>;
      case 'Buy':
        return <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded font-semibold">Buy</span>;
      case 'Hold':
        return <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded font-semibold">Hold</span>;
      case 'Sell':
      case 'Strong Sell':
        return <span className="bg-red-50 text-red-700 text-xs px-2 py-0.5 rounded font-semibold">Sell</span>;
      default:
        return null;
    }
  };

  return (
    <section id="us-stocks-section" className="space-y-5 pt-6" data-purpose="us-stocks-section">
      <div className="flex items-center justify-between">
        <a
          href="#us-stocks-section"
          className="inline-flex items-center gap-2 group cursor-pointer"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#131722] group-hover:text-[#2962FF] transition-colors">
            US stocks
          </h2>
          <ChevronRight className="w-6 h-6 text-[#131722] group-hover:text-[#2962FF] group-hover:translate-x-1 transition-all" />
        </a>

        {/* Stock sub-tabs */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#131722] text-white shadow-xs'
                  : 'hover:bg-gray-100 text-[#787B86] hover:text-[#131722]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Ticker Stocks Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {tickerCards.map((stock) => (
          <div
            key={stock.symbol}
            onClick={() => onSelectStock(stock)}
            className="p-3.5 rounded-2xl border border-[#E0E3EB] hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer bg-white group"
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-7 h-7 rounded-md ${stock.badgeBg} ${stock.badgeTextColor} font-black text-xs flex items-center justify-center`}
              >
                {stock.badge}
              </div>
              <span
                className={`text-xs font-mono font-bold ${
                  stock.isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                }`}
              >
                {stock.isPositive ? '+' : ''}
                {stock.changePercent.toFixed(2)}%
              </span>
            </div>
            <div className="mt-2.5 font-bold text-sm text-[#131722] group-hover:text-[#2962FF] transition-colors">
              {stock.symbol}
            </div>
            <div className="text-xs text-[#787B86] truncate">{stock.name}</div>
            <div className="mt-2 font-semibold text-sm text-[#131722] font-mono">
              ${stock.price.toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* High Fidelity Stocks Table with Sparklines */}
      <div className="bg-white border border-[#E0E3EB] rounded-2xl overflow-hidden tv-shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#F8FAFC] border-b border-[#E0E3EB] text-[11px] font-semibold text-[#787B86] uppercase tracking-wider select-none">
              <tr>
                <th className="py-3 px-4" scope="col">Company</th>
                <th
                  onClick={() => handleSort('price')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-[#131722]"
                  scope="col"
                >
                  <div className="inline-flex items-center gap-1">
                    <span>Price</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('changePercent')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-[#131722]"
                  scope="col"
                >
                  <div className="inline-flex items-center gap-1">
                    <span>Change %</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 text-right" scope="col">Volume</th>
                <th
                  onClick={() => handleSort('marketCap')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-[#131722]"
                  scope="col"
                >
                  <div className="inline-flex items-center gap-1">
                    <span>Market Cap</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 text-center" scope="col">Trend (7D)</th>
                <th className="py-3 px-4 text-center" scope="col">Analyst Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {displayedStocks.map((stock) => {
                // Generate path for sparkline
                const points = stock.sparkline;
                const pathData = points
                  .map((val, idx) => {
                    const x = (idx / (points.length - 1)) * 100;
                    return `${idx === 0 ? 'M' : 'L'}${x.toFixed(0)},${val}`;
                  })
                  .join(' ');

                return (
                  <tr
                    key={stock.symbol}
                    onClick={() => onSelectStock(stock)}
                    className="hover:bg-[#F8FAFC] transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-4 flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full ${stock.badgeBg} ${stock.badgeTextColor} flex items-center justify-center font-bold text-xs`}
                      >
                        {stock.badge}
                      </div>
                      <div>
                        <div className="font-bold text-[#131722] group-hover:text-[#2962FF] transition-colors">
                          {stock.symbol}
                        </div>
                        <div className="text-xs text-[#787B86]">{stock.name}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-[#131722]">
                      ${stock.price.toFixed(2)}
                    </td>
                    <td
                      className={`py-3 px-4 text-right font-mono font-semibold ${
                        stock.isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {stock.isPositive ? '+' : ''}
                      {stock.changePercent.toFixed(2)}%
                    </td>
                    <td className="py-3 px-4 text-right text-[#787B86] font-mono">
                      {stock.volume}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-[#131722]">
                      {stock.marketCap}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <svg className="w-24 h-6 mx-auto" fill="none" viewBox="0 0 100 24">
                        <path
                          d={pathData}
                          stroke={stock.isPositive ? '#089981' : '#F23645'}
                          strokeLinecap="round"
                          strokeWidth="1.8"
                        />
                      </svg>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {renderRatingBadge(stock.analystRating)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="p-3 bg-gray-50 text-center border-t border-[#E0E3EB]">
          <button
            onClick={onOpenScreener}
            className="text-xs font-semibold text-[#2962FF] hover:underline cursor-pointer"
          >
            Launch US Stock Screener with 50+ Filters &amp; Metrics →
          </button>
        </div>
      </div>
    </section>
  );
};
