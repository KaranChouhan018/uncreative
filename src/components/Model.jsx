import React, { useRef } from 'react'
import { useGLTF, Cloud } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useMemo } from 'react'
import {useTexture} from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/scene3.glb')

  const shaderRef = useRef();

    // Load texture for Material.001 replacement
    const texture = useTexture('/image.png') // Replace with your image path
  
    // Create a material with the loaded texture and additive blending
    const imageWithBlendingMaterial = useMemo(() => {
      

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
        
      });
      return material;
    }, [texture]);

  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.iTime.value = clock.getElapsedTime();
    }
  });
  
  // Enhanced godray shader material with static random opacity
  const godrayMaterial = new THREE.ShaderMaterial({
    uniforms: {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      iColor: { value: new THREE.Vector3(1, 1, 1) }, // White color
      iIntensity: { value: 1.0 },
      fogColor: { value: new THREE.Vector3(1, 1, 1) }, // Bluish fog color
      fogDensity: { value: 6.0 }, // Fog density
      opacityMin: { value: 0.2 }, // Minimum opacity value
      opacityMax: { value: 0.8 }, // Maximum opacity value
      opacityScale: { value: 4.0 }, // Scale of opacity variation pattern
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float iTime;
      uniform vec2 iResolution;
      uniform vec3 iColor;
      uniform float iIntensity;
      uniform vec3 fogColor;
      uniform float fogDensity;
      uniform float fogSpeed;
      uniform float opacityMin;
      uniform float opacityMax;
      uniform float opacityScale;
      varying vec2 vUv;
      
      // Noise functions for fog effect
      float hash(float n) {
        return fract(sin(n) * 43758.5453);
      }
      
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        
        float a = hash(i.x + i.y * 57.0);
        float b = hash(i.x + 1.0 + i.y * 57.0);
        float c = hash(i.x + i.y * 57.0 + 1.0);
        float d = hash(i.x + 1.0 + i.y * 57.0 + 1.0);
        
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
      
      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 2.0;
        
        for (int i = 0; i < 5; i++) {
          value += amplitude * noise(p * frequency);
          amplitude *= 0.5;
          frequency *= 2.0;
        }
        
        return value;
      }
      
      // Static random opacity function (no time parameter)
      float staticRandomOpacity(vec2 uv) {
        vec2 seed = uv * opacityScale; // Scale controls the pattern size
        float noiseValue = fbm(seed);
        return mix(opacityMin, opacityMax, noiseValue);
      }
      
      float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
        vec2 sourceToCoord = coord - raySource;
        float cosAngle = dot(normalize(sourceToCoord), rayRefDirection);
        return clamp(
          (0.45 + 0.15 * sin(cosAngle * seedA + iTime * speed)) +
          (0.3 + 0.2 * cos(-cosAngle * seedB + iTime * speed)),
          0.0, 1.0) * clamp((iResolution.x - length(sourceToCoord)) / iResolution.x, 0.5, 1.0);
      }
      
      void main() {
        // Convert vUv to screen coordinates for better ray visualization
        vec2 coord = vec2(vUv.x * iResolution.x, (1.0 - vUv.y) * iResolution.y);
        
        // Ray position 1 - from bottom right
        vec2 rayPos1 = vec2(iResolution.x * 0.7, iResolution.y * -0.4);
        vec2 rayRefDir1 = normalize(vec2(1.0, -0.116));
        float raySeedA1 = 36.2214;
        float raySeedB1 = 21.11349;
        float raySpeed1 = 1.5;
        
        // Ray position 2 - from bottom left
        vec2 rayPos2 = vec2(iResolution.x * 0.8, iResolution.y * -0.6);
        vec2 rayRefDir2 = normalize(vec2(1.0, 0.241));
        const float raySeedA2 = 22.39910;
        const float raySeedB2 = 18.0234;
        const float raySpeed2 = 1.1;
        
        // Calculate ray strength for both ray sources
        vec4 rays1 = vec4(iColor, 1.0) * rayStrength(rayPos1, rayRefDir1, coord, raySeedA1, raySeedB1, raySpeed1);
        vec4 rays2 = vec4(iColor, 1.0) * rayStrength(rayPos2, rayRefDir2, coord, raySeedA2, raySeedB2, raySpeed2);
        
        // Combine rays with improved visual effects
        vec4 fragColor = rays1 * 0.5 + rays2 * 0.4;
        
        // Add vertical gradient
        float brightness = 10.0 - (coord.y / iResolution.y);
        fragColor.x *= 0.1 + (brightness * 0.1);
        fragColor.y *= 0.3 + (brightness * 0.1);
        fragColor.z *= 0.5 + (brightness * 0.1);
        
        // Time-based pulsation
        float pulse = 0.9 + 0.1 * sin(iTime * 0.5);
        
        // Generate fog
        vec2 fogCoord = vUv * 3.0;
        fogCoord.y += iTime * fogSpeed;
        
        // Static fog effect
        float fogLayer1 = fbm(fogCoord);
        float fogLayer2 = fbm(fogCoord * 1.5);
        
        // Combine fog layers
        float fogEffect = fogLayer1 * 1.0 + fogLayer2 * 0.4;
        fogEffect = smoothstep(0.0, 1.0, fogEffect) * fogDensity;
        
        // Vertical gradient for fog
        float fogGradient = 1.0 - (vUv.y * 0.5);
        fogEffect *= fogGradient;
        
        // Mix fog with godrays
        vec3 foggedColor = mix(fragColor.rgb, fogColor, fogEffect);
        
        // Generate static random opacity value (not dependent on time)
        float staticOpacityValue = staticRandomOpacity(vUv);
        
        // Final color with intensity control and static random opacity
        gl_FragColor = vec4(foggedColor, fragColor.a) * iIntensity * pulse * 0.5;
        
        // Add extra density to fog in areas with less rays
        float rayIntensity = (rays1.r + rays2.r) * 0.5;
        gl_FragColor.a = max(gl_FragColor.a, fogEffect * (1.0 - rayIntensity) * 0.3);
        
        // Apply static random opacity variation
        gl_FragColor.a *= staticOpacityValue;
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
  });
  
  // Assign the ref to the material
  shaderRef.current = godrayMaterial;
  
  // Original positions and rotations of Material.005 planes for cloud placement
  const cloudPositions = [
    { position: [-0.114, 0.296, -0.629], rotation: [0, -0.564, 0], scale: 0.15 },
    { position: [-0.845, -0.333, 0.976], rotation: [0, 0.467, 0], scale: 0.30 },
 
  ];
  
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Close.geometry}
        material={materials['Material.004']}
        position={[0.141, 0.142, 0.668]}
        scale={2.94}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Far.geometry}
        material={materials['Material.004']}
        position={[-1.9, 0.695, 0.392]}
        scale={1.6}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Old_Text.geometry}
        material={imageWithBlendingMaterial}
        position={[-0.087, 0.990, 0]}
        scale={1.6}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Middle.geometry}
        material={materials['Material.004']}
        position={[-1.505, 0.695, 0.392]}
        scale={1.3}
      />
      
      {/* Drei Cloud components replacing Material.005 planes */}
      {cloudPositions.map((cloudData, index) => (
        <group 
          key={`cloud-${index}`}
          position={cloudData.position}
          rotation={cloudData.rotation}
          scale={typeof cloudData.scale === 'number' ? [cloudData.scale, cloudData.scale, cloudData.scale] : cloudData.scale}
        >
          <Cloud
            opacity={0.3}
            speed={0.2}
            color="#ffffff"
          />
        </group>
      ))}
      
    
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane006.geometry}
        material={godrayMaterial}
        position={[-1.123, 0.863, 0.33]}
        rotation={[3.004, -1.204, 2.663]}
        scale={[0.803, 0.909, 0.998]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane007.geometry}
        material={godrayMaterial}
        position={[-0.788, 0.907, 0.671]}
        rotation={[3.004, -1.204, 2.663]}
        scale={[0.707, 0.909, 0.998]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane008.geometry}
        material={godrayMaterial}
        position={[-0.349, 1.12, 0.629]}
        rotation={[3.004, -1.204, 2.663]}
        scale={[0.803, 0.909, 0.998]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane009.geometry}
        material={godrayMaterial}
        position={[0.05, 1.025, -0.239]}
        rotation={[Math.PI, -1.161, 2.877]}
        scale={[0.803, 0.909, 0.998]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane010.geometry}
        material={godrayMaterial}
        position={[-0.428, 0.595, 0.268]}
        rotation={[3.004, -1.204, 2.663]}
        scale={[0.707, 0.909, 0.998]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane011.geometry}
        material={godrayMaterial}
        position={[-0.066, 0.659, 0.283]}
        rotation={[3.004, -1.204, 2.663]}
        scale={[0.707, 0.909, 0.998]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane012.geometry}
        material={godrayMaterial}
        position={[0.679, 0.699, 0.435]}
        rotation={[2.905, -1.36, 2.559]}
        scale={[0.862, 1.107, 1.216]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane013.geometry}
        material={godrayMaterial}
        position={[0.081, 0.932, 0.385]}
        rotation={[3.004, -1.204, 2.663]}
        scale={[0.707, 0.909, 0.998]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane014.geometry}
        material={godrayMaterial}
        position={[0.087, 1.606, -0.261]}
        rotation={[Math.PI, -1.161, 2.877]}
        scale={[0.803, 0.909, 0.998]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane015.geometry}
        material={godrayMaterial}
        position={[0.507, 0.613, 0.273]}
        rotation={[2.959, -1.297, 2.615]}
        scale={[0.707, 0.909, 0.998]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane016.geometry}
        material={godrayMaterial}
        position={[0.209, 0.923, -0.527]}
        rotation={[Math.PI, -1.161, 2.877]}
        scale={[0.803, 0.909, 0.998]}
      />

    </group>
  )
}

useGLTF.preload('/scene3.glb')