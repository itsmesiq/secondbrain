'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getWidgetColor, getWidgetTheme } from '@/lib/widgets/config';
import type { WidgetProps } from '@/types/widgets.types';

import { HUDCornersBL, HUDCornersBR, HUDCornersTL, HUDCornersTR } from '../icons';

export default function Clock({ theme = 'dark', color = 'purple' }: WidgetProps) {
    const searchParams = useSearchParams();
    const urlTheme = searchParams.get('theme');
    const urlColor = searchParams.get('color');

    const resolvedTheme = urlTheme ? getWidgetTheme(urlTheme) : theme;
    const resolvedColor = urlColor ? getWidgetColor(urlColor) : color;

    const [date, setDate] = useState<Date | null>(null);

    useEffect(() => {
        const updateDate = () => {
            setDate(new Date());
        };

        updateDate();

        const interval = setInterval(updateDate, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!date) {
        return null;
    }

    const hours = date
        .toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            hour12: false,
        })
        .slice(0, 2);

    const minutes = date
        .toLocaleTimeString('pt-BR', {
            minute: '2-digit',
            hour12: false,
        })
        .slice(-2);

    const formattedDate = date
        .toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
        })
        .replaceAll('/', '.');

    const weekday = date
        .toLocaleDateString('pt-BR', {
            weekday: 'long',
        })
        .split('-')[0];

    const formattedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1, 3);

    return (
        <div
            data-theme={resolvedTheme}
            data-color={resolvedColor}
            className="relative flex h-80 w-72 flex-col items-center justify-between overflow-hidden border border-etherea-purple/40 bg-[radial-gradient(70.71%_70.71%_at_50%_50%,rgba(155,48,255,0.08)_0%,rgba(15,14,14,1)_70%)] py-5 font-orbitron shadow-[0_0_32px_0] shadow-[#0F0E0E]/20"
        >
            <HUDCornersBL className="absolute bottom-0 left-0 text-etherea-purple" />
            <HUDCornersBR className="absolute right-0 bottom-0 text-etherea-purple" />
            <HUDCornersTL className="absolute top-0 left-0 text-etherea-purple" />
            <HUDCornersTR className="absolute top-0 right-0 text-etherea-purple" />

            <div className="absolute z-10 h-60 w-60">
                <div className="absolute top-0 left-1/2 size-3 -translate-x-1/2 rotate-45 border border-etherea-purple bg-[#3A2060]" />
                <div className="absolute top-1/2 left-0 size-3 -translate-y-1/2 rotate-45 border border-etherea-purple bg-[#3A2060]" />
                <div className="absolute top-1/2 right-0 size-3 -translate-y-1/2 rotate-45 border border-etherea-purple bg-[#3A2060]" />
                <div className="absolute bottom-0 left-1/2 size-3 -translate-x-1/2 rotate-45 border border-etherea-purple bg-[#3A2060]" />

                <svg viewBox="0 0 100 100" className="size-full">
                    <circle cx="50" cy="50" r="48" fill="none" stroke="#24184A" strokeWidth="1.5" />

                    <circle
                        cx="50"
                        cy="50"
                        r="48"
                        fill="none"
                        stroke="#E52BFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="60 15"
                        strokeDashoffset="30"
                    />
                </svg>
                <div className="absolute top-1/2 left-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-etherea-purple/5"></div>
            </div>
            <div className="relative flex h-60 w-60 flex-col items-center justify-center gap-2 rounded-full">
                <div className="relative z-10 flex items-center justify-center gap-4 text-[56px] text-widget-foreground">
                    <div className="font-mono text-4xl text-foreground">
                        <span>{hours}</span>
                    </div>
                    <div className="h-7 w-[1px] bg-etherea-purple shadow-[0_0_6px_0_#9B30FF]"></div>
                    <div className="font-mono text-4xl text-foreground">
                        <span>{minutes}</span>
                    </div>
                </div>
                <div className="flex items-center gap-6 font-mono text-sm text-text-secondary uppercase">
                    <span>{formattedDate}</span>
                    <span>{formattedWeekday}</span>
                </div>
            </div>
            <span className="font-mono text-xs tracking-[3px] text-text-muted uppercase">
                Temporal Core
            </span>
        </div>
    );
}
