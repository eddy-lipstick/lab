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
import { User, Building2, GraduationCap } from 'lucide-react';

// Custom node component - moved outside
const CustomNode = ({ data, type }) => {
    const getIcon = () => {
        switch (type) {
            case 'person':
                return <User className="w-4 h-4" />;
            case 'company':
                return <Building2 className="w-4 h-4" />;
            case 'institution':
                return <GraduationCap className="w-4 h-4" />;
            default:
                return null;
        }
    };

    const getGroupColor = () => {
        switch (data.group) {
            case 'employees':
                return 'bg-blue-100 border-blue-500';
            case 'companies':
                return 'bg-green-100 border-green-500';
            case 'shareholders':
                return 'bg-red-100 border-red-500';
            default:
                return 'bg-gray-100 border-gray-500';
        }
    };

    const getSize = () => {
        switch (data.importance) {
            case 3:
                return 'w-48 h-24';
            case 2:
                return 'w-40 h-20';
            default:
                return 'w-32 h-16';
        }
    };

    return (
        <div className={`rounded-lg border-2 ${getGroupColor()} ${getSize()} flex flex-col items-center justify-center relative`}>
            <Handle type="target" position={Position.Top} className="w-2 h-2" />
            <div className="flex items-center gap-2">
                {getIcon()}
                <div className="text-sm font-medium">{data.label}</div>
            </div>
            {data.properties?.status && (
                <div className="text-xs text-gray-500 mt-1">
                    {data.properties.status}
                </div>
            )}
            <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
        </div>
    );
};

// Node types defined outside component
const nodeTypes = {
    custom: CustomNode,
};

const RelationshipsComponent = ({ data }) => {
    // Transform nodes data with useMemo
    const nodes = useMemo(() =>
        data?.visualization_elements?.nodes?.map(node => ({
            id: node.id,
            type: 'custom',
            position: { x: 0, y: 0 },
            data: {
                label: node.label,
                group: node.group,
                importance: node.importance,
                properties: node.properties
            }
        })) || [],
        [data]
    );

    // Transform edges data with useMemo
    const edges = useMemo(() =>
        data?.visualization_elements?.relationships?.map((rel, index) => ({
            id: `e${index}`,
            source: rel.from,
            target: rel.to,
            type: rel.visual_properties.direction === 'two_way' ? 'bidirectional' : 'default',
            animated: !rel.active,
            style: {
                strokeWidth: rel.visual_properties.strength,
                stroke: rel.visual_properties.color_category === 'primary' ? '#3b82f6' : '#94a3b8',
                strokeDasharray: rel.visual_properties.style === 'dashed' ? '5,5' : undefined
            },
            markerEnd: {
                type: MarkerType.ArrowClosed,
                color: rel.visual_properties.color_category === 'primary' ? '#3b82f6' : '#94a3b8',
            },
            label: rel.type,
            labelStyle: { fill: '#64748b', fontSize: 12 }
        })) || [],
        [data]
    );

    // Layout function with useMemo
    const layoutedNodes = useMemo(() => {
        const center = { x: 400, y: 300 };
        const radius = Math.max(200, nodes.length * 40);
        const angleStep = (2 * Math.PI) / nodes.length;

        return nodes.map((node, index) => {
            const angle = angleStep * index;
            return {
                ...node,
                position: {
                    x: center.x + radius * Math.cos(angle),
                    y: center.y + radius * Math.sin(angle)
                }
            };
        });
    }, [nodes]);

    return (
        <Card className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Relatie Netwerk</h2>
            <div className="h-96 w-full border rounded-lg">
                <ReactFlowProvider>
                    <ReactFlow
                        nodes={layoutedNodes}
                        edges={edges}
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

export default RelationshipsComponent;
