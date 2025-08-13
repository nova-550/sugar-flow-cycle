import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Sprout, 
  Truck, 
  Factory, 
  Package, 
  Zap, 
  Droplets,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Leaf
} from "lucide-react";
import sugarMillHero from "@/assets/sugar-mill-hero.jpg";

interface ValueChainStage {
  id: string;
  title: string;
  icon: any;
  status: "optimal" | "warning" | "good";
  efficiency: number;
  description: string;
  metrics: { label: string; value: string; trend?: "up" | "down" }[];
}

const valueChainStages: ValueChainStage[] = [
  {
    id: "farming",
    title: "Precision Agriculture",
    icon: Sprout,
    status: "good",
    efficiency: 87,
    description: "Smart farming with IoT sensors and AI optimization",
    metrics: [
      { label: "Yield per Hectare", value: "78.5 tons", trend: "up" },
      { label: "Water Usage", value: "-12%", trend: "up" },
      { label: "Fertilizer Efficiency", value: "94%", trend: "up" }
    ]
  },
  {
    id: "transport",
    title: "Smart Logistics",
    icon: Truck,
    status: "optimal",
    efficiency: 95,
    description: "Optimized route planning and carbon-efficient transport",
    metrics: [
      { label: "Delivery Time", value: "4.2 hrs", trend: "up" },
      { label: "Fuel Efficiency", value: "+15%", trend: "up" },
      { label: "Load Optimization", value: "98%", trend: "up" }
    ]
  },
  {
    id: "milling",
    title: "AI-Enhanced Milling",
    icon: Factory,
    status: "warning",
    efficiency: 82,
    description: "Intelligent processing with quality control and waste minimization",
    metrics: [
      { label: "Sugar Recovery", value: "89.2%", trend: "down" },
      { label: "Energy Usage", value: "-8%", trend: "up" },
      { label: "Quality Score", value: "96.5/100", trend: "up" }
    ]
  },
  {
    id: "packaging",
    title: "Eco-Packaging",
    icon: Package,
    status: "good",
    efficiency: 91,
    description: "Sustainable packaging with lifecycle optimization",
    metrics: [
      { label: "Recycled Content", value: "75%", trend: "up" },
      { label: "Packaging Waste", value: "-22%", trend: "up" },
      { label: "Shelf Life", value: "18 months", trend: "up" }
    ]
  }
];

const byProducts = [
  { name: "Bagasse", utilization: 95, purpose: "Bioenergy & Paper", value: "$2.1M" },
  { name: "Molasses", utilization: 88, purpose: "Ethanol & Feed", value: "$1.8M" },
  { name: "Press Mud", utilization: 76, purpose: "Fertilizer", value: "$0.9M" }
];

export function ValueChainOverview() {
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    overallEfficiency: 89.2,
    carbonSavings: 34,
    wasteDiverted: 97,
    waterSaved: 2.4,
    co2Reduced: 847,
    renewableEnergy: 76
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics(prev => ({
        overallEfficiency: Math.max(85, Math.min(95, prev.overallEfficiency + (Math.random() - 0.5) * 1.5)),
        carbonSavings: Math.max(30, Math.min(40, prev.carbonSavings + (Math.random() - 0.5) * 2)),
        wasteDiverted: Math.max(95, Math.min(99, prev.wasteDiverted + (Math.random() - 0.5) * 1)),
        waterSaved: Math.max(2.0, Math.min(3.0, prev.waterSaved + (Math.random() - 0.5) * 0.2)),
        co2Reduced: Math.max(800, Math.min(900, prev.co2Reduced + (Math.random() - 0.5) * 20)),
        renewableEnergy: Math.max(70, Math.min(85, prev.renewableEnergy + (Math.random() - 0.5) * 3))
      }));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="relative overflow-hidden bg-gradient-sustainability">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${sugarMillHero})` }}
        />
        <CardContent className="relative p-8 text-white">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Sugar Industry Digital Twin</h2>
            <p className="text-lg mb-6 opacity-90">
              Real-time monitoring and AI optimization of the complete sugar production value chain
              with integrated circularity and sustainability metrics.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/20 rounded-lg px-4 py-2 animate-pulse">
                <div className="text-sm font-medium">Overall Efficiency</div>
                <div className="text-2xl font-bold">{realTimeMetrics.overallEfficiency.toFixed(1)}%</div>
              </div>
              <div className="bg-white/20 rounded-lg px-4 py-2 animate-pulse">
                <div className="text-sm font-medium">Carbon Savings</div>
                <div className="text-2xl font-bold">{Math.round(realTimeMetrics.carbonSavings)}%</div>
              </div>
              <div className="bg-white/20 rounded-lg px-4 py-2 animate-pulse">
                <div className="text-sm font-medium">Waste Diverted</div>
                <div className="text-2xl font-bold">{Math.round(realTimeMetrics.wasteDiverted)}%</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Value Chain Stages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {valueChainStages.map((stage) => {
          const Icon = stage.icon;
          const statusColors = {
            optimal: "bg-success text-success-foreground",
            good: "bg-primary text-primary-foreground", 
            warning: "bg-warning text-warning-foreground"
          };

          return (
            <Card key={stage.id} className="transition-all duration-300 hover:shadow-glow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Icon className="h-8 w-8 text-primary" />
                  <Badge className={statusColors[stage.status]}>
                    {stage.status === "optimal" && <CheckCircle className="h-3 w-3 mr-1" />}
                    {stage.status === "warning" && <AlertTriangle className="h-3 w-3 mr-1" />}
                    {stage.status === "good" && <TrendingUp className="h-3 w-3 mr-1" />}
                    {stage.status.toUpperCase()}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{stage.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{stage.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Efficiency</span>
                      <span className="font-medium">{stage.efficiency}%</span>
                    </div>
                    <Progress value={stage.efficiency} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    {stage.metrics.map((metric, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{metric.label}</span>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{metric.value}</span>
                          {metric.trend && (
                            <TrendingUp 
                              className={`h-3 w-3 ${
                                metric.trend === 'up' ? 'text-success' : 'text-destructive'
                              } ${metric.trend === 'down' ? 'rotate-180' : ''}`} 
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* By-Products Utilization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-energy-primary" />
            Circular Economy - By-Product Utilization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {byProducts.map((product, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{product.name}</h4>
                  <Badge variant="outline">{product.value}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{product.purpose}</p>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Utilization Rate</span>
                    <span className="font-medium">{product.utilization}%</span>
                  </div>
                  <Progress value={product.utilization} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/20 rounded-full">
                <Droplets className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Water Conservation</p>
                <p className="text-2xl font-bold animate-pulse">{realTimeMetrics.waterSaved.toFixed(1)}M L</p>
                <p className="text-sm text-success">+18% vs last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-success/10 to-success/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-success/20 rounded-full">
                <Leaf className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">CO₂ Reduction</p>
                <p className="text-2xl font-bold animate-pulse">{Math.round(realTimeMetrics.co2Reduced)} tons</p>
                <p className="text-sm text-success">+12% vs target</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-energy-primary/10 to-energy-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-energy-primary/20 rounded-full">
                <Zap className="h-6 w-6 text-energy-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Renewable Energy</p>
                <p className="text-2xl font-bold animate-pulse">{Math.round(realTimeMetrics.renewableEnergy)}%</p>
                <p className="text-sm text-success">+8% vs last week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}