'use client';
import Image from 'next/image';
import { useState } from 'react';

import ClockDark from '@/assets/images/clock-dark.png';
import TaskOverviewDark from '@/assets/images/task-overview-dark.png';
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
                    preview={
                        <Image
                            src={ClockDark}
                            alt="Modern Clock widget preview"
                            width={300}
                            height={300}
                        />
                    }
                    onClick={() => {
                        setSelectedWidget('clock');
                        setSelectedWidgetName('Modern Clock');
                    }}
                />
                <WidgetCard
                    name="Tasks Overview"
                    preview={
                        <Image
                            src={TaskOverviewDark}
                            alt="Tasks Overview widget preview"
                            width={273}
                            height={300}
                        />
                    }
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
