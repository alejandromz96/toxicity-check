import Head from 'next/head'
import { useState } from 'react'

type HomeComponentType = 'presentation' | 'challenge' | 'results'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Home() {
    // const hello = api.post.hello.useQuery({ text: "from tRPC" });

    const [currentComponent, setCurrentComponent] = useState<HomeComponentType>('presentation')

    return (
        <>
            <Head>
                <title>TOXICITY CHECK</title>
                <meta name="description" content="Toxicity check main page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-gray-400">
                {currentComponent === 'presentation' && (
                    <div className="flex flex-col items-center">
                        <h1 className="text-2xl">PROJECT PRESENTATION</h1>
                        <button
                            className="mt-10 rounded-md border border-gray-400 p-1.5 hover:bg-gray-900"
                            onClick={(): void => setCurrentComponent('challenge')}
                        >
                            START CHALLENGE
                        </button>
                    </div>
                )}
                {currentComponent === 'challenge' && (
                    <div className="flex flex-col items-center">
                        <h1 className="text-2xl">CHALLENGE</h1>
                        <button
                            className="mt-10 rounded-md border border-gray-400 p-1.5 hover:bg-gray-900"
                            onClick={(): void => setCurrentComponent('results')}
                        >
                            END CHALLENGE
                        </button>
                    </div>
                )}
                {currentComponent === 'results' && (
                    <div className="flex flex-col items-center">
                        <h1 className="text-2xl">RESULTS</h1>
                        <button
                            className="mt-10 rounded-md border border-gray-400 p-1.5 hover:bg-gray-900"
                            onClick={(): void => setCurrentComponent('presentation')}
                        >
                            RETURN TO PRESENTATION
                        </button>
                    </div>
                )}
            </main>
        </>
    )
}
