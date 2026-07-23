'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const FloatingOrbs = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { size } = useThree();

  useEffect(() => {
    if (!groupRef.current) return;

    // Clear previous orbs
    groupRef.current.clear();

    // Create orbs with tech colors
    const colors = [
      '#00D9FF', // Cyan
      '#7C3AED', // Violet
      '#00FF88', // Green
      '#FF006E', // Pink
      '#00D9FF',
    ];

    colors.forEach((color, i) => {
      const geometry = new THREE.IcosahedronGeometry(2 + Math.random() * 2, 32);
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(color),
        emissive: new THREE.Color(color),
        emissiveIntensity: 0.3,
        wireframe: true,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60
      );

      (mesh as any).velocity = {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      };

      groupRef.current?.add(mesh);
    });
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    groupRef.current.children.forEach((mesh) => {
      const typedMesh = mesh as THREE.Mesh & { velocity: any };
      typedMesh.position.x += typedMesh.velocity.x;
      typedMesh.position.y += typedMesh.velocity.y;
      typedMesh.position.z += typedMesh.velocity.z;

      // Boundary conditions
      if (Math.abs(typedMesh.position.x) > 30) typedMesh.velocity.x *= -1;
      if (Math.abs(typedMesh.position.y) > 30) typedMesh.velocity.y *= -1;
      if (Math.abs(typedMesh.position.z) > 30) typedMesh.velocity.z *= -1;

      typedMesh.rotation.x += 0.0005;
      typedMesh.rotation.y += 0.0008;
    });
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[20, 20, 20]} intensity={1} color="#00D9FF" />
      <pointLight position={[-20, -20, 20]} intensity={0.8} color="#7C3AED" />
      <group ref={groupRef} />
    </>
  );
};

export default FloatingOrbs;
