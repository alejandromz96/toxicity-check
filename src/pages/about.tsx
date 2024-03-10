import { createElement, type JSX } from 'react'
import { useRouter } from 'next/router'
import {
    UserCircleIcon,
    AtSymbolIcon,
    ComputerDesktopIcon,
    CommandLineIcon,
    ArrowLeftCircleIcon,
} from '@heroicons/react/24/solid'

type MediaUrlType = 'linkedIn' | 'github' | 'portfolio' | 'twitter'

interface IPromoCard {
    name: string
    profileImage?: string
    description?: string
    links: Partial<Record<MediaUrlType, string>>
}

const iconWithMedia: Record<MediaUrlType, JSX.Element> = {
    linkedIn: createElement(ComputerDesktopIcon, { className: 'w-3 md:w-5 h-3 md:h-5' }),
    github: createElement(CommandLineIcon, { className: 'w-3 md:w-5 h-3 md:h-5' }),
    portfolio: createElement(UserCircleIcon, { className: 'w-3 md:w-5 h-3 md:h-5' }),
    twitter: createElement(AtSymbolIcon, { className: 'w-3 md:w-5 h-3 md:h-5' }),
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
        name: 'Alejandro',
        profileImage: 'https://avatars.githubusercontent.com/u/37580269?v=4',
        description: 'Fullstack developer, T3 enjoyer',
        links: {
            github: 'https://github.com/alejandromz96/',
            linkedIn: 'https://www.linkedin.com/in/alejandro-mu%C3%B1oz-6201991a7/',
        },
    },
    {
        name: 'Kelvin, Lord of Coffee',
        description: 'Fullstack developer, likes coffee',
        links: {
            github: 'https://github.com/CodingAndCodingAgain/',
            linkedIn: 'https://www.linkedin.com/in/jos%C3%A9-rom%C3%A1n-018566233/',
        },
    },
]

export default function AboutPage(): JSX.Element {
    const router = useRouter()
    const handleOnclick = async (): Promise<void> => {
        await router.push('/')
    }
    return (
        <div className="flex flex-col max-h-3/4 h-full w-full space-y-4 text-gray-400">
            <span className="text-2xl text-center">ABOUT PAGE</span>
            <div className="flex flex-col justify-center items-center space-y-2 md:space-y-4 w-full">
                {PERSONAL_DATA.map((data, index) => (
                    <div
                        className="flex flex-col border-2 border-solid rounded-xl md:p-2 w-full h-fit md:space-y-4 hover:shadow-lg hover:shadow-emerald-500 bg-opacity-60 bg-slate-900 max-w-96"
                        key={index}
                    >
                        <span className="text-bold text-center text-xl md:border-b md:border-solid">{data.name}</span>
                        <div className="flex flex-col items-center md:items-start md:flex-row space-y-2 md:space-y-0 md:space-x-6">
                            <img
                                src={data.profileImage ?? DEFAULT_IMAGE_PATH}
                                alt={data.name}
                                className="rounded-full w-10 md:w-32 h-10 md:h-32"
                            />
                            <div className="flex flex-row flex-wrap md:flex-col justify-center items-center md:items-start space-x-2 md:space-x-0">
                                {Object.entries(data.links).map(([key, value]) => (
                                    <div
                                        className="flex flex-row space-x-1 justify-center items-center hover:text-cyan-400"
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
                        {data.description && <span className="text-center md:text-lg">{data.description}</span>}
                    </div>
                ))}
            </div>
            <div className="flex flex-row justify-center items-center space-x-2">
                <ArrowLeftCircleIcon className="w-5 h-5" />
                <button onClick={handleOnclick} className="border-b border-r-2 px-2">
                    Return Home
                </button>
            </div>
        </div>
    )
}
