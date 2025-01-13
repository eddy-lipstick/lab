// src/app/api/claude/route.js

import { NextResponse } from 'next/server';
import { systemPrompts, userPrompts } from '@/services/claude-api'; // Import your prompts

export async function POST(request) {
    try {
        const { step, legalText, previousResults } = await request.json();

        if (!process.env.CLAUDE_API_KEY) {
            return NextResponse.json(
                { error: "API key not configured" },
                { status: 500 }
            );
        }

        const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.CLAUDE_API_KEY,
                "anthropic-version": "2023-06-01"
            },
            body: JSON.stringify({
                model: "claude-3-5-sonnet-20241022",
                max_tokens: 8192,
                system: systemPrompts[`step${step}`], // Use the `system` prompt as a top-level parameter
                messages: [
                    {
                        role: "user",
                        content: userPrompts[`step${step}`]
                    },
                    ...(previousResults ? [{
                        role: "assistant",
                        content: `Previous analyses:\n${JSON.stringify(previousResults, null, 2)}`
                    }] : []),
                    {
                        role: "user",
                        content: legalText
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Claude API Error:", errorData);
            return NextResponse.json(errorData, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}