export const services = [
  {
    slug: 'spatial-planning-governance',
    title: 'Spatial Planning & Governance',
    tagline: 'Plans that reach the ground.',
    heroImage: '/images/IMG20240306101059.jpg',
    intro: [
      'County governments produce plans, but too often they sit on shelves ,  disconnected from the streets, markets and settlements they are meant to shape. CSPARK works with county teams to produce plans that are built with the people who will use them.',
      'From integrated urban development plans to marine spatial planning on Lake Victoria, our work bridges the gap between good policy and practical implementation.',
    ],
    focusAreas: [
      'Integrated Strategic Urban Development Plans (ISUDPs)',
      'Local Economic Development Plans (LEDPs)',
      'Land reorganisation plans and framework development',
      'Marine spatial planning for Lake Victoria Basin',
      'Participatory land governance frameworks',
      'Technical support for urban management boards',
      'Research on municipal revenue through land value capture',
    ],
    whyUs: [
      'We embed participatory methods from day one ,  plans reflect real priorities',
      'Our team combines planning expertise with deep community engagement experience',
      'We stay with the work through implementation, not just plan handover',
    ],
    relatedProjectSlugs: ['marine-spatial-planning'],
  },
  {
    slug: 'urban-livelihoods',
    title: 'Urban Livelihoods',
    tagline: 'Protecting the right to earn in the city.',
    heroImage: '/images/brian-kungu-rmvuk5sWP7c-unsplash.jpg',
    intro: [
      'Millions of Kenyans earn their living in the informal economy ,  as street traders, market vendors and small-scale service providers. These livelihoods are too often invisible to official planning.',
      'CSPARK partners with informal workers to generate the data and evidence needed for inclusive urban markets and secure trading spaces.',
    ],
    focusAreas: [
      'Participatory enumeration of street traders',
      'Data collection on trade types, locations and operating patterns',
      'Technical support for participatory market planning',
      'Evidence briefs for county-level policy on trading spaces',
      'Linkages between enumeration results and market infrastructure decisions',
    ],
    whyUs: [
      'We work alongside traders, not just about them ,  enumeration is done with them',
      'Data we generate is actionable ,  it maps directly to market planning decisions',
      'We connect grassroots data to county and national planning processes',
    ],
    relatedProjectSlugs: ['street-traders-support'],
  },
  {
    slug: 'urban-infrastructure',
    title: 'Urban Infrastructure',
    tagline: 'Services that serve everyone.',
    heroImage: '/images/bennett-tobias-zCLPvnopq88-unsplash.jpg',
    intro: [
      'From solid waste to green energy, urban infrastructure is the skeleton that holds a city together. Yet too often, the systems that communities rely on ,  especially in informal settings ,  are invisible to policy makers.',
      'CSPARK researches how people actually access, build and co-produce urban services, and turns that knowledge into actionable frameworks.',
    ],
    focusAreas: [
      'Participatory solid waste management frameworks',
      'Mobility pattern research in Kisumu',
      'County Green Energy Plans for multiple counties',
      'Research on informal co-production of urban services',
      'Linking informal and formal transport modes in county planning',
    ],
    whyUs: [
      'We study how services actually work on the ground, not just how they are designed on paper',
      'Our research makes invisible co-production visible to policy makers',
      'We advocate for clean energy transitions rooted in local economic realities',
    ],
    relatedProjectSlugs: ['marine-spatial-planning'],
  },
  {
    slug: 'urban-housing',
    title: 'Urban Housing',
    tagline: 'Putting families at the centre of settlement upgrades.',
    heroImage: '/images/track-record.jpg',
    intro: [
      'Kenya\'s informal settlements are home to millions of families who lack secure tenure and are regularly excluded from infrastructure decisions that affect their lives.',
      'CSPARK maps homes, enumerates households and develops relocation action plans that put affected communities at the centre of upgrading processes.',
    ],
    focusAreas: [
      'Participatory enumeration and mapping of informal settlements',
      'Development of Relocation Action Plans (RAPs)',
      'Socio-economic research on vulnerable populations',
      'Policy frameworks linking informal settlements to upgrading processes',
      'Incorporation of community priorities into housing and infrastructure decisions',
    ],
    whyUs: [
      'We map with families, not about them ,  settlement data is co-produced',
      'Relocation plans we develop prioritise affected communities\' needs',
      'Our research directly informs county and national housing programmes',
    ],
    relatedProjectSlugs: ['settlement-mapping'],
  },
  {
    slug: 'urban-security',
    title: 'Urban Security',
    tagline: 'Safer streets through better systems.',
    heroImage: '/images/mission-planning.jpg',
    intro: [
      'Security in urban Kenya is shaped as much by systems and information as it is by policing. Address systems, neighbourhood associations and community initiatives all play a role.',
      'CSPARK researches how these systems can be strengthened to improve safety, leveraging local structures like nyumba kumi and residents associations.',
    ],
    focusAreas: [
      'Research on neighbourhood security through address systems',
      'Linking nyumba kumi and residents associations to formal security frameworks',
      'Community safety mapping and analysis',
      'Policy briefs on integrating community security into urban planning',
    ],
    whyUs: [
      'We approach security from a spatial planning perspective ,  not just policing',
      'Our research connects community-level initiatives to formal systems',
      'We produce actionable briefs for county governments and security agencies',
    ],
    relatedProjectSlugs: ['settlement-mapping'],
  },
  {
    slug: 'gender-mainstreaming',
    title: 'Gender, Equity, Diversity & Social Inclusion',
    tagline: 'Equality and inclusion woven through every plan.',
    heroImage: '/images/hero-planning.jpg',
    intro: [
      'For CSPARK, gender is not a separate project ,  it is a lens applied to every plan, every research agenda and every advocacy effort.',
      'We ask who is included, who is left out and what must change before planning decisions are made.',
    ],
    focusAreas: [
      'Gender-sensitive enumeration and mapping methodologies',
      'Policy briefs on embedding gender across ISUDPs and LEDPs',
      'Research on women in the informal economy and their spatial needs',
      'Training and capacity building for gender-responsive planning',
    ],
    whyUs: [
      'Gender equality is cross-cutting ,  not a standalone workstream',
      'We apply a gender lens to every research and planning engagement',
      'Our briefs help county governments integrate gender into spatial frameworks',
    ],
    relatedProjectSlugs: ['street-traders-support', 'settlement-mapping', 'marine-spatial-planning'],
  },
];

export function getService(slug) {
  return services.find((s) => s.slug === slug);
}