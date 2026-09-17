import { useState, useRef, useMemo, MouseEvent } from 'react';
import { ChevronRight, Plus, Activity, ExternalLink } from 'lucide-react';
import { IndexItem, Timeframe, WorldIndex } from '../types';

interface IndicesSectionProps {
  indices: IndexItem[];
  worldIndices: WorldIndex[];
  selectedIndex: IndexItem;
  onSelectIndex: (index: IndexItem) => void;
  onOpenCompare: () => void;
  onOpenIndicators: () => void;
  onOpenSuperCharts: () => void;
  onExploreWorldIndices: () => void;
}

export const IndicesSection = ({
  indices,
  worldIndices,
  selectedIndex,
  onSelectIndex,
  onOpenCompare,
  onOpenIndicators,
  onOpenSuperCharts,
  onExploreWorldIndices,
}: IndicesSectionProps) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('1D');
  const [hoverData, setHoverData] = useState<{ x: number; y: number; time: string; price: number } | null>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const timeframes: Timeframe[] = ['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y', 'ALL'];

  // Current points for chart
  const currentPoints = useMemo(() => {
    const data = selectedIndex.chartData[timeframe] || selectedIndex.chartData['1D'];
    return data;
  }, [selectedIndex, timeframe]);

  // Compute SVG coordinates
  const { minPrice, maxPrice, svgPoints, polylinePoints, polygonPoints, lastPoint } = useMemo(() => {
    if (!currentPoints || currentPoints.length === 0) {
      return { minPrice: 0, maxPrice: 0, svgPoints: [], polylinePoints: '', polygonPoints: '', lastPoint: { x: 700, y: 120 } };
    }

    const prices = currentPoints.map((p) => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const padding = (max - min) * 0.12 || 1;
    const effectiveMin = min - padding;
    const effectiveMax = max + padding;

    const width = 700;
    const height = 240;

    const pts = currentPoints.map((p, idx) => {
      const x = (idx / (currentPoints.length - 1)) * width;
      const normalizedY = (p.price - effectiveMin) / (effectiveMax - effectiveMin);
      const y = height - normalizedY * (height - 30) - 15;
      return { x, y, time: p.time, price: p.price };
    });

    const polyline = pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    const polygon = `0,${height} ${polyline} ${width},${height}`;

    return {
      minPrice: effectiveMin,
      maxPrice: effectiveMax,
      svgPoints: pts,
      polylinePoints: polyline,
      polygonPoints: polygon,
      lastPoint: pts[pts.length - 1],
    };
  }, [currentPoints]);

  const handleMouseMove = (e: MouseEvent<SVGSVGElement>) => {
    if (!chartContainerRef.current || svgPoints.length === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clientX / rect.width));
    const targetIdx = Math.round(ratio * (svgPoints.length - 1));
    const point = svgPoints[targetIdx];
    if (point) {
      setHoverData({
        x: point.x,
        y: point.y,
        time: point.time,
        price: point.price,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoverData(null);
  };

  const displayPrice = hoverData ? hoverData.price : selectedIndex.price;
  const isUp = selectedIndex.isPositive;

  return (
    <section id="indices-section" className="space-y-5" data-purpose="indices-overview">
      {/* Section Title */}
      <div className="flex items-center justify-between">
        <a
          href="#indices-section"
          className="inline-flex items-center gap-2 group cursor-pointer"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#131722] group-hover:text-[#2962FF] transition-colors">
            Indices
          </h2>
          <ChevronRight className="w-6 h-6 text-[#131722] group-hover:text-[#2962FF] group-hover:translate-x-1 transition-all" />
        </a>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-emerald-200/50">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            US Markets Open
          </span>
        </div>
      </div>

      {/* Quick Index Symbol Badges Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {indices.map((idx) => {
          const isSelected = selectedIndex.id === idx.id;
          return (
            <div
              key={idx.id}
              onClick={() => onSelectIndex(idx)}
              className={`transition-all rounded-2xl p-3.5 flex items-center justify-between cursor-pointer ${
                isSelected
                  ? 'bg-[#F0F3FA] border-2 border-[#2962FF]/40 shadow-sm'
                  : 'bg-white border border-[#E0E3EB] hover:bg-[#F8FAFC] hover:border-gray-300 tv-shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-8 h-8 rounded-full ${idx.badgeBg} text-white flex items-center justify-center font-bold text-xs shadow-xs`}
                >
                  {idx.badgeText}
                </span>
                <div>
                  <div className="font-bold text-sm leading-tight text-[#131722]">{idx.name}</div>
                  <div className="text-xs text-[#787B86]">{idx.shortCode}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-sm text-[#131722]">
                  {idx.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <div
                  className={`text-xs font-semibold ${
                    idx.isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                  }`}
                >
                  {idx.isPositive ? '+' : ''}
                  {idx.changePercent.toFixed(2)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Chart + Side Index Table Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Large Interactive Chart Widget Area */}
        <div
          ref={chartContainerRef}
          className="lg:col-span-8 bg-white border border-[#E0E3EB] rounded-2xl p-5 tv-shadow-card flex flex-col justify-between"
          data-purpose="chart-container"
        >
          {/* Chart Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
            <div className="flex items-center gap-3">
              <span
                className={`w-9 h-9 rounded-full ${selectedIndex.badgeBg} text-white flex items-center justify-center font-bold text-sm`}
              >
                {selectedIndex.badgeText}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-[#131722]">{selectedIndex.name}</h3>
                  <span className="text-xs font-mono bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                    {selectedIndex.symbol}
                  </span>
                </div>
                <div className="text-xs text-[#787B86]">
                  {selectedIndex.exchange} • {selectedIndex.currency}
                </div>
              </div>
            </div>

            {/* Timeframe Filter Buttons */}
            <div className="flex items-center bg-[#F0F3FA] rounded-lg p-1 text-xs font-semibold">
              {timeframes.map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    timeframe === tf
                      ? 'bg-white text-[#131722] shadow-sm font-bold'
                      : 'text-[#787B86] hover:text-[#131722]'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Price readout */}
          <div className="py-4 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold tracking-tight text-[#131722]">
              {displayPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span
              className={`text-sm font-bold flex items-center ${
                isUp ? 'text-[#089981]' : 'text-[#F23645]'
              }`}
            >
              {isUp ? '▲' : '▼'} {isUp ? '+' : ''}
              {selectedIndex.change.toFixed(2)} ({isUp ? '+' : ''}
              {selectedIndex.changePercent.toFixed(2)}%)
            </span>
            <span className="text-xs text-[#787B86]">
              {hoverData ? hoverData.time : 'Today'}
            </span>
          </div>

          {/* SVG Area Chart */}
          <div className="relative w-full h-[290px] mt-2 select-none">
            <svg
              className="w-full h-full overflow-visible cursor-crosshair"
              preserveAspectRatio="none"
              viewBox="0 0 700 240"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#2962FF" stopOpacity="0.28" />
                  <stop offset="90%" stopColor="#2962FF" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Horizontal Lines */}
              <line stroke="#F0F3FA" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="700" y1="40" y2="40" />
              <line stroke="#F0F3FA" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="700" y1="100" y2="100" />
              <line stroke="#F0F3FA" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="700" y1="160" y2="160" />
              <line stroke="#F0F3FA" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="700" y1="210" y2="210" />

              {/* Price Reference Labels */}
              <text fill="#9CA3AF" fontFamily="sans-serif" fontSize="10" textAnchor="end" x="690" y="38">
                {(maxPrice - (maxPrice - minPrice) * 0.1).toFixed(2)}
              </text>
              <text fill="#9CA3AF" fontFamily="sans-serif" fontSize="10" textAnchor="end" x="690" y="98">
                {(maxPrice - (maxPrice - minPrice) * 0.35).toFixed(2)}
              </text>
              <text fill="#9CA3AF" fontFamily="sans-serif" fontSize="10" textAnchor="end" x="690" y="158">
                {(maxPrice - (maxPrice - minPrice) * 0.65).toFixed(2)}
              </text>
              <text fill="#9CA3AF" fontFamily="sans-serif" fontSize="10" textAnchor="end" x="690" y="208">
                {(minPrice + (maxPrice - minPrice) * 0.1).toFixed(2)}
              </text>

              {/* Chart Area Gradient Fill */}
              {polygonPoints && (
                <polygon fill="url(#chartGradient)" points={polygonPoints} />
              )}

              {/* Chart Primary Curve Stroke */}
              {polylinePoints && (
                <polyline
                  fill="none"
                  points={polylinePoints}
                  stroke="#2962FF"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                />
              )}

              {/* Hover Crosshair */}
              {hoverData && (
                <g>
                  <line
                    x1={hoverData.x}
                    y1={0}
                    x2={hoverData.x}
                    y2={240}
                    stroke="#787B86"
                    strokeDasharray="3 3"
                    strokeWidth="1.2"
                  />
                  <line
                    x1={0}
                    y1={hoverData.y}
                    x2={700}
                    y2={hoverData.y}
                    stroke="#787B86"
                    strokeDasharray="3 3"
                    strokeWidth="1.2"
                  />
                  <circle
                    cx={hoverData.x}
                    cy={hoverData.y}
                    r="6"
                    fill="#2962FF"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                  />
                </g>
              )}

              {/* Active Pulse Pointer on latest price when not hovering */}
              {!hoverData && lastPoint && (
                <g>
                  <circle
                    cx={lastPoint.x}
                    cy={lastPoint.y}
                    r="5"
                    fill="#2962FF"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                  />
                  <circle
                    cx={lastPoint.x}
                    cy={lastPoint.y}
                    r="10"
                    fill="#2962FF"
                    opacity="0.25"
                    className="animate-ping"
                  />
                </g>
              )}
            </svg>

            {/* Bottom Time Axis Labels */}
            <div className="flex justify-between text-[11px] text-[#787B86] pt-2 font-mono">
              {currentPoints.length >= 5 ? (
                <>
                  <span>{currentPoints[0].time}</span>
                  <span>{currentPoints[Math.floor(currentPoints.length * 0.25)].time}</span>
                  <span>{currentPoints[Math.floor(currentPoints.length * 0.5)].time}</span>
                  <span>{currentPoints[Math.floor(currentPoints.length * 0.75)].time}</span>
                  <span>{currentPoints[currentPoints.length - 1].time}</span>
                </>
              ) : (
                currentPoints.map((p, i) => <span key={i}>{p.time}</span>)
              )}
            </div>
          </div>

          {/* Bottom Utility Links */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-2 text-xs font-medium">
            <div className="flex gap-4">
              <button
                onClick={onOpenCompare}
                className="text-[#787B86] hover:text-[#2962FF] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Compare
              </button>
              <button
                onClick={onOpenIndicators}
                className="text-[#787B86] hover:text-[#2962FF] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Activity className="w-4 h-4" />
                Indicators
              </button>
            </div>
            <button
              onClick={onOpenSuperCharts}
              className="text-[#2962FF] hover:underline flex items-center gap-1 cursor-pointer font-semibold"
            >
              See more on SuperCharts
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Global World Indices List */}
        <div className="lg:col-span-4 bg-white border border-[#E0E3EB] rounded-2xl p-4 tv-shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-[#131722] text-base">World Indices</h3>
              <button
                onClick={onExploreWorldIndices}
                className="text-xs font-semibold text-[#2962FF] hover:underline cursor-pointer"
              >
                View all
              </button>
            </div>
            <div className="divide-y divide-gray-100 text-sm">
              {worldIndices.slice(0, 6).map((item) => (
                <div
                  key={item.symbol}
                  onClick={() => {
                    // Create dynamic index item to view in chart
                    const customIdx: IndexItem = {
                      id: item.symbol.toLowerCase(),
                      name: item.name,
                      symbol: `INDEX:${item.symbol}`,
                      shortCode: item.symbol,
                      price: item.price,
                      change: (item.price * item.changePercent) / 100,
                      changePercent: item.changePercent,
                      isPositive: item.isPositive,
                      color: item.isPositive ? '#089981' : '#F23645',
                      badgeBg: 'bg-slate-700',
                      badgeText: item.symbol.slice(0, 3),
                      exchange: item.country,
                      currency: 'Local Currency',
                      chartData: selectedIndex.chartData,
                    };
                    onSelectIndex(customIdx);
                  }}
                  className="py-2.5 flex items-center justify-between hover:bg-gray-50/80 px-2 rounded-lg transition-colors cursor-pointer group"
                >
                  <div>
                    <div className="font-semibold text-[#131722] group-hover:text-[#2962FF] transition-colors">
                      {item.name}
                    </div>
                    <div className="text-xs text-[#787B86]">
                      {item.symbol} • {item.country}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-xs text-[#131722] font-mono">
                      {item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                    <span
                      className={`text-xs font-semibold ${
                        item.isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {item.isPositive ? '+' : ''}
                      {item.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-3 border-t border-gray-100 text-center">
            <button
              onClick={onExploreWorldIndices}
              className="w-full py-2 bg-[#F0F3FA] hover:bg-[#E4E7EE] text-[#131722] rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Explore 120+ World Indices
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
