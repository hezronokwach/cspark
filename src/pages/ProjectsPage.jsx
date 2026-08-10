import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsPage() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.proj-page-hero > *', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out' });
      gsap.fromTo('.proj-page-card', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <main>
      <section className="relative min-h-[60svh] flex items-end overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink to-map/40" />
        <img
          src="/images/project-lake-victoria.jpg"
          alt="Lake Victoria"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/50 to-ink/20" />
        <div className="frame relative z-10 w-full pb-16 pt-28">
          <div className="proj-page-hero">
            <p className="mono-label">Projects</p>
          </div>
          <h1 className="display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-[-0.04em] text-white leading-tight mt-6">
            Work with <span className="text-plot">communities.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/75 leading-relaxed font-body">
            Real projects, real communities — each one showing how spatial research becomes spatial justice.
          </p>
        </div>
      </section>

      <section ref={ref} className="py-20 bg-white">
        <div className="frame">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <Link
                key={p.slug}
                to={`/projects/${p.slug}`}
                className="proj-page-card opacity-0 group flex flex-col rounded-[12px] bg-paper overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
              >
                <div className="media-frame h-56">
                  <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <p className="font-display text-sm font-bold text-plot">{p.place}</p>
                  <h3 className="display mt-3 font-extrabold text-2xl text-ink leading-tight group-hover:text-plot transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-map leading-relaxed">{p.summary}</p>
                  <span className="inline-flex items-center gap-2 text-link mt-auto pt-6">
                    View project
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-ink">
        <div className="frame flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h2 className="display font-extrabold text-3xl md:text-4xl tracking-[-0.04em] text-white leading-tight">
              Got a project in <span className="text-plot">mind</span>?
            </h2>
            <p className="mt-3 text-white/65 max-w-xl text-lg font-body">
              From research to implementation, we partner with communities and county governments.
            </p>
          </div>
          <a href="mailto:info@cspark.org" className="button-plot group">
            Partner With Us <span>→</span>
          </a>
        </div>
      </section>
    </main>
  );
}