// app/ecli-lab/page.js
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ECLIChatLab from '@/components/ECLIChatLab';

export default function ECLILabPage() {
    return (
        <div className="container mx-auto p-4">
            <Card className="w-full max-w-5xl mx-auto">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>ECLI Chat Lab</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ECLIChatLab />
                </CardContent>
            </Card>
        </div>
    );
}