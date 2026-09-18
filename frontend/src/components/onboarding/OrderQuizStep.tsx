import OrderQuizIntro from './order/OrderQuizIntro';
import OrderQuizQuestion from './order/OrderQuizQuestion';
import OrderQuizResult from './order/OrderQuizResult';

export default function OrderQuizStep() {
    return (
        <section className="flex min-h-screen items-stretch">
            <OrderQuizResult />
        </section>
    );
}
