import { ChevronLeft, ChevronRight } from 'lucide-react';

type CarouselButtonProps = {
    onClick: () => void;
};

export function CarouselNextButton({ onClick }: CarouselButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex items-center justify-center gap-2.5 border border-stroke-secondary bg-transparent px-2 py-4 font-orbitron text-sm tracking-[2px] text-text-muted uppercase transition-all duration-300 ease-linear hover:border-text-secondary hover:bg-card/30 hover:text-text-secondary"
        >
            <ChevronRight className="size-4 text-inherit" />
        </button>
    );
}

export function CarouselPrevButton({ onClick }: CarouselButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex items-center justify-center gap-2.5 border border-stroke-secondary bg-transparent px-2 py-4 font-orbitron text-sm tracking-[2px] text-text-muted uppercase transition-all duration-300 ease-linear hover:border-text-secondary hover:bg-card/30 hover:text-text-secondary"
        >
            <ChevronLeft className="size-4 text-inherit" />
        </button>
    );
}

export function CarouselPagination() {
    return (
        <div className="flex items-center justify-center gap-1.5">
            <div className="h-0.5 w-4 bg-etherea-cyan shadow-[0_0_6px_0] shadow-etherea-cyan"></div>
            <div className="h-0.5 w-4 bg-text-muted"></div>
            <div className="h-0.5 w-4 bg-text-muted"></div>
        </div>
    );
}
