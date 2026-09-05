'use client';

import { useSearchParams } from 'next/navigation';

import { StarIcon } from '@/components/icons';
import { getWidgetColor, getWidgetTheme } from '@/lib/widgets/config';
import type { WidgetProps } from '@/types/widgets.types';

import MoonGlowBackground from '../ui/MoonGlowBackgrount';

export default function TasksOverviewPreview({ theme = 'dark', color = 'purple' }: WidgetProps) {
    const searchParams = useSearchParams();
    const urlTheme = searchParams.get('theme');
    const urlColor = searchParams.get('color');

    const resolvedTheme = urlTheme ? getWidgetTheme(urlTheme) : theme;
    const resolvedColor = urlColor ? getWidgetColor(urlColor) : color;

    return (
        <div
            data-theme={resolvedTheme}
            data-color={resolvedColor}
            className="relative flex h-107.5 w-98 flex-col justify-center overflow-hidden rounded-4xl bg-widget-background shadow-[0_0_32px_0] shadow-[#0F0E0E]/20"
        >
            <div className="relative z-10 flex flex-col items-center justify-center gap-5 pb-3">
                <div className="flex items-center gap-3.5 self-start px-10">
                    <StarIcon className="h-6 w-6 text-widget-accent" />
                    <h2 className="font-orbitron text-2xl text-widget-foreground">Tasks</h2>
                </div>
                <div className="drop-shadow-[0_2px_8px_rgba(0, 0, 0, 0.25)] flex h-32 w-85.5 items-center justify-center gap-6 rounded-2xl border border-widget-foreground/15 bg-notion-background/20 shadow-[inset_0_0_16px_1px] shadow-widget-foreground/15 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-[3px] text-widget-foreground">
                        <span className="font-orbitron text-[40px]">24</span>
                        <span className="rounded-full border border-widget-foreground bg-widget-foreground/20 px-2 py-0.5 text-sm tracking-[1.4px] uppercase">
                            Total
                        </span>
                    </div>
                    <div className="flex flex-col items-center gap-[3px] text-[#FFA600]">
                        <span className="font-orbitron text-[40px]">14</span>
                        <span className="rounded-full border border-[#FFA600] bg-[#FFA600]/20 px-2 py-0.5 text-sm tracking-[1.4px] uppercase">
                            On Going
                        </span>
                    </div>
                    <div className="flex flex-col items-center gap-[3px] text-[#00DC60]">
                        <span className="font-orbitron text-[40px]">10</span>
                        <span className="rounded-full border border-[#00DC60] bg-[#00DC60]/20 px-2 py-0.5 text-sm tracking-[1.4px] uppercase">
                            Done
                        </span>
                    </div>
                </div>

                <div className="drop-shadow-[0_2px_8px_rgba(0, 0, 0, 0.25)] flex h-20 w-85.5 flex-col items-center justify-center gap-3 rounded-2xl border border-widget-foreground/15 bg-notion-background/20 px-5 shadow-[inset_0_0_16px_1px] shadow-widget-foreground/15 backdrop-blur-sm">
                    <div className="flex w-full items-center justify-between font-sans text-xs text-widget-foreground uppercase">
                        <span className="font-medium tracking-[3px]">Completion Rate</span>
                        <span className="font-bold">42%</span>
                    </div>
                    <div className="shadow-pink h-3 w-full overflow-hidden rounded-full bg-widget-foreground/7 shadow-[inset_0_0_4px_0_rgba(0,0,0,0.30)]">
                        <div className="h-3 w-[42%] rounded-full bg-linear-to-r from-[#00DC60] to-[#00FF9A] transition-all"></div>
                    </div>
                    <div className="flex w-full items-center justify-between font-mono text-[9px] leading-[150%] text-widget-foreground/60">
                        <span>0</span>
                        <span>25</span>
                        <span>50</span>
                        <span>75</span>
                        <span>100</span>
                    </div>
                </div>
                <div className="drop-shadow-[0_2px_8px_rgba(0, 0, 0, 0.25)] flex h-11.5 w-85.5 items-center justify-between gap-3 rounded-2xl border border-widget-foreground/15 bg-notion-background/20 px-5 shadow-[inset_0_0_16px_1px] shadow-widget-foreground/15 backdrop-blur-sm">
                    <div className="flex items-center gap-2 font-sans text-xs font-medium tracking-[2px] text-widget-foreground">
                        <span className="text-sm">🔥</span> Current streak
                    </div>
                    <span className="font-mono text-xs font-bold text-[#FFA600]">7 days</span>
                </div>
            </div>
            <div className="absolute bottom-0 z-0">
                <MoonGlowBackground />
            </div>
        </div>
    );
}
