'use client';
import { LoaderCircle } from 'lucide-react';

import { Logo, NotionIcon } from '@/components/icons';

interface SidebarProps {
    notionConnected: boolean | null;
    handleNotionConnect: () => Promise<void>;
}

export default function Sidebar({ notionConnected, handleNotionConnect }: SidebarProps) {
    return (
        <aside className="relative flex h-screen w-[25%] flex-col items-center justify-between gap-8 bg-surface px-8 py-16">
            <div className="mt-10">
                <Logo className="h-[180px] w-[187px] animate-bounce 2xl:h-[560px] 2xl:w-[567px]" />
                <h2 className="h-28 w-[232px] typed-caret typed-[Bem_vindo_ao_Second_Brain.] text-center font-mono text-2xl text-foreground"></h2>
            </div>

            {notionConnected === false && (
                <div className="flex flex-col items-center gap-4">
                    <p className="max-w-[224px] text-center font-sans text-sm font-light tracking-[2.4px] text-foreground">
                        Conecte sua conta Notion para continuar
                    </p>
                    <button
                        onClick={handleNotionConnect}
                        type="button"
                        className="flex cursor-pointer items-center justify-center gap-6 rounded-full bg-foreground px-10 py-3 transition-opacity hover:opacity-90 active:opacity-80"
                    >
                        <NotionIcon className="h-6 w-6" />
                        <span className="font-sans text-base leading-[120%] font-semibold tracking-[2.4px] whitespace-nowrap text-background">
                            Conectar Notion
                        </span>
                    </button>
                </div>
            )}

            {notionConnected === null && (
                <div className="flex items-center justify-center gap-2">
                    <LoaderCircle className="h-5 w-5 animate-spin" />
                    <span className="max-w-[224px] text-center font-sans text-sm font-light tracking-[2.4px] text-foreground">
                        Verificando conexão...
                    </span>
                </div>
            )}

            <div className="flex w-full flex-col items-center gap-4">
                <button
                    type="button"
                    className="w-full cursor-pointer rounded-full border border-primary/20 bg-primary/10 py-3 text-center font-sans text-sm font-light tracking-[2.4px] text-foreground transition-colors duration-600 hover:border-primary/40 hover:bg-primary/30"
                >
                    Widgets
                </button>
            </div>
        </aside>
    );
}
