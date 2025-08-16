import { useState, useEffect } from 'react'
import { supabase, type SensorData, type ProcessStation, type ProductionData } from '@/lib/supabase'

// Mock data generators for realistic simulation
const generateMockSensorData = (): SensorData[] => {
  const stations = ['crushing-1', 'crushing-2', 'extraction-1', 'clarification-1', 'evaporation-1', 'crystallization-1']
  const sensorTypes: Array<'temperature' | 'pressure' | 'flow_rate' | 'vibration' | 'efficiency'> = 
    ['temperature', 'pressure', 'flow_rate', 'vibration', 'efficiency']
  
  const data: SensorData[] = []
  
  stations.forEach(stationId => {
    sensorTypes.forEach(sensorType => {
      let value: number
      let unit: string
      let status: 'normal' | 'warning' | 'critical' = 'normal'
      
      switch (sensorType) {
        case 'temperature':
          value = 85 + Math.random() * 30 // 85-115°C
          unit = '°C'
          if (value > 110) status = 'warning'
          if (value > 115) status = 'critical'
          break
        case 'pressure':
          value = 2.5 + Math.random() * 1.5 // 2.5-4.0 bar
          unit = 'bar'
          if (value > 3.8) status = 'warning'
          if (value > 4.0) status = 'critical'
          break
        case 'flow_rate':
          value = 120 + Math.random() * 40 // 120-160 L/min
          unit = 'L/min'
          if (value < 130) status = 'warning'
          if (value < 125) status = 'critical'
          break
        case 'vibration':
          value = Math.random() * 10 // 0-10 mm/s
          unit = 'mm/s'
          if (value > 7) status = 'warning'
          if (value > 8.5) status = 'critical'
          break
        case 'efficiency':
          value = 85 + Math.random() * 12 // 85-97%
          unit = '%'
          if (value < 88) status = 'warning'
          if (value < 85) status = 'critical'
          break
        default:
          value = 0
          unit = ''
      }
      
      data.push({
        id: `${stationId}-${sensorType}-${Date.now()}`,
        station_id: stationId,
        sensor_type: sensorType,
        value: Math.round(value * 100) / 100,
        unit,
        timestamp: new Date().toISOString(),
        status,
        created_at: new Date().toISOString()
      })
    })
  })
  
  return data
}

const generateMockProcessStations = (): ProcessStation[] => {
  return [
    {
      id: 'crushing-1',
      name: 'Crushing Station 1',
      type: 'crushing',
      capacity_tons_per_hour: 120,
      efficiency_percentage: 87,
      status: 'active',
      position_x: -20,
      position_y: 0,
      position_z: -15,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'crushing-2',
      name: 'Crushing Station 2',
      type: 'crushing',
      capacity_tons_per_hour: 115,
      efficiency_percentage: 82,
      status: 'active',
      position_x: -20,
      position_y: 0,
      position_z: 15,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'extraction-1',
      name: 'Juice Extraction',
      type: 'extraction',
      capacity_tons_per_hour: 108,
      efficiency_percentage: 91,
      status: 'active',
      position_x: 0,
      position_y: 0,
      position_z: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'clarification-1',
      name: 'Clarification Unit',
      type: 'clarification',
      capacity_tons_per_hour: 95,
      efficiency_percentage: 94,
      status: 'active',
      position_x: 20,
      position_y: 0,
      position_z: -10,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'evaporation-1',
      name: 'Evaporation System',
      type: 'evaporation',
      capacity_tons_per_hour: 25,
      efficiency_percentage: 88,
      status: 'active',
      position_x: 40,
      position_y: 0,
      position_z: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'crystallization-1',
      name: 'Crystallization Plant',
      type: 'crystallization',
      capacity_tons_per_hour: 22,
      efficiency_percentage: 85,
      status: 'active',
      position_x: 60,
      position_y: 0,
      position_z: 10,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]
}

const generateMockProductionData = (): ProductionData => {
  const date = new Date().toISOString().split('T')[0]
  
  return {
    id: `prod-${Date.now()}`,
    date,
    raw_sugar_output: 180 + Math.random() * 40, // 180-220 tons/day
    bagasse_output: 520 + Math.random() * 80, // 520-600 tons/day
    molasses_output: 85 + Math.random() * 25, // 85-110 tons/day
    filter_cake_output: 15 + Math.random() * 8, // 15-23 tons/day
    energy_consumed: 2850 + Math.random() * 350, // 2850-3200 MWh/day
    water_used: 1200 + Math.random() * 200, // 1200-1400 m³/day
    overall_efficiency: 86 + Math.random() * 8, // 86-94%
    created_at: new Date().toISOString()
  }
}

export const useFactoryData = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>([])
  const [processStations, setProcessStations] = useState<ProcessStation[]>([])
  const [productionData, setProductionData] = useState<ProductionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize with mock data for demonstration
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true)
        
        // For now, use mock data. In production, this would fetch from Supabase
        const mockSensors = generateMockSensorData()
        const mockStations = generateMockProcessStations()
        const mockProduction = generateMockProductionData()
        
        setSensorData(mockSensors)
        setProcessStations(mockStations)
        setProductionData(mockProduction)
        
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    initializeData()

    // Simulate real-time updates every 5 seconds
    const interval = setInterval(() => {
      setSensorData(generateMockSensorData())
      setProductionData(generateMockProductionData())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getSensorDataByStation = (stationId: string) => {
    return sensorData.filter(sensor => sensor.station_id === stationId)
  }

  const getStationEfficiency = (stationId: string) => {
    const station = processStations.find(s => s.id === stationId)
    return station?.efficiency_percentage || 0
  }

  const getTotalCapacity = () => {
    return processStations.reduce((total, station) => total + station.capacity_tons_per_hour, 0)
  }

  const getAverageEfficiency = () => {
    const efficiencies = processStations.map(s => s.efficiency_percentage)
    return efficiencies.reduce((sum, eff) => sum + eff, 0) / efficiencies.length
  }

  return {
    sensorData,
    processStations,
    productionData,
    loading,
    error,
    getSensorDataByStation,
    getStationEfficiency,
    getTotalCapacity,
    getAverageEfficiency
  }
}