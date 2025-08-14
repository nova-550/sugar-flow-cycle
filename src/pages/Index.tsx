import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { ValueChainOverview } from "@/components/dashboard/ValueChainOverview";
import { CircularityDashboard } from "@/components/dashboard/CircularityDashboard";
import { AIInsights } from "@/components/dashboard/AIInsights";
import { Analytics } from "@/components/dashboard/Analytics";
import { PlantModel3D } from "@/components/visualizations/PlantModel3D";
import { ProcessFlow } from "@/components/visualizations/ProcessFlow";
import { WhatIfAnalysis } from "@/components/features/WhatIfAnalysis";
import { PredictiveMaintenance } from "@/components/features/PredictiveMaintenance";
import { VoiceCommands } from "@/components/features/VoiceCommands";
import { RoleBasedDashboards } from "@/components/features/RoleBasedDashboards";
import { Card, CardContent } from "@/components/ui/card";
import { Settings } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [userRole, setUserRole] = useState("Sustainability Manager");

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <ValueChainOverview />;
      case "3d-plant":
        return <PlantModel3D />;
      case "process-flow":
        return <ProcessFlow />;
      case "what-if":
        return <WhatIfAnalysis />;
      case "predictive":
        return <PredictiveMaintenance />;
      case "voice":
        return <VoiceCommands />;
      case "role-dashboards":
        return <RoleBasedDashboards />;
      case "circularity":
        return <CircularityDashboard />;
      case "ai":
        return <AIInsights />;
      case "analytics":
        return <Analytics />;
      case "settings":
        return (
          <Card>
            <CardContent className="p-8 text-center">
              <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Settings Panel</h3>
              <p className="text-muted-foreground">
                System configuration and user preferences will be available here.
              </p>
            </CardContent>
          </Card>
        );
      default:
        return <ValueChainOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userRole={userRole}
        onRoleChange={setUserRole}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Role Context */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Viewing as:</span>
            <span className="font-medium text-foreground">{userRole}</span>
          </div>
        </div>

        {/* Main Content */}
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;