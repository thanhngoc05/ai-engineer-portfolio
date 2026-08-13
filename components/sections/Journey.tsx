"use client";

import { motion, useReducedMotion } from "motion/react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { journey } from "@/data/profile";

export function Journey() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="journey" className="content-section journey section-shell" aria-labelledby="journey-title">
      <SectionHeading
        eyebrow="04 / Evolution"
        title="The AI engineering journey."
        description="A deliberate path from fundamentals to production-ready intelligent systems."
      />
      <div id="journey-title" className="sr-only">AI engineering journey</div>

      <div className="journey__timeline">
        <motion.div
          className="journey__progress"
          aria-hidden="true"
          initial={reduceMotion ? false : { scaleY: 0 }}
          whileInView={reduceMotion ? undefined : { scaleY: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
        {journey.map((step, index) => (
          <Reveal key={step.number} className="journey-step" delay={index * 0.08}>
            <div className="journey-step__node" aria-hidden="true">
              <span />
            </div>
            <div className="journey-step__number">{step.number}</div>
            <div>
              <h3>{step.title}</h3>
              <div className="journey-step__items">
                {step.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

