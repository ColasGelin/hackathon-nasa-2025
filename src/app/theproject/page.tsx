'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Text, Environment, useGLTF, Html } from '@react-three/drei'
import { useState, useRef } from 'react'
import * as THREE from 'three'

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
      <primitive object={scene} position={[0, -3, 0]} scale={1} />
      <HeatMapBoxes />
    </>
  )
}

function PlacedCubes({ cubes }: { cubes: THREE.Vector3[] }) {
  return (
    <>
      {cubes.map((position, index) => (
        <mesh key={index} position={position}>
          <cylinderGeometry args={[2.5, 2.5, 5, 32]} />
          <meshBasicMaterial color="green" transparent opacity={0.5} />
        </mesh>
      ))}
    </>
  )
}

function MouseFollowCube({ isActive, onPlace }: { isActive: boolean, onPlace: (position: THREE.Vector3) => void }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { camera, raycaster, pointer } = useThree()
  
  useFrame(() => {
    if (isActive && meshRef.current) {
      // Create a plane at Y=-2 to intersect with mouse ray
      const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
      const intersectionPoint = new THREE.Vector3()
      
      // Update raycaster with current mouse position
      raycaster.setFromCamera(pointer, camera)
      
      // Find intersection with the plane
      raycaster.ray.intersectPlane(plane, intersectionPoint)
      
      // Update cube position
      meshRef.current.position.copy(intersectionPoint)
    }
  })
  
  const handleClick = (event: any) => {
    if (isActive && meshRef.current) {
      event.stopPropagation()
      onPlace(meshRef.current.position.clone())
    }
  }
  
  if (!isActive) return null
  
  return (
    <mesh ref={meshRef} position={[0, -2, 0]} onClick={handleClick}>
      <cylinderGeometry args={[2.5, 2.5, 5, 32]} />
      <meshBasicMaterial color="green" transparent opacity={0.3} />
    </mesh>
  )
}

function Scene({ showMouseCube, onPlaceCube }: { showMouseCube: boolean, onPlaceCube: (position: THREE.Vector3) => void }) {
  const [placedCubes, setPlacedCubes] = useState<THREE.Vector3[]>([])
  
  const handlePlaceCube = (position: THREE.Vector3) => {
    setPlacedCubes(prev => [...prev, position])
    onPlaceCube(position)
  }
  
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
      
      <PlacedCubes cubes={placedCubes} />
      
      <MouseFollowCube isActive={showMouseCube} onPlace={handlePlaceCube} />
      
      <OrbitControls 
        enablePan={!showMouseCube} 
        enableZoom={true} 
        enableRotate={false}
        minDistance={5}  // Minimum zoom distance
        maxDistance={80} // Maximum zoom distance
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
  const [showMouseCube, setShowMouseCube] = useState(false)
  
  const handlePlaceCube = (position: THREE.Vector3) => {
    setShowMouseCube(false)
  }
  
  return (
    <div className="w-full h-screen relative">
      {/* UI Button Overlay */}
      <button
        onClick={() => setShowMouseCube(!showMouseCube)}
        className="absolute top-4 left-4 z-10 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        {showMouseCube ? 'Hide' : 'Añadir Zona Verde'}
      </button>
      
      <Canvas 
        camera={{ position: [0, 150, 0], fov: 75, near: 0.1, far: 10000 }}
        style={{ background: '#000000' }}
        onCreated={({ camera }) => {
          camera.lookAt(0, 0, 0)
        }}
      >
        <Scene showMouseCube={showMouseCube} onPlaceCube={handlePlaceCube} />
      </Canvas>
    </div>
  );
}
