import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function Hallway() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]}>
        <planeGeometry args={[10, 100]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation-x={Math.PI / 2} position={[0, 4, 0]}>
        <planeGeometry args={[10, 100]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-5, 2, 0]} rotation-y={Math.PI / 2}>
        <planeGeometry args={[100, 4]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Right Wall */}
      <mesh position={[5, 2, 0]} rotation-y={-Math.PI / 2}>
        <planeGeometry args={[100, 4]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Lighting along the hallway */}
      {[...Array(10)].map((_, i) => (
        <pointLight key={i} position={[0, 3.5, -i * 10 + 40]} intensity={10} color="#00ffff" />
      ))}
      
      <ambientLight intensity={0.2} />
    </group>
  );
}
