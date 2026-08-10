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
    relatedServiceSlugs: ['spatial-planning-governance'],
  },
  {
    slug: 'street-traders-support',
    place: 'Kisumu',
    title: 'Enumeration & Planning Support for Street Traders',
    image: '/images/project-kisumu-market.jpg',
    summary: 'We worked with traders to collect the evidence needed for better markets and safer places to work.',
    challenge: 'Street traders in Kisumu faced eviction, displacement and insecurity, working without formal recognition or data that could support their right to space in the city. County planning decisions affecting them were being made without evidence about their numbers, locations or needs.',
    approach: 'CSPARK led a participatory enumeration process — traders mapped their own operating locations, trade types and daily patterns. This data was validated through community workshops and translated into a format usable by the county for spatial and market planning.',
    outcome: 'A detailed enumeration report providing evidence for inclusive market planning and secure trading spaces. The data has informed Kisumu County\'s approach to street trader integration and market infrastructure decisions.',
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
    relatedServiceSlugs: ['urban-housing', 'urban-security', 'gender-mainstreaming'],
  },
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByService(slugs) {
  return projects.filter((p) => p.relatedServiceSlugs.some((s) => slugs.includes(s)));
}