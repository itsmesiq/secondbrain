import Image from 'next/image';
import { CSSProperties, useState } from 'react';

import { orders } from '@/data/orderQuiz';
import type { MysticOrder } from '@/types/orderQuiz.types';

import { HUDCornersBL, HUDCornersBR, HUDCornersTL, HUDCornersTR } from '../../icons';
import { PrimaryNextButton } from '../../ui/NextButton';

interface OrderQuizResultProps {
    order: MysticOrder;
    onAccept: (order: MysticOrder) => void;
    isAccepting?: boolean;
}

export default function OrderQuizResult({
    order,
    onAccept,
    isAccepting = false,
}: OrderQuizResultProps) {
    const [activeOrder, setActiveOrder] = useState<MysticOrder>(order);
    const data = orders[activeOrder];

    const orderStyle = {
        '--order-accent': data.accent,
        '--order-accent-soft': `color-mix(in srgb, ${data.accent} 10%, transparent)`,
        '--order-accent-border': `color-mix(in srgb, ${data.accent} 25%, transparent)`,
        '--order-accent-glow': `color-mix(in srgb, ${data.accent} 35%, transparent)`,
        '--order-accent-strong': `color-mix(in srgb, ${data.accent} 60%, transparent)`,
    } as CSSProperties;

    const accentGradient = {
        background:
            'linear-gradient(90deg, var(--order-accent) 0%, color-mix(in srgb, var(--order-accent) 75%, transparent) 35%, color-mix(in srgb, var(--order-accent) 40%, transparent) 65%, transparent 100%)',
    };

    return (
        <section className="w-full" style={orderStyle}>
            <div className="flex items-center justify-between border-b border-stroke-secondary px-12 py-3 font-mono text-[10px] tracking-[2px] text-text-muted">
                <span>ETHEREA // ORDER PROTOCOL</span>
                <div className="flex items-center gap-2">
                    <div
                        className="size-2"
                        style={{ backgroundColor: 'var(--order-accent)', opacity: 0.3 }}
                    ></div>
                    <span className="font-orbitron" style={{ color: 'var(--order-accent)' }}>
                        ORDEM IDENTIFICADA
                    </span>
                </div>
                <span>RESULT: CONFIRMED</span>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 pt-8 pb-5">
                <h3 className="font-orbitron text-lg font-semibold tracking-[3px] text-foreground">
                    <span style={{ color: 'var(--order-accent)' }}>ETHEREA</span> já reconheceu
                    você.
                </h3>
                <p className="font-mono text-sm text-text-secondary">
                    Entre as seis grandes Ordens, uma delas traduz a forma como você pensa, cria e
                    existe.
                </p>
            </div>

            <div className="h-[1px] w-full" style={accentGradient}></div>

            <div className="flex w-full items-center justify-between gap-10 py-8">
                <div className="relative min-w-[684px]">
                    <Image
                        src={data.leader}
                        alt={`${data.name} Leader`}
                        width={684}
                        height={1026}
                        className="relative z-10"
                    />
                    <div
                        className="absolute inset-0 z-0 h-[1026px] w-[684px] opacity-40 blur-[116px]"
                        style={{ backgroundColor: 'var(--order-accent)' }}
                    ></div>
                </div>

                <div className="w-full pr-8">
                    <div className="flex items-center justify-between font-mono">
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-2 py-1.5">
                                <h1 className="font-orbitron text-4xl tracking-[4px] text-foreground uppercase">
                                    The {data.name}
                                </h1>
                                <p className="text-base text-text-muted uppercase">
                                    Elemento:{' '}
                                    <span style={{ color: 'var(--order-accent)' }}>
                                        {data.element}
                                    </span>
                                </p>
                            </div>
                            <div
                                className="relative px-4 py-5"
                                style={{
                                    borderColor: 'var(--order-accent-border)',
                                    borderWidth: 1,
                                    backgroundColor: 'var(--order-accent-soft)',
                                }}
                            >
                                <HUDCornersBL
                                    className="absolute bottom-0 left-0 h-3 w-3"
                                    style={{ color: 'var(--order-accent)' }}
                                />
                                <HUDCornersBR
                                    className="absolute right-0 bottom-0 h-3 w-3"
                                    style={{ color: 'var(--order-accent)' }}
                                />
                                <HUDCornersTL
                                    className="absolute top-0 left-0 h-3 w-3"
                                    style={{ color: 'var(--order-accent)' }}
                                />
                                <HUDCornersTR
                                    className="absolute top-0 right-0 h-3 w-3"
                                    style={{ color: 'var(--order-accent)' }}
                                />

                                <span
                                    className="font-orbitron text-xs tracking-[0.5px]"
                                    style={{ color: 'var(--order-accent)' }}
                                >
                                    &quot;{data.quote}&quot;
                                </span>
                            </div>
                        </div>
                        <Image
                            src={data.symbol}
                            alt={`${data.name} Symbol`}
                            width={232}
                            height={232}
                        />
                    </div>

                    <div className="my-8 h-[1px] w-full" style={accentGradient}></div>

                    <div className="flex w-full items-stretch gap-8">
                        <div
                            className="relative max-w-[364px] border border-stroke-secondary bg-surface px-6 py-5 font-mono text-sm leading-[175%] tracking-[0.2px] text-text-primary"
                            style={{
                                borderColor: 'var(--order-accent-border)',
                                boxShadow:
                                    '0 0 24px 0 var(--order-accent-glow), inset 0 0 40px 0 rgba(0,0,0,0.60)',
                            }}
                        >
                            <p className="whitespace-pre-line">{data.lore}</p>
                            <div
                                className="mt-6 flex w-full flex-wrap items-center gap-2 pt-6 text-[10px]"
                                style={{
                                    borderTopColor: 'var(--order-accent-border)',
                                    borderTopWidth: 1,
                                }}
                            >
                                {data.tags.map((tag) => (
                                    <div
                                        key={tag}
                                        className="px-2 py-0.5 uppercase"
                                        style={{
                                            borderColor: 'var(--order-accent-border)',
                                            borderWidth: 1,
                                        }}
                                    >
                                        <span>{tag}</span>
                                    </div>
                                ))}
                            </div>

                            <div
                                className="w- absolute inset-x-0 bottom-0 flex items-center justify-between px-6 py-3 font-mono text-[10px] tracking-[1.5px] text-text-muted"
                                style={{
                                    borderTopColor: 'var(--order-accent-border)',
                                    borderTopWidth: 1,
                                }}
                            >
                                <span>ORDER:CONFIRMED</span>
                                <span>ETHEREA v0.12</span>
                            </div>
                        </div>

                        <div className="flex w-[300px] flex-col gap-8">
                            <div
                                className="bg-surface"
                                style={{
                                    borderColor: 'var(--order-accent)',
                                    borderWidth: 1,
                                    boxShadow:
                                        '0 0 24px 0 var(--order-accent-glow), inset 0 0 40px 0 rgba(0,0,0,0.60)',
                                }}
                            >
                                <div
                                    className="flex items-center justify-between px-3 py-1.5 font-mono text-[10px] tracking-[1.5px] uppercase"
                                    style={{ color: 'var(--order-accent)' }}
                                >
                                    <span>ID: {data.name} Leader</span>
                                    <span>Confidential</span>
                                </div>
                                <Image
                                    src={data.details}
                                    alt={`${data.name} Details`}
                                    width={300}
                                    height={148}
                                />
                                <div className="flex items-center gap-2 px-3 py-2 font-mono text-[10px] tracking-[1px] text-text-muted uppercase">
                                    <span>▶</span>
                                    <span>{data.quote}</span>
                                </div>
                                <div
                                    className="flex items-center justify-between bg-[rgba(0,0,0,0.40)] px-3 py-2"
                                    style={{
                                        borderTopColor: 'var(--order-accent-border)',
                                        borderTopWidth: 1,
                                    }}
                                >
                                    <div className="flex flex-col items-start gap-0.5 font-orbitron text-xs tracking-[2px] uppercase">
                                        <span className="font-mono text-[10px] text-text-muted">
                                            Archetype
                                        </span>
                                        <span style={{ color: 'var(--order-accent)' }}>
                                            {data.archetype}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-end gap-0.5 font-orbitron text-xs tracking-[2px] uppercase">
                                        <span className="font-mono text-[10px] text-text-muted">
                                            Type
                                        </span>
                                        <span style={{ color: 'var(--order-accent)' }}>
                                            classified
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="bg-surface"
                                style={{
                                    borderColor: 'var(--order-accent)',
                                    borderWidth: 1,
                                    boxShadow:
                                        '0 0 24px 0 var(--order-accent-glow), inset 0 0 40px 0 rgba(0,0,0,0.60)',
                                }}
                            >
                                <div
                                    className="flex items-center justify-between px-3 py-1.5 font-mono text-[10px] tracking-[1.5px] uppercase"
                                    style={{ color: 'var(--order-accent)' }}
                                >
                                    <span>Sprite</span>
                                    <span>Classified</span>
                                </div>
                                <Image
                                    src={data.sprite}
                                    alt={`${data.name} Sprite`}
                                    width={300}
                                    height={255}
                                />
                                <div
                                    className="flex items-center justify-between bg-[rgba(0,0,0,0.40)] px-3 py-2"
                                    style={{
                                        borderTopColor: 'var(--order-accent-border)',
                                        borderTopWidth: 1,
                                    }}
                                >
                                    <div className="flex flex-col items-start gap-0.5 font-orbitron text-xs tracking-[2px] uppercase">
                                        <span className="font-mono text-[10px] text-text-muted">
                                            Power
                                        </span>
                                        <span style={{ color: 'var(--order-accent)' }}>Unkown</span>
                                    </div>
                                    <div className="flex flex-col items-end gap-0.5 font-orbitron text-xs tracking-[2px] uppercase">
                                        <span className="font-mono text-[10px] text-text-muted">
                                            Don&apos;t engage
                                        </span>
                                        <span style={{ color: 'var(--order-accent)' }}>Danger</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto mt-12 w-[300px]">
                        <PrimaryNextButton
                            onClick={() => onAccept(activeOrder)}
                            ctaText={isAccepting ? 'CONFIRMANDO' : 'ACEITAR MINHA ORDEM'}
                            disabled={isAccepting}
                            accentColor={data.accent}
                        />
                    </div>
                </div>
            </div>
            <div className="h-[1px] w-full" style={accentGradient}></div>

            <div className="w-full py-8">
                <h2 className="text-center font-orbitron text-base tracking-[3px] text-text-primary uppercase">
                    Explorar outras Ordens
                </h2>

                <div className="flex w-full items-center justify-center gap-10 px-16 py-8">
                    {(Object.keys(orders) as MysticOrder[]).map((item) => {
                        const itemData = orders[item];
                        const isActive = item === activeOrder;

                        return (
                            <button
                                key={item}
                                type="button"
                                onClick={() => setActiveOrder(item)}
                                className="flex cursor-pointer flex-col items-center gap-2 border p-3 transition-all duration-300 ease-linear hover:translate-y-[-1px]"
                                style={{
                                    borderColor: isActive
                                        ? itemData.accent
                                        : 'var(--stroke-primary)',
                                    backgroundColor: isActive
                                        ? `color-mix(in srgb, ${itemData.accent} 10%, transparent)`
                                        : 'var(--surface)',
                                    boxShadow: isActive
                                        ? `0 0 24px 0 color-mix(in srgb, ${itemData.accent} 25%, transparent)`
                                        : 'none',
                                }}
                            >
                                <Image
                                    src={itemData.symbol}
                                    alt={`${itemData.name} Symbol`}
                                    width={150}
                                    height={150}
                                />
                                <span
                                    className="font-mono text-xs tracking-[1px] uppercase"
                                    style={{
                                        color: isActive ? itemData.accent : 'var(--text-primary)',
                                    }}
                                >
                                    {item}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
