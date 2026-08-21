import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const records = [
  ['Participatory research', 'We work with communities and county teams who will use the results.'],
  ['Safeguarding', 'Safeguarding guides every programme, study and field activity.'],
  ['Data protection', 'We handle personal information with care and follow Kenya\'s law.']
];

const people = [
  { slug: 'alando-walter', name: 'Dr. Alando Walter', specialty: 'Transport and urban development planning', bio: 'Urban development practitioner and researcher working across transport, governance and climate resilience.', memberships: 'KIP · EIK', image: '/images/alando.jpeg', social: { linkedin: 'https://linkedin.com/in/alando-walter', twitter: 'https://twitter.com/alando' } },
  { slug: 'mildred-ambani', name: 'Mildred Ambani', specialty: 'GIS and urban management', bio: 'A specialist in geographic information systems who supports data-led planning across Kenyan counties.', memberships: 'GIS · Urban management', social: { linkedin: 'https://linkedin.com/in/mildred-ambani' } },
  { slug: 'nicodemus-mbwika', name: 'Nicodemus Mbwika', specialty: 'Governance and project management', bio: 'A governance and delivery specialist focused on accountable programmes and strong partnerships.', memberships: 'Governance · Delivery', social: { linkedin: 'https://linkedin.com/in/nicodemus-mbwika' } },
  { slug: 'kim-okoth', name: 'Kim Okoth', specialty: 'Management science', bio: 'A management science specialist who keeps CSPARK\'s operations, finance and human resources aligned with the organisation\'s mission.', memberships: 'Management · Operations', social: { linkedin: 'https://linkedin.com/in/kim-okoth' } },
  { slug: 'emmanuel-midheme', name: 'Emmanuel Midheme', specialty: 'Land management and environment', bio: 'A land management and environment specialist whose research connects tenure security, environmental sustainability and spatial justice.', memberships: 'Land · Environment', social: { linkedin: 'https://linkedin.com/in/emmanuel-midheme', twitter: 'https://twitter.com/emidheme' } },
  { slug: 'amos-kasimu', name: 'Amos Kasimu', specialty: 'Urban planning', bio: 'An urban planner with deep experience in participatory settlement mapping, relocation action plans and county-level spatial frameworks.', memberships: 'Planning · Community', social: { linkedin: 'https://linkedin.com/in/amos-kasimu' } }
];

function SocialLinks({ social }) {
  if (!social) return null;
  return (
    <div className="flex gap-2">
      {social.linkedin && (
        <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-ink/10 hover:bg-plot hover:text-white flex items-center justify-center transition-all duration-300">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      )}
      {social.twitter && (
        <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-ink/10 hover:bg-plot hover:text-white flex items-center justify-center transition-all duration-300">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
        </a>
      )}
    </div>
  );
}

function TeamCard({ person, index }) {
  return (
    <article className="rounded-[12px] bg-[#ece7dc] p-7 flex flex-col">
      {person.image ? (
        <div className="media-frame h-64 rounded-[10px] overflow-hidden">
          <img src={person.image} alt={person.name} className="h-full w-full object-cover" />
        </div>
      ) : (
        <div className="grid h-64 place-items-center rounded-[10px] bg-ink text-6xl font-display font-extrabold text-plot/70">
          {String(index + 1).padStart(2, '0')}
        </div>
      )}
      <h3 className="display mt-6 text-2xl font-extrabold">{person.name}</h3>
      <p className="mt-2 text-map">{person.specialty}</p>
      <p className="mt-3 text-sm text-map/80 line-clamp-3">{person.bio}</p>
      <div className="mt-auto pt-6 flex items-center justify-between">
        <Link to={`/about#team-${person.slug}`} className="action-link">
          View profile <span>→</span>
        </Link>
        <SocialLinks social={person.social} />
      </div>
    </article>
  );
}

export default function Governance() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const c = gsap.context(() =>
      gsap.fromTo('.gov-card', { opacity: 0, y: 45 }, { opacity: 1, y: 0, duration: .65, stagger: .1, scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true } }),
      ref
    );
    return () => c.revert();
  }, []);

  const mouse = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <section id="governance" ref={ref} className="py-20 sm:py-28">
      <div className="frame">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="mono-label">Governance</p>
            <h2 className="display mt-4 text-5xl font-extrabold leading-[1.03]">Accountability is part of the work.</h2>
          </div>
          <p className="self-end max-w-2xl text-lg leading-relaxed">Our policies and processes help partners see how we work and help communities know what to expect from us.</p>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {records.map(([title, copy]) => (
            <article onPointerMove={mouse} className="gov-card cursor-card rounded-[12px] bg-paper p-7 opacity-0 transition-transform hover:-translate-y-1 hover:shadow-lg" key={title}>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-plot font-display font-bold text-white">+</span>
              <h3 className="display mt-8 text-xl font-bold">{title}</h3>
              <p className="mt-4 leading-relaxed text-map">{copy}</p>
            </article>
          ))}
        </div>
        <div className="mt-24 flex items-end justify-between border-b border-line pb-6">
          <div>
            <p className="mono-label">Leadership</p>
            <h2 className="display mt-3 text-4xl font-extrabold">The people behind CSPARK.</h2>
          </div>
        </div>
        <div className="grid gap-6 pt-5 md:grid-cols-2 lg:grid-cols-3">
          {people.map((person, i) => (
            <TeamCard key={person.slug} person={person} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
