'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Text, Environment, useGLTF } from '@react-three/drei'
import { useState, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { MinimalToggle} from '@/components/ui/toggle'

function HeatMapBoxes({ placedCylinders, selectedMonth, selectedYear, onTemperatureUpdate, isVisible }: { placedCylinders: THREE.Vector3[], selectedMonth: string, selectedYear: string, onTemperatureUpdate?: (avgTemp: number) => void, isVisible: boolean }) {
    const [temperatureData, setTemperatureData] = useState<Map<string, number>>(new Map())
    const groupRef = useRef<THREE.Group>(null)
    const targetOpacity = useRef(isVisible ? 0.3 : 0)
    const currentOpacity = useRef(isVisible ? 0.3 : 0)
    
    // Grid dimensions based on CSV coordinates
    const gridHeight = 68  // 0-67 rows (lat)
    const gridWidth = 94   // 0-93 columns (lon)

    const sphereRadius = Math.min(250 / gridWidth, 220 / gridHeight) * 0.2

    // Update target opacity when visibility changes
    useEffect(() => {
        targetOpacity.current = isVisible ? 0.4 : 0
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
        const fileName = `/processed_data/data_${selectedMonth}_${selectedYear}.csv`
        fetch(fileName)
            .then(response => response.text())
            .then(csvText => {
                const lines = csvText.trim().split('\n')
                const tempMap = new Map<string, number>()
                
                // Skip header row
                for (let i = 1; i < lines.length; i++) {
                    const parts = lines[i].split(',')
                    if (parts.length >= 3) {
                        const lat = parseInt(parts[0])  // row index
                        const lon = parseInt(parts[1])  // column index
                        const temp = parseFloat(parts[2])
                        // Use lat,lon as key (matching HTML visualizer)
                        tempMap.set(`${lat},${lon}`, temp)
                    }
                }
                
                setTemperatureData(tempMap)
                
                // Calculate and update average temperature
                if (tempMap.size > 0 && onTemperatureUpdate) {
                    let sum = 0
                    tempMap.forEach(temp => sum += temp)
                    const avgTemp = sum / tempMap.size
                    onTemperatureUpdate(Math.round(avgTemp * 10) / 10) // Round to 1 decimal
                }
            })
            .catch(error => {
                console.error('Error loading temperature data:', error)
            })
    }, [selectedMonth, selectedYear, onTemperatureUpdate])

    // Calculate actual temperature range from the data
    let minTemp = 20
    let maxTemp = 45
    temperatureData.forEach(temp => {
        if (temp < minTemp) minTemp = temp
        if (temp > maxTemp) maxTemp = temp
    })

    const spheres = []

    // Iterate through grid: lat (rows) from 0 to 67, lon (columns) from 0 to 93
    // This matches the HTML visualizer approach: for each row, for each column
    for (let lat = 0; lat < gridHeight; lat++) {
        for (let lon = 0; lon < gridWidth; lon++) {
            let hue = 240 // Default blue
            
            const key = `${lat},${lon}`
            const temp = temperatureData.get(key)
            
            if (temp !== undefined) {
                let adjustedTemp = temp
                
                // Map grid coordinates to 3D space
                // lon (0-93) maps to X axis
                // lat (0-67) maps to Z axis
                const posX = (lon - gridWidth / 2) * (250 / gridWidth)
                const posZ = (lat - gridHeight / 2) * (220 / gridHeight)
                const spherePos = new THREE.Vector3(posX, 3 + sphereRadius, posZ)
                
                // Check cylinder cooling effects with distance-based falloff
                let coolingEffect = 0
                for (const cylinderPos of placedCylinders) {
                    const distance = spherePos.distanceTo(cylinderPos)
                    
                    // Distance-based cooling: -5°C at base, gradually decreasing to 0 at distance > 25 units
                    // Each "case" is approximately 5 units (250/gridWidth ≈ 2.66, so 5 units ≈ 2 grid cells)
                    if (distance < 5) {
                        coolingEffect += 5  // Very close: max cooling
                    } else if (distance < 10) {
                        coolingEffect += 4
                    } else if (distance < 15) {
                        coolingEffect += 3
                    } else if (distance < 20) {
                        coolingEffect += 2
                    } else if (distance < 25) {
                        coolingEffect += 1
                    }
                    // else: distance >= 6, no cooling added
                    // Beyond 25 units (5 cases): no effect
                }
                
                // Apply cooling effect but don't go below minimum temperature
                adjustedTemp = Math.max(adjustedTemp - coolingEffect, minTemp)
                
                // Normalize temperature to 0-1 range
                const normalized = (adjustedTemp - minTemp) / (maxTemp - minTemp)
                
                // Enhanced color gradient with more red for higher temperatures
                if (normalized < 0.2) {
                    // Blue to Cyan
                    hue = 240 - (normalized / 0.2) * 60  // 240 to 180
                } else if (normalized < 0.4) {
                    // Cyan to Green
                    hue = 180 - ((normalized - 0.2) / 0.2) * 60  // 180 to 120
                } else if (normalized < 0.6) {
                    // Green to Yellow
                    hue = 120 - ((normalized - 0.4) / 0.2) * 60  // 120 to 60
                } else if (normalized < 0.8) {
                    // Yellow to Orange-Red
                    hue = 60 - ((normalized - 0.6) / 0.2) * 40  // 60 to 20
                } else {
                    // Orange-Red to Deep Red
                    hue = 20 - ((normalized - 0.8) / 0.2) * 20  // 20 to 0
                }
            }
            
            const color = `hsl(${hue}, 100%, 50%)`
            const posX = (lon - gridWidth / 2) * (250 / gridWidth)
            const posZ = (lat - gridHeight / 2) * (220 / gridHeight)

            spheres.push(
                <mesh key={`${lat}-${lon}`} position={[posX, 3 + sphereRadius, posZ]}>
                    <boxGeometry args={[sphereRadius * 5, sphereRadius / 10, sphereRadius * 6.08]} />
                    <meshBasicMaterial 
                        color={color} 
                        transparent 
                        opacity={currentOpacity.current}
                        depthWrite={currentOpacity.current > 0.01}
                    />
                </mesh>
            )
        }
    }

    return (
        <group 
            ref={groupRef}
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
          <meshBasicMaterial color="green" transparent opacity={0.7} />
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
  
  const handleClick = (event: React.MouseEvent) => {
    if (isActive && meshRef.current) {
      event.stopPropagation()
      onPlace(meshRef.current.position.clone())
    }
  }
  
  if (!isActive) return null
  
  return (
    <mesh ref={meshRef} position={[0, -2, 0]} onClick={handleClick}>
      <cylinderGeometry args={[2.5, 2.5, 2, 32]} />
      <meshBasicMaterial color="green" transparent opacity={1} />
    </mesh>
  )
}

function Scene({ showMouseCube, onPlaceCube, showModel, showHeatmap, selectedMonth, selectedYear, onTemperatureUpdate, resetTrigger }: { showMouseCube: boolean, onPlaceCube: (position: THREE.Vector3) => void, showModel: boolean, showHeatmap: boolean, selectedMonth: string, selectedYear: string, onTemperatureUpdate?: (avgTemp: number) => void, resetTrigger?: number }) {
  const [placedCubes, setPlacedCubes] = useState<THREE.Vector3[]>([])
  
  const handlePlaceCube = (position: THREE.Vector3) => {
    setPlacedCubes(prev => [...prev, position])
    onPlaceCube(position)
  }
  
  // Reset placed cubes when resetTrigger changes
  useEffect(() => {
    if (resetTrigger !== undefined && resetTrigger > 0) {
      setPlacedCubes([])
    }
  }, [resetTrigger])
  
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
        minDistance={5}
        maxDistance={205}
        mouseButtons={{
          LEFT: 2,
          MIDDLE: 1,
          RIGHT: 0
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

function StatCard({ title, value, unit, description, color }: { title: string, value: number, unit: string, description: string, icon: string, color: string }) {
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
  const [showHeatmap, setShowHeatmap] = useState(true)
  const [averageTemperature, setAverageTemperature] = useState<number>(18.5)
  const [placedZonesCount, setPlacedZonesCount] = useState(0)
  const [resetTrigger, setResetTrigger] = useState(0)
  
  // Available data mapping: year -> array of available months
  const availableData: Record<string, string[]> = {
    '2014': ['01', '03', '04', '05', '07', '08', '09'], // Removed 06 (Jun), 10 (Oct), 11 (Nov), 12 (Dec)
    '2015': ['01', '03', '05', '06', '09', '11'], // Removed 02 (Feb), 07 (Jul), 08 (Aug), 10 (Oct), 12 (Dec)
    '2016': ['01', '05', '06', '07', '09', '10'], // Removed 02 (Feb), 03 (Mar), 04 (Apr), 08 (Aug), 11 (Nov), 12 (Dec)
    '2017': ['01', '02', '03', '04', '06', '08', '09', '10', '11', '12'], // Removed 05 (May), 07 (Jul)
    '2018': ['01', '02', '04', '06', '07', '09'], // Removed 03 (Mar), 05 (May), 08 (Aug), 10 (Oct), 11 (Nov), 12 (Dec)
    '2019': ['01', '02', '03', '04', '05', '06', '07', '08', '12'], // Removed 09 (Sept), 10 (Oct), 11 (Nov)
    '2020': ['01', '04', '06', '07', '08', '12'], // Removed 02 (Feb), 05 (May), 09 (Sept), 11 (Nov)
    '2021': ['01', '02', '03', '05', '06', '07', '09', '10'], // Removed 04 (Apr), 08 (Aug), 11 (Nov), 12 (Dec)
    '2022': ['01', '03', '05', '06', '07', '08', '09', '10'], // Removed 04 (Apr), 11 (Nov), 12 (Dec)
    '2023': ['01', '03', '04', '05', '06', '07', '08', '09', '11'], // Removed 02 (Feb), 12 (Dec)
    '2024': ['02', '04', '07', '08'] // Removed 01 (Jan), 03 (Mar), 05 (May), 06 (Jun)
  }
  
  // Default to latest available (August 2024)
  const [selectedYear, setSelectedYear] = useState('2024')
  const [selectedMonth, setSelectedMonth] = useState('08')
  
  useEffect(() => {
    fetch('/malagaStats.json')
      .then(res => res.json())
      .then(data => setCityStats(data))
  }, [])
  
  const handlePlaceCube = () => {
    setShowMouseCube(false)
    setPlacedZonesCount(prev => prev + 1)
  }
  
  const handleRemoveAll = () => {
    setPlacedZonesCount(0)
    setResetTrigger(prev => prev + 1) // Trigger reset without remounting Canvas
    setShowMouseCube(false)
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
      // Current month doesn't exist in new year, show warning
      
      // Find the closest previous month that exists
      const currentMonthNum = parseInt(selectedMonth)
      let closestMonth = newYearMonths[0] // Default to first month
      
      for (let i = currentMonthNum - 1; i >= 1; i--) {
        const monthStr = i.toString().padStart(2, '0')
        if (newYearMonths.includes(monthStr)) {
          closestMonth = monthStr
          break
        }
      }
      
      setSelectedMonth(closestMonth)
      
      // Hide warning after 3 seconds
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
          <Scene 
            showMouseCube={showMouseCube} 
            onPlaceCube={handlePlaceCube} 
            showModel={true}
            showHeatmap={showHeatmap} 
            selectedMonth={selectedMonth} 
            selectedYear={selectedYear} 
            onTemperatureUpdate={handleTemperatureUpdate}
            resetTrigger={resetTrigger}
          />
        </Canvas>
        
        {/* Add Green Zone and Remove All Buttons - Bottom Center */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
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
          
          {placedZonesCount > 0 && (
            <button
              onClick={handleRemoveAll}
              className="px-6 py-3 rounded-lg border-2 border-red-600 bg-red-500 text-white font-semibold text-base shadow-lg hover:bg-red-600 transition-all"
            >
              Remove All
            </button>
          )}
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

// Add this at the very bottom of your file, after the component
useGLTF.preload('/models/malaga/scene.glb')