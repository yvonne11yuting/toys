import { getServerSession } from 'next-auth/next';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import type { SessionInterface } from '@/common.types';
import { isCurrentUserAdmin } from './admin';

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    theme: {
        colorScheme: 'light',
        logo: '/logo.png',
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            // 允许相对 URL 和同域 URL
            if (url.startsWith('/')) return `${baseUrl}${url}`;
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
        async session({ session, token }) {
            // add admin permission to session
            if (session.user?.email) {
                (session as any).isAdmin = isCurrentUserAdmin(session.user.email);
            }
            return session;
        },
        async jwt({ token, user }) {
            // add admin permission to JWT token
            if (user?.email) {
                token.isAdmin = isCurrentUserAdmin(user.email);
            }
            return token;
        },
    },
    debug: process.env.NODE_ENV === 'development',
};

export async function getCurrentUser() {
    const session = (await getServerSession(authOptions)) as SessionInterface;

    return session;
}
