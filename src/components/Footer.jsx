import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const siteLinks = [
  { label: 'About', href: '#about' },
  { label: 'What We Do', href: '#what-we-do' },
  { label: 'Projects', href: '#projects' },
  { label: 'Governance', href: '#governance' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-col', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 90%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" ref={sectionRef} className="bg-charcoal text-white">
      {/* CTA band */}
      <div className="border-b border-white/10">
        <div className="container-cspark py-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
              Partner with us to build{' '}
              <em className="font-serif italic text-terracotta-light">just</em> cities
            </h2>
            <p className="mt-3 text-white/60 max-w-xl">
              Whether you're a funder, county government, or community organisation —
              let's shape spatial planning that serves everyone.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a href="mailto:info@cspark.org" className="btn-primary group">
              <span className="relative z-10">Get in Touch</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300 relative z-10"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
            <a href="#projects" className="btn-outline group">
              <span className="relative z-10">View Projects</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300 relative z-10"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main footer — simplified */}
      <div className="container-cspark py-12">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="footer-col opacity-0">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-lg bg-forest flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </div>
              <div className="leading-tight">
                <span className="font-display font-bold text-base tracking-tight">CSPARK</span>
                <span className="block text-[9px] font-body tracking-widest uppercase text-white/50">Spatial Planning · Kenya</span>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              Centre for Spatial Planning Advocacy and Research in Kenya.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col opacity-0">
            <h4 className="font-display font-semibold text-xs tracking-wider uppercase text-terracotta mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/60 transition-all duration-300 hover:text-white hover:translate-x-1 inline-flex items-center gap-1 group">
                    {link.label}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col opacity-0">
            <h4 className="font-display font-semibold text-xs tracking-wider uppercase text-terracotta mb-5">Contact</h4>
            <div className="space-y-3 text-sm text-white/60">
              <p className="flex items-center gap-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-terracotta shrink-0"><path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
                Nairobi, Kenya
              </p>
              <p className="flex items-center gap-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-terracotta shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                +254 700 000 000
              </p>
              <p className="flex items-center gap-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-terracotta shrink-0"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M22 6l-10 7L2 6" /></svg>
                info@cspark.org
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-cspark py-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} CSPARK — Centre for Spatial Planning Advocacy and Research in Kenya
          </p>
          <div className="flex gap-5">
            <a href="#top" className="text-xs text-white/40 transition-colors duration-300 hover:text-white">Privacy Policy</a>
            <a href="#top" className="text-xs text-white/40 transition-colors duration-300 hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}