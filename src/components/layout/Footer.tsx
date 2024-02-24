import React from 'react'
import Image from 'next/image'

const Footer: React.FC = () => (
    <footer className="bg-[#69845A] p-2 flex">
        <Image alt="logo" src="/img/logo.png" width={100} height={100} className="w-20"></Image>
        TOXICITY PROJECT
    </footer>
)

export default Footer
