"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/three/Scene"), {
  ssr: false,
  loading: () => (
    <div className="scene-fallback" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  ),
});

export function ThreeExperience() {
  return <Scene />;
}

