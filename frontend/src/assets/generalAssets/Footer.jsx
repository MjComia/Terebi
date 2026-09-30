export function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 mt-12 px-8 py-12">
      <div className="max-w-screen-xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand column */}
          <div className="col-span-1">
            <span className="text-2xl font-black bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              Terebi
            </span>
            <p className="text-gray-500 text-sm mt-2 leading-relaxed">
              Your premium destination for movies and TV shows.
            </p>
            {/* Social icons */}
            <div className="flex gap-4 mt-4">
              {["f", "𝕏", "in", "▶"].map((icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-colors text-xs font-bold"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Browse */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Browse</h4>
            <ul className="space-y-2">
              {["Movies", "TV Shows", "Originals", "Trending"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Support</h4>
            <ul className="space-y-2">
              {["Help Center", "Account", "Contact Us", "FAQ"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Legal</h4>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Service", "Cookie Preferences", "Corporate Info"].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 text-center">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} TEREBI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
