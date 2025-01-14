import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Calendar, Briefcase, Activity, Users } from 'lucide-react';

const TijdlijnComponent = ({ data }) => {
    console.log('TijdlijnComponent received data:', data);
    // Get timeline elements from the visualization format
    const events = data?.visualization_elements?.timeline_elements || [];
    console.log('Timeline events:', events);

    if (!events.length) {

        console.log('No timeline events found');
        return (
            <Card className="p-6 max-w-4xl mx-auto">
                <div className="text-gray-500">Geen tijdlijn data beschikbaar</div>
            </Card>
        );
    }

    return (
        <Card className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Zaak Tijdlijn</h2>
            <div>
                {events.map((gebeurtenis, index) => (
                    <TijdlijnGebeurtenis
                        key={index}
                        gebeurtenis={{
                            beschrijving: gebeurtenis.label,
                            gebeurtenisType: gebeurtenis.type,
                            datum: gebeurtenis.date,
                            actoren: {
                                primair: gebeurtenis.affects || []
                            },
                            belangrijkheid: gebeurtenis.importance
                        }}
                        isLaatste={index === events.length - 1}
                    />
                ))}
            </div>
        </Card>
    );
};

export default TijdlijnComponent;

const TijdlijnGebeurtenis = ({ gebeurtenis, isLaatste }) => {
    const [isUitgevouwen, setIsUitgevouwen] = useState(false);

    const getGebeurtenisIcoon = (type) => {
        switch (type?.toLowerCase()) {
            case 'event':
                return <Calendar className="w-5 h-5" />;
            case 'employment':
                return <Briefcase className="w-5 h-5" />;
            case 'procedural':
                return <Activity className="w-5 h-5" />;
            default:
                return <Users className="w-5 h-5" />;
        }
    };

    const getBelangrijkheidStijl = (belangrijkheid = 1) => {
        const basisStijl = "rounded-lg p-4 shadow transition-all duration-200 hover:shadow-lg cursor-pointer";
        switch (belangrijkheid) {
            case 3:
                return `${basisStijl} bg-blue-100 border-l-4 border-blue-500`;
            case 2:
                return `${basisStijl} bg-blue-50 border-l-4 border-blue-400`;
            default:
                return `${basisStijl} bg-gray-50 border-l-4 border-gray-300`;
        }
    };

    return (
        <div className="relative pb-8">
            {!isLaatste && (
                <div className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
            )}
            <div
                className={getBelangrijkheidStijl(gebeurtenis.belangrijkheid)}
                onClick={() => setIsUitgevouwen(!isUitgevouwen)}
            >
                <div className="flex items-center mb-2">
                    <div className="flex-shrink-0 bg-white rounded-full p-1 ring-2 ring-gray-300">
                        {getGebeurtenisIcoon(gebeurtenis.gebeurtenisType)}
                    </div>
                    <div className="ml-4 flex-grow">
                        <div className="text-sm font-medium text-gray-900">
                            {gebeurtenis.datum}
                        </div>
                    </div>
                </div>
                <div className="ml-12">
                    <h3 className="text-lg font-semibold text-gray-900">{gebeurtenis.beschrijving}</h3>

                    {isUitgevouwen && gebeurtenis.actoren?.primair?.length > 0 && (
                        <div className="mt-4">
                            <div className="font-medium text-sm text-gray-700">Betrokken:</div>
                            <div className="text-sm text-gray-600">
                                {gebeurtenis.actoren.primair.join(", ")}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
