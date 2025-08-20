import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useFactoryData } from "@/hooks/useFactoryData"
import { Activity, AlertTriangle, CheckCircle, XCircle, Thermometer, Gauge, Droplets, Zap } from "lucide-react"

export function RealTimeMetrics() {
  const { sensorData, processStations, loading } = useFactoryData()

  if (loading) {
    return <div className="text-center py-8">Loading real-time metrics...</div>
  }

  // Aggregate sensor data by type
  const sensorsByType = sensorData.reduce((acc, sensor) => {
    if (!acc[sensor.sensor_type]) {
      acc[sensor.sensor_type] = []
    }
    acc[sensor.sensor_type].push(sensor)
    return acc
  }, {} as Record<string, typeof sensorData>)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-500'
      case 'warning': return 'bg-yellow-500'
      case 'critical': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'critical': return <XCircle className="h-4 w-4 text-red-500" />
      default: return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getSensorIcon = (type: string) => {
    switch (type) {
      case 'temperature': return <Thermometer className="h-4 w-4" />
      case 'pressure': return <Gauge className="h-4 w-4" />
      case 'flow_rate': return <Droplets className="h-4 w-4" />
      case 'vibration': return <Activity className="h-4 w-4" />
      case 'efficiency': return <Zap className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  // Calculate system health
  const totalSensors = sensorData.length
  const normalSensors = sensorData.filter(s => s.status === 'normal').length
  const warningSensors = sensorData.filter(s => s.status === 'warning').length
  const criticalSensors = sensorData.filter(s => s.status === 'critical').length
  const systemHealth = (normalSensors / totalSensors) * 100

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">System Health</p>
                <div className="text-2xl font-bold">{systemHealth.toFixed(1)}%</div>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
            <Progress value={systemHealth} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Normal</p>
                <div className="text-2xl font-bold text-green-600">{normalSensors}</div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Warnings</p>
                <div className="text-2xl font-bold text-yellow-600">{warningSensors}</div>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical</p>
                <div className="text-2xl font-bold text-red-600">{criticalSensors}</div>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sensor Readings by Type */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {Object.entries(sensorsByType).map(([type, sensors]) => {
          const avgValue = sensors.reduce((sum, s) => sum + s.value, 0) / sensors.length
          const criticalCount = sensors.filter(s => s.status === 'critical').length
          const warningCount = sensors.filter(s => s.status === 'warning').length
          
          return (
            <Card key={type}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  {getSensorIcon(type)}
                  {type.replace('_', ' ').toUpperCase()}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Average</span>
                  <span className="font-semibold">
                    {avgValue.toFixed(1)} {sensors[0]?.unit}
                  </span>
                </div>
                
                <div className="space-y-2">
                  {sensors.slice(0, 3).map((sensor, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(sensor.status)}
                        <span className="truncate">{sensor.station_id}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{sensor.value} {sensor.unit}</span>
                        <Badge variant={sensor.status === 'normal' ? 'default' : 'destructive'} className="text-xs">
                          {sensor.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                
                {criticalCount > 0 && (
                  <div className="text-xs text-red-600 font-medium">
                    {criticalCount} sensor(s) critical
                  </div>
                )}
                {warningCount > 0 && criticalCount === 0 && (
                  <div className="text-xs text-yellow-600 font-medium">
                    {warningCount} sensor(s) warning
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Process Stations Status */}
      <Card>
        <CardHeader>
          <CardTitle>Process Stations Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {processStations.map((station) => (
              <div key={station.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{station.name}</h4>
                  <Badge variant={station.status === 'active' ? 'default' : 'destructive'}>
                    {station.status}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Efficiency</span>
                    <span className="font-medium">{station.efficiency_percentage}%</span>
                  </div>
                  <Progress value={station.efficiency_percentage} className="h-2" />
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Capacity: {station.capacity_tons_per_hour} tons/hr
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}