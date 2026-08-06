import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  { n: '01', title: 'Participatory Research', detail: 'Every plan and enumeration is built with the communities and county actors who live with the outcomes.' },
  { n: '02', title: 'Audited Accounts', detail: 'Annual financial audits are conducted and our books are kept open to partners.' },
  { n: '03', title: 'Safeguarding', detail: 'A safeguarding framework underpins every programme, study, and field engagement.' },
  { n: '04', title: 'Data Protection', detail: 'We comply with the Kenya Data Protection Act, 2019 and treat every record with care.' },
];

const experts = [
  {
    name: 'Dr. Walter Alando',
    role: 'Transport & Urban Development Planning',
    initials: 'WA',
    gradient: 'from-emerald-900 via-forest to-teal-800',
    bio: 'Urban development planning practitioner and researcher, working across urban development research, governance, climate change resilience, and GIS.',
    credentials: ['KIP', 'EIK'],
  },
  {
    name: 'Mildred Ambani',
    role: 'GIS & Urban Management',
    initials: 'MA',
    gradient: 'from-terracotta via-orange-800 to-amber-900',
    bio: 'Specialist in geographic information systems and urban management, supporting spatial data-driven planning across Kenyan counties.',
    credentials: [],
  },
  {
    name: 'Nicodemus Mbwika',
    role: 'Governance & Project Management',
    initials: 'NM',
    gradient: 'from-slate-800 via-charcoal to-slate-900',
    bio: 'Expert in governance structures and project management, ensuring accountability and effective delivery across all CSPARK programmes.',
    credentials: [],
  },
];

function ExpertCard({ expert }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const grad = cardRef.current?.querySelector('.expert-grad');
      if (grad) {
        gsap.to(grad, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <article
      ref={cardRef}
      className="expert-card opacity-0 group relative rounded-2xl overflow-hidden border border-gray-200 bg-cream transition-all duration-500 hover:shadow-2xl hover:border-terracotta/30 hover:-translate-y-2"
    >
      {/* Gradient visual — top 55% */}
      <div className="relative h-[240px] overflow-hidden">
        <div className={`expert-grad absolute inset-0 bg-gradient-to-br ${expert.gradient} transition-all duration-700 group-hover:scale-110 will-change-transform`} />

        {/* SVG pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-15 group-hover:opacity-25 transition-opacity duration-500" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <g stroke="white" strokeWidth="0.5">
            <path d="M0,30 H400 M0,60 H400 M0,90 H400 M0,120 H400 M0,150 H400 M0,180 H400 M0,210 H400" />
            <path d="M40,0 V240 M80,0 V240 M120,0 V240 M160,0 V240 M200,0 V240 M240,0 V240 M280,0 V240 M320,0 V240 M360,0 V240" />
          </g>
          <g stroke="white" strokeWidth="1">
            <path d="M60,40 C120,80 180,140 240,180 C300,220 360,240 400,240" strokeDasharray="4 4" />
          </g>
          {/* Large initials watermark */}
          <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fill="white" fillOpacity="0.08" fontSize="140" fontFamily="Space Grotesk, sans-serif" fontWeight="700">
            {expert.initials}
          </text>
          {/* Pin */}
          <circle cx="200" cy="120" r="5" fill="white" />
          <circle cx="200" cy="120" r="14" stroke="white" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>

      {/* Content — bottom 45% */}
      <div className="p-6">
        {/* Credentials */}
        {expert.credentials.length > 0 && (
          <div className="flex gap-2 mb-3">
            {expert.credentials.map((c) => (
              <span key={c} className="px-2.5 py-0.5 rounded-full bg-terracotta/10 text-terracotta text-[10px] font-display font-semibold tracking-wider">
                {c}
              </span>
            ))}
          </div>
        )}

        <h3 className="font-display font-semibold text-xl text-ink leading-snug group-hover:text-forest transition-colors duration-300">
          {expert.name}
        </h3>

        <p className="text-xs font-display text-terracotta/80 mt-1 mb-3">{expert.role}</p>

        <p className="text-sm text-slate leading-relaxed group-hover:text-ink transition-colors duration-300">
          {expert.bio}
        </p>
      </div>
    </article>
  );
}

export default function Governance() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.gov-header', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
      });
      gsap.fromTo('.gov-card', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 76%', once: true },
      });
      gsap.fromTo('.expert-card', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power2.out', stagger: 0.15,
        scrollTrigger: { trigger: '.experts-grid', start: 'top 85%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="governance" ref={sectionRef} className="py-28 bg-white">
      <div className="container-cspark">
        <div className="gov-header max-w-3xl opacity-0" data-scroll="fade-up">
          <span className="section-label">Governance & Transparency</span>
          <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl tracking-tight text-ink leading-tight">
            Built on Accountability, <em className="font-serif italic text-forest">Earned Through Trust</em>
          </h2>
          <p className="mt-6 text-slate leading-relaxed text-lg max-w-2xl">
            Our governance and policies are public by design — because accountability
            to the communities we serve is what social justice runs on.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 mt-16 border border-gray-200 rounded-2xl overflow-hidden">
          {pillars.map((p) => (
            <div key={p.title} className="gov-card opacity-0 bg-cream p-8 transition-all duration-500 hover:bg-white group cursor-default">
              <div className="flex items-baseline justify-between mb-8">
                <span className="font-display font-semibold text-sm text-terracotta group-hover:text-forest transition-colors duration-300">{p.n}</span>
                <span className="w-8 h-px bg-gray-300 group-hover:w-12 group-hover:bg-terracotta transition-all duration-500" />
              </div>
              <h3 className="font-display font-semibold text-xl leading-snug mb-3 text-ink group-hover:text-forest transition-colors duration-300">{p.title}</h3>
              <p className="text-sm text-slate leading-relaxed group-hover:text-ink transition-colors duration-300">{p.detail}</p>
            </div>
          ))}
        </div>

        {/* Experts — 3 side-by-side cards */}
        <div className="mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="section-label">Named Experts & Leadership</span>
              <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl tracking-tight text-ink leading-tight">
                Seasoned professionals in{' '}
                <em className="font-serif italic text-forest">planning, GIS & governance</em>
              </h2>
            </div>
            <a href="#contact" className="btn-outline-dark shrink-0 group">
              Get in touch
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
          </div>

          <div className="experts-grid grid md:grid-cols-3 gap-6">
            {experts.map((expert) => (
              <ExpertCard key={expert.name} expert={expert} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}