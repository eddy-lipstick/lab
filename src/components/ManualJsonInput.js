'use client';

// components/ManualJsonInput.js
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Structure hints for each step
const STRUCTURE_HINTS = {
  4: {
    "visualisatieElementen": {
      "knooppunten": [
        {
          "id": "example-1",
          "type": "person",
          "label": "Example Person",
          "categorie": "natuurlijk_persoon",
          "belangrijkheid": 5,
          "groep": "example_group"
        }
      ],
      "relaties": [
        {
          "van": "example-1",
          "naar": "example-2",
          "type": "example_relation",
          "visueleEigenschappen": {
            "richting": "enkelzijdig",
            "sterkte": 3,
            "stijl": "vast",
            "kleurCategorie": "primary"
          }
        }
      ],
      "tijdlijnElementen": [],
      "visueleGroepen": []
    }
  }
};

const ManualJsonInput = ({ stepNumber, currentData, onUpdate }) => {
  const [jsonInput, setJsonInput] = useState(
    currentData ? JSON.stringify(currentData, null, 2) : ''
  );
  const [error, setError] = useState(null);

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      onUpdate(stepNumber, parsed);
      setError(null);
    } catch (err) {
      setError('Invalid JSON format: ' + err.message);
    }
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">JSON Input:</h4>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSave}
        >
          Toepassen
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        rows={15}
        className="font-mono text-sm"
        placeholder={`// Example structure for step ${stepNumber}:\n${JSON.stringify(STRUCTURE_HINTS[stepNumber] || {}, null, 2)}`}
      />
    </div>
  );
};

export default ManualJsonInput;