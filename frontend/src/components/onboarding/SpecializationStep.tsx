import { PrimaryNextButton } from '../ui/NextButton';
import { OnboardingSidebar, TopBarOnboarding } from './base/ComponentsAside';
import { SpecializationCard } from './base/SpecializationCard';

export default function SpecializationStep() {
    return (
        <div className="flex min-h-screen items-stretch">
            <OnboardingSidebar
                backgroundImage="/images/stats-background.jpg"
                currentStep="specializations"
            />
            <section className="relative flex min-h-screen flex-1 basis-2/3 flex-col items-center justify-center pt-20 pb-12">
                <TopBarOnboarding currentStep="specializations" />
                <div className="flex w-full max-w-[840px] flex-col">
                    <div className="flex w-full flex-col gap-3 font-mono">
                        <span className="text-xs tracking-[3px] text-text-muted uppercase">
                            Configuração
                        </span>
                        <h1 className="font-orbitron text-2xl tracking-[1px] text-foreground">
                            DEFINE YOUR SPECIALIZATIONS
                        </h1>
                        <p className="text-base tracking-[0.3px] text-text-secondary">
                            Adicione especializações para personalizar como sua evolução será
                            calculada.
                        </p>
                    </div>

                    <div className="my-8 h-0.5 w-full bg-[linear-gradient(90deg,#2A1F4A_0%,rgba(42,31,74,0.00)_100%)]"></div>

                    <div className="grid grid-cols-2 gap-2.5">
                        <SpecializationCard />
                        <SpecializationCard />
                        <SpecializationCard />
                        <SpecializationCard />
                        <SpecializationCard />
                    </div>

                    <div className="my-8 h-0.5 w-full bg-[linear-gradient(90deg,#2A1F4A_0%,rgba(42,31,74,0.00)_100%)]"></div>

                    <div className="flex w-full flex-col items-center gap-3">
                        <PrimaryNextButton onClick={() => {}} ctaText="Continuar" />
                        <span className="font-mono text-[10px] tracking-[0.5px] text-text-muted">
                            Suas especializações poderão ser alteradas posteriormente.
                        </span>
                    </div>
                </div>
            </section>
        </div>
    );
}
