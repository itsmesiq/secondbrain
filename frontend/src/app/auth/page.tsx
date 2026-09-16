'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import AuthPannel from '@/components/auth-pannel/AuthPannel';
import { EthereaLogo } from '@/components/images';

import { authClient } from '../_lib/auth-client';

export default function AuthPage() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        if (!isPending && session) {
            router.replace('/dashboard');
        }
    }, [isPending, session, router]);

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: 'google',
            callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
        });
    };

    if (isPending) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <Image src={EthereaLogo} alt="Etherea Logo" className="max-w-lg animate-pulse" />
            </div>
        );
    }

    if (session) {
        return null;
    }

    return (
        <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">
            <AuthPannel onSignInWithGoogle={handleGoogleSignIn} />
        </section>
    );
}
