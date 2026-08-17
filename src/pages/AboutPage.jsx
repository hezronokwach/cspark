import { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { team } from '../data/team';

gsap.registerPlugin(ScrollTrigger);

const values = [
  { title: 'Participation', copy: 'Broad-based stakeholder engagement and teamwork ,  planning with communities, not for them.' },
  { title: 'Integrity', copy: 'Rigorous research and honest dealings ,  evidence that stands up to scrutiny.' },
  { title: 'Respect', copy: 'Gender, cultural and socio-economic diversity recognised in every engagement.' },
  { title: 'Social Good', copy: 'Upholding the best interest of society at large in every plan, study and recommendation.' },
  { title: 'Accountability', copy: 'Financial and social accountability to partners, communities and society.' },
];

function SocialLinks({ social }) {
  if (!social) return null;
  return (
    <div className="flex gap-3 mt-6">
      {social.linkedin && (
        <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-ink/10 hover:bg-plot hover:text-white flex items-center justify-center transition-all duration-300">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      )}
      {social.twitter && (
        <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-ink/10 hover:bg-plot hover:text-white flex items-center justify-center transition-all duration-300">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </a>
      )}
    </div>
  );
}

function TeamSection() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const location = useLocation();
  const noMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (noMotion) return;
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    let timeoutId;
    let stRef = null;

    const scrollToMember = () => {
      if (!stRef) return;
      const slug = location.hash.replace(/^#team-/, '');
      const idx = team.findIndex((m) => m.slug === slug);
      if (idx < 0) return;
      const count = team.length;
      const p = idx === 0 ? 0 : Math.min(1, (idx - 0.2) / (count - 1.2));
      const target = stRef.start + (stRef.end - stRef.start) * p;
      window.scrollTo(0, target);
      ScrollTrigger.update();
    };

    const ctx = gsap.context(() => {
      const textEls = gsap.utils.toArray('.team-text-block');
      const imgEls = gsap.utils.toArray('.team-img-block');
      const count = team.length;

      gsap.set(textEls, { autoAlpha: 0, y: 30 });
      gsap.set(imgEls, { autoAlpha: 0, scale: 1.05 });
      gsap.set([textEls[0], imgEls[0]], { autoAlpha: 1, y: 0, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          pin: true,
          start: 'top top',
          end: () => `+=${count * window.innerHeight * 0.75}`,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });
      stRef = tl.scrollTrigger;

      for (let i = 1; i < count; i++) {
        const outText = textEls[i - 1];
        const inText = textEls[i];
        const outImg = imgEls[i - 1];
        const inImg = imgEls[i];

        tl.to(outText, { autoAlpha: 0, y: -40, duration: 0.4, ease: 'power2.in' }, i - 1)
          .to(outImg, { autoAlpha: 0, scale: 0.95, duration: 0.4, ease: 'power2.in' }, i - 1)
          .to(inText, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, i - 0.7)
          .to(inImg, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power2.out' }, i - 0.7);
      }

      if (location.hash.match(/^#team-/)) {
        timeoutId = setTimeout(() => {
          ScrollTrigger.refresh();
          scrollToMember();
        }, 250);
      }
    }, section);

    const onLoad = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        ScrollTrigger.refresh();
        scrollToMember();
      }, 150);
    };
    if (location.hash.match(/^#team-/)) {
      window.addEventListener('load', onLoad);
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('load', onLoad);
      ctx.revert();
    };
  }, [noMotion, location.hash]);

  if (noMotion) {
    return (
      <section id="team" className="py-20 sm:py-28 bg-paper">
        <div className="frame">
          <p className="mono-label">Leadership</p>
          <h2 className="display mt-4 font-extrabold text-4xl md:text-5xl tracking-[-0.04em] text-ink leading-tight max-w-2xl">
            The people behind the work.
          </h2>
          <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) => (
              <div key={member.slug} id={`member-${member.slug}`} className="flex flex-col">
                <div className="relative overflow-hidden aspect-[4/5] rounded-[12px] bg-white flex flex-col items-center justify-center p-8 shadow-sm">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="h-full w-full object-cover absolute inset-0" />
                  ) : (
                    <>
                      <div className="grid h-28 w-28 place-items-center rounded-[10px] bg-ink text-4xl font-display font-extrabold text-plot/70">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <h3 className="display mt-6 text-xl font-extrabold text-ink">{member.name}</h3>
                      <p className="mt-1 text-sm font-display font-semibold text-plot">{member.role}</p>
                    </>
                  )}
                </div>
                <p className="mt-5 display text-xl font-semibold leading-snug text-ink tracking-[-0.02em]">
                  &ldquo;{member.quote}&rdquo;
                </p>
                <p className="mt-3 text-map leading-relaxed">{member.bio}</p>
                <p className="mt-3 font-display text-xs font-semibold text-plot/70">{member.memberships}</p>
                <SocialLinks social={member.social} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" ref={sectionRef} className="bg-paper">
      <div className="frame pt-20 sm:pt-28 pb-4">
        <p className="mono-label">Leadership</p>
        <h2 className="display mt-4 font-extrabold text-4xl md:text-5xl tracking-[-0.04em] text-ink leading-tight max-w-2xl">
          The people behind the work.
        </h2>
      </div>

      <div ref={pinRef} className="hidden md:block">
        <div className="frame grid grid-cols-[45%_55%] gap-8" style={{ minHeight: '80vh' }}>
          <div className="relative flex items-center">
            {team.map((member, i) => (
              <div
                key={member.slug}
                className="team-text-block absolute inset-0 flex flex-col justify-center pr-8"
              >
                <p className="display text-2xl lg:text-[2rem] font-semibold leading-[1.15] text-ink tracking-[-0.03em] max-w-lg">
                  &ldquo;{member.quote}&rdquo;
                </p>
                <h3 className="display mt-8 text-2xl font-extrabold text-ink">{member.name}</h3>
                <p className="mt-2 text-sm font-display font-semibold text-plot">{member.role} · {member.speciality}</p>
                <p className="mt-5 max-w-md text-map leading-relaxed">{member.bio}</p>
                <p className="mt-5 font-display text-xs font-semibold text-plot/70 tracking-wide">{member.memberships}</p>
                <SocialLinks social={member.social} />
              </div>
            ))}
          </div>

          <div className="relative flex items-center justify-center">
            {team.map((member, i) => (
              <div
                key={member.slug}
                className="team-img-block absolute inset-0 flex items-center justify-center"
              >
                <div className="w-full max-w-md aspect-[4/5] rounded-[16px] bg-white flex flex-col items-center justify-center overflow-hidden shadow-xl">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                  ) : (
                    <>
                      <div className="grid h-40 w-40 place-items-center rounded-[14px] bg-ink text-6xl font-display font-extrabold text-plot/70 sm:h-48 sm:w-48 sm:text-7xl">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <h3 className="display mt-8 text-2xl font-extrabold text-ink text-center sm:text-3xl">{member.name}</h3>
                      <p className="mt-2 text-sm font-display font-semibold text-plot text-center">{member.role}</p>
                      <p className="mt-1 text-sm text-map text-center">{member.speciality}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="md:hidden pb-16">
        <div className="frame space-y-14">
          {team.map((member, i) => (
            <div key={member.slug} id={`member-${member.slug}`} className="flex flex-col">
              <div className="relative aspect-[4/5] max-w-xs rounded-[12px] bg-white flex flex-col items-center justify-center p-8 shadow-sm self-center overflow-hidden">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="h-full w-full object-cover absolute inset-0" />
                ) : (
                  <>
                    <div className="grid h-28 w-28 place-items-center rounded-[10px] bg-ink text-4xl font-display font-extrabold text-plot/70">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <h3 className="display mt-6 text-xl font-extrabold text-ink text-center">{member.name}</h3>
                    <p className="mt-1 text-sm font-display font-semibold text-plot text-center">{member.role}</p>
                  </>
                )}
              </div>
              <p className="mt-5 display text-xl font-semibold leading-snug text-ink tracking-[-0.02em]">
                &ldquo;{member.quote}&rdquo;
              </p>
              <p className="mt-3 text-map leading-relaxed">{member.bio}</p>
              <p className="mt-3 font-display text-xs font-semibold text-plot/70">{member.memberships}</p>
              <SocialLinks social={member.social} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const visionRef = useRef(null);
  const valuesRef = useRef(null);
  const detailsRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-hero > *', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out' });
      gsap.to('.about-hero-img', { yPercent: 15, ease: 'none', scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 0.4 } });

      gsap.fromTo('.about-story > *', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power2.out', scrollTrigger: { trigger: storyRef.current, start: 'top 78%', once: true } });

      gsap.fromTo('.about-vision-item', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: visionRef.current, start: 'top 80%', once: true } });

      gsap.fromTo('.about-value-card', { y: 50, opacity: 0, rotateY: -15 }, { y: 0, opacity: 1, rotateY: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out', scrollTrigger: { trigger: valuesRef.current, start: 'top 80%', once: true } });

      gsap.fromTo('.about-detail-item', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: detailsRef.current, start: 'top 82%', once: true } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main>
      <section ref={heroRef} className="relative min-h-[75svh] flex items-end overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink to-ink/60" />
        <img
          src="/images/hero-planning.jpg"
          alt="CSPARK community planning workshop"
          className="about-hero-img absolute inset-0 w-full h-full object-cover will-change-transform"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/55 to-ink/30" />
        <div className="frame relative z-10 w-full pb-16 pt-28">
          <div className="about-hero">
            <p className="mono-label">About CSPARK</p>
          </div>
          <h1 className="display about-hero font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] tracking-[-0.04em] text-white leading-[1.05] max-w-4xl mt-6">
            Bridging spatial planning and social justice.
          </h1>
          <p className="about-hero mt-6 max-w-xl text-lg text-white/75 leading-relaxed font-body">
            A Kenyan NGO using research, advocacy and capacity development to make planning work for the people it affects most.
          </p>
        </div>
      </section>

      <TeamSection />

      <section ref={storyRef} className="py-20 sm:py-28 bg-white">
        <div className="frame max-w-3xl mx-auto">
          <div className="about-story space-y-8">
            <p className="mono-label">Our Story</p>
            <h2 className="display font-extrabold text-3xl md:text-4xl tracking-[-0.04em] text-ink leading-tight">
              Planning that starts with the people it serves.
            </h2>
            <p className="text-lg text-map leading-relaxed">
              CSPARK ,  the Centre for Spatial Planning Advocacy and Research in Kenya ,  was founded to address a persistent gap: spatial plans were being produced by governments and consultants, but the communities most affected by those plans had little say in them. The result was plans that sat on shelves, disconnected from the streets, markets and settlements they were meant to shape.
            </p>
            <p className="text-lg text-map leading-relaxed">
              We work differently. Every project begins with the people who will live with the outcome ,  traders, families in informal settlements, fishing communities, county officials. We generate the evidence they need, translate it into actionable frameworks, and stay with the work through implementation.
            </p>
            <p className="text-lg text-map leading-relaxed">
              Registered as an NGO under the NGO Co-ordination Act of 1990, CSPARK is based in Kisumu and operates across Kenya's counties — from the Lake Victoria basin to Kisumu's neighbourhoods and surrounding towns — linking grassroots evidence to county and national planning processes.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-paper">
        <div className="frame max-w-3xl mx-auto">
          <p className="mono-label">Our Approach</p>
          <h2 className="display mt-4 font-extrabold text-3xl md:text-4xl tracking-[-0.04em] text-ink leading-tight mb-8">
            Campaigning the cause.
          </h2>
          <div className="space-y-6 text-lg text-map leading-relaxed">
            <p>
              CSPARK believes that it is possible to achieve social justice through informed and responsive spatial planning. This belief notwithstanding, there exists a gap in the manner in which spatial planning is currently undertaken, majorly by state organs. Due to their legal mandates and institutional inertia, these state organs have ended up producing plans which are either rigid or simply produced as an end in itself and therefore have little bearing in helping address the plight of the most vulnerable in the society.
            </p>
            <p>
              CSPARK believes that it is possible to make these plans useful for the socio-economic transformation that spatial planning strives to achieve. As such, it strives to partner with both state and non-state actors and to leverage its strength to bridge the current gap between spatial planning, implementation, and social justice.
            </p>
            <p>
              To this end, CSPARK will avail its expertise in research, stakeholder engagement, spatial planning, governance, and reach out to like-minded institutions to provide other resources that are needed to achieve social justice through spatial planning. The organisation will carry out researches to find out the concerns that spatial planning needs to pay attention to and also rally the implementing agencies to initiate projects that address these concerns.
            </p>
          </div>
        </div>
      </section>

      <section ref={visionRef} className="py-20 sm:py-28 bg-gradient-to-br from-paper to-white">
        <div className="frame">
          <p className="mono-label">Foundation</p>
          <h2 className="display mt-4 font-extrabold text-4xl md:text-5xl tracking-[-0.04em] text-ink leading-tight max-w-2xl mb-16">
            What drives us forward.
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="about-vision-item opacity-0 relative overflow-hidden rounded-[20px] bg-gradient-to-br from-ink to-ink/90 p-10 text-white group hover:shadow-2xl transition-all duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-plot/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10">
                <p className="font-display text-sm font-bold uppercase tracking-[0.13em] text-plot mb-6">Vision</p>
                <p className="display text-3xl font-extrabold leading-tight text-white/95">
                  Integrated spatial planning that delivers social justice.
                </p>
              </div>
            </div>
            <div className="about-vision-item opacity-0 relative overflow-hidden rounded-[20px] bg-gradient-to-br from-plot to-plot/90 p-10 text-white group hover:shadow-2xl transition-all duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10">
                <p className="font-display text-sm font-bold uppercase tracking-[0.13em] text-white/70 mb-6">Mission</p>
                <p className="display text-3xl font-extrabold leading-tight text-white/95">
                  To link spatial planning to social justice through research, advocacy and capacity development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={valuesRef} className="py-20 sm:py-28 bg-white">
        <div className="frame">
          <p className="mono-label">Core Values</p>
          <h2 className="display mt-4 font-extrabold text-4xl md:text-5xl tracking-[-0.04em] text-ink leading-tight max-w-2xl mb-16">
            What guides every decision.
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {values.map((v, i) => (
              <article key={v.title} className="about-value-card opacity-0 group relative overflow-hidden rounded-[16px] bg-paper p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-plot/0 via-plot/0 to-plot/10 group-hover:from-plot/5 group-hover:via-plot/10 group-hover:to-plot/20 transition-all duration-500" />
                <div className="relative z-10">
                  <p className="font-display text-6xl font-extrabold text-plot/20 mb-4 leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="display text-2xl font-extrabold text-ink mb-4 group-hover:text-plot transition-colors duration-300">
                    {v.title}
                  </h3>
                  <p className="text-map leading-relaxed">{v.copy}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-plot to-plot/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section ref={detailsRef} className="py-20 sm:py-28 bg-ink text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-plot rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-map rounded-full blur-3xl" />
        </div>
        <div className="frame relative z-10">
          <p className="mono-label mb-4">At a Glance</p>
          <h2 className="display font-extrabold text-4xl md:text-5xl tracking-[-0.04em] leading-tight max-w-2xl mb-16">
            Who we are.
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="about-detail-item opacity-0 group">
              <div className="relative h-full p-8 rounded-[16px] bg-white/5 backdrop-blur-sm border border-white/10 hover:border-plot/50 hover:bg-white/10 transition-all duration-500">
                <div className="absolute top-0 right-0 w-20 h-20 bg-plot/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10">
                  <p className="font-display text-sm font-bold uppercase tracking-[0.13em] text-plot mb-3">Headquarters</p>
                  <p className="text-2xl font-extrabold mb-2">Kisumu, Kenya</p>
                  <p className="text-white/60 text-sm">P. O. Box 7444 - 40100 Kisumu</p>
                </div>
              </div>
            </div>
            <div className="about-detail-item opacity-0 group">
              <div className="relative h-full p-8 rounded-[16px] bg-white/5 backdrop-blur-sm border border-white/10 hover:border-plot/50 hover:bg-white/10 transition-all duration-500">
                <div className="absolute top-0 right-0 w-20 h-20 bg-plot/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10">
                  <p className="font-display text-sm font-bold uppercase tracking-[0.13em] text-plot mb-3">Geographic Focus</p>
                  <p className="text-2xl font-extrabold mb-2">Kisumu & Lake Victoria Basin</p>
                  <p className="text-white/60 text-sm">Participatory planning rooted in lake-side communities and surrounding towns</p>
                </div>
              </div>
            </div>
            <div className="about-detail-item opacity-0 group">
              <div className="relative h-full p-8 rounded-[16px] bg-white/5 backdrop-blur-sm border border-white/10 hover:border-plot/50 hover:bg-white/10 transition-all duration-500">
                <div className="absolute top-0 right-0 w-20 h-20 bg-plot/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10">
                  <p className="font-display text-sm font-bold uppercase tracking-[0.13em] text-plot mb-3">Legal Status</p>
                  <p className="text-2xl font-extrabold mb-2">Registered NGO</p>
                  <p className="text-white/60 text-sm">Under the NGO Co-ordination Act, 1990</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-ink">
        <div className="frame flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h2 className="display font-extrabold text-3xl md:text-4xl tracking-[-0.04em] text-white leading-tight">
              Ready to start a <span className="text-plot">partnership</span>?
            </h2>
            <p className="mt-3 text-white/65 max-w-xl text-lg font-body">
              Talk to us about research, planning support or a collaboration.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a href="mailto:info@cspark.org" className="button-plot group">
              Partner With Us <span>→</span>
            </a>
            <Link to="/projects" className="button-ink group">
              View Projects <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
