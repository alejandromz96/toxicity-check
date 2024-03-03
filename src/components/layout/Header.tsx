import React from 'react'
import Image from 'next/image'

const Header: React.FC = () => (
    <header className="bg-gradient-to-b from-[#24161D] to-[#472B39] to-70% p-2 fixed w-[100%] top-0 flex justify-center items-center z-20">
        <Image alt="logo" src="/img/logo.png" width={100} height={100} className="w-9"></Image>
        <span className="ml-5 text-xl font-extrabold font-mono text-slate-300">TOXICITY PROJECT</span>
    </header>
)

export default Header
