import type { ForwardRefExoticComponent, JSX, RefAttributes, SVGProps } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { UserCircleIcon, AtSymbolIcon, ComputerDesktopIcon, CommandLineIcon } from '@heroicons/react/24/solid'

type MediaUrlType = 'linkedIn' | 'github' | 'portfolio' | 'twitter'

interface IPromoCard {
    name: string
    profileImage?: string
    description?: string
    links: Partial<Record<MediaUrlType, string>>
}

// TODO: use this to set the icon
const iconWithMedia: Record<MediaUrlType, ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & { title?: string | undefined; titleId?: string | undefined; } & RefAttributes<SVGSVGElement>>> = {
    'linkedIn': ComputerDesktopIcon,
    'github': CommandLineIcon,
    'portfolio': UserCircleIcon,
    'twitter': AtSymbolIcon,
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
        <div className="flex flex-col justify-around h-fit w-full space-y-4 max-w-96">
            <span className="text-2xl text-center">ABOUT PAGE</span>
            <div className="flex flex-col space-y-8">
                {PERSONAL_DATA.map((data, index) => (
                    <div className="flex flex-col border-2 border-solid rounded-xl p-4 w-full h-fit space-y-4 hover:shadow-lg hover:shadow-emerald-500 bg-opacity-60 bg-slate-900" key={index}>
                        <span className="text-bold text-center text-xl border-b border-solid">{data.name}</span>
                        <div className="flex flex-row space-x-6">
                            {data.profileImage ? (
                                <img
                                    src={data.profileImage}
                                    alt={data.name}
                                    width={'40%'}
                                    className='rounded-full'
                                />
                            ) : (
                                <Image
                                    src={DEFAULT_IMAGE_PATH}
                                    alt={data.name}
                                    width={100}
                                    height={66}
                                    className='rounded-full'
                                />
                            )}
                            <div className="flex flex-col space-y-3 items-start">
                            {Object.entries(data.links).map(([key, value]) => (
                                <div className="flex flex-row space-x-2 justify-center items-center hover:text-cyan-400" key={key}>
                                    <ComputerDesktopIcon className="w-5 h-5" />
                                    <a href={value} target="_blank" rel="noopener noreferrer" className='link'>
                                        {key}
                                    </a>
                                </div>
                            ))}
                                {/* {data.links.portfolio && (
                                    <div className="flex flex-row space-x-2 justify-center items-center hover:text-cyan-400">
                                        <ComputerDesktopIcon className="w-5 h-5" />
                                        <a href={data.links.portfolio} target="_blank" rel="noopener noreferrer" className='link'>
                                            Portfolio
                                        </a>
                                    </div>
                                )}
                                {data.links.github && (
                                    <div className="flex flex-row space-x-2 justify-center items-center hover:text-cyan-400">
                                        <CommandLineIcon className="w-5 h-5" />
                                        <a href={data.links.github} target="_blank" rel="noopener noreferrer" className='link'>
                                            Github
                                        </a>
                                    </div>
                                )}
                                {data.links.linkedIn && (
                                    <div className="flex flex-row space-x-2 justify-center items-center hover:text-cyan-400">
                                        <UserCircleIcon className="w-5 h-5" />
                                        <a href={data.links.linkedIn} target="_blank" rel="noopener noreferrer" className='link'>
                                            LinkedIn
                                        </a>
                                    </div>
                                )}
                                {data.links.twitter && (
                                    <div className="flex flex-row space-x-2 justify-center items-center hover:text-cyan-400">
                                        <AtSymbolIcon className="w-5 h-5" />
                                        <a href={data.links.twitter} target="_blank" rel="noopener noreferrer" className='link'>
                                            Twitter
                                        </a>
                                    </div>
                                )} */}
                            </div>
                        </div>
                        {data.description && (
                            <span className='text-center text-lg'>{data.description}</span>
                        )}
                    </div>
                ))}
            </div>
            <button onClick={handleOnclick}>Return to Home page</button>
        </div>
    )
}
