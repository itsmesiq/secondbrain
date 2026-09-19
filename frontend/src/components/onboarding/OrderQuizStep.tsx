'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { orderQuizQuestions } from '@/data/orderQuiz';
import { useCompleteOnboardingOrder } from '@/lib/api/generated/endpoints/onboarding/onboarding';
import type { MysticOrder } from '@/types/orderQuiz.types';

import OrderQuizIntro from './order/OrderQuizIntro';
import OrderQuizQuestion from './order/OrderQuizQuestion';
import OrderQuizResult from './order/OrderQuizResult';

type QuizPhase = 'intro' | 'questions' | 'result';

const initialScores: Record<MysticOrder, number> = {
    Vanguard: 0,
    Arcane: 0,
    Verdant: 0,
    Forge: 0,
    Veil: 0,
    Ballad: 0,
};

export default function OrderQuizStep() {
    const router = useRouter();

    const completeOrder = useCompleteOnboardingOrder();

    const [phase, setPhase] = useState<QuizPhase>('intro');

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});

    const [scores, setScores] = useState<Record<MysticOrder, number>>(initialScores);

    const [resultOrder, setResultOrder] = useState<MysticOrder | null>(null);

    const currentQuestion = orderQuizQuestions[currentQuestionIndex];

    const selectedAnswer = currentQuestion ? selectedAnswers[currentQuestion.id] : undefined;

    const handleStart = () => {
        setPhase('questions');
    };

    const handleSelectAnswer = (answerId: string) => {
        if (!currentQuestion) {
            return;
        }

        setSelectedAnswers((current) => ({
            ...current,
            [currentQuestion.id]: answerId,
        }));
    };

    const calculateResult = (finalScores: Record<MysticOrder, number>): MysticOrder => {
        const orders = Object.keys(finalScores) as MysticOrder[];

        const highestScore = Math.max(...orders.map((order) => finalScores[order]));

        const tiedOrders = orders.filter((order) => finalScores[order] === highestScore);

        if (tiedOrders.length === 1) {
            return tiedOrders[0];
        }

        for (let index = orderQuizQuestions.length - 1; index >= 0; index -= 1) {
            const question = orderQuizQuestions[index];
            const answerId = selectedAnswers[question.id];

            if (!answerId) {
                continue;
            }

            const answer = question.answers.find((item) => item.id === answerId);

            if (answer && tiedOrders.includes(answer.order)) {
                return answer.order;
            }
        }

        return tiedOrders[0];
    };

    const handleNext = () => {
        if (!currentQuestion || !selectedAnswer) {
            return;
        }

        const answer = currentQuestion.answers.find((item) => item.id === selectedAnswer);

        if (!answer) {
            return;
        }

        const nextScores = {
            ...scores,
            [answer.order]: scores[answer.order] + 1,
        };

        setScores(nextScores);

        const isLastQuestion = currentQuestionIndex === orderQuizQuestions.length - 1;

        if (!isLastQuestion) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            return;
        }

        const result = calculateResult(nextScores);

        setResultOrder(result);
        setPhase('result');
    };

    const handleAcceptOrder = async (selectedOrder: MysticOrder) => {
        if (completeOrder.isPending) {
            return;
        }

        const response = await completeOrder.mutateAsync({
            data: { mysticOrder: selectedOrder },
        });

        if (response.status !== 200) {
            return;
        }

        router.push('/dashboard');
    };

    if (phase === 'intro') {
        return <OrderQuizIntro onStart={handleStart} />;
    }

    if (phase === 'questions' && currentQuestion) {
        return (
            <OrderQuizQuestion
                question={currentQuestion}
                selectedAnswer={selectedAnswer}
                onSelectAnswer={handleSelectAnswer}
                onNext={handleNext}
            />
        );
    }

    if (phase === 'result' && resultOrder) {
        return (
            <OrderQuizResult
                order={resultOrder}
                onAccept={handleAcceptOrder}
                isAccepting={completeOrder.isPending}
            />
        );
    }

    return null;
}
