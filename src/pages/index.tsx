import React, { useEffect, useState } from 'react'
import Head from 'next/head'

import { ToxicTextComponent } from '~/components/toxic-text-component/ToxicTextComponent'
import { api } from '~/utils/api'

type HomeComponentType = 'presentation' | 'challenge' | 'results'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Home() {
    const [currentComponent, setCurrentComponent] = useState<HomeComponentType>('presentation')

    const [inputValue, setInputValue] = useState('')

    const inference = api.post.getSentenceInference.useMutation()

    function inferenceSentence(): void {
        inference.mutate({ sentence: inputValue })
    }

    useEffect(() => {
        if (inference.data && inference.data.length > 0) {
            // eslint-disable-next-line no-console
            console.log(inference.data)
        }
    }, [inference?.data])

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
                <ToxicTextComponent asyncSubmit={console.log} loading={false} />
                <div className="container flex flex-col items-center justify-center gap-12 px-6">
                    <input
                        className="block rounded w-full px-4"
                        onChange={(event) => {
                            setInputValue(event.target.value)
                        }}
                    ></input>
                    <button type="submit" className="bg-white rounded-sm px-4" onClick={inferenceSentence}>
                        Inference
                    </button>
                </div>
            </main>
        </>
    )
}
