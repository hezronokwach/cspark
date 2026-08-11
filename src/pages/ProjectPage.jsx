import { useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProject } from '../data/projects';
import { services } from '../data/services';
import Breadcrumb from '../components/shared/Breadcrumb';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  const heroRef = useRef(null);
  const bodyRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.proj-hero > *', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out' });
      gsap.to('.proj-hero-img', { yPercent: 15, ease: 'none', scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 0.4 } });
      gsap.fromTo('.proj-gallery-item', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out', scrollTrigger: { trigger: galleryRef.current, start: 'top 80%', once: true } });
      gsap.fromTo('.proj-body', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: bodyRef.current, start: 'top 85%', once: true } });
    });
    return () => ctx.revert();
  }, [slug]);

  if (!project) {
    return (
      <section className="py-40 text-center">
        <div className="frame"><h1 className="display font-extrabold text-4xl text-ink">Project not found.</h1></div>
      </section>
    );
  }

  const relatedServices = services.filter((s) => project.relatedServiceSlugs.includes(s.slug));

  return (
    <main>
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[75svh] flex items-end overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink to-ink/60" />
        <img
          src={project.image}
          alt={project.title}
          className="proj-hero-img absolute inset-0 w-full h-full object-cover will-change-transform"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/55 to-ink/30" />
        <div className="frame relative z-10 w-full pb-16 pt-28">
          <div className="proj-hero opacity-0">
            <Breadcrumb items={[
              { label: 'Home', href: '/' },
              { label: 'Projects', href: '/projects' },
              { label: project.title },
            ]} />
          </div>
          <p className="proj-hero font-display text-sm font-bold text-plot mt-6 uppercase tracking-wide">{project.place}</p>
          <h1 className="display proj-hero font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-[-0.04em] text-white leading-tight max-w-4xl mt-3">
            {project.title}
          </h1>
        </div>
      </section>

      {project.gallery && project.gallery.length > 0 && (
        <section ref={galleryRef} className="py-16 sm:py-20 bg-paper">
          <div className="frame">
            <p className="mono-label">Gallery</p>
            <h2 className="display mt-4 font-extrabold text-3xl md:text-4xl tracking-[-0.04em] text-ink leading-tight max-w-2xl mb-10">
              From the field.
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {project.gallery.map((item, i) => (
                <div
                  key={i}
                  className={`proj-gallery-item opacity-0 group overflow-hidden rounded-[12px] bg-white ${i === 0 ? 'sm:col-span-2' : ''}`}
                >
                  {item.type === 'video' ? (
                    <div className="media-frame">
                      <video
                        src={item.src}
                        poster={item.poster}
                        className="h-full w-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />
                    </div>
                  ) : (
                    <div className={`media-frame ${i === 0 ? 'h-64 sm:h-80 md:h-96' : 'h-56 sm:h-64'}`}>
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}
                  {item.caption && (
                    <p className="px-5 py-4 text-sm text-map leading-relaxed border-t border-line">
                      {item.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Challenge / Approach / Outcome */}
      <section ref={bodyRef} className="py-20 bg-white">
        <div className="frame max-w-3xl mx-auto">
          <div className="proj-body space-y-14">
            <div>
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.13em] text-plot mb-4">The Challenge</h2>
              <p className="text-lg text-map leading-relaxed">{project.challenge}</p>
            </div>
            <div className="border-t border-line pt-14">
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.13em] text-plot mb-4">Our Approach</h2>
              <p className="text-lg text-map leading-relaxed">{project.approach}</p>
            </div>
            <div className="border-t border-line pt-14">
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.13em] text-plot mb-4">The Outcome</h2>
              <p className="text-lg text-map leading-relaxed">{project.outcome}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-20 bg-paper">
          <div className="frame">
            <p className="mono-label">Related Services</p>
            <h2 className="display mt-4 font-extrabold text-4xl md:text-5xl tracking-[-0.04em] text-ink leading-tight">
              Areas of work
            </h2>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedServices.map((s) => (
                <Link
                  key={s.slug}
                  to={`/what-we-do/${s.slug}`}
                  className="group bg-white rounded-[12px] p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <h3 className="display font-extrabold text-xl text-ink group-hover:text-plot transition-colors duration-300">{s.title}</h3>
                  <p className="mt-2 text-sm text-map">{s.tagline}</p>
                  <span className="inline-flex items-center gap-2 text-link mt-4 text-sm">
                    Learn more
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-ink">
        <div className="frame flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h2 className="display font-extrabold text-3xl md:text-4xl tracking-[-0.04em] text-white leading-tight">
              Interested in <span className="text-plot">similar work</span>?
            </h2>
            <p className="mt-3 text-white/65 max-w-xl text-lg font-body">
              We partner with county governments, funders and community organisations.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a href="mailto:info@cspark.org" className="button-plot group">
              Partner With Us <span>→</span>
            </a>
            <Link to="/projects" className="button-ink group">
              All Projects <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}