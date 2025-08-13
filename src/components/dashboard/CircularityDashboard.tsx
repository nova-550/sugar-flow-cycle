import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  RefreshCw, 
  Leaf, 
  Factory, 
  Zap, 
  Droplets,
  TrendingUp,
  ArrowRight,
  Recycle
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const circularityData = [
  { month: 'Jan', wasteReduction: 85, energyRecovery: 78, waterReuse: 92 },
  { month: 'Feb', wasteReduction: 88, energyRecovery: 82, waterReuse: 94 },
  { month: 'Mar', wasteReduction: 91, energyRecovery: 85, waterReuse: 96 },
  { month: 'Apr', wasteReduction: 94, energyRecovery: 89, waterReuse: 97 },
  { month: 'May', wasteReduction: 96, energyRecovery: 92, waterReuse: 98 },
  { month: 'Jun', wasteReduction: 97, energyRecovery: 95, waterReuse: 99 }
];

const wasteStreams = [
  { name: 'Bagasse', value: 45, color: '#10b981' },
  { name: 'Molasses', value: 30, color: '#3b82f6' },
  { name: 'Press Mud', value: 15, color: '#f59e0b' },
  { name: 'Filter Cake', value: 10, color: '#8b5cf6' }
];

const energyMix = [
  { source: 'Bagasse Bioenergy', percentage: 65, renewable: true },
  { source: 'Biogas', percentage: 11, renewable: true },
  { source: 'Solar', percentage: 8, renewable: true },
  { source: 'Grid (Renewable)', percentage: 12, renewable: true },
  { source: 'Natural Gas', percentage: 4, renewable: false }
];

const circularityFlows = [
  {
    from: "Sugar Cane",
    to: "Primary Processing",
    material: "Fresh Cane",
    volume: "1,250 tons/day",
    efficiency: 98
  },
  {
    from: "Primary Processing", 
    to: "Bagasse Power Plant",
    material: "Bagasse",
    volume: "375 tons/day",
    efficiency: 95
  },
  {
    from: "Sugar Production",
    to: "Ethanol Plant", 
    material: "Molasses",
    volume: "125 tons/day",
    efficiency: 88
  },
  {
    from: "Processing",
    to: "Fertilizer Production",
    material: "Press Mud",
    volume: "95 tons/day", 
    efficiency: 76
  }
];

export function CircularityDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-circular">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Circular Economy Dashboard</h2>
              <p className="text-white/90">Transforming waste into value across the production cycle</p>
            </div>
            <div className="bg-white/20 rounded-full p-4">
              <RefreshCw className="h-8 w-8 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Waste Diversion</p>
                <p className="text-3xl font-bold text-success">97.2%</p>
                <p className="text-sm text-success flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +2.1% vs target
                </p>
              </div>
              <Recycle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Energy Recovery</p>
                <p className="text-3xl font-bold text-energy-primary">95.1%</p>
                <p className="text-sm text-success flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +1.8% this month
                </p>
              </div>
              <Zap className="h-8 w-8 text-energy-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Water Recycling</p>
                <p className="text-3xl font-bold text-secondary">98.7%</p>
                <p className="text-sm text-success flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Leading industry
                </p>
              </div>
              <Droplets className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Carbon Neutral</p>
                <p className="text-3xl font-bold text-success">89.4%</p>
                <p className="text-sm text-success flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +5.2% YoY
                </p>
              </div>
              <Leaf className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Circularity Flow Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-circular-primary" />
            Material Flow & Circularity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {circularityFlows.map((flow, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <Factory className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{flow.from}</p>
                    <p className="text-sm text-muted-foreground">{flow.material}</p>
                  </div>
                </div>
                
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
                
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium">{flow.to}</p>
                    <p className="text-sm text-muted-foreground">{flow.volume}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Efficiency</p>
                    <Badge variant={flow.efficiency > 90 ? "default" : "secondary"}>
                      {flow.efficiency}%
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Waste Stream Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Waste Stream Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={wasteStreams}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {wasteStreams.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Energy Mix */}
        <Card>
          <CardHeader>
            <CardTitle>Renewable Energy Mix</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={energyMix}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="percentage" 
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Circularity Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Circularity Performance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={circularityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="wasteReduction" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Waste Reduction %"
              />
              <Line 
                type="monotone" 
                dataKey="energyRecovery" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Energy Recovery %"
              />
              <Line 
                type="monotone" 
                dataKey="waterReuse" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                name="Water Reuse %"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}