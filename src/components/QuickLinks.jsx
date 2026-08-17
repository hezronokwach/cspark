import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const services = [
  ['Spatial planning', 'spatial-planning-governance', 'County and local plans that reflect the needs of the people who use a place.'],
  ['Urban livelihoods', 'urban-livelihoods', 'Evidence and practical support for traders, markets and public spaces.'],
  ['Housing and services', 'urban-housing', 'Mapping and planning that puts families at the centre of settlement upgrades.'],
  ['Gender, equity & inclusion', 'gender-mainstreaming', 'Research that makes sure planning works for women and excluded groups.'],
];

export default function QuickLinks() {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const c = gsap.context(() =>
      gsap.fromTo('.service-card', { opacity: 0, y: 55 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: 'top 76%', once: true },
      }), ref);
    return () => c.revert();
  }, []);

  return (
    <section id="what-we-do" ref={ref} className="py-20 sm:py-28">
      <div className="frame grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <p className="mono-label">What we do</p>
          <h2 className="display mt-4 text-5xl font-extrabold leading-[1.03]">
            Research and planning that leads to action.
          </h2>
          <p className="mt-7 max-w-lg text-lg leading-relaxed">
            Our work is grounded in the everyday reality of communities. We turn good local knowledge into plans that can guide real decisions.
          </p>
          <Link to="/what-we-do" className="button-plot mt-9">
            All services <span>→</span>
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {services.map(([title, slug, copy]) => (
            <Link
              to={`/what-we-do/${slug}`}
              key={title}
              className="service-card flex min-h-[270px] flex-col rounded-[12px] border border-line bg-white p-7 opacity-0 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 sm:p-9"
            >
              <span className="block h-1 w-10 bg-plot" />
              <h3 className="display mt-10 text-2xl font-bold leading-tight">{title}</h3>
              <p className="mt-4 leading-relaxed text-map">{copy}</p>
              <span className="action-link mt-auto self-start pt-2">
                Explore <span>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}