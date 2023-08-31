"use client"
import { useSession } from 'next-auth/react';
import React from 'react'
import AuthProviders from './AuthProviders'
import ProfileMenu from './ProfileMenu'

const SignIn = () => {
    const { data: session } = useSession();

    return session?.user ? (
        <>
            <ProfileMenu session={session} />
            <a href="/create-project">
                Share Work
            </a>
        </>
    ) : (
        <AuthProviders />
    )
}

export default SignIn
