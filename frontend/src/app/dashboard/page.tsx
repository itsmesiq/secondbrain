'use client';

import { CircleCheck, LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Logo, NotionIcon } from '@/components/icons';

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
            <aside className="h-screen w-[25%] bg-foreground/2 px-8 py-16">
                <h2 className="font-sans text-2xl font-semibold text-foreground">Widgets</h2>
            </aside>
            <main className="flex h-screen w-[75%] flex-col items-center justify-center">
                <Logo className="h-[264px] w-[272px] animate-bounce 2xl:h-[560px] 2xl:w-[567px]" />
                {notionConnected === null ? (
                    <div>
                        <LoaderCircle className="h-8 w-8 animate-spin" />
                        <span className="typed-caret typed-[Verificando_conexão...] text-center font-mono text-lg"></span>
                    </div>
                ) : notionConnected ? (
                    <div className="mt-20 flex w-fit flex-col items-center">
                        <h1 className="text-color relative h-28 w-[680px] typed-caret typed-[Tudo_certo_para_continuar._Você_já_pode_utilizar_o_Second_Brain.] text-center font-mono text-2xl text-foreground"></h1>
                        <div className="flex items-center justify-center gap-4 rounded-full bg-[#30a46c]/10 px-8 py-3 text-[#30a46c]">
                            <CircleCheck className="h-5 w-5" />
                            <span className="font-sans text-base leading-[120%] font-medium tracking-[2.4px] whitespace-nowrap">
                                Notion Conectado
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="mt-20 flex w-fit flex-col items-center">
                        <h1 className="text-color relative h-28 w-[680px] typed-caret typed-[Olá,_é_hora_de_configurar_seu_novo_cérebro._Conecte_sua_conta_Notion_para_continuar...] text-center font-mono text-2xl text-foreground"></h1>
                        <button
                            onClick={handleNotionConnect}
                            type="button"
                            className="flex h-[56px] cursor-pointer items-center justify-center gap-6 rounded-full bg-foreground px-20 py-3 transition-opacity hover:opacity-90 active:opacity-80"
                        >
                            <NotionIcon className="h-8 w-8" />
                            <span className="font-sans text-xl leading-[120%] font-semibold tracking-[2.4px] whitespace-nowrap text-background">
                                Conectar Notion
                            </span>
                        </button>
                    </div>
                )}
            </main>
        </section>
    );
}
