import Clock from '../widgets/clock';

interface WidgetPreviewProps {
    theme: 'light' | 'dark';
    color: string;
}

export default function WidgetPreviewProps({ theme, color }: WidgetPreviewProps) {
    return (
        <div className="overflow-hidden rounded-3xl">
            <Clock theme={theme} color={color} />
        </div>
    );
}
