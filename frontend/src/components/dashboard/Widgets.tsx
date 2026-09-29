'use client';
import { useState } from 'react';

import Catalog from './Catalog';
import Featured from './Featured';
import WidgetConfigModal from './WidgetConfigModal';

export default function WidgetCatalog() {
    const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
    const [selectedWidgetName, setSelectedWidgetName] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    return (
        <section>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <div className="h-6 w-0.5 bg-etherea-purple shadow-[0_0_6px] shadow-etherea-purple"></div>
                    <h1 className="font-orbitron text-3xl uppercase">Widgets</h1>
                </div>
                <p className="font-mono text-sm tracking-[2px] text-text-muted">
                    Equip your workspace with artifacts from Etherea.
                </p>
            </div>

            <div className="mt-8 mb-8 flex items-center gap-1 border-b border-stroke-secondary pb-8">
                <button
                    type="button"
                    className={`border px-3.5 py-1.5 font-mono text-[10px] tracking-[2px] uppercase ${selectedCategory === 'all' ? 'border-etherea-purple bg-etherea-purple/10 text-foreground' : 'border-text-muted/60 text-text-muted/60'}`}
                >
                    All
                </button>
                <button
                    type="button"
                    className={`border px-3.5 py-1.5 font-mono text-[10px] tracking-[2px] uppercase ${selectedCategory === 'productivity' ? 'border-etherea-purple bg-etherea-purple/10 text-foreground' : 'border-text-muted/60 text-text-muted/60'}`}
                >
                    Productivity
                </button>
                <button
                    type="button"
                    className={`border px-3.5 py-1.5 font-mono text-[10px] tracking-[2px] uppercase ${selectedCategory === 'time' ? 'border-etherea-purple bg-etherea-purple/10 text-foreground' : 'border-text-muted/60 text-text-muted/60'}`}
                >
                    Time
                </button>
                <button
                    type="button"
                    className={`border px-3.5 py-1.5 font-mono text-[10px] tracking-[2px] uppercase ${selectedCategory === 'tasks' ? 'border-etherea-purple bg-etherea-purple/10 text-foreground' : 'border-text-muted/60 text-text-muted/60'}`}
                >
                    Tasks
                </button>
                <button
                    type="button"
                    className={`border px-3.5 py-1.5 font-mono text-[10px] tracking-[2px] uppercase ${selectedCategory === 'habits' ? 'border-etherea-purple bg-etherea-purple/10 text-foreground' : 'border-text-muted/60 text-text-muted/60'}`}
                >
                    Habits
                </button>
                <button
                    type="button"
                    className={`border px-3.5 py-1.5 font-mono text-[10px] tracking-[2px] uppercase ${selectedCategory === 'focus' ? 'border-etherea-purple bg-etherea-purple/10 text-foreground' : 'border-text-muted/60 text-text-muted/60'}`}
                >
                    Focus
                </button>
            </div>

            <Featured
                setSelectedWidget={setSelectedWidget}
                setSelectedWidgetName={setSelectedWidgetName}
            />

            <Catalog onClick={setSelectedWidget} />

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
