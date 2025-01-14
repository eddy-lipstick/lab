'use client';

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit2, Play, RefreshCw, Save, Code, Eye, ArrowRight } from "lucide-react";
import ProviderSelect from '@/components/ProviderSelect';
import ManualJsonInput from '@/components/ManualJsonInput';
import TijdlijnComponent from '@/components/TijdlijnComponent';
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
    component: TijdlijnComponent,
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
  onVisualize

}) => {
  const isVisualisatieStap = stap.isVisualisatie;
  const hasManualInput = resultaten[`stap${index + 1}`]?.data && resultaten[`stap${index + 1}`]?.handmatig;
  const canVisualize = index === 4 && resultaten.stap4?.data;

  const getVisualisatieData = () => {
    if (!isVisualisatieStap) return null;

    if (stap.titel === "Tijdlijn Visualisatie") {
      return resultaten?.stap4?.data || null;
    }
    return null;
  };

  const visualisatieData = getVisualisatieData();
  const VisualisatieComponent = stap.component;

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
            {/* Add Visualize button when manual JSON is ready */}
            {index === 3 && hasManualInput && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onVisualize()}
                className="bg-blue-50"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Visualiseer
              </Button>
            )}
          </div>
        </div>

        {!isVisualisatieStap && bewerkPrompt && (
          <div className="space-y-4 mb-4">
            <Tabs defaultValue="system" className="w-full">
              <TabsList>
                <TabsTrigger value="system">Systeem Prompt</TabsTrigger>
                <TabsTrigger value="user">Gebruiker Prompt</TabsTrigger>
              </TabsList>
              <TabsContent value="system">
                <Textarea
                  value={prompts.system[`stap${index + 1}`]}
                  onChange={(e) =>
                    handlePromptBewerking(index + 1, "system", e.target.value)
                  }
                  rows={10}
                  className="font-mono text-sm"
                />
              </TabsContent>
              <TabsContent value="user">
                <Textarea
                  value={prompts.user[`stap${index + 1}`]}
                  onChange={(e) =>
                    handlePromptBewerking(index + 1, "user", e.target.value)
                  }
                  rows={10}
                  className="font-mono text-sm"
                />
              </TabsContent>
            </Tabs>
          </div>
        )}

        {isVisualisatieStap ? (
          visualisatieData && VisualisatieComponent ? (
            <VisualisatieComponent data={visualisatieData} />
          ) : (
            <div className="text-gray-500 italic">
              {canVisualize ?
                "Klik op 'Visualiseer' bij stap 4 om de tijdlijn te tonen." :
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
                    {hasManualInput && (
                      <span className="ml-2 text-sm text-blue-600">(Handmatig ingevoerd)</span>
                    )}
                    {!hasManualInput && resultaten[`stap${index + 1}`]?.provider && (
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
  const [invoer, setInvoer] = useState("");
  const [huidigeStap, setHuidigeStap] = useState(0);
  const [resultaten, setResultaten] = useState({
    stap1: null,
    stap2: null,
    stap3: null,
    stap4: null,
  });
  const [laden, setLaden] = useState(false);
  const [fout, setFout] = useState(null);
  const [actiefTab, setActiefTab] = useState("pipeline");
  const [prompts, setPrompts] = useState({
    system: {},
    user: {},
  });
  const [bewerkPrompt, setBewerkPrompt] = useState(false);

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
        handmatig: true
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

  const handleVisualize = () => {
    console.log("handleVisualize called");
    console.log("Current step 4 data:", resultaten.stap4?.data);
    console.log("Current huidigeStap:", huidigeStap);

    // Check if we have data to visualize
    if (!resultaten.stap4?.data) {
      console.log("No visualization data available");
      setFout("Geen visualisatie data beschikbaar");
      return;
    }

    console.log("Setting visualization data and advancing step");

    // Set visualization step data
    setResultaten(prev => {
      console.log("Previous results:", prev);
      return {
        ...prev,
        stap5: {
          verwerkt: new Date().toISOString(),
          data: prev.stap4.data,
          handmatig: prev.stap4.handmatig,
          provider: prev.stap4.provider
        }
      };
    });

    // Advance to visualization step
    setHuidigeStap(4);
    setFout(null);

    console.log("handleVisualize completed");
  };
  const verwerkStap = async () => {
    // Check if we have either text input OR manual JSON data for the current step
    if (!invoer && !resultaten[`stap${huidigeStap + 1}`]?.data) {
      setFout("Voer eerst een juridische tekst in of vul handmatig JSON data in");
      return;
    }

    setLaden(true);
    setFout(null);

    try {
      const huidigeStapInfo = pipelineStappen[huidigeStap];

      // Special handling for visualization step
      if (huidigeStapInfo.isVisualisatie) {
        if (!resultaten.stap4?.data) {
          setFout("Geen visualisatie data beschikbaar. Voer eerst stap 4 uit.");
          return;
        }
        setResultaten(prev => ({
          ...prev,
          [`stap${huidigeStap + 1}`]: {
            verwerkt: new Date().toISOString(),
            data: null,
            provider: prev.stap4.provider
          }
        }));
        setLaden(false);
        return;
      }

      // If we have manual input for this step, use it and proceed
      if (resultaten[`stap${huidigeStap + 1}`]?.data) {
        if (huidigeStap < pipelineStappen.length - 1) {
          setHuidigeStap(prev => prev + 1);
        }
        setLaden(false);
        return;
      }

      // Otherwise, proceed with normal API processing
      const vorigeResultaten = combineerVorigeStapResultaten(huidigeStap);

      const response = await fetch(`/api/${selectedProvider}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stap: huidigeStap + 1,
          invoer,
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
    });
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
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiefTab("pipeline")}
              className={actiefTab === "pipeline" ? "bg-blue-50" : ""}
            >
              <Code className="w-4 h-4 mr-2" />
              Pipeline
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiefTab("preview")}
              className={actiefTab === "preview" ? "bg-blue-50" : ""}
            >
              <Eye className="w-4 h-4 mr-2" />
              Voorbeeld
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Voer Juridische Tekst In
            </label>
            <Textarea
              value={invoer}
              onChange={handleInvoerWijziging}
              rows={8}
              placeholder="Plak juridische tekst hier..."
              className="w-full font-mono text-sm"
            />
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={verwerkStap}
              // Only disable if we're loading OR we have neither text input NOR manual data
              disabled={laden || (!invoer && !resultaten[`stap${huidigeStap + 1}`]?.data)}
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

          {fout && (
            <Alert variant="destructive">
              <AlertDescription>{fout}</AlertDescription>
            </Alert>
          )}

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
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JuridischePipelineTester;
