import { LoaderStyles } from '~/styles'
import type { JSX } from 'react'

const LoaderComponent = (): JSX.Element => (
    <div className={LoaderStyles.blobs}>
        <div className={LoaderStyles.blob_center}></div>
        <div className={LoaderStyles.blob}></div>
        <div className={LoaderStyles.blob}></div>
        <div className={LoaderStyles.blob}></div>
        <div className={LoaderStyles.blob}></div>
        <div className={LoaderStyles.blob}></div>
        <div className={LoaderStyles.blob}></div>
    </div>
)

export default LoaderComponent
