import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const news = [
  {
    date: 'Aug 2026',
    title: 'Marine Spatial Planning Dialogue in Kisumu',
    excerpt: 'Community stakeholders and county officials convened to shape the future of Lake Victoria basin planning.',
    tag: 'Advocacy',
    gradient: 'from-terracotta to-orange-900',
  },
  {
    date: 'Jul 2026',
    title: 'Street Trader Enumeration Report Released',
    excerpt: 'New data from our Kisumu enumeration supports inclusive market planning and secure trading spaces.',
    tag: 'Research',
    gradient: 'from-charcoal to-slate-800',
  },
  {
    date: 'Jun 2026',
    title: 'Gender Mainstreaming in County Planning',
    excerpt: 'A policy brief on embedding gender equality across Integrated Strategic Urban Development Plans.',
    tag: 'Policy Brief',
    gradient: 'from-gold to-amber-800',
  },
  {
    date: 'May 2026',
    title: 'Community-Led Planning in Nakuru',
    excerpt: 'Participatory enumeration and land reorganisation workshops with informal settlement residents.',
    tag: 'Fieldwork',
    gradient: 'from-forest to-emerald-900',
  },
];

export default function News() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.news-header', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      });
      gsap.fromTo('.news-card', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="publications" ref={sectionRef} className="py-28 bg-cream">
      <div className="container-cspark">
        {/* Header */}
        <div className="news-header flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 opacity-0" data-scroll="fade-up">
          <div className="max-w-2xl">
            <span className="section-label">News & Insights</span>
            <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl tracking-tight text-ink leading-tight">
              Latest from the <em className="font-serif italic text-forest">field</em>
            </h2>
          </div>
          <a href="#contact" className="btn-outline-dark shrink-0 group">
            Read All News
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item) => (
            <article key={item.title} className="news-card opacity-0 group bg-white rounded-2xl overflow-hidden border border-gray-200 transition-all duration-500 hover:shadow-2xl hover:border-terracotta/40 hover:-translate-y-2 cursor-pointer">
              {/* Visual */}
              <div className={`relative h-44 bg-gradient-to-br ${item.gradient} overflow-hidden`}>
                <svg className="absolute inset-0 w-full h-full opacity-10 group-hover:opacity-20 transition-opacity duration-500" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g stroke="white" strokeWidth="0.5">
                    <path d="M0,40 H400 M0,80 H400 M0,120 H400 M0,160 H400" />
                    <path d="M50,0 V200 M100,0 V200 M150,0 V200 M200,0 V200 M250,0 V200 M300,0 V200 M350,0 V200" />
                  </g>
                </svg>
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/30 text-white text-[10px] font-display tracking-wider uppercase backdrop-blur-sm">
                  {item.tag}
                </span>
                <span className="absolute bottom-4 left-4 text-white/90 font-display font-semibold text-sm">
                  {item.date}
                </span>
                {/* Hover arrow */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-0 -rotate-90">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display font-semibold text-lg text-ink leading-snug mb-3 group-hover:text-forest transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-slate leading-relaxed mb-5 group-hover:text-ink transition-colors duration-300">{item.excerpt}</p>
                <span className="inline-flex items-center gap-1.5 font-display font-semibold text-sm text-terracotta group-hover:gap-3 transition-all duration-300">
                  Read more
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}