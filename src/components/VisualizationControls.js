import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const VisualizationControls = ({ index, hasData, onVisualize, activeVisualizations }) => {
    const getButtonStyle = (vizType) => {
        const isActive = activeVisualizations.has(vizType === "Tijdlijn" ? 4 : 5);
        return isActive ? "bg-blue-200" : "bg-blue-50";
    };

    return (
        index === 3 && hasData && (
            <div className="flex space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onVisualize(4)}
                    className={getButtonStyle("Tijdlijn")}
                >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Tijdlijn {activeVisualizations.has(4) ? "(Aan)" : "(Uit)"}
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onVisualize(5)}
                    className={getButtonStyle("Netwerk")}
                >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Netwerk {activeVisualizations.has(5) ? "(Aan)" : "(Uit)"}
                </Button>
            </div>
        )
    );
};

export default VisualizationControls;
