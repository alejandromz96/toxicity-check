import { type FC } from 'react'

import type { ComponentWithChildren } from '~/lib/types'

import { Footer, Background, Header } from './'

const Layout: FC<ComponentWithChildren> = ({ children }) => (
    <div className='h-screen overflow-hidden'>
        <Header />
            <main className='h-full'>
                <Background />
                <div className="relative h-full">{children}</div>
            </main>
        <Footer />
    </div>
)

export default Layout
