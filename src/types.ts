export type Timeframe = '1D' | '5D' | '1M' | '6M' | 'YTD' | '1Y' | '5Y' | 'ALL';

export type StockTab = 'Large cap' | 'Most active' | 'Gainers' | 'Losers';

export interface ChartPoint {
  time: string;
  price: number;
}

export interface IndexItem {
  id: string;
  name: string;
  symbol: string;
  shortCode: string;
  price: number;
  change: number;
  changePercent: number;
  isPositive: boolean;
  color: string;
  badgeBg: string;
  badgeText: string;
  exchange: string;
  currency: string;
  chartData: Record<Timeframe, ChartPoint[]>;
}

export interface WorldIndex {
  name: string;
  symbol: string;
  country: string;
  region: 'Americas' | 'Europe' | 'Asia-Pacific' | 'Middle East & Africa';
  price: number;
  changePercent: number;
  isPositive: boolean;
}

export interface StockItem {
  symbol: string;
  name: string;
  badge: string;
  badgeBg: string;
  badgeTextColor: string;
  price: number;
  change: number;
  changePercent: number;
  isPositive: boolean;
  volume: string;
  marketCap: string;
  sparkline: number[];
  analystRating: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell';
  category: 'Large cap' | 'Most active' | 'Gainers' | 'Losers';
  sector: string;
  peRatio?: number;
}

export interface CryptoItem {
  symbol: string;
  name: string;
  iconBg: string;
  iconSymbol: string;
  price: number;
  changePercent: number;
  isPositive: boolean;
  volume: string;
  marketCap: string;
  circulatingSupply: string;
}

export interface CommodityItem {
  symbol: string;
  ticker: string;
  name: string;
  exchange: string;
  unit: string;
  price: number;
  change: number;
  changePercent: number;
  isPositive: boolean;
  badgeColor: string;
  badgeText: string;
}

export interface ForexItem {
  pair: string;
  name: string;
  rate: number;
  changePercent: number;
  isPositive: boolean;
  high: number;
  low: number;
}

export interface BondItem {
  name: string;
  label: string;
  yieldVal: number;
  change: number;
  isPositive: boolean;
}

export interface EconomicEvent {
  id: string;
  flag: string;
  title: string;
  date: string;
  time: string;
  est: string;
  prev: string;
  impact: 'Crucial' | 'Upcoming' | 'High Impact' | 'Medium';
  impactColor: string;
}
