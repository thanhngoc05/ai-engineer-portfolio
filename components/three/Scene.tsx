"use client";

import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import { useRef, useState } from "react";

import { AICore } from "@/components/three/AICore";
import { CameraRig } from "@/components/three/CameraRig";
import { Lights } from "@/components/three/Lights";
import { NeuralParticles } from "@/components/three/NeuralParticles";
import { ScrollScene } from "@/components/three/ScrollScene";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function Scene() {
  const progress = useRef(0);
  const mobile = useMediaQuery("(max-width: 767px)");
  const prefersReducedMotion = useReducedMotion();
  const [quality, setQuality] = useState(1);
  const reducedMotion = Boolean(prefersReducedMotion);

  return (
    <div className="scene-layer" aria-hidden="true">
      <ScrollScene progressRef={progress} disabled={reducedMotion} />
      <Canvas
        dpr={quality > 0.7 ? [1, 1.5] : 1}
        camera={{ position: [0, 0, 7], fov: mobile ? 48 : 42, near: 0.1, far: 60 }}
        gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
        performance={{ min: 0.5 }}
      >
        <PerformanceMonitor
          onDecline={() => setQuality(0.6)}
          onIncline={() => setQuality(1)}
          flipflops={3}
        />
        <AdaptiveDpr pixelated />
        <Lights />
        <AICore
          progress={progress}
          mobile={mobile || quality < 0.7}
          reducedMotion={reducedMotion}
        />
        <NeuralParticles
          progress={progress}
          mobile={mobile || quality < 0.7}
          reducedMotion={reducedMotion}
        />
        <CameraRig progress={progress} mobile={mobile} reducedMotion={reducedMotion} />
      </Canvas>
      <div className="scene-layer__vignette" />
      <div className="scene-layer__grain" />
    </div>
  );
}
