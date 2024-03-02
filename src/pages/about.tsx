import type { JSX } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { UserCircleIcon } from '@heroicons/react/24/solid'

interface IMediaUrls {
    linkedIn?: string
    github?: string
    portfolio?: string
}

interface IPromoCard {
    name: string
    profileImage?: string
    links: IMediaUrls
}

const DEFAULT_IMAGE_PATH = '/default_image.png'

// TODO: Add personal data of the other teammates (:
const PERSONAL_DATA: IPromoCard[] = [
    {
        name: 'CPL121',
        profileImage: 'https://raw.seadn.io/files/576dd82b5edd4bf7ebcba49251e28175.jpg',
        links: {
            linkedIn: 'https://es.linkedin.com/in/c%C3%A9sar-pe%C3%B3n-lamparero/',
            github: 'https://github.com/cpl121/',
            portfolio: 'https://cpl121.eth.limo/',
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
        <div className="flex flex-col justify-around h-screen">
            <span className="text-2xl">ABOUT PAGE</span>
            <div className="flex flex-col space-y-8">
                {PERSONAL_DATA.map((data, index) => (
                    <div className="flex flex-col border border-solid rounded-xl p-4 w-80 h-44 space-y-2" key={index}>
                        <span className="text-bold text-center text-xl border-b border-solid">{data.name}</span>
                        <div className="flex flex-row space-x-4">
                            {data.profileImage ? (
                                <img
                                    src={data.profileImage}
                                    alt={data.name}
                                    width={100}
                                    height={66}
                                    style={{ borderRadius: '100%' }}
                                />
                            ) : (
                                <Image
                                    src={DEFAULT_IMAGE_PATH}
                                    alt={data.name}
                                    width={100}
                                    height={66}
                                    style={{ borderRadius: '100%' }}
                                />
                            )}
                            <div className="flex flex-col space-y-4">
                                {data.links.portfolio && (
                                    <div className="flex flex-row space-x-2 justify-center items-center">
                                        <UserCircleIcon className="w-5 h-5" />
                                        <a href={data.links.portfolio} target="_blank" rel="noopener noreferrer">
                                            Portfolio
                                        </a>
                                    </div>
                                )}
                                {data.links.github && (
                                    <div className="flex flex-row space-x-2 justify-center items-center">
                                        <UserCircleIcon className="w-5 h-5" />
                                        <a href={data.links.github} target="_blank" rel="noopener noreferrer">
                                            Github
                                        </a>
                                    </div>
                                )}
                                {data.links.linkedIn && (
                                    <div className="flex flex-row space-x-2 justify-center items-center">
                                        <UserCircleIcon className="w-5 h-5" />
                                        <a href={data.links.linkedIn} target="_blank" rel="noopener noreferrer">
                                            LinkedIn
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={handleOnclick}>Return to Home page</button>
        </div>
    )
}
