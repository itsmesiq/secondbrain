import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useGetWidgetStats } from '@/lib/api/generated/endpoints/widgets/widgets';

import { PrimaryNextButton } from '../ui/NextButton';
import { OnboardingSidebar, TopBarOnboarding } from './base/ComponentsAside';
import { SpecializationCard } from './base/SpecializationCard';

type Specialization = {
    id: string;
    name: string;
};

export default function SpecializationStep() {
    const router = useRouter();

    const [specializations, setSpecializations] = useState<Record<string, Specialization[]>>({});

    const {
        data: stats,
        isPending,
        isError,
    } = useGetWidgetStats({
        query: {
            select: (response) => (response.status === 200 ? response.data.stats : null),
        },
    });

    const totalSpecialization = Object.values(specializations).reduce(
        (total, items) => total + items.length,
        0,
    );

    const handleSpecializationCreated = (statsId: string, specialization: Specialization) => {
        setSpecializations((current) => ({
            ...current,
            [statsId]: [...(current[statsId] ?? []), specialization],
        }));
    };

    const handleContinue = () => {
        if (totalSpecialization === 0) {
            return;
        }

        router.replace('/onboarding');
    };

    if (isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <LoaderCircle className="size-6 animate-spin text-etherea-purple" />
            </div>
        );
    }

    if (isError || !stats) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <p className="font-mono text-sm text-error-red">
                    Não foi possivel carregar seus atributos.
                </p>
            </div>
        );
    }

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
                        {stats?.map((stat) => (
                            <SpecializationCard
                                key={stat.id}
                                statsId={stat.id}
                                name={stat.name}
                                description={stat.description}
                                specializations={specializations[stat.id] ?? []}
                                onSpecializationCreated={(specialization) =>
                                    handleSpecializationCreated(stat.id, specialization)
                                }
                            />
                        ))}
                    </div>

                    <div className="my-8 h-0.5 w-full bg-[linear-gradient(90deg,#2A1F4A_0%,rgba(42,31,74,0.00)_100%)]"></div>

                    <div className="flex w-full flex-col items-center gap-3">
                        <PrimaryNextButton
                            onClick={handleContinue}
                            ctaText="Continuar"
                            disabled={totalSpecialization === 0}
                        />
                        <span className="font-mono text-[10px] tracking-[0.5px] text-text-muted">
                            Suas especializações poderão ser alteradas posteriormente.
                        </span>
                    </div>
                </div>
            </section>
        </div>
    );
}
