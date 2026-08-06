import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const groups = [
  ['#top', ['.hero-copy > *', '.hero-action'], { y: 42, stagger: 0.12 }],
  ['#what-we-do', ['.mono-label', '.display', '.service-card'], { y: 48, stagger: 0.1 }],
  ['#about', ['aside', '.media-frame', '.glance-item'], { x: -32, stagger: 0.12 }],
  ['#mission', ['.media-frame', '.mission-copy', '#mission article'], { y: 42, stagger: 0.12 }],
  ['#projects', ['.mono-label', '#projects h2', '#projects p', '.project-card'], { y: 55, stagger: 0.13 }],
  ['#governance', ['#governance > div > div:first-child', '.gov-card', '#governance article'], { y: 42, stagger: 0.1 }],
  ['#contact', ['section > div', '.frame > div'], { y: 32, stagger: 0.1 }],
];

export function useScrollReveal(scope) {
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    groups.forEach(([sectionSelector, selectors, options]) => {
      const section = scope.current?.querySelector(sectionSelector);
      if (!section) return;
      const targets = selectors.flatMap((selector) => [...section.querySelectorAll(selector)]).filter((el, index, all) => all.indexOf(el) === index);
      if (!targets.length) return;
      gsap.set(targets, { willChange: 'transform, opacity' });
      gsap.fromTo(targets, { autoAlpha: 0, x: options.x || 0, y: options.y || 0 }, {
        autoAlpha: 1, x: 0, y: 0, duration: 0.78, stagger: options.stagger, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 82%', once: true }, clearProps: 'willChange',
      });
    });
    const media = scope.current?.querySelectorAll('.media-frame');
    media?.forEach((frame) => gsap.fromTo(frame, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.95, ease: 'power3.inOut', scrollTrigger: { trigger: frame, start: 'top 82%', once: true } }));
  }, { scope });
}
