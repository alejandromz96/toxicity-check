import type React from 'react'

export type ComponentWithChildren<T = unknown> = { children?: React.ReactNode | undefined } & T
