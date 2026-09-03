import { useCallback } from 'react';

import { useWidgetAuth } from './context';

export function useWidgetApi() {
    const { token } = useWidgetAuth();

    const widgetApi = useCallback(
        async (path: string, options?: RequestInit) => {
            const headers = new Headers(options?.headers);

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
                ...options,
                headers,
                credentials: 'include',
            });
        },
        [token],
    );

    return {
        widgetApi,
    };
}
