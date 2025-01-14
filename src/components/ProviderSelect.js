// components/ProviderSelect.js
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProviderSelect = ({ selectedProvider, onProviderChange }) => {
    return (
        <Select value={selectedProvider} onValueChange={onProviderChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Kies AI Provider" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="claude">Claude (Anthropic)</SelectItem>
                <SelectItem value="openai">GPT-4 (OpenAI)</SelectItem>
            </SelectContent>
        </Select>
    );
};

export default ProviderSelect;