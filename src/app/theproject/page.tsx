'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Text, Environment, useGLTF, Html } from '@react-three/drei'
import { useState, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { MinimalToggle, OrangeToggle } from '@/components/ui/toggle'

function HeatMapBoxes({ placedCylinders }: { placedCylinders: THREE.Vector3[] }) {
    const [temperatureData, setTemperatureData] = useState<number[]>([])
    const spheres = []
    const gridSize = 59

    const sphereRadius = Math.min(250 / gridSize, 220 / gridSize) * 0.2

    // Load and parse CSV on mount
    useEffect(() => {
        fetch('/temper_data.csv')
            .then(response => response.text())
            .then(csvText => {
                const lines = csvText.trim().split('\n')
                const temps: number[] = []
                
                // Skip header row
                for (let i = 1; i < lines.length; i++) {
                    const parts = lines[i].split(',')
                    if (parts.length >= 3) {
                        temps.push(parseFloat(parts[2]))
                    }
                }
                
                setTemperatureData(temps)
            })
    }, [])

    // Temperature range from CSV: min ~22, max ~44
    const minTemp = 22
    const maxTemp = 44

    let index = 0

    for (let x = 0; x < gridSize; x++) {
        for (let z = 0; z < gridSize; z++) {
            let hue = 240 // Default blue
            
            if (temperatureData.length > index) {
                let temp = temperatureData[index]
                
                // Calculate sphere position
                const posX = ((gridSize - 1) / 2 - x) * (250 / gridSize)
                const posZ = (z - (gridSize - 1) / 2) * (220 / gridSize)
                const spherePos = new THREE.Vector3(posX, 3 + sphereRadius, posZ - 1)
                
                // Check how many cylinders affect this sphere and stack the cooling effect
                let coolingEffect = 0
                for (const cylinderPos of placedCylinders) {
                    const distance = spherePos.distanceTo(cylinderPos)
                    if (distance <= 10) {
                        coolingEffect += 5 // Stack cooling effects
                    }
                }
                
                // Apply cooling effect but don't go below minimum temperature
                temp = Math.max(temp - coolingEffect, minTemp)
                
                // Normalize temperature to 0-1 range
                const normalizedTemp = (temp - minTemp) / (maxTemp - minTemp)
                
                if (normalizedTemp <= 0.3) {
                    // Cool: blue (240) to green (120)
                    hue = 240 - (normalizedTemp / 0.3) * 120 // 240 to 120
                } else {
                    // Warm: green (120) to red (0) - starts earlier at 30%
                    const hotProgress = (normalizedTemp - 0.2) / 0.7 // 0 to 1
                    hue = 120 - hotProgress * 120 // 120 to 0
                }
            }
            
            const color = `hsl(${hue}, 100%, 50%)`

            const posX = ((gridSize - 1) / 2 - x) * (250 / gridSize)
            const posZ = (z - (gridSize - 1) / 2) * (220 / gridSize)

            spheres.push(
                <mesh key={index} position={[posX, 3 + sphereRadius, posZ - 1]}>
                    <sphereGeometry args={[sphereRadius, 16, 16]} />
                    <meshBasicMaterial color={color} transparent opacity={1} />
                </mesh>
            )

            index++
        }
    }

    return <>{spheres}</>
}

function MalagaModel({ placedCylinders, showModel, showHeatmap }: { placedCylinders: THREE.Vector3[], showModel: boolean, showHeatmap: boolean }) {
  const { scene } = useGLTF('/models/malaga/scene.glb')
  return (
    <>
      {showModel && <primitive object={scene} position={[0, -3, 0]} scale={1}/>}
      {showHeatmap && <HeatMapBoxes placedCylinders={placedCylinders} />}
    </>
  )
}

function PlacedCubes({ cubes }: { cubes: THREE.Vector3[] }) {
  return (
    <>
      {cubes.map((position, index) => (
        <mesh key={index} position={position}>
          <cylinderGeometry args={[2.5, 2.5, 10, 32]} />
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

function Scene({ showMouseCube, onPlaceCube, showModel, showHeatmap }: { showMouseCube: boolean, onPlaceCube: (position: THREE.Vector3) => void, showModel: boolean, showHeatmap: boolean }) {
  const [placedCubes, setPlacedCubes] = useState<THREE.Vector3[]>([])
  
  const handlePlaceCube = (position: THREE.Vector3) => {
    setPlacedCubes(prev => [...prev, position])
    onPlaceCube(position)
  }
  
  return (
    <>
      <ambientLight intensity={1} />
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
      
      <MalagaModel placedCylinders={placedCubes} showModel={showModel} showHeatmap={showHeatmap} />
      
      <PlacedCubes cubes={placedCubes} />
      
      <MouseFollowCube isActive={showMouseCube} onPlace={handlePlaceCube} />
      
      <OrbitControls 
        enablePan={!showMouseCube} 
        enableZoom={true} 
        enableRotate={false}
        minDistance={5}  // Minimum zoom distance
        maxDistance={205} // Maximum zoom distance
        mouseButtons={{
          LEFT: 2, // Pan with left click (2 = PAN)
          MIDDLE: 1, // Zoom with middle click
          RIGHT: 0 // Rotate with right click (disabled since enableRotate is false)
        }}
      />
       <Environment files="/venice_sunset_1k.hdr" />
    </>
  )
}

interface CityStats {
  city: string
  stats: {
    averageTemp: {
      value: number
      unit: string
      description: string
    }
    airQuality: {
      value: number
      unit: string
      description: string
    }
    vegetationPercentage: {
      value: number
      unit: string
      description: string
    }
    cityScore: {
      value: number
      unit: string
      description: string
    }
  }
}

function StatCard({ title, value, unit, description, icon, color }: { title: string, value: number, unit: string, description: string, icon: string, color: string }) {
  return (
    <div className="group transition-all duration-300 hover:scale-105">
      <div className="flex items-baseline justify-between mb-2">
        <h3 className="text-lg font-semibold text-white drop-shadow-lg">{title}</h3>
        <div className={`text-4xl font-bold transition-colors drop-shadow-lg ${color}`}>
          {value}{unit}
        </div>
      </div>
      <p className="text-xs text-gray-300 drop-shadow-lg text-left">{description}</p>
    </div>
  )
}

function VegetationBar({ value }: { value: number }) {
  return (
    <div className="group transition-all duration-300 hover:scale-105">
      <div className="flex items-baseline justify-between mb-2">
        <h3 className="text-lg font-semibold text-white drop-shadow-lg">Vegetation Coverage</h3>
        <div className="text-4xl font-bold text-emerald-500 transition-colors drop-shadow-lg">
          {value}%
        </div>
      </div>
      <div className="relative w-full h-4 bg-black/40 backdrop-blur-sm rounded-full overflow-hidden border border-white/20 mb-2">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-1000 ease-out group-hover:from-emerald-500 group-hover:to-emerald-300"
          style={{ width: `${value}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
      </div>
      <p className="text-xs text-gray-300 drop-shadow-lg text-left">Percentage of urban area covered by vegetation</p>
    </div>
  )
}

export default function TheProject() {
  const [showMouseCube, setShowMouseCube] = useState(false)
  const [cityStats, setCityStats] = useState<CityStats | null>(null)
  const [showModel, setShowModel] = useState(true)
  const [showHeatmap, setShowHeatmap] = useState(true)
  
  useEffect(() => {
    fetch('/malagaStats.json')
      .then(res => res.json())
      .then(data => setCityStats(data))
  }, [])
  
  const handlePlaceCube = (position: THREE.Vector3) => {
    setShowMouseCube(false)
  }
  
  return (
    <div className="w-full h-screen flex bg-black overflow-hidden">
      {/* Left - 3D Map (60%) */}
      <div className="w-[60%] h-screen relative">
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
          <button
            onClick={() => setShowMouseCube(!showMouseCube)}
            className={`px-4 py-2 rounded-lg border transition-all whitespace-nowrap font-medium text-sm ${
              showMouseCube 
                ? 'bg-green-500/20 border-green-500/50 text-green-400 backdrop-blur-sm' 
                : 'bg-black/50 border-white/20 text-white backdrop-blur-sm hover:border-white/40'
            }`}
          >
            {showMouseCube ? 'Cancel' : 'Añadir Zona Verde'}
          </button>
          
          <div className="flex items-center gap-3 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
            <span className="text-white text-sm font-medium whitespace-nowrap">3D Model</span>
            <MinimalToggle 
              checked={showModel}
              onChange={(e) => setShowModel(e.target.checked)}
            />
          </div>
          
          <div className="flex items-center gap-3 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
            <span className="text-white text-sm font-medium whitespace-nowrap">Heatmap</span>
            <MinimalToggle 
              checked={showHeatmap}
              onChange={(e) => setShowHeatmap(e.target.checked)}
            />
          </div>
        </div>
        
        <Canvas 
          camera={{ position: [0, 205, 0], fov: 75, near: 0.1, far: 10000 }}
          style={{ background: '#000000' }}
          onCreated={({ camera }) => {
            camera.lookAt(0, 0, 0)
          }}
        >
          <Scene showMouseCube={showMouseCube} onPlaceCube={handlePlaceCube} showModel={showModel} showHeatmap={showHeatmap} />
        </Canvas>
      </div>
      
      {/* Vertical Separator */}
      <div className="w-[10px] h-screen bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
      
      {/* Right - City Stats (40%) */}
      <div className="w-[40%] h-screen flex items-center justify-center p-6 pointer-events-none">
        <div className="w-full max-w-lg pointer-events-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl">
              {cityStats?.city || 'Loading...'}
            </h1>
            <p className="text-gray-300 text-sm drop-shadow-lg">Environmental Health Dashboard</p>
          </div>
          
          {/* Stats Grid */}
          {cityStats && (
            <div className="space-y-6">
              <StatCard 
                title="Average Temperature"
                value={cityStats.stats.averageTemp.value}
                unit={cityStats.stats.averageTemp.unit}
                description={cityStats.stats.averageTemp.description}
                icon="🌡️"
                color="text-orange-400"
              />
              
              <StatCard 
                title="Air Quality Index"
                value={cityStats.stats.airQuality.value}
                unit={cityStats.stats.airQuality.unit}
                description={cityStats.stats.airQuality.description}
                icon="💨"
                color="text-rose-400"
              />
              
              <VegetationBar value={cityStats.stats.vegetationPercentage.value} />
              
              <StatCard 
                title="City Health Score"
                value={cityStats.stats.cityScore.value}
                unit={cityStats.stats.cityScore.unit}
                description={cityStats.stats.cityScore.description}
                icon="⭐"
                color="text-emerald-400"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
