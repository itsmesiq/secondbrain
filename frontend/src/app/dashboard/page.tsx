'use client';

import { CircleCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

import Sidebar from '@/components/dashboard/Sidebar';
import WidgetCard from '@/components/dashboard/WidgetCard';

import { authClient } from '../_lib/auth-client';

export default function DashboardPage() {
    const [notionConnected, setNotionConnected] = useState<boolean | null>(null);

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
            <Sidebar notionConnected={notionConnected} handleNotionConnect={handleNotionConnect} />
            <main className="relative h-screen w-[75%] overflow-auto px-8 py-16">
                {notionConnected && (
                    <div className="absolute top-3 right-3 flex items-center justify-center gap-3 rounded-full bg-[#30a46c]/10 px-4 py-2 text-[#30a46c]">
                        <CircleCheck className="h-4 w-4" />
                        <span className="font-sans text-sm leading-[120%] font-medium tracking-[2.4px] whitespace-nowrap">
                            Notion Conectado
                        </span>
                    </div>
                )}

                <h1 className="mb-14 font-sans text-4xl font-bold">⚡ Widgets</h1>

                <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    <WidgetCard />
                    <WidgetCard />
                    <WidgetCard />
                    <WidgetCard />
                    <WidgetCard />
                    <WidgetCard />
                </div>
            </main>
        </section>
    );
}
