"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

type NeuralParticlesProps = {
  progress: MutableRefObject<number>;
  mobile: boolean;
  reducedMotion: boolean;
};

export function NeuralParticles({
  progress,
  mobile,
  reducedMotion,
}: NeuralParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const pointMaterialRef = useRef<THREE.PointsMaterial>(null);
  const lineMaterialRef = useRef<THREE.LineBasicMaterial>(null);
  const count = mobile ? 38 : 84;

  const { positions, connections } = useMemo(() => {
    const pointPositions = new Float32Array(count * 3);
    const vectors: THREE.Vector3[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let index = 0; index < count; index += 1) {
      const y = 1 - (index / Math.max(count - 1, 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = goldenAngle * index;
      const distance = 2.45 + ((index * 17) % 9) * 0.06;
      const vector = new THREE.Vector3(
        Math.cos(theta) * radius * distance,
        y * distance,
        Math.sin(theta) * radius * distance,
      );
      vectors.push(vector);
      pointPositions.set(vector.toArray(), index * 3);
    }

    const linePairs: number[] = [];
    for (let index = 0; index < count; index += 3) {
      const start = vectors[index];
      const end = vectors[(index + 8) % count];
      if (start.distanceTo(end) < 3.1) {
        linePairs.push(...start.toArray(), ...end.toArray());
      }
    }

    return {
      positions: pointPositions,
      connections: new Float32Array(linePairs),
    };
  }, [count]);

  useFrame(({ clock }, delta) => {
    const reveal = THREE.MathUtils.smoothstep(progress.current, 0.6, 0.82);
    if (pointMaterialRef.current) {
      pointMaterialRef.current.opacity = reducedMotion ? 0.32 : 0.16 + reveal * 0.54;
    }
    if (lineMaterialRef.current) {
      lineMaterialRef.current.opacity = reducedMotion ? 0.05 : reveal * 0.2;
    }
    if (pointsRef.current && !reducedMotion) {
      pointsRef.current.rotation.y += delta * (0.025 + reveal * 0.03);
      pointsRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.08) * 0.08;
    }
    if (linesRef.current && !reducedMotion) {
      linesRef.current.rotation.y = pointsRef.current?.rotation.y ?? 0;
      linesRef.current.rotation.z = pointsRef.current?.rotation.z ?? 0;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={pointMaterialRef}
          color="#78e8ff"
          size={mobile ? 0.035 : 0.028}
          sizeAttenuation
          transparent
          opacity={0.18}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[connections, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          ref={lineMaterialRef}
          color="#6775ff"
          transparent
          opacity={0}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

