import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Box, Cylinder, Sphere, Cone } from "@react-three/drei";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import * as THREE from "three";

interface PlantComponentProps {
  position: [number, number, number];
  isActive: boolean;
  temperature: number;
  efficiency: number;
  onClick: () => void;
}

function SugarMillComponent({ position, isActive, temperature, efficiency, onClick }: PlantComponentProps) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current && isActive) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  const getComponentColor = () => {
    if (efficiency > 90) return "#22c55e"; // green
    if (efficiency > 70) return "#eab308"; // yellow
    return "#ef4444"; // red
  };

  return (
    <group ref={meshRef} position={position} onClick={onClick}>
      {/* Main Mill Building */}
      <Box args={[3, 4, 2]} position={[0, 2, 0]}>
        <meshStandardMaterial color={getComponentColor()} />
      </Box>
      
      {/* Smokestack */}
      <Cylinder args={[0.3, 0.3, 6]} position={[1.5, 5, 0]}>
        <meshStandardMaterial color="#666666" />
      </Cylinder>
      
      {/* Steam/Smoke particles */}
      {isActive && (
        <Sphere args={[0.2]} position={[1.5, 8, 0]}>
          <meshBasicMaterial color="#ffffff" opacity={0.7} transparent />
        </Sphere>
      )}
      
      {/* Processing tanks */}
      <Cylinder args={[0.8, 0.8, 2]} position={[-1.5, 1, 1]}>
        <meshStandardMaterial color={getComponentColor()} />
      </Cylinder>
      
      {/* Info display */}
      <Text
        position={[0, 5, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {`${temperature}°C | ${efficiency}%`}
      </Text>
    </group>
  );
}

function ConveyorBelt({ start, end, isActive }: { start: [number, number, number]; end: [number, number, number]; isActive: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (meshRef.current && isActive) {
      meshRef.current.position.x += 0.02;
      if (meshRef.current.position.x > 5) {
        meshRef.current.position.x = -5;
      }
    }
  });

  const distance = Math.sqrt(
    Math.pow(end[0] - start[0], 2) + 
    Math.pow(end[1] - start[1], 2) + 
    Math.pow(end[2] - start[2], 2)
  );

  return (
    <group position={start}>
      <Box args={[distance, 0.1, 0.5]}>
        <meshStandardMaterial color="#444444" />
      </Box>
      {/* Moving material on belt */}
      {isActive && (
        <group ref={meshRef}>
          <Box args={[0.3, 0.2, 0.3]} position={[0, 0.15, 0]}>
            <meshStandardMaterial color="#8B4513" />
          </Box>
        </group>
      )}
    </group>
  );
}

export function PlantModel3D() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [plantData] = useState({
    mill1: { temperature: 85, efficiency: 87, status: "active" },
    mill2: { temperature: 92, efficiency: 91, status: "active" },
    boiler: { temperature: 150, efficiency: 84, status: "warning" },
    refinery: { temperature: 78, efficiency: 95, status: "optimal" }
  });

  return (
    <Card className="h-[600px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            3D Plant Model - Real-time Status
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedComponent(null)}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[500px] relative">
        <div className="absolute top-4 left-4 z-10 space-y-2">
          {Object.entries(plantData).map(([key, data]) => (
            <Badge 
              key={key}
              variant={data.status === "optimal" ? "default" : data.status === "warning" ? "destructive" : "secondary"}
              className="bg-white/90 text-foreground"
            >
              {key}: {data.efficiency}%
            </Badge>
          ))}
        </div>
        
        <Canvas camera={{ position: [10, 8, 10], fov: 50 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[0, 10, 0]} intensity={0.5} />
            
            {/* Ground */}
            <Box args={[20, 0.1, 20]} position={[0, -0.5, 0]}>
              <meshStandardMaterial color="#2d5016" />
            </Box>
            
            {/* Plant Components */}
            <SugarMillComponent
              position={[0, 0, 0]}
              isActive={isPlaying && plantData.mill1.status === "active"}
              temperature={plantData.mill1.temperature}
              efficiency={plantData.mill1.efficiency}
              onClick={() => setSelectedComponent("mill1")}
            />
            
            <SugarMillComponent
              position={[6, 0, 0]}
              isActive={isPlaying && plantData.mill2.status === "active"}
              temperature={plantData.mill2.temperature}
              efficiency={plantData.mill2.efficiency}
              onClick={() => setSelectedComponent("mill2")}
            />
            
            {/* Boiler */}
            <group position={[-3, 0, -3]}>
              <Cylinder args={[1.5, 1.5, 5]} position={[0, 2.5, 0]}>
                <meshStandardMaterial color={plantData.boiler.efficiency > 80 ? "#22c55e" : "#ef4444"} />
              </Cylinder>
              <Text
                position={[0, 6, 0]}
                fontSize={0.3}
                color="white"
                anchorX="center"
                anchorY="middle"
              >
                Boiler: {plantData.boiler.temperature}°C
              </Text>
            </group>
            
            {/* Refinery */}
            <group position={[3, 0, -3]}>
              <Cone args={[1, 3]} position={[0, 1.5, 0]}>
                <meshStandardMaterial color="#0ea5e9" />
              </Cone>
              <Text
                position={[0, 4, 0]}
                fontSize={0.3}
                color="white"
                anchorX="center"
                anchorY="middle"
              >
                Refinery: {plantData.refinery.efficiency}%
              </Text>
            </group>
            
            {/* Conveyor Belts */}
            <ConveyorBelt 
              start={[3, 0, 0]} 
              end={[6, 0, 0]} 
              isActive={isPlaying} 
            />
            
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          </Suspense>
        </Canvas>
        
        {selectedComponent && (
          <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 border">
            <h4 className="font-semibold text-lg capitalize">{selectedComponent} Details</h4>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div>
                <p className="text-sm text-muted-foreground">Temperature</p>
                <p className="font-medium">{plantData[selectedComponent as keyof typeof plantData].temperature}°C</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Efficiency</p>
                <p className="font-medium">{plantData[selectedComponent as keyof typeof plantData].efficiency}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant={plantData[selectedComponent as keyof typeof plantData].status === "optimal" ? "default" : "destructive"}>
                  {plantData[selectedComponent as keyof typeof plantData].status}
                </Badge>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}