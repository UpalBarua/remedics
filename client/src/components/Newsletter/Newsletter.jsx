import styles from './Newsletter.module.css';

const Newsletter = () => {
  return (
    <section className="container">
      <div className={styles.newsletter}>
        <h2 className={styles.titleSm}>newsletter</h2>
        <p className={styles.title}>
          Remedcis offers expert advice for a better, healthier life.
        </p>
        <form className={styles.form}>
          <input
            className={styles.input}
            type="email"
            placeholder="example@mail.com"
          />
          <button className={styles.btn}>submit</button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
