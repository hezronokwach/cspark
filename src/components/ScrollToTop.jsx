import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const isDesktopTeamHash = hash.startsWith('#team-') && window.innerWidth >= 768;
      if (isDesktopTeamHash) return;
      let attempts = 0;
      const maxAttempts = 6;
      const target = hash.startsWith('#team-') ? `#member-${hash.slice(6)}` : hash;
      const tryScroll = () => {
        attempts++;
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
        if (attempts < maxAttempts) setTimeout(tryScroll, 100);
      };
      setTimeout(tryScroll, 50);
      return;
    }

    window.scrollTo(0, 0);
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => clearTimeout(refreshTimer);
  }, [pathname, hash]);

  return null;
}