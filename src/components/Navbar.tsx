import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { NavLinks, UserNavLinks } from '@/constants'
import { getCurrentUser } from '@/lib/session'
import AuthProviders from './AuthProviders'
import ProfileMenu from './ProfileMenu'

const MobileMenu = dynamic(() => import('./header/MobileMenu'), {
    ssr: false,
});
const Navbar = async () => {
    const session = await getCurrentUser();
    return (
        <nav className="navbar">
            <div className="flexBetween pageDefault">
                <div className="flex-1 flexStart gap-5">
                    <Link data-testid="NAV_LOGO" href="/" className="inline-flex items-center gap-4">
                        <Image src="/logo.png?" width={48} height={48} alt="Yvonne logo" />
                        Hey Yvonne!
                    </Link>
                </div>
                <div className="flexCenter gap-4 text-small">
                    <ul className="md:flex hidden gap-7 border-r-2 pr-4 border-slate-200">
                        {
                            session?.user ? UserNavLinks.map(link => (
                                <Link href={link.href} key={link.key} className="hover:text-cyan-800">
                                    {link.text}
                                </Link>
                            )) : null
                        }
                        {NavLinks.map(link => (
                            <Link href={link.href} key={link.key} className="hover:text-cyan-800">
                                {link.text}
                            </Link>
                        ))}
                    </ul>
                    {session?.user ? (
                        <ProfileMenu session={session} />
                    ) : (
                        <AuthProviders />
                    )}
                    <MobileMenu />
                </div>
            </div>
        </nav>
    )
}

export default Navbar