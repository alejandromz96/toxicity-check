import type { AppType } from 'next/app'
import { api } from '~/utils'
import '~/styles/globals.css'
import { Layout } from '~/components'

const MyApp: AppType = ({ Component, pageProps }) => (
    <Layout>
        <Component {...pageProps} />
    </Layout>
)

export default api.withTRPC(MyApp)
