import React from 'react';
import { LandingNav } from './components/LandingNav.js';
import { Hero } from './components/Hero.js';
import { CapabilityRow } from './components/CapabilityRow.js';
import { TestimonialRow } from './components/TestimonialRow.js';
import { FeatureBlock } from './components/FeatureBlock.js';
import {
  EngageHeatmapVisual,
  UnderstandDecayVisual,
  GenerateSyllabusVisual,
  OrganizeArchiveVisual,
} from './components/FeatureVisuals.js';
import { PricingSection } from './components/PricingSection.js';
import { FinalCta } from './components/FinalCta.js';
import { LandingFooter } from './components/LandingFooter.js';

export default function LandingPage() {
  return (
    <>
      <LandingNav />

      <main>
        <Hero />
        <CapabilityRow />
        <TestimonialRow />

        {/* Four Feature Blocks (ONE parameterized component rendered 4 times) */}
        <div className="landing-container" id="features" style={{ paddingTop: '32px' }}>
          {/* 1. Engage (Blue) */}
          <FeatureBlock
            accent="blue"
            reverse={false}
            eyebrow="Engage"
            heading="The room answers in real time, not after class"
            body="Pairly captures live participant distribution as it unfolds. Whether diagnosing an X-ray or matching dynamic systems, see collective comprehension without waiting for post-lecture grading."
            visual={<EngageHeatmapVisual />}
          />

          {/* 2. Understand (Sage) */}
          <FeatureBlock
            accent="sage"
            reverse={false}
            eyebrow="Understand"
            heading="Watch a concept fade before it costs you a midterm"
            body="Identify cognitive drop-off points weeks before exam day. Longitudinal recall metrics show precisely when reinforcement is needed."
            visual={<UnderstandDecayVisual />}
          />

          {/* 3. Generate (Butter) */}
          <FeatureBlock
            accent="butter"
            reverse={false}
            eyebrow="Generate"
            heading="Turn a syllabus module into slides before your coffee's cold"
            body="Upload your existing lecture outlines, papers, or slide decks. Pairly generates spatial questions and interactive sequences in seconds."
            visual={<GenerateSyllabusVisual />}
          />

          {/* 4. Organize (Coral) */}
          <FeatureBlock
            accent="coral"
            reverse={false}
            eyebrow="Organize"
            heading="Structure that follows the semester, not the app"
            body="Keep sections, clinical rotations, and lecture archives intuitively structured. Retrieve historical response patterns with one click."
            visual={<OrganizeArchiveVisual />}
          />
        </div>

        <PricingSection />
        <FinalCta />
      </main>

      <LandingFooter />
    </>
  );
}
