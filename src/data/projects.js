export const projects = [
  {
    slug: 'marine-spatial-planning',
    place: 'Lake Victoria Basin',
    title: 'Marine Spatial Planning',
    image: '/images/project-lake-victoria.jpg',
    summary: 'We brought together communities and county governments to plan for fishing, transport, energy and conservation.',
    challenge: 'The Lake Victoria Basin supports millions of livelihoods across three countries, yet competing demands from fisheries, transport, energy development and conservation were creating conflict and degrading the natural resources communities depend on. Without a shared spatial framework, decisions were being made in silos.',
    approach: 'CSPARK convened riparian communities, county governments and sector stakeholders to develop a marine spatial plan that maps competing uses and identifies zones for protection, sustainable use and economic development. The process was participatory from design through validation.',
    outcome: 'A spatial framework that balances ecological protection with economic use across the basin, developed with the communities and county actors who will implement and live with it. The plan now guides investment and conservation decisions in the region.',
    gallery: [
      { type: 'image', src: '/images/project-lake-victoria.jpg', alt: 'Lake Victoria shoreline planning session', caption: 'Community stakeholders reviewing spatial use maps along the Lake Victoria shoreline.' },
      { type: 'image', src: '/images/hero-planning.jpg', alt: 'Participatory mapping workshop', caption: 'Riparian communities and county officials mapping competing uses of the basin.' },
      { type: 'image', src: '/images/mission-planning.jpg', alt: 'Validation workshop for marine spatial plan', caption: 'Validation workshop where community members reviewed the draft spatial framework.' },
      { type: 'video', src: '/videos/marine-planning.mp4', poster: '/images/project-lake-victoria.jpg', caption: 'Highlights from the Lake Victoria Basin marine spatial planning process.' },
    ],
    relatedServiceSlugs: ['spatial-planning-governance'],
  },
  {
    slug: 'street-traders-support',
    place: 'Kisumu',
    title: 'Enumeration & Planning Support for Street Traders',
    image: '/images/project-kisumu-market.jpg',
    summary: 'We worked with traders to collect the evidence needed for better markets and safer places to work.',
    challenge: 'Street traders in Kisumu faced eviction, displacement and insecurity, working without formal recognition or data that could support their right to space in the city. County planning decisions affecting them were being made without evidence about their numbers, locations or needs.',
    approach: 'CSPARK led a participatory enumeration process ,  traders mapped their own operating locations, trade types and daily patterns. This data was validated through community workshops and translated into a format usable by the county for spatial and market planning.',
    outcome: 'A detailed enumeration report providing evidence for inclusive market planning and secure trading spaces. The data has informed Kisumu County\'s approach to street trader integration and market infrastructure decisions.',
    gallery: [
      { type: 'image', src: '/images/project-kisumu-market.jpg', alt: 'Kisumu street traders enumeration', caption: 'Street traders participating in the self-enumeration process in Kisumu.' },
      { type: 'image', src: '/images/brian-kungu-rmvuk5sWP7c-unsplash.jpg', alt: 'Market planning community workshop', caption: 'Community validation workshop with traders and county planning officials.' },
      { type: 'image', src: '/images/track-record.jpg', alt: 'Trader mapping their operating location', caption: 'A trader mapping their daily operating location and trade type.' },
      { type: 'video', src: '/videos/kisumu-traders.mp4', poster: '/images/project-kisumu-market.jpg', caption: 'Documentation of the participatory enumeration process with Kisumu street traders.' },
    ],
    relatedServiceSlugs: ['urban-livelihoods', 'gender-mainstreaming'],
  },
  {
    slug: 'settlement-mapping',
    place: 'Nairobi & Nakuru',
    title: 'Informal Settlement Mapping & Relocation Action Plans',
    image: '/images/project-settlement-mapping.jpg',
    summary: 'We mapped homes and services so families could take part in decisions about settlement upgrades.',
    challenge: 'Residents of informal settlements in Nairobi and Nakuru lacked secure tenure and were being excluded from infrastructure upgrades and affordable housing projects. Without detailed household-level data, planning decisions affecting their lives were made without their participation.',
    approach: 'CSPARK conducted detailed household enumeration and mapping in informal settlements. The resulting data was used to develop Relocation Action Plans that prioritise community needs, tenure security and infrastructure access. Throughout the process, residents were treated as partners, not subjects.',
    outcome: 'Detailed household maps and Relocation Action Plans that put affected families at the centre of upgrading decisions. The plans have been adopted as reference documents by county planning teams working on settlement formalisation.',
    gallery: [
      { type: 'image', src: '/images/project-settlement-mapping.jpg', alt: 'Settlement mapping in progress', caption: 'Community members conducting household-level mapping in their settlement.' },
      { type: 'image', src: '/images/ian-macharia-NRv8BsouFBQ-unsplash.jpg', alt: 'Relocation action plan workshop', caption: 'Workshop to develop Relocation Action Plans with affected families and county teams.' },
      { type: 'image', src: '/images/bennett-tobias-zCLPvnopq88-unsplash.jpg', alt: 'Infrastructure assessment in informal settlement', caption: 'Assessing existing infrastructure and service access during the enumeration process.' },
      { type: 'video', src: '/videos/settlement-mapping.mp4', poster: '/images/project-settlement-mapping.jpg', caption: 'Overview of the participatory settlement mapping and relocation planning process.' },
    ],
    relatedServiceSlugs: ['urban-housing', 'urban-security', 'gender-mainstreaming'],
  },
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByService(slugs) {
  return projects.filter((p) => p.relatedServiceSlugs.some((s) => slugs.includes(s)));
}