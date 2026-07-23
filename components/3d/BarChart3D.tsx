'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BarChart3DProps {
  data: { label: string; value: number }[];
}

export default function BarChart3D({ data }: BarChart3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  const colors = ['#00D9FF', '#7C3AED', '#00FF88', '#FF006E'];

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[20, 20, 20]} intensity={1} color="#00D9FF" />
      <group ref={groupRef}>
        {data.map((item, i) => {
          const height = (item.value / maxValue) * 10;
          const x = (i - data.length / 2) * 6;

          return (
            <group key={i} position={[x, height / 2, 0]}>
              {/* Bar */}
              <mesh>
                <boxGeometry args={[4, height, 4]} />
                <meshPhongMaterial
                  color={colors[i % colors.length]}
                  emissive={colors[i % colors.length]}
                  emissiveIntensity={0.4}
                  wireframe={false}
                />
              </mesh>

              {/* Top glow */}
              <mesh position={[0, height / 2 + 0.5, 0]}>
                <sphereGeometry args={[2, 16, 16]} />
                <meshPhongMaterial
                  color={colors[i % colors.length]}
                  emissive={colors[i % colors.length]}
                  emissiveIntensity={0.8}
                  transparent
                  opacity={0.6}
                />
              </mesh>
            </group>
          );
        })}
      </group>
    </>
  );
}
