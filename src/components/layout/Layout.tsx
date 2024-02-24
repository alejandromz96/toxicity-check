import { type FC } from 'react'

import type { WithChildren } from '~/lib/types/WithChildren.type'

import Footer from './Footer'

const Layout: FC<WithChildren> = ({ children }) => (
    <>
        {children}
        <Footer />
    </>
)

export default Layout
