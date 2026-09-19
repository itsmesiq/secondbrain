'use client';
import { useState } from 'react';

import { NotionIcon, PixelBorderBR } from '../icons';
import { SocialButton } from '../ui/SocialButton';
import { OnboardingSidebar, TopBarOnboarding } from './base/ComponentsAside';

type NotionStepProps = {
    handleNotionConnect: () => Promise<void>;
};

export default function NotionStep({ handleNotionConnect }: NotionStepProps) {
    const [isConnecting, setIsConnecting] = useState(false);

    const handleConnect = async () => {
        if (isConnecting) {
            return;
        }

        setIsConnecting(true);

        try {
            await handleNotionConnect();
        } catch (error) {
            console.error('Error connecting to Notion:', error);
            setIsConnecting(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center">
            <OnboardingSidebar
                backgroundImage="/images/high-view-background.jpg"
                currentStep="notion"
            />
            <section className="relative flex h-screen basis-2/3 flex-col items-center justify-center">
                <TopBarOnboarding currentStep="notion" />
                <div className="flex max-w-[480px] flex-col items-center">
                    <div className="mb-8 w-fit border border-stroke-secondary bg-surface p-4 shadow-[0_0_16px_0_rgba(155,48,255,0.12)]">
                        <NotionIcon className="size-8 text-foreground" />
                    </div>
                    <div className="flex w-full flex-col items-center gap-3 font-mono">
                        <span className="text-xs tracking-[3px] text-text-muted uppercase">
                            Configuração
                        </span>
                        <h1 className="font-orbitron text-2xl tracking-[1px] text-foreground">
                            Connect your Notion
                        </h1>
                        <p className="text-base tracking-[0.3px] text-text-secondary">
                            Conecte seu workspace do Notion para trazer seu conhecimento e recursos
                            para o universo Etheria.
                        </p>
                    </div>
                    <div className="my-8 h-0.5 w-full bg-[linear-gradient(90deg,#2A1F4A_0%,rgba(42,31,74,0.00)_100%)]"></div>
                    <div className="flex w-full flex-col gap-2.5">
                        <SocialButton
                            icon={<NotionIcon className="size-5 text-foreground" />}
                            onClick={handleConnect}
                            cta={isConnecting ? 'Connecting...' : 'Connect Notion'}
                        />
                    </div>
                </div>
                <PixelBorderBR className="absolute right-0 bottom-0 h-3 w-3" />
            </section>
        </div>
    );
}
