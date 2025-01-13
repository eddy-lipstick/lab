// src/app/api/test-env/route.js

import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        hasKey: !!process.env.CLAUDE_API_KEY,
        keyLength: process.env.CLAUDE_API_KEY?.length || 0,
    });
}