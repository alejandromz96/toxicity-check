import type React from 'react'

export type WithChildren<T = unknown> = { children?: React.ReactNode | undefined } & T
