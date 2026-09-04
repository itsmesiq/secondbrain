'use client';

import { CircleCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

import Sidebar from '@/components/dashboard/Sidebar';
import WidgetCatalog from '@/components/dashboard/WidgetCatalog';

import { authClient } from '../_lib/auth-client';

type DashboardSection = 'widgets' | 'templates' | 'account';

export default function DashboardPage() {
    const [notionConnected, setNotionConnected] = useState<boolean | null>(null);

    const [activeSection, setActiveSection] = useState<DashboardSection>('widgets');

    useEffect(() => {
        const fetchNotionStatus = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/notion/status`,
                    {
                        credentials: 'include',
                    },
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch Notion status');
                }

                const data = await response.json();
                setNotionConnected(data.connected);
            } catch (error) {
                console.error('Error fetching Notion status:', error);
            }
        };
        fetchNotionStatus();
    }, []);

    const handleNotionConnect = async () => {
        await authClient.linkSocial({
            provider: 'notion',
            callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
        });
    };

    return (
        <section className="flex h-screen w-full items-start overflow-hidden">
            <Sidebar
                notionConnected={notionConnected}
                handleNotionConnect={handleNotionConnect}
                activeSection={activeSection}
                onSectionChange={setActiveSection}
            />
            <main className="relative h-screen w-[75%] overflow-auto px-8 py-16">
                {notionConnected && (
                    <div className="absolute top-3 right-3 flex items-center justify-center gap-3 rounded-full bg-[#30a46c]/10 px-4 py-2 text-[#30a46c]">
                        <CircleCheck className="h-4 w-4" />
                        <span className="font-sans text-sm leading-[120%] font-medium tracking-[2.4px] whitespace-nowrap">
                            Notion Conectado
                        </span>
                    </div>
                )}

                {activeSection === 'widgets' && <WidgetCatalog />}

                {activeSection === 'templates' && (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                        <h1 className="font-sans text-4xl font-bold">🚀 Templates</h1>
                        <p className="max-w-[400px] text-center font-sans text-sm font-light tracking-[2.4px] text-foreground">
                            This section is under construction. Please check back later for updates
                            and new features.
                        </p>
                    </div>
                )}

                {activeSection === 'account' && (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                        <h1 className="font-sans text-4xl font-bold">🚀 Account</h1>
                        <p className="max-w-[400px] text-center font-sans text-sm font-light tracking-[2.4px] text-foreground">
                            This section is under construction. Please check back later for updates
                            and new features.
                        </p>
                    </div>
                )}
            </main>
        </section>
    );
}
