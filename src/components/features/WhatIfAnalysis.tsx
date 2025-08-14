import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Settings, 
  TrendingUp, 
  Droplets, 
  Zap, 
  Leaf, 
  DollarSign,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

interface ScenarioParameters {
  waterUsage: number;
  energyMix: number;
  wasteRecycling: number;
  processingSpeed: number;
  qualityThreshold: number;
}

interface ScenarioResults {
  efficiency: number;
  carbonFootprint: number;
  waterSavings: number;
  energyCost: number;
  wasteReduction: number;
  profitability: number;
  riskLevel: "low" | "medium" | "high";
  recommendations: string[];
}

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export function WhatIfAnalysis() {
  const [parameters, setParameters] = useState<ScenarioParameters>({
    waterUsage: 75,
    energyMix: 60,
    wasteRecycling: 85,
    processingSpeed: 80,
    qualityThreshold: 90
  });

  const [results, setResults] = useState<ScenarioResults>({
    efficiency: 87,
    carbonFootprint: 34,
    waterSavings: 2.4,
    energyCost: 280000,
    wasteReduction: 67,
    profitability: 78,
    riskLevel: "low",
    recommendations: []
  });

  const [scenarios, setScenarios] = useState([
    { name: "Current", efficiency: 87, cost: 280000, carbon: 34 },
    { name: "Optimized", efficiency: 92, cost: 260000, carbon: 28 },
    { name: "Aggressive", efficiency: 95, cost: 240000, carbon: 22 }
  ]);

  // Calculate results based on parameters
  useEffect(() => {
    const calculateResults = () => {
      const efficiency = Math.round(
        (parameters.waterUsage * 0.2 + 
         parameters.energyMix * 0.3 + 
         parameters.wasteRecycling * 0.3 + 
         parameters.processingSpeed * 0.1 + 
         parameters.qualityThreshold * 0.1) * 1.1
      );

      const carbonFootprint = Math.round(
        50 - (parameters.energyMix * 0.3 + parameters.wasteRecycling * 0.2)
      );

      const waterSavings = (parameters.waterUsage / 100) * 3.5;
      
      const energyCost = Math.round(
        350000 - (parameters.energyMix * 1000 + parameters.wasteRecycling * 800)
      );

      const wasteReduction = Math.round(parameters.wasteRecycling * 0.8);
      
      const profitability = Math.round(
        (efficiency * 0.4 + (100 - carbonFootprint) * 0.3 + wasteReduction * 0.3) * 0.9
      );

      let riskLevel: "low" | "medium" | "high" = "low";
      const recommendations: string[] = [];

      if (parameters.processingSpeed > 90) {
        riskLevel = "high";
        recommendations.push("High processing speed increases equipment wear");
      }
      
      if (parameters.waterUsage < 60) {
        riskLevel = riskLevel === "high" ? "high" : "medium";
        recommendations.push("Very low water usage may affect juice extraction quality");
      }

      if (parameters.qualityThreshold < 85) {
        recommendations.push("Consider increasing quality threshold to maintain product standards");
      }

      if (parameters.energyMix > 80) {
        recommendations.push("Excellent renewable energy mix! Consider expanding solar capacity");
      }

      if (parameters.wasteRecycling > 90) {
        recommendations.push("Outstanding waste recycling rate! Share best practices");
      }

      setResults({
        efficiency,
        carbonFootprint,
        waterSavings,
        energyCost,
        wasteReduction,
        profitability,
        riskLevel,
        recommendations
      });
    };

    calculateResults();
  }, [parameters]);

  const updateParameter = (key: keyof ScenarioParameters, value: number[]) => {
    setParameters(prev => ({ ...prev, [key]: value[0] }));
  };

  const resetToDefaults = () => {
    setParameters({
      waterUsage: 75,
      energyMix: 60,
      wasteRecycling: 85,
      processingSpeed: 80,
      qualityThreshold: 90
    });
  };

  const saveScenario = () => {
    const newScenario = {
      name: `Scenario ${scenarios.length + 1}`,
      efficiency: results.efficiency,
      cost: results.energyCost,
      carbon: results.carbonFootprint
    };
    setScenarios([...scenarios, newScenario]);
  };

  const impactData = [
    { name: 'Efficiency', value: results.efficiency, target: 90 },
    { name: 'Carbon Reduction', value: 100 - results.carbonFootprint, target: 75 },
    { name: 'Waste Recycling', value: results.wasteReduction, target: 85 },
    { name: 'Profitability', value: results.profitability, target: 80 }
  ];

  const pieData = [
    { name: 'Renewable Energy', value: parameters.energyMix },
    { name: 'Traditional Energy', value: 100 - parameters.energyMix }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            What-If Analysis - Scenario Modeling
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="parameters" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="parameters">Parameters</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
              <TabsTrigger value="recommendations">Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="parameters" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-blue-500" />
                        Water Usage Efficiency
                      </label>
                      <span className="text-sm text-muted-foreground">{parameters.waterUsage}%</span>
                    </div>
                    <Slider
                      value={[parameters.waterUsage]}
                      onValueChange={(value) => updateParameter('waterUsage', value)}
                      max={100}
                      min={40}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        Renewable Energy Mix
                      </label>
                      <span className="text-sm text-muted-foreground">{parameters.energyMix}%</span>
                    </div>
                    <Slider
                      value={[parameters.energyMix]}
                      onValueChange={(value) => updateParameter('energyMix', value)}
                      max={100}
                      min={20}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Leaf className="h-4 w-4 text-green-500" />
                        Waste Recycling Rate
                      </label>
                      <span className="text-sm text-muted-foreground">{parameters.wasteRecycling}%</span>
                    </div>
                    <Slider
                      value={[parameters.wasteRecycling]}
                      onValueChange={(value) => updateParameter('wasteRecycling', value)}
                      max={100}
                      min={50}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-purple-500" />
                        Processing Speed
                      </label>
                      <span className="text-sm text-muted-foreground">{parameters.processingSpeed}%</span>
                    </div>
                    <Slider
                      value={[parameters.processingSpeed]}
                      onValueChange={(value) => updateParameter('processingSpeed', value)}
                      max={100}
                      min={60}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                        Quality Threshold
                      </label>
                      <span className="text-sm text-muted-foreground">{parameters.qualityThreshold}%</span>
                    </div>
                    <Slider
                      value={[parameters.qualityThreshold]}
                      onValueChange={(value) => updateParameter('qualityThreshold', value)}
                      max={100}
                      min={70}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button onClick={resetToDefaults} variant="outline" className="flex-1">
                      Reset to Defaults
                    </Button>
                    <Button onClick={saveScenario} className="flex-1">
                      Save Scenario
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="results" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${results.riskLevel === 'low' ? 'bg-green-100' : results.riskLevel === 'medium' ? 'bg-yellow-100' : 'bg-red-100'}`}>
                        {results.riskLevel === 'low' ? (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-6 w-6 text-yellow-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Overall Efficiency</p>
                        <p className="text-2xl font-bold">{results.efficiency}%</p>
                        <Badge variant={results.riskLevel === 'low' ? 'default' : 'destructive'}>
                          {results.riskLevel} risk
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <DollarSign className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Annual Energy Cost</p>
                        <p className="text-2xl font-bold">${(results.energyCost / 1000).toFixed(0)}K</p>
                        <p className="text-sm text-green-600">-${((350000 - results.energyCost) / 1000).toFixed(0)}K savings</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-green-100 rounded-full">
                        <Leaf className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Carbon Footprint</p>
                        <p className="text-2xl font-bold">{results.carbonFootprint} tons CO₂</p>
                        <p className="text-sm text-green-600">{100 - results.carbonFootprint}% reduction</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Impact Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={impactData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#22c55e" />
                        <Bar dataKey="target" fill="#e5e7eb" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Energy Mix Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="comparison" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Scenario Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={scenarios}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Line yAxisId="left" type="monotone" dataKey="efficiency" stroke="#22c55e" strokeWidth={2} />
                      <Line yAxisId="right" type="monotone" dataKey="cost" stroke="#ef4444" strokeWidth={2} />
                      <Line yAxisId="left" type="monotone" dataKey="carbon" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="recommendations" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {results.recommendations.length > 0 ? (
                      results.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <p className="text-sm">{rec}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">All parameters are within optimal ranges!</p>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Key Performance Indicators</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Water Savings</span>
                        <span>{results.waterSavings.toFixed(1)}M Liters</span>
                      </div>
                      <Progress value={(results.waterSavings / 3.5) * 100} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Waste Reduction</span>
                        <span>{results.wasteReduction}%</span>
                      </div>
                      <Progress value={results.wasteReduction} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Profitability Index</span>
                        <span>{results.profitability}%</span>
                      </div>
                      <Progress value={results.profitability} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}