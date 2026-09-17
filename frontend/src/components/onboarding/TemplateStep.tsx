import { MoveRight } from 'lucide-react';

import { PixelBorderBL, PixelBorderBR, PixelBorderTL, PixelBorderTR } from '../icons';
import { TopBarOnboarding } from './base/ComponentsAside';

export default function TemplateStep() {
    return (
        <div className="flex min-h-screen items-center">
            <aside className="relative flex h-screen basis-1/3 flex-col items-center justify-end bg-[radial-gradient(70.71%_70.71%_at_50%_50%,rgba(5,5,10,0.00)_40%,rgba(5,5,10,0.65)_100%),linear-gradient(135deg,rgba(155,48,255,0.12)_0%,rgba(188,47,210,0.09)_50%,rgba(255,45,120,0.06)_100%),url('/images/lake-view-background.jpg')] bg-cover bg-center bg-no-repeat">
                <div className="absolute top-0 z-10 flex w-full items-center justify-between border-b border-stroke-secondary bg-surface/40 px-5 py-2.5 backdrop-blur-xs">
                    <PixelBorderTL className="absolute top-0 left-0 h-3 w-3" />
                    <PixelBorderTR className="absolute top-0 right-0 h-3 w-3" />
                    <span className="font-mono text-[10px] tracking-[2px] text-text-muted">
                        ETHERIA // WORLD
                    </span>
                    <span className="font-mono text-[10px] tracking-[2px] text-text-muted">
                        NODE: NEON DISTRICT
                    </span>
                </div>
                <div className="relative z-10 mb-15">
                    <div className="mb-3.5 flex items-center justify-center gap-2">
                        <div className="h-0.5 w-5 bg-[linear-gradient(90deg,rgba(155,48,255,0.00)_0%,_#9B30FF_100%)]"></div>
                        <span className="font-mono text-xs tracking-[2px] text-etherea-purple">
                            ONBOARDING SEQUENCE
                        </span>
                        <div className="h-0.5 w-5 bg-[linear-gradient(270deg,rgba(155,48,255,0.00)_0%,_#9B30FF_100%)]"></div>
                    </div>
                    <div>
                        <div className="flex items-center justify-center gap-0.5">
                            <div className="shadow-[0_0_8px_0_#9B30FF,0_0_16px_0_rgba(155, 48, 255, 0.40)] mx-[3px] size-2.5 border border-etherea-magenta bg-etherea-purple"></div>
                            <div className="h-0.5 w-7 bg-[linear-gradient(90deg,#9B30FF_30%,#2A1F4A_100%)]"></div>
                            <div className="mx-[5px] size-2 border border-stroke-secondary bg-card"></div>
                            <div className="h-0.5 w-7 bg-card"></div>
                            <div className="mx-[5px] size-2 border border-stroke-secondary bg-card"></div>
                            <div className="h-0.5 w-7 bg-card"></div>
                            <div className="mx-[5px] size-2 border border-stroke-secondary bg-card"></div>
                            <div className="h-0.5 w-7 bg-card"></div>
                            <div className="mx-[5px] size-2 border border-stroke-secondary bg-card"></div>
                        </div>
                        <div className="mt-1.5 flex items-center justify-between px-2">
                            <span className="font-mono text-xs tracking-[1px] text-etherea-purple">
                                01
                            </span>
                            <span className="font-mono text-xs tracking-[1px] text-text-muted">
                                02
                            </span>
                            <span className="font-mono text-xs tracking-[1px] text-text-muted">
                                03
                            </span>
                            <span className="font-mono text-xs tracking-[1px] text-text-muted">
                                04
                            </span>
                            <span className="font-mono text-xs tracking-[1px] text-text-muted">
                                05
                            </span>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 z-10 flex w-full items-center justify-between border-b border-stroke-secondary px-5 py-2.5 backdrop-blur-xs">
                    <span className="font-mono text-[10px] tracking-[2px] text-text-muted">
                        37.4219°N // 122.0840°W
                    </span>
                    <PixelBorderBL className="absolute bottom-0 left-0 h-3 w-3" />
                    <PixelBorderBR className="absolute right-0 bottom-0 h-3 w-3" />
                </div>
                <div className="absolute bottom-0 z-0 h-[20%] w-full bg-[linear-gradient(0deg,rgba(5,5,10,0.98)_0%,rgba(5,5,10,0.85)_50%,rgba(5,5,10,0)_100%)]"></div>
            </aside>
            <main className="relative flex h-screen basis-2/3 flex-col items-center justify-center">
                <TopBarOnboarding onboardingStep={1} />
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
                            className="flex w-full cursor-pointer items-center justify-center gap-2.5 border border-stroke-secondary bg-etherea-purple/8 py-4 font-orbitron text-sm tracking-[2px] text-foreground uppercase shadow-[0_0_16px_0] shadow-transparent transition-all duration-300 ease-linear hover:translate-y-[-1px] hover:border-etherea-purple hover:bg-etherea-purple/15 hover:shadow-[rgba(155,48,255,0.25)]"
                        >
                            <span>Copiar Template</span>
                            <MoveRight className="size-4 text-etherea-purple" />
                        </button>
                        <button
                            type="button"
                            className="flex w-full cursor-pointer items-center justify-center gap-2.5 border border-stroke-secondary bg-transparent py-4 font-orbitron text-sm tracking-[2px] text-text-muted uppercase transition-all duration-300 ease-linear hover:border-text-secondary hover:bg-card/30 hover:text-text-secondary"
                        >
                            <span>Continuar</span>
                            <MoveRight className="size-4 text-inherit" />
                        </button>
                    </div>
                </div>
                <PixelBorderBR className="absolute right-0 bottom-0 h-3 w-3" />
            </main>
        </div>
    );
}
