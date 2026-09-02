'use client';

import { Logo, NotionIcon } from '@/components/icons';

import { authClient } from '../_lib/auth-client';

export default function DashboardPage() {
    const handleNotionConnect = async () => {
        await authClient.linkSocial({
            provider: 'notion',
            callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
        });
    };

    return (
        <section className="flex h-screen w-full items-start overflow-hidden">
            <aside className="h-screen w-[25%] bg-foreground/2 px-8 py-16">
                <h2 className="font-sans text-2xl font-semibold text-foreground">Widgets</h2>
            </aside>
            <main className="flex h-screen w-[75%] flex-col items-center justify-center">
                <Logo className="h-[264px] w-[272px] animate-bounce 2xl:h-[560px] 2xl:w-[567px]" />
                <h1 className="text-color relative mt-20 h-28 w-[60%] typed-caret typed-[Olá,_é_hora_de_configurar_seu_novo_cérebro._Conecte_sua_conta_Notion_para_continuar...] text-center font-mono text-2xl text-foreground"></h1>
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
            </main>
        </section>
    );
}
