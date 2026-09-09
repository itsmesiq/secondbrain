import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { useState } from 'react';

type DropdownOption = {
    id: string;
    name: string;
};

type DropdownProps = {
    options: DropdownOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

export default function Dropdown({
    options,
    value,
    onChange,
    placeholder = 'Filtre por projeto',
}: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options.find((option) => option.id === value);

    const handleOptionClick = (optionId: string) => {
        onChange(optionId);

        setIsOpen(false);
    };

    const handleUnsetOptionClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        onChange('');
        setIsOpen(false);
    };

    return (
        <div>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-foreground/20 bg-widget-background/50 px-4 py-2 font-sans text-sm text-foreground transition-colors duration-300 ease-in hover:bg-background/70"
            >
                <span
                    className={`${selectedOption?.name ? 'text-foreground' : 'text-foreground/40'}`}
                >
                    {selectedOption?.name ?? placeholder}
                </span>

                <div className="flex items-center gap-2">
                    {selectedOption?.name !== undefined && (
                        <div
                            role="button"
                            tabIndex={0}
                            aria-label="Clear selection"
                            onClick={handleUnsetOptionClick}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === '') {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onChange('');
                                    setIsOpen(false);
                                }
                            }}
                            className="flex items-center justify-center"
                        >
                            <X className="size-4" />
                        </div>
                    )}
                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                </div>
            </button>
            {isOpen && (
                <div className="max-h-[180px] overflow-auto">
                    {options.map((option) => (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => handleOptionClick(option.id)}
                            className="ease w-full cursor-pointer rounded-lg bg-widget-background/80 px-3 py-3 text-left text-sm transition-colors duration-300 hover:text-widget-accent"
                        >
                            {option.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
