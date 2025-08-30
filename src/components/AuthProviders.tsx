'use client';

import { getProviders, signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';

interface Provider {
    id: string;
    name: string;
    type: string;
    signinUrl: string;
    callbackUrl: string;
    signinUrlParams?: Record<string, string> | null;
}

type Providers = Record<string, Provider>;

const AuthProviders = () => {
    const [providers, setProviders] = useState<Providers | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                setIsLoading(true);
                const res = await getProviders();
                setProviders(res);
            } catch (err) {
                console.error('Failed to fetch providers:', err);
                setError('Failed to load authentication providers');
            } finally {
                setIsLoading(false);
            }
        };
        fetchProviders();
    }, []);

    const handleSignIn = async (providerId: string) => {
        try {
            await signIn(providerId, { callbackUrl: '/' });
        } catch (err) {
            console.error('Sign in failed:', err);
            setError('Sign in failed. Please try again.');
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-sm text-red-500">
                {error}
                <button onClick={() => window.location.reload()} className="ml-2 text-blue-500 underline">
                    Retry
                </button>
            </div>
        );
    }

    if (providers && Object.keys(providers).length > 0) {
        return (
            <div className="space-y-2">
                {Object.values(providers).map((provider: Provider) => (
                    <button
                        key={provider.id}
                        onClick={() => handleSignIn(provider.id)}
                        className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50"
                    >
                        {provider.id === 'google' && <img src="/icon-google.svg" width={24} height={24} alt="google" />}
                        <span className="text-sm font-medium">Sign in with {provider.name}</span>
                    </button>
                ))}
            </div>
        );
    }

    return <div className="text-center text-sm text-gray-500">No authentication providers available</div>;
};

export default AuthProviders;
