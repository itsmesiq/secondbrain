import { Check, Clipboard, LoaderCircle, Plus } from 'lucide-react';
import { ReactNode } from 'react';

import { HUDCornersBL, HUDCornersBR, HUDCornersTL, HUDCornersTR } from '../icons';

interface WidgetCardProps {
    id: number;
    name: string;
    categories: string[];
    preview: ReactNode;
    onClick: () => void;
    isLoading?: boolean;
    isCopied?: boolean;
}

type FeaturedWidgetCardProps = {
    id: number;
    name: string;
    categories: string[];
    description: string;
    preview: ReactNode;
    onClick: () => void;
    isLoading?: boolean;
    isCopied?: boolean;
};

function CopyButton({
    onClick,
    isLoading = false,
    isCopied = false,
    featured = false,
}: {
    onClick: () => void;
    isLoading?: boolean;
    isCopied?: boolean;
    featured?: boolean;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={isLoading}
            className={
                featured
                    ? 'flex cursor-pointer items-center justify-center gap-1.5 border border-etherea-purple bg-etherea-purple/10 px-5 py-2.5 font-orbitron text-xs tracking-[2px] text-text-primary uppercase shadow-[0_0_12px_0_rgba(155,48,255,0.15)] transition-all duration-300 ease-in-out hover:bg-etherea-purple/25 hover:shadow-[0_0_8px_0_rgb(155,48,255)] disabled:cursor-not-allowed disabled:opacity-50'
                    : 'flex cursor-pointer items-center justify-center gap-1.5 border border-stroke-primary bg-etherea-purple/10 px-3 py-1.5 font-mono text-xs tracking-[2px] text-text-primary uppercase shadow-[0_0_6px_0_rgba(155,48,255,0.15)] transition-all duration-300 ease-in-out hover:border-etherea-purple hover:bg-etherea-purple/25 hover:shadow-[0_0_4px_0_rgb(155,48,255)] disabled:cursor-not-allowed disabled:opacity-50'
            }
        >
            {isLoading ? (
                <LoaderCircle className="size-3 animate-spin text-etherea-purple" />
            ) : isCopied ? (
                <Check className="size-3 text-success-green" />
            ) : featured ? (
                <Plus className="size-3 text-etherea-purple" />
            ) : (
                <Clipboard className="size-3 text-etherea-purple" />
            )}

            <span>
                {isLoading
                    ? 'Generating...'
                    : isCopied
                      ? 'Copied'
                      : featured
                        ? 'Add to Notion'
                        : 'Copy'}
            </span>
        </button>
    );
}

export function FeaturedWidgetCard({
    id,
    name,
    categories,
    description,
    preview,
    onClick,
    isLoading,
    isCopied,
}: FeaturedWidgetCardProps) {
    return (
        <div className="relative flex min-h-[260px] w-full items-center border border-stroke-secondary bg-surface">
            <HUDCornersBL className="absolute bottom-0 left-0 text-etherea-purple" />
            <HUDCornersBR className="absolute right-0 bottom-0 text-etherea-purple" />
            <HUDCornersTL className="absolute top-0 left-0 text-etherea-purple" />
            <HUDCornersTR className="absolute top-0 right-0 text-etherea-purple" />

            <div className="border-r border-stroke-secondary px-7 py-8 font-mono">
                <div className="flex flex-col gap-1 uppercase">
                    <span className="text-[10px] tracking-[1px] text-text-muted">
                        Artifact_{String(id).padStart(2, '0')}
                    </span>
                    <h3 className="font-orbitron text-base font-semibold tracking-[3px] text-foreground">
                        {name}
                    </h3>
                    <div className="mt-1 mb-4 flex items-center gap-2">
                        {categories.map((category) => (
                            <span
                                key={category}
                                className="border border-text-muted px-2 py-0.5 text-[10px] tracking-[2px] text-text-muted"
                            >
                                {category}
                            </span>
                        ))}
                    </div>
                </div>
                <p className="mb-5 max-w-[224px] text-xs tracking-[1px] text-text-muted">
                    {description}
                </p>
                <CopyButton onClick={onClick} isLoading={isLoading} isCopied={isCopied} featured />
            </div>
            <div className="flex flex-1 items-center justify-center bg-[radial-gradient(70.71%_70.71%_at_50%_50%,rgba(155,48,255,0.08)_0%,rgba(155,48,255,0.00)_70%)]">
                {preview}
            </div>
        </div>
    );
}

export function WidgetCard({
    id,
    name,
    categories,
    preview,
    onClick,
    isLoading,
    isCopied,
}: WidgetCardProps) {
    return (
        <div className="relative flex w-full flex-col items-center gap-3 border border-stroke-secondary bg-surface p-4 uppercase transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_12px_0_rgba(155,48,255,0.3)]">
            <HUDCornersBL className="absolute bottom-0 left-0 text-etherea-purple" />
            <HUDCornersBR className="absolute right-0 bottom-0 text-etherea-purple" />
            <HUDCornersTL className="absolute top-0 left-0 text-etherea-purple" />
            <HUDCornersTR className="absolute top-0 right-0 text-etherea-purple" />

            <div className="flex w-full items-start justify-between">
                <span className="font-mono text-[10px] tracking-[1px] text-text-muted">
                    Artifact_{String(id).padStart(2, '0')}
                </span>
                <div className="size-1.5 bg-text-muted"></div>
            </div>

            <div className="flex items-center justify-center">{preview}</div>
            <div className="flex w-full items-center justify-between">
                <div className="flex flex-col items-start">
                    <h3 className="m-0 p-0 text-center font-orbitron text-sm tracking-[2px] text-text-primary">
                        {name}
                    </h3>
                    <div className="flex items-center gap-1">
                        {categories.map((category) => (
                            <span
                                key={category}
                                className="text-[10px] tracking-[2px] text-text-muted"
                            >
                                {category}
                            </span>
                        ))}
                    </div>
                </div>
                <CopyButton onClick={onClick} isLoading={isLoading} isCopied={isCopied} />
            </div>
        </div>
    );
}
