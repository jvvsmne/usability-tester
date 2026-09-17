import { useState, useEffect } from 'react';
import { GlobalHeader } from './components/GlobalHeader';
import { HeroHeadlineSection } from './components/HeroHeadlineSection';
import { IndicesSection } from './components/IndicesSection';
import { USStocksSection } from './components/USStocksSection';
import { CryptoAndCommoditiesGrid } from './components/CryptoAndCommoditiesGrid';
import { ForexAndEconomySection } from './components/ForexAndEconomySection';
import { GlobalFooter } from './components/GlobalFooter';
import { SearchModal } from './components/SearchModal';
import {
  StockScreenerModal,
  WorldIndicesModal,
  ForexHeatmapModal,
  YieldCurveModal,
  EconomicCalendarModal,
  GetStartedModal,
  CompareModal,
  IndicatorsModal,
  SuperChartsModal,
} from './components/Modals';
import {
  INDICES_DATA,
  WORLD_INDICES,
  US_STOCKS,
  CRYPTO_DATA,
  COMMODITIES_DATA,
  FOREX_DATA,
  BONDS_DATA,
  ECONOMIC_EVENTS,
} from './data/mockData';
import { IndexItem, StockItem, CryptoItem, CommodityItem, WorldIndex } from './types';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('Indices');
  const [selectedIndex, setSelectedIndex] = useState<IndexItem>(INDICES_DATA[0]);
  const [activeNav, setActiveNav] = useState('Markets');

  // Modal states
  const [searchOpen, setSearchOpen] = useState(false);
  const [screenerOpen, setScreenerOpen] = useState(false);
  const [worldIndicesOpen, setWorldIndicesOpen] = useState(false);
  const [forexHeatmapOpen, setForexHeatmapOpen] = useState(false);
  const [yieldCurveOpen, setYieldCurveOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [getStartedOpen, setGetStartedOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [indicatorsOpen, setIndicatorsOpen] = useState(false);
  const [superChartsOpen, setSuperChartsOpen] = useState(false);

  // Global keyboard shortcut: Ctrl+K or Cmd+K to trigger Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectItemFromSearch = (item: { type: string; data: unknown }) => {
    if (item.type === 'Indices') {
      const idx = item.data as IndexItem;
      setSelectedIndex(idx);
      document.getElementById('indices-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (item.type === 'Stocks') {
      setScreenerOpen(true);
    } else if (item.type === 'Crypto') {
      document.getElementById('crypto-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (item.type === 'Commodities') {
      document.getElementById('futures-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (item.type === 'Forex') {
      document.getElementById('forex-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectWorldIndex = (index: WorldIndex) => {
    const customIdx: IndexItem = {
      id: index.symbol.toLowerCase(),
      name: index.name,
      symbol: `INDEX:${index.symbol}`,
      shortCode: index.symbol,
      price: index.price,
      change: (index.price * index.changePercent) / 100,
      changePercent: index.changePercent,
      isPositive: index.isPositive,
      color: index.isPositive ? '#089981' : '#F23645',
      badgeBg: 'bg-slate-700',
      badgeText: index.symbol.slice(0, 3),
      exchange: index.country,
      currency: 'Local Currency',
      chartData: selectedIndex.chartData,
    };
    setSelectedIndex(customIdx);
    document.getElementById('indices-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectStock = (stock: StockItem) => {
    // Also allow charting this stock's valuation
    const stockIdx: IndexItem = {
      id: stock.symbol.toLowerCase(),
      name: stock.name,
      symbol: stock.symbol,
      shortCode: stock.symbol,
      price: stock.price,
      change: stock.change,
      changePercent: stock.changePercent,
      isPositive: stock.isPositive,
      color: stock.isPositive ? '#089981' : '#F23645',
      badgeBg: stock.badgeBg,
      badgeText: stock.badge,
      exchange: 'NASDAQ / NYSE',
      currency: 'USD',
      chartData: selectedIndex.chartData,
    };
    setSelectedIndex(stockIdx);
    document.getElementById('indices-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCrypto = (crypto: CryptoItem) => {
    const cryptoIdx: IndexItem = {
      id: crypto.symbol.toLowerCase(),
      name: crypto.name,
      symbol: `CRYPTO:${crypto.symbol}USD`,
      shortCode: crypto.symbol,
      price: crypto.price,
      change: (crypto.price * crypto.changePercent) / 100,
      changePercent: crypto.changePercent,
      isPositive: crypto.isPositive,
      color: crypto.isPositive ? '#089981' : '#F23645',
      badgeBg: crypto.iconBg,
      badgeText: crypto.iconSymbol,
      exchange: 'Coinbase • Spot',
      currency: 'USD',
      chartData: selectedIndex.chartData,
    };
    setSelectedIndex(cryptoIdx);
    document.getElementById('indices-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCommodity = (cm: CommodityItem) => {
    const cmIdx: IndexItem = {
      id: cm.symbol.toLowerCase(),
      name: cm.name,
      symbol: cm.ticker,
      shortCode: cm.symbol,
      price: cm.price,
      change: cm.change,
      changePercent: cm.changePercent,
      isPositive: cm.isPositive,
      color: cm.isPositive ? '#089981' : '#F23645',
      badgeBg: 'bg-amber-600',
      badgeText: cm.badgeText,
      exchange: cm.exchange,
      currency: cm.unit,
      chartData: selectedIndex.chartData,
    };
    setSelectedIndex(cmIdx);
    document.getElementById('indices-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-[#131722] font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Global Navigation Header */}
      <GlobalHeader
        onOpenSearch={() => setSearchOpen(true)}
        onGetStarted={() => setGetStartedOpen(true)}
        activeNav={activeNav}
        onSelectNav={(nav) => {
          setActiveNav(nav);
          if (nav === 'Products') {
            setSuperChartsOpen(true);
          } else if (nav === 'Community') {
            setGetStartedOpen(true);
          }
        }}
      />

      {/* Main Container */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Hero Headline Section */}
        <HeroHeadlineSection
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
        />

        {/* Indices Section with Live Chart */}
        <IndicesSection
          indices={INDICES_DATA}
          worldIndices={WORLD_INDICES}
          selectedIndex={selectedIndex}
          onSelectIndex={(idx) => setSelectedIndex(idx)}
          onOpenCompare={() => setCompareOpen(true)}
          onOpenIndicators={() => setIndicatorsOpen(true)}
          onOpenSuperCharts={() => setSuperChartsOpen(true)}
          onExploreWorldIndices={() => setWorldIndicesOpen(true)}
        />

        {/* US Stocks Section */}
        <USStocksSection
          stocks={US_STOCKS}
          onSelectStock={handleSelectStock}
          onOpenScreener={() => setScreenerOpen(true)}
        />

        {/* Crypto & Commodities Composite Grid */}
        <CryptoAndCommoditiesGrid
          cryptoList={CRYPTO_DATA}
          commoditiesList={COMMODITIES_DATA}
          onSelectCrypto={handleSelectCrypto}
          onSelectCommodity={handleSelectCommodity}
          onOpenFuturesMarket={() => {
            handleSelectCommodity(COMMODITIES_DATA[0]);
          }}
        />

        {/* Forex, Bonds, and Economic Events */}
        <ForexAndEconomySection
          forexList={FOREX_DATA}
          bondsList={BONDS_DATA}
          economicEvents={ECONOMIC_EVENTS}
          onOpenForexHeatmap={() => setForexHeatmapOpen(true)}
          onOpenYieldCurve={() => setYieldCurveOpen(true)}
          onOpenEconomicCalendar={() => setCalendarOpen(true)}
          onSelectEvent={() => setCalendarOpen(true)}
        />
      </main>

      {/* Global Footer */}
      <GlobalFooter
        onOpenScreener={() => setScreenerOpen(true)}
        onOpenCalendar={() => setCalendarOpen(true)}
        onOpenSuperCharts={() => setSuperChartsOpen(true)}
      />

      {/* Modals & Dialogs */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        indices={INDICES_DATA}
        stocks={US_STOCKS}
        crypto={CRYPTO_DATA}
        commodities={COMMODITIES_DATA}
        forex={FOREX_DATA}
        onSelectItem={handleSelectItemFromSearch}
      />

      <StockScreenerModal
        isOpen={screenerOpen}
        onClose={() => setScreenerOpen(false)}
        stocks={US_STOCKS}
        onSelectStock={handleSelectStock}
      />

      <WorldIndicesModal
        isOpen={worldIndicesOpen}
        onClose={() => setWorldIndicesOpen(false)}
        worldIndices={WORLD_INDICES}
        onSelectIndex={handleSelectWorldIndex}
      />

      <ForexHeatmapModal
        isOpen={forexHeatmapOpen}
        onClose={() => setForexHeatmapOpen(false)}
      />

      <YieldCurveModal
        isOpen={yieldCurveOpen}
        onClose={() => setYieldCurveOpen(false)}
      />

      <EconomicCalendarModal
        isOpen={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        events={ECONOMIC_EVENTS}
      />

      <CompareModal
        isOpen={compareOpen}
        onClose={() => setCompareOpen(false)}
        onSelectCompare={(sym) => {
          const match = INDICES_DATA.find((i) => i.shortCode === sym);
          if (match) setSelectedIndex(match);
        }}
      />

      <IndicatorsModal
        isOpen={indicatorsOpen}
        onClose={() => setIndicatorsOpen(false)}
      />

      <SuperChartsModal
        isOpen={superChartsOpen}
        onClose={() => setSuperChartsOpen(false)}
        indexName={selectedIndex.name}
      />

      <GetStartedModal
        isOpen={getStartedOpen}
        onClose={() => setGetStartedOpen(false)}
      />
    </div>
  );
}
