'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { GoogleIcon, Logo } from '../../components/icons';
import { authClient } from '../_lib/auth-client';

export default function AuthPage() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        if (!isPending && session) {
            router.replace('/');
        }
    }, [isPending, session, router]);

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: 'google',
            callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
        });
    };

    if (isPending) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <Logo className="h-[283px] w-[280px] animate-pulse" />
            </div>
        );
    }

    if (session) {
        return null;
    }

    return (
        <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">
            <div className="item-center flex flex-col justify-between pb-20 lg:pt-32 2xl:pt-41">
                <Logo className="h-[400px] w-[407px] animate-bounce 2xl:h-[560px] 2xl:w-[567px]" />
                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="flex h-[56px] cursor-pointer items-center justify-center gap-6 rounded-full bg-foreground px-20 py-3 transition-opacity hover:opacity-90 active:opacity-80"
                >
                    <GoogleIcon className="h-8 w-8" />
                    <span className="font-sans text-xl leading-[120%] font-semibold tracking-[2.4px] whitespace-nowrap text-background">
                        Entrar com o Google
                    </span>
                </button>
            </div>
            <div className="absolute -top-50 -right-50 h-[600px] w-[600px] rounded-full bg-primary opacity-60 blur-[800px]"></div>
            <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-primary opacity-80 blur-[250px]"></div>
        </section>
    );
}
