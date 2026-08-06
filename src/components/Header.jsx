import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'What We Do', href: '#what-we-do' },
  { label: 'Projects', href: '#projects' },
  { label: 'Governance', href: '#governance' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 md:px-6 lg:px-8"
    >
      <div className={`mx-auto max-w-6xl flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.08)] border border-gray-200/50'
          : 'bg-white/10 backdrop-blur-md border border-white/15'
      }`}>
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2.5 group shrink-0">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
            scrolled ? 'bg-forest' : 'bg-white/10'
          }`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
          </div>
          <div className="leading-tight">
            <span className={`font-display font-bold text-sm tracking-tight transition-colors duration-300 ${scrolled ? 'text-ink' : 'text-white'}`}>
              CSPARK
            </span>
            <span className={`block text-[8px] font-body tracking-[0.12em] uppercase transition-colors duration-300 ${scrolled ? 'text-slate' : 'text-white/60'}`}>
              Spatial Planning · Kenya
            </span>
          </div>
        </a>

        {/* Desktop Nav — centered */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative px-3.5 py-1.5 font-display font-medium text-[13px] transition-colors duration-300 rounded-full after:absolute after:left-2 after:right-2 after:-bottom-0.5 after:h-[2px] after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                scrolled
                  ? 'text-ink/70 after:bg-terracotta hover:text-terracotta'
                  : 'text-white/80 after:bg-white hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA — red pill with phone icon */}
        <div className="hidden lg:block shrink-0">
          <a
            href="#contact"
            className={`inline-flex items-center gap-2 font-display font-semibold text-[13px] px-4 py-2 rounded-full transition-all duration-300 group ${
              scrolled
                ? 'bg-terracotta text-white hover:bg-terracotta-dark hover:shadow-[0_4px_20px_rgba(226,114,91,0.4)]'
                : 'bg-white/15 text-white border border-white/25 hover:bg-white/25 hover:border-white/40'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform duration-300">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Partner With Us
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-1.5 transition-transform duration-300 hover:scale-110"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 space-y-1.5">
            <span className={`block h-0.5 w-full transition-all duration-300 ${scrolled ? 'bg-ink' : 'bg-white'} ${mobileOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <span className={`block h-0.5 w-full transition-all duration-300 ${scrolled ? 'bg-ink' : 'bg-white'} ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-full transition-all duration-300 ${scrolled ? 'bg-ink' : 'bg-white'} ${mobileOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden mt-2 mx-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
          <div className="py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-2.5 font-display font-medium text-sm text-ink hover:text-terracotta hover:bg-terracotta/5 transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <div className="px-6 pt-3 pb-2">
              <a href="#contact" className="bg-terracotta text-white inline-flex items-center gap-2 font-display font-semibold text-sm px-5 py-2.5 rounded-full w-full justify-center hover:bg-terracotta-dark transition-colors duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Partner With Us
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}