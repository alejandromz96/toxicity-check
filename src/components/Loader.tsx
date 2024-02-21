import styles from '../styles/Loader.module.css'
import type { JSX } from 'react'

const Loader = (): JSX.Element => (
    <div className={styles.blobs}>
        <div className={styles.blob_center}></div>
        <div className={styles.blob}></div>
        <div className={styles.blob}></div>
        <div className={styles.blob}></div>
        <div className={styles.blob}></div>
        <div className={styles.blob}></div>
        <div className={styles.blob}></div>
    </div>
)

export default Loader
