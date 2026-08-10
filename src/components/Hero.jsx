import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const actions = [
  ['What we do', '/what-we-do', 'How we turn local evidence into practical planning.'],
  ['Our projects', '/#projects', 'See work with communities across Kenya.'],
  ['Partner with us', '/#contact', 'Talk to us about research or planning support.'],
];

export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const c = gsap.context(() => {
      gsap.fromTo('.hero-copy > *', { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, stagger: 0.12, ease: 'power3.out' });
      gsap.fromTo('.hero-action', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, delay: 0.45, ease: 'power3.out' });
      gsap.to('.hero-copy', { opacity: 0, y: -45, scrollTrigger: { trigger: ref.current, start: '40% top', end: '75% top', scrub: true } });
    }, ref);
    return () => c.revert();
  }, []);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-20 text-white">
      <div className="absolute inset-0 min-h-[700px] overflow-hidden">
        <img src="/images/hero-planning.jpg" alt="Kenyan community planning workshop" className="h-full min-h-[700px] w-full object-cover" />
        <span className="absolute inset-0 bg-black/60" />
      </div>
      <div className="frame relative z-10 flex min-h-[590px] items-center">
        <div className="hero-copy max-w-4xl">
          <div className="inline-block border-l-4 border-plot pl-4">
            <b className="font-display text-3xl tracking-[-.06em]">CSPARK</b>
            <span className="mt-1 block max-w-md text-sm text-white/80">Centre for Spatial Planning Advocacy and Research in Kenya</span>
          </div>
          <h1 className="display mt-7 text-5xl font-extrabold leading-[.98] sm:text-7xl lg:text-[82px]">
            Planning that works for the people who live with it.
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-relaxed text-white/90">
            We work with communities, county governments and partners to make better decisions on land, housing, transport and livelihoods.
          </p>
        </div>
      </div>
      <div className="frame relative z-10">
        <div className="grid overflow-hidden rounded-t-[12px] bg-white text-ink md:grid-cols-3">
          {actions.map(([title, href, copy]) =>
            href.startsWith('/what') ? (
              <Link key={title} to={href} className="hero-action border-b border-r border-line p-6 last:border-b-0 md:border-b-0 md:p-8">
                <span className="font-display text-xl font-extrabold">{title} <span className="text-plot">→</span></span>
                <p className="mt-2 max-w-xs leading-relaxed text-map">{copy}</p>
              </Link>
            ) : (
              <Link key={title} to={href} className="hero-action border-b border-r border-line p-6 last:border-b-0 md:border-b-0 md:p-8">
                <span className="font-display text-xl font-extrabold">{title} <span className="text-plot">→</span></span>
                <p className="mt-2 max-w-xs leading-relaxed text-map">{copy}</p>
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
}