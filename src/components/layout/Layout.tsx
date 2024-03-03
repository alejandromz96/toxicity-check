import { type FC } from 'react'

import type { WithChildren } from '~/lib/types'

import Footer from './Footer'
import Background from './Background'
import Header from './Header'

const Layout: FC<WithChildren> = ({ children }) => (
    <main className="w-fit">
        <Header />
        <Background />
        <div className="relative w-fit h-full my-[52px]">{children}</div>
        <Footer />
    </main>
)

export default Layout
