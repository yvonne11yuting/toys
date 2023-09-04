import React from 'react'
import Image from 'next/image'

const Footer = () => {
    return (
        <footer className="flexStart footer">
            <div className="flex items-end gap-2 w-full">
                <Image src="/logo.png?" width={50} height={50} alt="YToys logo" />
                <p className="text-start text-sm">
                    Just some toys I made and recordings of my life.
                </p>
            </div>
            <div className="flexBetween footer_copyright">@ 2023 HeyYvonne! All rights reserved.</div>
        </footer>
    )
}

export default Footer