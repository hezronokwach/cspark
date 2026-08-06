import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const focusAreas = [
  {
    title: 'Spatial Planning & Governance',
    description: 'Integrated Strategic Urban Development Plans, Local Economic Development Plans, land reorganisation, and Marine Spatial Planning around Lake Victoria.',
  },
  {
    title: 'Urban Livelihoods',
    description: 'Enumeration and planning support for street traders and urban markets — protecting the economic rights of informal workers.',
  },
  {
    title: 'Infrastructure, Housing & Security',
    description: 'Solid waste frameworks, mobility research, green energy plans, informal settlement mapping, and address systems linked to urban security.',
  },
  {
    title: 'Gender Mainstreaming',
    description: 'A cross-cutting commitment — gender equality woven through every plan, research agenda, and advocacy effort we undertake.',
  },
];

export default function Mission() {
  const sectionRef = useRef(null);
  const patternRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo('.mission-heading', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      });

      // Cards stagger reveal
      gsap.fromTo('.mission-card', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
      });

      // Values strip reveal
      gsap.fromTo('.mission-values span', { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.06,
        scrollTrigger: { trigger: '.mission-values', start: 'top 88%', once: true },
      });

      // Subtle parallax on the decorative pattern
      if (patternRef.current) {
        gsap.to(patternRef.current, {
          xPercent: -15,
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="relative py-28 bg-forest overflow-hidden"
    >
      {/* Decorative pattern — subtle parallax */}
      <svg
        ref={patternRef}
        className="absolute right-0 top-0 w-[500px] h-full opacity-[0.06] will-change-transform"
        viewBox="0 0 500 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g stroke="white" strokeWidth="1">
          <path d="M500,0 C380,200 420,400 380,600 C340,700 400,800 500,800" />
          <path d="M420,0 C320,200 360,400 320,600 C280,700 340,800 420,800" />
          <path d="M340,0 C260,200 300,400 260,600 C220,700 280,800 340,800" />
          <path d="M260,0 C200,200 240,400 200,600 C160,700 220,800 260,800" />
          <path d="M180,0 C140,200 180,400 140,600 C100,700 160,800 180,800" />
        </g>
      </svg>

      <div className="container-cspark relative z-10">
        {/* Heading */}
        <div className="mission-heading max-w-3xl opacity-0" data-scroll="fade-up">
          <span className="font-display font-semibold text-xs tracking-[0.25em] uppercase text-terracotta-light">
            Our Mission
          </span>
          <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1]">
            Linking Spatial Planning to{' '}
            <em className="font-serif italic text-terracotta-light">Social Justice</em>
          </h2>
          <div className="mt-8 w-16 h-px bg-terracotta" />
          <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-2xl">
            Through research, advocacy, and capacity development, we work so that
            planning decisions — on land, infrastructure, housing, and livelihoods —
            serve the people they affect most.
          </p>
        </div>

        {/* 2x2 Focus grid */}
        <div className="grid md:grid-cols-2 gap-px bg-white/10 mt-16 border border-white/10 rounded-2xl overflow-hidden">
          {focusAreas.map((area) => (
            <div
              key={area.title}
              className="mission-card opacity-0 bg-forest p-8 md:p-10 transition-all duration-500 hover:bg-forest-light hover:scale-[1.02] cursor-default group"
            >
              <div className="w-8 h-px bg-terracotta mb-6 group-hover:w-16 transition-all duration-500" />
              <h3 className="font-display font-semibold text-xl md:text-2xl text-white mb-4 group-hover:text-terracotta-light transition-colors duration-300">
                {area.title}
              </h3>
              <p className="text-white/70 leading-relaxed text-sm md:text-base group-hover:text-white/90 transition-colors duration-300">
                {area.description}
              </p>
            </div>
          ))}
        </div>

        {/* Values strip */}
        <div className="mission-heading mission-values mt-14 flex flex-wrap items-center gap-3 opacity-0" data-scroll="fade-up">
          {['Integrity', 'Participation', 'Diversity', 'Accountability', 'Social Good'].map((value) => (
            <span
              key={value}
              className="px-5 py-2.5 rounded-full border border-white/20 text-white/80 font-display text-xs tracking-wide uppercase transition-all duration-300 hover:border-terracotta hover:text-terracotta-light hover:bg-terracotta/10 hover:scale-105 cursor-default"
            >
              {value}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}