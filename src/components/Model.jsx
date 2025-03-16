import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/final.glb')
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
        position={[-2, 0.695, 0.392]}
        scale={1.6}
      />
        {/* <mesh
          castShadow
          receiveShadow
          geometry={nodes.Old_Text.geometry}
          material={materials['Material.001']}
          position={[0, 1, 0]}
          blendMode="mix"
        /> */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Middle.geometry}
        material={materials['Material.004']}
        position={[-1.505, 0.8, 0.392]}
        scale={1.2}
      />
 
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane004.geometry}
        material={materials['Material.006']}
        position={[-1.329, 1.051, 0.144]}
        rotation={[3.004, -1.204, 2.663]}
        scale={[0.803, 0.909, 0.998]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane005.geometry}
        material={materials['Material.006']}
        position={[-0.983, 1.221, 0.588]}
        rotation={[3.004, -1.204, 2.663]}
        scale={[1.051, 0.909, 0.998]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane006.geometry}
        material={materials['Material.006']}
        position={[-1.123, 0.863, 0.33]}
        rotation={[3.004, -1.204, 2.663]}
        scale={[0.803, 0.909, 0.998]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane007.geometry}
        material={materials['Material.006']}
        position={[-0.788, 0.907, 0.671]}
        rotation={[3.004, -1.204, 2.663]}
        scale={[0.707, 0.909, 0.998]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane008.geometry}
        material={materials['Material.006']}
        position={[-0.349, 1.12, 0.629]}
        rotation={[3.004, -1.204, 2.663]}
        scale={[0.803, 0.909, 0.998]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane009.geometry}
        material={materials['Material.006']}
        position={[0.05, 1.025, -0.239]}
        rotation={[Math.PI, -1.161, 2.877]}
        scale={[0.803, 0.909, 0.998]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane010.geometry}
        material={materials['Material.006']}
        position={[-0.428, 0.595, 0.268]}
        rotation={[3.004, -1.204, 2.663]}
        scale={[0.707, 0.909, 0.998]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane011.geometry}
        material={materials['Material.006']}
        position={[-0.066, 0.659, 0.283]}
        rotation={[3.004, -1.204, 2.663]}
        scale={[0.707, 0.909, 0.998]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane012.geometry}
        material={materials['Material.006']}
        position={[0.679, 0.699, 0.435]}
        rotation={[2.905, -1.36, 2.559]}
        scale={[0.862, 1.107, 1.216]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane013.geometry}
        material={materials['Material.006']}
        position={[0.081, 0.932, 0.385]}
        rotation={[3.004, -1.204, 2.663]}
        scale={[0.707, 0.909, 0.998]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane014.geometry}
        material={materials['Material.006']}
        position={[0.087, 1.606, -0.261]}
        rotation={[Math.PI, -1.161, 2.877]}
        scale={[0.803, 0.909, 0.998]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane015.geometry}
        material={materials['Material.006']}
        position={[0.507, 0.613, 0.273]}
        rotation={[2.959, -1.297, 2.615]}
        scale={[0.707, 0.909, 0.998]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane016.geometry}
        material={materials['Material.006']}
        position={[0.209, 0.923, -0.527]}
        rotation={[Math.PI, -1.161, 2.877]}
        scale={[0.803, 0.909, 0.998]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane017.geometry}
        material={materials['Material.006']}
        position={[0.216, 1.358, -0.053]}
        rotation={[Math.PI, -1.161, 2.877]}
        scale={[0.803, 0.909, 0.998]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane018.geometry}
        material={materials['Material.006']}
        position={[-0.513, 0.643, 0.656]}
        rotation={[3.004, -1.204, 2.663]}
        scale={[0.707, 0.909, 0.998]}
      />
    </group>
  )
}

useGLTF.preload('/final.glb')
