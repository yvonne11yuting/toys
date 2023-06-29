import React from 'react'
import Image from 'next/image'
import { footerLinks } from '@/constants'
import Link from 'next/link';

interface FooterCol {
    title: string;
    links: string[];
};

interface ColumnProps {
    data: FooterCol[]
};

const FooterColumns = ({ data }: ColumnProps) => data.map(({ title, links }) => (
    <div className="footer_column" key={title}>
        <h4 className="font-semibold">{title}</h4>
        <ul className="flex flex-col gap-2 font-normal">
            {links.map(link => <Link href="/" key={link}>{link}</Link>)}
        </ul>
    </div>
));

const Footer = () => {
    return (
        <footer className="flexStart footer">
            <div className="flex flex-col gap-12 w-full">
                <div className="flex items-start flex-col">
                    <Image src="/logo.svg" width={50} height={50} alt="yuting logo" />
                    <p className="text-start text-sm font-normal mt-5 max-w-xs">
                        This is just my life recording and some toys I made.
                    </p>
                </div>
            </div>
            <div className="flex flex-wrap gap-12">
                <FooterColumns data={footerLinks} />
            </div>
            <div className="flexBetween footer_copyright">
                <p>@ 2023 YOasis. All rights reserved</p>
                <p className="text-gray">
                    <span className="text-black font-semibold">10,214</span> projects submitted
                </p>
            </div>
        </footer>
    )
}

export default Footer