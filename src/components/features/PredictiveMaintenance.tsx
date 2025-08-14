import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Wrench, 
  TrendingDown,
  Calendar,
  Activity,
  Zap
} from "lucide-react";

interface Equipment {
  id: string;
  name: string;
  type: string;
  status: "healthy" | "warning" | "critical";
  health: number;
  nextMaintenance: string;
  lastMaintenance: string;
  vibration: number;
  temperature: number;
  pressure: number;
  efficiency: number;
  failureProbability: number;
  estimatedLife: number;
}

interface Alert {
  id: string;
  equipmentId: string;
  severity: "low" | "medium" | "high";
  message: string;
  timestamp: string;
  recommendation: string;
}

const generateTimeSeriesData = (days: number) => {
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    vibration: 2.5 + Math.sin(i * 0.1) * 0.5 + Math.random() * 0.3,
    temperature: 75 + Math.sin(i * 0.15) * 5 + Math.random() * 3,
    pressure: 120 + Math.cos(i * 0.12) * 10 + Math.random() * 5,
  }));
};

export function PredictiveMaintenance() {
  const [equipment, setEquipment] = useState<Equipment[]>([
    {
      id: "mill-01",
      name: "Primary Mill Unit",
      type: "Crusher",
      status: "warning",
      health: 72,
      nextMaintenance: "2024-08-20",
      lastMaintenance: "2024-07-15",
      vibration: 3.2,
      temperature: 82,
      pressure: 135,
      efficiency: 87,
      failureProbability: 15,
      estimatedLife: 18
    },
    {
      id: "mill-02",
      name: "Secondary Mill Unit",
      type: "Crusher",
      status: "healthy",
      health: 89,
      nextMaintenance: "2024-09-10",
      lastMaintenance: "2024-08-01",
      vibration: 2.1,
      temperature: 76,
      pressure: 125,
      efficiency: 91,
      failureProbability: 5,
      estimatedLife: 24
    },
    {
      id: "boiler-01",
      name: "Main Boiler",
      type: "Boiler",
      status: "critical",
      health: 45,
      nextMaintenance: "2024-08-16",
      lastMaintenance: "2024-06-20",
      vibration: 4.8,
      temperature: 95,
      pressure: 180,
      efficiency: 78,
      failureProbability: 35,
      estimatedLife: 6
    },
    {
      id: "pump-01",
      name: "Juice Extraction Pump",
      type: "Pump",
      status: "healthy",
      health: 94,
      nextMaintenance: "2024-09-25",
      lastMaintenance: "2024-08-05",
      vibration: 1.8,
      temperature: 68,
      pressure: 110,
      efficiency: 96,
      failureProbability: 3,
      estimatedLife: 36
    }
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "alert-001",
      equipmentId: "boiler-01",
      severity: "high",
      message: "Abnormal vibration detected - 4.8 mm/s (threshold: 3.5 mm/s)",
      timestamp: "2024-08-14 09:23",
      recommendation: "Schedule immediate inspection. Replace bearing assembly."
    },
    {
      id: "alert-002",
      equipmentId: "mill-01",
      severity: "medium",
      message: "Temperature rising trend detected",
      timestamp: "2024-08-14 08:45",
      recommendation: "Check lubrication system. Schedule maintenance within 7 days."
    },
    {
      id: "alert-003",
      equipmentId: "mill-01",
      severity: "low",
      message: "Efficiency below optimal range",
      timestamp: "2024-08-14 07:12",
      recommendation: "Perform routine calibration and cleaning."
    }
  ]);

  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(equipment[0]);
  const [timeSeriesData] = useState(generateTimeSeriesData(30));

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEquipment(prev => prev.map(eq => ({
        ...eq,
        vibration: Math.max(1, eq.vibration + (Math.random() - 0.5) * 0.2),
        temperature: Math.max(60, eq.temperature + (Math.random() - 0.5) * 2),
        pressure: Math.max(100, eq.pressure + (Math.random() - 0.5) * 5),
        health: Math.max(0, Math.min(100, eq.health + (Math.random() - 0.5) * 1))
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "text-green-600 bg-green-100";
      case "warning": return "text-yellow-600 bg-yellow-100";
      case "critical": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Active Alerts ({alerts.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {alerts.map((alert) => (
            <Alert key={alert.id} className="border-l-4 border-l-orange-500">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={getSeverityColor(alert.severity) as any}>
                        {alert.severity}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{alert.timestamp}</span>
                    </div>
                    <p className="font-medium">{alert.message}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      <strong>Recommendation:</strong> {alert.recommendation}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Acknowledge
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Equipment List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Equipment Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {equipment.map((eq) => (
              <div
                key={eq.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedEquipment?.id === eq.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:bg-muted/50'
                }`}
                onClick={() => setSelectedEquipment(eq)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{eq.name}</h4>
                  <Badge className={getStatusColor(eq.status)}>
                    {eq.status === "healthy" && <CheckCircle className="h-3 w-3 mr-1" />}
                    {eq.status === "warning" && <Clock className="h-3 w-3 mr-1" />}
                    {eq.status === "critical" && <AlertTriangle className="h-3 w-3 mr-1" />}
                    {eq.status}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Health Score</span>
                      <span>{eq.health}%</span>
                    </div>
                    <Progress value={eq.health} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Next Maintenance:</span>
                      <p className="font-medium">{eq.nextMaintenance}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Failure Risk:</span>
                      <p className="font-medium">{eq.failureProbability}%</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Equipment Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              {selectedEquipment?.name} - Detailed Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedEquipment && (
              <div className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {selectedEquipment.vibration.toFixed(1)}
                    </div>
                    <div className="text-sm text-muted-foreground">Vibration (mm/s)</div>
                  </div>
                  
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {selectedEquipment.temperature}°C
                    </div>
                    <div className="text-sm text-muted-foreground">Temperature</div>
                  </div>
                  
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedEquipment.pressure}
                    </div>
                    <div className="text-sm text-muted-foreground">Pressure (PSI)</div>
                  </div>
                  
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {selectedEquipment.efficiency}%
                    </div>
                    <div className="text-sm text-muted-foreground">Efficiency</div>
                  </div>
                </div>

                {/* Trend Chart */}
                <div>
                  <h4 className="font-medium mb-4">30-Day Sensor Trends</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={timeSeriesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="vibration" stackId="1" stroke="#ef4444" fill="#fee2e2" />
                      <Area type="monotone" dataKey="temperature" stackId="2" stroke="#f59e0b" fill="#fef3c7" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Maintenance Schedule */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="h-5 w-5 text-blue-500" />
                      <h5 className="font-medium">Maintenance Schedule</h5>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Last Maintenance:</span>
                        <span>{selectedEquipment.lastMaintenance}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Next Scheduled:</span>
                        <span className="font-medium">{selectedEquipment.nextMaintenance}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Estimated Life:</span>
                        <span>{selectedEquipment.estimatedLife} months</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingDown className="h-5 w-5 text-red-500" />
                      <h5 className="font-medium">Risk Assessment</h5>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Failure Probability</span>
                          <span>{selectedEquipment.failureProbability}%</span>
                        </div>
                        <Progress value={selectedEquipment.failureProbability} className="h-2" />
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full"
                        variant={selectedEquipment.status === "critical" ? "destructive" : "outline"}
                      >
                        Schedule Maintenance
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}