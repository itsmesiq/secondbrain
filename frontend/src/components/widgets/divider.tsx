import { useSearchParams } from 'next/navigation';

import { getWidgetColor, getWidgetTheme } from '@/lib/widgets/config';
import type { WidgetProps } from '@/types/widgets.types';

export default function Divider({ theme = 'dark', color = 'purple' }: WidgetProps) {
    const searchParams = useSearchParams();
    const urlTheme = searchParams.get('theme');
    const urlColor = searchParams.get('color');

    const resolvedTheme = urlTheme ? getWidgetTheme(urlTheme) : theme;
    const resolvedColor = urlColor ? getWidgetColor(urlColor) : color;

    return (
        <div
            data-theme={resolvedTheme}
            data-color={resolvedColor}
            className="flex h-2 w-full flex-col items-center justify-center bg-widget-accent"
        >
            <div className="h-0.5 w-full bg-widget-foreground mix-blend-plus-lighter blur-xs"></div>
        </div>
    );
}
