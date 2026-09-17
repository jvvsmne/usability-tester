import { useState, useMemo } from 'react';
import { X, SlidersHorizontal, ArrowUpRight, TrendingUp, TrendingDown, CheckCircle2 } from 'lucide-react';
import { WorldIndex, StockItem, EconomicEvent } from '../types';

// ==================== 1. Stock Screener Modal ====================
interface ScreenerModalProps {
  isOpen: boolean;
  onClose: () => void;
  stocks: StockItem[];
  onSelectStock: (stock: StockItem) => void;
}

export const StockScreenerModal = ({ isOpen, onClose, stocks, onSelectStock }: ScreenerModalProps) => {
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [ratingFilter, setRatingFilter] = useState<string>('All');

  const sectors = useMemo(() => {
    const set = new Set(stocks.map((s) => s.sector));
    return ['All', ...Array.from(set)];
  }, [stocks]);

  const filtered = useMemo(() => {
    return stocks.filter((s) => {
      const matchSector = selectedSector === 'All' || s.sector === selectedSector;
      const matchRating = ratingFilter === 'All' || s.analystRating === ratingFilter;
      return matchSector && matchRating;
    });
  }, [stocks, selectedSector, ratingFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-[#E0E3EB] flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#E0E3EB] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#2962FF]/10 text-[#2962FF] flex items-center justify-center">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#131722]">US Stock Screener</h3>
              <p className="text-xs text-[#787B86]">Filter over 8,000+ US public equities by fundamental metrics</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-[#787B86] hover:text-[#131722] rounded-full hover:bg-gray-100 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-4 bg-[#F8FAFC] border-b border-[#E0E3EB] flex flex-wrap gap-4 items-center">
          <div>
            <label className="text-xs font-semibold text-[#787B86] block mb-1">Sector</label>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="text-xs font-medium bg-white border border-[#E0E3EB] rounded-lg px-3 py-1.5 outline-hidden"
            >
              {sectors.map((sec) => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#787B86] block mb-1">Analyst Consensus</label>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="text-xs font-medium bg-white border border-[#E0E3EB] rounded-lg px-3 py-1.5 outline-hidden"
            >
              <option value="All">All Ratings</option>
              <option value="Strong Buy">Strong Buy</option>
              <option value="Buy">Buy</option>
              <option value="Hold">Hold</option>
              <option value="Sell">Sell</option>
            </select>
          </div>

          <div className="ml-auto text-xs text-[#787B86] self-end pb-1 font-mono">
            Showing {filtered.length} matched equities
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto p-4">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="text-[11px] font-semibold text-[#787B86] uppercase border-b border-gray-100 pb-2">
              <tr>
                <th className="pb-2">Company</th>
                <th className="pb-2">Sector</th>
                <th className="pb-2 text-right">Price</th>
                <th className="pb-2 text-right">24h Chg</th>
                <th className="pb-2 text-right">P/E</th>
                <th className="pb-2 text-right">Market Cap</th>
                <th className="pb-2 text-center">Analyst</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((stock) => (
                <tr
                  key={stock.symbol}
                  onClick={() => {
                    onSelectStock(stock);
                    onClose();
                  }}
                  className="hover:bg-[#F0F3FA] transition-colors cursor-pointer"
                >
                  <td className="py-2.5 flex items-center gap-2">
                    <span className="font-bold text-[#131722]">{stock.symbol}</span>
                    <span className="text-xs text-[#787B86] truncate max-w-[150px]">{stock.name}</span>
                  </td>
                  <td className="py-2.5 text-xs text-[#787B86]">{stock.sector}</td>
                  <td className="py-2.5 text-right font-mono font-bold text-[#131722]">${stock.price.toFixed(2)}</td>
                  <td className={`py-2.5 text-right font-mono text-xs font-semibold ${stock.isPositive ? 'text-[#089981]' : 'text-[#F23645]'}`}>
                    {stock.isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </td>
                  <td className="py-2.5 text-right font-mono text-xs text-[#787B86]">{stock.peRatio ? stock.peRatio.toFixed(1) : '-'}</td>
                  <td className="py-2.5 text-right font-mono text-xs text-[#131722]">{stock.marketCap}</td>
                  <td className="py-2.5 text-center text-xs">
                    <span className="bg-gray-100 text-[#131722] px-2 py-0.5 rounded font-medium">{stock.analystRating}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ==================== 2. World Indices Modal ====================
interface WorldIndicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  worldIndices: WorldIndex[];
  onSelectIndex: (index: WorldIndex) => void;
}

export const WorldIndicesModal = ({ isOpen, onClose, worldIndices, onSelectIndex }: WorldIndicesModalProps) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const regions = ['All', 'Americas', 'Europe', 'Asia-Pacific', 'Middle East & Africa'];

  const filtered = useMemo(() => {
    if (selectedRegion === 'All') return worldIndices;
    return worldIndices.filter((idx) => idx.region === selectedRegion);
  }, [worldIndices, selectedRegion]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[#E0E3EB] max-h-[85vh] flex flex-col overflow-hidden">
        <div className="p-5 border-b border-[#E0E3EB] flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-[#131722]">Global World Indices</h3>
            <p className="text-xs text-[#787B86]">Real-time valuations across Americas, EMEA, and Asia-Pacific equity benchmarks</p>
          </div>
          <button onClick={onClose} className="p-2 text-[#787B86] hover:text-[#131722] rounded-full hover:bg-gray-100 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2 p-3 bg-[#F8FAFC] border-b border-[#E0E3EB] overflow-x-auto no-scrollbar">
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                selectedRegion === reg ? 'bg-[#131722] text-white' : 'text-[#787B86] hover:text-[#131722]'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 divide-y divide-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filtered.map((item) => (
              <div
                key={item.symbol}
                onClick={() => {
                  onSelectIndex(item);
                  onClose();
                }}
                className="p-3.5 rounded-xl border border-[#E0E3EB] hover:border-[#2962FF] hover:bg-[#F0F3FA] transition-all cursor-pointer flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-sm text-[#131722]">{item.name}</div>
                  <div className="text-xs text-[#787B86]">{item.symbol} • {item.country}</div>
                  <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded mt-1 inline-block">{item.region}</span>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm font-bold text-[#131722]">{item.price.toLocaleString()}</div>
                  <div className={`text-xs font-bold ${item.isPositive ? 'text-[#089981]' : 'text-[#F23645]'}`}>
                    {item.isPositive ? '+' : ''}{item.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== 3. Forex Heatmap Modal ====================
interface ForexHeatmapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ForexHeatmapModal = ({ isOpen, onClose }: ForexHeatmapModalProps) => {
  if (!isOpen) return null;

  const currencies = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF'];
  const matrix: Record<string, Record<string, number>> = {
    USD: { USD: 0, EUR: -0.11, JPY: 0.45, GBP: -0.05, AUD: 0.28, CAD: 0.18, CHF: 0.22 },
    EUR: { USD: 0.11, EUR: 0, JPY: 0.56, GBP: 0.06, AUD: 0.39, CAD: 0.29, CHF: 0.33 },
    JPY: { USD: -0.45, EUR: -0.56, JPY: 0, GBP: -0.50, AUD: -0.17, CAD: -0.27, CHF: -0.23 },
    GBP: { USD: 0.05, EUR: -0.06, JPY: 0.50, GBP: 0, AUD: 0.33, CAD: 0.23, CHF: 0.27 },
    AUD: { USD: -0.28, EUR: -0.39, JPY: 0.17, GBP: -0.33, AUD: 0, CAD: -0.10, CHF: -0.06 },
    CAD: { USD: -0.18, EUR: -0.29, JPY: 0.27, GBP: -0.23, AUD: 0.10, CAD: 0, CHF: 0.04 },
    CHF: { USD: -0.22, EUR: -0.33, JPY: 0.23, GBP: -0.27, AUD: 0.06, CAD: -0.04, CHF: 0 },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[#E0E3EB] p-5">
        <div className="flex items-center justify-between pb-4 border-b border-[#E0E3EB]">
          <div>
            <h3 className="font-bold text-lg text-[#131722]">Forex Currency Heatmap</h3>
            <p className="text-xs text-[#787B86]">Relative strength matrix across G7 major currency pairs</p>
          </div>
          <button onClick={onClose} className="p-2 text-[#787B86] hover:text-[#131722] rounded-full hover:bg-gray-100 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr>
                <th className="p-2 text-xs font-bold text-[#787B86] bg-gray-50 border border-gray-200">Base / Quote</th>
                {currencies.map((c) => (
                  <th key={c} className="p-2 text-xs font-bold text-[#131722] bg-gray-50 border border-gray-200">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currencies.map((base) => (
                <tr key={base}>
                  <td className="p-2 text-xs font-bold text-[#131722] bg-gray-50 border border-gray-200">{base}</td>
                  {currencies.map((quote) => {
                    if (base === quote) {
                      return <td key={quote} className="p-2 text-xs font-mono text-gray-300 bg-gray-100 border border-gray-200">—</td>;
                    }
                    const val = matrix[base][quote];
                    const isPos = val > 0;
                    const intensity = Math.min(1, Math.abs(val) / 0.6);
                    const bgClass = isPos ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800';
                    return (
                      <td key={quote} className={`p-2 text-xs font-mono font-semibold border border-gray-200 ${bgClass}`}>
                        {isPos ? '+' : ''}{val.toFixed(2)}%
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ==================== 4. Yield Curve Modal ====================
interface YieldCurveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const YieldCurveModal = ({ isOpen, onClose }: YieldCurveModalProps) => {
  if (!isOpen) return null;

  const maturities = [
    { label: '1M', yield: 4.85 },
    { label: '3M', yield: 4.62 },
    { label: '6M', yield: 4.45 },
    { label: '1Y', yield: 4.30 },
    { label: '2Y', yield: 4.15 },
    { label: '5Y', yield: 4.08 },
    { label: '10Y', yield: 4.242 },
    { label: '30Y', yield: 4.51 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E0E3EB] p-5">
        <div className="flex items-center justify-between pb-4 border-b border-[#E0E3EB]">
          <div>
            <h3 className="font-bold text-lg text-[#131722]">US Treasury Yield Curve</h3>
            <p className="text-xs text-[#787B86]">Current sovereign fixed income curve showing 2Y/10Y inversion dynamics</p>
          </div>
          <button onClick={onClose} className="p-2 text-[#787B86] hover:text-[#131722] rounded-full hover:bg-gray-100 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6">
          <div className="flex items-end justify-between gap-2 h-48 px-4 border-b border-gray-200 pb-2">
            {maturities.map((m) => {
              const heightPercent = ((m.yield - 3.5) / 1.6) * 100;
              return (
                <div key={m.label} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[11px] font-mono font-bold text-[#131722]">{m.yield.toFixed(2)}%</span>
                  <div
                    style={{ height: `${Math.max(20, heightPercent)}%` }}
                    className="w-full max-w-[36px] bg-[#2962FF] rounded-t-lg group-hover:bg-[#1E53E5] transition-colors"
                  />
                  <span className="text-xs font-bold text-[#787B86]">{m.label}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-[#787B86]">
            <span>Short End (Policy Sensitive)</span>
            <span>Long End (Inflation &amp; Growth)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== 5. Economic Calendar Modal ====================
interface EconomicCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: EconomicEvent[];
}

export const EconomicCalendarModal = ({ isOpen, onClose, events }: EconomicCalendarModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[#E0E3EB] max-h-[85vh] flex flex-col overflow-hidden">
        <div className="p-5 border-b border-[#E0E3EB] flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-[#131722]">Global Economic Calendar</h3>
            <p className="text-xs text-[#787B86]">Key macroeconomic releases, interest rate decisions, and central bank speeches</p>
          </div>
          <button onClick={onClose} className="p-2 text-[#787B86] hover:text-[#131722] rounded-full hover:bg-gray-100 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 divide-y divide-gray-100">
          {events.map((ev) => (
            <div key={ev.id} className="py-3.5 flex items-center justify-between hover:bg-[#F8FAFC] px-3 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{ev.flag}</span>
                <div>
                  <div className="font-bold text-sm text-[#131722]">{ev.title}</div>
                  <div className="text-xs text-[#787B86]">{ev.date} • {ev.time}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-right">
                <div className="text-xs font-mono">
                  <div className="text-[#131722] font-semibold">Forecast: {ev.est}</div>
                  <div className="text-[#787B86]">Previous: {ev.prev}</div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-md font-bold ${ev.impactColor}`}>
                  {ev.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==================== 6. Get Started / Auth Modal ====================
interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GetStartedModal = ({ isOpen, onClose }: GetStartedModalProps) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#E0E3EB] p-6 text-center">
        <div className="flex justify-end">
          <button onClick={onClose} className="p-1 text-[#787B86] hover:text-[#131722] rounded-full cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-6 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#089981] mx-auto" />
            <h3 className="font-bold text-xl text-[#131722]">Welcome to TradingView!</h3>
            <p className="text-xs text-[#787B86]">
              A verification magic link has been dispatched to <span className="font-semibold text-[#131722]">{email}</span>.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 bg-[#131722] text-white rounded-full text-xs font-semibold hover:bg-black transition-colors cursor-pointer"
            >
              Continue exploring markets
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#2962FF]/10 text-[#2962FF] flex items-center justify-center mx-auto">
              <ArrowUpRight className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-2xl text-[#131722]">Get Started Free</h3>
            <p className="text-xs text-[#787B86]">
              Join over 60+ million traders. Build watchlists, set real-time price alerts, and run custom Pine Script™ strategies.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubmitted(true);
              }}
              className="space-y-3 pt-2"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#E0E3EB] outline-hidden focus:border-[#2962FF]"
              />
              <button
                type="submit"
                className="w-full gradient-btn text-white text-sm font-semibold py-3 rounded-xl transition-all shadow-md active:scale-98 cursor-pointer"
              >
                Sign up with Email
              </button>
            </form>

            <div className="text-[11px] text-[#787B86]">
              By proceeding, you agree to our Terms of Use and Privacy Policy.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== 7. Compare Modal ====================
interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCompare: (symbol: string) => void;
}

export const CompareModal = ({ isOpen, onClose, onSelectCompare }: CompareModalProps) => {
  if (!isOpen) return null;

  const compareOptions = [
    { symbol: 'NDX', name: 'Nasdaq 100', color: '#0091FF' },
    { symbol: 'DJI', name: 'Dow Jones Industrial 30', color: '#00B4D8' },
    { symbol: 'BTC', name: 'Bitcoin (Crypto)', color: '#F7931A' },
    { symbol: 'GC1!', name: 'Gold Continuous Contract', color: '#D97706' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', color: '#76B900' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#E0E3EB] p-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#E0E3EB]">
          <h3 className="font-bold text-base text-[#131722]">Compare Symbol</h3>
          <button onClick={onClose} className="p-1 text-[#787B86] hover:text-[#131722] rounded-full cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-[#787B86] mt-2 mb-4">
          Overlay a relative benchmark on the current S&amp;P 500 performance baseline (% scale):
        </p>
        <div className="space-y-2">
          {compareOptions.map((opt) => (
            <button
              key={opt.symbol}
              onClick={() => {
                onSelectCompare(opt.symbol);
                onClose();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-[#E0E3EB] hover:bg-[#F0F3FA] transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: opt.color }} />
                <div>
                  <span className="font-bold text-sm text-[#131722]">{opt.symbol}</span>
                  <div className="text-xs text-[#787B86]">{opt.name}</div>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#2962FF]">Compare +</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==================== 8. Indicators Modal ====================
interface IndicatorsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IndicatorsModal = ({ isOpen, onClose }: IndicatorsModalProps) => {
  const [activeIndicators, setActiveIndicators] = useState<string[]>(['SMA 20', 'Volume']);

  if (!isOpen) return null;

  const indicators = [
    { name: 'SMA 20', desc: 'Simple Moving Average (20 periods)' },
    { name: 'EMA 50', desc: 'Exponential Moving Average (50 periods)' },
    { name: 'Bollinger Bands', desc: 'Volatility bands with 2 std deviations' },
    { name: 'RSI 14', desc: 'Relative Strength Index momentum oscillator' },
    { name: 'Volume', desc: 'Historical trading volume histogram' },
    { name: 'MACD', desc: 'Moving Average Convergence Divergence' },
  ];

  const toggleIndicator = (name: string) => {
    setActiveIndicators((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#E0E3EB] p-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#E0E3EB]">
          <h3 className="font-bold text-base text-[#131722]">Technical Indicators</h3>
          <button onClick={onClose} className="p-1 text-[#787B86] hover:text-[#131722] rounded-full cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-[#787B86] mt-2 mb-4">
          Select overlays to apply to the active chart:
        </p>
        <div className="space-y-2">
          {indicators.map((ind) => {
            const isEnabled = activeIndicators.includes(ind.name);
            return (
              <div
                key={ind.name}
                onClick={() => toggleIndicator(ind.name)}
                className="flex items-center justify-between p-3 rounded-xl border border-[#E0E3EB] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
              >
                <div>
                  <div className="font-bold text-sm text-[#131722]">{ind.name}</div>
                  <div className="text-xs text-[#787B86]">{ind.desc}</div>
                </div>
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                    isEnabled
                      ? 'bg-[#2962FF] border-[#2962FF] text-white'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {isEnabled && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#131722] hover:bg-black text-white text-xs font-semibold rounded-xl cursor-pointer"
          >
            Apply to Chart
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== 9. SuperCharts Modal ====================
interface SuperChartsModalProps {
  isOpen: boolean;
  onClose: () => void;
  indexName: string;
}

export const SuperChartsModal = ({ isOpen, onClose, indexName }: SuperChartsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-[#E0E3EB] flex flex-col h-[75vh] overflow-hidden">
        <div className="p-4 border-b border-[#E0E3EB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-base text-[#131722]">SuperCharts Pro</span>
            <span className="text-xs bg-[#2962FF]/10 text-[#2962FF] font-semibold px-2 py-0.5 rounded">
              {indexName}
            </span>
          </div>
          <button onClick={onClose} className="p-1 text-[#787B86] hover:text-[#131722] rounded-full cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 bg-[#131722] p-6 flex flex-col items-center justify-center text-center text-white relative">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-4 text-[#2962FF]">
            <TrendingUp className="w-8 h-8 text-[#089981]" />
          </div>
          <h4 className="text-2xl font-bold mb-2">SuperCharts Full Screen Engine</h4>
          <p className="text-xs text-gray-400 max-w-md mb-6 leading-relaxed">
            Loaded dynamic canvas renderer with multi-pane indicators, Fibonacci retracements, order book depth, and live candlestick streaming for {indexName}.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-[#2962FF] hover:bg-[#1E53E5] text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              Return to Overview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
