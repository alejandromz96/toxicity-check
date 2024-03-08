import { type FC } from 'react'

import type { ComponentWithChildren } from '~/lib/types'

import { Footer, Background, Header } from './'

const Layout: FC<ComponentWithChildren> = ({ children }) => (
    <main className="w-fit">
        <Header />
        <Background />
        <div className="relative w-fit h-full mt-[52px] mb-[36px]">{children}</div>
        <Footer />
    </main>
)

export default Layout
