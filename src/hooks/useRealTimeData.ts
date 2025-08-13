import { useState, useEffect } from 'react';

export interface RealTimeMetrics {
  [key: string]: number;
}

export function useRealTimeData(
  initialData: RealTimeMetrics,
  updateInterval: number = 2000,
  variationRange: number = 2
) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData: RealTimeMetrics = {};
        
        Object.keys(prev).forEach(key => {
          const currentValue = prev[key];
          const variation = (Math.random() - 0.5) * variationRange;
          
          // Apply constraints based on key patterns
          let min = 0;
          let max = 100;
          
          if (key.includes('efficiency') || key.includes('percentage')) {
            min = Math.max(80, currentValue - 10);
            max = Math.min(100, currentValue + 10);
          } else if (key.includes('score')) {
            min = Math.max(85, currentValue - 5);
            max = Math.min(100, currentValue + 5);
          } else if (key.includes('volume') || key.includes('amount')) {
            min = Math.max(currentValue * 0.9, currentValue - 50);
            max = Math.min(currentValue * 1.1, currentValue + 50);
          }
          
          newData[key] = Math.max(min, Math.min(max, currentValue + variation));
        });
        
        return newData;
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval, variationRange]);

  return data;
}

export function useSimulatedSensorData() {
  const [sensorData, setSensorData] = useState({
    temperature: 85,
    pressure: 2.4,
    vibration: 0.3,
    efficiency: 92,
    throughput: 145,
    quality: 98.5
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        temperature: Math.max(80, Math.min(95, prev.temperature + (Math.random() - 0.5) * 3)),
        pressure: Math.max(2.0, Math.min(3.0, prev.pressure + (Math.random() - 0.5) * 0.2)),
        vibration: Math.max(0.1, Math.min(0.8, prev.vibration + (Math.random() - 0.5) * 0.1)),
        efficiency: Math.max(85, Math.min(98, prev.efficiency + (Math.random() - 0.5) * 2)),
        throughput: Math.max(120, Math.min(180, prev.throughput + (Math.random() - 0.5) * 8)),
        quality: Math.max(95, Math.min(99.5, prev.quality + (Math.random() - 0.5) * 1))
      }));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return sensorData;
}