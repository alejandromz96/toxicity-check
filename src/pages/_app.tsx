import type { AppType } from 'next/app'
import { api } from '~/utils'
import '~/styles/globals.css'

const MyApp: AppType = ({ Component, pageProps }) => <Component {...pageProps} />

export default api.withTRPC(MyApp)
