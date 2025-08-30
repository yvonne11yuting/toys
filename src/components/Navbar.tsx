import Link from 'next/link';
import Image from 'next/image';
import { NavLinks, UserNavLinks } from '@/constants';
import { getCurrentUser } from '@/lib/session';
import AuthProviders from './AuthProviders';
import ProfileMenu from './ProfileMenu';
import MobileMenuWrapper from './header/MobileMenuWrapper';

const Navbar = async () => {
    const session = await getCurrentUser();
    return (
        <nav className="navbar">
            <div className="flexBetween pageDefault">
                <div className="flexStart flex-1 gap-5">
                    <Link data-testid="NAV_LOGO" href="/" className="inline-flex items-center gap-4">
                        <Image src="/logo.png?" width={48} height={48} alt="Yvonne logo" />
                        Hey Yvonne!
                    </Link>
                </div>
                <div className="flexCenter text-small gap-4">
                    <ul className="hidden gap-7 border-r-2 border-slate-200 pr-4 md:flex">
                        {session?.user
                            ? UserNavLinks.map((link) => (
                                  <Link href={link.href} key={link.key} className="hover:text-cyan-800">
                                      {link.text}
                                  </Link>
                              ))
                            : null}
                        {NavLinks.map((link) => (
                            <Link href={link.href} key={link.key} className="hover:text-cyan-800">
                                {link.text}
                            </Link>
                        ))}
                    </ul>
                    {session?.user ? <ProfileMenu session={session} /> : <AuthProviders />}
                    <MobileMenuWrapper />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
