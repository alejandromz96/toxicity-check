import React from 'react'
import Image from 'next/image'

const Footer: React.FC = () => (
    <footer className="bg-gradient-to-b from-[#472B39] to-[#24161D] to-30% p-2 fixed w-[100%] bottom-0 flex justify-center items-center z-20">
        <span className="mr-4 text-base font-bold text-slate-300">developed by Ratatoskers Team</span>
        <Image alt="logo" src="/img/ratatoskers.png" width={100} height={100} className="w-9"></Image>
    </footer>
)

export default Footer
