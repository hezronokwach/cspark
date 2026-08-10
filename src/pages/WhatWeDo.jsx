import PageHero from '../components/whatwedo/PageHero';
import IntroSplit from '../components/whatwedo/IntroSplit';
import ImpactBanner from '../components/whatwedo/ImpactBanner';
import ThematicGrid from '../components/whatwedo/ThematicGrid';
import Approach from '../components/whatwedo/Approach';
import WhatWeDoCTA from '../components/whatwedo/WhatWeDoCTA';

export default function WhatWeDo() {
  return (
    <main>
      <PageHero />
      <IntroSplit />
      <ImpactBanner />
      <ThematicGrid />
      <Approach />
      <WhatWeDoCTA />
    </main>
  );
}