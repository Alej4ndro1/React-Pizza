import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Nothing found 😕</h1>
      <p className={styles.description}>Add the products you want to your cart</p>
    </div>
  );
};

export default NotFoundBlock;
