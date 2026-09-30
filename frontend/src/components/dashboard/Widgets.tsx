'use client';
import { useState } from 'react';

import { useGenerateEmbedToken } from '@/lib/api/generated/endpoints/embed-token/embed-token';

import Catalog from './Catalog';
import Featured from './Featured';

export default function WidgetCatalog() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [copyingWidgetId, setCopyingWidgetId] = useState<string | null>(null);
    const [copiedWidgetId, setCopiedWidgetId] = useState<string | null>(null);
    const [copyError, setCopyError] = useState<string | null>(null);

    const { mutateAsync: generateEmbedToken } = useGenerateEmbedToken();

    const handleCopyEmbed = async (widgetId: string) => {
        try {
            setCopyingWidgetId(widgetId);
            setCopiedWidgetId(null);
            setCopyError(null);

            const response = await generateEmbedToken({
                data: { widgetId },
            });

            if (response.status !== 200) {
                throw new Error('Não foi possível gerar o token.');
            }

            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

            if (!baseUrl) {
                throw new Error('NEXT_PUBLIC_BASE_URL não está configurada.');
            }

            const embedUrl = new URL(`/widgets/${widgetId}`, baseUrl);
            embedUrl.searchParams.set('token', response.data.token);

            await navigator.clipboard.writeText(embedUrl.toString());

            setCopiedWidgetId(widgetId);
        } catch (error) {
            console.error('Error generating embed token:', error);
            setCopyError('Não foi possível gerar ou copiar o link. Tente novamente.');
        } finally {
            setCopyingWidgetId(null);
        }
    };

    const categories = [
        { value: 'all', label: 'All' },
        { value: 'productivity', label: 'Productivity' },
        { value: 'time', label: 'Time' },
        { value: 'tasks', label: 'Tasks' },
        { value: 'habits', label: 'Habits' },
        { value: 'focus', label: 'Focus' },
    ];

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
                {categories.map((category) => (
                    <button
                        key={category.value}
                        type="button"
                        onClick={() => setSelectedCategory(category.value)}
                        className={`border px-3.5 py-1.5 font-mono text-[10px] tracking-[2px] uppercase ${selectedCategory === category.value ? 'border-etherea-purple bg-etherea-purple/10 text-foreground' : 'border-text-muted/60 text-text-muted/60'}`}
                    >
                        {category.label}
                    </button>
                ))}
            </div>

            {copyError && (
                <div
                    role="alert"
                    className="mb-4 border border-power-pink/40 bg-power-pink/10 px-4 py-3 font-mono text-xs text-error-red"
                >
                    {copyError}
                </div>
            )}

            <Featured
                onCopy={handleCopyEmbed}
                copyingWidgetId={copyingWidgetId}
                copiedWidgetId={copiedWidgetId}
            />

            <Catalog
                onCopy={handleCopyEmbed}
                copyingWidgetId={copyingWidgetId}
                copiedWidgetId={copiedWidgetId}
            />
        </section>
    );
}
