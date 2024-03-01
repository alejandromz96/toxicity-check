import React from 'react'
import Image from 'next/image'

const Footer: React.FC = () => (
    <footer className="bg-gradient-to-b from-[#634855] to-[#472B39] to-30% p-2 absolute w-[100%] bottom-0 flex justify-center items-center">
        <Image alt="logo" src="/img/logo.png" width={100} height={100} className="w-12"></Image>
        <span className="ml-4 text-xl font-bold text-white">TOXICITY PROJECT</span>
    </footer>
)

export default Footer
