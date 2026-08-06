import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    location: 'Lake Victoria Basin',
    title: 'Marine Spatial Planning for the Lake Victoria Basin',
    issue: 'Competing uses of the lake — fisheries, transport, energy, and conservation — were creating conflict and degrading livelihoods.',
    outcome: 'A spatial framework that balances ecological protection with economic use, developed with riparian communities and county governments.',
    tag: 'Spatial Governance',
    gradient: 'from-emerald-900 via-forest to-teal-800',
  },
  {
    location: 'Kisumu',
    title: 'Enumeration & Planning Support for Street Traders',
    issue: 'Street traders faced eviction and displacement without data to support their right to the city.',
    outcome: 'Community-led enumeration providing evidence for inclusive market planning and secure trading spaces.',
    tag: 'Urban Livelihoods',
    gradient: 'from-terracotta via-orange-800 to-amber-900',
  },
  {
    location: 'Nairobi & Nakuru',
    title: 'Informal Settlement Mapping & Relocation Action Plans',
    issue: 'Residents of informal settlements lacked secure tenure and were excluded from infrastructure upgrades.',
    outcome: 'Detailed household mapping and relocation action plans that put affected families at the centre of upgrading decisions.',
    tag: 'Housing & Security',
    gradient: 'from-slate-800 via-forest to-emerald-900',
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Section header reveal
      gsap.fromTo('.project-header', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      });

      // Card stagger reveal
      gsap.fromTo('.project-card', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power2.out', stagger: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
      });

      // Subtle parallax on the gradient backgrounds
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const grad = card.querySelector('.proj-grad');
        if (!grad) return;
        gsap.to(grad, {
          yPercent: 15,
          scale: 1.05,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });

        // Parallax on the grid pattern
        const grid = card.querySelector('.proj-grid');
        if (grid) {
          gsap.to(grid, {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.3,
            },
          });
        }
      });

      // CTA reveal
      gsap.fromTo('.proj-cta', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 95%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-28 bg-white">
      <div className="container-cspark">
        {/* Header */}
        <div className="project-header flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 opacity-0" data-scroll="fade-up">
          <div className="max-w-2xl">
            <span className="section-label">Projects & Impact</span>
            <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl tracking-tight text-ink leading-tight">
              Brief. Approach. <em className="font-serif italic text-forest">Outcome.</em>
            </h2>
          </div>
          <p className="max-w-md text-slate leading-relaxed">
            Real projects with real communities — each one showing how spatial research
            becomes spatial justice.
          </p>
        </div>

        {/* Project cards */}
        <div className="space-y-8">
          {projects.map((project, i) => (
            <article
              key={project.title}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="project-card opacity-0 group grid lg:grid-cols-5 bg-cream border border-gray-200 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-terracotta/40 hover:-translate-y-1"
            >
              {/* Visual side */}
              <div className="lg:col-span-2 relative min-h-[260px] overflow-hidden">
                <div className={`proj-grad absolute inset-0 bg-gradient-to-br ${project.gradient} transition-all duration-700 group-hover:scale-110 will-change-transform`} />
                {/* Map grid pattern */}
                <svg className="proj-grid absolute inset-0 w-full h-full opacity-15 transition-opacity duration-500 group-hover:opacity-25" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <g stroke="white" strokeWidth="0.5">
                    <path d="M0,50 H600 M0,100 H600 M0,150 H600 M0,200 H600 M0,250 H600 M0,300 H600 M0,350 H600" />
                    <path d="M50,0 V400 M100,0 V400 M150,0 V400 M200,0 V400 M250,0 V400 M300,0 V400 M350,0 V400 M400,0 V400 M450,0 V400 M500,0 V400 M550,0 V400" />
                  </g>
                  <g stroke="white" strokeWidth="1.2">
                    <path d="M120,80 C200,120 260,180 320,220 C380,260 440,300 520,340" strokeDasharray="4 4" />
                    <path d="M100,120 C180,160 240,220 300,260 C360,300 420,340 500,380" strokeDasharray="4 4" />
                  </g>
                  <circle cx="350" cy="230" r="6" fill="white" />
                  <circle cx="350" cy="230" r="14" stroke="white" strokeWidth="1" opacity="0.5" />
                </svg>
                <div className="absolute top-5 left-5">
                  <span className="px-4 py-1.5 rounded-full bg-black/30 text-white text-xs font-display tracking-wide uppercase backdrop-blur-sm">
                    {project.tag}
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 flex items-center gap-2 text-white/90 group-hover:text-white transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  <span className="font-display font-medium text-sm">{project.location}</span>
                </div>
              </div>

              {/* Content side */}
              <div className="lg:col-span-3 p-8 md:p-10 flex flex-col justify-center">
                <h3 className="font-display font-semibold text-2xl md:text-3xl text-ink leading-snug mb-6 group-hover:text-forest transition-colors duration-300">
                  {project.title}
                </h3>

                <div className="space-y-5">
                  <div className="flex gap-4">
                    <span className="font-display font-semibold text-xs text-terracotta uppercase tracking-wide pt-1 shrink-0 w-20">The issue</span>
                    <p className="text-sm md:text-base text-slate leading-relaxed group-hover:text-ink transition-colors duration-300">{project.issue}</p>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-display font-semibold text-xs text-forest uppercase tracking-wide pt-1 shrink-0 w-20">Outcome</span>
                    <p className="text-sm md:text-base text-slate leading-relaxed group-hover:text-ink transition-colors duration-300">{project.outcome}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="project-header mt-14 text-center opacity-0 proj-cta" data-scroll="fade-up">
          <a href="#contact" className="btn-outline-dark group">
            View All Projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}