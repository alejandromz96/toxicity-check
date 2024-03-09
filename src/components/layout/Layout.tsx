import { type FC } from 'react'

import type { WithChildren } from '~/lib/types'

import { Footer, Background, Header } from './'

const Layout: FC<WithChildren> = ({ children }) => (
    <div className='h-screen'>
        <Header />
            <main className='h-full w-full'>
                <Background />
                <div className="relative h-full">{children}</div>
            </main>
        <Footer />
    </div>
)

export default Layout
