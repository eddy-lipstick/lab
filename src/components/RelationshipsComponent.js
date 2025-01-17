import React, { useMemo } from 'react';
import ReactFlow, {
    Background,
    Controls,
    Handle,
    Position,
    MarkerType,
    ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Card } from '@/components/ui/card';
import { User, Building2, GraduationCap, Building } from 'lucide-react';

const CustomNode = React.memo(({ data }) => {
    const getIcon = () => {
        const nodeType = data.type?.toLowerCase();
        switch (nodeType) {
            case 'person':
            case 'persoon':
                return <User className="w-4 h-4" />;
            case 'company':
            case 'bedrijf':
                return <Building2 className="w-4 h-4" />;
            case 'institution':
            case 'instantie':
                return <GraduationCap className="w-4 h-4" />;
            default:
                return <Building className="w-4 h-4" />;
        }
    };

    const getGroupColor = () => {
        const group = data.group?.toLowerCase() || data.groep?.toLowerCase();
        switch (group) {
            case 'partijen':
                return 'bg-red-50 border-red-300';
            case 'instanties':
                return 'bg-blue-50 border-blue-300';
            case 'companies':
            case 'bedrijven':
                return 'bg-green-50 border-green-300';
            default:
                return 'bg-gray-50 border-gray-300';
        }
    };

    const getSize = () => {
        const importance = data.importance || data.belangrijkheid || 1;
        switch (true) {
            case importance >= 9:
                return 'w-56 h-28';
            case importance >= 7:
                return 'w-48 h-24';
            default:
                return 'w-40 h-20';
        }
    };

    return (
        <div className={`rounded-lg border-2 ${getGroupColor()} ${getSize()} flex flex-col items-center justify-center relative p-2`}>
            <Handle type="target" position={Position.Top} className="w-2 h-2" />
            <div className="flex items-center gap-2">
                {getIcon()}
                <div className="text-sm font-medium truncate max-w-[80%]">{data.label}</div>
            </div>
            {(data.properties?.status || data.eigenschappen?.status) && (
                <div className="text-xs text-gray-500 mt-1 truncate max-w-[90%]">
                    {data.properties?.status || data.eigenschappen?.status}
                </div>
            )}
            <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
        </div>
    );
});

const nodeTypes = {
    custom: CustomNode,
};

const getColorFromCategory = (category) => {
    switch (category?.toLowerCase()) {
        case 'rood':
            return '#ef4444';
        case 'blauw':
            return '#3b82f6';
        case 'groen':
            return '#22c55e';
        default:
            return '#94a3b8';
    }
};

const RelationshipsComponent = ({ data }) => {
    // Extract visualization elements from either English or Dutch structure
    const visualElements = data?.visualization_elements || data?.visualisatieElementen;

    // Transform nodes data
    const nodes = useMemo(() => {
        const nodesList = visualElements?.nodes || visualElements?.knooppunten || [];
        return nodesList.map(node => ({
            id: node.id,
            type: 'custom',
            position: { x: 0, y: 0 }, // Will be adjusted by layout
            data: node
        }));
    }, [visualElements]);

    // Transform edges data
    const edges = useMemo(() => {
        const relationsList = visualElements?.relationships || visualElements?.relaties || [];
        return relationsList.map((rel, index) => ({
            id: `e${index}`,
            source: rel.from || rel.van,
            target: rel.to || rel.naar,
            type: 'smoothstep',
            animated: !(rel.active || rel.actief),
            style: {
                strokeWidth: (rel.visual_properties?.strength || rel.visueleEigenschappen?.sterkte || 1) / 2,
                stroke: getColorFromCategory(rel.visual_properties?.color_category || rel.visueleEigenschappen?.kleurCategorie),
                strokeDasharray: (rel.visual_properties?.style || rel.visueleEigenschappen?.stijl) === 'gestreept' ? '5,5' : undefined
            },
            markerEnd: {
                type: MarkerType.ArrowClosed,
                color: getColorFromCategory(rel.visual_properties?.color_category || rel.visueleEigenschappen?.kleurCategorie),
            },
            label: rel.type,
            labelStyle: { fill: '#64748b', fontSize: 12 }
        }));
    }, [visualElements]);

    // Layout calculation with improved spacing
    const layoutedNodes = useMemo(() => {
        if (!nodes.length) return [];

        const center = { x: 400, y: 300 };
        const radius = Math.max(300, nodes.length * 50);
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

    if (!visualElements?.nodes?.length && !visualElements?.knooppunten?.length) {
        return (
            <Card className="p-6">
                <div className="text-gray-500">Geen netwerk data beschikbaar</div>
            </Card>
        );
    }

    return (
        <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Relatie Netwerk</h2>
            <div className="h-[600px] w-full border rounded-lg bg-gray-50">
                <ReactFlowProvider>
                    <ReactFlow
                        nodes={layoutedNodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        fitView
                        minZoom={0.1}
                        maxZoom={1.5}
                        defaultZoom={0.8}
                        zoomOnScroll={false}
                        panOnScroll={true}
                        preventScrolling={false}
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