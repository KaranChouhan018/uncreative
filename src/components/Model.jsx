
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/untitled1.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        name="Close"
        castShadow
        receiveShadow
        geometry={nodes.Close.geometry}
        material={materials['Material.001']}
        position={[0.2, 0.142, 0.668]}
        scale={3.2}
      />
      <mesh
        name="Far"
        castShadow
        receiveShadow
        geometry={nodes.Far.geometry}
        material={materials['Material.001']}
        position={[-2.505, 0.695, 0.392]}
        scale={1.95}
      />
      <mesh
        name="Middle"
        castShadow
        receiveShadow
        geometry={nodes.Middle.geometry}
        material={materials['Material.001']}
        position={[-1.505, 0.695, 0.392]}
        scale={1.2}
      />
      {/* <mesh
        name="Plane"
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={materials['Material.002']}
        position={[-0.114, 0.196, -0.489]}
        rotation={[0, -0.564, 0]}
        scale={1.021}
      />
      <mesh
        name="Plane001"
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials['Material.002']}
        position={[-1.406, 2.523, 0.403]}
        rotation={[0, 0.616, 0]}
        scale={1.273}
      />
      <mesh
        name="Plane002"
        castShadow
        receiveShadow
        geometry={nodes.Plane002.geometry}
        material={materials['Material.002']}
        position={[-0.845, -0.333, 0.976]}
        rotation={[0, 0.467, 0]}
        scale={0.996}
      />
      <mesh
        name="Plane003"
        castShadow
        receiveShadow
        geometry={nodes.Plane003.geometry}
        material={materials['Material.002']}
        position={[-1.564, 0.435, -0.331]}
        rotation={[0, 0.212, 0]}
        scale={1.06}
      /> */}
      <mesh
        name="Plane004"
        castShadow
        receiveShadow
        geometry={nodes.Plane004.geometry}
        material={materials['Material.003']}
        position={[-1.329, 1.051, 0.144]}
        rotation={[3.004, -1.204, 2.663]}
        scale={[0.803, 0.909, 0.998]}
      />
      <mesh
        name="Plane005"
        castShadow
        receiveShadow
        geometry={nodes.Plane005.geometry}
        material={materials['Material.003']}
        position={[-0.983, 1.221, 0.588]}
        rotation={[3.004, -1.204, 2.663]}
        scale={[1.051, 0.909, 0.998]}
      />
      <mesh
        name="Plane006"
        castShadow
        receiveShadow
        geometry={nodes.Plane006.geometry}
        material={materials['Material.003']}
        position={[-1.123, 0.863, 0.33]}
        rotation={[3.004, -1.204, 2.663]}
        scale={[0.803, 0.909, 0.998]}
      />
      <mesh
        name="Plane007"
        castShadow
        receiveShadow
        geometry={nodes.Plane007.geometry}
        material={materials['Material.003']}
        position={[-0.788, 0.907, 0.671]}
        rotation={[3.004, -1.204, 2.663]}
        scale={[0.707, 0.909, 0.998]}
      />
      <mesh
        name="Plane008"
        castShadow
        receiveShadow
        geometry={nodes.Plane008.geometry}
        material={materials['Material.003']}
        position={[-0.349, 1.12, 0.629]}
        rotation={[3.004, -1.204, 2.663]}
        scale={[0.803, 0.909, 0.998]}
      />
      <mesh
        name="Plane009"
        castShadow
        receiveShadow
        geometry={nodes.Plane009.geometry}
        material={materials['Material.003']}
        position={[0.05, 1.025, -0.239]}
        rotation={[Math.PI, -1.161, 2.877]}
        scale={[0.803, 0.909, 0.998]}
      />
      <mesh
        name="Plane010"
        castShadow
        receiveShadow
        geometry={nodes.Plane010.geometry}
        material={materials['Material.003']}
        position={[-0.428, 0.595, 0.268]}
        rotation={[3.004, -1.204, 2.663]}
        scale={[0.707, 0.909, 0.998]}
      />
      <mesh
        name="Plane011"
        castShadow
        receiveShadow
        geometry={nodes.Plane011.geometry}
        material={materials['Material.003']}
        position={[-0.066, 0.659, 0.283]}
        rotation={[3.004, -1.204, 2.663]}
        scale={[0.707, 0.909, 0.998]}
      />
      <mesh
        name="Plane012"
        castShadow
        receiveShadow
        geometry={nodes.Plane012.geometry}
        material={materials['Material.003']}
        position={[0.679, 0.699, 0.435]}
        rotation={[2.905, -1.36, 2.559]}
        scale={[0.707, 0.909, 0.998]}
      />
      <mesh
        name="Plane013"
        castShadow
        receiveShadow
        geometry={nodes.Plane013.geometry}
        material={materials['Material.003']}
        position={[0.081, 0.932, 0.385]}
        rotation={[3.004, -1.204, 2.663]}
        scale={[0.707, 0.909, 0.998]}
      />
      <mesh
        name="Plane014"
        castShadow
        receiveShadow
        geometry={nodes.Plane014.geometry}
        material={materials['Material.003']}
        position={[0.087, 1.606, -0.261]}
        rotation={[Math.PI, -1.161, 2.877]}
        scale={[0.803, 0.909, 0.998]}
      />
      <mesh
        name="Plane015"
        castShadow
        receiveShadow
        geometry={nodes.Plane015.geometry}
        material={materials['Material.003']}
        position={[0.507, 0.613, 0.273]}
        rotation={[2.959, -1.297, 2.615]}
        scale={[0.707, 0.909, 0.998]}
      />
      <mesh
        name="Plane016"
        castShadow
        receiveShadow
        geometry={nodes.Plane016.geometry}
        material={materials['Material.003']}
        position={[0.209, 0.923, -0.527]}
        rotation={[Math.PI, -1.161, 2.877]}
        scale={[0.803, 0.909, 0.998]}
      />
      <mesh
        name="Plane017"
        castShadow
        receiveShadow
        geometry={nodes.Plane017.geometry}
        material={materials['Material.003']}
        position={[0.216, 1.358, -0.053]}
        rotation={[Math.PI, -1.161, 2.877]}
        scale={[0.803, 0.909, 0.998]}
      />
      <mesh
        name="Plane018"
        castShadow
        receiveShadow
        geometry={nodes.Plane018.geometry}
        material={materials['Material.003']}
        position={[-0.513, 0.643, 0.656]}
        rotation={[3.004, -1.204, 2.663]}
        scale={[0.707, 0.909, 0.998]}
      />
    </group>
  )
}

useGLTF.preload('/untitled1.glb')

