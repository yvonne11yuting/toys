import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Providers from "@/components/Providers"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Hey Yvonne!',
    description: 'A collection of personal life stories and records.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <Navbar />
                    <main className="pageDefault pb-20">{children}</main>
                    <Footer />
                </Providers>
            </body>
        </html>
    )
}
