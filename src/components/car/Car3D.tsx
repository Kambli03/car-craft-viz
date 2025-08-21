import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface Car3DProps {
  carColor: string;
  material: 'metallic' | 'matte' | 'glossy';
  environmentLighting: string;
}

// Simple car geometry since we don't have a GLTF model
function CarModel({ color, material }: { color: string; material: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  // Create different material types
  const getMaterial = () => {
    const baseColor = new THREE.Color(color);
    
    switch (material) {
      case 'metallic':
        return new THREE.MeshStandardMaterial({
          color: baseColor,
          metalness: 0.9,
          roughness: 0.1,
          envMapIntensity: 1.5,
        });
      case 'matte':
        return new THREE.MeshStandardMaterial({
          color: baseColor,
          metalness: 0.1,
          roughness: 0.9,
          envMapIntensity: 0.5,
        });
      case 'glossy':
        return new THREE.MeshStandardMaterial({
          color: baseColor,
          metalness: 0.3,
          roughness: 0.0,
          envMapIntensity: 2.0,
        });
      default:
        return new THREE.MeshStandardMaterial({ color: baseColor });
    }
  };

  return (
    <group>
      {/* Car body */}
      <mesh ref={meshRef} position={[0, 0, 0]} material={getMaterial()}>
        <boxGeometry args={[4, 1.5, 8]} />
      </mesh>
      
      {/* Car roof */}
      <mesh position={[0, 1.2, -0.5]} material={getMaterial()}>
        <boxGeometry args={[3.5, 1, 4]} />
      </mesh>
      
      {/* Wheels */}
      <mesh position={[-1.8, -0.8, 2.5]}>
        <cylinderGeometry args={[0.6, 0.6, 0.3, 16]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1.8, -0.8, 2.5]}>
        <cylinderGeometry args={[0.6, 0.6, 0.3, 16]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-1.8, -0.8, -2.5]}>
        <cylinderGeometry args={[0.6, 0.6, 0.3, 16]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1.8, -0.8, -2.5]}>
        <cylinderGeometry args={[0.6, 0.6, 0.3, 16]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Headlights */}
      <mesh position={[-1.2, 0.2, 4.2]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[1.2, 0.2, 4.2]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
      </mesh>
      
      {/* Windows */}
      <mesh position={[0, 1.5, 0.5]}>
        <boxGeometry args={[3.2, 0.8, 3]} />
        <meshStandardMaterial 
          color="#001122" 
          transparent 
          opacity={0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

export function Car3D({ carColor, material, environmentLighting }: Car3DProps) {
  return (
    <div className="w-full h-full">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[8, 4, 8]} fov={50} />
        
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, 10, -10]} intensity={0.5} />
        
        {/* Environment */}
        <Environment preset={environmentLighting as any} />
        
        {/* Car Model */}
        <CarModel color={carColor} material={material} />
        
        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.4} />
        </mesh>
        
        {/* Controls */}
        <OrbitControls 
          enablePan={false}
          minDistance={5}
          maxDistance={15}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.5}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}