export interface Database {
  public: {
    Tables: {
      sensor_data: {
        Row: {
          id: string
          station_id: string
          sensor_type: 'temperature' | 'pressure' | 'flow_rate' | 'vibration' | 'efficiency'
          value: number
          unit: string
          timestamp: string
          status: 'normal' | 'warning' | 'critical'
          created_at: string
        }
        Insert: {
          id?: string
          station_id: string
          sensor_type: 'temperature' | 'pressure' | 'flow_rate' | 'vibration' | 'efficiency'
          value: number
          unit: string
          timestamp?: string
          status: 'normal' | 'warning' | 'critical'
          created_at?: string
        }
        Update: {
          id?: string
          station_id?: string
          sensor_type?: 'temperature' | 'pressure' | 'flow_rate' | 'vibration' | 'efficiency'
          value?: number
          unit?: string
          timestamp?: string
          status?: 'normal' | 'warning' | 'critical'
          created_at?: string
        }
      }
      process_stations: {
        Row: {
          id: string
          name: string
          type: 'crushing' | 'extraction' | 'clarification' | 'evaporation' | 'crystallization' | 'centrifugation'
          capacity_tons_per_hour: number
          efficiency_percentage: number
          status: 'active' | 'maintenance' | 'offline'
          position_x: number
          position_y: number
          position_z: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type: 'crushing' | 'extraction' | 'clarification' | 'evaporation' | 'crystallization' | 'centrifugation'
          capacity_tons_per_hour: number
          efficiency_percentage: number
          status: 'active' | 'maintenance' | 'offline'
          position_x: number
          position_y: number
          position_z: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: 'crushing' | 'extraction' | 'clarification' | 'evaporation' | 'crystallization' | 'centrifugation'
          capacity_tons_per_hour?: number
          efficiency_percentage?: number
          status?: 'active' | 'maintenance' | 'offline'
          position_x?: number
          position_y?: number
          position_z?: number
          created_at?: string
          updated_at?: string
        }
      }
      production_data: {
        Row: {
          id: string
          date: string
          raw_sugar_output: number
          bagasse_output: number
          molasses_output: number
          filter_cake_output: number
          energy_consumed: number
          water_used: number
          overall_efficiency: number
          created_at: string
        }
        Insert: {
          id?: string
          date: string
          raw_sugar_output: number
          bagasse_output: number
          molasses_output: number
          filter_cake_output: number
          energy_consumed: number
          water_used: number
          overall_efficiency: number
          created_at?: string
        }
        Update: {
          id?: string
          date?: string
          raw_sugar_output?: number
          bagasse_output?: number
          molasses_output?: number
          filter_cake_output?: number
          energy_consumed?: number
          water_used?: number
          overall_efficiency?: number
          created_at?: string
        }
      }
      maintenance_schedules: {
        Row: {
          id: string
          station_id: string
          maintenance_type: 'preventive' | 'corrective' | 'emergency'
          scheduled_date: string
          completed_date: string | null
          description: string
          status: 'scheduled' | 'in_progress' | 'completed' | 'overdue'
          priority: 'low' | 'medium' | 'high' | 'critical'
          estimated_duration: number
          actual_duration: number | null
          created_at: string
        }
        Insert: {
          id?: string
          station_id: string
          maintenance_type: 'preventive' | 'corrective' | 'emergency'
          scheduled_date: string
          completed_date?: string | null
          description: string
          status: 'scheduled' | 'in_progress' | 'completed' | 'overdue'
          priority: 'low' | 'medium' | 'high' | 'critical'
          estimated_duration: number
          actual_duration?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          station_id?: string
          maintenance_type?: 'preventive' | 'corrective' | 'emergency'
          scheduled_date?: string
          completed_date?: string | null
          description?: string
          status?: 'scheduled' | 'in_progress' | 'completed' | 'overdue'
          priority?: 'low' | 'medium' | 'high' | 'critical'
          estimated_duration?: number
          actual_duration?: number | null
          created_at?: string
        }
      }
      quality_metrics: {
        Row: {
          id: string
          date: string
          sugar_purity: number
          moisture_content: number
          ash_content: number
          color_icumsa: number
          pol_percentage: number
          brix_level: number
          ph_level: number
          batch_id: string
          created_at: string
        }
        Insert: {
          id?: string
          date: string
          sugar_purity: number
          moisture_content: number
          ash_content: number
          color_icumsa: number
          pol_percentage: number
          brix_level: number
          ph_level: number
          batch_id: string
          created_at?: string
        }
        Update: {
          id?: string
          date?: string
          sugar_purity?: number
          moisture_content?: number
          ash_content?: number
          color_icumsa?: number
          pol_percentage?: number
          brix_level?: number
          ph_level?: number
          batch_id?: string
          created_at?: string
        }
      }
    }
  }
}