import { PointerLockControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function PlayerControls() {
  const keys = useRef({});

  useEffect(() => {
    const down = (e) => (keys.current[e.key.toLowerCase()] = true);
    const up = (e) => (keys.current[e.key.toLowerCase()] = false);

    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);

    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  useFrame((state, delta) => {
    const { camera } = state;
    const moveSpeed = 10 * delta;

    const direction = new THREE.Vector3();
    const frontVector = new THREE.Vector3(0, 0, (keys.current.w ? 1 : 0) - (keys.current.s ? 1 : 0));
    const sideVector = new THREE.Vector3((keys.current.a ? 1 : 0) - (keys.current.d ? 1 : 0), 0, 0);

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(moveSpeed)
      .applyEuler(camera.rotation);

    camera.position.x += direction.x;
    camera.position.z += direction.z;
    camera.position.y = 1.7; // Constant height
  });

  return <PointerLockControls />;
}