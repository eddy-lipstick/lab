import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Activity, Users, Briefcase, Calendar, ArrowRight } from 'lucide-react';

// Helper function to parse dates consistently
const parseDate = (dateStr) => {
    if (!dateStr) return null;
    if (dateStr.toLowerCase().includes('begin')) {
        return new Date(dateStr.split(' ')[1], 0, 1);
    }
    if (dateStr.toLowerCase().includes('eind')) {
        return new Date(dateStr.split(' ')[1], 11, 31);
    }
    const [day, month, year] = dateStr.split(' ');
    const monthMap = {
        'januari': 0, 'februari': 1, 'maart': 2, 'april': 3, 'mei': 4, 'juni': 5,
        'juli': 6, 'augustus': 7, 'september': 8, 'oktober': 9, 'november': 10, 'december': 11
    };
    return new Date(year, monthMap[month.toLowerCase()], parseInt(day));
};

const TimelineEvent = ({ event, isLast, startDate, endDate, duration }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const getEventIcon = (type) => {
        switch (type) {
            case 'employment':
                return <Briefcase className="w-5 h-5" />;
            case 'procedural':
                return <Activity className="w-5 h-5" />;
            case 'financial':
                return <Calendar className="w-5 h-5" />;
            default:
                return <Users className="w-5 h-5" />;
        }
    };

    const getImportanceStyles = () => {
        const baseStyles = "rounded-lg p-4 shadow transition-all duration-200 hover:shadow-lg cursor-pointer";
        switch (duration ? 2 : 3) {
            case 3:
                return `${baseStyles} bg-blue-100 border-l-4 border-blue-500`;
            case 2:
                return `${baseStyles} bg-blue-50 border-l-4 border-blue-400`;
            default:
                return `${baseStyles} bg-gray-50 border-l-4 border-gray-300`;
        }
    };

    const getDurationBar = () => {
        if (!duration) return null;
        return (
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                <span>{startDate}</span>
                <div className="h-2 flex-grow bg-blue-200 rounded"></div>
                <span>{endDate || 'Present'}</span>
            </div>
        );
    };

    return (
        <div className="relative pb-8">
            {!isLast && (
                <div className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
            )}
            <div
                className={getImportanceStyles()}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center mb-2">
                    <div className="flex-shrink-0 bg-white rounded-full p-1 ring-2 ring-gray-300">
                        {getEventIcon(event.event_type)}
                    </div>
                    <div className="ml-4 flex-grow">
                        <div className="text-sm font-medium text-gray-900">
                            {startDate}
                            {duration && <ArrowRight className="inline mx-2 w-4 h-4" />}
                            {duration && (endDate || 'Present')}
                        </div>
                    </div>
                </div>
                <div className="ml-12">
                    <h3 className="text-lg font-semibold text-gray-900">{event.description}</h3>

                    {getDurationBar()}

                    {isExpanded && (
                        <>
                            {event.actors.primary.length > 0 && (
                                <div className="mt-4">
                                    <div className="font-medium text-sm text-gray-700">Primary Actors:</div>
                                    <div className="text-sm text-gray-600">{event.actors.primary.join(", ")}</div>
                                </div>
                            )}

                            {event.impact.immediate_effects.length > 0 && (
                                <div className="mt-2">
                                    <div className="font-medium text-sm text-gray-700">Effects:</div>
                                    <ul className="list-disc list-inside text-sm text-gray-600 ml-2">
                                        {event.impact.immediate_effects.map((effect, idx) => (
                                            <li key={idx}>{effect}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {event.impact.legal_consequences.length > 0 && (
                                <div className="mt-2">
                                    <div className="font-medium text-sm text-gray-700">Legal Impact:</div>
                                    <ul className="list-disc list-inside text-sm text-gray-600 ml-2">
                                        {event.impact.legal_consequences.map((consequence, idx) => (
                                            <li key={idx}>{consequence}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const TimelineComponent = () => {
    // Enhanced sample data with more events and durations
    const timelineData = {
        "timeline": [
            {
                "date": "1 november 2012",
                "event_type": "procedural",
                "description": "[eiser] en [naam 1] Produce Limited richten SOHO PRODUCE COÖPERATIE U.A. op",
                "actors": {
                    "primary": ["[eiser]", "[naam 1] Produce Limited"],
                    "secondary": []
                },
                "impact": {
                    "immediate_effects": ["Oprichting groothandel in groente en fruit"],
                    "legal_consequences": ["Artikel 610 boek 7 BW is van toepassing"],
                    "relationship_changes": ["Zakelijke samenwerking tussen [eiser] en [naam 1] Produce Limited"]
                }
            },
            {
                "date": "1 april 2013",
                "end_date": "heden",
                "event_type": "employment",
                "description": "[eiser] treedt in dienst bij SOHO PRODUCE COÖPERATIE U.A.",
                "actors": {
                    "primary": ["[eiser]", "SOHO PRODUCE COÖPERATIE U.A."],
                    "secondary": []
                },
                "impact": {
                    "immediate_effects": ["[eiser] wordt statutair bestuurder en werknemer"],
                    "legal_consequences": ["Artikel 610 boek 7 BW is van toepassing"],
                    "relationship_changes": ["Arbeidsrelatie tussen [eiser] en SOHO PRODUCE COÖPERATIE U.A."]
                }
            },
            {
                "date": "1 april 2013",
                "end_date": "1 april 2021",
                "event_type": "employment",
                "description": "[naam 2] treedt in dienst als sales manager",
                "actors": {
                    "primary": ["[naam 2]", "SOHO PRODUCE COÖPERATIE U.A."],
                    "secondary": []
                },
                "impact": {
                    "immediate_effects": ["Aanstelling sales manager"],
                    "legal_consequences": ["Arbeidsovereenkomst met managementbonus van 11%"],
                    "relationship_changes": []
                }
            },
            {
                "date": "begin 2019",
                "end_date": "heden",
                "event_type": "employment",
                "description": "[naam 3] treedt toe tot managementteam",
                "actors": {
                    "primary": ["[naam 3]", "SOHO PRODUCE COÖPERATIE U.A."],
                    "secondary": []
                },
                "impact": {
                    "immediate_effects": ["Uitbreiding managementteam"],
                    "legal_consequences": [],
                    "relationship_changes": []
                }
            },
            {
                "date": "eind 2020",
                "event_type": "employment",
                "description": "Ondertekening vaststellingsovereenkomst [naam 2]",
                "actors": {
                    "primary": ["[naam 2]", "SOHO PRODUCE COÖPERATIE U.A."],
                    "secondary": []
                },
                "impact": {
                    "immediate_effects": ["Beëindiging dienstverband overeengekomen"],
                    "legal_consequences": ["Uitdiensttreding per 1 april 2021"],
                    "relationship_changes": []
                }
            }
        ]
    };

    return (
        <Card className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Case Timeline</h2>

            <div>
                {timelineData.timeline.map((event, index) => (
                    <TimelineEvent
                        key={index}
                        event={event}
                        isLast={index === timelineData.timeline.length - 1}
                        startDate={event.date}
                        endDate={event.end_date}
                        duration={event.end_date ? true : false}
                    />
                ))}
            </div>
        </Card>
    );
};

export default TimelineComponent;