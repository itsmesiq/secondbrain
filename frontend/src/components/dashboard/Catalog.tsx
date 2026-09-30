import Image from 'next/image';

import { WidgetCard } from '@/components/dashboard/WidgetCards';
import { Clock, ProfileCard, Tasks } from '@/components/images';

type CatalogProps = {
    onCopy: (widgetId: string) => void;
    copyingWidgetId: string | null;
    copiedWidgetId: string | null;
};

export default function Catalog({ onCopy, copyingWidgetId, copiedWidgetId }: CatalogProps) {
    return (
        <div className="mb-10 flex flex-col gap-4">
            <div className="flex items-center gap-3 uppercase">
                <span className="font-orbitron text-xs tracking-[3px] whitespace-nowrap text-text-muted">
                    AVAILABLE ARTIFACTS
                </span>
                <div className="h-[1px] w-full bg-[linear-gradient(90deg,#3A2060_0%,rgba(58,32,96,0.00)_100%)]"></div>
                <span className="font-mono text-[10px] tracking-[2px] whitespace-nowrap text-text-muted">
                    6 Modules
                </span>
            </div>
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                <WidgetCard
                    id={0}
                    categories={['time']}
                    name="Modern Clock"
                    preview={
                        <Image
                            src={Clock}
                            alt="Modern Clock widget preview"
                            width={330}
                            height={186}
                            unoptimized
                        />
                    }
                    onClick={() => onCopy('clock')}
                    isLoading={copyingWidgetId === 'clock'}
                    isCopied={copiedWidgetId === 'clock'}
                />

                <WidgetCard
                    id={1}
                    categories={['productivity']}
                    name="Tasks"
                    preview={
                        <Image
                            src={Tasks}
                            alt="Tasks widget preview"
                            width={330}
                            height={186}
                            unoptimized
                        />
                    }
                    onClick={() => onCopy('tasks')}
                    isLoading={copyingWidgetId === 'tasks'}
                    isCopied={copiedWidgetId === 'tasks'}
                />

                <WidgetCard
                    id={2}
                    categories={['etherea', 'system']}
                    name="Profile Card"
                    preview={
                        <Image
                            src={ProfileCard}
                            alt="Profile Card widget preview"
                            width={330}
                            height={186}
                            unoptimized
                        />
                    }
                    onClick={() => onCopy('profile')}
                    isLoading={copyingWidgetId === 'profile'}
                    isCopied={copiedWidgetId === 'profile'}
                />
            </div>
        </div>
    );
}
