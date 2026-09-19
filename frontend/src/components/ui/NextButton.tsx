import { MoveRight } from 'lucide-react';
import { CSSProperties } from 'react';

type NextButtonProps = {
    onClick: () => void;
    ctaText: string;
    disabled?: boolean;
    accentColor?: string;
    type?: 'button' | 'submit';
};

export function PrimaryNextButton({
    onClick,
    ctaText,
    disabled = false,
    accentColor = 'var(--etherea-purple)',
    type = 'button',
}: NextButtonProps) {
    const style = {
        '--next-button-accent': accentColor,
    } as CSSProperties;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            style={style}
            className="flex w-full cursor-pointer items-center justify-center gap-2.5 border [border-color:color-mix(in_srgb,var(--next-button-accent)_50%,transparent)] [background-color:color-mix(in_srgb,var(--next-button-accent)_8%,transparent)] py-4 font-orbitron text-sm tracking-[2px] text-foreground uppercase transition-all duration-300 ease-linear hover:translate-y-[-1px] hover:[border-color:var(--next-button-accent)] hover:[background-color:color-mix(in_srgb,var(--next-button-accent)_15%,transparent)] hover:[box-shadow:0_0_20px_color-mix(in_srgb,var(--next-button-accent)_25%,transparent)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:[box-shadow:none]"
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
