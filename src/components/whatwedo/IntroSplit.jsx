import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function IntroSplit() {
  const ref = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.wwd-intro-copy > *', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
      });
      gsap.fromTo(imgRef.current, { opacity: 0, clipPath: 'inset(0 0 100% 0)' }, {
        opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 1, ease: 'power3.inOut',
        scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
      });
      const img = imgRef.current?.querySelector('img');
      if (img) {
        gsap.to(img, {
          yPercent: -12, ease: 'none',
          scrollTrigger: { trigger: imgRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.5 },
        });
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-white overflow-hidden">
      <div className="frame grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="wwd-intro-copy">
          <p className="mono-label">Why We Exist</p>
          <h2 className="display mt-4 font-extrabold text-4xl md:text-5xl tracking-[-0.04em] text-ink leading-tight">
            Plans exist. We make them <span className="text-plot">work.</span>
          </h2>
          <p className="mt-6 text-lg text-map leading-relaxed">
            Kenya produces no shortage of spatial plans. Too many of them sit on shelves , 
            drafted far from the markets, settlements and streets they are meant to shape.
            When planning loses touch with people, it deepens the inequality it was meant to fix.
          </p>
          <p className="mt-4 text-lg text-map leading-relaxed">
            CSPARK works that seam between policy and reality. We generate research-based
            evidence, build the capacity of the people who plan, and advocate until plans
            translate into dignified spaces, livelihoods and services.
          </p>
        </div>

        <div ref={imgRef} className="relative rounded-[12px] overflow-hidden opacity-0 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-ink to-map" />
          <img
            src="/images/brian-kungu-rmvuk5sWP7c-unsplash.jpg"
            alt="Kenyan street scene"
            className="relative w-full h-[420px] object-cover will-change-transform scale-110"
            loading="lazy"
          />
          <div className="absolute bottom-4 left-4 px-4 py-1.5 rounded-full bg-ink/60 text-white text-xs font-display tracking-wide uppercase backdrop-blur-sm">
            Community-first
          </div>
        </div>
      </div>
    </section>
  );
}