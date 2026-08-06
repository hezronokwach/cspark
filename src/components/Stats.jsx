import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 11, suffix: '+', label: 'Counties Covered', note: 'Kisumu, Nairobi, Nakuru, Eldoret, Mombasa & more' },
  { value: 6, suffix: '', label: 'Thematic Areas', note: 'From spatial governance to urban security' },
  { value: 20, suffix: '+', label: 'Studies & Plans', note: 'ISUDPs, LEDPs, enumerations & policy briefs' },
  { value: 5, suffix: '+', label: 'Years of Advocacy', note: 'Serving communities since 2019' },
];

function Counter({ value, suffix, label, note }) {
  const numberRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      numberRef.current.textContent = value + suffix;
      return;
    }

    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: value,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: numberRef.current,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.textContent = Math.floor(obj.val) + suffix;
          }
        },
        onComplete: () => {
          if (numberRef.current) {
            numberRef.current.textContent = value + suffix;
          }
        },
      });
    }, numberRef);

    return () => ctx.revert();
  }, [value, suffix]);

  return (
    <div className="group">
      <div
        ref={numberRef}
        className="font-display font-bold text-5xl md:text-6xl text-terracotta tabular-nums transition-colors duration-300 group-hover:text-terracotta-dark"
      >
        0
      </div>
      <h3 className="mt-3 font-display font-semibold text-lg text-ink group-hover:text-forest transition-colors duration-300">{label}</h3>
      <p className="mt-1.5 text-sm text-slate leading-relaxed group-hover:text-ink transition-colors duration-300">{note}</p>
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stat-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
      gsap.fromTo(
        '.stat-heading',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 bg-cream">
      <div className="container-cspark">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16">
          {/* Left: Label + intro */}
          <div className="stat-heading opacity-0" data-scroll="fade-up">
            <span className="section-label">Evidence in Action</span>
            <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl tracking-tight text-ink leading-tight">
              Numbers that tell the story of{' '}
              <em className="font-serif italic text-forest">grounded</em> research
            </h2>
            <div className="mt-6 w-16 h-px bg-terracotta" />
            <p className="mt-6 text-slate leading-relaxed">
              Every plan, enumeration, and policy brief we produce is rooted in communities —
              built with county governments, residents, and stakeholders who live with the outcomes.
            </p>
          </div>

          {/* Right: Stats grid */}
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-12">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-item opacity-0 border-l-2 border-gray-200 pl-6 transition-all duration-500 hover:border-terracotta hover:translate-x-2">
                <Counter {...stat} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}