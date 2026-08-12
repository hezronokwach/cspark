import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { projects } from '../data/projects';

export default function Projects() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const c = gsap.context(() =>
      gsap.fromTo('.project-card', { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: .75, stagger: .14, scrollTrigger: { trigger: ref.current, start: 'top 76%', once: true } }),
      ref
    );
    return () => c.revert();
  }, []);

  return (
    <section id="projects" ref={ref} className="bg-paper py-20 sm:py-28">
      <div className="frame">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mono-label">Selected projects</p>
          <h2 className="display mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">Change begins with a clear picture of what is happening.</h2>
          <p className="mt-5 text-lg leading-relaxed">Our projects help people turn local knowledge into better choices.</p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <article className="project-card flex min-h-[520px] flex-col overflow-hidden rounded-[12px] bg-white opacity-0 shadow-sm" key={project.slug}>
              <div className="media-frame h-56">
                <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <p className="font-display text-sm font-bold text-plot">{project.place}</p>
                <h3 className="display mt-4 text-3xl font-extrabold leading-tight">{project.title}</h3>
                <p className="mt-5 leading-relaxed text-map">{project.summary}</p>
                <Link to={`/projects/${project.slug}`} className="action-link mt-auto self-start">
                  View project <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
