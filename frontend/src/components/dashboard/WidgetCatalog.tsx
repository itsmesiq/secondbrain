'use client';
import { useState } from 'react';

import WidgetCard from '@/components/dashboard/WidgetCard';

import WidgetConfigModal from './WidgetConfigModal';

export default function WidgetCatalog() {
    const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
    const [selectedWidgetName, setSelectedWidgetName] = useState<string | null>(null);

    return (
        <section>
            <h1 className="mb-14 font-sans text-4xl font-bold">⚡ Widgets</h1>

            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                <WidgetCard
                    name="Modern Clock"
                    onClick={() => {
                        setSelectedWidget('clock');
                        setSelectedWidgetName('Modern Clock');
                    }}
                />
                <WidgetCard
                    name="Tasks Overview"
                    onClick={() => {
                        setSelectedWidget('tasks-overview');
                        setSelectedWidgetName('Tasks Overview');
                    }}
                />
            </div>

            {selectedWidget && (
                <WidgetConfigModal
                    widgetId={selectedWidget}
                    widgetName={selectedWidgetName!}
                    onClose={() => {
                        setSelectedWidget(null);
                        setSelectedWidgetName(null);
                    }}
                />
            )}
        </section>
    );
}
