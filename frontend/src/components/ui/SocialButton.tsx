type SocialButtonProps = {
    icon: React.ReactNode;
    onClick: () => void;
    cta: string;
};

export function SocialButton({ icon, onClick, cta }: SocialButtonProps) {
    return (
        <div className="w-full">
            <button
                type="button"
                onClick={onClick}
                className="flex w-full cursor-pointer items-center justify-center gap-2.5 border border-stroke-secondary bg-surface/85 py-3 transition-all duration-150 ease-linear hover:translate-y-[-1px] hover:border-etherea-purple hover:bg-surface-elevated"
            >
                {icon}
                <span className="font-mono text-sm tracking-[2px] text-foreground uppercase">
                    {cta}
                </span>
            </button>
        </div>
    );
}
