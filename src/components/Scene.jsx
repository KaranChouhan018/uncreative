"use client";
import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useTexture } from "@react-three/drei";
import { Model } from "./Model";
import { Cloud } from "@react-three/drei";
import { Suspense } from "react";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import Image from "next/image";

export default function Index() {

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div 
        style={{ 
          position: "absolute", 
          top: 0, 
          left: 0, 
          width: "100%", 
          height: "100%", 
          display: "flex", 
          flexDirection: "column",
          alignItems: "center", 
          justifyContent: "center", 
          pointerEvents: "none", 
          zIndex: 10 
        }}
      >
       
        <div style={{
          position: "absolute",
          bottom: "20px",
          color: "white",
          fontSize: "0.8rem",
          opacity: 0.6
        }}>
          <Image
            src="/Unscripted.svg"
            alt="Logo"
            width={30}
            height={30}
          />
        </div>
      </div>
      
      <Canvas 
        style={{ background: "#848684" }}
        camera={{ position: [0, 0, 50] }}
        dpr={[1, 2]}
 
        
      >
          <fog attach="fog" args={["#848684", 20, 200]} position={[0, 40, 0]} />
        <ambientLight intensity={0.2} />
        <directionalLight intensity={0.8} position={[0, 2, 3]} />
        <Environment preset="night" />
     
        
        <Suspense fallback={null}>
        <Float speed={0.5} rotationIntensity={0.3} floatIntensity={2}>
          <Model 
            scale={50}  
            position={[-10, -50, 0]} 
            rotation={[0, 30, 0]}
      
          />
     
        <Cloud position={[0,0, -220]} speed={0.1} opacity={0.9} scale={50} />
          <Cloud position={[40,-20, 10]} speed={0.1} opacity={0.1} scale={6}   />
          <Cloud position={[-50, 30, 0]} speed={0.2} opacity={0.1} scale={6}   />
          <Cloud position={[-25, -30, 0]} speed={0.2} opacity={0.1} scale={7}   />
          <Cloud position={[50, 35, 0]} speed={0.2} opacity={0.1} scale={7}  />
          </Float>
        </Suspense>

        <SimpleParticles />
      </Canvas>
    </div>
  );
}


function SimpleParticles() {
  const particlesRef = useRef();
  const texture = useTexture("/texture.png");
  const spawnTimerRef = useRef(0);
  const activeParticlesRef = useRef(0);
  
  // Create a simple geometry with particles
  useEffect(() => {
    if (!particlesRef.current) return;
    
    const geometry = particlesRef.current.geometry;
    const count = 200;
    
    // Create positions array
    const positions = new Float32Array(count * 3);
    const velocities = [];
    const active = new Array(count).fill(false);
    
    // Initialize all particles to be off-screen initially
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 0.05;
      positions[i3 + 1] = -100; // Far below screen
      positions[i3 + 2] = (Math.random() - 0.5) * 50;
      
      // Store velocities separately
      velocities.push({
        x: (Math.random() - 0.5) * 0.05, // Slower horizontal movement
        y: Math.random() * 0.1 + 0.05,   // Slower upward movement
        z: (Math.random() - 0.5) * 0.05  // Slower depth movement
      });
    }
    
    // Set the positions
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Store velocities and active state in ref
    particlesRef.current.userData.velocities = velocities;
    particlesRef.current.userData.active = active;
    
  }, []);
  
  // Animate particles and spawn new ones sequentially
  useFrame((state, delta) => {
    if (!particlesRef.current) return;
    
    const positions = particlesRef.current.geometry.getAttribute('position');
    const velocities = particlesRef.current.userData.velocities;
    const active = particlesRef.current.userData.active;
    
    if (!positions || !velocities || !active) return;
    
    const posArray = positions.array;
    
    // Spawn timer for sequential spawning
    spawnTimerRef.current += delta;
    
    // Spawn a new particle every 0.5 seconds if not all are active
    if (spawnTimerRef.current > 0.5 && activeParticlesRef.current < active.length) {
      for (let i = 0; i < active.length; i++) {
        if (!active[i]) {
          // Activate this particle
          active[i] = true;
          activeParticlesRef.current++;
          
          // Position at bottom with random x
          posArray[i * 3] = (Math.random() - 0.5) * 50;
          posArray[i * 3 + 1] = -50;
          posArray[i * 3 + 2] = (Math.random() - 0.5) * 50;
          
          // Reset spawn timer
          spawnTimerRef.current = 0;
          break;
        }
      }
    }
    
    // Update all active particles
    for (let i = 0; i < positions.count; i++) {
      if (active[i]) {
        const i3 = i * 3;
        const vel = velocities[i];
        
        // Update positions with delta time for consistent speed
        posArray[i3] += vel.x * delta * 10;
        posArray[i3 + 1] += vel.y * delta * 10;
        posArray[i3 + 2] += vel.z * delta * 10;
        
        // Reset if out of bounds
        if (posArray[i3 + 1] > 50) {
          active[i] = false;
          posArray[i3 + 1] = -100; // Move far below
          activeParticlesRef.current--;
        }
      }
    }
    
    positions.needsUpdate = true;
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry />
      <pointsMaterial 
        size={0.5} 
        map={texture} 
        transparent 
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}