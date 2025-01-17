// app/echr-lab/page.js
import EchrSearchClient from '@/components/EchrSearchClient';

export const metadata = {
    title: 'ECHR Case Search Lab',
    description: 'Search and analyze cases from the European Court of Human Rights',
};

export default function EchrLabPage() {
    return (
        <div className="container mx-auto py-6">
            <EchrSearchClient />
        </div>
    );
}