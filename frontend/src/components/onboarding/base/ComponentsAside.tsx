import type { OnboardingVisualStep } from '@/types/onboarding.types';

import { PixelBorderBL, PixelBorderBR, PixelBorderTL, PixelBorderTR } from '../../icons';

interface OnboardingSidebarProps {
    backgroundImage: string;
    currentStep: OnboardingVisualStep;
}

const steps: {
    key: OnboardingVisualStep;
    number: number;
}[] = [
    { key: 'template', number: 1 },
    { key: 'notion', number: 2 },
    { key: 'identity', number: 3 },
    { key: 'specializations', number: 4 },
    { key: 'order-quiz', number: 5 },
];

export function OnboardingSidebar({ backgroundImage, currentStep }: OnboardingSidebarProps) {
    const activeStep = steps.find((step) => step.key === currentStep)?.number ?? 1;

    return (
        <aside
            className="relative flex min-h-screen basis-1/3 flex-col items-center justify-end"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="absolute inset-0 h-full w-full bg-[radial-gradient(70.71%_70.71%_at_50%_50%,rgba(5,5,10,0.00)_40%,rgba(5,5,10,0.65)_100%),linear-gradient(135deg,rgba(155,48,255,0.12)_0%,rgba(188,47,210,0.09)_50%,rgba(255,45,120,0.06)_100%)]"></div>

            <div className="relative z-10 flex h-full w-full flex-col items-center justify-end">
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
                    <div className="flex items-center justify-center gap-0.5">
                        {steps.map((step, index) => {
                            const isActive = step.number === activeStep;
                            const isCompleted = step.number < activeStep;

                            return (
                                <div key={step.key} className="flex items-start gap-1">
                                    <div className="flex flex-col items-center gap-1.5">
                                        <div className="flex size-2.5 flex-col items-center justify-center">
                                            <div
                                                className={`${isActive || isCompleted ? 'shadow-[0_0_8px_0_#9B30FF,0_0_16px_0_rgba(155, 48, 255, 0.40)] mx-[3px] size-2.5 border border-etherea-magenta bg-etherea-purple' : 'mx-[5px] size-2 border border-stroke-secondary bg-card'}`}
                                            ></div>
                                        </div>
                                        <span
                                            className={`font-mono text-xs tracking-[1px] ${isActive || isCompleted ? 'text-etherea-purple' : 'text-text-muted'}`}
                                        >
                                            {String(step.number).padStart(2, '0')}
                                        </span>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div
                                            className={`my-1 h-0.5 w-7 ${isActive || isCompleted ? 'bg-[linear-gradient(90deg,#9B30FF_30%,#2A1F4A_100%)]' : 'bg-card'}`}
                                        ></div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
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
    );
}

type TopBarOnboardingProps = {
    currentStep: OnboardingVisualStep;
};

export function TopBarOnboarding({ currentStep }: TopBarOnboardingProps) {
    const activeStep = steps.find((step) => step.key === currentStep)?.number ?? 1;

    return (
        <div className="absolute top-0 flex w-full items-center justify-between border-b border-card px-16 py-2.5">
            <PixelBorderTR className="absolute top-0 right-0 h-3 w-3" />
            <span className="font-mono text-xs tracking-[2px] text-text-muted uppercase">
                Etapa {String(activeStep).padStart(2, '0')} /{' '}
                {String(steps.length).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-1.5">
                {steps.map((step) => {
                    const isActive = step.number === activeStep;
                    const isCompleted = step.number < activeStep;

                    return (
                        <div
                            key={step.key}
                            className={`h-0.5 w-4 ${isActive || isCompleted ? 'bg-etherea-purple shadow-[0_0_4px_0_#9B30FF]' : 'bg-text-muted'}`}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
}
