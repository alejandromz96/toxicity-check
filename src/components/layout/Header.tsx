import React from 'react'
import Image from 'next/image'

const Header: React.FC = () => (
    <header className="bg-gradient-to-b from-[#24161D] from-80% to-[#472B39] p-2 sticky w-full top-0 flex justify-center items-center z-10">
        <Image alt="logo" src="/img/logo.png" width={100} height={100} className="w-9"></Image>
        <span className="ml-5 text-3xl font-bold text-slate-300">TOXICITY CHECK</span>
    </header>
)

export default Header
