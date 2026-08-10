import { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function RelatedProjects({ projects }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-white">
      <div className="frame">
        <p className="mono-label">Related Projects</p>
        <h2 className="display mt-4 font-extrabold text-4xl md:text-5xl tracking-[-0.04em] text-ink leading-tight">
          Explore our related case studies
        </h2>

        <div className="relative mt-12">
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {projects.map((p) => (
              <Link
                key={p.slug}
                to={`/projects/${p.slug}`}
                className="group flex-shrink-0 w-[300px] snap-start rounded-[12px] bg-paper overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
              >
                <div className="media-frame h-48">
                  <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <p className="font-display text-sm font-bold text-plot">{p.place}</p>
                  <h3 className="display mt-2 font-extrabold text-xl text-ink leading-tight group-hover:text-plot transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm text-map leading-relaxed">{p.summary}</p>
                  <span className="inline-flex items-center gap-2 text-link mt-4">
                    Read more
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={() => scroll(-1)}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-line flex items-center justify-center text-ink hover:text-plot hover:border-plot transition-colors"
            aria-label="Scroll left"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => scroll(1)}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-line flex items-center justify-center text-ink hover:text-plot hover:border-plot transition-colors"
            aria-label="Scroll right"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="mt-8 text-center">
          <Link to="/projects" className="button-ink group inline-flex items-center gap-2">
            View All Projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}