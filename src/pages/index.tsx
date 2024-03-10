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
            <div className="text-gray-400 h-full">
                <WizardStateComponent />
            </div>
        </>
    )
}

export default Home
