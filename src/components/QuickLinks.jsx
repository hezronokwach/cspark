import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: 'what-we-do',
    title: 'What We Do',
    description: 'Six thematic areas: spatial governance, urban livelihoods, infrastructure, housing, security, and gender mainstreaming.',
    href: '#what-we-do',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 11h.01M15 11h.01" />
      </svg>
    ),
    highlighted: false,
    gridClass: '',
  },
  {
    id: 'projects',
    title: 'Projects & Impact',
    description: 'Past and ongoing work presented as brief — approach — outcome, rooted in community-led research.',
    href: '#projects',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
    highlighted: true,
    gridClass: 'lg:row-span-2',
  },
  {
    id: 'publications',
    title: 'Publications & Research',
    description: 'Research reports, policy briefs, and resources on spatial planning and social justice.',
    href: '#publications',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 6.5C10 4.5 7 4 4 4v14c3 0 6 .5 8 2.5 2-2 5-2.5 8-2.5V4c-3 0-6 .5-8 2.5zM12 6.5v14" />
      </svg>
    ),
    highlighted: false,
    gridClass: '',
  },
  {
    id: 'governance',
    title: 'Governance & Transparency',
    description: 'Board of Directors, named experts, annual reports, and safeguarding — the due-diligence essentials.',
    href: '#governance',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    highlighted: false,
    gridClass: '',
  },
  {
    id: 'partners',
    title: 'Partners & Donors',
    description: 'Current and past funders, county governments, and coordination memberships — with due-diligence transparency.',
    href: '#partners',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    highlighted: false,
    gridClass: '',
  },
];

export default function QuickLinks() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ql-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Header
      gsap.fromTo('.ql-header', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="what-we-do" ref={sectionRef} className="py-24 bg-white">
      <div className="container-cspark">
        {/* Section header */}
        <div className="ql-header max-w-2xl mb-14 opacity-0" data-scroll="fade-up">
          <span className="section-label">Explore CSPARK</span>
          <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl tracking-tight text-ink">
            Research, Advocacy & <em className="font-serif italic text-forest">Capacity</em>
          </h2>
        </div>

        {/* Bento grid — 5 cards across 3 columns × 2 rows, fully filled */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:auto-rows-fr">
          {cards.map((card) => (
            <a
              key={card.id}
              href={card.href}
              className={`ql-card group relative rounded-2xl p-8 md:p-10 min-h-[280px] lg:min-h-0 flex flex-col justify-between overflow-hidden transition-all duration-500 ${card.gridClass} ${
                card.highlighted
                  ? 'bg-terracotta text-white shadow-lg card-interactive'
                  : 'bg-cream border border-gray-200 card-interactive'
              }`}
            >
              {/* Decorative circle */}
              <div
                className={`absolute -top-16 -right-16 w-48 h-48 rounded-full transition-transform duration-700 group-hover:scale-110 group-hover:opacity-20 ${
                  card.highlighted ? 'bg-white/10' : 'bg-forest/5'
                }`}
              />

              <div className="relative">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 ${
                    card.highlighted
                      ? 'bg-white/15 group-hover:bg-white/25 group-hover:scale-110'
                      : 'bg-forest/10 text-forest group-hover:bg-forest group-hover:text-white group-hover:scale-110'
                  }`}
                >
                  {card.icon}
                </div>
                <h3
                  className={`font-display font-semibold text-2xl mb-4 transition-colors duration-300 ${
                    card.highlighted ? 'text-white group-hover:text-terracotta-light' : 'text-ink group-hover:text-forest'
                  }`}
                >
                  {card.title}
                </h3>
                <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                  card.highlighted ? 'text-white/85 group-hover:text-white' : 'text-slate group-hover:text-ink'
                }`}>
                  {card.description}
                </p>
              </div>

              <div className="relative mt-8 flex items-center gap-2">
                <span
                  className={`font-display font-semibold text-sm transition-colors duration-300 ${
                    card.highlighted
                      ? 'text-white group-hover:text-terracotta-light'
                      : 'text-forest group-hover:text-terracotta'
                  }`}
                >
                  Find out more
                </span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-all duration-500 group-hover:translate-x-2 group-hover:rotate-12 ${
                    card.highlighted ? 'text-white' : 'text-terracotta'
                  }`}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}