interface GlobalFooterProps {
  onOpenScreener?: () => void;
  onOpenCalendar?: () => void;
  onOpenSuperCharts?: () => void;
}

export const GlobalFooter = ({
  onOpenScreener,
  onOpenCalendar,
  onOpenSuperCharts,
}: GlobalFooterProps) => {
  return (
    <footer className="bg-[#F8FAFC] border-t border-[#E0E3EB] pt-16 pb-12" data-purpose="site-footer">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Columns Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#131722] mb-4">Products</h4>
            <ul className="space-y-2.5 text-sm text-[#787B86]">
              <li>
                <button onClick={onOpenSuperCharts} className="hover:text-[#2962FF] transition-colors cursor-pointer text-left">
                  SuperCharts
                </button>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition-colors" href="#">
                  Pine Script™
                </a>
              </li>
              <li>
                <button onClick={onOpenScreener} className="hover:text-[#2962FF] transition-colors cursor-pointer text-left">
                  Stock Screener
                </button>
              </li>
              <li>
                <button onClick={onOpenScreener} className="hover:text-[#2962FF] transition-colors cursor-pointer text-left">
                  ETF Screener
                </button>
              </li>
              <li>
                <button onClick={onOpenScreener} className="hover:text-[#2962FF] transition-colors cursor-pointer text-left">
                  Crypto Screener
                </button>
              </li>
              <li>
                <button onClick={onOpenCalendar} className="hover:text-[#2962FF] transition-colors cursor-pointer text-left">
                  Economic Calendar
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#131722] mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-[#787B86]">
              <li><a className="hover:text-[#2962FF] transition-colors" href="#">About</a></li>
              <li><a className="hover:text-[#2962FF] transition-colors" href="#">Features</a></li>
              <li><a className="hover:text-[#2962FF] transition-colors" href="#">Pricing</a></li>
              <li><a className="hover:text-[#2962FF] transition-colors" href="#">Social network</a></li>
              <li><a className="hover:text-[#2962FF] transition-colors" href="#">Wall of Love</a></li>
              <li><a className="hover:text-[#2962FF] transition-colors" href="#">Careers</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#131722] mb-4">Community</h4>
            <ul className="space-y-2.5 text-sm text-[#787B86]">
              <li><a className="hover:text-[#2962FF] transition-colors" href="#">Refer a friend</a></li>
              <li><a className="hover:text-[#2962FF] transition-colors" href="#">Ideas</a></li>
              <li><a className="hover:text-[#2962FF] transition-colors" href="#">Scripts</a></li>
              <li><a className="hover:text-[#2962FF] transition-colors" href="#">Streams</a></li>
              <li><a className="hover:text-[#2962FF] transition-colors" href="#">House Rules</a></li>
              <li><a className="hover:text-[#2962FF] transition-colors" href="#">Moderators</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#131722] mb-4">For Business</h4>
            <ul className="space-y-2.5 text-sm text-[#787B86]">
              <li><a className="hover:text-[#2962FF] transition-colors" href="#">Widgets</a></li>
              <li><a className="hover:text-[#2962FF] transition-colors" href="#">Advertising</a></li>
              <li><a className="hover:text-[#2962FF] transition-colors" href="#">Charting libraries</a></li>
              <li><a className="hover:text-[#2962FF] transition-colors" href="#">Brokerage integration</a></li>
              <li><a className="hover:text-[#2962FF] transition-colors" href="#">Partner program</a></li>
            </ul>
          </div>

          {/* Col 5: App Download Prompts */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#131722] mb-4">Trade on the go</h4>
            <p className="text-xs text-[#787B86] mb-4 leading-relaxed">
              Download world-class charts on your desktop, tablet, or smartphone.
            </p>
            <div className="space-y-2">
              <a
                className="block bg-black text-white text-xs font-semibold px-4 py-2 rounded-xl text-center hover:opacity-90 transition-opacity cursor-pointer"
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Desktop App download initiated for your operating system.');
                }}
              >
                Download Desktop App
              </a>
              <a
                className="block bg-[#E0E3EB] hover:bg-[#D4D7DF] text-[#131722] text-xs font-semibold px-4 py-2 rounded-xl text-center transition-colors cursor-pointer"
                href="#mobile"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Redirecting to App Store & Google Play Store page.');
                }}
              >
                App Store &amp; Google Play
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Legal, Disclaimer & Copyright */}
        <div className="pt-8 border-t border-[#E0E3EB] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#787B86]">
          <div className="flex items-center gap-2">
            {/* Small TradingView brand monogram */}
            <svg className="w-5 h-4 text-black fill-current" fill="none" viewBox="0 0 36 28">
              <path d="M7.05 0H0v28h7.05V0z" fill="currentColor"></path>
              <path d="M21.15 0h-7.05v28h7.05V0z" fill="currentColor"></path>
              <path d="M35.25 0h-7.05v28h7.05V0z" fill="currentColor"></path>
            </svg>
            <span>© 2026 TradingView. Made with passion for market makers and traders worldwide.</span>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <a className="hover:text-[#131722] transition-colors" href="#">
              Terms of use
            </a>
            <a className="hover:text-[#131722] transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-[#131722] transition-colors" href="#">
              Disclaimers
            </a>
            <a className="hover:text-[#131722] transition-colors" href="#">
              Cookies
            </a>
            <a className="hover:text-[#131722] transition-colors flex items-center gap-1.5" href="#">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Status
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
