import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Leaf, 
  Zap, 
  Droplets, 
  Target,
  Calendar,
  Download
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { Button } from "@/components/ui/button";

const sustainabilityMetrics = [
  { month: 'Jan', carbon: 245, water: 1200, waste: 15, energy: 78 },
  { month: 'Feb', carbon: 238, water: 1150, waste: 12, energy: 82 },
  { month: 'Mar', carbon: 225, water: 1100, waste: 10, energy: 85 },
  { month: 'Apr', carbon: 218, water: 1050, waste: 8, energy: 88 },
  { month: 'May', carbon: 202, water: 980, waste: 6, energy: 91 },
  { month: 'Jun', carbon: 195, water: 920, waste: 5, energy: 94 }
];

const operationalData = [
  { time: '6AM', throughput: 85, quality: 94, efficiency: 88 },
  { time: '9AM', throughput: 92, quality: 96, efficiency: 91 },
  { time: '12PM', throughput: 98, quality: 95, efficiency: 94 },
  { time: '3PM', throughput: 95, quality: 97, efficiency: 96 },
  { time: '6PM', throughput: 88, quality: 94, efficiency: 89 },
  { time: '9PM', throughput: 82, quality: 93, efficiency: 86 }
];

const benchmarkData = [
  { metric: 'Energy Efficiency', ourValue: 94, industry: 78, benchmark: 85 },
  { metric: 'Water Usage', ourValue: 88, industry: 65, benchmark: 75 },
  { metric: 'Waste Reduction', ourValue: 97, industry: 72, benchmark: 80 },
  { metric: 'Carbon Footprint', ourValue: 85, industry: 58, benchmark: 70 },
  { metric: 'Process Efficiency', ourValue: 92, industry: 75, benchmark: 82 },
  { metric: 'Quality Score', ourValue: 96, industry: 83, benchmark: 88 }
];

const complianceData = [
  { category: 'Environmental', score: 96, status: 'Excellent', trend: 'up' },
  { category: 'Safety', score: 94, status: 'Excellent', trend: 'up' },
  { category: 'Quality', score: 98, status: 'Outstanding', trend: 'stable' },
  { category: 'Sustainability', score: 92, status: 'Excellent', trend: 'up' },
  { category: 'Worker Health', score: 89, status: 'Good', trend: 'up' }
];

const kpiCards = [
  {
    title: "Overall Equipment Effectiveness",
    value: "94.2%",
    change: "+2.3%",
    trend: "up",
    icon: Target,
    color: "primary"
  },
  {
    title: "Carbon Intensity",
    value: "195 kg CO₂/ton",
    change: "-12.4%",
    trend: "up",
    icon: Leaf,
    color: "success"
  },
  {
    title: "Water Efficiency",
    value: "920 L/ton sugar",
    change: "-18.2%",
    trend: "up",
    icon: Droplets,
    color: "secondary"
  },
  {
    title: "Renewable Energy",
    value: "94.1%",
    change: "+5.7%",
    trend: "up",
    icon: Zap,
    color: "energy-primary"
  }
];

export function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-primary">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Advanced Analytics</h2>
              <p className="text-white/90">Comprehensive performance metrics and benchmarking</p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" size="sm" className="text-white bg-white/20 hover:bg-white/30">
                <Calendar className="h-4 w-4 mr-2" />
                Custom Range
              </Button>
              <Button variant="secondary" size="sm" className="text-white bg-white/20 hover:bg-white/30">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{kpi.title}</p>
                    <p className="text-2xl font-bold">{kpi.value}</p>
                    <p className={`text-sm flex items-center gap-1 ${
                      kpi.trend === 'up' ? 'text-success' : 'text-destructive'
                    }`}>
                      <TrendingUp className={`h-3 w-3 ${kpi.trend === 'down' ? 'rotate-180' : ''}`} />
                      {kpi.change} vs last month
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 text-${kpi.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="sustainability" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
          <TabsTrigger value="operational">Operational</TabsTrigger>
          <TabsTrigger value="benchmarking">Benchmarking</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="sustainability" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Carbon Footprint Reduction</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={sustainabilityMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="carbon" 
                      stroke="#10b981" 
                      fill="#10b981"
                      fillOpacity={0.3}
                      name="kg CO₂ per ton"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Efficiency Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={sustainabilityMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="water" stroke="#3b82f6" name="Water (L/ton)" />
                    <Line type="monotone" dataKey="energy" stroke="#f59e0b" name="Renewable %" />
                    <Line type="monotone" dataKey="waste" stroke="#ef4444" name="Waste %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="operational" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Operations Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={operationalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="throughput" fill="#3b82f6" name="Throughput %" />
                    <Bar dataKey="quality" fill="#10b981" name="Quality Score" />
                    <Bar dataKey="efficiency" fill="#f59e0b" name="Efficiency %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Production Efficiency Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={operationalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="efficiency" 
                      stroke="#8b5cf6" 
                      strokeWidth={3}
                      name="Overall Efficiency %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="benchmarking" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Industry Benchmarking</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={benchmarkData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Our Performance"
                    dataKey="ourValue"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="Industry Average"
                    dataKey="industry"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.1}
                  />
                  <Radar
                    name="Best Practice"
                    dataKey="benchmark"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.1}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceData.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">{item.category}</h3>
                    <Badge variant={item.score >= 95 ? 'default' : item.score >= 85 ? 'secondary' : 'destructive'}>
                      {item.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Score</span>
                      <span className="font-bold text-2xl">{item.score}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-success">
                      <TrendingUp className={`h-3 w-3 ${item.trend === 'down' ? 'rotate-180 text-destructive' : ''}`} />
                      <span className={item.trend === 'down' ? 'text-destructive' : ''}>
                        {item.trend === 'stable' ? 'Stable' : 'Improving'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}