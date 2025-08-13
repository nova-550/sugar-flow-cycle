import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Target, 
  Lightbulb,
  Zap,
  Droplets,
  Leaf,
  Clock
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const aiRecommendations = [
  {
    id: 1,
    title: "Optimize Bagasse Combustion Temperature",
    description: "AI models predict 12% energy efficiency gain by adjusting boiler temperature to 485°C during peak hours.",
    priority: "high",
    impact: "12% energy efficiency increase",
    confidence: 94,
    category: "energy",
    timeToImplement: "2 hours",
    savingsPotential: "$15,600/month"
  },
  {
    id: 2,
    title: "Adjust Irrigation Schedule",
    description: "Weather patterns and soil moisture data suggest optimizing irrigation timing to reduce water usage by 18%.",
    priority: "medium",
    impact: "18% water reduction",
    confidence: 87,
    category: "agriculture",
    timeToImplement: "1 day",
    savingsPotential: "$8,200/month"
  },
  {
    id: 3,
    title: "Predictive Maintenance Alert",
    description: "Mill bearing #3 showing early wear patterns. Schedule maintenance in next 72 hours to prevent breakdown.",
    priority: "high",
    impact: "Prevent 6-day downtime",
    confidence: 96,
    category: "maintenance",
    timeToImplement: "24 hours",
    savingsPotential: "$45,000 avoided loss"
  },
  {
    id: 4,
    title: "Molasses Fermentation Optimization",
    description: "Adjust yeast concentration and temperature for 8% increase in ethanol yield based on current batch analysis.",
    priority: "medium",
    impact: "8% ethanol yield increase",
    confidence: 91,
    category: "production",
    timeToImplement: "4 hours",
    savingsPotential: "$6,800/month"
  }
];

const predictiveData = [
  { time: '00:00', demand: 85, supply: 88, efficiency: 92 },
  { time: '04:00', demand: 72, supply: 75, efficiency: 89 },
  { time: '08:00', demand: 95, supply: 98, efficiency: 94 },
  { time: '12:00', demand: 105, supply: 108, efficiency: 96 },
  { time: '16:00', demand: 98, supply: 101, efficiency: 95 },
  { time: '20:00', demand: 88, supply: 91, efficiency: 93 }
];

const anomalyData = [
  { metric: 'Temperature Deviation', value: 2.3, threshold: 5.0, status: 'normal' },
  { metric: 'Pressure Variance', value: 4.8, threshold: 5.0, status: 'warning' },
  { metric: 'Flow Rate Change', value: 1.2, threshold: 3.0, status: 'normal' },
  { metric: 'Vibration Level', value: 3.1, threshold: 4.0, status: 'normal' },
  { metric: 'pH Level Shift', value: 0.8, threshold: 1.5, status: 'normal' }
];

const aiModels = [
  { name: 'Yield Predictor', accuracy: 94.2, status: 'active', lastUpdate: '2 mins ago' },
  { name: 'Quality Controller', accuracy: 97.8, status: 'active', lastUpdate: '5 mins ago' },
  { name: 'Energy Optimizer', accuracy: 91.5, status: 'active', lastUpdate: '1 min ago' },
  { name: 'Maintenance Predictor', accuracy: 89.7, status: 'training', lastUpdate: '15 mins ago' },
  { name: 'Weather Integrator', accuracy: 93.4, status: 'active', lastUpdate: '3 mins ago' }
];

export function AIInsights() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'energy': return Zap;
      case 'agriculture': return Leaf;
      case 'maintenance': return Target;
      case 'production': return Brain;
      default: return Lightbulb;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-tech">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">AI-Powered Insights</h2>
              <p className="text-white/90">Machine learning optimization and predictive analytics</p>
            </div>
            <div className="bg-white/20 rounded-full p-4">
              <Brain className="h-8 w-8 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Model Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-ai-primary" />
            AI Model Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiModels.map((model, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{model.name}</h4>
                  <Badge variant={model.status === 'active' ? 'default' : 'secondary'}>
                    {model.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Accuracy</span>
                    <span className="font-medium">{model.accuracy}%</span>
                  </div>
                  <Progress value={model.accuracy} className="h-2" />
                  <p className="text-xs text-muted-foreground">Updated {model.lastUpdate}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-warning" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiRecommendations.map((rec) => {
              const CategoryIcon = getCategoryIcon(rec.category);
              return (
                <div key={rec.id} className="p-4 border border-border rounded-lg hover:shadow-glow transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <CategoryIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{rec.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                      </div>
                    </div>
                    <Badge variant={getPriorityColor(rec.priority) as any}>
                      {rec.priority.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Impact</p>
                      <p className="text-sm font-medium">{rec.impact}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Confidence</p>
                      <p className="text-sm font-medium">{rec.confidence}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Time to Implement</p>
                      <p className="text-sm font-medium">{rec.timeToImplement}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Potential Savings</p>
                      <p className="text-sm font-medium text-success">{rec.savingsPotential}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="default">
                      Implement
                    </Button>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    <Button size="sm" variant="ghost">
                      Dismiss
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Predictive Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>24-Hour Demand Prediction</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={predictiveData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="demand" 
                  stackId="1"
                  stroke="#3b82f6" 
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  name="Predicted Demand"
                />
                <Area 
                  type="monotone" 
                  dataKey="supply" 
                  stackId="2"
                  stroke="#10b981" 
                  fill="#10b981"
                  fillOpacity={0.3}
                  name="Optimized Supply"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Anomaly Detection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {anomalyData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    {item.status === 'warning' ? 
                      <AlertTriangle className="h-5 w-5 text-warning" /> :
                      <CheckCircle className="h-5 w-5 text-success" />
                    }
                    <div>
                      <p className="font-medium">{item.metric}</p>
                      <p className="text-sm text-muted-foreground">
                        Current: {item.value} | Threshold: {item.threshold}
                      </p>
                    </div>
                  </div>
                  <Badge variant={item.status === 'warning' ? 'destructive' : 'default'}>
                    {item.status === 'warning' ? 'WARNING' : 'NORMAL'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Efficiency Trends */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Optimized Efficiency Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={predictiveData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="efficiency" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                name="Overall Efficiency %"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}