import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PageHero() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.wwd-hero-line', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out' });
      gsap.fromTo('.wwd-hero-sub', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.5, ease: 'power2.out' });
      gsap.fromTo('.wwd-hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.7, ease: 'power2.out' });
      gsap.to('.wwd-hero-img', {
        yPercent: 18, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 0.4 },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative min-h-[85svh] flex items-end overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink to-ink/60" />
      <img
        src="/images/bennett-tobias-zCLPvnopq88-unsplash.jpg"
        alt="Kenyan landscape"
        className="wwd-hero-img absolute inset-0 w-full h-full object-cover will-change-transform"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/55 to-ink/30" />

      <div className="frame relative z-10 w-full pb-16 pt-36">
        <div className="wwd-hero-line opacity-0 mono-label mb-6">
          Our Work
        </div>
        <h1 className="display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.05] tracking-[-0.04em] text-white max-w-4xl">
          <span className="wwd-hero-line block opacity-0">Planning that reaches</span>
          <span className="wwd-hero-line block opacity-0">the people it plans for.</span>
        </h1>
        <p className="wwd-hero-sub mt-6 max-w-xl text-lg text-white/75 leading-relaxed opacity-0 font-body">
          Research, advocacy and technical expertise that bridge the gap between
          spatial plans and the communities they shape.
        </p>
        <div className="wwd-hero-cta opacity-0 mt-8 flex flex-wrap gap-4">
          <Link to="/projects" className="button-plot group">
            See Our Projects <span>→</span>
          </Link>
          <Link to="/what-we-do/spatial-planning-governance" className="button-ink group">
            Explore Services <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}