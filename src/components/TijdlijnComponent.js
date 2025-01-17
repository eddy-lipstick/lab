import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Activity, Users, Briefcase, Calendar, AlertCircle } from 'lucide-react';

const TijdlijnGebeurtenis = ({ gebeurtenis, isLaatste }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Standardize event data structure
    const formatEvent = (rawEvent) => {
        return {
            date: rawEvent.datum || rawEvent.date,
            type: rawEvent.type || rawEvent.gebeurtenisType,
            label: rawEvent.label || rawEvent.beschrijving,
            actors: rawEvent.beinvloedt || (rawEvent.actoren?.primair || []),
            effects: rawEvent.impact?.directeGevolgen || [],
            legalEffects: rawEvent.impact?.juridischeGevolgen || [],
            importance: rawEvent.belangrijkheid || 1
        };
    };

    const event = formatEvent(gebeurtenis);

    const getEventIcon = (type) => {
        const lowerType = (type || '').toLowerCase();
        if (lowerType.includes('arbeids') || lowerType.includes('employment')) return <Briefcase className="w-5 h-5" />;
        if (lowerType.includes('proces') || lowerType.includes('juridisch')) return <Activity className="w-5 h-5" />;
        if (lowerType.includes('financ')) return <Calendar className="w-5 h-5" />;
        return <Users className="w-5 h-5" />;
    };

    const getImportanceStyle = (importance = 1) => {
        const baseStyle = "rounded-lg p-4 shadow transition-all duration-200 hover:shadow-lg cursor-pointer";
        switch (importance) {
            case 5:
            case 4:
                return `${baseStyle} bg-blue-100 border-l-4 border-blue-500`;
            case 3:
                return `${baseStyle} bg-blue-50 border-l-4 border-blue-400`;
            default:
                return `${baseStyle} bg-gray-50 border-l-4 border-gray-300`;
        }
    };

    return (
        <div className="relative pb-8">
            {!isLaatste && (
                <div className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
            )}
            <div
                className={getImportanceStyle(event.importance)}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center mb-2">
                    <div className="flex-shrink-0 bg-white rounded-full p-1 ring-2 ring-gray-300">
                        {getEventIcon(event.type)}
                    </div>
                    <div className="ml-4 flex-grow">
                        <div className="text-sm font-medium text-gray-900">
                            {event.date}
                        </div>
                        <div className="text-sm text-gray-500">
                            {event.type}
                        </div>
                    </div>
                </div>
                <div className="ml-12">
                    <h3 className="text-lg font-semibold text-gray-900">{event.label}</h3>

                    {isExpanded && (
                        <div className="mt-2 space-y-3">
                            {event.actors?.length > 0 && (
                                <div>
                                    <div className="font-medium text-sm text-gray-700">Betrokken partijen:</div>
                                    <div className="text-sm text-gray-600">{event.actors.join(", ")}</div>
                                </div>
                            )}

                            {event.effects?.length > 0 && (
                                <div>
                                    <div className="font-medium text-sm text-gray-700">Gevolgen:</div>
                                    <ul className="list-disc list-inside text-sm text-gray-600 ml-2">
                                        {event.effects.map((effect, idx) => (
                                            <li key={idx}>{effect}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {event.legalEffects?.length > 0 && (
                                <div>
                                    <div className="font-medium text-sm text-gray-700">Juridische impact:</div>
                                    <ul className="list-disc list-inside text-sm text-gray-600 ml-2">
                                        {event.legalEffects.map((effect, idx) => (
                                            <li key={idx}>{effect}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const TijdlijnComponent = ({ data }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const extractEvents = (inputData) => {
            if (!inputData) return [];

            // Handle direct timeline data
            if (inputData.tijdlijn) {
                return inputData.tijdlijn;
            }

            // Handle visualization format
            if (inputData.visualisatieElementen?.tijdlijnElementen) {
                return inputData.visualisatieElementen.tijdlijnElementen;
            }

            return [];
        };

        const extractedEvents = extractEvents(data);
        setEvents(extractedEvents);
    }, [data]);

    if (!events || events.length === 0) {
        return (
            <Card className="p-6">
                <div className="flex items-center justify-center space-x-2 text-gray-500">
                    <AlertCircle className="w-5 h-5" />
                    <span>Geen tijdlijn gebeurtenissen gevonden</span>
                </div>
            </Card>
        );
    }

    return (
        <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Zaak Tijdlijn</h2>
            <div className="space-y-4">
                {events.map((gebeurtenis, index) => (
                    <TijdlijnGebeurtenis
                        key={index}
                        gebeurtenis={gebeurtenis}
                        isLaatste={index === events.length - 1}
                    />
                ))}
            </div>
        </Card>
    );
};

export default TijdlijnComponent;