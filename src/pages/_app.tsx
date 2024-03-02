import { type AppType } from 'next/app'
import { api } from '~/utils/api'
import '~/styles/globals.css'
import 'tailwindcss/tailwind.css'

const MyApp: AppType = ({ Component, pageProps }) => (
    <div className="main_styles">
        <Component {...pageProps} />
    </div>
)

export default api.withTRPC(MyApp)
