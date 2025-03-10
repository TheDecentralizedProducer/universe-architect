import React, { useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Sky, Text, Stars } from '@react-three/drei';
import { useGameStore } from '../store/gameStore';
import { Vector3, FacilityType } from '../models/types';
import * as THREE from 'three';

interface BuildingProps {
  position: Vector3;
  scale?: number;
  color?: string;
  type?: FacilityType;
  name?: string;
  onClick?: () => void;
}

const Building: React.FC<BuildingProps> = ({ position, scale = 1, color = '#888888', type = FacilityType.OFFICE, name, onClick }) => {
  const [hovered, setHovered] = useState(false);
  
  // Add subtle floating animation
  const meshRef = React.useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current && hovered) {
      meshRef.current.position.y = position.y + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  const getGeometry = () => {
    switch (type) {
      case FacilityType.SOUNDSTAGE:
        return (
          <>
            <cylinderGeometry args={[scale, scale, 2 * scale, 8]} />
            <mesh position={[0, scale + 0.5, 0]}>
              <cylinderGeometry args={[scale * 0.8, scale, scale, 8]} />
            </mesh>
          </>
        );
      case FacilityType.BACKLOT:
        return <boxGeometry args={[4 * scale, scale, 4 * scale]} />;
      case FacilityType.SPECIAL_EFFECTS:
      case FacilityType.MARKETING:
      case FacilityType.TALENT_AGENCY:
      case FacilityType.WRITING_ROOM:
        return (
          <>
            <boxGeometry args={[2 * scale, 3 * scale, 2 * scale]} />
            <mesh position={[0, 2 * scale, 0]}>
              <coneGeometry args={[scale, scale, 4]} />
            </mesh>
          </>
        );
      default:
        return <boxGeometry args={[2 * scale, 4 * scale, 2 * scale]} />;
    }
  };

  return (
    <group position={[position.x, position.y, position.z]}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {getGeometry()}
        <meshStandardMaterial 
          color={hovered ? new THREE.Color(color).multiplyScalar(1.2) : color}
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>
      {name && (
        <Text
          position={[0, -1, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
      )}
    </group>
  );
};

const Ground: React.FC = () => {
  // Create a more interesting ground with grid pattern
  const gridSize = 100;
  const gridDivisions = 20;

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[gridSize, gridSize]} />
        <meshStandardMaterial 
          color="#2a5a2d"
          roughness={1}
          metalness={0}
        />
      </mesh>
      <gridHelper 
        args={[gridSize, gridDivisions, '#666666', '#444444']} 
        position={[0, -0.48, 0]}
      />
      {/* Add some decorative elements */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh 
          key={i}
          position={[
            Math.random() * 80 - 40,
            -0.4,
            Math.random() * 80 - 40
          ]}
          rotation={[-Math.PI / 2, 0, Math.random() * Math.PI]}
        >
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial color="#4a8a4d" />
        </mesh>
      ))}
    </group>
  );
};

const StudioLot: React.FC = () => {
  const { studio, selectFilm } = useGameStore();

  // Default facilities if none exist
  const defaultFacilities = [
    { id: 'main-office', position: { x: 0, y: 0, z: 0 }, type: FacilityType.OFFICE, name: 'Main Office' },
    { id: 'soundstage-1', position: { x: -10, y: 0, z: -5 }, type: FacilityType.SOUNDSTAGE, name: 'Sound Stage A' },
    { id: 'soundstage-2', position: { x: -10, y: 0, z: 5 }, type: FacilityType.SOUNDSTAGE, name: 'Sound Stage B' },
    { id: 'backlot-1', position: { x: 15, y: 0, z: 0 }, type: FacilityType.BACKLOT, name: 'Main Backlot' },
  ];

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [20, 15, 20], fov: 60 }}>
        {/* Enhanced Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <spotLight
          position={[-10, 20, -10]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
        />
        
        {/* Environment and Sky */}
        <Sky sunPosition={[100, 10, 100]} />
        <Environment preset="sunset" />
        <Stars radius={100} depth={50} count={1000} factor={4} />

        {/* Studio Buildings */}
        {studio?.films.map((film) => (
          <Building
            key={film.id}
            position={film.position}
            scale={film.budget / 1000000} // Scale building based on budget
            color={film.status === 'RELEASED' ? '#4CAF50' : '#2196F3'}
            type={FacilityType.OFFICE}
            name={film.title}
            onClick={() => selectFilm(film)}
          />
        ))}

        {/* Default Facilities */}
        {defaultFacilities.map((facility) => (
          <Building
            key={facility.id}
            position={facility.position}
            scale={1.2}
            color="#9C27B0"
            type={facility.type}
            name={facility.name}
          />
        ))}

        {/* Studio Facilities */}
        {studio?.facilities.map((facility) => (
          <Building
            key={facility.id}
            position={facility.position}
            scale={0.8}
            color="#9C27B0"
            type={facility.type}
            name={facility.name}
          />
        ))}

        <Ground />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2.1}
          minDistance={5}
          maxDistance={50}
        />
      </Canvas>
    </div>
  );
};

export default StudioLot;
