"use client";

import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

type AICoreProps = {
  progress: MutableRefObject<number>;
  mobile: boolean;
  reducedMotion: boolean;
};

function sampleKeyframes(progress: number, values: number[]) {
  const scaled = THREE.MathUtils.clamp(progress, 0, 1) * (values.length - 1);
  const index = Math.min(Math.floor(scaled), values.length - 2);
  return THREE.MathUtils.lerp(values[index], values[index + 1], scaled - index);
}

function ProcessorFrame() {
  return (
    <group>
      <mesh position={[1.34, 0, 0]}>
        <boxGeometry args={[0.26, 2.3, 0.22]} />
        <meshStandardMaterial color="#141923" metalness={0.88} roughness={0.24} />
      </mesh>
      <mesh position={[-1.34, 0, 0]}>
        <boxGeometry args={[0.26, 2.3, 0.22]} />
        <meshStandardMaterial color="#141923" metalness={0.88} roughness={0.24} />
      </mesh>
      <mesh position={[0, 1.34, 0]}>
        <boxGeometry args={[2.3, 0.26, 0.22]} />
        <meshStandardMaterial color="#141923" metalness={0.88} roughness={0.24} />
      </mesh>
      <mesh position={[0, -1.34, 0]}>
        <boxGeometry args={[2.3, 0.26, 0.22]} />
        <meshStandardMaterial color="#141923" metalness={0.88} roughness={0.24} />
      </mesh>

      {[
        [1.34, 1.34, 0],
        [-1.34, 1.34, 0],
        [1.34, -1.34, 0],
        [-1.34, -1.34, 0],
      ].map((position, index) => (
        <mesh key={index} position={position as [number, number, number]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.48, 0.48, 0.28]} />
          <meshStandardMaterial color="#202837" metalness={0.94} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

export function AICore({ progress, mobile, reducedMotion }: AICoreProps) {
  const rootRef = useRef<THREE.Group>(null);
  const shellRef = useRef<THREE.Group>(null);
  const internalsRef = useRef<THREE.Group>(null);
  const ringOneRef = useRef<THREE.Mesh>(null);
  const ringTwoRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const coreMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const nodeMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const pinsRef = useRef<THREE.InstancedMesh>(null);

  const nodePositions = useMemo(() => {
    return Array.from({ length: mobile ? 16 : 28 }, (_, index) => {
      const angle = (index / (mobile ? 16 : 28)) * Math.PI * 2;
      const layer = index % 3;
      const radius = 0.98 + layer * 0.24;
      return new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        (layer - 1) * 0.34,
      );
    });
  }, [mobile]);

  useLayoutEffect(() => {
    const dummy = new THREE.Object3D();
    nodePositions.forEach((position, index) => {
      dummy.position.copy(position);
      dummy.scale.setScalar(index % 4 === 0 ? 1.45 : 0.8);
      dummy.updateMatrix();
      nodesRef.current?.setMatrixAt(index, dummy.matrix);
    });
    if (nodesRef.current) nodesRef.current.instanceMatrix.needsUpdate = true;

    const pinCount = mobile ? 28 : 44;
    for (let index = 0; index < pinCount; index += 1) {
      const side = index % 4;
      const slot = Math.floor(index / 4);
      const span = ((slot / Math.max(Math.floor(pinCount / 4) - 1, 1)) - 0.5) * 2.2;
      dummy.position.set(
        side === 0 ? 1.62 : side === 1 ? -1.62 : span,
        side === 2 ? 1.62 : side === 3 ? -1.62 : span,
        0,
      );
      dummy.rotation.set(0, 0, side < 2 ? 0 : Math.PI / 2);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      pinsRef.current?.setMatrixAt(index, dummy.matrix);
    }
    if (pinsRef.current) pinsRef.current.instanceMatrix.needsUpdate = true;
  }, [mobile, nodePositions]);

  useFrame(({ clock, pointer }, delta) => {
    if (!rootRef.current || !shellRef.current || !internalsRef.current) return;

    const p = reducedMotion ? 0 : progress.current;
    const open = THREE.MathUtils.smoothstep(p, 0.25, 0.5);
    const projectReveal = THREE.MathUtils.smoothstep(p, 0.42, 0.68);
    const glow = THREE.MathUtils.smoothstep(p, 0.76, 0.92);
    const idle = reducedMotion ? 0 : clock.elapsedTime * 0.075;
    const pointerX = reducedMotion ? 0 : pointer.x * 0.18;
    const pointerY = reducedMotion ? 0 : pointer.y * 0.12;

    const desktopX = sampleKeyframes(p, [2.35, 2.2, 0, -2.1, 2.1, 0]);
    const targetX = mobile ? 0 : desktopX;
    const targetY = mobile
      ? sampleKeyframes(p, [1.25, 0.6, 0.25, 0.15, 0.2, 0])
      : sampleKeyframes(p, [0.2, 0, -0.15, 0.1, 0, 0]);
    const targetScale = mobile
      ? sampleKeyframes(p, [0.72, 0.68, 0.56, 0.54, 0.6, 0.58])
      : sampleKeyframes(p, [1, 1.08, 0.84, 0.88, 1.02, 0.84]);

    rootRef.current.position.x = THREE.MathUtils.damp(rootRef.current.position.x, targetX, 2.5, delta);
    rootRef.current.position.y = THREE.MathUtils.damp(rootRef.current.position.y, targetY + pointerY, 2.5, delta);
    rootRef.current.scale.setScalar(THREE.MathUtils.damp(rootRef.current.scale.x, targetScale, 2.5, delta));
    rootRef.current.rotation.x = THREE.MathUtils.damp(
      rootRef.current.rotation.x,
      p * 1.1 - 0.15 - pointerY,
      2.2,
      delta,
    );
    rootRef.current.rotation.y = THREE.MathUtils.damp(
      rootRef.current.rotation.y,
      idle + p * Math.PI * 2.25 + pointerX,
      2.2,
      delta,
    );
    rootRef.current.rotation.z = THREE.MathUtils.damp(
      rootRef.current.rotation.z,
      Math.sin(p * Math.PI * 2) * 0.18,
      2.2,
      delta,
    );

    shellRef.current.scale.setScalar(1 + open * 0.12);
    internalsRef.current.scale.setScalar(0.88 + open * 0.18);
    internalsRef.current.rotation.z += reducedMotion ? 0 : delta * (0.08 + projectReveal * 0.16);

    if (ringOneRef.current) ringOneRef.current.rotation.z += reducedMotion ? 0 : delta * 0.16;
    if (ringTwoRef.current) ringTwoRef.current.rotation.x += reducedMotion ? 0 : delta * 0.11;
    if (coreRef.current) {
      const pulse = reducedMotion ? 1 : 1 + Math.sin(clock.elapsedTime * 1.5) * 0.025;
      coreRef.current.scale.setScalar(pulse + glow * 0.08);
    }
    if (coreMaterialRef.current) {
      coreMaterialRef.current.emissiveIntensity = 1.7 + glow * 3.4;
    }
    if (nodeMaterialRef.current) {
      nodeMaterialRef.current.emissiveIntensity = 0.45 + open * 1.45;
    }
  });

  return (
    <group ref={rootRef}>
      <group ref={shellRef}>
        {!mobile && (
          <>
            <ProcessorFrame />
            <mesh rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[1.92, 1.92, 0.16]} />
              <meshPhysicalMaterial
                color="#080b11"
                metalness={0.82}
                roughness={0.28}
                transmission={0.1}
                transparent
                opacity={0.74}
              />
            </mesh>
          </>
        )}
        <mesh>
          <icosahedronGeometry args={[1.62, 1]} />
          <meshBasicMaterial color="#536174" wireframe transparent opacity={0.13} />
        </mesh>
      </group>

      <group ref={internalsRef}>
        <mesh ref={ringOneRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.13, 0.018, 8, 96]} />
          <meshBasicMaterial color="#79eaff" transparent opacity={0.48} toneMapped={false} />
        </mesh>
        <mesh ref={ringTwoRef} rotation={[0.72, 0.4, 0]}>
          <torusGeometry args={[1.36, 0.012, 8, 96]} />
          <meshBasicMaterial color="#7a68ff" transparent opacity={0.34} toneMapped={false} />
        </mesh>
        <instancedMesh ref={nodesRef} args={[undefined, undefined, nodePositions.length]}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshStandardMaterial
            ref={nodeMaterialRef}
            color="#90efff"
            emissive="#39d9ff"
            emissiveIntensity={0.5}
            roughness={0.25}
          />
        </instancedMesh>
      </group>

      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.66, mobile ? 2 : 4]} />
        <meshPhysicalMaterial
          ref={coreMaterialRef}
          color="#b9f5ff"
          emissive="#32cfff"
          emissiveIntensity={1.8}
          roughness={0.12}
          metalness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.12}
          toneMapped={false}
        />
      </mesh>
      <mesh scale={1.24}>
        <icosahedronGeometry args={[0.66, 2]} />
        <meshBasicMaterial color="#8ceeff" wireframe transparent opacity={0.28} toneMapped={false} />
      </mesh>

      {!mobile && (
        <instancedMesh ref={pinsRef} args={[undefined, undefined, 44]}>
          <boxGeometry args={[0.16, 0.035, 0.04]} />
          <meshStandardMaterial color="#5d6a7b" metalness={0.98} roughness={0.2} />
        </instancedMesh>
      )}
    </group>
  );
}
