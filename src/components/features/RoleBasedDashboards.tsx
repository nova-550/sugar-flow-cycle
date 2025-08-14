import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
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
  Cell,
  AreaChart,
  Area
} from "recharts";
import { 
  Users, 
  Shield, 
  Leaf, 
  Cog, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  BarChart3,
  Settings,
  DollarSign
} from "lucide-react";

interface UserRole {
  id: string;
  name: string;
  title: string;
  permissions: string[];
  dashboardConfig: {
    widgets: string[];
    metrics: string[];
    alerts: boolean;
    reports: boolean;
  };
}

const userRoles: UserRole[] = [
  {
    id: "sustainability",
    name: "Sustainability Manager",
    title: "Environmental Impact & Compliance",
    permissions: ["view_sustainability", "export_reports", "manage_compliance"],
    dashboardConfig: {
      widgets: ["carbon-footprint", "water-usage", "waste-circularity", "renewable-energy"],
      metrics: ["co2_reduction", "water_savings", "waste_diversion", "energy_efficiency"],
      alerts: true,
      reports: true
    }
  },
  {
    id: "operations",
    name: "Operations Manager", 
    title: "Production Efficiency & Performance",
    permissions: ["view_operations", "manage_equipment", "production_control"],
    dashboardConfig: {
      widgets: ["production-metrics", "equipment-status", "process-flow", "efficiency-trends"],
      metrics: ["throughput", "oee", "downtime", "quality_metrics"],
      alerts: true,
      reports: true
    }
  },
  {
    id: "farm",
    name: "Farm Manager",
    title: "Agricultural Operations & Yield",
    permissions: ["view_farming", "crop_management", "irrigation_control"],
    dashboardConfig: {
      widgets: ["crop-health", "weather-data", "irrigation-status", "yield-forecast"],
      metrics: ["yield_per_hectare", "water_efficiency", "fertilizer_usage", "pest_control"],
      alerts: true,
      reports: false
    }
  },
  {
    id: "maintenance",
    name: "Maintenance Manager",
    title: "Equipment Health & Maintenance",
    permissions: ["view_maintenance", "schedule_maintenance", "equipment_diagnostics"],
    dashboardConfig: {
      widgets: ["equipment-health", "maintenance-schedule", "predictive-alerts", "spare-parts"],
      metrics: ["mtbf", "mttr", "availability", "maintenance_cost"],
      alerts: true,
      reports: true
    }
  }
];

const generateRoleData = (roleId: string) => {
  switch (roleId) {
    case "sustainability":
      return {
        keyMetrics: [
          { name: "CO₂ Reduction", value: 34, target: 40, unit: "%" },
          { name: "Water Savings", value: 2.4, target: 3.0, unit: "M L" },
          { name: "Waste Diversion", value: 97, target: 95, unit: "%" },
          { name: "Renewable Energy", value: 76, target: 80, unit: "%" }
        ],
        chartData: [
          { month: "Jan", co2: 45, water: 1.8, waste: 89 },
          { month: "Feb", co2: 42, water: 2.1, waste: 92 },
          { month: "Mar", co2: 38, water: 2.3, waste: 94 },
          { month: "Apr", co2: 36, water: 2.4, waste: 97 },
        ],
        alerts: [
          { type: "success", message: "Monthly carbon target exceeded by 12%" },
          { type: "warning", message: "Water usage efficiency declining in Sector 3" }
        ]
      };
      
    case "operations":
      return {
        keyMetrics: [
          { name: "Overall Efficiency", value: 89.2, target: 90, unit: "%" },
          { name: "Throughput", value: 120, target: 125, unit: "tons/hr" },
          { name: "Quality Score", value: 96.5, target: 95, unit: "/100" },
          { name: "Downtime", value: 2.3, target: 3.0, unit: "hrs" }
        ],
        chartData: [
          { hour: "06:00", efficiency: 87, throughput: 118 },
          { hour: "12:00", efficiency: 91, throughput: 122 },
          { hour: "18:00", efficiency: 89, throughput: 119 },
          { hour: "00:00", efficiency: 88, throughput: 121 },
        ],
        alerts: [
          { type: "warning", message: "Mill 1 efficiency below target - maintenance suggested" },
          { type: "info", message: "Peak production achieved between 10-14:00" }
        ]
      };
      
    case "farm":
      return {
        keyMetrics: [
          { name: "Yield Forecast", value: 78.5, target: 75, unit: "tons/ha" },
          { name: "Irrigation Efficiency", value: 92, target: 90, unit: "%" },
          { name: "Crop Health Index", value: 94, target: 90, unit: "/100" },
          { name: "Weather Risk", value: 15, target: 20, unit: "%" }
        ],
        chartData: [
          { field: "Field A", yield: 82, health: 96 },
          { field: "Field B", yield: 75, health: 92 },
          { field: "Field C", yield: 78, health: 94 },
          { field: "Field D", yield: 79, health: 93 },
        ],
        alerts: [
          { type: "success", message: "Optimal planting conditions for next season" },
          { type: "warning", message: "Pest activity detected in Field B - monitoring increased" }
        ]
      };
      
    default:
      return {
        keyMetrics: [
          { name: "Equipment Health", value: 87, target: 85, unit: "%" },
          { name: "MTBF", value: 720, target: 600, unit: "hrs" },
          { name: "Planned Maintenance", value: 95, target: 90, unit: "%" },
          { name: "Spare Parts Stock", value: 88, target: 85, unit: "%" }
        ],
        chartData: [
          { equipment: "Mill 1", health: 72, downtime: 12 },
          { equipment: "Mill 2", health: 89, downtime: 8 },
          { equipment: "Boiler", health: 45, downtime: 24 },
          { equipment: "Pump", health: 94, downtime: 4 },
        ],
        alerts: [
          { type: "critical", message: "Boiler requires immediate attention - schedule emergency maintenance" },
          { type: "info", message: "Preventive maintenance completed for Mill 2" }
        ]
      };
  }
};

export function RoleBasedDashboards() {
  const [currentRole, setCurrentRole] = useState<UserRole>(userRoles[0]);
  const [roleData, setRoleData] = useState(generateRoleData(currentRole.id));

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    setRoleData(generateRoleData(role.id));
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical": return "text-red-600 bg-red-100";
      case "warning": return "text-yellow-600 bg-yellow-100";
      case "success": return "text-green-600 bg-green-100";
      default: return "text-blue-600 bg-blue-100";
    }
  };

  const getRoleIcon = (roleId: string) => {
    switch (roleId) {
      case "sustainability": return <Leaf className="h-5 w-5" />;
      case "operations": return <Cog className="h-5 w-5" />;
      case "farm": return <TrendingUp className="h-5 w-5" />;
      case "maintenance": return <Settings className="h-5 w-5" />;
      default: return <Users className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Role Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Role-Based Dashboard Access
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {userRoles.map((role) => (
              <Button
                key={role.id}
                variant={currentRole.id === role.id ? "default" : "outline"}
                className="h-auto p-4 flex flex-col items-start space-y-2"
                onClick={() => handleRoleChange(role)}
              >
                <div className="flex items-center gap-2 w-full">
                  {getRoleIcon(role.id)}
                  <span className="font-medium text-sm">{role.name}</span>
                </div>
                <p className="text-xs text-left opacity-70">{role.title}</p>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Role Dashboard */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {getRoleIcon(currentRole.id)}
              {currentRole.name} Dashboard
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {currentRole.permissions.length} permissions
              </Badge>
              {currentRole.dashboardConfig.alerts && (
                <Badge variant="outline">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Alerts Enabled
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {roleData.keyMetrics.map((metric, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">{metric.name}</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold">{metric.value}</span>
                          <span className="text-sm text-muted-foreground">{metric.unit}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={(metric.value / metric.target) * 100} 
                            className="flex-1 h-2" 
                          />
                          <span className="text-xs text-muted-foreground">
                            Target: {metric.target}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Alerts Section */}
              {currentRole.dashboardConfig.alerts && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Active Alerts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {roleData.alerts.map((alert, index) => (
                      <div key={index} className={`p-3 rounded-lg ${getAlertColor(alert.type)}`}>
                        <div className="flex items-center gap-2">
                          {alert.type === "critical" && <AlertTriangle className="h-4 w-4" />}
                          {alert.type === "warning" && <Clock className="h-4 w-4" />}
                          {alert.type === "success" && <CheckCircle className="h-4 w-4" />}
                          {alert.type === "info" && <FileText className="h-4 w-4" />}
                          <span className="text-sm font-medium">{alert.message}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="metrics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Performance Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={roleData.chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={Object.keys(roleData.chartData[0])[0]} />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey={Object.keys(roleData.chartData[0])[1]} 
                          stroke="#22c55e" 
                          strokeWidth={2} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey={Object.keys(roleData.chartData[0])[2]} 
                          stroke="#3b82f6" 
                          strokeWidth={2} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Target vs Actual</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={roleData.keyMetrics}>
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
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Advanced Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={roleData.chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey={Object.keys(roleData.chartData[0])[0]} />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey={Object.keys(roleData.chartData[0])[1]} 
                        stackId="1" 
                        stroke="#22c55e" 
                        fill="#22c55e" 
                        fillOpacity={0.6} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey={Object.keys(roleData.chartData[0])[2]} 
                        stackId="1" 
                        stroke="#3b82f6" 
                        fill="#3b82f6" 
                        fillOpacity={0.6} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentRole.dashboardConfig.reports ? (
                  <>
                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <FileText className="h-6 w-6" />
                      <span>Daily Report</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <BarChart3 className="h-6 w-6" />
                      <span>Weekly Analytics</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <DollarSign className="h-6 w-6" />
                      <span>Monthly Summary</span>
                    </Button>
                  </>
                ) : (
                  <div className="col-span-3 text-center py-8 text-muted-foreground">
                    <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Report access not available for this role.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}