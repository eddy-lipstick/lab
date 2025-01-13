"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { callClaude } from "@/services/claude-api";

const PipelineTester = () => {
  const [input, setInput] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [results, setResults] = useState({
    step1: null,
    step2: null,
    step3: null,
    step4: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const steps = [
    {
      title: "Initial Context & Party Detection",
      description: "Identifies case type, parties, and basic relationships",
    },
    {
      title: "Relationship Analysis",
      description: "Deep analysis of identified relationships",
    },
    {
      title: "Timeline Construction",
      description: "Creates chronological mapping",
    },
    {
      title: "Visualization Preparation",
      description: "Structures data for visualization",
    },
  ];

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setError(null);
  };

  const processStep = async () => {
    if (!input) {
      setError("Please enter legal text to analyze");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const previousResult =
        currentStep > 0 ? results[`step${currentStep}`]?.data : null;
      const stepResult = await callClaude(
        currentStep + 1,
        input,
        previousResult
      );

      const newResults = { ...results };
      newResults[`step${currentStep + 1}`] = {
        processed: new Date().toISOString(),
        data: stepResult,
      };

      setResults(newResults);

      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Processing error:", err);
      setError(err.message || "Error processing step");
    } finally {
      setLoading(false);
    }
  };
  const resetPipeline = () => {
    setInput("");
    setCurrentStep(0);
    setResults({
      step1: null,
      step2: null,
      step3: null,
      step4: null,
    });
    setError(null);
  };

  const [stepProgress, setStepProgress] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
  });

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Legal Relationship Pipeline Tester</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Enter Legal Text
              </label>
              <Textarea
                value={input}
                onChange={handleInputChange}
                rows={10}
                placeholder="Paste legal text here..."
                className="w-full"
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={processStep} disabled={loading || !input}>
                {loading ? "Processing..." : `Process Step ${currentStep + 1}`}
              </Button>
              <Button variant="outline" onClick={resetPipeline}>
                Reset
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              {steps.map((step, index) => (
                <Card
                  key={index}
                  className={`${
                    index === currentStep ? "border-blue-500" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">
                          Step {index + 1}: {step.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {step.description}
                        </p>
                      </div>
                      <div className="text-sm">
                        {loading && index === currentStep ? (
                          <span className="text-blue-600">Processing...</span>
                        ) : results[`step${index + 1}`] ? (
                          <span className="text-green-600">✓ Completed</span>
                        ) : null}
                      </div>
                    </div>

                    {results[`step${index + 1}`] && (
                      <div className="mt-4">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <pre className="text-sm font-mono whitespace-pre-wrap break-words overflow-x-auto">
                            {typeof results[`step${index + 1}`].data ===
                            "string"
                              ? results[`step${index + 1}`].data
                              : JSON.stringify(
                                  results[`step${index + 1}`].data,
                                  null,
                                  2
                                )
                                  .split("\n")
                                  .map((line, i) => (
                                    <span key={i} className="block">
                                      {line}
                                    </span>
                                  ))}
                          </pre>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PipelineTester;
