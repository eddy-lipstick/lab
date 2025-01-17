'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Loader2, ArrowRight } from "lucide-react";

// Utility function to extract text from judgment sections
const extractText = (elements) => {
  return elements.map(el => {
    let text = el.content;
    if (el.elements && el.elements.length > 0) {
      text += ' ' + extractText(el.elements);
    }
    return text;
  }).join(' ');
};

const CaseDetails = ({ caseData }) => {
  const [activeSection, setActiveSection] = useState('procedure');

  // Function to find section by name
  const findSection = (sectionName) => {
    return caseData.judgment.find(section =>
      section.section_name?.toLowerCase() === sectionName.toLowerCase()
    );
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div>
            <div className="text-xl">{caseData.docname}</div>
            <div className="text-sm text-gray-500">
              Application: {caseData.appno} | Date: {new Date(caseData.judgementdate).toLocaleDateString()}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="procedure" className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="procedure">Procedure</TabsTrigger>
            <TabsTrigger value="facts">Facts</TabsTrigger>
            <TabsTrigger value="law">Law</TabsTrigger>
            <TabsTrigger value="conclusion">Conclusion</TabsTrigger>
          </TabsList>

          {['procedure', 'facts', 'law', 'conclusion'].map(sectionName => (
            <TabsContent key={sectionName} value={sectionName}>
              <div className="space-y-4">
                {findSection(sectionName) ? (
                  <div className="prose max-w-none">
                    {findSection(sectionName).elements.map((element, idx) => (
                      <div key={idx} className="mb-4">
                        <h3 className="font-bold mb-2">{element.content}</h3>
                        {element.elements.map((subElement, subIdx) => (
                          <p key={subIdx} className="mb-2">
                            {subElement.content}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No {sectionName} section available</p>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-6">
          <h3 className="font-medium mb-2">Case Metadata</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">ECLI:</span> {caseData.ecli}
            </div>
            <div>
              <span className="font-medium">Importance Level:</span> {caseData.importance}
            </div>
            <div>
              <span className="font-medium">Respondent:</span> {caseData.respondent}
            </div>
            <div>
              <span className="font-medium">Language:</span> {caseData.languageisocode}
            </div>
            {caseData.parties && (
              <div className="col-span-2">
                <span className="font-medium">Parties:</span> {caseData.parties.join(' v. ')}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const EchrSearchClient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [caseData, setCaseData] = useState(null);
  const [caseId, setCaseId] = useState('');

  const handleSearch = async () => {
    if (!caseId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/echr/case/${caseId}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch case: ${response.statusText}`);
      }

      const data = await response.json();
      setCaseData(data);
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>ECHR Case Search Lab</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <Input
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
                placeholder="Enter case ID (e.g., 001-95845)"
                className="flex-1"
              />
              <Button
                onClick={handleSearch}
                disabled={loading || !caseId}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Search className="w-4 h-4 mr-2" />
                )}
                Search
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {caseData && <CaseDetails caseData={caseData} />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EchrSearchClient;