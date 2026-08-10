import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const enables = [
  'Secure, planned trading spaces for informal workers',
  'Informal settlements put on the map',
  'Mobility and infrastructure that include everyone',
  'County plans communities can actually use',
  'Greener energy futures for growing towns',
];

export default function ImpactBanner() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.wwd-banner-word', { opacity: 0, x: -60 }, {
        opacity: 1, x: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
      });
      gsap.fromTo('.wwd-enable', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true },
      });
      gsap.to('.wwd-banner-word', {
        xPercent: -12, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 0.4 },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative py-24 bg-ink text-white overflow-hidden">
      <div
        className="wwd-banner-word pointer-events-none select-none absolute top-1/2 -translate-y-1/2 left-0 font-display font-extrabold leading-none whitespace-nowrap opacity-0 will-change-transform"
        style={{ fontSize: 'clamp(120px, 22vw, 320px)', WebkitTextStroke: '1px rgba(255,255,255,0.06)', color: 'transparent' }}
        aria-hidden="true"
      >
        JUSTICE
      </div>

      <div className="frame relative z-10 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <p className="mono-label">The Point of It All</p>
          <h2 className="display mt-4 font-extrabold text-4xl md:text-5xl tracking-[-0.04em] leading-tight">
            What our work <span className="text-plot">makes possible</span>
          </h2>
          <p className="mt-6 text-white/70 leading-relaxed max-w-md">
            Everything we research, map and advocate for lands somewhere specific.
            These are the outcomes our work is built to deliver.
          </p>
        </div>

        <ul className="space-y-5">
          {enables.map((item) => (
            <li key={item} className="wwd-enable opacity-0 flex items-start gap-4 group">
              <span className="mt-1 w-6 h-6 rounded-full bg-plot/20 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-plot">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-plot transition-colors duration-300 group-hover:text-white">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              <span className="text-lg text-white/85 leading-snug group-hover:text-white transition-colors duration-300">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}