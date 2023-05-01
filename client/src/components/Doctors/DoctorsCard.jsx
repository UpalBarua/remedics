import { PhotoProvider, PhotoView } from 'react-photo-view';
import Button from '../UI/Button/Button';

import {
  AiOutlineCalendar,
  AiFillDollarCircle,
  AiFillClockCircle,
  AiFillStar,
} from 'react-icons/ai';

import styles from './DoctorsCard.module.css';

const DoctorCard = ({
  _id,
  name,
  img,
  ratings,
  fees,
  description,
  specialized,
}) => {
  return (
    <PhotoProvider>
      <li className={styles.doctorsCard}>
        <PhotoView src={img}>
          <img className={styles.image} src={img} alt={name} />
        </PhotoView>
        <div className={styles.body}>
          <p className={styles.specialized}>{specialized}</p>
          <h3 className={styles.name}>{name}</h3>
          <ul className={styles.stats}>
            <li>
              <AiFillStar className={styles.icon} />
              <span>{ratings}/5</span>
            </li>
            <li>
              <AiFillDollarCircle className={styles.icon} />
              <span>{fees}</span>
            </li>
            <li>
              <AiFillClockCircle className={styles.icon} />
              <span>{fees}</span>
            </li>
          </ul>
          <p className={styles.description}>
            {description.slice(0, 150) + '...'}
          </p>
          <footer className={styles.btnGroup}>
            <Button to={`/details/${_id}`} isLink style={{ width: '100%' }}>
              View Profile
            </Button>
            <button className={styles.book}>
              <AiOutlineCalendar />
            </button>
          </footer>
        </div>
      </li>
    </PhotoProvider>
  );
};

export default DoctorCard;
