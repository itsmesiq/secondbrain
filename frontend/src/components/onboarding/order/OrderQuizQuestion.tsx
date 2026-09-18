import { PixelBorderBL, PixelBorderBR, PixelBorderTL, PixelBorderTR } from '../../icons';
import { PrimaryNextButton } from '../../ui/NextButton';

export default function OrderQuizQuestion() {
    return (
        <div className="flex min-h-screen w-full items-stretch">
            <aside
                className="relative flex min-h-screen basis-1/3 flex-col items-center justify-end"
                style={{
                    backgroundImage: `url(/images/last-ballad-background.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="absolute inset-0 h-full w-full bg-[radial-gradient(70.71%_70.71%_at_50%_50%,rgba(5,5,10,0.00)_40%,rgba(5,5,10,0.65)_100%),linear-gradient(135deg,rgba(155,48,255,0.03)_0%,rgba(188,47,210,0.02)_50%,rgba(255,45,120,0.01)_100%)]"></div>

                <div className="relative z-10 flex h-full min-h-screen w-full flex-col items-center justify-end">
                    <div className="absolute top-0 z-10 flex w-full items-center justify-between border-b border-stroke-secondary bg-surface/40 px-5 py-2.5 backdrop-blur-xs">
                        <PixelBorderTL className="absolute top-0 left-0 h-3 w-3" />
                        <PixelBorderTR className="absolute top-0 right-0 h-3 w-3" />
                        <span className="font-mono text-[10px] tracking-[2px] text-text-muted">
                            ETHERIA // WORLD
                        </span>
                        <span className="font-mono text-[10px] tracking-[2px] text-text-muted">
                            ORDER PROTOCOL
                        </span>
                    </div>
                    <div className="absolute bottom-0 z-10 flex w-full items-center justify-between border-b border-stroke-secondary px-5 py-2.5 backdrop-blur-xs">
                        <span className="font-mono text-[10px] tracking-[2px] text-text-muted">
                            37.4219°N // 122.0840°W
                        </span>
                        <PixelBorderBL className="absolute bottom-0 left-0 h-3 w-3" />
                        <PixelBorderBR className="absolute right-0 bottom-0 h-3 w-3" />
                    </div>
                </div>
                <div className="absolute bottom-0 z-0 h-[20%] w-full bg-[linear-gradient(0deg,rgba(5,5,10,0.98)_0%,rgba(5,5,10,0.85)_50%,rgba(5,5,10,0)_100%)]"></div>
            </aside>

            <section className="relative flex min-h-screen flex-1 basis-2/3 flex-col items-center justify-center pt-15 pb-10">
                <div className="absolute top-0 flex w-full items-center justify-between border-b border-card px-16 py-2.5">
                    <PixelBorderTR className="absolute top-0 right-0 h-3 w-3" />
                    <span className="font-mono text-xs tracking-[2px] text-text-muted uppercase">
                        ETHEREA // ORDER SELECTION
                    </span>
                    <div className="flex items-center gap-2">
                        <div className="size-1 bg-etherea-purple/20"></div>
                        <span className="font-orbitron text-xs tracking-[2px] text-etherea-purple uppercase">
                            Quiz PROTOCOL
                        </span>
                    </div>
                </div>

                <div className="flex w-full max-w-[840px] flex-col">
                    <div className="flex w-full flex-col gap-3 font-mono">
                        <div className="flex items-center gap-2.5">
                            <div className="h-3.5 w-0.5 bg-etherea-purple"></div>
                            <span className="text-xs tracking-[3px] text-etherea-purple uppercase">
                                Question 01
                            </span>
                        </div>
                        <h1 className="font-orbitron text-xl tracking-[1px] text-foreground">
                            Diante de um desafio que parece impossível, você...
                        </h1>
                    </div>

                    <div className="my-6 h-0.5 w-full bg-[linear-gradient(90deg,#2A1F4A_0%,rgba(42,31,74,0.00)_100%)]"></div>

                    <div className="grid grid-cols-2 gap-2.5">
                        <button className="relative flex h-[160px] w-full items-center justify-between border border-stroke-secondary bg-surface-elevated/50 px-6 font-mono text-xs tracking-[0.5px] text-text-primary">
                            <div className="flex items-center gap-3">
                                <div className="size-4 border border-stroke-secondary"></div>
                                <span>A</span>
                            </div>
                            <div className="h-5 w-0.5 bg-stroke-secondary"></div>
                            <span>Recua, observa e age no momento exato</span>
                        </button>
                        <button className="relative flex h-[160px] w-full items-center justify-between border border-stroke-secondary bg-surface-elevated/50 px-6 font-mono text-xs tracking-[0.5px] text-text-primary">
                            <div className="flex items-center gap-3">
                                <div className="size-4 border border-stroke-secondary"></div>
                                <span>A</span>
                            </div>
                            <div className="h-5 w-0.5 bg-stroke-secondary"></div>
                            <span>Recua, observa e age no momento exato</span>
                        </button>
                        <button className="relative flex h-[160px] w-full items-center justify-between border border-stroke-secondary bg-surface-elevated/50 px-6 font-mono text-xs tracking-[0.5px] text-text-primary">
                            <div className="flex items-center gap-3">
                                <div className="size-4 border border-stroke-secondary"></div>
                                <span>A</span>
                            </div>
                            <div className="h-5 w-0.5 bg-stroke-secondary"></div>
                            <span>Recua, observa e age no momento exato</span>
                        </button>
                        <button className="relative flex h-[160px] w-full items-center justify-between border border-stroke-secondary bg-surface-elevated/50 px-6 font-mono text-xs tracking-[0.5px] text-text-primary">
                            <div className="flex items-center gap-3">
                                <div className="size-4 border border-stroke-secondary"></div>
                                <span>A</span>
                            </div>
                            <div className="h-5 w-0.5 bg-stroke-secondary"></div>
                            <span>Recua, observa e age no momento exato</span>
                        </button>
                        <button className="relative flex h-[160px] w-full items-center justify-between border border-stroke-secondary bg-surface-elevated/50 px-6 font-mono text-xs tracking-[0.5px] text-text-primary">
                            <div className="flex items-center gap-3">
                                <div className="size-4 border border-stroke-secondary"></div>
                                <span>A</span>
                            </div>
                            <div className="h-5 w-0.5 bg-stroke-secondary"></div>
                            <span>Recua, observa e age no momento exato</span>
                        </button>
                        <button className="relative flex h-[160px] w-full items-center justify-between border border-stroke-secondary bg-surface-elevated/50 px-6 font-mono text-xs tracking-[0.5px] text-text-primary">
                            <div className="flex items-center gap-3">
                                <div className="size-4 border border-stroke-secondary"></div>
                                <span>A</span>
                            </div>
                            <div className="h-5 w-0.5 bg-stroke-secondary"></div>
                            <span>Recua, observa e age no momento exato</span>
                        </button>
                    </div>
                    <div className="mt-6 mb-3 h-0.5 w-full bg-[linear-gradient(90deg,#2A1F4A_0%,rgba(42,31,74,0.00)_100%)]"></div>
                    <div className="flex items-center gap-6">
                        <div className="flex w-full flex-col gap-2.5">
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-[10px] text-text-muted uppercase">
                                    Progress
                                </span>

                                <div className="flex items-center gap-2 font-orbitron text-[10px] text-etherea-purple uppercase">
                                    <span>02</span>
                                    <span>/</span>
                                    <span>06</span>
                                </div>
                            </div>
                            <div className="flex w-full items-center gap-0">
                                <div className="h-0.5 w-full bg-etherea-purple/50"></div>
                                <div className="h-0.5 w-full bg-etherea-purple"></div>
                                <div className="h-0.5 w-full bg-etherea-purple/20"></div>
                                <div className="h-0.5 w-full bg-etherea-purple/20"></div>
                                <div className="h-0.5 w-full bg-etherea-purple/20"></div>
                                <div className="h-0.5 w-full bg-etherea-purple/20"></div>
                                <div className="h-0.5 w-full bg-etherea-purple/20"></div>
                                <div className="h-0.5 w-full bg-etherea-purple/20"></div>
                                <div className="h-0.5 w-full bg-etherea-purple/20"></div>
                                <div className="h-0.5 w-full bg-etherea-purple/20"></div>
                            </div>
                        </div>
                        <div className="basis-1/4">
                            <PrimaryNextButton onClick={() => {}} ctaText="Next" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
