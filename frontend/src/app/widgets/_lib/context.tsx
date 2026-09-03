'use client';

import { createContext, useContext } from 'react';

type WidgetAuthContextValue = {
    token: string | null;
};

export const WidgetAuthContext = createContext<WidgetAuthContextValue | null>(null);

export function useWidgetAuth() {
    const context = useContext(WidgetAuthContext);

    if (!context) {
        throw new Error('useWidgetAuth must be used within WidgetAuthContext.Provider');
    }

    return context;
}
