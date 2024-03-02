import { type FC } from 'react'

import type { WithChildren } from '~/lib/types/WithChildren.type'

import Footer from './Footer'
import Background from './Background'

const Layout: FC<WithChildren> = ({ children }) => (
    <>
        <Background />
        {children}
        <Footer />
    </>
)

export default Layout
