"use client";

import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type PandaPetModelProps = {
  dragging: boolean;
  hovered: boolean;
  reaction: number;
  reducedMotion: boolean;
};

const pandaWhite = "#f8fcff";
const softWhite = "#dceaf0";

function Rose() {
  const petals = [
    [0, 0.08, 0],
    [0.1, 0.02, 0.02],
    [-0.1, 0.02, 0.02],
    [0.06, -0.07, 0.05],
    [-0.06, -0.07, 0.05],
  ] as const;

  return (
    <group position={[0.4, 0.66, 0.48]} rotation={[0, 0, -0.42]}>
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.018, 0.026, 0.58, 10]} />
        <meshStandardMaterial color="#45a66f" roughness={0.72} />
      </mesh>
      <group position={[0, 0.53, 0]}>
        {petals.map((position, index) => (
          <mesh key={index} position={position} scale={[1, 0.9, 0.82]}>
            <sphereGeometry args={[0.12, 14, 12]} />
            <meshStandardMaterial
              color={index === 0 ? "#ff5368" : "#d82743"}
              emissive="#6e0718"
              emissiveIntensity={0.22}
              roughness={0.62}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export function PandaPetModel({
  dragging,
  hovered,
  reaction,
  reducedMotion,
}: PandaPetModelProps) {
  const rootRef = useRef<THREE.Group>(null);
  const armRef = useRef<THREE.Group>(null);
  const reactionPhase = useRef(1);
  const sourceTexture = useTexture("/images/panda-pet-reference.png");

  const faceTexture = useMemo(() => {
    const texture = sourceTexture.clone();
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.repeat.set(0.54, 0.47);
    texture.offset.set(0.22, 0.47);
    texture.needsUpdate = true;
    return texture;
  }, [sourceTexture]);

  useEffect(() => () => faceTexture.dispose(), [faceTexture]);

  useEffect(() => {
    if (reaction > 0) reactionPhase.current = 0;
  }, [reaction]);

  useFrame(({ clock }, delta) => {
    const root = rootRef.current;
    const arm = armRef.current;
    if (!root || !arm) return;

    reactionPhase.current = reducedMotion
      ? 1
      : Math.min(1, reactionPhase.current + delta * 1.15);

    const phase = reactionPhase.current;
    const reactionLift = reducedMotion ? 0 : Math.sin(phase * Math.PI) * 0.14;
    const wave =
      reducedMotion || phase >= 1
        ? 0
        : Math.sin(phase * Math.PI * 7) * (1 - phase) * 0.42;
    const idle =
      reducedMotion || dragging ? 0 : Math.sin(clock.elapsedTime * 2.15) * 0.035;
    const targetScale = 1 + (reducedMotion ? 0 : hovered ? 0.035 : 0) + reactionLift * 0.35;

    root.position.y = THREE.MathUtils.damp(
      root.position.y,
      idle + reactionLift,
      6,
      delta,
    );
    root.rotation.y = THREE.MathUtils.damp(
      root.rotation.y,
      reducedMotion ? 0 : hovered ? -0.12 : 0,
      5,
      delta,
    );
    root.rotation.z = THREE.MathUtils.damp(
      root.rotation.z,
      reducedMotion
        ? 0
        : dragging
          ? 0.055
          : Math.sin(clock.elapsedTime * 1.2) * 0.018,
      5,
      delta,
    );
    root.scale.setScalar(
      THREE.MathUtils.damp(root.scale.x, targetScale, 7, delta),
    );
    arm.rotation.z = THREE.MathUtils.damp(arm.rotation.z, -0.1 + wave, 10, delta);
  });

  return (
    <group ref={rootRef} scale={0.88} position={[0, -0.03, 0]}>
      <mesh position={[0, -0.42, 0]} scale={[0.72, 0.9, 0.5]}>
        <sphereGeometry args={[0.78, 28, 22]} />
        <meshStandardMaterial color={pandaWhite} emissive="#568491" emissiveIntensity={0.08} roughness={0.72} metalness={0.04} />
      </mesh>

      <mesh position={[0, -0.43, 0.37]} scale={[0.44, 0.57, 0.22]}>
        <sphereGeometry args={[0.7, 24, 18]} />
        <meshStandardMaterial color={softWhite} emissive="#568491" emissiveIntensity={0.06} roughness={0.8} />
      </mesh>

      <mesh position={[-0.34, -1.16, 0]} rotation={[0.08, 0, 0.18]} scale={[0.3, 0.43, 0.34]}>
        <sphereGeometry args={[0.62, 20, 16]} />
        <meshStandardMaterial color={pandaWhite} emissive="#568491" emissiveIntensity={0.08} roughness={0.76} />
      </mesh>
      <mesh position={[0.34, -1.16, 0]} rotation={[0.08, 0, -0.18]} scale={[0.3, 0.43, 0.34]}>
        <sphereGeometry args={[0.62, 20, 16]} />
        <meshStandardMaterial color={pandaWhite} emissive="#568491" emissiveIntensity={0.08} roughness={0.76} />
      </mesh>

      <mesh position={[-0.58, -0.36, 0.03]} rotation={[0, 0, -0.3]}>
        <capsuleGeometry args={[0.16, 0.55, 8, 16]} />
        <meshStandardMaterial color={pandaWhite} emissive="#568491" emissiveIntensity={0.08} roughness={0.76} />
      </mesh>

      <group ref={armRef} position={[0.55, -0.05, 0.04]} rotation={[0, 0, -0.1]}>
        <mesh position={[0.18, 0.3, 0]} rotation={[0, 0, -0.5]}>
          <capsuleGeometry args={[0.17, 0.58, 8, 16]} />
          <meshStandardMaterial color={pandaWhite} emissive="#568491" emissiveIntensity={0.08} roughness={0.76} />
        </mesh>
        <mesh position={[0.39, 0.58, 0.02]} scale={0.22}>
          <sphereGeometry args={[1, 18, 14]} />
          <meshStandardMaterial color={pandaWhite} emissive="#568491" emissiveIntensity={0.08} roughness={0.76} />
        </mesh>
        <Rose />
      </group>

      <group position={[0, 0.58, 0]}>
        <mesh position={[-0.59, 0.54, 0]} scale={[0.34, 0.34, 0.25]}>
          <sphereGeometry args={[1, 22, 18]} />
          <meshStandardMaterial color={pandaWhite} emissive="#568491" emissiveIntensity={0.08} roughness={0.76} />
        </mesh>
        <mesh position={[0.59, 0.54, 0]} scale={[0.34, 0.34, 0.25]}>
          <sphereGeometry args={[1, 22, 18]} />
          <meshStandardMaterial color={pandaWhite} emissive="#568491" emissiveIntensity={0.08} roughness={0.76} />
        </mesh>
        <mesh scale={[0.86, 0.77, 0.58]}>
          <sphereGeometry args={[0.92, 32, 24]} />
          <meshStandardMaterial color={pandaWhite} emissive="#568491" emissiveIntensity={0.08} roughness={0.72} metalness={0.04} />
        </mesh>
        <mesh position={[0, -0.01, 0.56]} scale={[1, 0.84, 1]}>
          <circleGeometry args={[0.69, 48]} />
          <meshBasicMaterial map={faceTexture} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}
