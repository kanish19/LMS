import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function PlayerControls() {
  const { camera } = useThree();

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

  useFrame(() => {
    const speed = 0.15;

    if (keys.current.w) camera.position.z -= speed;
    if (keys.current.s) camera.position.z += speed;
    if (keys.current.a) camera.position.x -= speed;
    if (keys.current.d) camera.position.x += speed;

    camera.position.y = 2;
  });

  return null;
}