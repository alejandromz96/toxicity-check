import { useEffect, type JSX } from 'react'
import Head from 'next/head'
import { api } from '~/utils/api'
import WizardStateComponent from '~/components/WizardStateComponent'

const Home = (): JSX.Element => {
    const inference = api.post.getSentenceInference.useMutation()

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
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-violet-700 to-violet-900 text-gray-400">
                <WizardStateComponent />
            </main>
        </>
    )
}

export default Home
