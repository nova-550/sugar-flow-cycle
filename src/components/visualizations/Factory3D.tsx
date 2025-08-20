import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Box, Cylinder, Sphere, Cone } from '@react-three/drei'
import { Mesh } from 'three'
import { useFactoryData } from '@/hooks/useFactoryData'

interface StationProps {
  position: [number, number, number]
  type: string
  efficiency: number
  status: string
  name: string
  onClick: () => void
}

function ProcessStation({ position, type, efficiency, status, name, onClick }: StationProps) {
  const meshRef = useRef<Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
      if (hovered) {
        meshRef.current.scale.setScalar(1.1)
      } else {
        meshRef.current.scale.setScalar(1)
      }
    }
  })

  const getColor = () => {
    if (status === 'maintenance') return '#ff6b6b'
    if (efficiency < 85) return '#ffa726'
    if (efficiency > 95) return '#66bb6a'
    return '#42a5f5'
  }

  const getShape = () => {
    switch (type) {
      case 'crushing':
        return <Box ref={meshRef} args={[4, 6, 3]} />
      case 'extraction':
        return <Cylinder ref={meshRef} args={[2, 2, 8, 8]} />
      case 'clarification':
        return <Sphere ref={meshRef} args={[3, 16, 16]} />
      case 'evaporation':
        return <Cylinder ref={meshRef} args={[3, 1.5, 6, 8]} />
      case 'crystallization':
        return <Cone ref={meshRef} args={[2.5, 6, 8]} />
      default:
        return <Box ref={meshRef} args={[3, 3, 3]} />
    }
  }

  return (
    <group position={position}>
      <mesh
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial color={getColor()} />
        {getShape()}
      </mesh>
      
      <Text
        position={[0, 5, 0]}
        fontSize={1.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
      
      <Text
        position={[0, -4, 0]}
        fontSize={0.8}
        color={efficiency > 90 ? '#4caf50' : efficiency > 80 ? '#ff9800' : '#f44336'}
        anchorX="center"
        anchorY="middle"
      >
        {efficiency.toFixed(1)}%
      </Text>
    </group>
  )
}

function ConveyorBelt({ start, end }: { start: [number, number, number], end: [number, number, number] }) {
  const length = Math.sqrt(
    Math.pow(end[0] - start[0], 2) + 
    Math.pow(end[1] - start[1], 2) + 
    Math.pow(end[2] - start[2], 2)
  )
  
  const midPoint: [number, number, number] = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2
  ]

  return (
    <mesh position={midPoint}>
      <boxGeometry args={[length, 0.5, 1]} />
      <meshStandardMaterial color="#333333" />
    </mesh>
  )
}

function FactoryBuilding() {
  return (
    <group>
      {/* Main factory floor */}
      <mesh position={[20, -2, 0]}>
        <boxGeometry args={[100, 1, 60]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      
      {/* Factory walls */}
      <mesh position={[20, 10, 30]}>
        <boxGeometry args={[100, 20, 2]} />
        <meshStandardMaterial color="#bdbdbd" />
      </mesh>
      <mesh position={[20, 10, -30]}>
        <boxGeometry args={[100, 20, 2]} />
        <meshStandardMaterial color="#bdbdbd" />
      </mesh>
      <mesh position={[-30, 10, 0]}>
        <boxGeometry args={[2, 20, 60]} />
        <meshStandardMaterial color="#bdbdbd" />
      </mesh>
      <mesh position={[70, 10, 0]}>
        <boxGeometry args={[2, 20, 60]} />
        <meshStandardMaterial color="#bdbdbd" />
      </mesh>
      
      {/* Roof */}
      <mesh position={[20, 21, 0]}>
        <boxGeometry args={[100, 2, 60]} />
        <meshStandardMaterial color="#757575" />
      </mesh>
    </group>
  )
}

export function Factory3D() {
  const { processStations, loading } = useFactoryData()
  const [selectedStation, setSelectedStation] = useState<string | null>(null)

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="text-lg">Loading 3D Factory Model...</div>
      </div>
    )
  }

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden border">
      <Canvas camera={{ position: [50, 30, 50], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 20, 5]} intensity={1} castShadow />
        <pointLight position={[0, 20, 0]} intensity={0.5} />
        
        <FactoryBuilding />
        
        {processStations.map((station) => (
          <ProcessStation
            key={station.id}
            position={[station.position_x, station.position_y, station.position_z]}
            type={station.type}
            efficiency={station.efficiency_percentage}
            status={station.status}
            name={station.name}
            onClick={() => setSelectedStation(station.id)}
          />
        ))}
        
        {/* Conveyor belts connecting stations */}
        {processStations.slice(0, -1).map((station, index) => {
          const nextStation = processStations[index + 1]
          return (
            <ConveyorBelt
              key={`conveyor-${index}`}
              start={[station.position_x, station.position_y - 2, station.position_z]}
              end={[nextStation.position_x, nextStation.position_y - 2, nextStation.position_z]}
            />
          )
        })}
        
        <OrbitControls 
          enablePan={true} 
          enableZoom={true} 
          enableRotate={true}
          maxDistance={100}
          minDistance={20}
        />
      </Canvas>
      
      {selectedStation && (
        <div className="absolute bottom-4 left-4 bg-black/80 text-white p-4 rounded-lg">
          <h4 className="font-bold">
            {processStations.find(s => s.id === selectedStation)?.name}
          </h4>
          <p>Type: {processStations.find(s => s.id === selectedStation)?.type}</p>
          <p>Efficiency: {processStations.find(s => s.id === selectedStation)?.efficiency_percentage}%</p>
          <p>Capacity: {processStations.find(s => s.id === selectedStation)?.capacity_tons_per_hour} tons/hr</p>
        </div>
      )}
    </div>
  )
}