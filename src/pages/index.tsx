import { useEffect, useState, type JSX } from 'react'
import Head from 'next/head'

import { ToxicTextComponent } from '~/components/ToxicTextComponent'
import { api } from '~/utils/api'
import WizardStateComponent from '~/components/WizardStateComponent'

const Home = (): JSX.Element => {
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
                <WizardStateComponent />
                {/* eslint-disable-next-line no-console */}
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

export default Home
