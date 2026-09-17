import { PixelBorderBL, PixelBorderBR, PixelBorderTL, PixelBorderTR } from '../../icons';

type AsideOnboardingProps = {
    backgroundImage: string;
    currentStep: number;
};

export function AsideOnboarding({ backgroundImage, currentStep }: AsideOnboardingProps) {
    return (
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
                        <span className="font-mono text-xs tracking-[1px] text-text-muted">02</span>
                        <span className="font-mono text-xs tracking-[1px] text-text-muted">03</span>
                        <span className="font-mono text-xs tracking-[1px] text-text-muted">04</span>
                        <span className="font-mono text-xs tracking-[1px] text-text-muted">05</span>
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
    );
}

type TopBarOnboardingProps = {
    onboardingStep: number;
};

export function TopBarOnboarding({ onboardingStep }: TopBarOnboardingProps) {
    return (
        <div className="absolute top-0 flex w-full items-center justify-between border-b border-card px-16 py-2.5">
            <PixelBorderTR className="absolute top-0 right-0 h-3 w-3" />
            <span className="font-mono text-xs tracking-[2px] text-text-muted uppercase">
                Etapa 0{onboardingStep} / 05
            </span>
            <div className="flex items-center gap-1.5">
                <div className="h-0.5 w-4 bg-etherea-purple shadow-[0_0_4px_0_#9B30FF]"></div>
                <div className="h-0.5 w-4 bg-text-muted"></div>
                <div className="h-0.5 w-4 bg-text-muted"></div>
                <div className="h-0.5 w-4 bg-text-muted"></div>
                <div className="h-0.5 w-4 bg-text-muted"></div>
            </div>
        </div>
    );
}
