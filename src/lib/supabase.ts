import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export type SensorData = Database['public']['Tables']['sensor_data']['Row']
export type ProcessStation = Database['public']['Tables']['process_stations']['Row']
export type ProductionData = Database['public']['Tables']['production_data']['Row']
export type MaintenanceSchedule = Database['public']['Tables']['maintenance_schedules']['Row']
export type QualityMetric = Database['public']['Tables']['quality_metrics']['Row']