import React, { useMemo } from 'react';
import ReactFlow, {
    Background,
    Controls,
    Handle,
    Position,
    MarkerType,
    ReactFlowProvider
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Card } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

// Custom node component - moved outside
const TimelineNode = ({ data }) => {
    return (
        <div className="bg-white border-2 border-gray-300 rounded-lg p-4 shadow-sm w-64">
            <Handle type="target" position={Position.Left} className="w-2 h-2" />
            <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <div className="text-sm font-medium text-gray-600">{data.date}</div>
            </div>
            <div className="text-sm font-bold mb-1">{data.event_type}</div>
            <div className="text-xs text-gray-500">{data.description}</div>
            <Handle type="source" position={Position.Right} className="w-2 h-2" />
        </div>
    );
};

// Node types defined outside component
const nodeTypes = {
    timeline: TimelineNode,
};

const TijdlijnComponent = ({ data }) => {
    // Transform timeline data with useMemo
    const timelineElements = useMemo(() => {
        if (!data?.timeline) return { nodes: [], edges: [] };

        const nodes = data.timeline.map((event, index) => ({
            id: `event-${index}`,
            type: 'timeline',
            position: { x: index * 300, y: 100 },
            data: {
                date: event.date,
                event_type: event.event_type,
                description: event.description
            }
        }));

        const edges = [];
        for (let i = 0; i < nodes.length - 1; i++) {
            edges.push({
                id: `edge-${i}`,
                source: nodes[i].id,
                target: nodes[i + 1].id,
                type: 'smoothstep',
                animated: true,
                style: { stroke: '#94a3b8' }
            });
        }

        return { nodes, edges };
    }, [data]);

    return (
        <Card className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Tijdlijn</h2>
            <div className="h-96 w-full border rounded-lg">
                <ReactFlowProvider>
                    <ReactFlow
                        nodes={timelineElements.nodes}
                        edges={timelineElements.edges}
                        nodeTypes={nodeTypes}
                        fitView
                    >
                        <Background />
                        <Controls />
                    </ReactFlow>
                </ReactFlowProvider>
            </div>
        </Card>
    );
};

export default TijdlijnComponent;
