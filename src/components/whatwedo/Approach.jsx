import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    n: '01',
    title: 'Participatory research',
    description: 'We enumerate, map and listen — gathering data directly from the communities and informal actors whose lives are shaped by planning decisions.',
  },
  {
    n: '02',
    title: 'Technical planning',
    description: 'Evidence becomes integrated plans, spatial frameworks, relocation action plans and policy briefs ready for adoption by county governments and partners.',
  },
  {
    n: '03',
    title: 'Advocacy & capacity development',
    description: 'We push for adoption, train urban management boards, support participatory land governance and stay with the work until it reaches the ground.',
  },
];

export default function Approach() {
  const ref = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.wwd-approach-head', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      });
      gsap.fromTo('.wwd-step', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true },
      });
      gsap.fromTo(imgRef.current, { opacity: 0, clipPath: 'inset(0 0 100% 0)' }, {
        opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 1, ease: 'power3.inOut',
        scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
      });
      const img = imgRef.current?.querySelector('img');
      if (img) {
        gsap.to(img, {
          yPercent: -10, ease: 'none',
          scrollTrigger: { trigger: imgRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.5 },
        });
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-white overflow-hidden">
      <div className="frame grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div>
          <p className="wwd-approach-head mono-label">How We Work</p>
          <h2 className="display wwd-approach-head mt-4 font-extrabold text-4xl md:text-5xl tracking-[-0.04em] text-ink leading-tight">
            Research, <span className="text-plot">then</span> action
          </h2>
          <div className="mt-12 space-y-12">
            {steps.map((s) => (
              <div key={s.n} className="wwd-step opacity-0 flex gap-6 group">
                <span className="font-display font-extrabold text-5xl text-line leading-none group-hover:text-plot transition-colors duration-300">{s.n}</span>
                <div>
                  <h3 className="display font-extrabold text-xl text-ink mb-2">{s.title}</h3>
                  <p className="text-map leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={imgRef} className="relative rounded-[12px] overflow-hidden shadow-lg opacity-0 lg:sticky lg:top-32">
          <div className="absolute inset-0 bg-gradient-to-br from-ink to-map" />
          <img
            src="/images/ian-macharia-NRv8BsouFBQ-unsplash.jpg"
            alt="Team working together"
            className="relative w-full h-[500px] object-cover will-change-transform scale-110"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}