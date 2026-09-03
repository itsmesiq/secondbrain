import { useEffect } from 'react';

import Clock from '@/components/widgets/clock';

import { useWidgetApi } from '../_lib/api';

export default function ClockPage() {
    const { widgetApi } = useWidgetApi();

    useEffect(() => {
        widgetApi('/api/widgets/clock').then((response) => {
            if (!response.ok) {
                console.error('Failed to authenticate widget');
            }
        });
    }, [widgetApi]);

    return <Clock />;
}
