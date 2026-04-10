import { Text, Float } from '@react-three/drei';
import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CourseDoor({ course, position, onEnter }) {
  const [hovered, setHovered] = useState(false);
  const doorRef = useRef();

  useFrame((state) => {
    const { camera } = state;
    const distance = camera.position.distanceTo(new THREE.Vector3(...position));
    
    // Proximity detection
    if (distance < 3) {
      onEnter(course);
    }
  });

  return (
    <group position={position}>
      {/* Door Frame */}
      <mesh position={[0, 1.25, 0.05]}>
        <boxGeometry args={[2.2, 2.7, 0.1]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      {/* Door */}
      <mesh 
        ref={doorRef}
        position={[0, 1.25, 0.1]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[2, 2.5, 0.05]} />
        <meshStandardMaterial color={hovered ? '#00ffff' : '#222'} />
      </mesh>

      {/* Course Title Sign */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Text
          position={[0, 3, 0.2]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff"
        >
          {course.title}
        </Text>
      </Float>

      {/* Instruction */}
      {hovered && (
        <Text
          position={[0, 0.5, 0.5]}
          fontSize={0.15}
          color="#00ffff"
          anchorX="center"
        >
          Walk closer to enter
        </Text>
      )}
    </group>
  );
}
