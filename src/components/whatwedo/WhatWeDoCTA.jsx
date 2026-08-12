import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhatWeDoCTA() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.wwd-cta-content', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-ink">
      <div className="frame">
        <div className="wwd-cta-content opacity-0 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h2 className="display font-extrabold text-3xl md:text-4xl tracking-[-0.04em] text-white leading-tight">
              Bring us into your <span className="text-plot">planning process</span>
            </h2>
            <p className="mt-3 text-white/65 max-w-xl text-lg font-body">
              Whether you are a county government, funder or community group ,  our expertise is yours to draw on.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a href="mailto:info@cspark.org" className="button-plot group">
              Partner With Us <span>→</span>
            </a>
            <Link to="/projects" className="button-ink group">
              See Our Projects <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}