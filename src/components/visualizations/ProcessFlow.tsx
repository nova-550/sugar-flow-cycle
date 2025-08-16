import { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Droplets, Zap, Recycle, Factory } from "lucide-react";

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { 
      label: 'Sugarcane Farm',
      status: 'active',
      throughput: '120 tons/hr',
      efficiency: 87
    },
    position: { x: 0, y: 100 },
    style: { background: '#22c55e', color: 'white', border: '2px solid #16a34a' }
  },
  {
    id: '2',
    data: { 
      label: 'Transport',
      status: 'active',
      throughput: '115 tons/hr',
      efficiency: 95
    },
    position: { x: 200, y: 100 },
    style: { background: '#3b82f6', color: 'white', border: '2px solid #2563eb' }
  },
  {
    id: '3',
    data: { 
      label: 'Mill Station 1',
      status: 'warning',
      throughput: '110 tons/hr',
      efficiency: 82
    },
    position: { x: 400, y: 50 },
    style: { background: '#eab308', color: 'white', border: '2px solid #ca8a04' }
  },
  {
    id: '4',
    data: { 
      label: 'Mill Station 2',
      status: 'active',
      throughput: '108 tons/hr',
      efficiency: 89
    },
    position: { x: 400, y: 150 },
    style: { background: '#22c55e', color: 'white', border: '2px solid #16a34a' }
  },
  {
    id: '5',
    data: { 
      label: 'Juice Extraction',
      status: 'active',
      throughput: '95 tons/hr',
      efficiency: 91
    },
    position: { x: 600, y: 100 },
    style: { background: '#06b6d4', color: 'white', border: '2px solid #0891b2' }
  },
  {
    id: '6',
    data: { 
      label: 'Clarification',
      status: 'optimal',
      throughput: '92 tons/hr',
      efficiency: 96
    },
    position: { x: 800, y: 100 },
    style: { background: '#8b5cf6', color: 'white', border: '2px solid #7c3aed' }
  },
  {
    id: '7',
    data: { 
      label: 'Evaporation',
      status: 'active',
      throughput: '25 tons/hr',
      efficiency: 88
    },
    position: { x: 1000, y: 100 },
    style: { background: '#ef4444', color: 'white', border: '2px solid #dc2626' }
  },
  {
    id: '8',
    data: { 
      label: 'Crystallization',
      status: 'active',
      throughput: '22 tons/hr',
      efficiency: 85
    },
    position: { x: 1200, y: 100 },
    style: { background: '#f59e0b', color: 'white', border: '2px solid #d97706' }
  },
  {
    id: '9',
    type: 'output',
    data: { 
      label: 'Raw Sugar',
      status: 'optimal',
      throughput: '20 tons/hr',
      efficiency: 94
    },
    position: { x: 1400, y: 100 },
    style: { background: '#10b981', color: 'white', border: '2px solid #059669' }
  },
  // By-products
  {
    id: 'bagasse',
    data: { 
      label: 'Bagasse',
      status: 'circular',
      throughput: '65 tons/hr',
      purpose: 'Bioenergy'
    },
    position: { x: 600, y: 250 },
    style: { background: '#84cc16', color: 'white', border: '2px solid #65a30d' }
  },
  {
    id: 'molasses',
    data: { 
      label: 'Molasses',
      status: 'circular',
      throughput: '12 tons/hr',
      purpose: 'Ethanol'
    },
    position: { x: 1200, y: 250 },
    style: { background: '#a855f7', color: 'white', border: '2px solid #9333ea' }
  },
  {
    id: 'filter-cake',
    data: { 
      label: 'Filter Cake',
      status: 'circular',
      throughput: '8 tons/hr',
      purpose: 'Fertilizer'
    },
    position: { x: 800, y: 250 },
    style: { background: '#06b6d4', color: 'white', border: '2px solid #0891b2' }
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#22c55e', strokeWidth: 3 } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#3b82f6', strokeWidth: 3 } },
  { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: '#3b82f6', strokeWidth: 3 } },
  { id: 'e3-5', source: '3', target: '5', animated: true, style: { stroke: '#eab308', strokeWidth: 3 } },
  { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#22c55e', strokeWidth: 3 } },
  { id: 'e5-6', source: '5', target: '6', animated: true, style: { stroke: '#06b6d4', strokeWidth: 3 } },
  { id: 'e6-7', source: '6', target: '7', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 3 } },
  { id: 'e7-8', source: '7', target: '8', animated: true, style: { stroke: '#ef4444', strokeWidth: 3 } },
  { id: 'e8-9', source: '8', target: '9', animated: true, style: { stroke: '#f59e0b', strokeWidth: 3 } },
  // By-product flows
  { id: 'e5-bagasse', source: '5', target: 'bagasse', style: { stroke: '#84cc16', strokeDasharray: '5,5' } },
  { id: 'e6-filter', source: '6', target: 'filter-cake', style: { stroke: '#06b6d4', strokeDasharray: '5,5' } },
  { id: 'e8-molasses', source: '8', target: 'molasses', style: { stroke: '#a855f7', strokeDasharray: '5,5' } },
];

const nodeTypes = {
  custom: ({ data }: { data: any }) => (
    <div className="px-4 py-2 rounded-lg border-2 text-white text-center min-w-[120px]">
      <div className="font-semibold text-sm">{data.label}</div>
      <div className="text-xs mt-1">{data.throughput}</div>
      {data.efficiency && (
        <div className="text-xs">Eff: {data.efficiency}%</div>
      )}
    </div>
  ),
};

export function ProcessFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      setSelectedNode(node);
    },
    [],
  );

  return (
    <Card className="h-[600px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Factory className="h-5 w-5" />
          Real-time Process Flow
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[500px] relative">
        <div className="absolute top-4 right-4 z-10 space-y-2">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 border">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded"></div>
              <span>Main Process</span>
            </div>
            <div className="flex items-center gap-2 text-sm mt-1">
              <div className="w-3 h-1 bg-purple-500" style={{ borderStyle: 'dashed' }}></div>
              <span>By-products</span>
            </div>
          </div>
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          style={{ backgroundColor: '#f8fafc' }}
        >
          <Controls />
          <MiniMap 
            nodeStrokeColor={(node) => node.style?.border as string || '#666'}
            nodeColor={(node) => node.style?.background as string || '#fff'}
            nodeBorderRadius={8}
          />
          <Background gap={20} size={1} />
        </ReactFlow>

        {selectedNode && (
          <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 border">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-lg">{selectedNode.data.label as string}</h4>
              <Badge 
                variant={
                  selectedNode.data.status === 'optimal' ? 'default' : 
                  selectedNode.data.status === 'warning' ? 'destructive' : 
                  selectedNode.data.status === 'circular' ? 'secondary' : 'outline'
                }
              >
                {selectedNode.data.status as string}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Throughput</p>
                <p className="font-medium">{selectedNode.data.throughput as string}</p>
              </div>
              
              {selectedNode.data.efficiency && (
                <div>
                  <p className="text-sm text-muted-foreground">Efficiency</p>
                  <div className="flex items-center gap-2">
                    <Progress value={selectedNode.data.efficiency as number} className="h-2 flex-1" />
                    <span className="text-sm font-medium">{selectedNode.data.efficiency as number}%</span>
                  </div>
                </div>
              )}
              
              {selectedNode.data.purpose && (
                <div>
                  <p className="text-sm text-muted-foreground">Purpose</p>
                  <p className="font-medium">{selectedNode.data.purpose as string}</p>
                </div>
              )}
              
              <div>
                <p className="text-sm text-muted-foreground">Material Flow</p>
                <div className="flex items-center gap-1">
                  {selectedNode.data.status === 'circular' ? (
                    <Recycle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Droplets className="h-4 w-4 text-blue-500" />
                  )}
                  <span className="text-sm">Active</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}