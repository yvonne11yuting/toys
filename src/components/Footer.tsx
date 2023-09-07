import React from 'react'
import Image from 'next/image'

const Footer = () => {
    return (
        <footer className="flexStart footer">
            <div className="flex items-end gap-2 w-full">
                <Image src="/logo.png?" width={32} height={32} alt="YToys logo" />
                <p className="text-start text-sm">
                    A collection of personal life stories and records.
                </p>
            </div>
            <div className="flexBetween footer_copyright">@ 2023 Hey Yvonne! All rights reserved.</div>
        </footer>
    )
}

export default Footer