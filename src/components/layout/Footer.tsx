import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Footer: React.FC = () => (
    <footer className="bg-gradient-to-b from-indigo-800 to-indigo-950 to-15% p-1 fixed w-full bottom-0 flex justify-center items-center">
        <span className="mr-4 text-sm font-bold text-neutral-300 hover:text-neutral-400">
            {' '}
            <Link href="https://github.com/alejandromz96/toxicity-check" target="_blank">
                Developed by Ratatoskers Team
            </Link>
        </span>
        <Image alt="logo" src="/img/ratatoskers.png" width={100} height={100} className="w-7"></Image>
    </footer>
)

export default Footer
