import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Sky } from '@react-three/drei';
import { useGameStore } from '../store/gameStore';
import { Vector3 } from '../models/types';

interface BuildingProps {
  position: Vector3;
  scale?: number;
  color?: string;
  onClick?: () => void;
}

const Building: React.FC<BuildingProps> = ({ position, scale = 1, color = '#888888', onClick }) => {
  return (
    <mesh position={[position.x, position.y, position.z]} onClick={onClick}>
      <boxGeometry args={[2 * scale, 3 * scale, 2 * scale]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Ground: React.FC = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#3a7e3d" />
    </mesh>
  );
};

const StudioLot: React.FC = () => {
  const { studio, selectFilm } = useGameStore();

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [20, 15, 20], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        {/* Environment and Sky */}
        <Sky sunPosition={[100, 10, 100]} />
        <Environment preset="city" />

        {/* Studio Buildings */}
        {studio?.films.map((film) => (
          <Building
            key={film.id}
            position={film.position}
            scale={film.budget / 1000000} // Scale building based on budget
            color={film.status === 'RELEASED' ? '#4CAF50' : '#2196F3'}
            onClick={() => selectFilm(film)}
          />
        ))}

        {/* Studio Facilities */}
        {studio?.facilities.map((facility) => (
          <Building
            key={facility.id}
            position={facility.position}
            scale={0.8}
            color="#9C27B0"
          />
        ))}

        <Ground />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2.1}
        />
      </Canvas>
    </div>
  );
};

export default StudioLot;
