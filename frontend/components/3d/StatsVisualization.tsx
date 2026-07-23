'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import BarChart3D from './BarChart3D';

interface StatsVisualizationProps {
  data: { label: string; value: number }[];
}

export default function StatsVisualization({ data }: StatsVisualizationProps) {
  return (
    <div className="w-full h-96 rounded-xl overflow-hidden border border-primary/20">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <BarChart3D data={data} />
        </Suspense>
      </Canvas>
    </div>
  );
}
