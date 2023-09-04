"use client";

import { getProviders, signIn } from 'next-auth/react'
import { useState, useEffect } from 'react';

interface Provider {
    id: string;
    name: string;
    type: string;
    signinUrl: string;
    callbackUrl: string;
    signinUrlParams?: Record<string, string> | null
}

type Providers = Record<string, Provider>;

const AuthProviders = () => {
    const [providers, setProviders] = useState<Providers | null>(null);

    useEffect(() => {
        const fetchProviders = async () => {
            const res = await getProviders();

            console.log(res);

            setProviders(res);
        }
        fetchProviders();
    }, [])

    if (providers) {
        return (
            <div>{Object.values(providers).map((provider: Provider, i) => (
                <button key={i} onClick={() => signIn(provider?.id)} className="flex items-center justify-center gap-1">
                    <img src="/icon-google.svg" width={24} height={24} alt="google" />
                    <span className="hidden md:inline">Log In/On</span>
                </button>
            ))}</div>
        )
    }

    return null;
}

export default AuthProviders