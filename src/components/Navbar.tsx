import Link from 'next/link'
import Image from 'next/image'
import { NavLinks } from '@/constants'
import { getCurrentUser } from '@/lib/session'
import AuthProviders from './AuthProviders'
import ProfileMenu from './ProfileMenu'

const Navbar = async () => {
    const session = await getCurrentUser();
    return (
        <nav className="navbar">
            <div className="flexBetween pageDefault">
                <div className="flex-1 flexStart gap-10">
                    <Link href="/">
                        <Image src="/logo.svg" width={60} height={60} alt="yuting logo" />
                    </Link>
                </div>
                <div className="flexCenter gap-4 text-small">
                    <ul className="xs:flex hidden gap-7 border-r-2 pr-4 border-slate-200">
                        {NavLinks.map(link => (
                            <Link href={link.href} key={link.key}>
                                {link.text}
                            </Link>
                        ))}
                    </ul>
                    {session?.user ? (
                        <>
                            <ProfileMenu session={session} />
                            <Link href="/create-project">
                                Share Work
                            </Link>
                        </>
                    ) : (
                        <AuthProviders />
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar