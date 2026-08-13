"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, type MutableRefObject } from "react";

type ScrollSceneProps = {
  progressRef: MutableRefObject<number>;
  disabled: boolean;
};

export function ScrollScene({ progressRef, disabled }: ScrollSceneProps) {
  useEffect(() => {
    if (disabled) {
      progressRef.current = 0;
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.8,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });

    return () => trigger.kill();
  }, [disabled, progressRef]);

  return null;
}
