import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Activity, Users, Briefcase, Calendar, ArrowRight } from 'lucide-react';

const TijdlijnGebeurtenis = ({ gebeurtenis, isLaatste }) => {
    const [isUitgevouwen, setIsUitgevouwen] = useState(false);

    const getGebeurtenisIcoon = (type) => {
        switch (type?.toLowerCase()) {
            case 'arbeidsrelatie':
                return <Briefcase className="w-5 h-5" />;
            case 'processueel':
                return <Activity className="w-5 h-5" />;
            case 'financieel':
                return <Calendar className="w-5 h-5" />;
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

    // Handle both visualization and timeline formats
    const label = gebeurtenis.label || gebeurtenis.beschrijving;
    const type = gebeurtenis.type || gebeurtenis.gebeurtenisType;
    const datum = gebeurtenis.datum;
    const actoren = gebeurtenis.beinvloedt || (gebeurtenis.actoren?.primair || []);
    const gevolgen = gebeurtenis.impact?.directeGevolgen || [];
    const juridischeGevolgen = gebeurtenis.impact?.juridischeGevolgen || [];
    const belangrijkheid = gebeurtenis.belangrijkheid || 1;

    return (
        <div className="relative pb-8">
            {!isLaatste && (
                <div className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
            )}
            <div
                className={getBelangrijkheidStijl(belangrijkheid)}
                onClick={() => setIsUitgevouwen(!isUitgevouwen)}
            >
                <div className="flex items-center mb-2">
                    <div className="flex-shrink-0 bg-white rounded-full p-1 ring-2 ring-gray-300">
                        {getGebeurtenisIcoon(type)}
                    </div>
                    <div className="ml-4 flex-grow">
                        <div className="text-sm font-medium text-gray-900">
                            {datum}
                        </div>
                    </div>
                </div>
                <div className="ml-12">
                    <h3 className="text-lg font-semibold text-gray-900">{label}</h3>

                    {isUitgevouwen && (
                        <>
                            {actoren.length > 0 && (
                                <div className="mt-4">
                                    <div className="font-medium text-sm text-gray-700">Betrokken:</div>
                                    <div className="text-sm text-gray-600">{actoren.join(", ")}</div>
                                </div>
                            )}

                            {gevolgen.length > 0 && (
                                <div className="mt-2">
                                    <div className="font-medium text-sm text-gray-700">Gevolgen:</div>
                                    <ul className="list-disc list-inside text-sm text-gray-600 ml-2">
                                        {gevolgen.map((gevolg, idx) => (
                                            <li key={idx}>{gevolg}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {juridischeGevolgen.length > 0 && (
                                <div className="mt-2">
                                    <div className="font-medium text-sm text-gray-700">Juridische Impact:</div>
                                    <ul className="list-disc list-inside text-sm text-gray-600 ml-2">
                                        {juridischeGevolgen.map((gevolg, idx) => (
                                            <li key={idx}>{gevolg}</li>
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

const TijdlijnComponent = ({ data }) => {
    // Handle both timeline format and visualization format
    const events = data?.tijdlijn || data?.visualisatieElementen?.tijdlijnElementen || [];

    return (
        <Card className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Zaak Tijdlijn</h2>

            <div>
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