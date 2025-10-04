'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text, Environment, useGLTF } from '@react-three/drei'

function HeatMapBoxes() {
    const spheres = []
    const gridSize = 59

    const sphereRadius = Math.min(250 / gridSize, 220 / gridSize) * 0.1

    let index = 0

    for (let x = 0; x < gridSize; x++) {
        for (let z = 0; z < gridSize; z++) {
            const normalizedIndex = index / 3495 // Normalize to 0-1 for 25 boxes
            const hue = (1 - normalizedIndex) * 240 // Blue (240) to Red (0)
            const color = `hsl(${hue}, 100%, 50%)`

            const posX = (x - (gridSize - 1) / 2) * (250 / gridSize)
            const posZ = (z - (gridSize - 1) / 2) * (220 / gridSize)

            spheres.push(
                <mesh key={index} position={[posX, 3 + sphereRadius, posZ]}>
                    <sphereGeometry args={[sphereRadius, 16, 16]} />
                    <meshBasicMaterial color={color} transparent opacity={1} />
                </mesh>
            )

            index++
        }
    }

    return <>{spheres}</>
}

function MalagaModel() {
  const { scene } = useGLTF('/models/malaga/scene.glb')
  return (
    <>
      <primitive object={scene} position={[0, 0, 0]} scale={1} />
      <HeatMapBoxes />
    </>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      <Text
        position={[0, 2, 0]}
        fontSize={1}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        NASA Hackathon 2025
      </Text>
      
      <Text
        position={[0, 0, 0]}
        fontSize={0.5}
        color="#888"
        anchorX="center"
        anchorY="middle"
      >
        Welcome to our 3D Project
      </Text>
      
      <MalagaModel />
      
      <OrbitControls 
        enablePan={true} 
        enableZoom={true} 
        enableRotate={false}
        mouseButtons={{
          LEFT: 2, // Pan with left click (2 = PAN)
          MIDDLE: 1, // Zoom with middle click
          RIGHT: 0 // Rotate with right click (disabled since enableRotate is false)
        }}
      />
      <Environment preset="sunset" />
    </>
  )
}

export default function TheProject() {
  return (
    <div className="w-full h-screen">
    <Canvas 
      camera={{ position: [0, 150, 0], fov: 75, near: 0.1, far: 10000 }}
      style={{ background: '#000000' }}
      onCreated={({ camera }) => {
        camera.lookAt(0, 0, 0)
      }}
    >
      <Scene />
    </Canvas>
    </div>
  );
}
