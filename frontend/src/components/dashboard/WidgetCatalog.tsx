import WidgetCard from '@/components/dashboard/WidgetCard';

export default function WidgetCatalog() {
    return (
        <section>
            <h1 className="mb-14 font-sans text-4xl font-bold">⚡ Widgets</h1>

            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                <WidgetCard />
                <WidgetCard />
                <WidgetCard />
                <WidgetCard />
                <WidgetCard />
                <WidgetCard />
            </div>
        </section>
    );
}
