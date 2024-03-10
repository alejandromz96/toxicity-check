import { useEffect, type JSX } from 'react'
import Head from 'next/head'
import { api } from '~/utils'
import { WizardStateComponent } from '~/components'

const Home = (): JSX.Element => {
    const inference = api.post.getSentenceInference.useMutation()

    useEffect(() => {
        if (inference.data && inference.data.length > 0) {
            // eslint-disable-next-line no-console
            console.log(inference.data)
        }
    }, [inference?.data])

    // TODO: update meta tags URLs when logo is merged
    return (
        <>
            <Head>
                <title>TOXICITY CHECK</title>
                <meta name="description" content="Get out your toxicity and get the best score you can." />
                <meta name="keywords" content="Toxicity, Score, IA, Toxicity Check, Toxicity Meter, Online Toxicity, Challenge" />
                <meta name="robots" content="index,follow" />

                <meta property="og:title" content="Check how toxic are you online!" />
                <meta property="og:description" content="Get out your toxicity and get the best score you can." />
                <meta property="og:image" content="URL_de_la_imagen" />

                <meta name="twitter:card" content="Check how toxic are you online!" />
                <meta name="twitter:title" content="Check how toxic are you online!" />
                <meta name="twitter:description" content="Get out your toxicity and get the best score you can." />
                <meta name="twitter:image" content="URL_de_la_imagen" />

                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-gray-400">
                <WizardStateComponent />
            </main>
        </>
    )
}

export default Home
