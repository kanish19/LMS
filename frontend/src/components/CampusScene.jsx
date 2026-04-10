import { Canvas } from '@react-three/fiber';
import PlayerControls from './PlayerControls';

export default function CampusScene() {
  return (
    <Canvas camera={{ position: [0, 2, 15], fov: 75 }}>
      <ambientLight />
      <PlayerControls />
    </Canvas>
  );
}