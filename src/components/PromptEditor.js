import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const PromptEditor = ({ index, prompts, handlePromptBewerking }) => (
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
);

export default PromptEditor;
