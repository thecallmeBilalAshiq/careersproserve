'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import FloatingOrbs from './FloatingOrbs';

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 35], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <FloatingOrbs />
        </Suspense>
      </Canvas>
    </div>
  );
}
