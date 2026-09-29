import Image from 'next/image';

import { ClockDark } from '@/components/images';

import { FeaturedWidgetCard } from './WidgetCards';

type FeaturedProps = {
    setSelectedWidget: (widget: string | null) => void;
    setSelectedWidgetName: (name: string | null) => void;
};

export default function Featured({ setSelectedWidget, setSelectedWidgetName }: FeaturedProps) {
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
                        src={ClockDark}
                        alt="Modern Clock widget preview"
                        width={250}
                        height={250}
                        unoptimized
                    />
                }
                onClick={() => {
                    setSelectedWidget('clock');
                    setSelectedWidgetName('Modern Clock');
                }}
            />
        </div>
    );
}
