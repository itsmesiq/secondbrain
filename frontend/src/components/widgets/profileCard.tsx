import { MoveRight } from 'lucide-react';
import Image from 'next/image';

import { PixelBorderBL, PixelBorderBR, PixelBorderTL, PixelBorderTR } from '../icons';

type ProfileInfo = {
    name: string;
    avatar: string;
    mysticOrder: string;
    level: number;
    xp: number;
    requiredXp: number;
    gold: number;
    title: string;
};

type levelBar = {
    id: number;
    percentage: number;
};

export default function ProfileCard({
    name,
    avatar,
    mysticOrder,
    level,
    xp,
    requiredXp,
    gold,
    title,
}: ProfileInfo) {
    const levelPercentage = (xp / requiredXp) * 100;
    const bars: levelBar[] = [];

    const filledBars = (percentage: number) => {
        const totalBars = 10;
        const totalPercentage = 100;
        let currentPercentage = percentage;
        let barPercentage: number;

        for (let i = 0; i < totalBars; i++) {
            if (currentPercentage >= totalBars) {
                bars.push({ id: i, percentage: totalPercentage });
                currentPercentage = currentPercentage - totalBars;
            } else if (currentPercentage === 0) {
                bars.push({ id: i, percentage: 0 });
            } else {
                barPercentage = (currentPercentage / totalBars) * totalPercentage;
                bars.push({ id: i, percentage: barPercentage });
                currentPercentage = 0;
            }
        }
    };

    filledBars(levelPercentage);

    return (
        <article className="border border-etherea-purple/30 bg-background">
            <div className="flex w-full items-center justify-between bg-etherea-purple/10 px-3.5 py-2.5">
                <div className="flex items-center gap-2">
                    <div className="size-1.5 bg-etherea-purple shadow-[0_0_6px_0_#9B30FF]"></div>
                    <div className="font-mono text-[10px] tracking-[3px] text-etherea-magenta uppercase">
                        Character
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <div className="size-1 bg-etherea-cyan shadow-[0_0_4px_0] shadow-etherea-cyan"></div>
                    <div className="size-1 bg-etherea-purple shadow-[0_0_4px_0] shadow-etherea-purple"></div>
                    <div className="size-1 bg-etherea-pink shadow-[0_0_4px_0] shadow-etherea-pink"></div>
                </div>
            </div>
            <div className="px-4 py-3">
                <div className="relative h-[342px] w-[310px] border border-etherea-purple shadow-[0_0_20px_0] shadow-etherea-purple/25">
                    <PixelBorderBL className="absolute bottom-0 left-0 z-20 size-2.5" />
                    <PixelBorderBR className="absolute right-0 bottom-0 z-20 size-2.5" />
                    <PixelBorderTL className="absolute top-0 left-0 z-20 size-2.5" />
                    <PixelBorderTR className="absolute top-0 right-0 z-20 size-2.5" />

                    <div className="absolute z-10 flex w-full items-center justify-between border-b border-etherea-purple/30 bg-surface/40 px-2.5 py-2 font-mono text-[10px] tracking-[2px] text-text-primary uppercase backdrop-blur-xs">
                        <span>{title}</span>
                        <span>\\ {mysticOrder} Order</span>
                    </div>
                    <div className="absolute z-5 h-full w-full bg-[radial-gradient(70.71%_70.71%_at_50%_50%,rgba(5,5,10,0.00)_40%,rgba(5,5,10,0.65)_100%)]"></div>
                    <Image
                        src={avatar}
                        alt={`Character ${title}`}
                        fill
                        sizes="310px"
                        className="object-cover object-top"
                    />
                </div>
            </div>
            <div className="h-[1px] w-full bg-[linear-gradient(90deg,rgba(42,31,74,0.00)_0%,#2A1F4A_20%,#9B30FF_50%,#2A1F4A_80%,rgba(42,31,74,0.00)_100%)]"></div>
            <div className="px-4 pt-3">
                <div className="flex items-center justify-between font-mono text-[10px] tracking-[2px] text-text-muted uppercase">
                    <span>Name</span>
                    <span>Level</span>
                </div>
                <div className="flex items-center justify-between font-mono text-lg tracking-[4px] text-text-primary uppercase">
                    <span>{name}</span>
                    <span className="text-etherea-purple">{String(level).padStart(2, '0')}</span>
                </div>
                <div className="mt-3">
                    <div className="flex items-center justify-between font-mono text-[10px] tracking-[2px] text-etherea-purple uppercase">
                        <div className="flex items-center gap-2">
                            <span>Lv.{String(level).padStart(2, '0')}</span>
                            <MoveRight className="size-3" />
                            <span>Lv.{String(level + 1).padStart(2, '0')}</span>
                        </div>
                        <span>{levelPercentage.toFixed(0)}%</span>
                    </div>
                    <div className="mt-1.5 flex items-center justify-between gap-1">
                        {bars.map((bar) => {
                            return (
                                <div key={bar.id} className="relative h-3 w-full">
                                    <div
                                        className="absolute inset-0 z-10 h-3 bg-etherea-purple shadow-[0_0_8px_0] shadow-etherea-purple"
                                        style={{ width: `${bar.percentage}%` }}
                                    ></div>
                                    <div className="relative z-0 h-3 w-full bg-text-muted/20"></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="mt-3 h-[1px] w-full bg-[linear-gradient(90deg,rgba(42,31,74,0.00)_0%,#2A1F4A_20%,#9B30FF_50%,#2A1F4A_80%,rgba(42,31,74,0.00)_100%)]"></div>
                <div className="flex items-center justify-between gap-0.5 bg-text-muted">
                    <div className="w-full bg-background py-3 pr-3.5 font-mono text-xs text-text-muted uppercase">
                        <div className="mb-1.5 flex items-center gap-2">
                            <span className="text-text-primary">Total XP</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-power-pink">{xp}</span>
                            <span className="text-power-pink/50">XP</span>
                        </div>
                    </div>
                    <div className="w-full bg-background py-3 pl-3.5 font-mono text-xs text-text-muted uppercase">
                        <div className="mb-1.5 flex items-center gap-2">
                            <span className="text-text-primary">Gold</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-body-yellow">{gold}</span>
                            <span className="text-body-yellow/50">G</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-full items-center justify-between bg-etherea-purple/5 px-3.5 py-2">
                <span className="font-mono text-[10px] tracking-[1px] text-text-muted uppercase">
                    Etheria v0.1
                </span>
                <div className="flex items-center gap-1">
                    <div className="size-1 bg-etherea-purple"></div>
                    <div className="size-1 bg-etherea-purple"></div>
                    <div className="size-1 bg-etherea-purple"></div>
                    <div className="size-1 bg-stroke-secondary"></div>
                    <div className="size-1 bg-stroke-secondary"></div>
                </div>
            </div>
        </article>
    );
}
