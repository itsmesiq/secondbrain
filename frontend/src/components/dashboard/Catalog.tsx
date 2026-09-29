import Image from 'next/image';

import { WidgetCard } from '@/components/dashboard/WidgetCards';
import { Tasks } from '@/components/images';

type CatalogProps = {
    onClick: (widgetName: string) => void;
};

export default function Catalog({ onClick }: CatalogProps) {
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
                    onClick={() => onClick('tasks')}
                />

                <WidgetCard
                    id={2}
                    categories={['time']}
                    name="Task Overview"
                    preview={
                        <Image
                            src={Tasks}
                            alt="Task Overview widget preview"
                            width={330}
                            height={186}
                            unoptimized
                        />
                    }
                    onClick={() => onClick('task-overview')}
                />

                <WidgetCard
                    id={3}
                    categories={['time']}
                    name="Modern Clock"
                    preview={
                        <Image
                            src={Tasks}
                            alt="Modern Clock widget preview"
                            width={330}
                            height={186}
                            unoptimized
                        />
                    }
                    onClick={() => onClick('modern-clock')}
                />
            </div>
        </div>
    );
}
