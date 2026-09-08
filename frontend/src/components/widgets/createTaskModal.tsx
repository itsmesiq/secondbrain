import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { useState } from 'react';

interface ProjectsOption {
    id: string;
    name: string;
}

interface CreateTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedDate: Date;
    projects: ProjectsOption[];
    token: string;
}

export default function CreateTaskModal({
    isOpen,
    onClose,
    selectedDate,
    projects,
    token,
}: CreateTaskModalProps) {
    const areaOptions = [
        { id: '🎮 Hobbies', name: '🎮 Hobbies' },
        { id: '💰 Finanças', name: '💰 Finanças' },
        { id: '🏃 Saúde', name: '🏃 Saúde' },
        { id: '🏠 Pessoal', name: '🏠 Pessoal' },
        { id: '💼 Carreira', name: '💼 Carreira' },
        { id: '📚 Estudos', name: '📚 Estudos' },
        { id: '🎓 Faculdade', name: '🎓 Faculdade' },
        { id: '💻 Dev', name: '💻 Dev' },
    ];

    const priorityOptions = [
        { id: '🟢 Baixa', name: '🟢 Baixa' },
        { id: '🟡 Média', name: '🟡 Média' },
        { id: '🔴 Alta', name: '🔴 Alta' },
    ];

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [priority, setPriority] = useState('');
    const [dueDate, setDueDate] = useState(() => {
        return [
            selectedDate.getFullYear(),
            String(selectedDate.getMonth() + 1).padStart(2, '0'),
            String(selectedDate.getDate()).padStart(2, '0'),
        ].join('-');
    });

    if (!isOpen) {
        return null;
    }

    return (
        <div className="relative h-full w-full">
            <div className="absolute bottom-0 z-10 flex w-full flex-col items-center justify-center gap-6 bg-widget-background px-8 py-6">
                <div className="flex w-full items-center justify-between">
                    <h2 className="font-mono text-lg">Adicionar Tarefa</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="cursor-pointer p-1 text-widget-foreground/60 transition-colors hover:text-widget-foreground"
                    >
                        <X className="size-6" />
                    </button>
                </div>
                <div className="flex w-full flex-col gap-4 text-widget-foreground">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="task-title" className="font-sans text-sm font-medium">
                            Titulo <span className="text-widget-accent">*</span>
                        </label>
                        <input
                            type="text"
                            id="task-title"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder="Digite o título da tarefa"
                            className="rounded-lg border border-widget-foreground/20 bg-widget-background px-4 py-2 font-sans text-sm transition-colors outline-none placeholder:text-foreground/40 focus:border-widget-accent"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="task-description" className="font-sans text-sm font-medium">
                            Descrição
                        </label>
                        <textarea
                            id="task-description"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            placeholder="Digite uma descrição..."
                            rows={2}
                            className="rounded-lg border border-widget-foreground/20 bg-widget-background px-4 py-2 font-sans text-sm transition-colors outline-none placeholder:text-foreground/40 focus:border-widget-accent"
                        />
                    </div>
                </div>
            </div>
            <div
                className="absolute top-0 z-0 h-full w-full bg-widget-background/50 backdrop-blur-sm"
                onClick={onClose}
            ></div>
        </div>
    );
}
