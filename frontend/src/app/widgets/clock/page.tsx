'use client';
import { useEffect, useState } from 'react';

import Clock from '@/components/widgets/clock';

import { useWidgetApi } from '../_lib/api';

export default function ClockPage() {
    const { widgetApi } = useWidgetApi();
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        widgetApi('/api/widgets/clock').then((response) => {
            if (!response.ok) {
                console.error('Failed to authenticate widget');
                return;
            }

            setAuthenticated(true);
        });
    }, [widgetApi]);

    if (authenticated !== true) {
        return null;
    }

    return <Clock />;
}
