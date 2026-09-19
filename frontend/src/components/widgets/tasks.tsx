import { ListFilter, Plus, Trash } from 'lucide-react';

export default function TasksWidget() {
    return (
        <article className="relative h-full max-h-[520px] w-full max-w-[400px] border border-etherea-purple/25 bg-background">
            <div className="flex items-center justify-between border-b border-stroke-secondary bg-surface px-4 py-3">
                <div className="flex flex-col">
                    <span className="font-orbitron text-xs tracking-[4px] text-etherea-magenta uppercase">
                        Tasks
                    </span>
                    <span className="font-mono text-[10px] tracking-[3px] text-text-muted uppercase">
                        Active Quests
                    </span>
                </div>
                <button
                    type="button"
                    className="border border-stroke-secondary p-2 text-text-muted transition duration-300 ease-in-out hover:border-etherea-purple hover:bg-etherea-purple/10 hover:text-etherea-purple hover:shadow-etherea-purple/25"
                >
                    <Plus className="size-4" />
                </button>
            </div>

            <div className="flex items-center gap-4 border-b border-stroke-secondary px-4 py-2">
                <div className="flex items-end gap-2">
                    <span className="font-orbitron text-base text-etherea-purple">04</span>
                    <span className="mb-0.5 font-mono text-[10px] tracking-[2px] text-text-muted uppercase">
                        active
                    </span>
                </div>
                <div className="h-4 w-0.5 bg-stroke-secondary"></div>
                <div className="flex items-end gap-2">
                    <span className="font-orbitron text-base text-text-muted">02</span>
                    <span className="mb-0.5 font-mono text-[10px] tracking-[2px] text-text-muted uppercase">
                        completed
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-between border-b border-stroke-secondary px-4 text-text-muted uppercase">
                <div className="flex items-center font-orbitron">
                    <div className="border-b border-etherea-purple p-2.5 text-[10px] tracking-[2px] text-etherea-purple">
                        <span>Active</span>
                    </div>
                    <div className="p-2.5 text-[10px] tracking-[2px]">
                        <span>Completed</span>
                    </div>
                </div>
                <button className="flex cursor-pointer items-center gap-1.5 py-1 text-[10px] tracking-[2px] uppercase">
                    <ListFilter className="size-3" />
                    <span>Filter</span>
                </button>
            </div>
            <div className="relative max-h-[350px] overflow-auto font-mono">
                <div className="group flex items-center gap-4 bg-transparent px-4 py-2 transition-colors hover:bg-surface/50">
                    <div className="size-4 border border-stroke-secondary"></div>
                    <div>
                        <span className="text-sm text-text-primary">Finish floor plan</span>
                        <div className="my-1 flex items-center gap-3 text-[10px] text-text-muted uppercase">
                            <span className="py-0.2 border border-text-muted px-1.5">
                                Quarto Terra
                            </span>
                            <span>Sep 19</span>
                            <div className="flex items-center gap-1 text-power-pink">
                                <div className="size-1 bg-power-pink"></div>
                                <span>High</span>
                            </div>
                        </div>
                    </div>
                    <div className="invisible absolute right-5 p-2 opacity-0 transition-all duration-300 ease-in-out group-hover:visible group-hover:opacity-100 hover:bg-card/50">
                        <Trash className="size-3.5 text-text-primary" />
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 flex w-full items-center justify-between border-t border-stroke-secondary bg-surface px-4 py-2 font-mono text-[10px] tracking-[1.5px] text-text-muted uppercase">
                <span>ETHEREA // QUEST LOG</span>
                <div className="flex items-center gap-1">
                    <div className="size-1 bg-etherea-purple"></div>
                    <div className="size-1 bg-etherea-purple"></div>
                    <div className="size-1 bg-etherea-purple"></div>
                    <div className="size-1 bg-etherea-purple"></div>
                </div>
            </div>
        </article>
    );
}
