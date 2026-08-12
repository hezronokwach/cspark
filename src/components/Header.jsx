import { useEffect, useState, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { services } from '../data/services';
import { projects } from '../data/projects';

const wwdDropdown = services.map((s) => [s.title, `/what-we-do/${s.slug}`]);
const projDropdown = projects.map((p) => [`${p.title} ,  ${p.place}`, `/projects/${p.slug}`]);

const navItems = [
  { label: 'Home', href: '/', isPage: true },
  { label: 'What we do', href: '/what-we-do', isPage: true, dropdown: wwdDropdown },
  { label: 'About CSPARK', href: '/about', isPage: true },
  { label: 'Projects', href: '/projects', isPage: true, dropdown: projDropdown },
  { label: 'Governance', href: '/#governance', isPage: false },
  { label: 'Contact', href: '/#contact', isPage: false },
];

function NavDropdown({ label, href, dropdown, scrolled, isActiveRoute, closeMenu }) {
  const [open, setOpen] = useState(false);
  const timeout = useRef(null);

  const show = () => {
    clearTimeout(timeout.current);
    setOpen(true);
  };
  const hide = () => {
    timeout.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      className="relative h-full flex items-center"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <Link
        to={href}
        onClick={closeMenu}
        className={`relative flex h-full items-center font-display text-sm font-semibold group cursor-pointer ${
          isActiveRoute ? 'text-plot' : scrolled !== false ? 'text-ink' : 'text-white/80'
        }`}
      >
        {isActiveRoute && (
          <span className="absolute bottom-4 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-plot" />
        )}
        {label}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`ml-1.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </Link>

      {open && (
        <div className="absolute top-full left-0 mt-0 min-w-[280px] bg-white rounded-[10px] shadow-xl border border-line py-2 z-50">
          <Link
            to={href}
            onClick={() => { closeMenu(); setOpen(false); }}
            className="block px-5 py-2.5 font-display text-sm font-bold text-plot border-b border-line/60"
          >
            All {label.split(' ').pop()} →
          </Link>
          {dropdown.map(([itemLabel, itemHref]) => (
            <Link
              key={itemHref}
              to={itemHref}
              onClick={() => { closeMenu(); setOpen(false); }}
              className="block px-5 py-2.5 font-display text-sm text-ink hover:text-plot hover:bg-paper transition-colors duration-200"
            >
              {itemLabel}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#top');

  useEffect(() => {
    const fn = () => {
      const list = [...document.querySelectorAll('main section[id], footer[id]')];
      const found = list.filter((s) => s.getBoundingClientRect().top < 170).at(-1);
      if (found) setActive(`#${found.id}`);
    };
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm">
      <div className="frame flex h-20 items-center justify-between">
        <Link to="/" className="font-display leading-none">
          <span className="block text-2xl font-extrabold tracking-[-.07em]">CSPARK</span>
          <span className="mt-1 block text-[8px] font-semibold uppercase tracking-[.12em] text-plot">
            Planning advocacy · Kenya
          </span>
        </Link>

        <nav className="hidden h-full items-center gap-7 xl:flex">
          {navItems.map((item) =>
            item.dropdown ? (
              <NavDropdown
                key={item.href}
                label={item.label}
                href={item.href}
                dropdown={item.dropdown}
                scrolled={item.href === '/' ? false : undefined}
                isActiveRoute={
                  item.href === '/' ? window.location.pathname === '/' : undefined
                }
                closeMenu={closeMenu}
              />
            ) : item.isPage ? (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === '/'}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `relative flex h-full items-center font-display text-sm font-semibold ${
                    isActive ? 'text-plot' : 'text-ink'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute bottom-4 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-plot" />
                    )}
                    {item.label}
                  </>
                )}
              </NavLink>
            ) : (
              <Link
                key={item.href}
                to={item.href}
                onClick={closeMenu}
                className={`relative flex h-full items-center font-display text-sm font-semibold ${
                  active === item.href ? 'text-plot' : 'text-ink'
                }`}
              >
                {active === item.href && (
                  <span className="absolute bottom-4 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-plot" />
                )}
                {item.label}
              </Link>
            )
          )}
        </nav>

        <Link
          to="/#contact"
          className="hidden rounded-[10px] bg-plot px-6 py-3.5 font-display text-sm font-bold text-white md:block"
        >
          Partner with us
        </Link>

        <button
          className="xl:hidden font-display text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? '×' : '☰'}
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-white px-5 pb-5 xl:hidden">
          {navItems.map((item) =>
            item.isPage ? (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === '/'}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block border-b border-line py-4 font-display text-lg font-bold ${isActive ? 'text-plot' : 'text-ink'}`
                }
              >
                {item.label}
              </NavLink>
            ) : (
              <Link
                key={item.href}
                to={item.href}
                onClick={closeMenu}
                className="block border-b border-line py-4 font-display text-lg font-bold text-ink"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
      )}
    </header>
  );
}