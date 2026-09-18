import { MoveRight } from 'lucide-react';
import { CSSProperties } from 'react';

type NextButtonProps = {
    onClick: () => void;
    ctaText: string;
    disabled?: boolean;
    accentColor?: string;
};

export function PrimaryNextButton({
    onClick,
    ctaText,
    disabled = false,
    accentColor = 'var(--etherea-purple)',
}: NextButtonProps) {
    const style = {
        '--next-button-accent': accentColor,
    } as CSSProperties;

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            style={style}
            className="flex w-full cursor-pointer items-center justify-center gap-2.5 border border-stroke-secondary bg-etherea-purple/8 py-4 font-orbitron text-sm tracking-[2px] text-foreground uppercase shadow-[0_0_16px_0] shadow-transparent transition-all duration-300 ease-linear hover:translate-y-[-1px] hover:border-etherea-purple hover:bg-etherea-purple/15 hover:shadow-[rgba(155,48,255,0.25)]"
        >
            <span>{ctaText}</span>
            <MoveRight className="size-4" style={{ color: 'var(--next-button-accent)' }} />
        </button>
    );
}

export function SecondaryNextButton({ onClick, ctaText, disabled = false }: NextButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className="flex w-full cursor-pointer items-center justify-center gap-2.5 border border-stroke-secondary bg-transparent py-4 font-orbitron text-sm tracking-[2px] text-text-muted uppercase transition-all duration-300 ease-linear hover:border-text-secondary hover:bg-card/30 hover:text-text-secondary"
        >
            <span>{ctaText}</span>
            <MoveRight className="size-4 text-inherit" />
        </button>
    );
}
