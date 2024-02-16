import styles from './Loader.module.css'

const Loader_1 = (): JSX.Element => {
  return (
    <div className={styles.main}>
        <div className={styles.bar}>
          <div className={styles.ball}></div>
      </div>
    </div>
  );
};

export default Loader_1;
