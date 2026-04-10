import { Html, Float } from '@react-three/drei';
import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CourseDoor({ course, position, onEnter }) {
  const [hovered, setHovered] = useState(false);
  const doorRef = useRef();

  useFrame((state) => {
    const { camera } = state;
    // Proximity detection
    const distance = camera.position.distanceTo(new THREE.Vector3(...position));
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

      {/* Course Title Label (Standard HTML - No font errors!) */}
      <group position={[0, 3, 0.2]}>
        <Html center distanceFactor={10} transform>
          <div style={{
            background: 'rgba(0,0,0,0.8)',
            padding: '5px 15px',
            borderRadius: '8px',
            border: '1px solid #00ffff',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            fontFamily: 'sans-serif',
            textAlign: 'center'
          }}>
            {course.title}
          </div>
        </Html>
      </group>

      {/* Instruction Label (Standard HTML) */}
      {hovered && (
        <group position={[0, 0.5, 0.5]}>
          <Html center distanceFactor={10}>
            <div style={{
              color: '#00ffff',
              fontWeight: 'bold',
              fontSize: '1rem',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              fontFamily: 'sans-serif'
            }}>
              Walk closer to enter
            </div>
          </Html>
        </group>
      )}
    </group>
  );
}
