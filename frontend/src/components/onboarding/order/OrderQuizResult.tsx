import Image from 'next/image';

import { HUDCornersBL, HUDCornersBR, HUDCornersTL, HUDCornersTR } from '../../icons';
import { PrimaryNextButton } from '../../ui/NextButton';

export default function OrderQuizResult() {
    return (
        <section className="w-full">
            <div className="flex items-center justify-between border-b border-stroke-secondary px-12 py-3 font-mono text-[10px] tracking-[2px] text-text-muted">
                <span>ETHEREA // ORDER PROTOCOL</span>
                <div className="flex items-center gap-2">
                    <div className="size-2 bg-etherea-purple opacity-30"></div>
                    <span className="font-orbitron text-etherea-purple">ORDEM IDENTIFICADA</span>
                </div>
                <span>RESULT: CONFIRMED</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 pt-8 pb-5">
                <h3 className="font-orbitron text-lg font-semibold tracking-[3px] text-foreground">
                    <span className="text-etherea-purple">ETHEREA</span> já reconheceu você.
                </h3>
                <p className="font-mono text-sm text-text-secondary">
                    Entre as seis grandes Ordens, uma delas traduz a forma como você pensa, cria e
                    existe.
                </p>
            </div>
            <div className="h-[1px] w-full bg-[linear-gradient(90deg,#9B30FF_0%,rgba(163,50,255,0.85)_12.5%,rgba(175,53,254,0.70)_25%,rgba(193,57,253,0.55)_37.5%,rgba(224,64,251,0.40)_50%,rgba(224,64,251,0.00)_100%)]"></div>
            <div className="flex w-full items-center justify-between gap-10 py-8">
                <div className="relative min-w-[684px]">
                    <Image
                        src="/images/orders/arcane-leader.jpg"
                        alt="Arcane Leader"
                        width={684}
                        height={1026}
                        className="relative z-10"
                    />
                    <div className="absolute inset-0 z-0 h-[1026px] w-[684px] bg-etherea-purple opacity-40 blur-[116px]"></div>
                </div>
                <div className="w-full pr-8">
                    <div className="flex items-center justify-between font-mono">
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-2 py-1.5">
                                <h1 className="font-orbitron text-4xl tracking-[4px] text-foreground uppercase">
                                    The Arcane
                                </h1>
                                <p className="text-base text-text-muted uppercase">
                                    Elemento: <span className="text-etherea-purple">Éter</span>
                                </p>
                            </div>
                            <div className="relative border border-etherea-purple/20 bg-etherea-purple/10 px-4 py-5">
                                <HUDCornersBL className="absolute bottom-0 left-0 h-3 w-3 text-etherea-purple" />
                                <HUDCornersBR className="absolute right-0 bottom-0 h-3 w-3 text-etherea-purple" />
                                <HUDCornersTL className="absolute top-0 left-0 h-3 w-3 text-etherea-purple" />
                                <HUDCornersTR className="absolute top-0 right-0 h-3 w-3 text-etherea-purple" />
                                <span className="font-orbitron text-xs tracking-[0.5px] text-etherea-magenta">
                                    &quot;Todo conhecimento é um novo mundo à espera.&quot;
                                </span>
                            </div>
                        </div>
                        <Image
                            src="/images/orders/arcane-symbol.png"
                            alt="Arcane Symbol"
                            width={232}
                            height={232}
                        />
                    </div>
                    <div className="my-8 h-[1px] w-full bg-[linear-gradient(90deg,#9B30FF_0%,rgba(163,50,255,0.85)_12.5%,rgba(175,53,254,0.70)_25%,rgba(193,57,253,0.55)_37.5%,rgba(224,64,251,0.40)_50%,rgba(224,64,251,0.00)_100%)]"></div>
                    <div className="flex w-full items-stretch gap-8">
                        <div className="relative max-w-[364px] border border-stroke-secondary bg-surface px-6 py-5 font-mono text-sm leading-[175%] tracking-[0.2px] text-text-primary">
                            <p>
                                O Arcane é movido pela sede de entender. Onde outros veem rotina,
                                ele vê padrões. Onde alguns veem limites, ele enxerga
                                possibilidades.
                                <br /> <br />
                                Seu caminho é feito de perguntas, experimentos e descobertas. Ele
                                transforma curiosidade em criação, conhecimento em poder e ideias em
                                realidade.
                                <br /> <br />
                                No universo Etherea, o Arcane é aquele que conecta o invisível,
                                traduz o caos e encontra sentido onde outros apenas observam.
                            </p>
                            <div className="mt-6 flex w-full flex-wrap items-center gap-2 border-t border-text-muted pt-6 text-[10px]">
                                <div className="border border-text-muted px-2 py-0.5 uppercase">
                                    <span>Conhecimento</span>
                                </div>
                                <div className="border border-text-muted px-2 py-0.5 uppercase">
                                    <span>CURIOSIDADE</span>
                                </div>
                                <div className="border border-text-muted px-2 py-0.5 uppercase">
                                    <span>DESCOBERTA</span>
                                </div>
                            </div>
                            <div className="w- absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-stroke-secondary px-6 py-3 font-mono text-[10px] tracking-[1.5px] text-text-muted">
                                <span>ORDER:CONFIRMED</span>
                                <span>ETHEREA v0.12</span>
                            </div>
                        </div>
                        <div className="flex w-[300px] flex-col gap-8">
                            <div className="border border-etherea-purple bg-surface shadow-[0_0_24px_0_rgba(155,48,255,0.35),inset_0_0_40px_0_rgba(0,0,0,0.60)]">
                                <div className="flex items-center justify-between px-3 py-1.5 font-mono text-[10px] tracking-[1.5px] text-etherea-purple uppercase">
                                    <span>ID: Arcane Leader</span>
                                    <span>Confidential</span>
                                </div>
                                <Image
                                    src="/images/orders/arcane-details.jpg"
                                    alt="Arcane Symbol"
                                    width={300}
                                    height={255}
                                />
                                <div className="flex items-center gap-2 px-3 py-2 font-mono text-[10px] tracking-[1px] text-text-muted">
                                    <span>▶</span>
                                    <span>VER ALÉM SEMPRE FOI PARTE DE MIM.</span>
                                </div>
                                <div className="flex items-center justify-between border-t border-etherea-purple/20 bg-[rgba(0,0,0,0.40)] px-3 py-2">
                                    <div className="flex flex-col items-start gap-0.5 font-orbitron text-xs tracking-[2px] uppercase">
                                        <span className="font-mono text-[10px] text-text-muted">
                                            Archetype
                                        </span>
                                        <span className="text-etherea-purple">Mage</span>
                                    </div>
                                    <div className="flex flex-col items-end gap-0.5 font-orbitron text-xs tracking-[2px] uppercase">
                                        <span className="font-mono text-[10px] text-text-muted">
                                            Type
                                        </span>
                                        <span className="text-etherea-purple">classified</span>
                                    </div>
                                </div>
                            </div>

                            <div className="border border-etherea-purple bg-surface shadow-[0_0_24px_0_rgba(155,48,255,0.35),inset_0_0_40px_0_rgba(0,0,0,0.60)]">
                                <div className="flex items-center justify-between px-3 py-1.5 font-mono text-[10px] tracking-[1.5px] text-etherea-purple uppercase">
                                    <span>Sprite</span>
                                    <span>Classified</span>
                                </div>
                                <Image
                                    src="/images/orders/arcane-sprite.png"
                                    alt="Arcane Symbol"
                                    width={300}
                                    height={255}
                                />
                                <div className="flex items-center justify-between border-t border-etherea-purple/20 bg-[rgba(0,0,0,0.40)] px-3 py-2">
                                    <div className="flex flex-col items-start gap-0.5 font-orbitron text-xs tracking-[2px] uppercase">
                                        <span className="font-mono text-[10px] text-text-muted">
                                            Power
                                        </span>
                                        <span className="text-etherea-purple">Unkown</span>
                                    </div>
                                    <div className="flex flex-col items-end gap-0.5 font-orbitron text-xs tracking-[2px] uppercase">
                                        <span className="font-mono text-[10px] text-text-muted">
                                            Don&apos;t engage
                                        </span>
                                        <span className="text-etherea-purple">Danger</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto mt-12 w-[300px]">
                        <PrimaryNextButton onClick={() => {}} ctaText="ACEITAR MINHA ORDEM" />
                    </div>
                </div>
            </div>
            <div className="h-[1px] w-full bg-[linear-gradient(90deg,#9B30FF_0%,rgba(163,50,255,0.85)_12.5%,rgba(175,53,254,0.70)_25%,rgba(193,57,253,0.55)_37.5%,rgba(224,64,251,0.40)_50%,rgba(224,64,251,0.00)_100%)]"></div>
            <div className="w-full py-8">
                <h2 className="text-center font-orbitron text-base tracking-[3px] text-text-primary uppercase">
                    Explorar outras Ordens
                </h2>
                <div className="flex w-full items-center justify-center gap-10 px-16 py-8">
                    <button
                        type="button"
                        className="flex cursor-pointer flex-col items-center gap-2 border border-stroke-primary bg-surface p-3 transition-all duration-300 ease-linear hover:translate-y-[-1px] hover:border-etherea-purple hover:bg-etherea-purple/10 hover:shadow-[rgba(155,48,255,0.25)]"
                    >
                        <Image
                            src="/images/orders/arcane-symbol.png"
                            alt="Arcane Symbol"
                            width={150}
                            height={150}
                        />
                        <span className="font-mono text-xs tracking-[1px] text-text-primary uppercase">
                            Arcane
                        </span>
                    </button>
                    <button
                        type="button"
                        className="flex cursor-pointer flex-col items-center gap-2 border border-stroke-primary bg-surface p-3 transition-all duration-300 ease-linear hover:translate-y-[-1px] hover:border-etherea-purple hover:bg-etherea-purple/10 hover:shadow-[rgba(155,48,255,0.25)]"
                    >
                        <Image
                            src="/images/orders/vanguard-symbol.png"
                            alt="Vanguard Symbol"
                            width={150}
                            height={150}
                        />
                        <span className="font-mono text-xs tracking-[1px] text-text-primary uppercase">
                            Vanguard
                        </span>
                    </button>
                    <button
                        type="button"
                        className="flex cursor-pointer flex-col items-center gap-2 border border-stroke-primary bg-surface p-3 transition-all duration-300 ease-linear hover:translate-y-[-1px] hover:border-etherea-purple hover:bg-etherea-purple/10 hover:shadow-[rgba(155,48,255,0.25)]"
                    >
                        <Image
                            src="/images/orders/verdant-symbol.png"
                            alt="Verdant Symbol"
                            width={150}
                            height={150}
                        />
                        <span className="font-mono text-xs tracking-[1px] text-text-primary uppercase">
                            verdant
                        </span>
                    </button>
                    <button
                        type="button"
                        className="flex cursor-pointer flex-col items-center gap-2 border border-stroke-primary bg-surface p-3 transition-all duration-300 ease-linear hover:translate-y-[-1px] hover:border-etherea-purple hover:bg-etherea-purple/10 hover:shadow-[rgba(155,48,255,0.25)]"
                    >
                        <Image
                            src="/images/orders/forge-symbol.png"
                            alt="Forge Symbol"
                            width={150}
                            height={150}
                        />
                        <span className="font-mono text-xs tracking-[1px] text-text-primary uppercase">
                            Forge
                        </span>
                    </button>
                    <button
                        type="button"
                        className="flex cursor-pointer flex-col items-center gap-2 border border-stroke-primary bg-surface p-3 transition-all duration-300 ease-linear hover:translate-y-[-1px] hover:border-etherea-purple hover:bg-etherea-purple/10 hover:shadow-[rgba(155,48,255,0.25)]"
                    >
                        <Image
                            src="/images/orders/veil-symbol.png"
                            alt="Veil Symbol"
                            width={150}
                            height={150}
                        />
                        <span className="font-mono text-xs tracking-[1px] text-text-primary uppercase">
                            Veil
                        </span>
                    </button>
                    <button
                        type="button"
                        className="flex cursor-pointer flex-col items-center gap-2 border border-stroke-primary bg-surface p-3 transition-all duration-300 ease-linear hover:translate-y-[-1px] hover:border-etherea-purple hover:bg-etherea-purple/10 hover:shadow-[rgba(155,48,255,0.25)]"
                    >
                        <Image
                            src="/images/orders/ballad-symbol.png"
                            alt="Ballad Symbol"
                            width={150}
                            height={150}
                        />
                        <span className="font-mono text-xs tracking-[1px] text-text-primary uppercase">
                            Ballad
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
}
