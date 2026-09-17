import { ChevronRight } from 'lucide-react';
import { CryptoItem, CommodityItem } from '../types';

interface CryptoAndCommoditiesGridProps {
  cryptoList: CryptoItem[];
  commoditiesList: CommodityItem[];
  onSelectCrypto: (crypto: CryptoItem) => void;
  onSelectCommodity: (commodity: CommodityItem) => void;
  onOpenFuturesMarket: () => void;
}

export const CryptoAndCommoditiesGrid = ({
  cryptoList,
  commoditiesList,
  onSelectCrypto,
  onSelectCommodity,
  onOpenFuturesMarket,
}: CryptoAndCommoditiesGridProps) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4" data-purpose="crypto-commodities-composite">
      {/* Left Column: Crypto Highlights */}
      <div id="crypto-section" className="space-y-4">
        <div className="flex items-center justify-between">
          <a
            href="#crypto-section"
            className="inline-flex items-center gap-2 group cursor-pointer"
          >
            <h2 className="text-2xl font-bold tracking-tight text-[#131722] group-hover:text-[#2962FF] transition-colors">
              Crypto
            </h2>
            <ChevronRight className="w-5 h-5 text-[#131722] group-hover:text-[#2962FF] group-hover:translate-x-1 transition-all" />
          </a>
          <span className="text-xs text-[#787B86]">
            Market Cap: <span className="font-bold text-[#131722]">$2.45T</span> (+2.1%)
          </span>
        </div>

        <div className="bg-white border border-[#E0E3EB] rounded-2xl overflow-hidden tv-shadow-card divide-y divide-gray-100">
          {cryptoList.map((coin) => (
            <div
              key={coin.symbol}
              onClick={() => onSelectCrypto(coin)}
              className="p-4 flex items-center justify-between hover:bg-[#F8FAFC] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full ${coin.iconBg} text-white font-bold flex items-center justify-center text-sm shadow-xs`}
                >
                  {coin.iconSymbol}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[#131722] group-hover:text-[#2962FF] transition-colors">
                      {coin.name}
                    </span>
                    <span className="text-xs text-[#787B86] font-mono">{coin.symbol}</span>
                  </div>
                  <div className="text-xs text-[#787B86]">Vol: {coin.volume}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold font-mono text-sm text-[#131722]">
                  ${coin.price >= 1 ? coin.price.toLocaleString('en-US', { minimumFractionDigits: 2 }) : coin.price.toFixed(4)}
                </div>
                <div
                  className={`text-xs font-bold ${
                    coin.isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                  }`}
                >
                  {coin.isPositive ? '+' : ''}
                  {coin.changePercent.toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Futures & Commodities */}
      <div id="futures-section" className="space-y-4">
        <div className="flex items-center justify-between">
          <a
            href="#futures-section"
            className="inline-flex items-center gap-2 group cursor-pointer"
          >
            <h2 className="text-2xl font-bold tracking-tight text-[#131722] group-hover:text-[#2962FF] transition-colors">
              Futures &amp; Commodities
            </h2>
            <ChevronRight className="w-5 h-5 text-[#131722] group-hover:text-[#2962FF] group-hover:translate-x-1 transition-all" />
          </a>
          <button
            onClick={onOpenFuturesMarket}
            className="text-xs font-semibold text-[#2962FF] hover:underline cursor-pointer"
          >
            Full Futures Market
          </button>
        </div>

        <div className="bg-white border border-[#E0E3EB] rounded-2xl overflow-hidden tv-shadow-card divide-y divide-gray-100">
          {commoditiesList.map((item) => (
            <div
              key={item.symbol}
              onClick={() => onSelectCommodity(item)}
              className="p-4 flex items-center justify-between hover:bg-[#F8FAFC] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full ${item.badgeColor} font-bold flex items-center justify-center text-xs shadow-xs`}
                >
                  {item.badgeText}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[#131722] group-hover:text-[#2962FF] transition-colors">
                      {item.name}
                    </span>
                    <span className="text-xs text-[#787B86] font-mono">{item.ticker}</span>
                  </div>
                  <div className="text-xs text-[#787B86]">
                    {item.exchange} • {item.unit}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold font-mono text-sm text-[#131722]">
                  ${item.price >= 10 ? item.price.toLocaleString('en-US', { minimumFractionDigits: 2 }) : item.price.toFixed(3)}
                </div>
                <div
                  className={`text-xs font-bold ${
                    item.isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                  }`}
                >
                  {item.isPositive ? '+' : ''}
                  {item.changePercent.toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
