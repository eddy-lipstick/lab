// app/api/claude/route.js
import { NextResponse } from 'next/server';
import { systemPrompts, userPrompts } from '@/lib/prompts';

export async function POST(request) {
    try {
        const { stap, invoer, vorigeResultaten, systeemPrompt, gebruikerPrompt } = await request.json();

        if (!process.env.CLAUDE_API_KEY) {
            return NextResponse.json(
                { fout: "API sleutel niet geconfigureerd" },
                { status: 500 }
            );
        }

        // Gebruik aangepaste prompts indien aanwezig, anders gebruik defaults
        const definitieveSysteemPrompt = systeemPrompt || systemPrompts[`stap${stap}`];
        const definitieveGebruikerPrompt = gebruikerPrompt || userPrompts[`stap${stap}`];

        const berichten = [
            {
                role: "user",
                content: definitieveGebruikerPrompt
            }
        ];

        // Voeg vorige resultaten toe indien aanwezig
        if (vorigeResultaten) {
            berichten.push({
                role: "assistant",
                content: `Vorige analyses:\n${JSON.stringify(vorigeResultaten, null, 2)}`
            });
        }

        // Voeg de juridische tekst toe als laatste gebruikersbericht
        berichten.push({
            role: "user",
            content: invoer
        });

        const response = await fetch("https://api.anthropic.com/v1/complete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.CLAUDE_API_KEY,
                "anthropic-version": "2023-06-01"
            },
            body: JSON.stringify({
                model: "claude-2.1",
                max_tokens_to_sample: 4096,
                prompt: `\n\nHuman: ${definitieveSysteemPrompt}\n\nAssistant: I understand. I will help analyze the text according to those guidelines.\n\nHuman: ${berichten.map(m => m.content).join('\n\nAssistant: I understand.\n\nHuman: ')}\n\nAssistant:`,
                stop_sequences: ["\n\nHuman:"]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Claude API Fout:", errorData);
            throw new Error(`Claude API Fout: ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();

        // Haal de content uit Claude's response
        try {
            if (!data.completion) {
                throw new Error("Ongeldige response structuur van Claude API");
            }

            const content = data.completion.trim();
            // Probeer het als JSON te parsen, verwijder eventuele BOM of whitespace
            const parsedContent = JSON.parse(content.replace(/^\uFEFF/, ''));
            return NextResponse.json(parsedContent);
        } catch (parseError) {
            console.error("Parse Fout:", parseError);
            // Als parsen mislukt, return de ruwe content met foutdetails
            return NextResponse.json({
                ruwe_content: data.completion || "Geen content ontvangen",
                fout: "Kon response niet als JSON parsen",
                parse_fout: parseError.message
            });
        }

    } catch (error) {
        console.error("API Fout:", error);
        return NextResponse.json(
            {
                fout: error.message || "Onbekende fout opgetreden",
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            },
            { status: 500 }
        );
    }
}