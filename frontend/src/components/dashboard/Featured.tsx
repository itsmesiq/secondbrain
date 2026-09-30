import Image from 'next/image';

import { ClockTransparent } from '@/components/images';

import { FeaturedWidgetCard } from './WidgetCards';

type FeaturedProps = {
    onCopy: (widgetId: string) => void;
    copyingWidgetId: string | null;
    copiedWidgetId: string | null;
};

export default function Featured({ onCopy, copyingWidgetId, copiedWidgetId }: FeaturedProps) {
    return (
        <div className="mb-10 flex flex-col gap-4">
            <div className="flex items-center gap-3 uppercase">
                <span className="font-orbitron text-xs tracking-[3px] whitespace-nowrap text-text-muted">
                    Featured Artifact
                </span>
                <div className="h-[1px] w-full bg-[linear-gradient(90deg,#3A2060_0%,rgba(58,32,96,0.00)_100%)]"></div>
                <span className="font-mono text-[10px] tracking-[2px] text-text-muted">
                    Recommended
                </span>
            </div>
            <FeaturedWidgetCard
                id={0}
                name={'Modern Clock'}
                categories={['time', 'system']}
                description={'A futuristic time artifact designed for your daily interface.'}
                preview={
                    <Image
                        src={ClockTransparent}
                        alt="Modern Clock widget preview"
                        width={232}
                        height={232}
                        unoptimized
                    />
                }
                onClick={() => onCopy('clock')}
                isLoading={copyingWidgetId === 'clock'}
                isCopied={copiedWidgetId === 'clock'}
            />
        </div>
    );
}
