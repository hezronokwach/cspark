import { useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getService } from '../data/services';
import { getProjectsByService } from '../data/projects';
import Breadcrumb from '../components/shared/Breadcrumb';
import RelatedProjects from '../components/shared/RelatedProjects';

gsap.registerPlugin(ScrollTrigger);

export default function ServicePage() {
  const { slug } = useParams();
  const service = getService(slug);
  const heroRef = useRef(null);
  const introRef = useRef(null);
  const focusRef = useRef(null);
  const whyRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.svc-hero > *', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out' });
      gsap.to('.svc-hero-img', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 0.4 } });
      gsap.fromTo('.svc-intro > *', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power2.out', scrollTrigger: { trigger: introRef.current, start: 'top 78%', once: true } });
      gsap.fromTo('.svc-focus-item', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: focusRef.current, start: 'top 80%', once: true } });
      gsap.fromTo('.svc-why-item', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: whyRef.current, start: 'top 82%', once: true } });
    });
    return () => ctx.revert();
  }, [slug]);

  if (!service) {
    return (
      <section className="py-40 text-center">
        <div className="frame"><h1 className="display font-extrabold text-4xl text-ink">Service not found.</h1></div>
      </section>
    );
  }

  const relatedProjects = getProjectsByService([slug]);

  return (
    <main>
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[80svh] flex items-end overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink to-ink/60" />
        <img
          src={service.heroImage}
          alt={service.title}
          className="svc-hero-img absolute inset-0 w-full h-full object-cover will-change-transform"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/50 to-ink/20" />

        <div className="frame relative z-10 w-full pb-16 pt-28">
          <div className="svc-hero opacity-0">
            <Breadcrumb items={[
              { label: 'Home', href: '/' },
              { label: 'What We Do', href: '/what-we-do' },
              { label: service.title },
            ]} />
          </div>
          <h1 className="display svc-hero font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.05] tracking-[-0.04em] text-white max-w-4xl mt-6">
            {service.tagline}
          </h1>
          <p className="svc-hero mt-6 max-w-xl text-lg text-white/75 leading-relaxed font-body">
            {service.title}
          </p>
        </div>
      </section>

      {/* Intro */}
      <section ref={introRef} className="py-20 bg-white">
        <div className="frame max-w-3xl">
          <div className="svc-intro space-y-5">
            {service.intro.map((p, i) => (
              <p key={i} className="text-lg text-map leading-relaxed">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section ref={focusRef} className="py-20 bg-paper">
        <div className="frame">
          <p className="mono-label">What We Deliver</p>
          <h2 className="display mt-4 font-extrabold text-4xl md:text-5xl tracking-[-0.04em] text-ink leading-tight max-w-2xl">
            Evidence, plans and frameworks
          </h2>
          <div className="mt-12 border-t border-line">
            {service.focusAreas.map((item, i) => (
              <div key={item} className="svc-focus-item opacity-0 flex items-center gap-5 py-5 border-b border-line group hover:bg-white/60 transition-colors duration-300 px-4 -mx-4 rounded-[8px]">
                <span className="font-display font-extrabold text-2xl text-line group-hover:text-plot transition-colors duration-300 w-10 text-right shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-lg text-ink group-hover:text-plot transition-colors duration-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section ref={whyRef} className="py-20 bg-white">
        <div className="frame">
          <p className="mono-label">Why Partners Work With Us</p>
          <h2 className="display mt-4 font-extrabold text-4xl md:text-5xl tracking-[-0.04em] text-ink leading-tight max-w-2xl">
            Grounded, rigorous and accountable
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {service.whyUs.map((item, i) => (
              <div key={i} className="svc-why-item opacity-0 flex items-start gap-4 p-6 rounded-[12px] bg-paper transition-all duration-300 hover:shadow-lg">
                <span className="mt-0.5 w-7 h-7 rounded-full bg-plot/15 flex items-center justify-center shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-plot">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <p className="text-map leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && <RelatedProjects projects={relatedProjects} />}

      {/* CTA */}
      <section className="py-20 bg-ink">
        <div className="frame flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h2 className="display font-extrabold text-3xl md:text-4xl tracking-[-0.04em] text-white leading-tight">
              Ready to start a <span className="text-plot">project</span>?
            </h2>
            <p className="mt-3 text-white/65 max-w-xl text-lg font-body">
              Talk to us about your planning needs ,  from research to implementation support.
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