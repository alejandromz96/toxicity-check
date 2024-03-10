import { useEffect, type JSX } from 'react'
import Head from 'next/head'
import { api } from '~/utils'
import { WizardStateComponent } from '~/components'
import { useRouter } from 'next/router'

const Home = (): JSX.Element => {
    const inference = api.post.getSentenceInference.useMutation()
    const router = useRouter()

    useEffect(() => {
        if (inference.data && inference.data.length > 0) {
            // eslint-disable-next-line no-console
            console.log(inference.data)
        }
    }, [inference?.data])

    const handleOnclick = async (): Promise<void> => {
        await router.push('/about')
    }

    // TODO: update meta tags URLs when logo is merged
    return (
        <>
            <Head>
                <title>TOXICITY CHECK</title>
                <meta name="description" content="Get out your toxicity and get the best score you can." />
                <meta
                    name="keywords"
                    content="Toxicity, Score, IA, Toxicity Check, Toxicity Meter, Online Toxicity, Challenge"
                />
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
            <div className="text-gray-400 h-full">
                <WizardStateComponent />
                <button onClick={handleOnclick}>Go to about page</button>
            </div>
        </>
    )
}

export default Home
