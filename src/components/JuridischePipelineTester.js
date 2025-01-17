'use client';

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Edit2, Play, RefreshCw, Code, Eye, Search } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

import ProviderSelect from '@/components/ProviderSelect';
import ManualJsonInput from '@/components/ManualJsonInput';
import TijdlijnComponent from '@/components/TijdlijnComponent';
import RelationshipsComponent from '@/components/RelationshipsComponent';
import VisualizationControls from '@/components/VisualizationControls';
import PromptEditor from '@/components/PromptEditor';

import _ from 'lodash';

const pipelineStappen = [
  {
    titel: "Context & Partij Detectie",
    beschrijving: "Identificeert zaaktype, partijen en basis relaties",
    outputVelden: ["context", "kernelementen"]
  },
  {
    titel: "Relatie Analyse",
    beschrijving: "Diepe analyse van geïdentificeerde relaties",
    outputVelden: ["relaties"]
  },
  {
    titel: "Tijdlijn Constructie",
    beschrijving: "Maakt chronologische mapping",
    outputVelden: ["tijdlijn", "kritiekePeriodes"]
  },
  {
    titel: "Visualisatie Voorbereiding",
    beschrijving: "Structureert data voor visualisatie",
    outputVelden: ["visualisatieElementen"]
  },
  {
    titel: "Tijdlijn Visualisatie",
    beschrijving: "Toont chronologisch verloop van de zaak",
    isVisualisatie: true,
    visualisatieComponent: TijdlijnComponent,
    dataBron: "stap4",
    outputVelden: []
  },
  {
    titel: "Netwerk Visualisatie",
    beschrijving: "Toont netwerk van partijen en hun relaties",
    isVisualisatie: true,
    visualisatieComponent: RelationshipsComponent,
    dataBron: "stap4",
    outputVelden: []
  }
];

// StapKaart Component
const StapKaart = ({
  stap,
  index,
  huidigeStap,
  resultaten,
  bewerkPrompt,
  setBewerkPrompt,
  prompts,
  handlePromptBewerking,
  handleJsonUpdate,
  onVisualize,
  activeVisualizations = new Set()
}) => {
  const isVisualisatieStap = stap.isVisualisatie;
  const hasData = resultaten[`stap${index + 1}`]?.data;
  const isManualInput = hasData && resultaten[`stap${index + 1}`]?.handmatig;

  const getVisualisatieData = () => {
    if (!isVisualisatieStap) return null;
    return resultaten[`stap${index + 1}`]?.data || resultaten.stap4?.data;
  };

  const visualisatieData = getVisualisatieData();
  const VisualisatieComponent = stap.visualisatieComponent;

  const isVisualizationActive = (index) => {
    return activeVisualizations instanceof Set && activeVisualizations.has(index);
  };

  const shouldShowVisualization = isVisualisatieStap &&
    isVisualizationActive(index) &&
    visualisatieData !== null &&
    VisualisatieComponent !== undefined;

  return (
    <Card className={`${index === huidigeStap ? "border-blue-500" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-medium">
              Stap {index + 1}: {stap.titel}
            </h3>
            <p className="text-sm text-gray-500">{stap.beschrijving}</p>
          </div>
          <div className="flex space-x-2">
            {!isVisualisatieStap && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setBewerkPrompt(!bewerkPrompt)}
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Bewerk Prompts
              </Button>
            )}
            <VisualizationControls
              index={index}
              hasData={hasData}
              onVisualize={onVisualize}
              activeVisualizations={activeVisualizations}
            />
          </div>
        </div>

        {!isVisualisatieStap && bewerkPrompt && (
          <PromptEditor
            index={index}
            prompts={prompts}
            handlePromptBewerking={handlePromptBewerking}
          />
        )}

        {isVisualisatieStap ? (
          shouldShowVisualization && VisualisatieComponent ? (
            <VisualisatieComponent data={visualisatieData} />
          ) : (
            <div className="text-gray-500 italic">
              {resultaten.stap4?.data ?
                `Klik op '${stap.titel === "Tijdlijn Visualisatie" ? "Tijdlijn" : "Netwerk"}' bij stap 4 om de visualisatie te tonen.` :
                "Geen data beschikbaar voor visualisatie. Doorloop eerst de vorige stappen of voer handmatig data in."}
            </div>
          )
        ) : (
          <div>
            {resultaten[`stap${index + 1}`]?.data && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium flex items-center">
                    Huidige Resultaten:
                    {isManualInput && (
                      <span className="ml-2 text-sm text-blue-600">(Handmatig ingevoerd)</span>
                    )}
                    {!isManualInput && resultaten[`stap${index + 1}`]?.provider && (
                      <span className={`ml-2 text-sm px-2 py-0.5 rounded ${resultaten[`stap${index + 1}`].provider === "claude"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-green-100 text-green-700"
                        }`}>
                        {resultaten[`stap${index + 1}`].provider === "claude" ? "Claude (Anthropic)" : "GPT-4 (OpenAI)"}
                      </span>
                    )}
                  </h4>
                </div>
                <pre className="bg-gray-50 p-4 rounded-md text-xs font-mono whitespace-pre-wrap">
                  {JSON.stringify(resultaten[`stap${index + 1}`].data, null, 2)}
                </pre>
              </div>
            )}

            <ManualJsonInput
              stepNumber={index + 1}
              currentData={resultaten[`stap${index + 1}`]?.data}
              onUpdate={handleJsonUpdate}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
// Main Component
const JuridischePipelineTester = () => {
  const [selectedProvider, setSelectedProvider] = useState("claude");
  const [ecliInput, setEcliInput] = useState("");
  const [rawCaseText, setRawCaseText] = useState("");

  const [invoer, setInvoer] = useState("");
  const [huidigeStap, setHuidigeStap] = useState(0);
  const [resultaten, setResultaten] = useState({
    stap1: null,
    stap2: null,
    stap3: null,
    stap4: null,
    stap5: null,
    stap6: null,
  });
  const [laden, setLaden] = useState(false);
  const [fout, setFout] = useState(null);
  const [actiefTab, setActiefTab] = useState("pipeline");
  const [prompts, setPrompts] = useState({
    system: {},
    user: {},
  });
  const [bewerkPrompt, setBewerkPrompt] = useState(false);
  const [activeVisualizations, setActiveVisualizations] = useState(() => new Set());
  const [fetchingCase, setFetchingCase] = useState(false);


  useEffect(() => {
    const laadPrompts = async () => {
      try {
        const { systemPrompts, userPrompts } = await import("@/lib/prompts");
        setPrompts({
          system: systemPrompts,
          user: userPrompts,
        });
      } catch (error) {
        console.error("Fout bij laden prompts:", error);
      }
    };
    laadPrompts();
  }, []);

  useEffect(() => {
    console.log("Current step changed:", huidigeStap);
    console.log("Current results:", resultaten);
  }, [huidigeStap, resultaten]);

  const handleJsonUpdate = (stepNumber, newData) => {
    console.log('Updating JSON for step:', stepNumber, newData);
    setResultaten(prev => ({
      ...prev,
      [`stap${stepNumber}`]: {
        verwerkt: new Date().toISOString(),
        data: newData,
        handmatig: true  // Always set this flag for manual updates
      }
    }));
  };

  const handleInvoerWijziging = (e) => {
    setInvoer(e.target.value);
    setFout(null);
  };

  const handlePromptBewerking = (stap, type, waarde) => {
    setPrompts((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [`stap${stap}`]: waarde,
      },
    }));
  };

  const extraheerRelevanteData = (data, stap) => {
    const relevanteVelden = pipelineStappen[stap].outputVelden;
    return _.pick(data, relevanteVelden);
  };

  const combineerVorigeStapResultaten = (huidigeStap) => {
    const vorigeResultaten = {};
    for (let i = 0; i < huidigeStap; i++) {
      if (resultaten[`stap${i + 1}`]?.data) {
        Object.assign(vorigeResultaten, extraheerRelevanteData(resultaten[`stap${i + 1}`].data, i));
      }
    }
    return vorigeResultaten;
  };

  const handleVisualize = (stepNumber) => {
    console.log("handleVisualize called for step:", stepNumber);

    // First check if we have valid data to visualize
    if (!resultaten.stap4?.data) {
      console.log("No visualization data available");
      setFout("Geen visualisatie data beschikbaar");
      return;
    }

    const sourceData = resultaten.stap4.data;
    const isCurrentlyActive = activeVisualizations.has(stepNumber);

    setActiveVisualizations(prev => {
      const newSet = new Set(prev);
      if (isCurrentlyActive) {
        newSet.delete(stepNumber);
      } else {
        newSet.add(stepNumber);
      }
      return newSet;
    });

    setResultaten(prev => {
      const newResults = { ...prev };

      if (isCurrentlyActive) {
        newResults[`stap${stepNumber}`] = null;
      } else {
        newResults[`stap${stepNumber}`] = {
          verwerkt: new Date().toISOString(),
          data: sourceData,
          handmatig: prev.stap4.handmatig,
          provider: prev.stap4.provider
        };
      }

      return newResults;
    });

    console.log("Visualization toggled for step:", stepNumber);
  };

  const fetchCaseText = async () => {
    if (!ecliInput.trim()) {
      setFout("Voer eerst een ECLI nummer in");
      return;
    }

    setFetchingCase(true);
    setFout(null);

    try {
      const response = await fetch(`https://test.feitlijn.nl/api/get_raw_ecli_data/${ecliInput}`);

      if (!response.ok) {
        throw new Error(`HTTP fout! status: ${response.status}. Controleer het ECLI nummer of probeer het later opnieuw.`);
      }

      const data = await response.json();
      setRawCaseText(data.raw_text);
    } catch (error) {
      console.error("Error fetching case:", error);
      setFout(error.message);
    } finally {
      setFetchingCase(false);
    }
  };

  const verwerkStap = async () => {
    if (huidigeStap === 0 && !rawCaseText) {
      setFout("Haal eerst de zaaktekst op met een ECLI nummer");
      return;
    }

    if (!rawCaseText && !resultaten[`stap${huidigeStap + 1}`]?.data) {
      setFout("Voer eerst een zaaktekst in of vul handmatig JSON data in");
      return;
    }

    setLaden(true);
    setFout(null);

    try {
      const huidigeStapInfo = pipelineStappen[huidigeStap];

      // Handle visualization steps
      if (huidigeStapInfo.isVisualisatie) {
        if (!resultaten.stap4?.data) {
          setFout("Geen visualisatie data beschikbaar. Voer eerst stap 4 uit.");
          return;
        }
        handleVisualize(huidigeStap + 1);
        setLaden(false);
        return;
      }

      // Use existing manual input if available
      if (resultaten[`stap${huidigeStap + 1}`]?.data) {
        if (huidigeStap < pipelineStappen.length - 1) {
          setHuidigeStap(prev => prev + 1);
        }
        setLaden(false);
        return;
      }

      // Process with AI provider
      const vorigeResultaten = combineerVorigeStapResultaten(huidigeStap);

      const response = await fetch(`/api/${selectedProvider}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stap: huidigeStap + 1,
          invoer: rawCaseText,
          vorigeResultaten,
          systeemPrompt: prompts.system[`stap${huidigeStap + 1}`],
          gebruikerPrompt: prompts.user[`stap${huidigeStap + 1}`]
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP fout! status: ${response.status}`);
      }

      const stapResultaat = await response.json();
      const relevanteData = extraheerRelevanteData(stapResultaat, huidigeStap);

      setResultaten(prev => ({
        ...prev,
        [`stap${huidigeStap + 1}`]: {
          verwerkt: new Date().toISOString(),
          data: relevanteData,
          provider: selectedProvider
        }
      }));

      if (huidigeStap < pipelineStappen.length - 1) {
        setHuidigeStap(prev => prev + 1);
      }

    } catch (err) {
      console.error("Verwerkingsfout:", err);
      setFout(err.message || "Fout bij verwerken stap");
    } finally {
      setLaden(false);
    }
  };

  const resetPipeline = () => {
    setInvoer("");
    setHuidigeStap(0);
    setResultaten({
      stap1: null,
      stap2: null,
      stap3: null,
      stap4: null,
      stap5: null,
      stap6: null,
    });
    setActiveVisualizations(new Set());
    setFout(null);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>Juridische Relatie Pipeline</span>
            <ProviderSelect
              selectedProvider={selectedProvider}
              onProviderChange={setSelectedProvider}
            />
          </div>

        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* ECLI Input Section */}
          <div className="space-y-4 border-b pb-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                ECLI Nummer
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={ecliInput}
                  onChange={(e) => setEcliInput(e.target.value)}
                  placeholder="Bijv: ECLI:NL:RBDHA:2024:123"
                  className="flex-1 font-mono text-sm border rounded p-2"
                />
                <Button
                  onClick={fetchCaseText}
                  disabled={fetchingCase || !ecliInput.trim()}
                >
                  {fetchingCase ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4 mr-2" />
                  )}
                  Haal Zaak Op
                </Button>
              </div>
            </div>

            {/* Raw Case Text Display */}
            {rawCaseText && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Zaaktekst
                </label>
                <Textarea
                  value={rawCaseText}
                  onChange={(e) => setRawCaseText(e.target.value)}
                  rows={8}
                  className="font-mono text-sm"
                  placeholder="Zaaktekst wordt hier getoond..."
                />
              </div>
            )}
          </div>

          {/* Analysis Controls */}
          <div className="flex space-x-2">
            <Button
              onClick={verwerkStap}
              disabled={laden || (!rawCaseText && !resultaten[`stap${huidigeStap + 1}`]?.data)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {laden ? (
                <span className="flex items-center">
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Verwerken...
                </span>
              ) : (
                <span className="flex items-center">
                  <Play className="w-4 h-4 mr-2" />
                  {`Verwerk Stap ${huidigeStap + 1}`}
                </span>
              )}
            </Button>
            <Button variant="outline" onClick={resetPipeline}>
              Reset
            </Button>
          </div>

          {/* Error Display */}
          {fout && (
            <Alert variant="destructive">
              <AlertDescription>{fout}</AlertDescription>
            </Alert>
          )}

          {/* Pipeline Steps */}
          <div className="space-y-4">
            {pipelineStappen.map((stap, index) => (
              <StapKaart
                key={index}
                stap={stap}
                index={index}
                huidigeStap={huidigeStap}
                resultaten={resultaten}
                bewerkPrompt={bewerkPrompt}
                setBewerkPrompt={setBewerkPrompt}
                prompts={prompts}
                handlePromptBewerking={handlePromptBewerking}
                handleJsonUpdate={handleJsonUpdate}
                onVisualize={handleVisualize}
                activeVisualizations={activeVisualizations}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JuridischePipelineTester;
