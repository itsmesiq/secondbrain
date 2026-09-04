'use client';

import { Check, Clipboard, X } from 'lucide-react';
import { useState } from 'react';

interface WidgetConfigModalProps {
    widgetId: string;
    widgetName: string;
    onClose: () => void;
}

export default function WidgetConfigModal({
    widgetId,
    widgetName,
    onClose,
}: WidgetConfigModalProps) {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [color, setColor] = useState('#ab5aff');
    const [embedUrl, setEmbedUrl] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyEmbed = async () => {
        try {
            setIsGenerating(true);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/embed-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ widgetId }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate embed token');
            }

            const data = await response.json();

            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/widgets/${widgetId}?theme=${theme}&color=${encodeURIComponent(data.token)}`;

            setEmbedUrl(url);

            await navigator.clipboard.writeText(url);

            setIsCopied(true);

            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        } catch (error) {
            console.error('Error generating embed:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="relative w-full max-w-2xl rounded-4xl bg-surface p-8 shadow-2xl">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-5 right-5 cursor-pointer rounded-full p-2 transition-colors hover:bg-foreground/5"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="mb-8">
                    <h2 className="font-sans text-3xl font-bold">{widgetName}</h2>
                    <p className="mt-2 font-sans text-sm text-foreground/60">
                        Personalize seu widget e gere o código de embed.
                    </p>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="mb-3 font-sans text-sm font-semibold">Tema</h3>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setTheme('light')}
                                className={`cursor-pointer rounded-full border px-5 py-2 font-sans text-sm transition-colors ${theme === 'light' ? 'border-primary/30 bg-primary/10' : 'border-foreground/10 hover:border-primary/20'}`}
                            >
                                Claro
                            </button>
                            <button
                                type="button"
                                onClick={() => setTheme('dark')}
                                className={`cursor-pointer rounded-full border px-5 py-2 font-sans text-sm transition-colors ${theme === 'dark' ? 'border-primary/30 bg-primary/10' : 'border-foreground/10 hover:border-primary/20'}`}
                            >
                                Escuro
                            </button>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-3 font-sans text-sm font-semibold">Cor</h3>
                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                value={color}
                                onChange={(event) => setColor(event.target.value)}
                                className="h-10 w-16 cursor-pointer rounded-lg border-0 bg-transparent"
                            />
                            <span className="font-mono text-sm text-foreground/60">{color}</span>
                        </div>
                    </div>

                    <div className="border-t border-foreground/10 pt-6">
                        <h3 className="mb-3 font-sans text-sm font-semibold">Embed</h3>

                        {embedUrl && (
                            <div className="mb-3 rounded-xl bg-foreground/5 p-4">
                                <p>{embedUrl}</p>
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={handleCopyEmbed}
                            disabled={isGenerating}
                            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 font-sans text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isCopied ? (
                                <>
                                    <Check className="h-4 w-4" />
                                    Embed copiado
                                </>
                            ) : (
                                <>
                                    <Clipboard className="h-4 w-4" />
                                    {isGenerating ? 'Gerando embed...' : 'Copiar embed'}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
