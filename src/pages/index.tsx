import type { JSX } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import ResultsComponent from '~/components/resultsComponent'
import type { CategoryInference } from '~/server/lib/interfaces/categoryInference.interface'
import React, { useState } from 'react'

import { api } from '~/utils/api'
import { ToxicTextComponent } from '~/components/ToxicTextComponent'

const Home = (): JSX.Element => {
    const hello = api.post.hello.useQuery({ text: 'from tRPC' })

    const [inputValue, setInputValue] = useState('')
    const [inputPassedToResults, setInputPassedToResults] = useState('')

    const inference = api.post.getSentenceInference.useMutation()
    const inferenceSentence = (sentence: string): Promise<CategoryInference[]> => inference.mutateAsync({ sentence })

    return (
        <>
            <Head>
                <title>TOXICITY CHECK</title>
                <meta name="description" content="Toxicity check main page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                    <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                        Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
                    </h1>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
                        <Link
                            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                            href="https://create.t3.gg/en/usage/first-steps"
                            target="_blank"
                        >
                            <h3 className="text-2xl font-bold">First Steps →</h3>
                            <div className="text-lg">
                                Just the basics - Everything you need to know to set up your database and
                                authentication.
                            </div>
                        </Link>
                        <Link
                            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                            href="https://create.t3.gg/en/introduction"
                            target="_blank"
                        >
                            <h3 className="text-2xl font-bold">Documentation →</h3>
                            <div className="text-lg">
                                Learn more about Create T3 App, the libraries it uses, and how to deploy it.
                            </div>
                        </Link>
                    </div>
                    <p className="text-2xl text-white">{hello.data ? hello.data.greeting : 'Loading tRPC query...'}</p>
                    {/* eslint-disable-next-line no-console */}
                    <ToxicTextComponent asyncSubmit={console.log} loading={false} />
                </div>
                <ResultsComponent
                    sentence={inputPassedToResults}
                    setSentence={(string) => setInputPassedToResults(string)}
                    inferenceCallback={inferenceSentence}
                />
                <div className="container flex flex-col items-center justify-center gap-12 px-6">
                    <input
                        className="block rounded w-full px-4"
                        onChange={(event) => {
                            setInputValue(event.target.value)
                        }}
                    ></input>
                    <button
                        type="submit"
                        className="bg-white rounded-sm px-4"
                        onClick={() => setInputPassedToResults(inputValue)}
                    >
                        Inference
                    </button>
                </div>
            </main>
        </>
    )
}

export default Home
