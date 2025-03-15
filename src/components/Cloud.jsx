import React from 'react';
import { useTexture } from '@react-three/drei';
import { Mesh } from 'three';

const Cloud = ({ position, speed, opacity }) => {
  const cloudTexture = useTexture('/cloudPattern.webp'); // Ensure this texture is in your public folder

  return (
    <mesh position={position}>
      <planeGeometry args={[10, 10]} />
      <meshLambertMaterial
        map={cloudTexture}
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </mesh>
  );
};

export default Cloud; 