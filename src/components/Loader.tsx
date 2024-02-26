import { LoaderStyles } from '~/styles'
import type { JSX } from 'react'

const Loader = (): JSX.Element => (
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

export default Loader
