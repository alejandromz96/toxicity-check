import styles from './Loader.module.css'

const Loader_3 = (): JSX.Element => {
  return (
    <div className={styles.main}>
        <div className={styles.blobs}>
          <div className={styles.blob_center}></div>
          <div className={styles.blob}></div>
          <div className={styles.blob}></div>
          <div className={styles.blob}></div>
          <div className={styles.blob}></div>
          <div className={styles.blob}></div>
          <div className={styles.blob}></div>
        </div>
    </div>
  );
};

export default Loader_3;
