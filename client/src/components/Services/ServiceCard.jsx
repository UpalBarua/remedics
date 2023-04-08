import { Link } from 'react-router-dom';
import { AiOutlineStar } from 'react-icons/ai';
import { BiDollar } from 'react-icons/bi';
import { FiFlag } from 'react-icons/fi';
import styles from './ServiceCard.module.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { AiOutlineCalendar } from 'react-icons/ai';

const ServiceCard = ({ service }) => {
  const { _id, name, img, ratings, fees, description, country, specialized } =
    service;

  return (
    <PhotoProvider>
      <div className={styles.card}>
        <PhotoView src={img}>
          <img className={styles.img} src={img} alt={name} />
        </PhotoView>
        <div className={styles.body}>
          <p className={styles.titleSm}>{specialized}</p>
          <h3 className={styles.title}>{name}</h3>
          <p className={styles.text}>{description.slice(0, 150) + '...'}</p>
          <div className={styles.actions}>
            <button className={styles.book}>
              <AiOutlineCalendar />
            </button>
            <Link className={styles.profile} to={`/details/${_id}`}>
              View Profile
            </Link>
          </div>

          {/* <div className={styles.footer}>
            <div className={styles.stats}>
              <p>
                <AiOutlineStar className="text-accent-primary" />
                {ratings}
              </p>
              <p>
                <BiDollar className="text-accent-primary" />
                {fees}
              </p>
              <p>
                <FiFlag className="text-accent-primary" />
                {country}
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </PhotoProvider>
  );
};

export default ServiceCard;
