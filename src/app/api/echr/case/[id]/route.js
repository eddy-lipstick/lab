// app/api/echr/case/[id]/route.js
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json(
                { error: 'Case ID is required' },
                { status: 400 }
            );
        }

        const response = await fetch(
            `https://echr-opendata.eu/api/v1/cases/${id}`,
            {
                headers: {
                    'Accept': 'application/json'
                },
                next: { revalidate: 3600 } // Cache for 1 hour
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error('ECHR API Error response:', errorText);
            return NextResponse.json(
                { error: `Failed to fetch case: ${response.status}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('ECHR Case API Error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch case details' },
            { status: 500 }
        );
    }
}