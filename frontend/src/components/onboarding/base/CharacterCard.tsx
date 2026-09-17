export function CharacterCard() {
    return (
        <article
            className="relative h-[432px] w-[324px] border border-power-pink shadow-[0_0_24px_0] shadow-power-pink/35"
            style={{
                backgroundImage: 'url(/images/characters/character-explorer.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="absolute inset-0 bg-[radial-gradient(70.71%_70.71%_at_50%_50%,rgba(5,5,10,0.00)_40%,rgba(5,5,10,0.65)_100%))]"></div>
            <div className="relative h-full w-full">
                <div className="absolute top-0 flex w-full items-center justify-between border-b border-power-pink/20 bg-power-pink/10 px-3 py-1.5 font-mono text-[10px] tracking-[1.5px] text-power-pink backdrop-blur-xs">
                    <span>ID: Explorer</span>
                    <span>▶ SELECTED</span>
                </div>
                <div className="absolute bottom-0 flex w-full items-center justify-between border-t border-power-pink/20 bg-background/40 px-3 py-2 backdrop-blur-xs">
                    <div className="flex flex-col items-start">
                        <span className="font-mono text-[10px] tracking-[2px] text-text-muted uppercase">
                            Archetype
                        </span>
                        <span className="font-orbitron text-xs tracking-[2px] text-power-pink uppercase">
                            Explorer
                        </span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="font-mono text-[10px] tracking-[2px] text-text-muted uppercase">
                            Type
                        </span>
                        <span className="font-orbitron text-xs tracking-[2px] text-power-pink uppercase">
                            Enthusiastic
                        </span>
                    </div>
                </div>
            </div>
        </article>
    );
}
