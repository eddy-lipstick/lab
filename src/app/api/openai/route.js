// app/api/openai/route.js
import { NextResponse } from 'next/server';
import { systemPrompts, userPrompts } from '@/lib/prompts';

export async function POST(request) {
    try {
        const { stap, invoer, vorigeResultaten, systeemPrompt, gebruikerPrompt } = await request.json();

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { fout: "OpenAI API sleutel niet geconfigureerd" },
                { status: 500 }
            );
        }

        // Gebruik aangepaste prompts indien aanwezig, anders gebruik defaults
        const definitieveSysteemPrompt = systeemPrompt || systemPrompts[`stap${stap}`];
        const definitieveGebruikerPrompt = gebruikerPrompt || userPrompts[`stap${stap}`];

        const messages = [
            {
                role: "system",
                content: definitieveSysteemPrompt
            },
            {
                role: "user",
                content: definitieveGebruikerPrompt
            }
        ];

        // Voeg vorige resultaten toe indien aanwezig
        if (vorigeResultaten) {
            messages.push({
                role: "assistant",
                content: `Vorige analyses:\n${JSON.stringify(vorigeResultaten, null, 2)}`
            });
        }

        // Voeg de juridische tekst toe als laatste gebruikersbericht
        messages.push({
            role: "user",
            content: invoer
        });

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4-turbo-preview",
                messages: messages,
                temperature: 0.2,
                max_tokens: 4000
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("OpenAI API Fout:", errorData);
            throw new Error(`OpenAI API Fout: ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();

        try {
            if (!data.choices?.[0]?.message?.content) {
                throw new Error("Ongeldige response structuur van OpenAI API");
            }

            const content = data.choices[0].message.content.trim();
            // Probeer het als JSON te parsen, verwijder eventuele BOM of whitespace
            const parsedContent = JSON.parse(content.replace(/^\uFEFF/, ''));
            return NextResponse.json(parsedContent);
        } catch (parseError) {
            console.error("Parse Fout:", parseError);
            return NextResponse.json({
                ruwe_content: data.choices?.[0]?.message?.content || "Geen content ontvangen",
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