"use client";

import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import { Suspense } from "react";

import { PandaPetModel } from "@/components/three/PandaPetModel";

type PandaPetSceneProps = {
  dragging: boolean;
  hovered: boolean;
  mobile: boolean;
  reaction: number;
};

function PandaPetFallback() {
  return (
    <group scale={0.84}>
      <mesh position={[0, -0.38, 0]} scale={[0.72, 0.9, 0.5]}>
        <sphereGeometry args={[0.78, 20, 16]} />
        <meshStandardMaterial color="#f8fcff" emissive="#568491" emissiveIntensity={0.08} roughness={0.76} />
      </mesh>
      <mesh position={[0, 0.58, 0]} scale={[0.86, 0.77, 0.58]}>
        <sphereGeometry args={[0.92, 22, 18]} />
        <meshStandardMaterial color="#f8fcff" emissive="#568491" emissiveIntensity={0.08} roughness={0.76} />
      </mesh>
      <mesh position={[0, 0.56, 0.55]} scale={[0.65, 0.55, 1]}>
        <circleGeometry args={[0.72, 36]} />
        <meshBasicMaterial color="#f4f5f2" />
      </mesh>
    </group>
  );
}

export default function PandaPetScene({
  dragging,
  hovered,
  mobile,
  reaction,
}: PandaPetSceneProps) {
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = Boolean(prefersReducedMotion);

  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 8], zoom: mobile ? 50 : 64, near: 0.1, far: 30 }}
      dpr={mobile ? 1 : [1, 1.25]}
      frameloop={reducedMotion ? "demand" : "always"}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
    >
      <ambientLight intensity={1.7} />
      <directionalLight position={[3, 5, 6]} intensity={2.4} color="#dff9ff" />
      <directionalLight position={[-3, 1, 4]} intensity={0.8} color="#9b8cff" />
      <Suspense fallback={<PandaPetFallback />}>
        <PandaPetModel
          dragging={dragging}
          hovered={hovered}
          reaction={reaction}
          reducedMotion={reducedMotion}
        />
      </Suspense>
    </Canvas>
  );
}
