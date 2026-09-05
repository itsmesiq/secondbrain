import { ReactNode } from 'react';

interface WidgetCardProps {
    name: string;
    preview: ReactNode;
    onClick: () => void;
}

export default function WidgetCard({ name, preview, onClick }: WidgetCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex cursor-pointer flex-col items-center gap-3 rounded-4xl border border-transparent bg-surface px-6 py-8 shadow-lg transition-all duration-500 hover:scale-103 hover:border-primary/20 hover:shadow-primary/8"
        >
            <div className="flex h-[300px] w-[300px] items-center justify-center">{preview}</div>
            <h3 className="text-center font-mono text-xl font-semibold">{name}</h3>
        </button>
    );
}
