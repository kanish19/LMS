import { Text } from '@react-three/drei';

export default function Door({ position, course, onSelect, color = '#5b3a29' }) {
  return (
    <group>
      {/* Door Frame */}
      <mesh position={[position[0], position[1], position[2] - 0.2]}>
        <boxGeometry args={[1.4, 4.4, 0.3]} />
        <meshStandardMaterial color="#222" />
      </mesh>

      {/* Door */}
      <mesh position={position} onClick={() => onSelect(course)}>
        <boxGeometry args={[1, 4, 0.5]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Label */}
      <Text
        position={[position[0], position[1] + 3.2, position[2]]}
        fontSize={0.45}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={4}
      >
        {course.title}
      </Text>
    </group>
  );
}