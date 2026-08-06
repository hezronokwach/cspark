import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const eyebrowRef = useRef(null);
  const statsRef = useRef(null);
  const gradientRefs = useRef([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1. Animate gradient blobs continuously
      gradientRefs.current.forEach((ref, i) => {
        if (!ref) return;
        gsap.to(ref, {
          x: gsap.utils.random(-100, 100),
          y: gsap.utils.random(-100, 100),
          rotation: gsap.utils.random(-180, 180),
          scale: gsap.utils.random(0.9, 1.15),
          duration: gsap.utils.random(12, 20),
          ease: 'none',
          repeat: -1,
          yoyo: true,
        });
      });

      // 2. Entrance animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(eyebrowRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
        .fromTo(headlineRef.current.querySelectorAll('.hero-line'), { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.12 }, '-=0.3')
        .fromTo(subRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.4')
        .fromTo(ctaRef.current.querySelectorAll('.hero-cta'), { y: 15, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(1.4)' }, '-=0.3')
        .fromTo(statsRef.current.querySelectorAll('.hero-stat'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 }, '-=0.2');

      // 3. Scroll fade-out — delayed so text stays visible until ~70% scroll
      const fadeTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center center',   // start fading only when hero center hits viewport center
          end: 'bottom top',        // fully gone when hero bottom reaches viewport top
          scrub: true,
        },
      });

      fadeTimeline
        .to(eyebrowRef.current, { opacity: 0, y: -20, duration: 0.3 }, 0)
        .to(headlineRef.current.querySelectorAll('.hero-line'), { opacity: 0, y: -40, stagger: 0.05, duration: 0.5 }, 0)
        .to(subRef.current, { opacity: 0, y: -25, duration: 0.4 }, 0.1)
        .to(ctaRef.current.querySelectorAll('.hero-cta'), { opacity: 0, y: -30, scale: 0.95, stagger: 0.05, duration: 0.4 }, 0.15)
        .to(statsRef.current.querySelectorAll('.hero-stat'), { opacity: 0, y: -20, stagger: 0.05, duration: 0.4 }, 0.2);

      // 4. Parallax on gradient blobs during scroll
      gradientRefs.current.forEach((ref, i) => {
        if (!ref) return;
        gsap.to(ref, {
          yPercent: i % 2 === 0 ? 30 : -25,
          xPercent: i % 3 === 0 ? 20 : -15,
          rotation: i * 15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.3,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative min-h-[90svh] flex items-center overflow-hidden bg-forest"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          ref={(el) => { gradientRefs.current[0] = el; }}
          className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] rounded-full bg-terracotta/25 will-change-transform"
          style={{ filter: 'blur(140px)' }}
        />
        <div
          ref={(el) => { gradientRefs.current[1] = el; }}
          className="absolute top-[30%] right-[-15%] w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] rounded-full bg-gold/20 will-change-transform"
          style={{ filter: 'blur(140px)' }}
        />
        <div
          ref={(el) => { gradientRefs.current[2] = el; }}
          className="absolute bottom-[-25%] left-[20%] w-[80vw] h-[80vw] max-w-[700px] max-h-[700px] rounded-full bg-forest-light/15 will-change-transform"
          style={{ filter: 'blur(160px)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/40 via-transparent to-forest-dark/50" />
      </div>

      <div className="container-cspark relative z-10 py-24">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div ref={eyebrowRef} className="inline-flex items-center gap-3 mb-6 opacity-0">
            <span className="w-10 h-px bg-terracotta" />
            <span className="font-display font-semibold text-xs tracking-[0.3em] uppercase text-terracotta">
              Centre for Spatial Planning Advocacy & Research in Kenya
            </span>
          </div>

          {/* Headline — left-aligned, compact */}
          <h1
            ref={headlineRef}
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.05] tracking-tightest text-white"
          >
            <span className="hero-line block opacity-0">Spatial Planning</span>
            <span className="hero-line block opacity-0">for</span>
            <span className="hero-line block opacity-0">
              <em className="font-serif italic font-medium text-terracotta-light relative">
                Social Justice
                <svg className="absolute -bottom-2 left-0 w-[200px]" height="8" viewBox="0 0 300 8" fill="none" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M2,6 C80,2 200,2 298,5" stroke="#E2725B" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </em>
            </span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subRef}
            className="mt-6 max-w-xl text-base md:text-lg lg:text-xl text-white/80 leading-relaxed opacity-0"
          >
            We bridge spatial planning and social justice through research, advocacy,
            and technical expertise — making land, urban, and county-level planning
            work for the people it affects most.
          </p>

          {/* CTAs — side by side, visible above the fold */}
          <div ref={ctaRef} className="mt-8 flex flex-wrap gap-3">
            <a href="#what-we-do" className="hero-cta btn-primary opacity-0 group">
              <span className="relative z-10">Explore Our Work</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#about" className="hero-cta btn-outline opacity-0 group">
              <span className="relative z-10">Who We Are</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Stats strip — left-aligned, below CTAs */}
          <div ref={statsRef} className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/10 pt-8 max-w-2xl">
            {[
              { value: '11+', label: 'Counties' },
              { value: '20+', label: 'Studies' },
              { value: '6', label: 'Thematic Areas' },
              { value: '5+', label: 'Years' },
            ].map((stat) => (
              <div key={stat.label} className="hero-stat opacity-0">
                <div className="font-display font-bold text-2xl md:text-3xl text-white">{stat.value}</div>
                <div className="text-[11px] text-white/50 tracking-wider uppercase mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[10px] font-display tracking-[0.3em] uppercase text-white/40">Scroll</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/30">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}