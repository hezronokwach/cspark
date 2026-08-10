import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const themes = [
  {
    title: 'Spatial Planning & Governance',
    description: 'Integrated urban development plans, local economic plans, land reorganisation and marine spatial planning around Lake Victoria.',
    slug: 'spatial-planning-governance',
    mark: (
      <g>
        <rect x="7" y="7" width="26" height="19" rx="1" strokeDasharray="3 3" />
        <path d="M7 7L5 5M33 7l2-2M7 26l-2 2M33 26l2 2" />
        <circle cx="20" cy="16" r="3" />
      </g>
    ),
  },
  {
    title: 'Urban Livelihoods',
    description: 'Participatory enumeration and planning support for street traders and urban markets.',
    slug: 'urban-livelihoods',
    mark: (
      <g>
        <rect x="6" y="6" width="8" height="8" />
        <rect x="16" y="6" width="8" height="8" strokeDasharray="2 2" />
        <rect x="26" y="6" width="8" height="8" />
        <rect x="6" y="16" width="8" height="8" strokeDasharray="2 2" />
        <rect x="16" y="16" width="8" height="8" />
        <rect x="26" y="16" width="8" height="8" strokeDasharray="2 2" />
        <path d="M6 29h28" strokeDasharray="3 3" />
      </g>
    ),
  },
  {
    title: 'Urban Infrastructure',
    description: 'Solid waste frameworks, mobility research, green energy plans and informal service co-production.',
    slug: 'urban-infrastructure',
    mark: (
      <g>
        <path d="M5 30C12 24 16 20 20 14S30 6 35 5" strokeDasharray="4 3" />
        <path d="M5 8C11 13 17 18 24 23s8 6 11 7" />
        <circle cx="20" cy="14" r="3" />
        <circle cx="24" cy="23" r="3" />
      </g>
    ),
  },
  {
    title: 'Urban Housing',
    description: 'Informal settlement enumeration, mapping and relocation action plans centred on affected families.',
    slug: 'urban-housing',
    mark: (
      <g>
        <path d="M5 26V14l8-6 8 6v12" />
        <path d="M21 26V18l6-4 6 4v8" strokeDasharray="3 3" />
        <path d="M9 26v-6h6v6" />
        <path d="M4 30h32" strokeDasharray="2 3" />
      </g>
    ),
  },
  {
    title: 'Urban Security',
    description: 'Address systems, neighbourhood associations and community initiatives linked to safer streets.',
    slug: 'urban-security',
    mark: (
      <g>
        <circle cx="20" cy="18" r="10" strokeDasharray="3 3" />
        <circle cx="20" cy="18" r="3" />
        <path d="M20 4v6M20 26v6M6 18h6M28 18h6" />
      </g>
    ),
  },
  {
    title: 'Gender Mainstreaming',
    description: 'A cross-cutting commitment — equality woven through every plan, research agenda and advocacy effort.',
    slug: 'gender-mainstreaming',
    mark: (
      <g>
        <circle cx="15" cy="18" r="9" />
        <circle cx="25" cy="18" r="9" strokeDasharray="3 3" />
      </g>
    ),
  },
];

export default function ThematicGrid() {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.wwd-themes-head', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      });
      gsap.fromTo('.wwd-theme-card', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-paper">
      <div className="frame">
        <div className="wwd-themes-head max-w-3xl mb-14 opacity-0">
          <p className="mono-label">Thematic Areas</p>
          <h2 className="display mt-4 font-extrabold text-4xl md:text-5xl tracking-[-0.04em] text-ink leading-tight">
            Six fronts, one mission
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((t) => (
            <Link
              key={t.slug}
              to={`/what-we-do/${t.slug}`}
              className="wwd-theme-card opacity-0 group bg-white rounded-[12px] p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-ink/5 text-ink flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-plot group-hover:text-white group-hover:scale-110">
                <svg width="28" height="28" viewBox="0 0 40 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {t.mark}
                </svg>
              </div>
              <h3 className="display font-extrabold text-xl text-ink mb-3 group-hover:text-plot transition-colors duration-300">
                {t.title}
              </h3>
              <p className="text-sm text-map leading-relaxed group-hover:text-ink transition-colors duration-300">
                {t.description}
              </p>
              <div className="mt-6 flex items-center gap-2 text-link">
                Explore
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}