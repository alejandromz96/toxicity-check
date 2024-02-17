import styles from '../styles/Loader.module.css'

const Loader = (): JSX.Element => {
  return (
      <div className={styles.blobs}>
        <div className={styles.blob_center}></div>
        <div className={styles.blob}></div>
        <div className={styles.blob}></div>
        <div className={styles.blob}></div>
        <div className={styles.blob}></div>
        <div className={styles.blob}></div>
        <div className={styles.blob}></div>
      </div>
  );
};

export default Loader;
