import { useEffect, type JSX } from 'react'
import Head from 'next/head'
import { api } from '~/utils/api'
import WizardStateComponent from '~/components/WizardStateComponent'
import { useRouter } from 'next/router';

const Home = (): JSX.Element => {
    const inference = api.post.getSentenceInference.useMutation()
    const router = useRouter();

    useEffect(() => {
        if (inference.data && inference.data.length > 0) {
            // eslint-disable-next-line no-console
            console.log(inference.data)
        }
    }, [inference?.data])

    const handleOnclick = () => {
        router.push('/about')
    }

    return (
        <>
            <Head>
                <title>TOXICITY CHECK</title>
                <meta name="description" content="Toxicity check main page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className='flex flex-col space-y-6'>
                <WizardStateComponent />
                <button onClick={handleOnclick}>Go to about page</button>
            </main>
        </>
    )
}

export default Home
