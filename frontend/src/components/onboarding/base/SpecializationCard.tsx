import { Plus } from 'lucide-react';

export function SpecializationCard() {
    return (
        <article className="flex min-h-[130px] w-full flex-col items-start justify-center gap-3 border border-stroke-secondary bg-surface/80 px-4 py-3.5">
            <div className="flex items-center gap-2 text-sm text-body-yellow uppercase">
                <span className="font-mono">◈</span>
                <h3 className="font-orbitron">Corpo</h3>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
                <span>FORÇA</span>
                <span>RESISTÊNCIA</span>
                <span>VITALIDADE</span>
                <span>DISCIPLINA</span>
            </div>
            <form className="flex w-full items-center gap-2">
                <input
                    type="text"
                    placeholder="Adicionar especialização..."
                    className="w-full border border-stroke-primary bg-surface/80 px-3.5 py-2.5 text-foreground shadow-[0_0_8px_0] shadow-etherea-purple/8 transition-colors duration-300 ease-in-out outline-none placeholder:font-mono placeholder:text-xs placeholder:text-text-muted focus:border-etherea-purple focus:shadow-etherea-purple/25"
                />
                <button
                    type="submit"
                    aria-label="Adicionar"
                    className="flex cursor-pointer items-center border border-stroke-primary bg-surface/80 p-2.5 shadow-[0_0_8px_0] shadow-etherea-purple/8 transition-all duration-300 ease-in-out hover:border-etherea-purple hover:bg-etherea-purple/20 hover:shadow-etherea-purple/25"
                >
                    <Plus className="m-1 size-4 text-etherea-purple" />
                </button>
            </form>
            <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-[0.5px] text-text-muted">
                <span>Necessário cadastrar no mínimo 1 especialização</span>
            </div>
        </article>
    );
}
