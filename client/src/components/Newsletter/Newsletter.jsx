import styles from './Newsletter.module.css';

const Newsletter = () => {
  return (
    <section className="container">
      <div className={styles.newsletter}>
        <h2 className="secondary-title">newsletter</h2>
        <p className="primary-title">Lorem ipsum dolor sit amet, consectetur</p>
        <form className={styles.form}>
          <input
            className={styles.input}
            type="email"
            placeholder="example@mail.com"
          />
          <button className={styles.btn}>signup</button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
