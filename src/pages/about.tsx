import { createElement, type JSX } from 'react'
import { useRouter } from 'next/router'
import { UserCircleIcon, AtSymbolIcon, ComputerDesktopIcon, CommandLineIcon } from '@heroicons/react/24/solid'

type MediaUrlType = 'linkedIn' | 'github' | 'portfolio' | 'twitter'

interface IPromoCard {
    name: string
    profileImage?: string
    description?: string
    links: Partial<Record<MediaUrlType, string>>
}

const iconWithMedia: Record<MediaUrlType, JSX.Element> = {
    linkedIn: createElement(ComputerDesktopIcon, { className: 'w-5 h-5' }),
    github: createElement(CommandLineIcon, { className: 'w-5 h-5' }),
    portfolio: createElement(UserCircleIcon, { className: 'w-5 h-5' }),
    twitter: createElement(AtSymbolIcon, { className: 'w-5 h-5' }),
}

const DEFAULT_IMAGE_PATH = '/default_image.png'

// TODO: Add personal data of the other teammates (:
const PERSONAL_DATA: IPromoCard[] = [
    {
        name: 'CPL121',
        profileImage: 'https://raw.seadn.io/files/576dd82b5edd4bf7ebcba49251e28175.jpg',
        description: 'Fullstack Web3 Developer',
        links: {
            linkedIn: 'https://es.linkedin.com/in/c%C3%A9sar-pe%C3%B3n-lamparero/',
            github: 'https://github.com/cpl121/',
            portfolio: 'https://cpl121.eth.limo/',
            twitter: 'https://twitter.com/CPL121_',
        },
    },
    {
        name: 'Alex',
        links: {
            github: 'https://github.com/alejandromz96/',
        },
    },
    {
        name: 'Pepe',
        links: {
            github: 'https://github.com/CodingAndCodingAgain/',
        },
    },
]

export default function AboutPage(): JSX.Element {
    const router = useRouter()
    const handleOnclick = async (): Promise<void> => {
        await router.push('/')
    }
    return (
        <div className="flex flex-col max-h-3/4 h-full w-full space-y-6 pt-4 text-gray-400">
            <span className="text-2xl text-center">ABOUT PAGE</span>
            <div className="flex flex-col justify-center items-center space-y-8 w-full">
                {PERSONAL_DATA.map((data, index) => (
                    <div
                        className="flex flex-col border-2 border-solid rounded-xl md:p-4 w-full h-fit md:space-y-4 hover:shadow-lg hover:shadow-emerald-500 bg-opacity-60 bg-slate-900 max-w-96"
                        key={index}
                    >
                        <span className="text-bold text-center text-xl border-b border-solid">{data.name}</span>
                        <div className="flex flex-col items-center md:items-start md:flex-row space-y-2 md:space-y-0 md:space-x-6">
                            <img
                                src={data.profileImage ?? DEFAULT_IMAGE_PATH}
                                alt={data.name}
                                className="rounded-full w-32 h-32"
                            />
                            <div className="flex flex-col space-y-3 items-start">
                                {Object.entries(data.links).map(([key, value]) => (
                                    <div
                                        className="flex flex-row space-x-2 justify-center items-center hover:text-cyan-400"
                                        key={key}
                                    >
                                        {iconWithMedia[key as MediaUrlType]}
                                        <a href={value} target="_blank" rel="noopener noreferrer" className="link">
                                            {key}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {data.description && <span className="text-center text-lg">{data.description}</span>}
                    </div>
                ))}
            </div>
            <button onClick={handleOnclick}>Return to Home page</button>
        </div>
    )
}
