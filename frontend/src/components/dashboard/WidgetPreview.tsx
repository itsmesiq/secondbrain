import Clock from '../widgets/clock';
import TasksControllerPreview from '../widgets/tasksControllerPreview';
import TasksOverviewPreview from '../widgets/tasksOverviewPreview';

interface WidgetPreviewProps {
    widgetId: string;
    theme: 'light' | 'dark';
    color: string;
}

export default function WidgetPreviewProps({ widgetId, theme, color }: WidgetPreviewProps) {
    return (
        <div className="my-auto w-max overflow-hidden rounded-3xl shadow-[0_0_32px_0] shadow-black">
            {widgetId === 'clock' && <Clock theme={theme} color={color} />}

            {widgetId === 'tasks-overview' && <TasksOverviewPreview theme={theme} color={color} />}

            {widgetId === 'tasks' && <TasksControllerPreview theme={theme} color={color} />}
        </div>
    );
}
