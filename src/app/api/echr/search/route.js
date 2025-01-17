// app/api/echr/search/route.js
import { NextResponse } from 'next/server';

const ECHR_BASE_URL = 'https://echr-opendata.eu/api/v1';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchType = Object.keys(Object.fromEntries(searchParams))[0];
    const searchValue = searchParams.get(searchType);

    if (!searchType || !searchValue) {
      return NextResponse.json(
        { error: 'Missing search parameters' },
        { status: 400 }
      );
    }

    // Use node-fetch or native fetch with a custom agent if needed
    const response = await fetch(
      `${ECHR_BASE_URL}/cases/search?${searchType}=${encodeURIComponent(searchValue)}`,
      {
        headers: {
          'Accept': 'application/json',
          // Add any required API headers here
        },
        // Important: disable automatic content-type handling
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`ECHR API Error: ${response.status}`);
    }

    const data = await response.json();

    // Set CORS headers in the response
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('ECHR Search API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to search cases' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}