"use client"; // not can be render on the server

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
                <button key={i} onClick={() => signIn(provider?.id)}>
                    Log in
                </button>
            ))}</div>
        )
    }

    return null;
}

export default AuthProviders