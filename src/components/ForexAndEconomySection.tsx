import { ForexItem, BondItem, EconomicEvent } from '../types';

interface ForexAndEconomySectionProps {
  forexList: ForexItem[];
  bondsList: BondItem[];
  economicEvents: EconomicEvent[];
  onOpenForexHeatmap: () => void;
  onOpenYieldCurve: () => void;
  onOpenEconomicCalendar: () => void;
  onSelectEvent?: (event: EconomicEvent) => void;
}

export const ForexAndEconomySection = ({
  forexList,
  bondsList,
  economicEvents,
  onOpenForexHeatmap,
  onOpenYieldCurve,
  onOpenEconomicCalendar,
  onSelectEvent,
}: ForexAndEconomySectionProps) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 pb-10" data-purpose="forex-economy-summary">
      {/* Forex Card */}
      <div id="forex-section" className="bg-white border border-[#E0E3EB] rounded-2xl p-5 tv-shadow-card flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-[#131722]">Forex</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono">Major</span>
            </div>
            <button
              onClick={onOpenForexHeatmap}
              className="text-xs font-semibold text-[#2962FF] hover:underline cursor-pointer"
            >
              Cross rates →
            </button>
          </div>
          <div className="divide-y divide-gray-100 text-sm mt-1">
            {forexList.slice(0, 3).map((item) => (
              <div key={item.pair} className="py-2.5 flex justify-between items-center hover:bg-gray-50/70 px-1 rounded transition-colors">
                <div>
                  <span className="font-bold text-[#131722]">{item.pair}</span>
                  <div className="text-[11px] text-[#787B86]">{item.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-xs text-[#131722]">
                    {item.rate >= 10 ? item.rate.toFixed(2) : item.rate.toFixed(4)}
                  </div>
                  <div
                    className={`text-xs font-semibold ${
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
        <button
          onClick={onOpenForexHeatmap}
          className="mt-3 w-full py-1.5 text-xs text-[#787B86] hover:text-[#131722] hover:bg-gray-50 rounded-lg font-medium border border-dashed border-gray-200 transition-colors cursor-pointer"
        >
          View Heatmap matrix
        </button>
      </div>

      {/* Government Bonds Card */}
      <div id="bonds-section" className="bg-white border border-[#E0E3EB] rounded-2xl p-5 tv-shadow-card flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-[#131722]">Bonds &amp; Yields</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono">10Y</span>
            </div>
            <button
              onClick={onOpenYieldCurve}
              className="text-xs font-semibold text-[#2962FF] hover:underline cursor-pointer"
            >
              Yield curve →
            </button>
          </div>
          <div className="divide-y divide-gray-100 text-sm mt-1">
            {bondsList.slice(0, 3).map((bond) => (
              <div key={bond.name} className="py-2.5 flex justify-between items-center hover:bg-gray-50/70 px-1 rounded transition-colors">
                <div>
                  <span className="font-bold text-[#131722]">{bond.name}</span>
                  <div className="text-[11px] text-[#787B86]">{bond.label}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-xs text-[#131722]">
                    {bond.yieldVal.toFixed(3)}%
                  </div>
                  <div
                    className={`text-xs font-semibold ${
                      bond.isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}
                  >
                    {bond.isPositive ? '+' : ''}
                    {bond.change.toFixed(3)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={onOpenYieldCurve}
          className="mt-3 w-full py-1.5 text-xs text-[#787B86] hover:text-[#131722] hover:bg-gray-50 rounded-lg font-medium border border-dashed border-gray-200 transition-colors cursor-pointer"
        >
          Government bond calendar
        </button>
      </div>

      {/* Economic Calendar Preview */}
      <div id="economy-section" className="bg-white border border-[#E0E3EB] rounded-2xl p-5 tv-shadow-card flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-[#131722]">Economic Events</span>
              <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded font-semibold">High Impact</span>
            </div>
            <button
              onClick={onOpenEconomicCalendar}
              className="text-xs font-semibold text-[#2962FF] hover:underline cursor-pointer"
            >
              Calendar →
            </button>
          </div>
          <div className="divide-y divide-gray-100 text-sm mt-1">
            {economicEvents.slice(0, 3).map((event) => (
              <div
                key={event.id}
                onClick={() => onSelectEvent && onSelectEvent(event)}
                className="py-2.5 flex justify-between items-center hover:bg-gray-50/70 px-1 rounded transition-colors cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs">{event.flag}</span>
                    <span className="font-bold text-xs text-[#131722]">{event.title}</span>
                  </div>
                  <div className="text-[11px] text-[#787B86]">
                    {event.date} • {event.time}
                  </div>
                </div>
                <div className="text-right text-xs">
                  <div className="font-mono text-[#787B86]">Est: {event.est}</div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${event.impactColor}`}>
                    {event.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={onOpenEconomicCalendar}
          className="mt-3 w-full py-1.5 text-xs text-[#787B86] hover:text-[#131722] hover:bg-gray-50 rounded-lg font-medium border border-dashed border-gray-200 transition-colors cursor-pointer"
        >
          Open real-time Economic Calendar
        </button>
      </div>
    </section>
  );
};
