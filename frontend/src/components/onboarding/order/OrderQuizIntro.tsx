import Image from 'next/image';

import { EthereaLogo } from '@/components/images';

import {
    HUDCornersBL,
    HUDCornersBR,
    HUDCornersTL,
    HUDCornersTR,
    PixelBorderBL,
    PixelBorderBR,
    PixelBorderTL,
    PixelBorderTR,
} from '../../icons';
import { PrimaryNextButton } from '../../ui/NextButton';

interface OrderQuizIntroProps {
    onStart: () => void;
}

export default function OrderQuizIntro({ onStart }: OrderQuizIntroProps) {
    return (
        <div className="relative flex h-dvh w-dvw flex-col items-center bg-[linear-gradient(0deg,rgba(0,0,0,0.60)_0%,rgba(0,0,0,0.60)_100%),linear-gradient(180deg,rgba(155,48,255,0.02)_0.11%,rgba(0,0,0,0.00)_0.11%),linear-gradient(90deg,_rgba(155,48,255,0.02)_0.07%,rgba(0,0,0,0.00)_0.07%),url('/images/etherea-pallace-background.jpg')] bg-cover bg-center bg-no-repeat shadow-[0_0_40px_0_rgba(155,48,255,0.20),0_0_80px_0_rgba(0,0,0,0.90)]">
            <div className="absolute top-0 z-10 flex w-full items-center justify-between border-b border-stroke-secondary bg-surface/40 px-10 py-3 font-mono text-xs tracking-[2px] text-text-muted backdrop-blur-xs">
                <PixelBorderTL className="absolute top-0 left-0 h-3 w-3" />
                <PixelBorderTR className="absolute top-0 right-0 h-3 w-3" />

                <span>ETHEREA // SYSTEM</span>
                <span className="font-orbitron text-etherea-purple">ORDER PROTOCOL</span>
                <span>INITIALIZATION</span>
            </div>
            <Image
                src={EthereaLogo}
                alt="Etherea Logo"
                className="relative mt-6 h-auto w-[350px]"
            />
            <div className="relative flex h-[480px] w-full max-w-[740px] items-center border border-stroke-secondary bg-[#000000E0] shadow-[0_0_40px_0_rgba(0,0,0,0.80),0_0_80px_0_rgba(155,48,255,0.06)]">
                <div className="absolute top-0 flex w-full items-center justify-between border-b border-stroke-secondary px-5 py-2 font-mono text-[10px] tracking-[2px] text-text-muted">
                    <HUDCornersTL className="absolute top-0 left-0 h-3 w-3 text-etherea-purple" />
                    <HUDCornersTR className="absolute top-0 right-0 h-3 w-3 text-etherea-purple" />

                    <div className="flex items-center gap-1.5">
                        <div className="size-1 bg-etherea-purple shadow-[0_0_3px_0] shadow-etherea-purple"></div>
                        <div className="size-1 bg-etherea-magenta shadow-[0_0_3px_0] shadow-etherea-magenta"></div>
                        <div className="size-1 bg-etherea-cyan shadow-[0_0_3px_0] shadow-etherea-cyan"></div>
                    </div>
                    <span>ETHEREA // PORTAL</span>
                    <div className="flex items-center gap-0.5">
                        <div className="h-0.5 w-2.5 bg-stroke-secondary"></div>
                        <div className="h-0.5 w-2.5 bg-stroke-secondary"></div>
                        <div className="h-0.5 w-2.5 bg-stroke-secondary"></div>
                    </div>
                </div>
                <div className="px-11 text-center">
                    <h1 className="font-orbitron text-4xl tracking-[12px] text-foreground">
                        WELCOME
                    </h1>
                    <div className="my-8 h-0.5 w-full bg-[linear-gradient(90deg,rgba(42,31,74,0.00)_0%,#2A1F4A_20%,#9B30FF_50%,#2A1F4A_80%,rgba(42,31,74,0.00)_100%)]"></div>
                    <div className="flex flex-col gap-4 font-mono text-xs tracking-[0.2px] text-text-primary">
                        <span>Etherea já está observando.</span>
                        <p>
                            Entre seis grandes Ordens, existe aquela que melhor traduz quem você é,
                            como pensa e o que busca. Cada escolha revela um fragmento de quem você
                            pode se tornar.
                        </p>
                        <p>Não pense demais. Escolha o que parece certo.</p>
                        <p>Etheria fará o resto.</p>
                    </div>
                    <div className="my-8 h-0.5 w-full bg-[linear-gradient(90deg,rgba(42,31,74,0.00)_0%,#2A1F4A_20%,#9B30FF_50%,#2A1F4A_80%,rgba(42,31,74,0.00)_100%)]"></div>
                    <PrimaryNextButton onClick={onStart} ctaText="Choose Your Path" />
                </div>
                <div className="absolute bottom-0 flex w-full items-center justify-between border-t border-stroke-secondary px-5 py-2 font-mono text-[10px] tracking-[2px] text-text-muted">
                    <span>PROTOCOL:ACTIVE</span>
                    <div className="flex items-center gap-0.5">
                        <div className="h-0.5 w-2.5 bg-stroke-secondary"></div>
                        <div className="h-0.5 w-2.5 bg-stroke-secondary"></div>
                        <div className="h-0.5 w-2.5 bg-stroke-secondary"></div>
                        <div className="h-0.5 w-2.5 bg-stroke-secondary"></div>
                        <div className="h-0.5 w-2.5 bg-stroke-secondary"></div>
                        <div className="h-0.5 w-2.5 bg-stroke-secondary"></div>
                    </div>
                    <span>SIX ORDERS</span>
                    <HUDCornersBL className="absolute bottom-0 left-0 h-3 w-3 text-etherea-purple" />
                    <HUDCornersBR className="absolute right-0 bottom-0 h-3 w-3 text-etherea-purple" />
                </div>
            </div>
            <div className="absolute bottom-0 flex w-full items-center justify-between border-t border-stroke-secondary bg-surface/40 px-10 py-3 font-mono text-xs tracking-[2px] text-text-muted backdrop-blur-xs">
                <span>37.4219°N // 122.0840°W</span>
                <span>SYS:READY // AWAITING INPUT</span>
                <span>v0.12 // BUILD 4A1F</span>
                <PixelBorderBL className="absolute bottom-0 left-0 h-3 w-3" />
                <PixelBorderBR className="absolute right-0 bottom-0 h-3 w-3" />
            </div>
        </div>
    );
}
