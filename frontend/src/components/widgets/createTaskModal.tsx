import { LoaderCircle, Plus, X } from 'lucide-react';
import { useState } from 'react';

import { useCreateWidgetTask } from '@/lib/api/generated/endpoints/widgets/widgets';

import Dropdown from '../ui/Dropdown';

interface ProjectsOption {
    id: string;
    name: string;
}

interface CreateTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onTaskCreated: () => void;
    selectedDate: Date;
    projects: ProjectsOption[];
    token: string;
}

export default function CreateTaskModal({
    isOpen,
    onClose,
    onTaskCreated,
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

    const [isSubmitting, setIsSubmitting] = useState(false);
    const createTaskMutation = useCreateWidgetTask({
        request: {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        },
    });

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!title.trim()) {
            return;
        }

        setIsSubmitting(true);

        try {
            await createTaskMutation.mutateAsync({
                data: {
                    title: title.trim(),
                    projectId: selectedProject || undefined,
                    category: selectedArea || undefined,
                    priority: priority || undefined,
                    dueDate: dueDate || undefined,
                },
            });

            onTaskCreated();
            onClose();
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="relative h-full w-full">
            <div className="absolute bottom-0 z-10 flex max-h-[580px] w-full flex-col items-center justify-center gap-6 rounded-t-4xl bg-widget-background py-6">
                <div className="flex w-full items-center justify-between px-8">
                    <h2 className="font-mono text-lg">Adicionar Tarefa</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="cursor-pointer p-1 text-widget-foreground/60 transition-colors hover:text-widget-foreground"
                    >
                        <X className="size-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="flex w-full flex-col gap-4 overflow-auto text-widget-foreground">
                        <div className="flex flex-col gap-2 px-8">
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

                        <div className="flex flex-col gap-2 px-8">
                            <span className="font-sans text-sm font-medium">Projeto</span>
                            <Dropdown
                                options={projects}
                                value={selectedProject}
                                onChange={setSelectedProject}
                                placeholder="Selecione um projeto"
                            />
                        </div>

                        <div className="flex flex-col gap-2 px-8">
                            <span className="font-sans text-sm font-medium">Área</span>
                            <Dropdown
                                options={areaOptions}
                                value={selectedArea}
                                onChange={setSelectedArea}
                                placeholder="Selecione uma área"
                            />
                        </div>

                        <div className="flex flex-col gap-2 px-8">
                            <span className="font-sans text-sm font-medium">Prioridade</span>
                            <Dropdown
                                options={priorityOptions}
                                value={priority}
                                onChange={setPriority}
                                placeholder="Selecione uma prioridade"
                            />
                        </div>

                        <div className="flex flex-col gap-2 px-8">
                            <label
                                htmlFor="task-due-date"
                                className="font-sans text-sm font-medium"
                            >
                                Prazo
                            </label>
                            <input
                                id="task-due-date"
                                type="date"
                                value={dueDate}
                                onChange={(event) => setDueDate(event.target.value)}
                                className="h-[41.6px] rounded-lg border border-widget-foreground/20 bg-widget-background px-4 py-2 font-sans text-sm transition-colors outline-none placeholder:text-foreground/40 focus:border-widget-accent"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={!title.trim() || isSubmitting}
                        className="mx-auto mt-6 flex w-full max-w-[328px] cursor-pointer justify-center rounded-lg bg-widget-accent py-3 font-sans text-sm font-semibold tracking-[2.4px] transition-all duration-500 ease-in-out hover:scale-103"
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center gap-2">
                                <LoaderCircle className="size-5 animate-spin" />
                                <span>Adicionando...</span>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-2">
                                <Plus className="size-5" />
                                <span>Adicionar Tarefa</span>
                            </div>
                        )}
                    </button>
                </form>
            </div>
            <div
                className="absolute top-0 z-0 h-full w-full bg-widget-background/50 backdrop-blur-sm"
                onClick={onClose}
            ></div>
        </div>
    );
}
