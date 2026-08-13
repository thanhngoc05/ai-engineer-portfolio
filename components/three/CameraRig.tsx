"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

type CameraRigProps = {
  progress: MutableRefObject<number>;
  mobile: boolean;
  reducedMotion: boolean;
};

function sampleKeyframes(progress: number, values: number[]) {
  const scaled = THREE.MathUtils.clamp(progress, 0, 1) * (values.length - 1);
  const index = Math.min(Math.floor(scaled), values.length - 2);
  return THREE.MathUtils.lerp(values[index], values[index + 1], scaled - index);
}

export function CameraRig({ progress, mobile, reducedMotion }: CameraRigProps) {
  const { camera } = useThree();
  const cameraRef = useRef(camera);
  const target = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    cameraRef.current = camera;
  }, [camera]);

  useFrame((_, delta) => {
    const activeCamera = cameraRef.current;

    if (reducedMotion) {
      activeCamera.position.set(0, 0, mobile ? 7.6 : 7);
      activeCamera.lookAt(0, 0, 0);
      return;
    }

    const p = progress.current;
    const positionX = mobile
      ? 0
      : sampleKeyframes(p, [0, 0.35, -0.45, 0.65, -0.4, 0]);
    const positionY = sampleKeyframes(p, [0, 0.1, -0.25, 0.3, 0, 0]);
    const positionZ = mobile
      ? sampleKeyframes(p, [7.8, 7.2, 7.6, 7.4, 7.1, 8])
      : sampleKeyframes(p, [7, 5.9, 6.7, 6.2, 5.8, 7.4]);

    activeCamera.position.x = THREE.MathUtils.damp(activeCamera.position.x, positionX, 2.8, delta);
    activeCamera.position.y = THREE.MathUtils.damp(activeCamera.position.y, positionY, 2.8, delta);
    activeCamera.position.z = THREE.MathUtils.damp(activeCamera.position.z, positionZ, 2.8, delta);

    target.set(0, sampleKeyframes(p, [0, 0.05, -0.12, 0.12, 0, 0]), 0);
    activeCamera.lookAt(target);
  });

  return null;
}
