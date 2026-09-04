'use client';
import { useState } from 'react';

import WidgetCard from '@/components/dashboard/WidgetCard';

import WidgetConfigModal from './WidgetConfigModal';

export default function WidgetCatalog() {
    const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
    return (
        <section>
            <h1 className="mb-14 font-sans text-4xl font-bold">⚡ Widgets</h1>

            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                <WidgetCard name="Modern Clock" onClick={() => setSelectedWidget('clock')} />
            </div>

            {selectedWidget === 'clock' && (
                <WidgetConfigModal
                    widgetId="clock"
                    widgetName="Modern Clock"
                    onClose={() => setSelectedWidget(null)}
                />
            )}
        </section>
    );
}
