'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { BackgroundClock } from '@/components/icons';
import { getWidgetColor, getWidgetTheme } from '@/lib/widgets/config';

interface ClockProps {
    theme?: 'light' | 'dark';
    color?: string;
}

export default function Clock({ theme = 'dark', color = 'purple' }: ClockProps) {
    const searchParams = useSearchParams();
    const urlTheme = getWidgetTheme(searchParams.get('theme'));
    const urlColor = getWidgetColor(searchParams.get('color'));

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

    const formattedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);

    return (
        <div
            data-theme={resolvedTheme}
            data-color={resolvedColor}
            className="relative flex h-72 w-72 flex-col items-center justify-center overflow-hidden rounded-4xl bg-widget-background font-orbitron shadow-[0_0_32px_0] shadow-[#0F0E0E]/20"
        >
            <div className="absolute top-7 right-7 z-10 flex items-center gap-1.5 text-widget-foreground">
                <span>{formattedDate}</span>
                <span className="opacity-35">{formattedWeekday}</span>
            </div>
            <div className="relative z-10 flex items-center justify-center gap-2 text-[56px] text-widget-foreground">
                <div className="flex h-[132px] w-[110px] items-center justify-center rounded-xl border border-widget-foreground/10 bg-widget-foreground/5 shadow-[inset_0_0_4px_0] shadow-widget-foreground/10 backdrop-blur-xs">
                    <span>{hours}</span>
                </div>
                <div className="flex h-[132px] w-[110px] items-center justify-center rounded-xl border border-widget-foreground/10 bg-widget-foreground/5 shadow-[inset_0_0_4px_0] shadow-widget-foreground/10 backdrop-blur-xs">
                    <span>{minutes}</span>
                </div>
            </div>
            <div className="absolute -bottom-[25%] z-0">
                <BackgroundClock className="h-82 w-72 text-widget-accent blur-2xl" />
            </div>
        </div>
    );
}
