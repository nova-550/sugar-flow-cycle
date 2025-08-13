import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Factory, 
  Leaf, 
  Brain, 
  BarChart3, 
  Settings, 
  User,
  Menu
} from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userRole: string;
  onRoleChange: (role: string) => void;
}

const tabs = [
  { id: "overview", label: "Value Chain", icon: Factory },
  { id: "circularity", label: "Circularity", icon: Leaf },
  { id: "ai", label: "AI Insights", icon: Brain },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

const roles = [
  "Sustainability Manager",
  "Operations Manager", 
  "Farm Manager",
  "Quality Control"
];

export function Navigation({ activeTab, onTabChange, userRole, onRoleChange }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-card border-b border-border shadow-elegant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Factory className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-xl font-semibold text-foreground">Sugar Industry Digital Twin</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onTabChange(tab.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </Button>
              );
            })}
          </div>

          {/* User Role Selector */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <select
                value={userRole}
                onChange={(e) => onRoleChange(e.target.value)}
                className="bg-background border border-border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => {
                      onTabChange(tab.id);
                      setIsMenuOpen(false);
                    }}
                    className="w-full justify-start gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </Button>
                );
              })}
              
              {/* Mobile Role Selector */}
              <div className="pt-4 border-t border-border">
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  User Role
                </label>
                <select
                  value={userRole}
                  onChange={(e) => onRoleChange(e.target.value)}
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}