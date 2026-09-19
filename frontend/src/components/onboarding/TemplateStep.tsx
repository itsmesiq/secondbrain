import { MoveRight } from 'lucide-react';

import { PixelBorderBR } from '../icons';
import { OnboardingSidebar, TopBarOnboarding } from './base/ComponentsAside';

type TemplateStepProps = {
    onContinue: () => void;
    templateUrl?: string;
};

export default function TemplateStep({ onContinue, templateUrl }: TemplateStepProps) {
    const handleCopyTemplate = () => {
        if (!templateUrl) {
            return;
        }

        window.open(templateUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="flex min-h-screen items-center">
            <OnboardingSidebar
                backgroundImage="/images/lake-view-background.jpg"
                currentStep="template"
            />
            <section className="relative flex h-screen basis-2/3 flex-col items-center justify-center">
                <TopBarOnboarding currentStep="template" />
                <div className="flex max-w-[480px] flex-col">
                    <div className="flex w-full flex-col gap-3 font-mono">
                        <span className="text-xs tracking-[3px] text-text-muted uppercase">
                            Boas-vindas
                        </span>
                        <h1 className="font-orbitron text-2xl tracking-[1px] text-foreground">
                            Vamos configurar tudo para você
                        </h1>
                        <p className="text-base tracking-[0.5px] text-text-secondary">
                            Comece copiando o template do Notion para configurar seu espaço no
                            Etheria.
                        </p>
                    </div>
                    <div className="my-8 h-0.5 w-full bg-[linear-gradient(90deg,#2A1F4A_0%,rgba(42,31,74,0.00)_100%)]"></div>
                    <article className="h-[275px] w-full bg-[radial-gradient(70.71%_70.71%_at_50%_50%,rgba(5,5,10,0.00)_40%,rgba(5,5,10,0.65)_100%),linear-gradient(135deg,rgba(155,48,255,0.12)_0%,rgba(188,47,210,0.09)_50%,rgba(255,45,120,0.06)_100%),url('/images/etherea-template-thumbnail.jpg')] bg-cover bg-center bg-no-repeat">
                        <div className="flex items-center justify-between border-b border-stroke-secondary bg-surface/40 px-4 py-2 backdrop-blur-xs">
                            <div className="flex items-center gap-2">
                                <div className="size-1.5 bg-etherea-purple shadow-[0_0_4px_0_#9B30FF]"></div>
                                <span className="font-mono text-xs tracking-[2px] text-etherea-magenta uppercase">
                                    Notion Template
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="size-1 bg-etherea-pink/60"></div>
                                <div className="size-1 bg-etherea-purple/60"></div>
                                <div className="size-1 bg-etherea-cyan/60"></div>
                            </div>
                        </div>
                    </article>
                    <div className="mt-6 flex w-full flex-col gap-2.5">
                        <button
                            type="button"
                            onClick={handleCopyTemplate}
                            disabled={!templateUrl}
                            className="flex w-full cursor-pointer items-center justify-center gap-2.5 border border-stroke-secondary bg-etherea-purple/8 py-4 font-orbitron text-sm tracking-[2px] text-foreground uppercase shadow-[0_0_16px_0] shadow-transparent transition-all duration-300 ease-linear hover:translate-y-[-1px] hover:border-etherea-purple hover:bg-etherea-purple/15 hover:shadow-[rgba(155,48,255,0.25)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:border-stroke-secondary disabled:hover:bg-etherea-purple/8 disabled:hover:shadow-transparent"
                        >
                            <span>Copiar Template</span>
                            <MoveRight className="size-4 text-etherea-purple" />
                        </button>
                        <button
                            type="button"
                            onClick={onContinue}
                            className="flex w-full cursor-pointer items-center justify-center gap-2.5 border border-stroke-secondary bg-transparent py-4 font-orbitron text-sm tracking-[2px] text-text-muted uppercase transition-all duration-300 ease-linear hover:border-text-secondary hover:bg-card/30 hover:text-text-secondary"
                        >
                            <span>Continuar</span>
                            <MoveRight className="size-4 text-inherit" />
                        </button>
                    </div>
                </div>
                <PixelBorderBR className="absolute right-0 bottom-0 h-3 w-3" />
            </section>
        </div>
    );
}
