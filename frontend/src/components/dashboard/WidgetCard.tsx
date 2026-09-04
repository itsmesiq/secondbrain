import Image from 'next/image';

import ClockDark from '@/assets/images/clock-dark.png';

interface WidgetCardProps {
    name: string;
    onClick: () => void;
}

export default function WidgetCard({ name, onClick }: WidgetCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex cursor-pointer flex-col items-center gap-3 rounded-4xl border border-transparent bg-surface px-6 py-8 shadow-lg transition-all duration-500 hover:scale-103 hover:border-primary/20 hover:shadow-primary/8"
        >
            <Image src={ClockDark} alt={`${name} widget preview`} width={300} height={300} />
            <h3 className="text-center font-mono text-xl font-semibold">{name}</h3>
        </button>
    );
}
