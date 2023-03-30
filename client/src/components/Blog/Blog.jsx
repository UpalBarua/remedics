import { useState, useEffect } from 'react';
import useTitle from '../../hooks/useTitle';
import { useSpinner } from '../../contexts/SpinnerContext';
import styles from './Blog.module.css';

const Blog = () => {
  const { setIsSpinnerVisible } = useSpinner();
  const [blogsData, setBlogsData] = useState([]);
  useTitle('Blog');

  useEffect(() => {
    setIsSpinnerVisible(true);

    (async () => {
      const response = await fetch('https://remedics.vercel.app/blog');
      const data = await response.json();
      setBlogsData(data);
      setIsSpinnerVisible(false);
    })();
  }, []);

  return (
    <section className={`container ${styles.blog}`}>
      {blogsData.map(data => (
        <div key={data._id}>
          <h3 className={styles.title}>{data.question}</h3>
          <p className={styles.text}>{data.answer}</p>
        </div>
      ))}
    </section>
  );
};

export default Blog;
