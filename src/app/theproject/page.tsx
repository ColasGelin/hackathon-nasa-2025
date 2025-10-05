'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Text, Environment, useGLTF, Html } from '@react-three/drei'
import { useState, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { MinimalToggle, OrangeToggle } from '@/components/ui/toggle'

function HeatMapBoxes({ placedCylinders, selectedMonth, selectedYear, onTemperatureUpdate, isVisible }: { placedCylinders: THREE.Vector3[], selectedMonth: string, selectedYear: string, onTemperatureUpdate?: (avgTemp: number) => void, isVisible: boolean }) {
    const [temperatureData, setTemperatureData] = useState<number[]>([])
    const groupRef = useRef<THREE.Group>(null)
    const targetOpacity = useRef(isVisible ? 0.3 : 0)
    const currentOpacity = useRef(isVisible ? 0.3 : 0)
    const gridSize = 59

    const sphereRadius = Math.min(250 / gridSize, 220 / gridSize) * 0.2

    // Update target opacity when visibility changes
    useEffect(() => {
        targetOpacity.current = isVisible ? 0.3 : 0
    }, [isVisible])

    // Animate opacity smoothly
    useFrame(() => {
        const delta = 0.2
        const diff = targetOpacity.current - currentOpacity.current
        
        if (Math.abs(diff) > 0.001 && groupRef.current) {
            currentOpacity.current += diff * delta
            
            // Update all mesh materials in the group
            groupRef.current.children.forEach((child) => {
                if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
                    child.material.opacity = currentOpacity.current
                    child.material.depthWrite = currentOpacity.current > 0.01
                    child.material.needsUpdate = true
                }
            })
        }
    })

    // Load and parse CSV when month or year changes
    useEffect(() => {
        const fileName = `/processed/data_${selectedMonth}_${selectedYear}.csv`
        fetch(fileName)
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
                
                // Calculate and update average temperature
                if (temps.length > 0 && onTemperatureUpdate) {
                    const avgTemp = temps.reduce((sum, temp) => sum + temp, 0) / temps.length
                    onTemperatureUpdate(Math.round(avgTemp * 10) / 10) // Round to 1 decimal
                }
            })
            .catch(error => {
                console.error('Error loading temperature data:', error)
            })
    }, [selectedMonth, selectedYear, onTemperatureUpdate])

    // Temperature range from CSV: min ~22, max ~44
    const minTemp = 22
    const maxTemp = 44

    const spheres = []
    let index = 0

    for (let x = 0; x < gridSize; x++) {
        for (let z = 0; z < gridSize; z++) {
            let hue = 240 // Default blue
            
            if (temperatureData.length > index) {
                let temp = temperatureData[index]
                
                // Calculate sphere position (before transformation)
                const posX = ((gridSize - 1) / 2 - x) * (250 / gridSize)
                const posZ = (z - (gridSize - 1) / 2) * (220 / gridSize)
                const spherePos = new THREE.Vector3(posX, 3 + sphereRadius, posZ - 1)
                
                // Apply the same transformation as the group to get world position
                // 1. Scale by [-1, 1, 1] (flip x)
                const transformedPos = new THREE.Vector3(-spherePos.x, spherePos.y, spherePos.z)
                // 2. Rotate by Math.PI/2 around Y axis
                const cos = Math.cos(Math.PI / 2)
                const sin = Math.sin(Math.PI / 2)
                const rotatedX = transformedPos.x * cos + transformedPos.z * sin
                const rotatedZ = -transformedPos.x * sin + transformedPos.z * cos
                transformedPos.x = rotatedX
                transformedPos.z = rotatedZ
                // 3. Add position offset [30, 0, 0]
                transformedPos.x += 30
                
                // Check how many cylinders affect this sphere and stack the cooling effect
                let coolingEffect = 0
                for (const cylinderPos of placedCylinders) {
                    const distance = transformedPos.distanceTo(cylinderPos)
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
                    <boxGeometry args={[sphereRadius * 5.7, sphereRadius / 10, sphereRadius * 5]} />
                    <meshBasicMaterial 
                        color={color} 
                        transparent 
                        opacity={currentOpacity.current}
                        depthWrite={currentOpacity.current > 0.01}
                    />
                </mesh>
            )

            index++
        }
    }

    return (
        <group 
            ref={groupRef} 
            scale={[-1, 1, 1]} 
            rotation={[0, Math.PI / 2, 0]}
            position={[30, 0, 0]}
        >
            {spheres}
        </group>
    )
}

function MalagaModel({ placedCylinders, showModel, showHeatmap, selectedMonth, selectedYear, onTemperatureUpdate }: { placedCylinders: THREE.Vector3[], showModel: boolean, showHeatmap: boolean, selectedMonth: string, selectedYear: string, onTemperatureUpdate?: (avgTemp: number) => void }) {
  const { scene } = useGLTF('/models/malaga/scene.glb')
  return (
    <>
      {showModel && <primitive object={scene} position={[0, -3, 0]} scale={1}/>}
      <HeatMapBoxes 
        placedCylinders={placedCylinders} 
        selectedMonth={selectedMonth} 
        selectedYear={selectedYear} 
        onTemperatureUpdate={onTemperatureUpdate}
        isVisible={showHeatmap}
      />
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

function Scene({ showMouseCube, onPlaceCube, showModel, showHeatmap, selectedMonth, selectedYear, onTemperatureUpdate }: { showMouseCube: boolean, onPlaceCube: (position: THREE.Vector3) => void, showModel: boolean, showHeatmap: boolean, selectedMonth: string, selectedYear: string, onTemperatureUpdate?: (avgTemp: number) => void }) {
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
      
      <MalagaModel placedCylinders={placedCubes} showModel={showModel} showHeatmap={showHeatmap} selectedMonth={selectedMonth} selectedYear={selectedYear} onTemperatureUpdate={onTemperatureUpdate} />
      
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
    <div className="group transition-all duration-300 hover:scale-105 bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-white/20 shadow-lg">
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
    <div className="group transition-all duration-300 hover:scale-105 bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-white/20 shadow-lg">
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
  const [averageTemperature, setAverageTemperature] = useState<number>(18.5) // Default value
  
  // Available data mapping: year -> array of available months
  const availableData: Record<string, string[]> = {
    '2014': ['01', '03', '04', '05', '07', '08', '09', '10', '11', '12'], // Removed 06 (Jun)
    '2015': ['01', '02', '03', '05', '06', '09', '11', '12'], // Removed 07 (Jul), 08 (Aug), 10 (Oct)
    '2016': ['01', '02', '05', '06', '07', '09', '10', '11', '12'], // Removed 03 (Mar), 04 (Apr), 08 (Aug)
    '2017': ['01', '02', '03', '04', '06', '08', '09', '10', '11', '12'], // Removed 05 (May), 07 (Jul)
    '2018': ['01', '02', '04', '05', '06', '07', '09', '11', '12'], // Removed 03 (Mar), 08 (Aug), 10 (Oct)
    '2019': ['01', '02', '03', '04', '05', '06', '07', '08', '11', '12'], // Removed 09 (Sept), 10 (Oct)
    '2020': ['01', '04', '06', '07', '08', '11', '12'], // Removed 02 (Feb), 05 (May), 09 (Sept)
    '2021': ['01', '02', '03', '05', '06', '07', '09', '10', '11', '12'], // Removed 04 (Apr), 08 (Aug)
    '2022': ['01', '03', '05', '06', '07', '08', '09', '10', '12'], // Removed 04 (Apr), 11 (Nov)
    '2023': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '11', '12'],
    '2024': ['01', '02', '03', '04', '05', '07', '08'] // Removed 06 (Jun)
  }
  
  // Default to latest available (August 2024)
  const [selectedYear, setSelectedYear] = useState('2024')
  const [selectedMonth, setSelectedMonth] = useState('08')
  
  useEffect(() => {
    fetch('/malagaStats.json')
      .then(res => res.json())
      .then(data => setCityStats(data))
  }, [])
  
  const handlePlaceCube = (position: THREE.Vector3) => {
    setShowMouseCube(false)
  }
  
  const handleYearChange = (year: string) => {
    setSelectedYear(year)
    // Set to first available month of the new year
    const firstMonth = availableData[year][0]
    setSelectedMonth(firstMonth)
  }
  
  const handleTemperatureUpdate = (avgTemp: number) => {
    setAverageTemperature(avgTemp)
  }
  
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const availableMonths = availableData[selectedYear] || []
  const availableYears = Object.keys(availableData)

  const handleMonthSliderChange = (index: number) => {
    if (availableMonths[index]) {
      setSelectedMonth(availableMonths[index])
    }
  }

  const handleYearSliderChange = (index: number) => {
    const year = availableYears[index]
    setSelectedYear(year)
    
    // Try to keep the current month if it exists in the new year
    const newYearMonths = availableData[year]
    if (newYearMonths.includes(selectedMonth)) {
      // Current month exists in new year, keep it
      setSelectedMonth(selectedMonth)
    } else {
      // Current month doesn't exist in new year, set to first available month
      setSelectedMonth(newYearMonths[0])
    }
  }

  const currentMonthIndex = availableMonths.indexOf(selectedMonth)
  const currentYearIndex = availableYears.indexOf(selectedYear)
  
  return (
    <div className="w-full h-screen flex bg-black overflow-hidden">
      {/* Left - 3D Map (60%) */}
      <div className="w-[60%] h-screen relative">
        {/* Date Selector - Top Left */}
        <div className="absolute top-4 left-4 z-10 bg-black/90 backdrop-blur-sm px-6 py-4 rounded-lg border border-white/20 shadow-lg">
          
          <div className="flex items-start gap-6">
            {/* Year Slider */}
            <div className="flex-1 min-w-[140px]">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-gray-300">Year</label>
                <span className="text-sm font-bold text-white">{selectedYear}</span>
              </div>
              <input
                type="range"
                min="0"
                max={availableYears.length - 1}
                value={currentYearIndex}
                onChange={(e) => handleYearSliderChange(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{availableYears[0]}</span>
                <span>{availableYears[availableYears.length - 1]}</span>
              </div>
            </div>
            
            {/* Month Slider */}
            <div className="flex-1 min-w-[140px]">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-gray-300">Month</label>
                <span className="text-sm font-bold text-white">
                  {monthNames[parseInt(selectedMonth) - 1]}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={availableMonths.length - 1}
                value={currentMonthIndex}
                onChange={(e) => handleMonthSliderChange(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{monthNames[parseInt(availableMonths[0]) - 1]}</span>
                <span>{monthNames[parseInt(availableMonths[availableMonths.length - 1]) - 1]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Toggles - Top Right */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-3">
          <div className="flex items-center gap-3 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 shadow-lg">
            <span className="text-white text-sm font-medium whitespace-nowrap">3D Model</span>
            <MinimalToggle 
              checked={showModel}
              onChange={(e) => setShowModel(e.target.checked)}
            />
          </div>
          
          <div className="flex items-center gap-3 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 shadow-lg">
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
          <Scene showMouseCube={showMouseCube} onPlaceCube={handlePlaceCube} showModel={showModel} showHeatmap={showHeatmap} selectedMonth={selectedMonth} selectedYear={selectedYear} onTemperatureUpdate={handleTemperatureUpdate} />
        </Canvas>
        
        {/* Add Green Zone Button - Bottom Center */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <button
            onClick={() => setShowMouseCube(!showMouseCube)}
            className={`px-8 py-3 rounded-lg border-2 transition-all whitespace-nowrap font-semibold text-base shadow-lg ${
              showMouseCube 
                ? 'bg-green-600 border-green-700 text-white hover:bg-green-700' 
                : 'bg-green-500 border-green-600 text-white hover:bg-green-600'
            }`}
          >
            {showMouseCube ? '✕ Cancel' : '+ Add Green Zone'}
          </button>
        </div>
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
                value={averageTemperature}
                unit={cityStats.stats.averageTemp.unit}
                description={`${monthNames[parseInt(selectedMonth) - 1]} ${selectedYear} average temperature`}
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
