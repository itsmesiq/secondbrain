import OrderQuizIntro from './order/OrderQuizIntro';
import OrderQuizQuestion from './order/OrderQuizQuestion';

export default function OrderQuizStep() {
    return (
        <section className="flex min-h-screen items-stretch">
            <OrderQuizQuestion />
        </section>
    );
}
