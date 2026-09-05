'use client';

import { Check, Clipboard, X } from 'lucide-react';
import { useState } from 'react';

import WidgetPreviewProps from './WidgetPreview';

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
    const [color, setColor] = useState('purple');
    const [embedUrl, setEmbedUrl] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

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

            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/widgets/${widgetId}?token=${encodeURIComponent(data.token)}&theme=${theme}&color=${encodeURIComponent(color)}`;

            setEmbedUrl(url);

            await navigator.clipboard.writeText(url);

            setIsCopied(true);
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
            <div className="relative w-max max-w-[1000px] rounded-4xl bg-surface p-8 shadow-2xl">
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

                <div className="flex justify-start gap-20">
                    <div className="w-max space-y-6">
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
                            <div className="flex items-center gap-4">
                                <label
                                    className={`h-8 w-12 cursor-pointer rounded-md bg-[#ab5aff] transition-transform duration-300 hover:scale-110 ${color === 'purple' ? 'outline-1 outline-offset-3 outline-foreground' : ''}`}
                                >
                                    <input
                                        type="radio"
                                        value={'purple'}
                                        name={color}
                                        className="hidden"
                                        onChange={(event) => setColor(event.target.value)}
                                    />
                                </label>

                                <label
                                    className={`h-8 w-12 cursor-pointer rounded-md bg-[#ff33d3] transition-transform duration-300 hover:scale-110 ${color === 'pink' ? 'outline-1 outline-offset-3 outline-foreground' : ''}`}
                                >
                                    <input
                                        type="radio"
                                        value={'pink'}
                                        name={color}
                                        className="hidden"
                                        onChange={(event) => setColor(event.target.value)}
                                    />
                                </label>

                                <label
                                    className={`h-8 w-12 cursor-pointer rounded-md bg-[#47ceff] transition-transform duration-300 hover:scale-110 ${color === 'blue' ? 'outline-1 outline-offset-3 outline-foreground' : ''}`}
                                >
                                    <input
                                        type="radio"
                                        value={'blue'}
                                        name={color}
                                        className="hidden"
                                        onChange={(event) => setColor(event.target.value)}
                                    />
                                </label>

                                <label
                                    className={`h-8 w-12 cursor-pointer rounded-md bg-[#c2ff6c] transition-transform duration-300 hover:scale-110 ${color === 'green' ? 'outline-1 outline-offset-3 outline-foreground' : ''}`}
                                >
                                    <input
                                        type="radio"
                                        value={'green'}
                                        name={color}
                                        className="hidden"
                                        onChange={(event) => setColor(event.target.value)}
                                    />
                                </label>

                                <label
                                    className={`h-8 w-12 cursor-pointer rounded-md bg-[#ffcb20] transition-transform duration-300 hover:scale-110 ${color === 'yellow' ? 'outline-1 outline-offset-3 outline-foreground' : ''}`}
                                >
                                    <input
                                        type="radio"
                                        value={'yellow'}
                                        name={color}
                                        className="hidden"
                                        onChange={(event) => setColor(event.target.value)}
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="max-w-80 border-t border-foreground/10 pt-6">
                            <h3 className="mb-3 font-sans text-sm font-semibold">Embed</h3>

                            {embedUrl && (
                                <div
                                    className={`mb-3 cursor-pointer rounded-xl border bg-foreground/5 p-4 transition-all ${isFocused ? 'border-foreground' : 'border-transparent'}`}
                                    onClick={() => setIsFocused((prev) => !prev)}
                                    onBlur={() => setIsFocused(false)}
                                    tabIndex={0}
                                >
                                    <p className={isFocused ? 'wrap-anywhere' : 'truncate'}>
                                        {embedUrl}
                                    </p>
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
                    <WidgetPreviewProps widgetId={widgetId} theme={theme} color={color} />
                </div>
            </div>
        </div>
    );
}
